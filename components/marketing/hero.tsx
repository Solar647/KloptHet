import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section
      style={{
        position: 'relative',
        color: '#F4ECDB',
        padding: 'clamp(3.5rem, 5vw, 5rem) clamp(1.5rem, 3vw, 3rem) 0',
        overflow: 'hidden',
        minHeight: '92vh',
        isolation: 'isolate',
      }}
    >
      {/* Fluted glass background */}
      <FlutedGlassBG />

      {/* Paper grain */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.1,
          mixBlendMode: 'overlay',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* Top strip */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 1320,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto auto',
          gap: 'clamp(1rem, 3vw, 3rem)',
          alignItems: 'flex-start',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(244,236,219,.18)',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '1.05rem',
              color: '#F4ECDB',
              letterSpacing: '-.025em',
            }}
          >
            Klopt Het
          </div>
          <div
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '.6rem',
              letterSpacing: '.18em',
              color: 'rgba(244,236,219,.5)',
              marginTop: 5,
              textTransform: 'uppercase',
            }}
          >
            fraude-checker · NL
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.8rem',
            lineHeight: 1.5,
            color: 'rgba(244,236,219,.65)',
            maxWidth: 280,
            alignSelf: 'flex-start',
          }}
        >
          Oplichting is slim. Beslissen of een bericht echt is, hoeft dat ook te zijn.
        </div>
        <HeaderTag label="2026" sub={['Editie', 'Vol. 01']} />
        <HeaderTag label="Live" sub={['Gratis', 'controle']} />
      </div>

      {/* Main headline */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 1320,
          margin: '0 auto',
          paddingTop: 'clamp(2rem, 4vw, 3rem)',
          paddingBottom: 'clamp(2.5rem, 4vw, 4rem)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: 'clamp(3rem, 11vw, 10rem)',
            lineHeight: 0.92,
            letterSpacing: '-.035em',
            color: '#F4ECDB',
            margin: 0,
            maxWidth: '14ch',
          }}
        >
          {t('heading')}
        </h1>

        <div style={{ height: 'clamp(1.5rem, 4vw, 3rem)' }} />

        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: 'clamp(2.6rem, 9.5vw, 9rem)',
            lineHeight: 0.92,
            letterSpacing: '-.035em',
            color: '#F4ECDB',
            margin: 0,
            textAlign: 'right',
            maxWidth: '16ch',
            marginLeft: 'auto',
          }}
        >
          {t('headingAccent')}
        </h2>

        {/* Bottom row */}
        <div
          style={{
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: 'minmax(260px, 1.1fr) minmax(260px, 1fr) auto',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            alignItems: 'end',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(244,236,219,.18)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
              lineHeight: 1.6,
              color: 'rgba(244,236,219,.82)',
              margin: 0,
              maxWidth: 400,
            }}
          >
            {t('subheading')}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '.75rem',
              alignItems: 'center',
            }}
          >
            <Link
              href={`/${locale}/#scanner`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.6rem',
                padding: '1rem 1.7rem',
                borderRadius: 9999,
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                background: '#F4ECDB',
                color: '#07190F',
                border: '2px solid #F4ECDB',
                boxShadow: '0 8px 22px -8px rgba(0,0,0,.4)',
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
                borderRadius: 9999,
                fontSize: '.95rem',
                fontWeight: 600,
                border: '1.5px solid rgba(244,236,219,.45)',
                background: 'transparent',
                color: '#F4ECDB',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {t('ctaSecondary')}
            </Link>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '.6rem',
                letterSpacing: '.2em',
                color: 'rgba(244,236,219,.5)',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              {t('trustBadge')
                .split(' · ')
                .map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom editorial strip */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 1320,
          margin: '0 auto',
          padding: '1.1rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '.6rem',
          letterSpacing: '.2em',
          color: 'rgba(244,236,219,.45)',
          textTransform: 'uppercase',
          borderTop: '1px solid rgba(244,236,219,.18)',
        }}
      >
        <span>© 2026 Klopt Het</span>
        <span>klopthet.nl</span>
        <span>Gemaakt in Nederland</span>
      </div>
    </section>
  )
}

function HeaderTag({ label, sub }: { label: string; sub: string[] }) {
  return (
    <div style={{ color: '#F4ECDB', textAlign: 'left' }}>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 600,
          fontSize: '1.05rem',
          lineHeight: 1,
          letterSpacing: '-.01em',
        }}
      >
        {label}
      </div>
      {sub.map((s, i) => (
        <div
          key={i}
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '.6rem',
            letterSpacing: '.18em',
            color: 'rgba(244,236,219,.55)',
            marginTop: i === 0 ? 4 : 1,
            textTransform: 'uppercase',
          }}
        >
          {s}
        </div>
      ))}
    </div>
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
          background: 'linear-gradient(180deg, #0E2A1B 0%, #143A26 50%, #1A4D31 100%)',
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
            rgba(80,200,140,.05) 8px,
            rgba(0,0,0,.07) 16px,
            rgba(0,0,0,.10) 22px,
            rgba(80,200,140,.03) 30px,
            rgba(255,255,255,.02) 38px
          )`,
          filter: 'blur(.6px)',
          opacity: 0.85,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background:
            'radial-gradient(ellipse 35% 90% at 50% 55%, rgba(80,220,150,.10) 0%, transparent 75%)',
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 50%, rgba(0,0,0,.35) 100%)',
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
