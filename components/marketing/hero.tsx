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
      {/* ── ACHTERGROND LAAG ── */}
      {/* Grote cirkel glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '70vw',
          height: '70vw',
          maxWidth: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(27,71,49,.55) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Tweede glow links */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '50vw',
          height: '50vw',
          maxWidth: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,172,110,.12) 0%, transparent 65%)',
          filter: 'blur(60px)',
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
          opacity: 0.04,
          mixBlendMode: 'screen',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── GROTE DECORATIEVE RING ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '8%',
          right: '-8%',
          width: 'clamp(300px, 55vw, 650px)',
          height: 'clamp(300px, 55vw, 650px)',
          borderRadius: '50%',
          border: '1px solid rgba(58,172,110,.12)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '12%',
          right: '-5%',
          width: 'clamp(220px, 42vw, 500px)',
          height: 'clamp(220px, 42vw, 500px)',
          borderRadius: '50%',
          border: '1px solid rgba(244,236,219,.05)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── PHONE MOCKUP — rechts zweeft ── */}
      <div
        className="hero-top-strip-extras"
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(2rem, 8vw, 8rem)',
          transform: 'translateY(-48%) rotate(5deg)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      >
        <PhoneMockup />
      </div>

      {/* ── STICKERS — organic, niet rechthoekig ── */}

      {/* Sticker 1 — groene pill, links */}
      <div
        className="hero-top-strip-extras"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '22%',
          left: 'clamp(1rem, 4vw, 5rem)',
          background: '#3AAC6E',
          borderRadius: 9999,
          padding: '.5rem 1rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: 'clamp(.6rem, .8vw, .75rem)',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: '#05110A',
          transform: 'rotate(-8deg)',
          zIndex: 4,
          boxShadow: '0 4px 16px rgba(58,172,110,.3)',
          whiteSpace: 'nowrap',
        }}
      >
        Kleinkind-truc
      </div>

      {/* Sticker 2 — outline badge rechts */}
      <div
        className="hero-top-strip-extras"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15%',
          right: 'clamp(2rem, 18vw, 22rem)',
          border: '2px solid rgba(244,236,219,.3)',
          borderRadius: 8,
          padding: '.4rem .75rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: 'clamp(.55rem, .7vw, .68rem)',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: 'rgba(244,236,219,.55)',
          transform: 'rotate(6deg)',
          zIndex: 4,
          whiteSpace: 'nowrap',
        }}
      >
        Bank-imitatie
      </div>

      {/* Sticker 3 — oranje/rood outline onderin links */}
      <div
        className="hero-top-strip-extras"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '22%',
          left: 'clamp(1rem, 5vw, 6rem)',
          border: '2px solid rgba(229,83,42,.4)',
          borderRadius: 9999,
          padding: '.4rem .9rem',
          fontFamily: 'ui-monospace, monospace',
          fontWeight: 700,
          fontSize: 'clamp(.55rem, .65vw, .62rem)',
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: 'rgba(229,83,42,.8)',
          transform: 'rotate(4deg)',
          zIndex: 4,
          whiteSpace: 'nowrap',
        }}
      >
        ⚠ Bezorg-fraude
      </div>

      {/* Sticker 4 — tiny pill rechtsonder */}
      <div
        className="hero-top-strip-extras"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '30%',
          right: 'clamp(2rem, 20vw, 25rem)',
          background: 'rgba(58,172,110,.15)',
          border: '1px solid rgba(58,172,110,.3)',
          borderRadius: 9999,
          padding: '.35rem .75rem',
          fontFamily: 'ui-monospace, monospace',
          fontSize: 'clamp(.5rem, .6vw, .58rem)',
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: '#3AAC6E',
          transform: 'rotate(-5deg)',
          zIndex: 4,
          whiteSpace: 'nowrap',
        }}
      >
        5 sec · EU AI
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
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#3AAC6E',
              boxShadow: '0 0 6px #3AAC6E',
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
            transform: 'rotate(-1.2deg)',
            transformOrigin: 'left center',
            alignSelf: 'flex-start',
          }}
        >
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '.65rem',
              color: 'rgba(244,236,219,.35)',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
            }}
          >
            Fraude-checker voor WhatsApp en sms
          </span>
        </div>

        {/* TYPOGRAFIE */}
        <div style={{ position: 'relative', lineHeight: 1 }}>
          {/* "TWIJFELT U" — klein, licht transparant, gedraaid */}
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 4.5vw, 4.5rem)',
              letterSpacing: '-.03em',
              color: 'rgba(244,236,219,.5)',
              transform: 'rotate(-1.8deg)',
              transformOrigin: 'left bottom',
              display: 'inline-block',
              marginBottom: '-0.06em',
              marginLeft: '0.6rem',
            }}
          >
            TWIJFELT U
          </div>

          {/* "OVER" — enorm */}
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(5.5rem, 20vw, 20rem)',
              letterSpacing: '-.05em',
              color: '#F4ECDB',
              lineHeight: 0.82,
              display: 'block',
              marginLeft: '-0.04em',
            }}
          >
            OVER
          </div>

          {/* "EEN" — enorm, groen, offset + schuin lijntje erdoor */}
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              marginLeft: 'clamp(.5rem, 5vw, 6rem)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(5.5rem, 20vw, 20rem)',
                letterSpacing: '-.05em',
                color: '#3AAC6E',
                lineHeight: 0.82,
                display: 'block',
              }}
            >
              EEN
            </span>
            {/* Decoratieve schuine streep */}
            <svg
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '-4%',
                width: '108%',
                height: '18%',
                overflow: 'visible',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            >
              <line
                x1="0%"
                y1="70%"
                x2="100%"
                y2="30%"
                stroke="#3AAC6E"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.4"
                strokeDasharray="8 6"
              />
            </svg>
          </div>

          {/* "BERICHT?" — medium, rechts, gedraaid */}
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 7vw, 7.5rem)',
              letterSpacing: '-.04em',
              color: '#F4ECDB',
              lineHeight: 0.9,
              display: 'block',
              textAlign: 'right',
              transform: 'rotate(1.2deg)',
              transformOrigin: 'right bottom',
              marginTop: '-0.04em',
            }}
          >
            BERICHT?
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            paddingTop: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            borderTop: '1px solid rgba(244,236,219,.08)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(.88rem, 1.1vw, 1rem)',
              lineHeight: 1.75,
              color: 'rgba(244,236,219,.5)',
              margin: 0,
              maxWidth: 380,
            }}
          >
            Upload een screenshot. Binnen 5 seconden weet u of het te vertrouwen is — in gewone
            taal, zonder gedoe.
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
                letterSpacing: '.01em',
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
            </Link>

            <Link
              href={`/${locale}/#hoe-het-werkt`}
              style={{
                padding: '.95rem 1.3rem',
                borderRadius: 12,
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '.88rem',
                border: '1.5px solid rgba(244,236,219,.15)',
                background: 'rgba(244,236,219,.04)',
                color: 'rgba(244,236,219,.65)',
                textDecoration: 'none',
                transition: 'border-color .15s, color .15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,236,219,.3)'
                e.currentTarget.style.color = '#F4ECDB'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,236,219,.15)'
                e.currentTarget.style.color = 'rgba(244,236,219,.65)'
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
        width: 'clamp(180px, 20vw, 260px)',
        background: '#0C2416',
        border: '2px solid rgba(58,172,110,.2)',
        borderRadius: 32,
        padding: '1.5rem 1rem 1rem',
        boxShadow: '0 40px 80px -20px rgba(0,0,0,.7), 0 0 0 1px rgba(58,172,110,.1)',
        position: 'relative',
      }}
    >
      {/* Notch */}
      <div
        style={{
          width: 60,
          height: 6,
          borderRadius: 9999,
          background: 'rgba(244,236,219,.1)',
          margin: '0 auto 1.25rem',
        }}
      />

      {/* Status bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '.75rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '.55rem',
          color: 'rgba(244,236,219,.4)',
        }}
      >
        <span>9:41</span>
        <span>●●●</span>
      </div>

      {/* WhatsApp header */}
      <div
        style={{
          background: 'rgba(244,236,219,.06)',
          borderRadius: 10,
          padding: '.6rem .75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '.5rem',
          marginBottom: '.75rem',
          border: '1px solid rgba(244,236,219,.08)',
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'rgba(244,236,219,.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '.7rem',
            color: 'rgba(244,236,219,.5)',
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
              fontSize: '.65rem',
              color: '#F4ECDB',
            }}
          >
            +31 6 82 49 17 53
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.52rem',
              color: 'rgba(244,236,219,.35)',
            }}
          >
            Onbekend nummer
          </div>
        </div>
      </div>

      {/* Bericht bubble */}
      <div
        style={{
          background: 'rgba(244,236,219,.08)',
          border: '1px solid rgba(244,236,219,.1)',
          borderRadius: '4px 12px 12px 12px',
          padding: '.65rem .75rem',
          marginBottom: '.5rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.62rem',
            color: 'rgba(244,236,219,.8)',
            lineHeight: 1.55,
          }}
        >
          Hoi mama, dit is mijn nieuwe nummer. Kun je me €450 sturen?
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.5rem',
            color: 'rgba(244,236,219,.3)',
            textAlign: 'right',
            marginTop: '.3rem',
          }}
        >
          14:23 ✓✓
        </div>
      </div>

      {/* Verdict badge */}
      <div
        style={{
          background: 'rgba(229,83,42,.15)',
          border: '1px solid rgba(229,83,42,.35)',
          borderRadius: 8,
          padding: '.45rem .6rem',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
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
              fontSize: '.55rem',
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
              fontSize: '.5rem',
              color: 'rgba(244,236,219,.45)',
              marginTop: 1,
            }}
          >
            Score 8/10 · Kleinkind-truc
          </div>
        </div>
      </div>

      {/* Onderste balk */}
      <div
        style={{
          marginTop: '.85rem',
          paddingTop: '.65rem',
          borderTop: '1px solid rgba(244,236,219,.06)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '.55rem',
            color: '#3AAC6E',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
          }}
        >
          KloptHet — Analyseren →
        </div>
      </div>
    </div>
  )
}
