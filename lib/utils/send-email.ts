const BREVO_API_KEY = process.env.BREVO_API_KEY!
const FROM_EMAIL = process.env.BREVO_FROM_EMAIL ?? 'noreply@klopthet.com'
const FROM_NAME = process.env.BREVO_FROM_NAME ?? 'KloptHet'

interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Brevo fout: ${err}`)
  }
}

export function familyInviteEmail({
  inviterName,
  inviterEmail,
  acceptUrl,
}: {
  inviterName: string
  inviterEmail: string
  acceptUrl: string
}) {
  return `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A1C10;font-family:system-ui,-apple-system,sans-serif">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px">

    <!-- Logo -->
    <div style="margin-bottom:32px">
      <span style="font-size:1.4rem;font-weight:700;color:#F4ECDB;letter-spacing:-.02em">KloptHet</span>
    </div>

    <!-- Card -->
    <div style="background:#0F2D1C;border:1px solid rgba(58,172,110,.25);border-radius:18px;padding:36px">
      <div style="width:48px;height:48px;background:rgba(58,172,110,.15);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:24px">
        <span style="font-size:24px">🛡️</span>
      </div>

      <h1 style="font-size:1.4rem;font-weight:600;color:#F4ECDB;margin:0 0 12px;line-height:1.3">
        ${inviterName || inviterEmail} heeft u uitgenodigd
      </h1>

      <p style="font-size:.95rem;color:rgba(244,236,219,.65);line-height:1.7;margin:0 0 24px">
        U bent uitgenodigd om deel te nemen aan KloptHet Familie.
        Als familielid kunt u verdachte berichten laten controleren —
        en uw mantelzorger kan meekijken om u veilig te houden.
      </p>

      <a href="${acceptUrl}"
         style="display:inline-block;background:#3AAC6E;color:#07190F;font-weight:700;font-size:.95rem;padding:14px 28px;border-radius:10px;text-decoration:none">
        Uitnodiging accepteren →
      </a>

      <p style="font-size:.78rem;color:rgba(244,236,219,.3);margin:20px 0 0;line-height:1.6">
        Deze link is 7 dagen geldig. Heeft u geen account?
        Dan kunt u er gratis een aanmaken via de link hierboven.
      </p>
    </div>

    <!-- Footer -->
    <p style="font-size:.75rem;color:rgba(244,236,219,.2);text-align:center;margin-top:24px">
      KloptHet · Fraudebescherming voor iedereen · klopthet.nl
    </p>
  </div>
</body>
</html>`
}
