'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Props = {
  token: string
  memberId: string
  invitedEmail: string
  ownerName: string
  locale: string
  isLoggedIn: boolean
  loggedInEmail: string | null
}

export function AcceptInviteClient({
  token,
  memberId: _memberId,
  invitedEmail,
  ownerName,
  locale,
  isLoggedIn,
  loggedInEmail,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const accept = async () => {
    setLoading(true)
    setError('')

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = `/${locale}/registreren?invite=${token}`
      return
    }

    const res = await fetch('/api/family/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Er ging iets mis.')
      setLoading(false)
      return
    }

    setDone(true)
    setLoading(false)
    setTimeout(() => {
      window.location.href = `/${locale}/dashboard`
    }, 2000)
  }

  if (done) {
    return (
      <Page>
        <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>✓</div>
        <h1 style={heading}>Welkom in de familie!</h1>
        <p style={sub}>U bent toegevoegd. U wordt doorgestuurd naar uw dashboard…</p>
      </Page>
    )
  }

  return (
    <Page>
      {/* Schild icoon */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 18,
          background: 'rgba(58,172,110,.15)',
          border: '1.5px solid rgba(58,172,110,.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3AAC6E"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>

      <div
        style={{
          fontSize: '.72rem',
          fontWeight: 700,
          color: 'rgba(244,236,219,.4)',
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          marginBottom: '.75rem',
          fontFamily: 'ui-monospace,monospace',
        }}
      >
        Uitnodiging
      </div>

      <h1 style={heading}>{ownerName} heeft u uitgenodigd</h1>

      <p style={sub}>
        U bent uitgenodigd om deel te nemen aan{' '}
        <strong style={{ color: '#F4ECDB' }}>KloptHet Familie</strong>. Als familielid kunt u
        verdachte berichten laten controleren — en uw mantelzorger kan meekijken om u veilig te
        houden.
      </p>

      {/* Wie accepteert */}
      {isLoggedIn && (
        <div
          style={{
            background: 'rgba(244,236,219,.05)',
            border: '1px solid rgba(244,236,219,.1)',
            borderRadius: 10,
            padding: '.75rem 1rem',
            margin: '1.25rem 0',
            fontFamily: 'var(--font-sans)',
            fontSize: '.84rem',
            color: 'rgba(244,236,219,.55)',
            textAlign: 'left',
          }}
        >
          U accepteert als <strong style={{ color: '#F4ECDB' }}>{loggedInEmail}</strong>
          {loggedInEmail?.toLowerCase() !== invitedEmail.toLowerCase() && (
            <div style={{ marginTop: '.35rem', color: 'rgba(217,123,42,.8)', fontSize: '.78rem' }}>
              Let op: de uitnodiging was verstuurd naar {invitedEmail}
            </div>
          )}
        </div>
      )}

      {error && (
        <div
          style={{
            color: '#E5532A',
            fontFamily: 'var(--font-sans)',
            fontSize: '.85rem',
            margin: '0 0 1rem',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', marginTop: '1.5rem' }}>
        <button
          onClick={accept}
          disabled={loading}
          style={{
            background: '#3AAC6E',
            color: '#07190F',
            border: 'none',
            borderRadius: 12,
            padding: '1rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.7 : 1,
            width: '100%',
          }}
        >
          {loading
            ? 'Even wachten…'
            : isLoggedIn
              ? 'Uitnodiging accepteren'
              : 'Aanmelden om te accepteren'}
        </button>

        <a
          href={`/${locale}`}
          style={{
            display: 'block',
            textAlign: 'center',
            fontFamily: 'var(--font-sans)',
            fontSize: '.85rem',
            color: 'rgba(244,236,219,.35)',
            textDecoration: 'none',
          }}
        >
          Afwijzen
        </a>
      </div>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.75rem',
          color: 'rgba(244,236,219,.25)',
          marginTop: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        Door te accepteren gaat u akkoord met de{' '}
        <a
          href={`/${locale}/voorwaarden`}
          style={{ color: 'rgba(244,236,219,.4)', textDecoration: 'underline' }}
        >
          gebruiksvoorwaarden
        </a>{' '}
        van KloptHet.
      </p>
    </Page>
  )
}

function Page({ children }: { children: React.ReactNode }) {
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
          width: '100%',
          background: '#0F2D1C',
          border: '1px solid rgba(58,172,110,.2)',
          borderRadius: 22,
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}
      >
        {children}
      </div>
    </div>
  )
}

const heading: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 500,
  fontSize: '1.5rem',
  color: '#F4ECDB',
  margin: '0 0 .75rem',
  letterSpacing: '-.02em',
  lineHeight: 1.2,
}

const sub: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '.9rem',
  color: 'rgba(244,236,219,.55)',
  lineHeight: 1.65,
  margin: 0,
}
