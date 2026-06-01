import { sendEmail } from '@/lib/utils/send-email'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!email || !message) {
      return NextResponse.json({ error: 'E-mail en bericht zijn verplicht' }, { status: 400 })
    }

    await sendEmail({
      to: 'hulp@klopthet.com',
      subject: subject ? `Contactformulier: ${subject}` : 'Nieuw contactbericht via KloptHet',
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#091020;margin:0 0 16px">Nieuw bericht via klopthet.com</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666;width:100px">Naam</td><td style="padding:8px 0"><strong>${name || '—'}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#666">E-mail</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666">Onderwerp</td><td style="padding:8px 0">${subject || '—'}</td></tr>
          </table>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee">
          <p style="color:#333;line-height:1.6;white-space:pre-wrap">${message}</p>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee">
          <p style="color:#999;font-size:12px">Verstuurd via klopthet.com/contact</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact fout:', err)
    return NextResponse.json(
      { error: 'Versturen mislukt. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
