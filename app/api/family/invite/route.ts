import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { sendEmail, familyInviteEmail } from '@/lib/utils/send-email'
import { NextResponse } from 'next/server'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://klopt-het.vercel.app'

export async function POST(req: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const { email, locale = 'nl' } = await req.json()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
  }

  if (email.toLowerCase() === user.email?.toLowerCase()) {
    return NextResponse.json({ error: 'U kunt uzelf niet uitnodigen' }, { status: 400 })
  }

  // Gebruik service role voor admin-acties
  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Controleer abonnement
  const { data: sub } = await service
    .from('subscriptions')
    .select('tier')
    .eq('user_id', user.id)
    .single()

  const maxMembers: Record<string, number> = { family: 5, premium: 5 }
  const max = maxMembers[sub?.tier ?? ''] ?? 0
  if (max === 0) {
    return NextResponse.json(
      { error: 'Upgrade naar Familie om leden uit te nodigen' },
      { status: 403 }
    )
  }

  // Zorg dat familie bestaat
  let familyId: string
  const { data: existing } = await service
    .from('families')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (existing) {
    familyId = existing.id
  } else {
    const { data: newFam, error: famErr } = await service
      .from('families')
      .insert({ owner_id: user.id })
      .select('id')
      .single()
    if (famErr || !newFam) {
      return NextResponse.json({ error: 'Familie aanmaken mislukt' }, { status: 500 })
    }
    familyId = newFam.id
  }

  // Controleer limiet
  const { count } = await service
    .from('family_members')
    .select('id', { count: 'exact', head: true })
    .eq('family_id', familyId)
    .neq('status', 'removed')

  if ((count ?? 0) >= max) {
    return NextResponse.json({ error: `Maximum van ${max} leden bereikt` }, { status: 400 })
  }

  // Controleer of al uitgenodigd
  const { data: dupe } = await service
    .from('family_members')
    .select('id, status')
    .eq('family_id', familyId)
    .eq('invited_email', email.toLowerCase())
    .neq('status', 'removed')
    .single()

  if (dupe) {
    return NextResponse.json({ error: 'Dit e-mailadres is al uitgenodigd' }, { status: 400 })
  }

  // Maak invite aan
  const { data: member, error: memberErr } = await service
    .from('family_members')
    .insert({
      family_id: familyId,
      invited_email: email.toLowerCase(),
    })
    .select('id, invite_token')
    .single()

  if (memberErr || !member) {
    return NextResponse.json({ error: 'Uitnodiging aanmaken mislukt' }, { status: 500 })
  }

  // Stuur e-mail
  const acceptUrl = `${APP_URL}/${locale}/uitnodiging/${member.invite_token}`
  const inviterName = user.user_metadata?.full_name || user.email || ''

  try {
    await sendEmail({
      to: email,
      subject: `${inviterName || 'Iemand'} heeft u uitgenodigd voor KloptHet Familie`,
      html: familyInviteEmail({ inviterName, inviterEmail: user.email ?? '', acceptUrl }),
    })
  } catch {
    // E-mail mislukt, maar invite record bestaat al — geef de link mee
    return NextResponse.json({
      success: true,
      warning: 'E-mail kon niet worden verstuurd. Kopieer de link hieronder.',
      inviteUrl: acceptUrl,
      member: {
        id: member.id,
        invited_email: email,
        status: 'pending',
        invite_token: member.invite_token,
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
      invite_token: member.invite_token,
    },
  })
}
