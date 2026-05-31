import { createClient as createServiceClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { AcceptInviteClient } from './accept-client'

export default async function UitnodigingPage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>
}) {
  const { locale, token } = await params

  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Haal invite op
  const { data: member } = await service
    .from('family_members')
    .select('id, invited_email, status, family_id, joined_at')
    .eq('invite_token', token)
    .single()

  if (!member) {
    return (
      <InviteError message="Deze uitnodigingslink is niet geldig of verlopen." locale={locale} />
    )
  }

  if (member.status === 'active') {
    return (
      <InviteError message="Deze uitnodiging is al geaccepteerd." locale={locale} alreadyAccepted />
    )
  }

  if (member.status === 'removed') {
    return <InviteError message="Deze uitnodiging is ingetrokken." locale={locale} />
  }

  // Haal eigenaar op
  const { data: family } = await service
    .from('families')
    .select('owner_id, name')
    .eq('id', member.family_id)
    .single()

  const { data: ownerProfile } = family
    ? await service.from('profiles').select('email, full_name').eq('id', family.owner_id).single()
    : { data: null }

  const ownerName = ownerProfile?.full_name || ownerProfile?.email || 'Uw familielid'

  // Kijk of gebruiker al ingelogd is
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <AcceptInviteClient
      token={token}
      memberId={member.id}
      invitedEmail={member.invited_email}
      ownerName={ownerName}
      locale={locale}
      isLoggedIn={!!user}
      loggedInEmail={user?.email ?? null}
    />
  )
}

function InviteError({
  message,
  locale,
  alreadyAccepted,
}: {
  message: string
  locale: string
  alreadyAccepted?: boolean
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A1C10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: 440,
          background: '#0F2D1C',
          border: '1px solid rgba(244,236,219,.1)',
          borderRadius: 20,
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>
          {alreadyAccepted ? '✓' : '✕'}
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: '1.4rem',
            color: '#F4ECDB',
            margin: '0 0 .75rem',
            letterSpacing: '-.02em',
          }}
        >
          {alreadyAccepted ? 'Al geaccepteerd' : 'Link niet geldig'}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.9rem',
            color: 'rgba(244,236,219,.55)',
            margin: '0 0 1.5rem',
            lineHeight: 1.6,
          }}
        >
          {message}
        </p>
        <a
          href={`/${locale}/dashboard`}
          style={{
            display: 'inline-block',
            background: '#3AAC6E',
            color: '#07190F',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '.9rem',
            padding: '.85rem 1.75rem',
            borderRadius: 10,
            textDecoration: 'none',
          }}
        >
          Naar dashboard
        </a>
      </div>
    </div>
  )
}
