'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { createClient } from '@/lib/supabase/client'

const tiers = [
  {
    name: 'Standaard',
    tagline: 'Voor regelmatig gebruik',
    monthly: 3.99,
    yearly: 39.9,
    features: [
      'Onbeperkt controles',
      'Volledige uitleg + leermodule',
      'Scangeschiedenis (1 jaar)',
      'Wekelijkse fraude-nieuwsbrief',
    ],
    cta: '14 dagen gratis proberen',
    highlight: false,
  },
  {
    name: 'Familie',
    tagline: 'Bescherm uw hele gezin',
    monthly: 5.99,
    yearly: 59.9,
    features: [
      'Onbeperkt controles',
      'Tot 5 familieleden',
      'Mantelzorger-dashboard',
      'Melding bij verdacht bericht',
      'Wekelijkse fraude-nieuwsbrief',
    ],
    cta: 'Familie beschermen',
    highlight: true,
    badge: 'Meest gekozen',
  },
  {
    name: 'Premium',
    tagline: 'Maximale bescherming',
    monthly: 9.99,
    yearly: 99.9,
    features: [
      'Alles uit Familie',
      'Telefonische hulplijn (24/7)',
      'Persoonlijke installatie-hulp',
      'Prioriteit-support',
      'Cadeau-abonnement instellen',
    ],
    cta: 'Premium kiezen',
    highlight: false,
  },
]

const trustItems = [
  { icon: '✓', label: 'Geen verbintenis' },
  { icon: '↺', label: 'Opzeggen wanneer u wilt' },
  { icon: '€', label: '30 dagen geld-terug-garantie' },
]

export function Pricing() {
  const [yearly, setYearly] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const locale = useLocale()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setLoggedIn(!!data.user))
  }, [])

  return (
    <section
      id="abonnementen"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 3vw, 3rem)',
        overflow: 'hidden',
      }}
    >
      {/* Soft glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '60%',
          background:
            'radial-gradient(ellipse at center, rgba(168,203,160,.28) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              fontSize: '.72rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.7)',
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            Abonnementen
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: 'clamp(2rem, 4vw, 3.4rem)',
              lineHeight: 1.05,
              letterSpacing: '-.03em',
              color: '#F4ECDB',
              margin: '0 0 1rem',
            }}
          >
            Minder dan een kop koffie.{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(58,172,110,.9)' }}>
              Voor altijd gemoedsrust.
            </em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'rgba(244,236,219,.65)',
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Geen verborgen kosten. Op elk moment opzeggen.
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              background: 'rgba(244,236,219,.07)',
              border: '1px solid rgba(244,236,219,.18)',
              padding: 5,
              borderRadius: 9999,
            }}
          >
            {[
              { label: 'Per maand', value: false },
              { label: 'Per jaar', value: true, badge: '17% korting' },
            ].map(({ label, value, badge }) => (
              <button
                key={String(value)}
                onClick={() => setYearly(value)}
                style={{
                  padding: '.55rem 1.2rem',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: 'pointer',
                  background: yearly === value ? '#1B4731' : 'transparent',
                  color: yearly === value ? '#F4ECDB' : 'rgba(244,236,219,.7)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.88rem',
                  fontWeight: 600,
                  transition: 'all .2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {label}
                {badge && (
                  <span
                    style={{
                      background: 'rgba(58,172,110,.25)',
                      color: 'rgba(58,172,110,1)',
                      fontSize: '.65rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: 9999,
                    }}
                  >
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tier cards */}
        <div
          className="pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            alignItems: 'stretch',
          }}
        >
          {tiers.map((tier) => {
            const isHi = tier.highlight
            const price =
              yearly && tier.yearly
                ? (tier.yearly / 12).toFixed(2).replace('.', ',')
                : tier.monthly === 0
                  ? '0'
                  : tier.monthly.toFixed(2).replace('.', ',')
            const period =
              tier.monthly === 0 ? 'voor altijd' : yearly ? 'per maand, jaarlijks' : 'per maand'

            return (
              <div
                key={tier.name}
                style={{
                  background: isHi
                    ? 'linear-gradient(160deg, #0F2D1C 0%, #143A26 55%, #1F5235 100%)'
                    : 'rgba(244,236,219,.05)',
                  border: isHi
                    ? '1px solid rgba(168,203,160,.35)'
                    : '1px solid rgba(244,236,219,.14)',
                  borderRadius: 22,
                  padding: '2rem 1.75rem',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transform: isHi ? 'scale(1.03)' : 'scale(1)',
                  boxShadow: isHi
                    ? '0 30px 60px -20px rgba(27,58,26,.5), 0 0 32px -8px rgba(168,203,160,.25)'
                    : 'none',
                  zIndex: isHi ? 2 : 1,
                }}
              >
                {tier.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#3AAC6E',
                      color: '#07190F',
                      fontSize: '.7rem',
                      fontWeight: 700,
                      letterSpacing: '.06em',
                      textTransform: 'uppercase',
                      padding: '.35rem .85rem',
                      borderRadius: 9999,
                      whiteSpace: 'nowrap',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    ★ {tier.badge}
                  </div>
                )}

                <div
                  style={{
                    fontSize: '.75rem',
                    fontWeight: 700,
                    color: isHi ? '#3AAC6E' : 'rgba(244,236,219,.6)',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    marginBottom: '.35rem',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {tier.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.85rem',
                    color: 'rgba(244,236,219,.55)',
                    marginBottom: '1.4rem',
                  }}
                >
                  {tier.tagline}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '.35rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 400,
                      fontSize: '2.8rem',
                      lineHeight: 1,
                      letterSpacing: '-.03em',
                      color: '#F4ECDB',
                    }}
                  >
                    €{price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.8rem',
                      color: 'rgba(244,236,219,.45)',
                    }}
                  >
                    / {period}
                  </span>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.65rem',
                    flex: 1,
                  }}
                >
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.9rem',
                        color: 'rgba(244,236,219,.82)',
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: isHi ? 'rgba(58,172,110,.2)' : 'rgba(244,236,219,.08)',
                          color: isHi ? '#3AAC6E' : 'rgba(244,236,219,.6)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={
                    loggedIn
                      ? `/${locale}/abonnement/checkout?tier=${tier.name.toLowerCase() === 'standaard' ? 'standard' : tier.name.toLowerCase()}&billing=${yearly ? 'yearly' : 'monthly'}`
                      : `/${locale}/registreren`
                  }
                  style={{
                    background: isHi ? '#3AAC6E' : 'rgba(244,236,219,.1)',
                    color: isHi ? '#07190F' : '#F4ECDB',
                    border: isHi ? 'none' : '1px solid rgba(244,236,219,.2)',
                    padding: '.95rem 1rem',
                    borderRadius: 12,
                    fontSize: '.92rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-sans)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'transform .15s, opacity .15s',
                    width: '100%',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {tier.cta}
                  <ArrowIcon />
                </Link>
              </div>
            )
          })}
        </div>

        {/* Trust row */}
        <div
          className="trust-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginTop: '2.5rem',
            padding: '1.25rem 1.5rem',
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.12)',
            borderRadius: 14,
          }}
        >
          {trustItems.map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-sans)',
                fontSize: '.85rem',
                color: 'rgba(244,236,219,.72)',
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(27,71,49,.6)',
                  color: '#3AAC6E',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '.82rem',
                  fontWeight: 700,
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
