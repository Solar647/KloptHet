'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { FamilyNavIcon, CheckIcon, ArrowRightIcon } from '@/components/shared/icons'

type Props = {
  tier: string
  userEmail: string
  initialInvited: { email: string; status: string }[]
}

const maxMembers: Record<string, number> = {
  free: 1,
  standard: 1,
  family: 5,
  premium: 5,
}

export function FamilieClient({ tier, userEmail, initialInvited }: Props) {
  const locale = useLocale()
  const [inviteEmail, setInviteEmail] = useState('')
  const [invited, setInvited] = useState(initialInvited)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const canInvite = tier === 'family' || tier === 'premium'
  const max = maxMembers[tier] ?? 1
  const totalMembers = 1 + invited.length // eigenaar + uitgenodigden

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim()) return
    if (!canInvite) return
    if (totalMembers >= max) {
      setError(`Maximum van ${max} leden bereikt.`)
      return
    }
    setError('')
    setSending(true)

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      setSending(false)
      return
    }

    // Zoek of er al een familie bestaat voor deze user
    let familyId: string | null = null
    const { data: existingFamily } = await supabase
      .from('families')
      .select('id')
      .eq('owner_id', user.id)
      .single()

    if (existingFamily) {
      familyId = existingFamily.id
    } else {
      const { data: newFamily } = await supabase
        .from('families')
        .insert({ owner_id: user.id, name: 'Mijn Familie' })
        .select('id')
        .single()
      familyId = newFamily?.id ?? null
    }

    if (familyId) {
      await supabase.from('family_members').insert({
        family_id: familyId,
        role: 'member',
        invited_at: new Date().toISOString(),
      })
    }

    setInvited((prev) => [...prev, { email: inviteEmail, status: 'uitnodiging verstuurd' }])
    setInviteEmail('')
    setSending(false)
  }

  const removeInvited = (email: string) => {
    setInvited((prev) => prev.filter((m) => m.email !== email))
  }

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 720 }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            color: '#F4ECDB',
            margin: '0 0 .35rem',
            letterSpacing: '-.02em',
          }}
        >
          Familie
        </h1>
        <p style={{ color: 'rgba(244,236,219,.55)', fontFamily: 'var(--font-sans)', margin: 0 }}>
          {totalMembers} van {max} plekken bezet
        </p>
      </div>

      {/* Zachte upgrade banner — alleen bij geen familie-abonnement */}
      {!canInvite && (
        <div
          style={{
            background: 'rgba(91,143,232,.08)',
            border: '1px solid rgba(91,143,232,.2)',
            borderRadius: 14,
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: 'rgba(91,143,232,.9)', display: 'flex' }}>
              <FamilyNavIcon size={18} strokeWidth={1.6} />
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.88rem',
                color: 'rgba(244,236,219,.7)',
              }}
            >
              Upgrade naar <strong style={{ color: '#F4ECDB' }}>Familie</strong> om tot 5 leden uit
              te nodigen.
            </span>
          </div>
          <Link
            href={`/${locale}/abonnement/checkout?tier=family`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(91,143,232,.2)',
              border: '1px solid rgba(91,143,232,.35)',
              borderRadius: 8,
              padding: '.5rem 1rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '.82rem',
              fontWeight: 700,
              color: 'rgba(91,143,232,1)',
              textDecoration: 'none',
            }}
          >
            Upgraden <ArrowRightIcon size={13} strokeWidth={2.2} />
          </Link>
        </div>
      )}

      {/* Leden lijst */}
      <div
        style={{
          background: 'rgba(244,236,219,.04)',
          border: '1px solid rgba(244,236,219,.1)',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(244,236,219,.08)',
            fontFamily: 'var(--font-sans)',
            fontSize: '.78rem',
            fontWeight: 700,
            color: 'rgba(244,236,219,.45)',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
          }}
        >
          Familieleden
        </div>

        {/* Eigenaar */}
        <div
          style={{
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'rgba(58,172,110,.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans)',
                fontSize: '.88rem',
                fontWeight: 700,
                color: '#3AAC6E',
                flexShrink: 0,
              }}
            >
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '.9rem',
                  color: '#F4ECDB',
                }}
              >
                U (eigenaar)
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.75rem',
                  color: 'rgba(244,236,219,.4)',
                }}
              >
                {userEmail}
              </div>
            </div>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.7rem',
              fontWeight: 700,
              color: '#3AAC6E',
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              background: 'rgba(58,172,110,.1)',
              padding: '.2rem .6rem',
              borderRadius: 9999,
            }}
          >
            Eigenaar
          </span>
        </div>

        {/* Uitgenodigde leden */}
        {invited.map((member, i) => (
          <div
            key={i}
            style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid rgba(244,236,219,.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'rgba(244,236,219,.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.88rem',
                  color: 'rgba(244,236,219,.4)',
                  flexShrink: 0,
                }}
              >
                {member.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.88rem',
                    color: 'rgba(244,236,219,.75)',
                  }}
                >
                  {member.email}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    color: 'rgba(244,236,219,.35)',
                  }}
                >
                  {member.status}
                </div>
              </div>
            </div>
            <button
              onClick={() => removeInvited(member.email)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(229,83,42,.6)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '.8rem',
              }}
            >
              Verwijderen
            </button>
          </div>
        ))}

        {invited.length === 0 && (
          <div
            style={{
              padding: '1.5rem',
              borderTop: '1px solid rgba(244,236,219,.06)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.85rem',
                color: 'rgba(244,236,219,.3)',
                margin: 0,
              }}
            >
              Nog geen leden uitgenodigd.
            </p>
          </div>
        )}
      </div>

      {/* Uitnodigingsformulier */}
      <div
        style={{
          background: 'rgba(244,236,219,.04)',
          border: '1px solid rgba(244,236,219,.1)',
          borderRadius: 16,
          padding: '1.5rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: '.85rem',
            color: 'rgba(244,236,219,.6)',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            margin: '0 0 1rem',
          }}
        >
          Familielid uitnodigen
        </h3>

        {!canInvite ? (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.88rem',
              color: 'rgba(244,236,219,.4)',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Upgrade naar het Familie-abonnement om leden uit te nodigen.
          </p>
        ) : totalMembers >= max ? (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.88rem',
              color: 'rgba(244,236,219,.4)',
              margin: 0,
            }}
          >
            Maximum van {max} leden bereikt.
          </p>
        ) : (
          <form
            onSubmit={handleInvite}
            style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}
          >
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="e-mailadres familielid"
              required
              style={{
                flex: 1,
                minWidth: 200,
                padding: '.8rem 1rem',
                background: 'rgba(244,236,219,.06)',
                border: '1px solid rgba(244,236,219,.16)',
                borderRadius: 10,
                color: '#F4ECDB',
                fontSize: '.95rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(58,172,110,.5)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(244,236,219,.16)'
              }}
            />
            <button
              type="submit"
              disabled={sending}
              style={{
                padding: '.8rem 1.25rem',
                borderRadius: 10,
                border: 'none',
                background: '#3AAC6E',
                color: '#07190F',
                fontFamily: 'var(--font-sans)',
                fontSize: '.9rem',
                fontWeight: 700,
                cursor: sending ? 'wait' : 'pointer',
                opacity: sending ? 0.7 : 1,
                whiteSpace: 'nowrap',
              }}
            >
              {sending ? 'Bezig…' : 'Uitnodigen →'}
            </button>
          </form>
        )}

        {error && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.82rem',
              color: '#E5532A',
              margin: '.5rem 0 0',
            }}
          >
            {error}
          </p>
        )}

        {canInvite && totalMembers < max && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.75rem',
              color: 'rgba(244,236,219,.3)',
              margin: '.75rem 0 0',
              lineHeight: 1.5,
            }}
          >
            Het uitgenodigde familielid ontvangt een e-mail en kan gratis gebruik maken van uw
            abonnement.
          </p>
        )}
      </div>

      {/* Info */}
      <div
        style={{
          marginTop: '1.25rem',
          background: 'rgba(244,236,219,.03)',
          border: '1px solid rgba(244,236,219,.07)',
          borderRadius: 12,
          padding: '.9rem 1.1rem',
          display: 'flex',
          gap: 10,
        }}
      >
        <span style={{ flexShrink: 0 }}>ℹ️</span>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.8rem',
            color: 'rgba(244,236,219,.4)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Als mantelzorger ontvangt u een melding wanneer een familielid een bericht controleert met
          een hoge risico-indicatie.
        </p>
      </div>
    </div>
  )
}
