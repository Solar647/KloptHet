'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { AuthCard } from '@/components/auth/auth-card'
import { AuthField } from '@/components/auth/auth-field'

export default function WachtwoordVergetenPage() {
  const locale = useLocale()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/${locale}/auth/callback?next=/${locale}/auth/reset`,
    })
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <AuthCard
        title="Controleer uw e-mail."
        subtitle="Als dit e-mailadres bij ons bekend is, ontvangt u binnen enkele minuten een resetlink."
      >
        <div
          style={{
            background: 'rgba(58,172,110,.1)',
            border: '1px solid rgba(58,172,110,.25)',
            borderRadius: 12,
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
          }}
        >
          <span style={{ color: '#3AAC6E', fontSize: '1.1rem', lineHeight: 1.4 }}>✓</span>
          <p
            style={{
              margin: 0,
              fontSize: '.9rem',
              color: 'rgba(244,236,219,.8)',
              lineHeight: 1.6,
              fontFamily: 'var(--font-sans)',
            }}
          >
            We hebben een e-mail gestuurd naar <strong style={{ color: '#F4ECDB' }}>{email}</strong>
            . Controleer ook uw spammap.
          </p>
        </div>
        <Link
          href={`/${locale}/inloggen`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '1rem',
            background: 'rgba(244,236,219,.08)',
            border: '1px solid rgba(244,236,219,.16)',
            borderRadius: 12,
            color: '#F4ECDB',
            fontSize: '.95rem',
            fontWeight: 600,
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
          }}
        >
          ← Terug naar inloggen
        </Link>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Wachtwoord vergeten?"
      subtitle="Vul uw e-mailadres in en u ontvangt een link om uw wachtwoord opnieuw in te stellen."
    >
      <form onSubmit={handleSubmit}>
        <AuthField
          label="E-mailadres"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="uw@email.nl"
          required
          autoComplete="email"
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: '#3AAC6E',
            color: '#07190F',
            border: 'none',
            borderRadius: 12,
            fontSize: '1rem',
            fontWeight: 700,
            cursor: loading ? 'wait' : 'pointer',
            fontFamily: 'var(--font-sans)',
            boxShadow: '0 8px 24px rgba(58,172,110,.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: loading ? 0.7 : 1,
            transition: 'opacity .2s',
            marginBottom: '1.25rem',
          }}
        >
          {loading ? 'Bezig…' : 'Stuur resetlink'}
          {!loading && <span>→</span>}
        </button>

        <Link
          href={`/${locale}/inloggen`}
          style={{
            display: 'block',
            textAlign: 'center',
            fontSize: '.85rem',
            color: 'rgba(244,236,219,.5)',
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
          }}
        >
          ← Terug naar inloggen
        </Link>
      </form>
    </AuthCard>
  )
}
