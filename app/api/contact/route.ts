import { NextResponse } from 'next/server'

const BREVO_API_KEY = process.env.BREVO_API_KEY!
const FROM_EMAIL = process.env.BREVO_FROM_EMAIL ?? 'noreply@klopthet.com'

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!email || !message) {
      return NextResponse.json({ error: 'E-mail en bericht zijn verplicht' }, { status: 400 })
    }

    console.log(
      'BREVO_API_KEY aanwezig:',
      !!BREVO_API_KEY,
      'lengte:',
      BREVO_API_KEY?.length,
      'start:',
      BREVO_API_KEY?.substring(0, 8)
    )

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: FROM_EMAIL, name: 'KloptHet' },
        to: [{ email: 'hulp@klopthet.com' }],
        replyTo: { email, name: name || email },
        subject: subject ? `Contactformulier: ${subject}` : 'Nieuw contactbericht via KloptHet',
        htmlContent: `
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
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Brevo fout:', errText)
      return NextResponse.json(
        { error: 'Versturen mislukt. Probeer het later opnieuw.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact fout:', err)
    return NextResponse.json(
      { error: 'Versturen mislukt. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
