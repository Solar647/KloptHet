'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { Doodle } from './doodles'

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
        padding: 'clamp(7rem, 13vw, 11rem) clamp(1.5rem, 3vw, 3rem) clamp(5rem, 10vw, 9rem)',
        background: '#F1EDE4',
        overflow: 'hidden',
      }}
    >
      {/* Omgekeerde wave bovenaan — hangt naar beneden (vervolg op de demo-wave) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%) scaleY(-1)',
          width: '100vw',
          height: 'clamp(110px, 16vw, 220px)',
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <defs>
            <linearGradient id="pWaveA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2a2b30" />
              <stop offset="50%" stopColor="#141416" />
              <stop offset="100%" stopColor="#0a0a0c" />
            </linearGradient>
            <linearGradient id="pWaveB" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0c0c0e" />
              <stop offset="45%" stopColor="#1e1f23" />
              <stop offset="100%" stopColor="#0c0c0e" />
            </linearGradient>
          </defs>
          <path
            d="M0 150 C 240 50, 420 250, 720 140 C 1000 40, 1200 230, 1440 120 L1440 300 L0 300 Z"
            fill="url(#pWaveA)"
            opacity="0.9"
          />
          <path
            d="M0 210 C 260 130, 560 270, 880 190 C 1140 126, 1320 260, 1440 200 L1440 300 L0 300 Z"
            fill="url(#pWaveB)"
          />
          <path
            d="M0 150 C 240 50, 420 250, 720 140 C 1000 40, 1200 230, 1440 120"
            fill="none"
            stroke="rgba(58,172,110,.5)"
            strokeWidth="2"
            strokeDasharray="2 9"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Heel subtiel grid — vanaf de wave naar beneden */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(26,26,24,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,24,.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'linear-gradient(to bottom, transparent 4%, black 16%, black 80%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 4%, black 16%, black 80%, transparent 100%)',
        }}
      />

      {/* Doodles (donker, pen-op-papier) */}
      <Doodle
        type="crown"
        size={42}
        color="rgba(58,172,110,.4)"
        style={{ top: '13%', left: '9%' }}
      />
      <Doodle
        type="diamond"
        size={40}
        color="rgba(26,26,24,.4)"
        style={{ top: '22%', right: '8%' }}
      />
      <Doodle
        type="heart"
        size={32}
        color="rgba(26,26,24,.35)"
        style={{ bottom: '14%', left: '6%' }}
      />
      <Doodle
        type="squiggle"
        size={60}
        color="rgba(58,172,110,.35)"
        style={{ bottom: '20%', right: '7%' }}
      />

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
              color: 'rgba(26,26,24,.6)',
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
              fontSize: 'clamp(4.5rem, 18vw, 15rem)',
              lineHeight: 0.85,
              letterSpacing: '-.05em',
              margin: 0,
              userSelect: 'none',
              whiteSpace: 'nowrap',
              background: 'linear-gradient(180deg, rgba(26,26,24,.2) 0%, rgba(26,26,24,.04) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
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
              color: 'rgba(26,26,24,.6)',
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

        {/* Toggle — segmented control */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: 'clamp(2.5rem, 5vw, 4rem) 0 2.5rem',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              padding: 5,
              borderRadius: 9999,
              background: 'rgba(26,26,24,.06)',
              border: '1px solid rgba(26,26,24,.12)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 5,
                bottom: 5,
                left: yearly ? '50%' : 5,
                width: 'calc(50% - 5px)',
                borderRadius: 9999,
                background: '#1a1a18',
                transition: 'left .3s cubic-bezier(.16,1,.3,1)',
              }}
            />
            {[
              { label: 'Per maand', value: false },
              { label: 'Per jaar', value: true },
            ].map(({ label, value }) => {
              const activeBtn = yearly === value
              return (
                <button
                  key={String(value)}
                  onClick={() => setYearly(value)}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    padding: '.6rem 1.5rem',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.9rem',
                    fontWeight: 700,
                    color: activeBtn ? '#F1EDE4' : 'rgba(26,26,24,.6)',
                    transition: 'color .25s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                  {value && (
                    <span
                      style={{
                        background: 'rgba(58,172,110,.2)',
                        color: '#1f7a4d',
                        fontSize: '.65rem',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: 9999,
                      }}
                    >
                      -17%
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Kaarten — donker glas op licht */}
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
                  background: isHi
                    ? 'linear-gradient(165deg, #1c2a22 0%, #121214 70%)'
                    : 'linear-gradient(165deg, #1a1a1d 0%, #131316 100%)',
                  border: isHi
                    ? '1.5px solid rgba(58,172,110,.6)'
                    : '1px solid rgba(255,255,255,.08)',
                  overflow: 'hidden',
                  boxShadow: isHi
                    ? '0 30px 70px -24px rgba(58,172,110,.4), inset 0 1px 0 rgba(255,255,255,.08)'
                    : '0 22px 50px -24px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06)',
                }}
              >
                {/* Gloed in de kaart */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-30%',
                    left: '20%',
                    width: '70%',
                    height: '55%',
                    background: isHi
                      ? 'radial-gradient(ellipse, rgba(58,172,110,.3) 0%, transparent 65%)'
                      : 'radial-gradient(ellipse, rgba(120,140,200,.12) 0%, transparent 65%)',
                    filter: 'blur(35px)',
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
                  {/* Vaste badge-rij zodat alle kaarten uitlijnen */}
                  <div
                    style={{
                      height: 26,
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {tier.badge && (
                      <span
                        style={{
                          background: '#3AAC6E',
                          color: '#07190F',
                          fontSize: '.68rem',
                          fontWeight: 700,
                          letterSpacing: '.05em',
                          textTransform: 'uppercase',
                          padding: '.3rem .7rem',
                          borderRadius: 9999,
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        ★ {tier.badge}
                      </span>
                    )}
                  </div>

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
                      borderTop: '1px solid rgba(255,255,255,.1)',
                      paddingTop: '1.5rem',
                    }}
                  >
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.88rem',
                          color: 'rgba(255,255,255,.8)',
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
                            background: 'rgba(58,172,110,.2)',
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
                      background: isHi ? '#3AAC6E' : 'rgba(255,255,255,.08)',
                      color: isHi ? '#07190F' : '#fff',
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
            background: 'rgba(26,26,24,.04)',
            border: '1px solid rgba(26,26,24,.1)',
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
                color: 'rgba(26,26,24,.72)',
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
