import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: 'acf000001@smtp-brevo.com',
    pass: process.env.BREVO_SMTP_KEY,
  },
})

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!email || !message) {
      return NextResponse.json({ error: 'E-mail en bericht zijn verplicht' }, { status: 400 })
    }

    await transporter.sendMail({
      from: '"KloptHet" <noreply@klopthet.com>',
      to: 'hulp@klopthet.com',
      replyTo: email,
      subject: subject ? `Contactformulier: ${subject}` : 'Nieuw contactbericht via KloptHet',
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="margin:0 0 16px">Nieuw bericht via klopthet.com</h2>
          <p><strong>Naam:</strong> ${name || '—'}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Onderwerp:</strong> ${subject || '—'}</p>
          <hr style="margin:16px 0">
          <p style="white-space:pre-wrap">${message}</p>
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
