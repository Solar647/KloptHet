'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRightIcon } from '@/components/shared/icons'
import { Doodle } from './doodles'

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
      'Wij zien meerdere kenmerken van de kleinkind-truc: een geldverzoek via een onbekend nieuw nummer, gecombineerd met tijdsdruk.',
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
      'De link gaat niet naar de officiële ING-website. Echte banken sturen nooit een link om in te loggen via sms.',
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
      'Typisch bezorgfraude. PostNL vraagt nooit om betaling via een sms-link. Het domein is nep en lijkt op het echte PostNL.',
    flags: [
      { text: 'Nep-domein: post-nl-betaling.com', level: 'danger' as const },
      { text: 'Onverwacht betaalverzoek via sms', level: 'warn' as const },
      { text: 'Officiële bezorgers gebruiken geen sms-links', level: 'warn' as const },
    ],
  },
]

const categoryConfig = {
  safe: { color: '#3AAC6E', label: 'Geen alarmsignalen' },
  doubt: { color: '#D97B2A', label: 'Let op' },
  phishing: { color: '#E5532A', label: 'Waarschijnlijk oplichting' },
}

const flagConfig = {
  danger: { color: '#E5532A', bg: 'rgba(229,83,42,.1)' },
  warn: { color: '#D97B2A', bg: 'rgba(217,123,42,.1)' },
  safe: { color: '#3AAC6E', bg: 'rgba(58,172,110,.1)' },
}

const INTERVAL_MS = 9000

