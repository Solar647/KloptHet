'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { FamilyNavIcon, CheckIcon, ArrowRightIcon } from '@/components/shared/icons'

type Props = {
  tier: string
  userEmail: string
}

const mockMembers = [{ name: 'U (eigenaar)', email: '', role: 'owner', joined: true }]

export function FamilieClient({ tier, userEmail }: Props) {
  const locale = useLocale()
  const [inviteEmail, setInviteEmail] = useState('')
  const [invited, setInvited] = useState<string[]>([])
  const [sending, setSending] = useState(false)

  const canInvite = tier === 'family' || tier === 'premium'
  const maxMembers = tier === 'premium' ? 5 : tier === 'family' ? 5 : 1

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim()) return
    setSending(true)
    await new Promise((r) => setTimeout(r, 800))
    setInvited((prev) => [...prev, inviteEmail])
    setInviteEmail('')
    setSending(false)
  }

  if (!canInvite) {
    return (
      <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 720 }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            color: '#F4ECDB',
            margin: '0 0 .35rem',
            letterSpacing: '-.02em',
          }}
        >
          Familie
        </h1>
        <p
          style={{
            color: 'rgba(244,236,219,.55)',
            fontFamily: 'var(--font-sans)',
            margin: '0 0 2rem',
          }}
        >
          Bescherm uw hele gezin met één abonnement.
        </p>

        <div
          style={{
            background: 'rgba(244,236,219,.05)',
            border: '1px solid rgba(244,236,219,.14)',
            borderRadius: 16,
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: 'rgba(244,236,219,.3)',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <FamilyNavIcon size={40} strokeWidth={1.2} />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: '1.4rem',
              color: '#F4ECDB',
              margin: '0 0 .75rem',
            }}
          >
            Upgrade naar Familie of Premium
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.95rem',
              color: 'rgba(244,236,219,.6)',
              margin: '0 0 1.5rem',
              lineHeight: 1.65,
              maxWidth: 400,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Met het Familie-abonnement kunt u tot 5 familieleden uitnodigen. U ontvangt een melding
            als iemand een verdacht bericht controleert.
          </p>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', alignItems: 'center' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.88rem',
                color: 'rgba(244,236,219,.65)',
                display: 'flex',
                flexDirection: 'column',
                gap: '.4rem',
                marginBottom: '.75rem',
              }}
            >
              {[
                'Tot 5 familieleden',
                'Melding bij verdacht bericht',
                'Gedeelde scangeschiedenis',
                'Mantelzorger-dashboard',
              ].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#3AAC6E', display: 'flex', flexShrink: 0 }}>
                    <CheckIcon size={14} strokeWidth={2.5} />
                  </span>{' '}
                  {f}
                </div>
              ))}
            </div>
            <Link
              href={`/${locale}/abonnement`}
              style={{
                background: '#3AAC6E',
                color: '#07190F',
                padding: '.9rem 1.75rem',
                borderRadius: 12,
                fontFamily: 'var(--font-sans)',
                fontSize: '.95rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Upgrade naar Familie — €5,99/mnd <ArrowRightIcon size={14} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 720 }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            color: '#F4ECDB',
            margin: '0 0 .35rem',
            letterSpacing: '-.02em',
          }}
        >
          Familie
        </h1>
        <p style={{ color: 'rgba(244,236,219,.55)', fontFamily: 'var(--font-sans)', margin: 0 }}>
          {mockMembers.length + invited.length} van {maxMembers} plekken bezet.
        </p>
      </div>

      {/* Leden */}
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
            fontSize: '.82rem',
            fontWeight: 700,
            color: 'rgba(244,236,219,.5)',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
          }}
        >
          Familieleden
        </div>

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
              }}
            >
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.9rem',
                  color: '#F4ECDB',
                  fontWeight: 600,
                }}
              >
                U (eigenaar)
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.78rem',
                  color: 'rgba(244,236,219,.45)',
                }}
              >
                {userEmail}
              </div>
            </div>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.72rem',
              color: '#3AAC6E',
              fontWeight: 700,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
            }}
          >
            Eigenaar
          </span>
        </div>

        {invited.map((email, i) => (
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
                  color: 'rgba(244,236,219,.5)',
                }}
              >
                {email.charAt(0).toUpperCase()}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.9rem',
                    color: 'rgba(244,236,219,.7)',
                  }}
                >
                  {email}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.78rem',
                    color: 'rgba(244,236,219,.4)',
                  }}
                >
                  Uitnodiging verzonden
                </div>
              </div>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.72rem',
                color: '#D97B2A',
                fontWeight: 600,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
              }}
            >
              In afwachting
            </span>
          </div>
        ))}
      </div>

      {/* Uitnodigen */}
      {mockMembers.length + invited.length < maxMembers && (
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
              fontSize: '.9rem',
              color: 'rgba(244,236,219,.7)',
              margin: '0 0 1rem',
              letterSpacing: '.06em',
              textTransform: 'uppercase',
            }}
          >
            Familielid uitnodigen
          </h3>
          <form onSubmit={handleInvite} style={{ display: 'flex', gap: '.75rem' }}>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="e-mailadres familielid"
              required
              style={{
                flex: 1,
                padding: '.8rem 1rem',
                background: 'rgba(244,236,219,.06)',
                border: '1px solid rgba(244,236,219,.16)',
                borderRadius: 10,
                color: '#F4ECDB',
                fontSize: '.95rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
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
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.78rem',
              color: 'rgba(244,236,219,.35)',
              margin: '.75rem 0 0',
              lineHeight: 1.5,
            }}
          >
            De uitgenodigde persoon ontvangt een e-mail en kan daarna gratis gebruik maken van uw
            abonnement.
          </p>
        </div>
      )}

      {/* Info box */}
      <div
        style={{
          marginTop: '1.5rem',
          background: 'rgba(244,236,219,.04)',
          border: '1px solid rgba(244,236,219,.08)',
          borderRadius: 12,
          padding: '1rem 1.25rem',
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
        }}
      >
        <span style={{ flexShrink: 0 }}>ℹ️</span>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.82rem',
            color: 'rgba(244,236,219,.45)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Als mantelzorger ontvangt u een melding wanneer een familielid een bericht controleert met
          een hoge risico-indicatie. U kunt dan contact opnemen om te helpen.
        </p>
      </div>
    </div>
  )
}
