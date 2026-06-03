'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRightIcon } from '@/components/shared/icons'

const examples = [
  {
    id: 'kleinkind',
    type: 'Kleinkind-truc',
    from: '+31 6 84 29 17 53',
    fromLabel: 'Onbekend nummer',
    message:
      'Hoi mama, dit is mijn nieuwe nummer. Mijn telefoon is stukgegaan. Kun je me €450 sturen? Het is echt dringend.',
    score: 8,
    category: 'phishing' as const,
    verdict:
      'Wij zien in dit bericht meerdere kenmerken van de kleinkind-truc. Het valt op dat er om geld wordt gevraagd via een onbekend nieuw nummer, gecombineerd met tijdsdruk.',
    flags: [
      { text: 'Geldverzoek via nieuw/onbekend nummer', level: 'danger' as const },
      { text: 'Tijdsdruk: "echt dringend"', level: 'warn' as const },
      { text: 'Geen verificatie van identiteit', level: 'warn' as const },
    ],
  },
  {
    id: 'bank',
    type: 'Bank-imitatie',
    from: 'ING Bank',
    fromLabel: 'Vermoedelijk nep',
    message:
      'Uw ING-rekening wordt geblokkeerd wegens verdachte activiteit. Bevestig direct via: ing-veilig.net',
    score: 9,
    category: 'phishing' as const,
    verdict:
      'In dit bericht valt op dat de link niet naar de officiële ING-website gaat. Echte banken sturen nooit een link om in te loggen via sms.',
    flags: [
      { text: 'Nep-domein: ing-veilig.net is niet van ING', level: 'danger' as const },
      { text: 'Blokkade-dreiging om paniek te creëren', level: 'danger' as const },
      { text: 'Banken sturen nooit inlog-links via sms', level: 'warn' as const },
    ],
  },
  {
    id: 'bezorg',
    type: 'Bezorg-fraude',
    from: 'PostNL',
    fromLabel: 'Vermoedelijk nep',
    message:
      'Uw pakket kan niet worden afgeleverd. Betaal €1,99 herbezorgkosten via: post-nl-betaling.com',
    score: 7,
    category: 'phishing' as const,
    verdict:
      'Typisch voorbeeld van bezorgfraude. PostNL vraagt nooit om betaling via een sms-link. Het domein is nep en lijkt op het echte PostNL.',
    flags: [
      { text: 'Nep-domein: post-nl-betaling.com', level: 'danger' as const },
      { text: 'Onverwachte betaalverzoek via sms', level: 'warn' as const },
      { text: 'Officiële bezorgers gebruiken geen sms-links', level: 'warn' as const },
    ],
  },
]

const categoryConfig = {
  safe: {
    color: '#3AAC6E',
    bg: 'rgba(58,172,110,.08)',
    border: 'rgba(58,172,110,.22)',
    glow: 'rgba(58,172,110,.15)',
    label: 'Geen alarmsignalen',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  doubt: {
    color: '#D97B2A',
    bg: 'rgba(217,123,42,.08)',
    border: 'rgba(217,123,42,.22)',
    glow: 'rgba(217,123,42,.15)',
    label: 'Let op',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4M12 17h.01" />
      </svg>
    ),
  },
  phishing: {
    color: '#E5532A',
    bg: 'rgba(229,83,42,.08)',
    border: 'rgba(229,83,42,.22)',
    glow: 'rgba(229,83,42,.2)',
    label: 'Waarschijnlijk oplichting',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6M9 9l6 6" />
      </svg>
    ),
  },
}

const flagConfig = {
  danger: {
    color: '#E5532A',
    bg: 'rgba(229,83,42,.1)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  warn: {
    color: '#D97B2A',
    bg: 'rgba(217,123,42,.1)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
      </svg>
    ),
  },
  safe: {
    color: '#3AAC6E',
    bg: 'rgba(58,172,110,.1)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
    ),
  },
}

const INTERVAL_MS = 12000

