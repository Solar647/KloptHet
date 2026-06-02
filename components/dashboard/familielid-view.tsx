'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  memberId: string
  ownerName: string
  ownerEmail: string
  ownerAvatarUrl: string | null
  joinedAt: string | null
  ownerCanSeeScans: boolean
}

export function FamilielidView({
  memberId,
  ownerName,
  ownerEmail,
  ownerAvatarUrl,
  joinedAt,
  ownerCanSeeScans,
}: Props) {
  const locale = useLocale()
  const router = useRouter()
  const [leaving, setLeaving] = useState(false)
  const [confirmLeave, setConfirmLeave] = useState(false)

  const handleLeave = async () => {
    setLeaving(true)
    await fetch('/api/family/members', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId }),
    })
    router.refresh()
    setLeaving(false)
    setConfirmLeave(false)
  }

  const initials = ownerName.charAt(0).toUpperCase()

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 640, margin: '0 auto' }}>
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
          color: 'rgba(244,236,219,.5)',
          fontFamily: 'var(--font-sans)',
          fontSize: '.9rem',
          margin: '0 0 2rem',
        }}
      >
        U bent lid van een familiegroep
      </p>

      {/* Familie kaart */}
      <div
        style={{
          background: 'rgba(58,172,110,.06)',
          border: '1px solid rgba(58,172,110,.2)',
          borderRadius: 16,
          padding: '1.5rem',
          marginBottom: '1.25rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.72rem',
            fontWeight: 700,
            color: '#3AAC6E',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            marginBottom: '.85rem',
          }}
        >
          Uw familiegroep
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(58,172,110,.15)',
              border: '1.5px solid rgba(58,172,110,.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#3AAC6E',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {ownerAvatarUrl ? (
              <Image
                src={ownerAvatarUrl}
                alt={ownerName}
                width={44}
                height={44}
                unoptimized
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            ) : (
              initials
            )}
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '.95rem',
                color: '#F4ECDB',
              }}
            >
              {ownerName}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.75rem',
                color: 'rgba(244,236,219,.4)',
                marginTop: 2,
              }}
            >
              {ownerEmail}
            </div>
          </div>
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-sans)',
              fontSize: '.68rem',
              fontWeight: 700,
              color: '#3AAC6E',
              background: 'rgba(58,172,110,.1)',
              border: '1px solid rgba(58,172,110,.2)',
              padding: '.2rem .6rem',
              borderRadius: 9999,
              textTransform: 'uppercase',
              letterSpacing: '.05em',
            }}
          >
            Eigenaar
          </span>
        </div>

        {joinedAt && (
          <div
            style={{
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(244,236,219,.07)',
              fontFamily: 'var(--font-sans)',
              fontSize: '.8rem',
              color: 'rgba(244,236,219,.4)',
            }}
          >
            Lid geworden op{' '}
            {new Date(joinedAt).toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        )}
      </div>

      {/* Info kaartjes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '.75rem',
          marginBottom: '1.25rem',
        }}
      >
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.08)',
            borderRadius: 12,
            padding: '1rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.68rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.35)',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              marginBottom: '.4rem',
            }}
          >
            Toegang
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '.88rem', color: '#F4ECDB' }}>
            Gratis gebruik
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.75rem',
              color: 'rgba(244,236,219,.4)',
              marginTop: 2,
            }}
          >
            Inbegrepen bij hun abonnement
          </div>
        </div>
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.08)',
            borderRadius: 12,
            padding: '1rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.68rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.35)',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              marginBottom: '.4rem',
            }}
          >
            Scans zichtbaar
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.88rem',
              color: ownerCanSeeScans ? '#D97B2A' : '#3AAC6E',
            }}
          >
            {ownerCanSeeScans ? 'Voor eigenaar' : 'Alleen voor u'}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.75rem',
              color: 'rgba(244,236,219,.4)',
              marginTop: 2,
            }}
          >
            {ownerCanSeeScans ? 'Eigenaar kan uw scans zien' : 'Uw scans zijn privé'}
          </div>
        </div>
      </div>

      {/* Eigen familie wil */}
      <div
        style={{
          background: 'rgba(244,236,219,.03)',
          border: '1px solid rgba(244,236,219,.07)',
          borderRadius: 12,
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(244,236,219,.35)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: 1 }}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.82rem',
              color: 'rgba(244,236,219,.45)',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Wilt u uw eigen familiegroep beheren? Verlaat eerst deze groep en kies dan een{' '}
            <Link
              href={`/${locale}/abonnement`}
              style={{ color: 'rgba(58,172,110,.8)', textDecoration: 'none' }}
            >
              Familie- of Premium-abonnement
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Verlaten */}
      {!confirmLeave ? (
        <button
          onClick={() => setConfirmLeave(true)}
          style={{
            background: 'transparent',
            border: '1px solid rgba(229,83,42,.3)',
            borderRadius: 10,
            padding: '.65rem 1.1rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '.85rem',
            color: 'rgba(229,83,42,.7)',
            cursor: 'pointer',
          }}
        >
          Familiegroep verlaten
        </button>
      ) : (
        <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.85rem',
              color: 'rgba(244,236,219,.5)',
            }}
          >
            Weet u het zeker?
          </span>
          <button
            onClick={handleLeave}
            disabled={leaving}
            style={{
              background: 'rgba(229,83,42,.12)',
              border: '1px solid rgba(229,83,42,.35)',
              borderRadius: 8,
              padding: '.5rem .9rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '.82rem',
              color: '#E5532A',
              cursor: leaving ? 'wait' : 'pointer',
              fontWeight: 700,
            }}
          >
            {leaving ? 'Bezig…' : 'Ja, verlaten'}
          </button>
          <button
            onClick={() => setConfirmLeave(false)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(244,236,219,.15)',
              borderRadius: 8,
              padding: '.5rem .9rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '.82rem',
              color: 'rgba(244,236,219,.5)',
              cursor: 'pointer',
            }}
          >
            Annuleren
          </button>
        </div>
      )}
    </div>
  )
}