export function DemoCarousel() {
  const locale = useLocale()
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % examples.length)
    }, INTERVAL_MS)
  }

  const switchTo = (idx: number) => {
    if (idx === active) return
    setActive(idx)
    startInterval()
  }

  useEffect(() => {
    startInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <section
      id="demo"
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 3vw, 3rem) 0',
        position: 'relative',
        overflow: 'hidden',
        background: '#F1EDE4',
      }}
    >
      {/* Doodles */}
      <Doodle
        type="lightning"
        size={36}
        color="rgba(58,172,110,.42)"
        style={{ top: '9%', right: '10%' }}
      />
      <Doodle type="waves" size={40} color="rgba(26,26,24,.4)" style={{ top: '15%', left: '7%' }} />
      <Doodle type="star" size={28} color="rgba(26,26,24,.38)" style={{ top: '6%', left: '24%' }} />

      <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginBottom: '1.5rem',
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
              (03)
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
              Live demo
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              lineHeight: 1,
              letterSpacing: '-.04em',
              color: '#1a1a18',
              margin: '0 0 1rem',
            }}
          >
            Zo ziet fraude eruit.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              color: 'rgba(26,26,24,.5)',
              maxWidth: 460,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Echte voorbeelden. Klik op een kaart en zie hoe het bericht wordt gescreend.
          </p>
        </div>

        {/* Kaartenrij — accordeon */}
        <div className="demo-row">
          {examples.map((ex, i) => {
            const cfg = categoryConfig[ex.category]
            const isActive = i === active
            return (
              <div
                key={ex.id}
                onClick={() => switchTo(i)}
                onMouseEnter={() => switchTo(i)}
                className={isActive ? 'demo-card demo-card-active' : 'demo-card'}
                style={{
                  cursor: 'pointer',
                  borderRadius: 18,
                  border: `1px solid ${isActive ? 'rgba(26,26,24,.12)' : 'rgba(26,26,24,.08)'}`,
                  background: isActive
                    ? '#ffffff'
                    : 'linear-gradient(160deg, #efece4 0%, #e9e5dc 100%)',
                  boxShadow: isActive ? '0 24px 60px -24px rgba(0,0,0,.25)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'flex .6s cubic-bezier(.16,1,.3,1), border-color .4s, background .4s',
                }}
              >
                {/* Gloed in actieve kaart */}
                {isActive && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '-20%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '80%',
                      height: '50%',
                      background: `radial-gradient(ellipse, ${cfg.color}22 0%, transparent 70%)`,
                      filter: 'blur(40px)',
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* Ingeklapt label */}
                {!isActive && (
                  <div className="demo-collapsed">
                    <span
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: '50%',
                        background: cfg.color,
                        boxShadow: `0 0 10px ${cfg.color}`,
                        flexShrink: 0,
                      }}
                    />
                    <span className="demo-collapsed-label">{ex.type}</span>
                    <span
                      style={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '.72rem',
                        fontWeight: 700,
                        color: 'rgba(26,26,24,.25)',
                        flexShrink: 0,
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                )}

                {/* Uitgeklapte inhoud */}
                {isActive && (
                  <div className="demo-expanded">
                    {/* Kop */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        marginBottom: '1.25rem',
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: `${cfg.color}1a`,
                          border: `1.5px solid ${cfg.color}55`,
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
                            fontSize: '.92rem',
                            color: '#1a1a18',
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
                            color: 'rgba(26,26,24,.4)',
                          }}
                        >
                          {ex.fromLabel}
                        </div>
                      </div>
                      <span
                        style={{
                          fontFamily: 'ui-monospace, monospace',
                          fontSize: '.72rem',
                          fontWeight: 700,
                          color: 'rgba(26,26,24,.25)',
                        }}
                      >
                        0{i + 1}
                      </span>
                    </div>

                    {/* Bericht */}
                    <div
                      style={{
                        background: 'rgba(26,26,24,.04)',
                        border: '1px solid rgba(26,26,24,.07)',
                        borderRadius: '4px 16px 16px 16px',
                        padding: '.9rem 1.1rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.9rem',
                        color: 'rgba(26,26,24,.85)',
                        lineHeight: 1.65,
                        marginBottom: '1.5rem',
                      }}
                    >
                      {ex.message}
                    </div>

                    {/* Score + label */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '.5rem',
                        marginBottom: '.4rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontWeight: 700,
                          fontSize: '2.8rem',
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
                          fontSize: '.8rem',
                          color: 'rgba(26,26,24,.3)',
                        }}
                      >
                        /10
                      </span>
                      <span
                        style={{
                          marginLeft: 'auto',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 700,
                          fontSize: '.8rem',
                          color: cfg.color,
                          textTransform: 'uppercase',
                          letterSpacing: '.05em',
                        }}
                      >
                        {cfg.label}
                      </span>
                    </div>

                    {/* Scorebalk */}
                    <div
                      style={{
                        height: 4,
                        borderRadius: 9999,
                        background: 'rgba(26,26,24,.07)',
                        overflow: 'hidden',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${ex.score * 10}%`,
                          borderRadius: 9999,
                          background: `linear-gradient(90deg, ${cfg.color}70, ${cfg.color})`,
                          boxShadow: `0 0 10px ${cfg.color}60`,
                          transition: 'width .8s cubic-bezier(.16,1,.3,1)',
                        }}
                      />
                    </div>

                    {/* Verdict */}
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.86rem',
                        color: 'rgba(26,26,24,.6)',
                        lineHeight: 1.65,
                        margin: '0 0 1.25rem',
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
                              border: `1px solid ${fc.color}22`,
                            }}
                          >
                            <div
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: fc.color,
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '.8rem',
                                color: 'rgba(26,26,24,.78)',
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
                )}
              </div>
            )
          })}
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
              borderRadius: 9999,
              background: 'linear-gradient(135deg, #3fc97a 0%, #2ea85c 100%)',
              color: '#04120A',
              fontFamily: 'var(--font-sans)',
              fontSize: '.95rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'transform .15s, box-shadow .15s',
              boxShadow: '0 4px 28px rgba(58,172,110,.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 36px rgba(58,172,110,.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 28px rgba(58,172,110,.4)'
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
              color: 'rgba(26,26,24,.3)',
            }}
          >
            Gratis account aanmaken · Eerste controle gratis
          </p>
        </div>
      </div>

      {/* Zachte wave onderaan — volledige breedte, van rand tot rand */}
      <div
        aria-hidden="true"
        style={{
          position: 'relative',
          marginTop: 'clamp(3rem, 6vw, 5rem)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          height: 'clamp(150px, 22vw, 300px)',
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <defs>
            <linearGradient id="waveA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e1dcd0" />
              <stop offset="50%" stopColor="#ebe7dd" />
              <stop offset="100%" stopColor="#F1EDE4" />
            </linearGradient>
            <linearGradient id="waveB" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e8e3d8" />
              <stop offset="45%" stopColor="#d6d0c3" />
              <stop offset="100%" stopColor="#e8e3d8" />
            </linearGradient>
          </defs>
          <path
            d="M0 150 C 240 50, 420 250, 720 140 C 1000 40, 1200 230, 1440 120 L1440 300 L0 300 Z"
            fill="url(#waveA)"
            opacity="0.9"
          />
          <path
            d="M0 210 C 260 130, 560 270, 880 190 C 1140 126, 1320 260, 1440 200 L1440 300 L0 300 Z"
            fill="url(#waveB)"
          />
          {/* Kronkelende groene lijn over de wave */}
          <path
            d="M0 150 C 240 50, 420 250, 720 140 C 1000 40, 1200 230, 1440 120"
            fill="none"
            stroke="rgba(58,172,110,.5)"
            strokeWidth="2"
            strokeDasharray="2 9"
            strokeLinecap="round"
          />
          <path
            d="M0 150 C 240 50, 420 250, 720 140 C 1000 40, 1200 230, 1440 120"
            fill="none"
            stroke="rgba(26,26,24,.14)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <style>{`
        .demo-row {
          display: flex;
          gap: 12px;
          height: clamp(440px, 60vw, 540px);
        }
        .demo-card { flex: 0 0 72px; }
        .demo-card-active { flex: 1 1 auto; }
        .demo-collapsed {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0;
        }
        .demo-collapsed-label {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: .92rem;
          color: rgba(26,26,24,.7);
          letter-spacing: .02em;
          white-space: nowrap;
        }
        .demo-expanded {
          height: 100%;
          overflow-y: auto;
          padding: clamp(1.25rem, 2.5vw, 2rem);
          position: relative;
          z-index: 1;
        }
        @media (max-width: 768px) {
          .demo-row {
            flex-direction: column;
            height: auto;
          }
          .demo-card { flex: none; }
          .demo-collapsed {
            flex-direction: row;
            padding: 1rem 1.25rem;
            justify-content: flex-start;
            gap: 12px;
          }
          .demo-collapsed-label {
            writing-mode: horizontal-tb;
            transform: none;
            flex: 1;
          }
          .demo-expanded { overflow-y: visible; }
        }
      `}</style>
    </section>
  )
}
