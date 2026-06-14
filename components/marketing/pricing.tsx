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
      'Tot 3 familieleden',
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
      'Tot 5 familieleden',
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
  const [yearly, setYearly] = useState(true)
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
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 3vw, 3rem)',
        background: '#0a0a0c',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '.85rem',
              fontWeight: 700,
              color: '#3AAC6E',
            }}
          >
            (04)
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.78rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,.6)',
              letterSpacing: '.04em',
            }}
          >
            Abonnementen
          </span>
        </div>

        {/* Grote achtergrondtitel */}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <h2
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(4rem, 16vw, 13rem)',
              lineHeight: 0.9,
              letterSpacing: '-.05em',
              color: '#fff',
              opacity: 0.06,
              margin: 0,
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Prijzen
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              color: 'rgba(255,255,255,.6)',
              position: 'absolute',
              bottom: 'clamp(-.5rem, 1vw, .5rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              margin: 0,
            }}
          >
            Minder dan een kop koffie. Voor altijd gemoedsrust.
          </p>
        </div>

        {/* Toggle */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
            margin: 'clamp(2.5rem, 5vw, 4rem) 0 2.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.9rem',
              fontWeight: 600,
              color: yearly ? 'rgba(255,255,255,.45)' : '#fff',
            }}
          >
            Per maand
          </span>
          <button
            onClick={() => setYearly((v) => !v)}
            aria-label="Wissel tussen maand en jaar"
            style={{
              width: 52,
              height: 28,
              borderRadius: 9999,
              border: '1px solid rgba(255,255,255,.2)',
              background: yearly ? '#3AAC6E' : 'rgba(255,255,255,.1)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'background .25s',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 2,
                left: yearly ? 25 : 2,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left .25s cubic-bezier(.16,1,.3,1)',
              }}
            />
          </button>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.9rem',
              fontWeight: 600,
              color: yearly ? '#fff' : 'rgba(255,255,255,.45)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Per jaar
            <span
              style={{
                background: 'rgba(58,172,110,.2)',
                color: '#3AAC6E',
                fontSize: '.65rem',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: 9999,
              }}
            >
              17% korting
            </span>
          </span>
        </div>

        {/* Kaarten */}
        <div
          className="pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
        >
          {tiers.map((tier) => {
            const isHi = tier.highlight
            const price =
              yearly && tier.yearly
                ? (tier.yearly / 12).toFixed(2).replace('.', ',')
                : tier.monthly.toFixed(2).replace('.', ',')
            const period = yearly ? 'p/m, jaarlijks' : 'per maand'

            return (
              <div
                key={tier.name}
                style={{
                  position: 'relative',
                  borderRadius: 22,
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  background: isHi ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.025)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: isHi
                    ? '1px solid rgba(255,255,255,.22)'
                    : '1px solid rgba(255,255,255,.09)',
                  overflow: 'hidden',
                  boxShadow: isHi ? '0 30px 70px -20px rgba(0,0,0,.7)' : 'none',
                }}
              >
                {/* Zachte lichtgloed achter de kaart */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-30%',
                    left: '20%',
                    width: '70%',
                    height: '60%',
                    background: isHi
                      ? 'radial-gradient(ellipse, rgba(255,255,255,.18) 0%, transparent 65%)'
                      : 'radial-gradient(ellipse, rgba(255,255,255,.08) 0%, transparent 65%)',
                    filter: 'blur(30px)',
                    pointerEvents: 'none',
                  }}
                />

                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  {tier.badge && (
                    <div
                      style={{
                        alignSelf: 'flex-start',
                        background: '#3AAC6E',
                        color: '#07190F',
                        fontSize: '.68rem',
                        fontWeight: 700,
                        letterSpacing: '.05em',
                        textTransform: 'uppercase',
                        padding: '.3rem .7rem',
                        borderRadius: 9999,
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      ★ {tier.badge}
                    </div>
                  )}

                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.85rem',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,.6)',
                      marginBottom: '.5rem',
                    }}
                  >
                    {tier.name}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '.35rem',
                      marginBottom: '.4rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 700,
                        fontSize: '3rem',
                        lineHeight: 1,
                        letterSpacing: '-.03em',
                        color: '#fff',
                      }}
                    >
                      €{price}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.8rem',
                        color: 'rgba(255,255,255,.4)',
                      }}
                    >
                      /{period}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.82rem',
                      color: 'rgba(255,255,255,.4)',
                      marginBottom: '1.75rem',
                    }}
                  >
                    {tier.tagline}
                  </div>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '.75rem',
                      flex: 1,
                      borderTop: '1px solid rgba(255,255,255,.08)',
                      paddingTop: '1.5rem',
                    }}
                  >
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.88rem',
                          color: 'rgba(255,255,255,.78)',
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
                            background: 'rgba(58,172,110,.15)',
                            color: '#3AAC6E',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: 1,
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
                      background: isHi ? '#fff' : 'rgba(255,255,255,.06)',
                      color: isHi ? '#0a0a0c' : '#fff',
                      border: isHi ? 'none' : '1px solid rgba(255,255,255,.16)',
                      padding: '.95rem 1rem',
                      borderRadius: 9999,
                      fontSize: '.9rem',
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
            marginTop: '2rem',
            padding: '1.25rem 1.5rem',
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,.09)',
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
                color: 'rgba(255,255,255,.72)',
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(58,172,110,.15)',
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
