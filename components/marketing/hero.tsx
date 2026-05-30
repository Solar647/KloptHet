'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'

const stickers = [
  { text: 'KLEINKIND-\nTRUC', top: '28%', left: '3%', rotate: -6, accent: true },
  { text: 'BANK-\nIMITATIE', top: '18%', right: '4%', rotate: 5, accent: false },
  { text: 'BEZORG-\nFRAUDE', bottom: '28%', left: '5%', rotate: 4, accent: false },
  { text: 'ROMANTIEK-\nSCAM', bottom: '22%', right: '3%', rotate: -4, accent: true },
  { text: '5 SEC\nANALYSE →', top: '52%', right: '7%', rotate: 8, accent: true, small: true },
]

export function Hero() {
  const locale = useLocale()

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '95vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#07180E',
        isolation: 'isolate',
      }}
    >
      {/* Subtle grain */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.06,
          mixBlendMode: 'overlay',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* Groene glow links */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '50%',
          height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(27,71,49,.6) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      {/* Floating stickers — verborgen op mobiel */}
      <div className="hero-top-strip-extras">
        {stickers.map((s, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: s.top,
              bottom: s.bottom,
              left: s.left,
              right: s.right,
              transform: `rotate(${s.rotate}deg)`,
              zIndex: 2,
              background: s.accent ? '#3AAC6E' : 'transparent',
              border: s.accent ? 'none' : '2px solid rgba(244,236,219,.25)',
              borderRadius: s.small ? 9999 : 8,
              padding: s.small ? '.4rem .9rem' : '.6rem .9rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: s.small ? '.65rem' : '.75rem',
              letterSpacing: '.06em',
              textTransform: 'uppercase' as const,
              color: s.accent ? '#07180E' : 'rgba(244,236,219,.7)',
              lineHeight: 1.3,
              whiteSpace: 'pre-line' as const,
              pointerEvents: 'none',
              userSelect: 'none' as const,
            }}
          >
            {s.text}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 6rem)',
          maxWidth: 1300,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '.72rem',
            fontWeight: 700,
            color: 'rgba(244,236,219,.45)',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#3AAC6E',
              boxShadow: '0 0 6px #3AAC6E',
            }}
          />
          De fraude-checker voor WhatsApp en sms
        </div>

        {/* Big headline */}
        <h1 style={{ margin: 0 }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(3.2rem, 10vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '-.04em',
              color: '#F4ECDB',
            }}
          >
            TWIJFELT U
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(3.2rem, 10vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '-.04em',
              color: '#3AAC6E',
              marginTop: '0.08em',
            }}
          >
            OVER EEN
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(3.2rem, 10vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '-.04em',
              color: '#F4ECDB',
              marginTop: '0.08em',
            }}
          >
            BERICHT?
          </span>
        </h1>

        {/* Subtext + CTA */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            marginTop: 'clamp(2rem, 4vw, 3.5rem)',
            paddingTop: 'clamp(1.5rem, 3vw, 2rem)',
            borderTop: '1px solid rgba(244,236,219,.12)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(.95rem, 1.2vw, 1.1rem)',
              lineHeight: 1.7,
              color: 'rgba(244,236,219,.6)',
              margin: 0,
              maxWidth: 420,
            }}
          >
            Upload een screenshot van een verdacht WhatsApp- of sms-bericht. Binnen 5 seconden weet
            u of het te vertrouwen is — in gewone taal.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', alignItems: 'center' }}>
            <Link
              href={`/${locale}/#demo`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.6rem',
                padding: '1rem 1.75rem',
                borderRadius: 10,
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '.02em',
                textDecoration: 'none',
                background: '#3AAC6E',
                color: '#07180E',
                boxShadow: '0 8px 30px -8px rgba(58,172,110,.5)',
                transition: 'transform .15s, box-shadow .15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 36px -8px rgba(58,172,110,.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 30px -8px rgba(58,172,110,.5)'
              }}
            >
              Bericht controleren
              <svg
                width="16"
                height="16"
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
            </Link>

            <Link
              href={`/${locale}/#hoe-het-werkt`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                padding: '1rem 1.4rem',
                borderRadius: 10,
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '.92rem',
                border: '1.5px solid rgba(244,236,219,.2)',
                background: 'transparent',
                color: 'rgba(244,236,219,.75)',
                textDecoration: 'none',
                transition: 'border-color .15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,236,219,.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,236,219,.2)'
              }}
            >
              Hoe het werkt
            </Link>
          </div>
        </div>
      </div>

      {/* Onderste decoratieve balk */}
      <div
        className="hero-bottom-strip-extras"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid rgba(244,236,219,.08)',
          padding: '.75rem clamp(1.5rem, 5vw, 6rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '.6rem',
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          color: 'rgba(244,236,219,.25)',
          zIndex: 3,
        }}
      >
        <span>© 2026 KloptHet</span>
        <span>Gemaakt in Nederland · EU-data</span>
        <span>klopthet.nl</span>
      </div>
    </section>
  )
}
