'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'

export function Hero() {
  const locale = useLocale()

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#06130C',
        isolation: 'isolate',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Grain */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.055,
          mixBlendMode: 'overlay',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* Glow spots */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-5%',
          left: '30%',
          width: '55%',
          height: '55%',
          background:
            'radial-gradient(ellipse at center, rgba(58,172,110,.18) 0%, transparent 65%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '40%',
          height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(27,71,49,.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── NAV AREA ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: 'clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 4vw, 4rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#F4ECDB',
            letterSpacing: '-.02em',
          }}
        >
          KloptHet
        </div>
        <div
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '.65rem',
            color: 'rgba(244,236,219,.35)',
            letterSpacing: '.18em',
            textTransform: 'uppercase',
          }}
        >
          fraude-checker · NL · 2026
        </div>
      </div>

      {/* ── HERO BODY — vrije compositie ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          flex: 1,
          padding: '0 clamp(1.5rem, 4vw, 4rem) clamp(3rem, 5vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {/* Eyebrow — licht gekanteld */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            transform: 'rotate(-1.5deg)',
            transformOrigin: 'left center',
            alignSelf: 'flex-start',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#3AAC6E',
              boxShadow: '0 0 8px #3AAC6E',
            }}
          />
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '.7rem',
              color: 'rgba(244,236,219,.4)',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
            }}
          >
            De fraude-checker voor WhatsApp en sms
          </span>
        </div>

        {/* ── TYPOGRAFIE BLOK — het hart ── */}
        <div style={{ position: 'relative' }}>
          {/* Lijn 1 — klein, gedraaid */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.3em',
              transform: 'rotate(-2deg)',
              transformOrigin: 'left bottom',
              marginBottom: '-0.12em',
              marginLeft: '0.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 5vw, 5rem)',
                lineHeight: 1,
                letterSpacing: '-.03em',
                color: 'rgba(244,236,219,.6)',
              }}
            >
              TWIJFELT U
            </span>
            {/* Floating sticker naast lijn 1 */}
            <div
              className="hero-top-strip-extras"
              style={{
                background: 'rgba(244,236,219,.08)',
                border: '1.5px solid rgba(244,236,219,.2)',
                borderRadius: 6,
                padding: '.3rem .6rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '.6rem',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'rgba(244,236,219,.5)',
                transform: 'rotate(4deg)',
                marginLeft: '1rem',
                flexShrink: 0,
                alignSelf: 'center',
              }}
            >
              KLEINKIND-TRUC
            </div>
          </div>

          {/* Lijn 2 — mega groot, cream */}
          <div style={{ lineHeight: 0.85, marginLeft: '-0.03em' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(5rem, 18vw, 18rem)',
                letterSpacing: '-.05em',
                color: '#F4ECDB',
                display: 'block',
              }}
            >
              OVER
            </span>
          </div>

          {/* Lijn 3 — mega groot, groen, offset rechts */}
          <div
            style={{
              lineHeight: 0.85,
              marginLeft: 'clamp(1rem, 8vw, 10rem)',
              marginTop: '-0.05em',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '0.4em',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(5rem, 18vw, 18rem)',
                letterSpacing: '-.05em',
                color: '#3AAC6E',
              }}
            >
              EEN
            </span>

            {/* Floating mock bericht — naast EEN */}
            <div
              className="hero-top-strip-extras"
              style={{
                background: 'rgba(20,58,38,.9)',
                border: '1px solid rgba(58,172,110,.3)',
                borderRadius: 14,
                padding: '1rem 1.1rem',
                marginBottom: '1.5rem',
                flexShrink: 0,
                maxWidth: 220,
                transform: 'rotate(3deg)',
                boxShadow: '0 20px 40px rgba(0,0,0,.4)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.7rem',
                  color: 'rgba(244,236,219,.4)',
                  marginBottom: '.4rem',
                }}
              >
                +31 6 82 49 17 53 · Onbekend
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.82rem',
                  color: 'rgba(244,236,219,.85)',
                  lineHeight: 1.5,
                }}
              >
                &ldquo;Hoi mama, dit is mijn nieuwe nummer. Kun je me €450 sturen?&rdquo;
              </div>
              <div
                style={{
                  marginTop: '.6rem',
                  padding: '.3rem .6rem',
                  background: 'rgba(229,83,42,.15)',
                  border: '1px solid rgba(229,83,42,.3)',
                  borderRadius: 6,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.65rem',
                  fontWeight: 700,
                  color: '#E5532A',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                }}
              >
                ⚠ Meerdere waarschuwingen
              </div>
            </div>
          </div>

          {/* Lijn 4 — medium, gedraaid rechts uitgelijnd */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              transform: 'rotate(1.5deg)',
              transformOrigin: 'right bottom',
              marginTop: '-0.08em',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 8vw, 8rem)',
                lineHeight: 0.9,
                letterSpacing: '-.04em',
                color: '#F4ECDB',
              }}
            >
              BERICHT?
            </span>
          </div>

          {/* SVG squiggle decoratie */}
          <svg
            className="hero-bottom-strip-extras"
            width="180"
            height="30"
            viewBox="0 0 180 30"
            style={{
              position: 'absolute',
              bottom: '-1rem',
              left: '5%',
              opacity: 0.25,
            }}
            aria-hidden="true"
          >
            <path
              d="M0 15 C30 5, 60 25, 90 15 S150 5, 180 15"
              stroke="#3AAC6E"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* ── BOTTOM ROW ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginTop: 'clamp(2rem, 4vw, 3.5rem)',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(244,236,219,.1)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(.9rem, 1.1vw, 1.05rem)',
              lineHeight: 1.7,
              color: 'rgba(244,236,219,.55)',
              margin: 0,
              maxWidth: 380,
            }}
          >
            Upload een screenshot. Wij analyseren en vertellen u in gewone taal of het te vertrouwen
            is.
          </p>

          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
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
                textDecoration: 'none',
                background: '#3AAC6E',
                color: '#06130C',
                boxShadow: '0 8px 30px -8px rgba(58,172,110,.55)',
                transition: 'transform .15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) rotate(-1deg)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) rotate(0)'
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
                padding: '1rem 1.3rem',
                borderRadius: 10,
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '.9rem',
                border: '1.5px solid rgba(244,236,219,.18)',
                background: 'rgba(244,236,219,.04)',
                color: 'rgba(244,236,219,.7)',
                textDecoration: 'none',
                transition: 'border-color .15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,236,219,.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,236,219,.18)'
              }}
            >
              Hoe werkt het?
            </Link>

            {/* Mini badge — ook gedraaid */}
            <div
              className="hero-top-strip-extras"
              style={{
                background: 'rgba(58,172,110,.12)',
                border: '1px solid rgba(58,172,110,.25)',
                borderRadius: 9999,
                padding: '.5rem .9rem',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '.62rem',
                color: '#3AAC6E',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                transform: 'rotate(-2deg)',
              }}
            >
              Gratis proberen
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
