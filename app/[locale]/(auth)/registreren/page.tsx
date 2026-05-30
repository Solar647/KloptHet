'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { AuthCard } from '@/components/auth/auth-card'
import { AuthField } from '@/components/auth/auth-field'

export default function RegistrerenPage() {
  const locale = useLocale()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    setSuccess(true)
    setLoading(false)
  }

  const handleGoogle = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/${locale}/auth/callback` },
    })
  }

  // Poll voor bevestiging — zodra bevestigd op mobiel, login automatisch op pc
  useEffect(() => {
    if (!success) return
    const supabase = createClient()
    const interval = setInterval(async () => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (!error && data.session) {
        clearInterval(interval)
        router.push(`/${locale}/dashboard`)
        router.refresh()
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [success, email, password, locale, router])

  if (success) {
    return (
      <AuthCard
        title="Controleer uw e-mail."
        subtitle={`We hebben een bevestigingslink gestuurd naar ${email}`}
      >
        <div
          style={{
            background: 'rgba(58,172,110,.1)',
            border: '1px solid rgba(58,172,110,.25)',
            borderRadius: 12,
            padding: '1rem 1.25rem',
            fontSize: '.9rem',
            color: 'rgba(244,236,219,.8)',
            lineHeight: 1.6,
            fontFamily: 'var(--font-sans)',
          }}
        >
          ✓ Klik op de link in uw e-mail om uw e-mailadres te bevestigen. De link werkt op elk
          apparaat. Controleer ook uw spammap.
        </div>
        <Link
          href={`/${locale}/inloggen`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: '1rem',
            padding: '1rem',
            background: 'rgba(58,172,110,.12)',
            border: '1px solid rgba(58,172,110,.3)',
            borderRadius: 12,
            color: '#3AAC6E',
            fontFamily: 'var(--font-sans)',
            fontSize: '.92rem',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          E-mail bevestigd? Klik hier om in te loggen →
        </Link>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Maak een account aan." subtitle="Eerste maand gratis — geen creditcard nodig.">
      <form onSubmit={handleSubmit}>
        <AuthField
          label="Uw naam"
          type="text"
          value={name}
          onChange={setName}
          placeholder="Jan de Vries"
          autoComplete="name"
        />
        <AuthField
          label="E-mailadres"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="uw@email.nl"
          required
          autoComplete="email"
        />
        <AuthField
          label="Wachtwoord"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Minimaal 8 tekens"
          required
          autoComplete="new-password"
        />

        {/* Akkoord checkbox */}
        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            marginBottom: '1.5rem',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required
            style={{ marginTop: 3, accentColor: '#3AAC6E', width: 16, height: 16, flexShrink: 0 }}
          />
          <span
            style={{
              fontSize: '.82rem',
              color: 'rgba(244,236,219,.55)',
              lineHeight: 1.55,
              fontFamily: 'var(--font-sans)',
            }}
          >
            Ik ga akkoord met de{' '}
            <Link
              href={`/${locale}/voorwaarden`}
              style={{ color: 'rgba(58,172,110,.9)', textDecoration: 'none' }}
            >
              Algemene Voorwaarden
            </Link>{' '}
            en{' '}
            <Link
              href={`/${locale}/privacy`}
              style={{ color: 'rgba(58,172,110,.9)', textDecoration: 'none' }}
            >
              Privacyverklaring
            </Link>
          </span>
        </label>

        {error && (
          <div
            style={{
              background: 'rgba(229,83,42,.12)',
              border: '1px solid rgba(229,83,42,.3)',
              borderRadius: 10,
              padding: '.75rem 1rem',
              marginBottom: '1rem',
              fontSize: '.88rem',
              color: '#FF8585',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {error}
          </div>
        )}

        <SubmitButton loading={loading} disabled={!agreed}>
          Account aanmaken
        </SubmitButton>

        <Divider />

        <GoogleButton onClick={handleGoogle}>Registreren met Google</GoogleButton>

        <p
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '.82rem',
            color: 'rgba(244,236,219,.45)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          Al een account?{' '}
          <Link
            href={`/${locale}/inloggen`}
            style={{ color: 'rgba(58,172,110,.9)', fontWeight: 600, textDecoration: 'none' }}
          >
            Inloggen
          </Link>
        </p>
      </form>
    </AuthCard>
  )
}

function SubmitButton({
  loading,
  disabled,
  children,
}: {
  loading: boolean
  disabled: boolean
  children: string
}) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      style={{
        width: '100%',
        padding: '1rem',
        background: '#3AAC6E',
        color: '#07190F',
        border: 'none',
        borderRadius: 12,
        fontSize: '1rem',
        fontWeight: 700,
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-sans)',
        boxShadow: '0 8px 24px rgba(58,172,110,.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        opacity: loading || disabled ? 0.6 : 1,
        transition: 'opacity .2s, transform .15s',
      }}
      onMouseEnter={(e) => {
        if (!loading && !disabled) e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {loading ? 'Bezig…' : children}
      {!loading && <span>→</span>}
    </button>
  )
}

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.25rem 0' }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(244,236,219,.1)' }} />
      <span
        style={{
          fontSize: '.75rem',
          color: 'rgba(244,236,219,.35)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        of
      </span>
      <div style={{ flex: 1, height: 1, background: 'rgba(244,236,219,.1)' }} />
    </div>
  )
}

function GoogleButton({ children, onClick }: { children: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        padding: '.9rem',
        background: 'rgba(244,236,219,.07)',
        border: '1px solid rgba(244,236,219,.16)',
        borderRadius: 12,
        color: '#F4ECDB',
        fontSize: '.95rem',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        transition: 'background .15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(244,236,219,.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(244,236,219,.07)'
      }}
    >
      <GoogleIcon />
      {children}
    </button>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}
