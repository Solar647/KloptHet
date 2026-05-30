'use client'

import { useState, useEffect } from 'react'
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
    category: 'doubt' as const,
    verdict:
      'Het valt op dat de link niet naar de officiële PostNL-website gaat. Herbezorging via PostNL is gratis — betaalverzoeken zijn altijd verdacht.',
    flags: [
      { text: 'Verdacht domein: niet postnl.nl', level: 'danger' as const },
      { text: 'Herbezorging in Nederland is gratis', level: 'warn' as const },
    ],
  },
  {
    id: 'veilig',
    type: 'Legitiem bericht',
    from: 'Bol.com',
    fromLabel: 'Bekende afzender',
    message:
      'Uw bestelling #4821039 is onderweg. Verwachte bezorging: morgen tussen 9:00-13:00. Volg via Mijn Bol.',
    score: 1,
    category: 'safe' as const,
    verdict:
      'Wij zien geen bekende oplichterstrucjes in dit bericht. Geen betaalverzoek, geen dreiging, geen verdacht domein.',
    flags: [
      { text: 'Geen betaalverzoek aanwezig', level: 'safe' as const },
      { text: 'Geen verdachte links', level: 'safe' as const },
      { text: 'Bekende afzender', level: 'safe' as const },
    ],
  },
]

const categoryConfig = {
  safe: {
    color: '#3AAC6E',
    bg: 'rgba(58,172,110,.1)',
    border: 'rgba(58,172,110,.25)',
    label: 'Geen alarmsignalen',
  },
  doubt: {
    color: '#D97B2A',
    bg: 'rgba(217,123,42,.1)',
    border: 'rgba(217,123,42,.25)',
    label: 'Let op',
  },
  phishing: {
    color: '#E5532A',
    bg: 'rgba(229,83,42,.1)',
    border: 'rgba(229,83,42,.25)',
    label: 'Meerdere waarschuwingen',
  },
}

const flagColor = {
  danger: '#E5532A',
  warn: '#D97B2A',
  safe: '#3AAC6E',
}

