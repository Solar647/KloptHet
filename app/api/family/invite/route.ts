import { createClient } from '@/lib/supabase/server'
import { sendEmail, familyInviteEmail } from '@/lib/utils/send-email'
import { NextResponse } from 'next/server'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://klopt-het.vercel.app'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

    const body = await req.json()
    const email: string = body.email ?? ''
    const locale: string = body.locale ?? 'nl'

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
    }
    if (email.toLowerCase() === user.email?.toLowerCase()) {
      return NextResponse.json({ error: 'U kunt uzelf niet uitnodigen' }, { status: 400 })
    }

    // Controleer abonnement
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('tier')
      .eq('user_id', user.id)
      .single()

    const max: Record<string, number> = { family: 5, premium: 5 }
    const limit = max[sub?.tier ?? ''] ?? 0
    if (limit === 0) {
      return NextResponse.json(
        { error: 'Upgrade naar Familie om leden uit te nodigen' },
        { status: 403 }
      )
    }

    // Zorg dat familie bestaat
    let familyId: string
    const { data: existing } = await supabase
      .from('families')
      .select('id')
      .eq('owner_id', user.id)
      .maybeSingle()

    if (existing) {
      familyId = existing.id
    } else {
      const { data: newFam, error: famErr } = await supabase
        .from('families')
        .insert({ owner_id: user.id })
        .select('id')
        .single()
      if (famErr || !newFam) {
        console.error('Familie aanmaken fout:', famErr)
        return NextResponse.json(
          { error: `Familie aanmaken mislukt: ${famErr?.message}` },
          { status: 500 }
        )
      }
      familyId = newFam.id
    }

    // Controleer limiet
    const { count } = await supabase
      .from('family_members')
      .select('id', { count: 'exact', head: true })
      .eq('family_id', familyId)
      .neq('status', 'removed')

    if ((count ?? 0) >= limit) {
      return NextResponse.json({ error: `Maximum van ${limit} leden bereikt` }, { status: 400 })
    }

    // Controleer duplicaat
    const { data: dupe } = await supabase
      .from('family_members')
      .select('id')
      .eq('family_id', familyId)
      .eq('invited_email', email.toLowerCase())
      .neq('status', 'removed')
      .maybeSingle()

    if (dupe) {
      return NextResponse.json({ error: 'Dit e-mailadres is al uitgenodigd' }, { status: 400 })
    }

    // Maak invite aan
    const { data: member, error: memberErr } = await supabase
      .from('family_members')
      .insert({ family_id: familyId, invited_email: email.toLowerCase() })
      .select('id, invite_token')
      .single()

    if (memberErr || !member) {
      console.error('Lid aanmaken fout:', memberErr)
      return NextResponse.json(
        { error: `Uitnodiging aanmaken mislukt: ${memberErr?.message}` },
        { status: 500 }
      )
    }

    const acceptUrl = `${APP_URL}/${locale}/uitnodiging/${member.invite_token}`
    const inviterName = user.user_metadata?.full_name || user.email || ''

    // Stuur e-mail (niet-blokkerend — link altijd meesturen)
    try {
      await sendEmail({
        to: email,
        subject: `${inviterName || 'Iemand'} heeft u uitgenodigd voor KloptHet Familie`,
        html: familyInviteEmail({ inviterName, inviterEmail: user.email ?? '', acceptUrl }),
      })
    } catch (emailErr) {
      console.error('E-mail fout:', emailErr)
      return NextResponse.json({
        success: true,
        warning: 'E-mail kon niet worden verstuurd. Kopieer de link hieronder.',
        inviteUrl: acceptUrl,
        member: {
          id: member.id,
          invited_email: email,
          status: 'pending',
          owner_can_see_scans: true,
          member_can_see_owner: false,
          joined_at: null,
        },
      })
    }

    return NextResponse.json({
      success: true,
      inviteUrl: acceptUrl,
      member: {
        id: member.id,
        invited_email: email,
        status: 'pending',
        owner_can_see_scans: true,
        member_can_see_owner: false,
        joined_at: null,
      },
    })
  } catch (err) {
    console.error('Invite route fout:', err)
    return NextResponse.json({ error: 'Onverwachte fout op de server' }, { status: 500 })
  }
}