export function DemoCarousel() {
  const locale = useLocale()
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const doSwitch = (idx: number) => {
    setVisible(false)
    setScanning(true)
    setTimeout(() => {
      setActive(idx)
      setProgressKey((k) => k + 1)
      setTimeout(() => {
        setScanning(false)
        setVisible(true)
      }, 700)
    }, 200)
  }

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive((a) => {
        doSwitch((a + 1) % examples.length)
        return a
      })
    }, INTERVAL_MS)
  }

  const switchTo = (idx: number) => {
    if (idx === active) return
    doSwitch(idx)
    startInterval()
  }

  useEffect(() => {
    startInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ex = examples[active]
  const cfg = categoryConfig[ex.category]

  return (
    <section
      id="demo"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 3vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',
        background: '#091020',
      }}
    >
      {/* Dot patroon */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(244,236,219,.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 85% 75% at 50% 40%, black 30%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 75% at 50% 40%, black 30%, transparent 85%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '60%',
          background: `radial-gradient(ellipse at center, ${cfg.glow} 0%, transparent 65%)`,
          pointerEvents: 'none',
          filter: 'blur(60px)',
          transition: 'background .8s ease',
        }}
      />

      <div style={{ maxWidth: 1040, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '.72rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.5)',
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="rgba(58,172,110,.8)"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            Live demo
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-.04em',
              color: '#F4ECDB',
              margin: '0 0 .75rem',
            }}
          >
            Zo ziet fraude eruit.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'rgba(244,236,219,.5)',
              maxWidth: 400,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Echte voorbeelden. Zie hoe onze AI een verdacht bericht ontleedt.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '.45rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {examples.map((e, i) => {
            const c = categoryConfig[e.category]
            const isActive = active === i
            return (
              <button
                key={e.id}
                onClick={() => switchTo(i)}
                style={{
                  padding: '.4rem 1rem',
                  borderRadius: 9999,
                  border: `1px solid ${isActive ? c.border : 'rgba(244,236,219,.1)'}`,
                  cursor: 'pointer',
                  background: isActive ? c.bg : 'transparent',
                  color: isActive ? c.color : 'rgba(244,236,219,.45)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.8rem',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all .2s',
                  outline: 'none',
                  letterSpacing: '.01em',
                }}
              >
                {e.type}
              </button>
            )
          })}
        </div>

        {/* Voortgangsbalk */}
        <div
          style={{
            height: 2,
            borderRadius: 9999,
            background: 'rgba(244,236,219,.07)',
            marginBottom: '1.75rem',
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          <div
            key={progressKey}
            style={{
              height: '100%',
              borderRadius: 9999,
              background: `linear-gradient(90deg, ${cfg.color}80, ${cfg.color})`,
              animation: `progress-fill ${INTERVAL_MS}ms linear forwards`,
            }}
          />
        </div>

        {/* Main grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.25rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity .25s ease, transform .25s ease',
          }}
          className="grid-responsive-2"
        >
          {/* LEFT — telefoon-mockup */}
          <div
            style={{
              background: 'rgba(6,12,24,0.85)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 22,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 48px -12px rgba(0,0,0,.5)',
            }}
          >
            {/* Phone status bar */}
            <div
              style={{
                padding: '.6rem 1.1rem .5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(244,236,219,.06)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.7rem',
                  color: 'rgba(244,236,219,.35)',
                  fontWeight: 600,
                }}
              >
                14:23
              </span>
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                {/* Signal bars */}
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="rgba(244,236,219,.3)"
                  aria-hidden="true"
                >
                  <rect x="0" y="8" width="3" height="4" rx="1" />
                  <rect x="4.5" y="5" width="3" height="7" rx="1" />
                  <rect x="9" y="2" width="3" height="10" rx="1" opacity=".5" />
                  <rect x="13.5" y="0" width="3" height="12" rx="1" opacity=".25" />
                </svg>
                {/* Battery */}
                <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
                  <rect
                    x="0.5"
                    y="0.5"
                    width="18"
                    height="11"
                    rx="2.5"
                    stroke="rgba(244,236,219,.3)"
                  />
                  <rect x="2" y="2" width="11" height="8" rx="1.5" fill="rgba(244,236,219,.3)" />
                  <path d="M20 4v4a2 2 0 0 0 0-4Z" fill="rgba(244,236,219,.3)" />
                </svg>
              </div>
            </div>

            {/* Chat header */}
            <div
              style={{
                padding: '.85rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                borderBottom: '1px solid rgba(244,236,219,.07)',
                background: 'rgba(244,236,219,.02)',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${cfg.color}40, ${cfg.color}20)`,
                  border: `1.5px solid ${cfg.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: cfg.color,
                  flexShrink: 0,
                }}
              >
                {ex.from.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '.9rem',
                    color: '#F4ECDB',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {ex.from}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    color: 'rgba(244,236,219,.38)',
                  }}
                >
                  {ex.fromLabel}
                </div>
              </div>
              {/* Categorie badge */}
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.65rem',
                  fontWeight: 700,
                  color: cfg.color,
                  letterSpacing: '.05em',
                  textTransform: 'uppercase',
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  padding: '.25rem .65rem',
                  borderRadius: 9999,
                  flexShrink: 0,
                }}
              >
                {ex.type}
              </span>
            </div>

            {/* Berichtruimte */}
            <div style={{ padding: '1.25rem 1.1rem', flex: 1 }}>
              {/* Bericht bubble */}
              <div
                style={{
                  maxWidth: '88%',
                  background: 'rgba(30,40,80,.6)',
                  border: '1px solid rgba(80,100,180,.25)',
                  borderRadius: '4px 18px 18px 18px',
                  padding: '1rem 1.1rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.9rem',
                  color: 'rgba(244,236,219,.92)',
                  lineHeight: 1.65,
                  boxShadow: '0 2px 12px rgba(0,0,0,.25)',
                }}
              >
                {ex.message}
              </div>
              <div
                style={{
                  marginTop: '.5rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.68rem',
                  color: 'rgba(244,236,219,.22)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                14:23
                <svg
                  width="14"
                  height="9"
                  viewBox="0 0 14 9"
                  fill="rgba(100,160,255,.5)"
                  aria-hidden="true"
                >
                  <path
                    d="M1 4.5L4.5 8L9 1M5 4.5L8.5 8L13 1"
                    strokeWidth="1.2"
                    stroke="rgba(100,160,255,.5)"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* KloptHet scan-indicator */}
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '.75rem 1rem',
                  background: scanning ? 'rgba(58,172,110,.06)' : cfg.bg,
                  border: `1px solid ${scanning ? 'rgba(58,172,110,.2)' : cfg.border}`,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'all .5s ease',
                }}
              >
                {/* KH logo mark */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: scanning ? 'rgba(58,172,110,.2)' : `${cfg.color}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={scanning ? '#3AAC6E' : cfg.color}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                    {!scanning && <path d="m9 12 2 2 4-4" />}
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.75rem',
                      fontWeight: 600,
                      color: scanning ? '#3AAC6E' : cfg.color,
                    }}
                  >
                    {scanning ? 'KloptHet analyseert...' : 'KloptHet heeft gescand'}
                  </div>
                  {!scanning && (
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.68rem',
                        color: 'rgba(244,236,219,.4)',
                        marginTop: 1,
                      }}
                    >
                      {cfg.label}
                    </div>
                  )}
                </div>
                {scanning && (
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: '#3AAC6E',
                          opacity: 0.6,
                          animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — analyse panel */}
          <div
            style={{
              background: `linear-gradient(160deg, rgba(6,12,24,.95) 0%, rgba(${cfg.color === '#E5532A' ? '40,15,10' : cfg.color === '#D97B2A' ? '35,20,5' : '8,20,40'},.85) 100%)`,
              border: `1px solid ${cfg.border}`,
              borderRadius: 22,
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: `0 24px 48px -12px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06)`,
            }}
          >
            {/* Subtle top glow */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: -60,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                height: 120,
                background: `radial-gradient(ellipse, ${cfg.color}22 0%, transparent 70%)`,
                pointerEvents: 'none',
                filter: 'blur(30px)',
              }}
            />

            {/* Score header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: cfg.bg,
                    border: `1.5px solid ${cfg.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: cfg.color,
                    flexShrink: 0,
                  }}
                >
                  {cfg.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.68rem',
                      fontWeight: 700,
                      color: 'rgba(244,236,219,.4)',
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Onze analyse
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 500,
                      fontSize: '1.15rem',
                      color: '#F4ECDB',
                      letterSpacing: '-.02em',
                      marginTop: 1,
                    }}
                  >
                    {cfg.label}
                  </div>
                </div>
              </div>

              {/* Score badge */}
              <div
                style={{
                  textAlign: 'center',
                  background: cfg.bg,
                  border: `1.5px solid ${cfg.border}`,
                  borderRadius: 14,
                  padding: '.5rem .9rem',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1.8rem',
                    lineHeight: 1,
                    color: cfg.color,
                  }}
                >
                  {ex.score}
                  <span
                    style={{ fontSize: '.8rem', color: 'rgba(244,236,219,.25)', fontWeight: 400 }}
                  >
                    /10
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.62rem',
                    color: 'rgba(244,236,219,.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    marginTop: 2,
                  }}
                >
                  risico
                </div>
              </div>
            </div>

            {/* Score balk */}
            <div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.65rem',
                    color: 'rgba(244,236,219,.3)',
                    letterSpacing: '.06em',
                  }}
                >
                  LAAG
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.65rem',
                    color: 'rgba(244,236,219,.3)',
                    letterSpacing: '.06em',
                  }}
                >
                  HOOG
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 9999,
                  background: 'rgba(244,236,219,.06)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    borderRadius: 9999,
                    width: `${ex.score * 10}%`,
                    background: `linear-gradient(90deg, ${cfg.color}99, ${cfg.color})`,
                    transition: 'width .8s cubic-bezier(.16,1,.3,1)',
                    boxShadow: `0 0 8px ${cfg.color}60`,
                  }}
                />
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(244,236,219,.07)' }} />

            {/* Verdict tekst */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.68rem',
                  fontWeight: 700,
                  color: 'rgba(244,236,219,.35)',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  marginBottom: '.6rem',
                }}
              >
                Wat wij zien
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.9rem',
                  color: 'rgba(244,236,219,.78)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {ex.verdict}
              </p>
            </div>

            {/* Flags */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.68rem',
                  fontWeight: 700,
                  color: 'rgba(244,236,219,.35)',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  marginBottom: '.6rem',
                }}
              >
                Alarmsignalen
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
                {ex.flags.map((f) => {
                  const fc = flagConfig[f.level]
                  return (
                    <div
                      key={f.text}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        padding: '.5rem .75rem',
                        background: fc.bg,
                        borderRadius: 8,
                        border: `1px solid ${fc.color}20`,
                      }}
                    >
                      <span style={{ color: fc.color, flexShrink: 0, marginTop: 1 }}>
                        {fc.icon}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.83rem',
                          color: 'rgba(244,236,219,.82)',
                          lineHeight: 1.5,
                        }}
                      >
                        {f.text}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            href={`/${locale}/registreren`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '.9rem 2rem',
              borderRadius: 14,
              background: '#3AAC6E',
              color: '#07190F',
              fontFamily: 'var(--font-sans)',
              fontSize: '.95rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'transform .15s, box-shadow .15s',
              boxShadow: '0 4px 20px rgba(58,172,110,.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(58,172,110,.35)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(58,172,110,.25)'
            }}
          >
            Controleer uw eigen bericht
            <ArrowRightIcon size={16} strokeWidth={2.2} />
          </Link>
          <p
            style={{
              marginTop: '.75rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '.78rem',
              color: 'rgba(244,236,219,.3)',
            }}
          >
            Gratis account aanmaken · Eerste controle gratis
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  )
}
