import Link from 'next/link'
import { AuthCard } from '@/components/auth/auth-card'

export default async function BevestigdPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <AuthCard
      title="E-mail bevestigd!"
      subtitle="Uw account is actief. U kunt nu inloggen op elk apparaat."
    >
      <div
        style={{
          background: 'rgba(58,172,110,.1)',
          border: '1px solid rgba(58,172,110,.25)',
          borderRadius: 12,
          padding: '1.25rem',
          marginBottom: '1.25rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(58,172,110,.15)',
            border: '2px solid rgba(58,172,110,.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3AAC6E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.95rem',
            color: 'rgba(244,236,219,.85)',
            margin: '0 0 .4rem',
            fontWeight: 600,
          }}
        >
          Uw e-mailadres is bevestigd.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.85rem',
            color: 'rgba(244,236,219,.5)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Ga terug naar het apparaat waarop u wilt inloggen en klik op de knop hieronder.
        </p>
      </div>

      <Link
        href={`/${locale}/inloggen`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: '100%',
          padding: '1rem',
          background: '#3AAC6E',
          color: '#07190F',
          borderRadius: 12,
          fontSize: '1rem',
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(58,172,110,.25)',
        }}
      >
        Inloggen →
      </Link>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.75rem',
          color: 'rgba(244,236,219,.3)',
          textAlign: 'center',
          marginTop: '.75rem',
          lineHeight: 1.5,
        }}
      >
        U kunt inloggen op elk apparaat — pc, telefoon of tablet.
      </p>
    </AuthCard>
  )
}
