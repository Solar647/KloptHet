'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

const tiers = [
  {
    id: 'standard',
    name: 'Standaard',
    monthlyPrice: 3.99,
    yearlyPrice: 39.9,
    features: [
      'Onbeperkt controles',
      'Volledige uitleg + leermodule',
      'Scangeschiedenis (1 jaar)',
      'Wekelijkse fraude-nieuwsbrief',
    ],
    color: '#3AAC6E',
  },
  {
    id: 'family',
    name: 'Familie',
    monthlyPrice: 5.99,
    yearlyPrice: 59.9,
    features: [
      'Alles uit Standaard',
      'Tot 3 familieleden',
      'Familie-dashboard',
      'Melding bij verdacht bericht',
    ],
    color: '#5B8FE8',
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 9.99,
    yearlyPrice: 99.9,
    features: [
      'Alles uit Familie',
      'Telefonische hulplijn (24/7)',
      'Persoonlijke installatie-hulp',
      'Prioriteit-support',
    ],
    color: '#D97B2A',
  },
]

const tierLabel: Record<string, string> = {
  free: 'Gratis',
  standard: 'Standaard',
  family: 'Familie',
  premium: 'Premium',
}

type Props = {
  currentTier: string
  currentPeriodEnd: string | null
  isYearly: boolean
}

