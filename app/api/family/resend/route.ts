import { createClient } from '@/lib/supabase/server'
import { sendEmail, familyInviteEmail } from '@/lib/utils/send-email'
import { NextResponse } from 'next/server'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.klopthet.com'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

    const { memberId, locale = 'nl' } = await req.json()
    if (!memberId) return NextResponse.json({ error: 'memberId vereist' }, { status: 400 })

    const { data: member } = await supabase
      .from('family_members')
      .select('id, invite_token, invited_email, status')
      .eq('id', memberId)
      .maybeSingle()

    if (!member) return NextResponse.json({ error: 'Lid niet gevonden' }, { status: 404 })
    if (member.status !== 'pending') {
      return NextResponse.json({ error: 'Uitnodiging is al geaccepteerd' }, { status: 400 })
    }

    const acceptUrl = `${APP_URL}/${locale}/uitnodiging/${member.invite_token}`
    const inviterName = user.user_metadata?.full_name || user.email || ''

    try {
      await sendEmail({
        to: member.invited_email,
        subject: `${inviterName || 'Iemand'} heeft u uitgenodigd voor KloptHet Familie`,
        html: familyInviteEmail({ inviterName, inviterEmail: user.email ?? '', acceptUrl }),
      })
    } catch {
      return NextResponse.json({
        success: true,
        warning: 'E-mail kon niet worden verstuurd.',
        inviteUrl: acceptUrl,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend fout:', err)
    return NextResponse.json({ error: 'Serverfout' }, { status: 500 })
  }
}
