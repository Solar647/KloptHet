'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

type Props = {
  email: string
  fullName: string
  avatarUrl: string | null
  userId: string
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

export function InstellingenClient({
  email,
  fullName,
  avatarUrl: initialAvatarUrl,
  userId,
  tier,
  status,
  periodEnd,
}: Props) {
  const locale = useLocale()
  const router = useRouter()
  const [name, setName] = useState(fullName)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 3 * 1024 * 1024) {
      alert('Maximaal 3MB')
      return
    }

    setUploadingAvatar(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const path = `${userId}/avatar.${ext}`

    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (!error) {
      const {
        data: { publicUrl },
      } = supabase.storage.from('avatars').getPublicUrl(path)
      const urlWithCache = `${publicUrl}?t=${Date.now()}`
      await supabase.from('profiles').update({ avatar_url: urlWithCache }).eq('id', userId)
      setAvatarUrl(urlWithCache)
      router.refresh()
    }
    setUploadingAvatar(false)
  }

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
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', margin: '0 auto', maxWidth: 1000 }}>
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
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(30,80,180,.2)',
              border: '2px solid rgba(30,80,180,.35)',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '1.3rem',
              color: 'rgba(100,160,255,.9)',
            }}
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Profielfoto"
                unoptimized
                width={64}
                height={64}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            ) : (
              (fullName || email).charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
              style={{ display: 'none' }}
              onChange={handleAvatarUpload}
            />
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              disabled={uploadingAvatar}
              style={{
                background: 'rgba(244,236,219,.08)',
                border: '1px solid rgba(244,236,219,.18)',
                borderRadius: 8,
                padding: '.5rem 1rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '.82rem',
                color: '#F4ECDB',
                cursor: uploadingAvatar ? 'wait' : 'pointer',
                opacity: uploadingAvatar ? 0.6 : 1,
              }}
            >
              {uploadingAvatar ? 'Uploaden…' : 'Foto wijzigen'}
            </button>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.72rem',
                color: 'rgba(244,236,219,.35)',
                margin: '.35rem 0 0',
              }}
            >
              JPG, PNG of WebP · max. 3MB
            </p>
          </div>
        </div>

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

      {/* Uitloggen */}
      <Section title="Uitloggen">
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.9rem',
            color: 'rgba(244,236,219,.55)',
            margin: '0 0 1rem',
            lineHeight: 1.6,
          }}
        >
          U bent ingelogd als <strong style={{ color: '#F4ECDB' }}>{email}</strong>.
        </p>
        <button
          onClick={async () => {
            const supabase = createClient()
            await supabase.auth.signOut()
            router.push(`/${locale}`)
          }}
          style={secondaryBtn}
        >
          Uitloggen
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
