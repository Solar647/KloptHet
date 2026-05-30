'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section
      style={{
        position: 'relative',
        color: '#F4ECDB',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 3vw, 3rem) clamp(4rem, 8vw, 7rem)',
        overflow: 'hidden',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        isolation: 'isolate',
      }}
    >
      <FlutedGlassBG />

      {/* Paper grain */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.08,
          mixBlendMode: 'overlay',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: '200px 200px',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(58,172,110,.12)',
            border: '1px solid rgba(58,172,110,.25)',
            borderRadius: 9999,
            padding: '.4rem 1rem',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#3AAC6E',
              flexShrink: 0,
              boxShadow: '0 0 8px #3AAC6E',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.78rem',
              fontWeight: 600,
              color: '#3AAC6E',
              letterSpacing: '.06em',
              textTransform: 'uppercase',
            }}
          >
            Europese AI · Geen data bewaard
          </span>
        </div>

        {/* Headline */}
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2.8rem, 7vw, 7rem)',
              lineHeight: 1.0,
              letterSpacing: '-.03em',
              color: '#F4ECDB',
              margin: 0,
            }}
          >
            {t('heading')}
          </h1>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2.8rem, 7vw, 7rem)',
              lineHeight: 1.0,
              letterSpacing: '-.03em',
              color: 'rgba(58,172,110,.9)',
              margin: '.15em 0 0',
            }}
          >
            {t('headingAccent')}
          </h2>
        </div>

        {/* Subtext */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
            lineHeight: 1.7,
            color: 'rgba(244,236,219,.7)',
            margin: 0,
            maxWidth: 520,
          }}
        >
          {t('subheading')}
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', alignItems: 'center' }}>
          <Link
            href={`/${locale}/#demo`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.6rem',
              padding: '1rem 1.75rem',
              borderRadius: 12,
              fontSize: '1rem',
              fontWeight: 700,
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              background: '#F4ECDB',
              color: '#07190F',
              boxShadow: '0 8px 24px -8px rgba(0,0,0,.4)',
              transition: 'transform .15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {t('cta')}
            <ArrowIcon />
          </Link>
          <Link
            href={`/${locale}/#hoe-het-werkt`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.55rem',
              padding: '1rem 1.4rem',
              borderRadius: 12,
              fontSize: '.95rem',
              fontWeight: 600,
              border: '1.5px solid rgba(244,236,219,.3)',
              background: 'rgba(244,236,219,.06)',
              color: 'rgba(244,236,219,.85)',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              transition: 'border-color .15s, background .15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(244,236,219,.5)'
              e.currentTarget.style.background = 'rgba(244,236,219,.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(244,236,219,.3)'
              e.currentTarget.style.background = 'rgba(244,236,219,.06)'
            }}
          >
            {t('ctaSecondary')}
          </Link>
        </div>

        {/* Social proof strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(244,236,219,.1)',
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          {['Gemaakt in Nederland', 'Geen data bewaard', 'AI-analyse in 5 sec'].map((item) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--font-sans)',
                fontSize: '.82rem',
                color: 'rgba(244,236,219,.45)',
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: '#3AAC6E',
                  flexShrink: 0,
                }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FlutedGlassBG() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'linear-gradient(135deg, #0E2A1B 0%, #143A26 50%, #1A4D31 100%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `repeating-linear-gradient(
          90deg,
          rgba(255,255,255,.00) 0px,
          rgba(80,200,140,.04) 8px,
          rgba(0,0,0,.06) 16px,
          rgba(0,0,0,.08) 22px,
          rgba(80,200,140,.02) 30px,
          rgba(255,255,255,.01) 38px
        )`,
          filter: 'blur(.5px)',
          opacity: 0.7,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background:
            'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(58,172,110,.12) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
    </>
  )
}

function ArrowIcon() {
  return (
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
  )
}