export function AbonnementClient({
  currentTier,
  currentPeriodEnd,
  isYearly: initialYearly,
}: Props) {
  const locale = useLocale()
  const router = useRouter()
  const [cancelConfirm, setCancelConfirm] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [switching, setSwitching] = useState(false)
  const [isYearly, setIsYearly] = useState(initialYearly)

  const handleCancel = async () => {
    setCancelling(true)
    await fetch('/api/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: 'free', billing: 'monthly' }),
    })
    router.refresh()
    setCancelling(false)
    setCancelConfirm(false)
  }

  const handleSwitchBilling = async () => {
    setSwitching(true)
    const newYearly = !isYearly
    await fetch('/api/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: currentTier, billing: newYearly ? 'yearly' : 'monthly' }),
    })
    setIsYearly(newYearly)
    setSwitching(false)
    router.refresh()
  }

  const tierOrder = ['free', 'standard', 'family', 'premium']

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', margin: '0 auto', maxWidth: 1100 }}>
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
          Abonnement
        </h1>
        <p style={{ color: 'rgba(244,236,219,.55)', fontFamily: 'var(--font-sans)', margin: 0 }}>
          Huidig abonnement: <strong style={{ color: '#F4ECDB' }}>{tierLabel[currentTier]}</strong>
          {currentTier !== 'free' && (
            <span>
              {' '}
              ·{' '}
              <strong style={{ color: isYearly ? '#3AAC6E' : 'rgba(244,236,219,.6)' }}>
                {isYearly ? 'Jaarlijks' : 'Maandelijks'}
              </strong>
            </span>
          )}
          {currentPeriodEnd && (
            <span>
              {' '}
              · Verlengt op{' '}
              {new Date(currentPeriodEnd).toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'long',
              })}
            </span>
          )}
        </p>
      </div>

      {/* Huidig plan banner */}
      {currentTier !== 'free' && (
        <div
          style={{
            background: 'rgba(58,172,110,.08)',
            border: '1px solid rgba(58,172,110,.2)',
            borderRadius: 14,
            padding: '1rem 1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.72rem',
                  fontWeight: 700,
                  color: '#3AAC6E',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  marginBottom: '.2rem',
                }}
              >
                Actief abonnement
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: '#F4ECDB',
                }}
              >
                {tierLabel[currentTier]} · {isYearly ? 'Jaarlijks (17% korting)' : 'Maandelijks'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
              {/* Wissel factureringscyclus */}
              <button
                onClick={handleSwitchBilling}
                disabled={switching}
                style={{
                  background: 'rgba(244,236,219,.08)',
                  border: '1px solid rgba(244,236,219,.2)',
                  borderRadius: 10,
                  padding: '.6rem 1rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.82rem',
                  color: 'rgba(244,236,219,.7)',
                  cursor: switching ? 'wait' : 'pointer',
                  opacity: switching ? 0.6 : 1,
                }}
              >
                {switching
                  ? 'Bezig…'
                  : isYearly
                    ? 'Omzetten naar maandelijks'
                    : 'Omzetten naar jaarlijks (17% korting)'}
              </button>

              {/* Opzeggen */}
              {!cancelConfirm ? (
                <button
                  onClick={() => setCancelConfirm(true)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(229,83,42,.35)',
                    borderRadius: 10,
                    padding: '.6rem 1rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.82rem',
                    color: 'rgba(229,83,42,.8)',
                    cursor: 'pointer',
                  }}
                >
                  Opzeggen
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.8rem',
                      color: 'rgba(244,236,219,.55)',
                    }}
                  >
                    Zeker?
                  </span>
                  <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    style={{
                      background: 'rgba(229,83,42,.15)',
                      border: '1px solid rgba(229,83,42,.4)',
                      borderRadius: 8,
                      padding: '.5rem .9rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.8rem',
                      color: '#E5532A',
                      cursor: cancelling ? 'wait' : 'pointer',
                      fontWeight: 700,
                    }}
                  >
                    {cancelling ? 'Bezig…' : 'Ja, opzeggen'}
                  </button>
                  <button
                    onClick={() => setCancelConfirm(false)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(244,236,219,.15)',
                      borderRadius: 8,
                      padding: '.5rem .9rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.8rem',
                      color: 'rgba(244,236,219,.5)',
                      cursor: 'pointer',
                    }}
                  >
                    Annuleren
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tier cards */}
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}
        className="pricing-grid"
      >
        {tiers.map((tier) => {
          const isCurrent = tier.id === currentTier
          const isUpgrade = tierOrder.indexOf(tier.id) > tierOrder.indexOf(currentTier)
          const price = isYearly
            ? (tier.yearlyPrice / 12).toFixed(2).replace('.', ',')
            : tier.monthlyPrice.toFixed(2).replace('.', ',')

          return (
            <div
              key={tier.id}
              style={{
                background: tier.highlighted ? 'rgba(91,143,232,.06)' : 'rgba(244,236,219,.04)',
                border: `1px solid ${isCurrent ? 'rgba(58,172,110,.4)' : tier.highlighted ? 'rgba(91,143,232,.25)' : 'rgba(244,236,219,.1)'}`,
                borderRadius: 16,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
              }}
            >
              {isCurrent && (
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#3AAC6E',
                    color: '#07190F',
                    fontSize: '.65rem',
                    fontWeight: 700,
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                    padding: '.25rem .75rem',
                    borderRadius: 9999,
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  ✓ Huidig plan
                </div>
              )}

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.75rem',
                    fontWeight: 700,
                    color: tier.color,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    marginBottom: '.3rem',
                  }}
                >
                  {tier.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '.3rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      fontSize: '2rem',
                      color: '#F4ECDB',
                    }}
                  >
                    €{price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.78rem',
                      color: 'rgba(244,236,219,.4)',
                    }}
                  >
                    /mnd{isYearly ? ', jaarlijks' : ''}
                  </span>
                </div>
                {isYearly && (
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.72rem',
                      color: '#3AAC6E',
                      marginTop: 2,
                    }}
                  >
                    €{tier.yearlyPrice.toFixed(2).replace('.', ',')}/jaar — 17% korting
                  </div>
                )}
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                  flex: 1,
                }}
              >
                {tier.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.85rem',
                      color: 'rgba(244,236,219,.75)',
                    }}
                  >
                    <span style={{ color: tier.color, flexShrink: 0, marginTop: 1 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '.85rem',
                    borderRadius: 10,
                    border: '1px solid rgba(58,172,110,.2)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.88rem',
                    color: '#3AAC6E',
                    fontWeight: 600,
                  }}
                >
                  Huidig plan
                </div>
              ) : (
                <Link
                  href={`/${locale}/abonnement/checkout?tier=${tier.id}&billing=${isYearly ? 'yearly' : 'monthly'}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '.85rem',
                    borderRadius: 10,
                    background: isUpgrade ? tier.color : 'rgba(244,236,219,.08)',
                    color: isUpgrade ? '#07190F' : 'rgba(244,236,219,.6)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.88rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: isUpgrade ? 'none' : '1px solid rgba(244,236,219,.14)',
                  }}
                >
                  {isUpgrade ? `Upgraden naar ${tier.name}` : `Wijzigen naar ${tier.name}`}
                </Link>
              )}
            </div>
          )
        })}
      </div>

      {/* Trust */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem 1.5rem',
          background: 'rgba(244,236,219,.03)',
          border: '1px solid rgba(244,236,219,.08)',
          borderRadius: 12,
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          fontFamily: 'var(--font-sans)',
          fontSize: '.8rem',
          color: 'rgba(244,236,219,.4)',
        }}
      >
        {['Geen verbintenis', 'Opzeggen wanneer u wilt', '30 dagen geld-terug-garantie'].map(
          (t) => (
            <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#3AAC6E' }}>✓</span>
              {t}
            </span>
          )
        )}
      </div>

      {/* Sterren decoratie */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '3rem' }}>
        <img
          src="/stars.jpg"
          alt=""
          aria-hidden="true"
          style={{
            width: 130,
            opacity: 0.55,
            filter: 'invert(1)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </div>
    </div>
  )
}