export function DemoCarousel() {
  const locale = useLocale()
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(true)

  const switchTo = (idx: number) => {
    if (idx === active) return
    setVisible(false)
    setTimeout(() => {
      setActive(idx)
      setVisible(true)
    }, 200)
  }

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setActive((a) => (a + 1) % examples.length)
        setVisible(true)
      }, 200)
    }, 5000)
    return () => clearInterval(t)
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
      }}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '50%',
          background: `radial-gradient(ellipse at center, ${cfg.color}14 0%, transparent 70%)`,
          pointerEvents: 'none',
          filter: 'blur(50px)',
          transition: 'background .5s',
        }}
      />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              fontSize: '.72rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.5)',
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              marginBottom: '.75rem',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            Zo werkt het
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              lineHeight: 1.05,
              letterSpacing: '-.03em',
              color: '#F4ECDB',
              margin: '0 0 .5rem',
            }}
          >
            Herken u de truc?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'rgba(244,236,219,.5)',
              maxWidth: 420,
              margin: '0 auto',
            }}
          >
            Blader door echte voorbeelden en zie hoe onze analyse werkt.
          </p>
        </div>

        {/* Main card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity .2s ease, transform .2s ease',
          }}
          className="grid-responsive-2"
        >
          {/* Linker panel — bericht */}
          <div
            style={{
              background: 'rgba(244,236,219,.04)',
              border: '1px solid rgba(244,236,219,.12)',
              borderRadius: 18,
              overflow: 'hidden',
            }}
          >
            {/* Header bericht */}
            <div
              style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid rgba(244,236,219,.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(244,236,219,.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '.9rem',
                  color: '#F4ECDB',
                  flexShrink: 0,
                }}
              >
                {ex.from.charAt(0)}
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
                  {ex.from}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    color: 'rgba(244,236,219,.4)',
                  }}
                >
                  {ex.fromLabel}
                </div>
              </div>
              <span
                style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.65rem',
                  fontWeight: 700,
                  color: cfg.color,
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  padding: '.2rem .6rem',
                  borderRadius: 9999,
                  flexShrink: 0,
                }}
              >
                {ex.type}
              </span>
            </div>

            {/* Bericht bubble */}
            <div style={{ padding: '1.25rem' }}>
              <div
                style={{
                  background: 'rgba(244,236,219,.07)',
                  border: '1px solid rgba(244,236,219,.1)',
                  borderRadius: '4px 14px 14px 14px',
                  padding: '1rem 1.1rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.95rem',
                  color: 'rgba(244,236,219,.88)',
                  lineHeight: 1.65,
                }}
              >
                {ex.message}
              </div>
              <div
                style={{
                  marginTop: '.5rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.72rem',
                  color: 'rgba(244,236,219,.3)',
                  textAlign: 'right',
                }}
              >
                Vandaag 14:23
              </div>
            </div>
          </div>

          {/* Rechter panel — analyse */}
          <div
            style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              borderRadius: 18,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* Score */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    fontWeight: 700,
                    color: cfg.color,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    marginBottom: '.2rem',
                  }}
                >
                  Onze analyse
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    color: '#F4ECDB',
                    letterSpacing: '-.02em',
                  }}
                >
                  {cfg.label}
                </div>
              </div>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '2rem',
                    lineHeight: 1,
                    color: cfg.color,
                  }}
                >
                  {ex.score}
                  <span style={{ fontSize: '.9rem', color: 'rgba(244,236,219,.3)' }}>/10</span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.62rem',
                    color: 'rgba(244,236,219,.35)',
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                  }}
                >
                  risico
                </div>
              </div>
            </div>

            {/* Score balk */}
            <div style={{ height: 4, borderRadius: 9999, background: 'rgba(244,236,219,.08)' }}>
              <div
                style={{
                  height: '100%',
                  borderRadius: 9999,
                  width: `${ex.score * 10}%`,
                  background: cfg.color,
                  transition: 'width .6s cubic-bezier(.16,1,.3,1)',
                }}
              />
            </div>

            {/* Samenvatting */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.88rem',
                color: 'rgba(244,236,219,.78)',
                lineHeight: 1.65,
                margin: 0,
                flex: 1,
              }}
            >
              {ex.verdict}
            </p>

            {/* Flags */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
              {ex.flags.map((f) => (
                <div key={f.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: flagColor[f.level],
                      flexShrink: 0,
                      marginTop: 6,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.82rem',
                      color: 'rgba(244,236,219,.72)',
                      lineHeight: 1.5,
                    }}
                  >
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigatie tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '.5rem',
            marginTop: '1.75rem',
            flexWrap: 'wrap',
          }}
        >
          {examples.map((e, i) => {
            const c = categoryConfig[e.category]
            return (
              <button
                key={e.id}
                onClick={() => switchTo(i)}
                style={
                  {
                    padding: '.45rem .9rem',
                    borderRadius: 9999,
                    border: 'none',
                    cursor: 'pointer',
                    background: active === i ? c.bg : 'rgba(244,236,219,.05)',
                    borderColor: active === i ? c.border : 'rgba(244,236,219,.1)',
                    color: active === i ? c.color : 'rgba(244,236,219,.5)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.78rem',
                    fontWeight: 600,
                    transition: 'all .2s',
                    outline: 'none',
                  } as React.CSSProperties
                }
              >
                {e.type}
              </button>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <Link
            href={`/${locale}/registreren`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '.85rem 1.75rem',
              borderRadius: 12,
              background: '#3AAC6E',
              color: '#07190F',
              fontFamily: 'var(--font-sans)',
              fontSize: '.95rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'transform .15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
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
              color: 'rgba(244,236,219,.35)',
            }}
          >
            Gratis proberen · Geen account nodig voor de eerste controle
          </p>
        </div>
      </div>
    </section>
  )
}
