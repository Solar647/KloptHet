'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { createClient } from '@/lib/supabase/client'

type Props = {
  email: string
  fullName: string
  tier: string
  status: string
  periodEnd: string | null
}

const tierLabel: Record<string, string> = {
  free: 'Gratis',
  standard: 'Standaard',
  family: 'Familie',
  premium: 'Premium',
}

const tierPrice: Record<string, string> = {
  standard: '€3,99/mnd',
  family: '€5,99/mnd',
  premium: '€9,99/mnd',
}

export function InstellingenClient({ email, fullName, tier, status, periodEnd }: Props) {
  const locale = useLocale()
  const router = useRouter()
  const [name, setName] = useState(fullName)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    await Promise.all([
      supabase
        .from('profiles')
        .update({ full_name: name })
        .eq('id', user?.id ?? ''),
      supabase.auth.updateUser({ data: { full_name: name } }),
    ])
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleDeleteAccount = async () => {
    setDeleting(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push(`/${locale}`)
  }

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 640 }}>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 500,
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          color: '#F4ECDB',
          margin: '0 0 2rem',
          letterSpacing: '-.02em',
        }}
      >
        Instellingen
      </h1>

      {/* Profiel */}
      <Section title="Profiel">
        <form onSubmit={handleSaveName}>
          <Field label="E-mailadres">
            <input value={email} disabled style={inputStyle(true)} />
          </Field>
          <Field label="Naam">
            <input
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 20))}
              placeholder="Uw naam"
              maxLength={20}
              style={inputStyle(false)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(58,172,110,.6)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(244,236,219,.14)'
              }}
            />
          </Field>
          <button type="submit" disabled={saving} style={primaryBtn(saving)}>
            {saving ? 'Opslaan…' : saved ? '✓ Opgeslagen' : 'Naam opslaan'}
          </button>
        </form>
      </Section>

      {/* Abonnement */}
      <Section title="Abonnement">
        <div
          style={{
            background: 'rgba(244,236,219,.05)',
            border: '1px solid rgba(244,236,219,.12)',
            borderRadius: 12,
            padding: '1.25rem',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#F4ECDB',
              }}
            >
              {tierLabel[tier] ?? tier}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.85rem',
                color: '#3AAC6E',
                fontWeight: 600,
              }}
            >
              {tierPrice[tier] ?? ''}
            </span>
          </div>
          {periodEnd && (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.82rem',
                color: 'rgba(244,236,219,.45)',
                margin: 0,
              }}
            >
              Volgende verlenging:{' '}
              {new Date(periodEnd).toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.82rem',
            color: 'rgba(244,236,219,.4)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Abonnement beheren, opzeggen of upgraden gaat via uw betaalportaal. Dit wordt beschikbaar
          zodra Mollie-betalingen actief zijn.
        </p>
      </Section>

      {/* Wachtwoord */}
      <Section title="Wachtwoord wijzigen">
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.9rem',
            color: 'rgba(244,236,219,.55)',
            margin: '0 0 1rem',
            lineHeight: 1.6,
          }}
        >
          U ontvangt een e-mail met een link om uw wachtwoord te wijzigen.
        </p>
        <button
          onClick={async () => {
            const supabase = createClient()
            await supabase.auth.resetPasswordForEmail(email, {
              redirectTo: `${window.location.origin}/${locale}/auth/reset`,
            })
            alert('E-mail verstuurd. Controleer uw inbox.')
          }}
          style={secondaryBtn}
        >
          Stuur reset-e-mail
        </button>
      </Section>

      {/* Account verwijderen */}
      <Section title="Account verwijderen" danger>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.9rem',
            color: 'rgba(244,236,219,.55)',
            margin: '0 0 1rem',
            lineHeight: 1.6,
          }}
        >
          Als u uw account verwijdert, worden al uw gegevens en scangeschiedenis permanent gewist.
          Dit kan niet ongedaan gemaakt worden.
        </p>
        {!deleteConfirm ? (
          <button onClick={() => setDeleteConfirm(true)} style={dangerBtn}>
            Account verwijderen
          </button>
        ) : (
          <div
            style={{
              background: 'rgba(229,83,42,.08)',
              border: '1px solid rgba(229,83,42,.25)',
              borderRadius: 12,
              padding: '1.25rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.9rem',
                color: 'rgba(244,236,219,.8)',
                margin: '0 0 1rem',
                lineHeight: 1.6,
                fontWeight: 600,
              }}
            >
              Weet u het zeker? Dit kan niet ongedaan worden gemaakt.
            </p>
            <div style={{ display: 'flex', gap: '.75rem' }}>
              <button onClick={handleDeleteAccount} disabled={deleting} style={dangerBtn}>
                {deleting ? 'Bezig…' : 'Ja, verwijder mijn account'}
              </button>
              <button onClick={() => setDeleteConfirm(false)} style={secondaryBtn}>
                Annuleren
              </button>
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}

function Section({
  title,
  children,
  danger,
}: {
  title: string
  children: React.ReactNode
  danger?: boolean
}) {
  return (
    <div
      style={{
        marginBottom: '2rem',
        paddingBottom: '2rem',
        borderBottom: '1px solid rgba(244,236,219,.08)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: '.82rem',
          color: danger ? 'rgba(229,83,42,.7)' : 'rgba(244,236,219,.5)',
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          margin: '0 0 1.25rem',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-sans)',
          fontSize: '.78rem',
          fontWeight: 600,
          color: 'rgba(244,236,219,.55)',
          marginBottom: 6,
          letterSpacing: '.02em',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle = (disabled: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '.8rem 1rem',
  background: disabled ? 'rgba(244,236,219,.03)' : 'rgba(244,236,219,.06)',
  border: '1px solid rgba(244,236,219,.14)',
  borderRadius: 10,
  color: disabled ? 'rgba(244,236,219,.4)' : '#F4ECDB',
  fontSize: '.95rem',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  boxSizing: 'border-box',
  cursor: disabled ? 'not-allowed' : 'text',
})

const primaryBtn = (disabled: boolean): React.CSSProperties => ({
  padding: '.8rem 1.5rem',
  borderRadius: 10,
  border: 'none',
  background: '#3AAC6E',
  color: '#07190F',
  fontFamily: 'var(--font-sans)',
  fontSize: '.92rem',
  fontWeight: 700,
  cursor: disabled ? 'wait' : 'pointer',
  opacity: disabled ? 0.7 : 1,
})

const secondaryBtn: React.CSSProperties = {
  padding: '.8rem 1.25rem',
  borderRadius: 10,
  background: 'rgba(244,236,219,.07)',
  border: '1px solid rgba(244,236,219,.16)',
  color: '#F4ECDB',
  fontFamily: 'var(--font-sans)',
  fontSize: '.92rem',
  fontWeight: 600,
  cursor: 'pointer',
}

const dangerBtn: React.CSSProperties = {
  padding: '.8rem 1.25rem',
  borderRadius: 10,
  border: 'none',
  background: 'rgba(229,83,42,.15)',
  color: '#E5532A',
  fontFamily: 'var(--font-sans)',
  fontSize: '.92rem',
  fontWeight: 600,
  cursor: 'pointer',
}
