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
  },
  doubt: {
    color: '#D97B2A',
    bg: 'rgba(217,123,42,.08)',
    border: 'rgba(217,123,42,.22)',
    glow: 'rgba(217,123,42,.15)',
    label: 'Let op',
  },
  phishing: {
    color: '#E5532A',
    bg: 'rgba(229,83,42,.08)',
    border: 'rgba(229,83,42,.22)',
    glow: 'rgba(229,83,42,.2)',
    label: 'Waarschijnlijk oplichting',
  },
}

const flagConfig = {
  danger: { color: '#E5532A', bg: 'rgba(229,83,42,.1)', dot: '#E5532A' },
  warn: { color: '#D97B2A', bg: 'rgba(217,123,42,.1)', dot: '#D97B2A' },
  safe: { color: '#3AAC6E', bg: 'rgba(58,172,110,.1)', dot: '#3AAC6E' },
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
        background: '#060C1A',
      }}
    >
      {/* Kleur glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: 550,
          height: 550,
          background: 'radial-gradient(circle, rgba(140,60,230,.2) 0%, transparent 55%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(20,200,150,.22) 0%, transparent 55%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Dot patroon */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.14) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
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
            gap: '.5rem',
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
                  padding: '.45rem 1.1rem',
                  borderRadius: 9999,
                  border: `1px solid ${isActive ? c.border : 'rgba(244,236,219,.1)'}`,
                  cursor: 'pointer',
                  background: isActive ? c.bg : 'transparent',
                  color: isActive ? c.color : 'rgba(244,236,219,.4)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.82rem',
                  fontWeight: isActive ? 700 : 400,
                  transition: 'all .2s',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {isActive && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: c.color,
                      flexShrink: 0,
                    }}
                  />
                )}
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
            background: 'rgba(244,236,219,.06)',
            marginBottom: '2rem',
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          <div
            key={progressKey}
            style={{
              height: '100%',
              borderRadius: 9999,
              background: `linear-gradient(90deg, ${cfg.color}60, ${cfg.color})`,
              animation: `progress-fill ${INTERVAL_MS}ms linear forwards`,
            }}
          />
        </div>

        {/* Hoofd kaart — één geïntegreerd scherm */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity .3s ease, transform .3s ease',
          }}
        >
          <div
            style={{
              background: 'rgba(6,10,20,.94)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: `0 40px 80px -20px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.04), inset 0 1px 0 rgba(255,255,255,.06)`,
            }}
          >
            {/* Header — afzender + status */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid rgba(255,255,255,.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: `linear-gradient(90deg, rgba(${cfg.color === '#E5532A' ? '60,15,5' : cfg.color === '#D97B2A' ? '50,25,5' : '10,30,60'},.3) 0%, transparent 60%)`,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: cfg.bg,
                  border: `2px solid ${cfg.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
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
                    fontWeight: 700,
                    fontSize: '.95rem',
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
                    color: 'rgba(244,236,219,.35)',
                  }}
                >
                  {ex.fromLabel}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  borderRadius: 9999,
                  padding: '.3rem .9rem',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: cfg.color,
                    boxShadow: `0 0 8px ${cfg.color}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.7rem',
                    fontWeight: 700,
                    color: cfg.color,
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                  }}
                >
                  {cfg.label}
                </span>
              </div>
            </div>

            {/* Body — twee kolommen */}
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
              className="grid-responsive-2"
            >
              {/* Links: bericht */}
              <div
                style={{
                  padding: '1.75rem 1.5rem',
                  borderRight: '1px solid rgba(255,255,255,.05)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.65rem',
                    fontWeight: 700,
                    color: 'rgba(244,236,219,.25)',
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  Ontvangen bericht
                </div>

                {/* SMS bubble */}
                <div
                  style={{
                    background: 'rgba(20,30,65,.7)',
                    border: '1px solid rgba(80,100,200,.2)',
                    borderRadius: '4px 18px 18px 18px',
                    padding: '1rem 1.15rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.93rem',
                    color: 'rgba(244,236,219,.9)',
                    lineHeight: 1.7,
                    marginBottom: '.6rem',
                    boxShadow: '0 4px 16px rgba(0,0,0,.3)',
                  }}
                >
                  {ex.message}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.7rem',
                    color: 'rgba(244,236,219,.2)',
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
                    fill="none"
                    stroke="rgba(100,160,255,.35)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  >
                    <path d="M1 4.5L4.5 8L9 1M5 4.5L8.5 8L13 1" />
                  </svg>
                </div>

                {/* KloptHet scan badge */}
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
                    transition: 'all .5s',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: scanning ? 'rgba(58,172,110,.15)' : `${cfg.color}18`,
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
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.78rem',
                        fontWeight: 700,
                        color: scanning ? '#3AAC6E' : cfg.color,
                      }}
                    >
                      {scanning ? 'KloptHet analyseert...' : 'KloptHet heeft gescand'}
                    </div>
                  </div>
                  {scanning && (
                    <div style={{ display: 'flex', gap: 4 }}>
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

              {/* Rechts: analyse */}
              <div
                style={{
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.1rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Glow */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: -60,
                    right: -40,
                    width: 220,
                    height: 220,
                    background: `radial-gradient(circle, ${cfg.color}20 0%, transparent 65%)`,
                    pointerEvents: 'none',
                    filter: 'blur(35px)',
                  }}
                />

                {/* Score groot */}
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.65rem',
                      fontWeight: 700,
                      color: 'rgba(244,236,219,.25)',
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      marginBottom: '.6rem',
                    }}
                  >
                    Onze analyse
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '.4rem',
                      marginBottom: '.35rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 700,
                        fontSize: '3.8rem',
                        lineHeight: 1,
                        color: cfg.color,
                        textShadow: `0 0 40px ${cfg.color}50`,
                      }}
                    >
                      {ex.score}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.82rem',
                        color: 'rgba(244,236,219,.2)',
                        fontWeight: 400,
                      }}
                    >
                      /10
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 500,
                      fontSize: '1.35rem',
                      color: '#F4ECDB',
                      letterSpacing: '-.02em',
                      lineHeight: 1.2,
                    }}
                  >
                    {cfg.label}
                  </div>
                </div>

                {/* Scorebalk */}
                <div
                  style={{
                    height: 4,
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
                      background: `linear-gradient(90deg, ${cfg.color}70, ${cfg.color})`,
                      boxShadow: `0 0 10px ${cfg.color}60`,
                      transition: 'width .8s cubic-bezier(.16,1,.3,1)',
                    }}
                  />
                </div>

                {/* Samenvatting */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.88rem',
                    color: 'rgba(244,236,219,.65)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {ex.verdict}
                </p>

                {/* Flags */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                  {ex.flags.map((f) => {
                    const fc = flagConfig[f.level]
                    return (
                      <div
                        key={f.text}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '.45rem .75rem',
                          background: fc.bg,
                          borderRadius: 8,
                          border: `1px solid ${fc.color}18`,
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: fc.dot,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '.82rem',
                            color: 'rgba(244,236,219,.78)',
                            lineHeight: 1.4,
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
