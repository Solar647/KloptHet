'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { AuthCard } from '@/components/auth/auth-card'
import { AuthField } from '@/components/auth/auth-field'

export default function ResetPage() {
  const locale = useLocale()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Supabase zet de sessie via de URL hash — even wachten
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => {
      setReady(!!data.session)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Wachtwoorden komen niet overeen.')
      return
    }
    if (password.length < 8) {
      setError('Wachtwoord moet minimaal 8 tekens zijn.')
      return
    }
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError('Er ging iets mis. Probeer opnieuw via wachtwoord vergeten.')
      setLoading(false)
      return
    }
    router.push(`/${locale}/dashboard`)
  }

  if (!ready) {
    return (
      <AuthCard title="Bezig met laden…" subtitle="Even geduld.">
        <div style={{ height: 60 }} />
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Nieuw wachtwoord instellen."
      subtitle="Kies een wachtwoord van minimaal 8 tekens."
    >
      <form onSubmit={handleSubmit}>
        <AuthField
          label="Nieuw wachtwoord"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Minimaal 8 tekens"
          required
          autoComplete="new-password"
        />
        <AuthField
          label="Herhaal wachtwoord"
          type="password"
          value={confirm}
          onChange={setConfirm}
          placeholder="Nogmaals uw wachtwoord"
          required
          autoComplete="new-password"
        />

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
            opacity: loading ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {loading ? 'Bezig…' : 'Wachtwoord opslaan →'}
        </button>
      </form>
    </AuthCard>
  )
}
