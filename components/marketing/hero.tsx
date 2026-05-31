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
        background: '#05110A',
        isolation: 'isolate',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Glow spots */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-5%',
          width: '65vw',
          height: '65vw',
          maxWidth: 850,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(27,71,49,.6) 0%, transparent 68%)',
          filter: 'blur(90px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '-8%',
          width: '45vw',
          height: '45vw',
          maxWidth: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,172,110,.14) 0%, transparent 65%)',
          filter: 'blur(70px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Grain */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.045,
          mixBlendMode: 'screen',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* Decoratieve cirkels rechts */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '5%',
          right: '-12%',
          width: 'clamp(280px, 52vw, 620px)',
          height: 'clamp(280px, 52vw, 620px)',
          borderRadius: '50%',
          border: '1px solid rgba(58,172,110,.1)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          right: '-6%',
          width: 'clamp(180px, 36vw, 430px)',
          height: 'clamp(180px, 36vw, 430px)',
          borderRadius: '50%',
          border: '1px solid rgba(244,236,219,.04)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── PHONE MOCKUP — geanimeerd zwevend ── */}
      <div
        className="hero-top-strip-extras hero-phone"
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(2rem, 7vw, 7rem)',
          zIndex: 6,
          pointerEvents: 'none',
        }}
      >
        <PhoneMockup />
      </div>

      {/* ── STICKERS ── */}
      <div
        className="hero-top-strip-extras hero-sticker-1"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: 'clamp(1.5rem, 5vw, 6rem)',
          background: '#3AAC6E',
          borderRadius: 9999,
          padding: '.55rem 1.1rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: 'clamp(.65rem, .85vw, .8rem)',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: '#05110A',
          zIndex: 5,
          boxShadow: '0 6px 20px rgba(58,172,110,.35)',
          whiteSpace: 'nowrap',
        }}
      >
        Kleinkind-truc
      </div>

      <div
        className="hero-top-strip-extras hero-sticker-2"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '14%',
          right: 'clamp(2rem, 17vw, 21rem)',
          border: '2px solid rgba(244,236,219,.35)',
          borderRadius: 8,
          padding: '.45rem .85rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: 'clamp(.6rem, .75vw, .72rem)',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: 'rgba(244,236,219,.6)',
          zIndex: 5,
          whiteSpace: 'nowrap',
          background: 'rgba(244,236,219,.04)',
        }}
      >
        Bank-imitatie
      </div>

      <div
        className="hero-top-strip-extras hero-sticker-3"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '24%',
          left: 'clamp(1.5rem, 5vw, 6rem)',
          border: '2px solid rgba(229,83,42,.45)',
          borderRadius: 9999,
          padding: '.45rem 1rem',
          fontFamily: 'ui-monospace, monospace',
          fontWeight: 700,
          fontSize: 'clamp(.58rem, .7vw, .65rem)',
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: 'rgba(229,83,42,.85)',
          zIndex: 5,
          whiteSpace: 'nowrap',
          background: 'rgba(229,83,42,.06)',
        }}
      >
        ⚠ Bezorg-fraude
      </div>

      {/* ── NAV ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: 'clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.5rem, 4vw, 4rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '1.05rem',
            color: '#F4ECDB',
            letterSpacing: '-.02em',
          }}
        >
          KloptHet
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            fontFamily: 'ui-monospace, monospace',
            fontSize: '.6rem',
            color: 'rgba(244,236,219,.3)',
            letterSpacing: '.16em',
            textTransform: 'uppercase',
          }}
        >
          <span
            className="hero-live-dot"
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#3AAC6E',
            }}
          />
          Live · NL · 2026
        </div>
      </div>

      {/* ── HOOFD CONTENT ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          flex: 1,
          padding: '0 clamp(1.5rem, 4vw, 4rem) clamp(3rem, 6vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          maxWidth: 1400,
          width: '100%',
        }}
      >
        {/* Label */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 'clamp(.75rem, 1.5vw, 1.25rem)',
            alignSelf: 'flex-start',
            transform: 'rotate(-1deg)',
            transformOrigin: 'left center',
          }}
        >
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '.65rem',
              color: 'rgba(244,236,219,.32)',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
            }}
          >
            Fraude-checker · WhatsApp · sms
          </span>
        </div>

        {/* TYPOGRAFIE */}
        <div style={{ position: 'relative' }}>
          {/* Lijn 1 */}
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 4.2vw, 4.2rem)',
              letterSpacing: '-.03em',
              color: 'rgba(244,236,219,.45)',
              transform: 'rotate(-1.5deg)',
              transformOrigin: 'left bottom',
              display: 'inline-block',
              marginBottom: '-0.06em',
              marginLeft: '0.8rem',
            }}
          >
            TWIJFELT U
          </div>

          {/* OVER — gevuld, cream */}
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(5rem, 19vw, 19rem)',
              letterSpacing: '-.055em',
              color: '#F4ECDB',
              lineHeight: 0.82,
              display: 'block',
              marginLeft: '-0.04em',
            }}
          >
            OVER
          </div>

          {/* EEN — OUTLINE, niet gevuld */}
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(5rem, 19vw, 19rem)',
              letterSpacing: '-.055em',
              lineHeight: 0.82,
              display: 'block',
              marginLeft: 'clamp(.5rem, 6vw, 7rem)',
              marginTop: '-0.02em',
              WebkitTextStroke: '2px #3AAC6E',
              color: 'transparent',
              position: 'relative',
            }}
          >
            EEN
            {/* Gestippelde lijn erdoor */}
            <svg
              style={{
                position: 'absolute',
                bottom: '22%',
                left: '-2%',
                width: '104%',
                overflow: 'visible',
                pointerEvents: 'none',
              }}
              height="4"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="2"
                x2="100%"
                y2="2"
                stroke="#3AAC6E"
                strokeWidth="2"
                strokeDasharray="12 8"
                opacity="0.35"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* BERICHT? — rechts */}
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 6.5vw, 7rem)',
              letterSpacing: '-.04em',
              color: '#F4ECDB',
              lineHeight: 0.9,
              display: 'block',
              textAlign: 'right',
              transform: 'rotate(1deg)',
              transformOrigin: 'right bottom',
              marginTop: '-0.02em',
            }}
          >
            BERICHT?
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            paddingTop: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            borderTop: '1px solid rgba(244,236,219,.07)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(.88rem, 1vw, 1rem)',
              lineHeight: 1.75,
              color: 'rgba(244,236,219,.48)',
              margin: 0,
              maxWidth: 360,
            }}
          >
            Upload een screenshot. Binnen 5 seconden weet u of het te vertrouwen is — in gewone
            taal.
          </p>

          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href={`/${locale}/#demo`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.6rem',
                padding: '.95rem 1.7rem',
                borderRadius: 12,
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '.95rem',
                textDecoration: 'none',
                background: '#3AAC6E',
                color: '#05110A',
                boxShadow: '0 8px 32px -8px rgba(58,172,110,.6)',
                transition: 'transform .2s cubic-bezier(.16,1,.3,1), box-shadow .2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) rotate(-1deg)'
                e.currentTarget.style.boxShadow = '0 16px 40px -8px rgba(58,172,110,.7)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) rotate(0)'
                e.currentTarget.style.boxShadow = '0 8px 32px -8px rgba(58,172,110,.6)'
              }}
            >
              Controleer een bericht
              <ArrowSvg />
            </Link>
            <Link
              href={`/${locale}/#hoe-het-werkt`}
              style={{
                padding: '.95rem 1.3rem',
                borderRadius: 12,
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '.88rem',
                border: '1.5px solid rgba(244,236,219,.13)',
                background: 'rgba(244,236,219,.04)',
                color: 'rgba(244,236,219,.6)',
                textDecoration: 'none',
                transition: 'border-color .15s, color .15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,236,219,.28)'
                e.currentTarget.style.color = '#F4ECDB'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,236,219,.13)'
                e.currentTarget.style.color = 'rgba(244,236,219,.6)'
              }}
            >
              Hoe werkt het?
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneMockup() {
  return (
    <div
      style={{
        width: 'clamp(170px, 18vw, 240px)',
        background: 'linear-gradient(160deg, #0C2416 0%, #081A0E 100%)',
        border: '1.5px solid rgba(58,172,110,.18)',
        borderRadius: 28,
        padding: '1.25rem .9rem .9rem',
        boxShadow: '0 40px 80px -20px rgba(0,0,0,.75), 0 0 0 1px rgba(58,172,110,.08)',
      }}
    >
      <div
        style={{
          width: 50,
          height: 5,
          borderRadius: 9999,
          background: 'rgba(244,236,219,.08)',
          margin: '0 auto .9rem',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '.6rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '.5rem',
          color: 'rgba(244,236,219,.35)',
        }}
      >
        <span>9:41</span>
        <span>●●●</span>
      </div>
      <div
        style={{
          background: 'rgba(244,236,219,.05)',
          borderRadius: 9,
          padding: '.5rem .65rem',
          display: 'flex',
          alignItems: 'center',
          gap: '.4rem',
          marginBottom: '.6rem',
          border: '1px solid rgba(244,236,219,.07)',
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'rgba(244,236,219,.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '.6rem',
            color: 'rgba(244,236,219,.4)',
            flexShrink: 0,
          }}
        >
          ?
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '.58rem',
              color: '#F4ECDB',
            }}
          >
            +31 6 82 49 17 53
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.48rem',
              color: 'rgba(244,236,219,.3)',
            }}
          >
            Onbekend nummer
          </div>
        </div>
      </div>
      <div
        style={{
          background: 'rgba(244,236,219,.07)',
          border: '1px solid rgba(244,236,219,.09)',
          borderRadius: '3px 10px 10px 10px',
          padding: '.55rem .65rem',
          marginBottom: '.45rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.58rem',
            color: 'rgba(244,236,219,.8)',
            lineHeight: 1.5,
          }}
        >
          Hoi mama, dit is mijn nieuwe nummer. Kun je me €450 sturen?
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.46rem',
            color: 'rgba(244,236,219,.25)',
            textAlign: 'right',
            marginTop: '.25rem',
          }}
        >
          14:23 ✓✓
        </div>
      </div>
      <div
        style={{
          background: 'rgba(229,83,42,.14)',
          border: '1px solid rgba(229,83,42,.3)',
          borderRadius: 7,
          padding: '.38rem .55rem',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          marginBottom: '.6rem',
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: '#E5532A',
            flexShrink: 0,
            boxShadow: '0 0 5px #E5532A',
          }}
        />
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '.5rem',
              color: '#E5532A',
              letterSpacing: '.04em',
              textTransform: 'uppercase',
            }}
          >
            Meerdere waarschuwingen
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.46rem',
              color: 'rgba(244,236,219,.4)',
              marginTop: 1,
            }}
          >
            Score 8/10 · Kleinkind-truc
          </div>
        </div>
      </div>
      <div
        style={{
          paddingTop: '.55rem',
          borderTop: '1px solid rgba(244,236,219,.05)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '.5rem',
            color: '#3AAC6E',
            letterSpacing: '.05em',
            textTransform: 'uppercase',
          }}
        >
          KloptHet — Analyseren →
        </div>
      </div>
    </div>
  )
}

function ArrowSvg() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
