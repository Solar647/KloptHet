const steps = [
  {
    n: '01',
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    titleKey: 'step1Title',
    bodyKey: 'step1Body',
  },
  {
    n: '02',
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    titleKey: 'step2Title',
    bodyKey: 'step2Body',
  },
  {
    n: '03',
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      </svg>
    ),
    titleKey: 'step3Title',
    bodyKey: 'step3Body',
  },
]

export function HowItWorks() {
  return (
    <section
      id="hoe-het-werkt"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 3vw, 3rem)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #050D07 0%, #07120A 40%, #0A1C10 70%, #0E2418 100%)',
      }}
    >
      {/* Asterisk decorations */}
      <Asterisk size={320} top="8%" right="-3%" opacity={0.18} />
      <Asterisk size={200} bottom="5%" left="-2%" opacity={0.14} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Label */}
        <div
          style={{
            fontSize: '.72rem',
            fontWeight: 700,
            color: 'rgba(244,236,219,.7)',
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
            fontFamily: 'ui-monospace, monospace',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <AsteriskIcon />
          Hoe het werkt
          <span
            style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.35, minWidth: 80 }}
          />
        </div>

        {/* Heading + intro */}
        <div
          className="grid-responsive-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, .9fr)',
            gap: 'clamp(1.5rem, 4vw, 4rem)',
            alignItems: 'end',
            marginBottom: '3.5rem',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
              lineHeight: 1.0,
              letterSpacing: '-.04em',
              color: '#F4ECDB',
              margin: 0,
            }}
          >
            Drie stappen.
            <br />
            <em style={{ fontStyle: 'italic', color: 'rgba(58,172,110,.9)' }}>
              Één duidelijk antwoord.
            </em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'rgba(244,236,219,.65)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 360,
            }}
          >
            U hoeft niets te installeren. Geen account. Gewoon een screenshot uploaden en wij
            vertellen u in gewone taal wat er aan de hand is.
          </p>
        </div>

        {/* Steps */}
        <div
          className="grid-responsive"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          {steps.map((step) => (
            <div
              key={step.n}
              className="how-card card-hover"
              style={{
                background: 'rgba(244,236,219,.05)',
                border: '1px solid rgba(244,236,219,.14)',
                borderRadius: 18,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div style={{ color: 'rgba(58,172,110,.85)' }}>{step.icon}</div>
                <span
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '.65rem',
                    letterSpacing: '.2em',
                    color: 'rgba(244,236,219,.35)',
                    textTransform: 'uppercase',
                  }}
                >
                  {step.n}
                </span>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    fontSize: '1.35rem',
                    letterSpacing: '-.02em',
                    color: '#F4ECDB',
                    margin: '0 0 .6rem',
                  }}
                >
                  {step.n === '01' && 'Upload een screenshot'}
                  {step.n === '02' && 'Wij analyseren het bericht'}
                  {step.n === '03' && 'U krijgt een duidelijk antwoord'}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.95rem',
                    color: 'rgba(244,236,219,.65)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {step.n === '01' &&
                    'Maak een screenshot van het verdachte bericht op uw telefoon. Of plak de tekst direct in het invoervak.'}
                  {step.n === '02' &&
                    'Onze Europese AI bekijkt het bericht zoals een expert dat zou doen — afzender, toon, links, bekende patronen.'}
                  {step.n === '03' &&
                    'Veilig, twijfelachtig of oplichting — in gewone taal, met uitleg waarom, zodat u het de volgende keer zelf herkent.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Asterisk({
  size,
  top,
  bottom,
  left,
  right,
  opacity,
}: {
  size: number
  top?: string
  bottom?: string
  left?: string
  right?: string
  opacity: number
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top,
        bottom,
        left,
        right,
        width: size,
        height: size,
        opacity,
        pointerEvents: 'none',
        color: 'rgba(58,172,110,1)',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="currentColor"
        style={{ width: '100%', height: '100%', filter: 'blur(2px)' }}
      >
        <g>
          {[0, 60, 120].map((a) => (
            <rect
              key={a}
              x="44"
              y="6"
              width="12"
              height="88"
              rx="3"
              transform={`rotate(${a} 50 50)`}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

function AsteriskIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 100 100" aria-hidden="true">
      <g fill="currentColor">
        {[0, 60, 120].map((a) => (
          <rect
            key={a}
            x="44"
            y="6"
            width="12"
            height="88"
            rx="3"
            transform={`rotate(${a} 50 50)`}
          />
        ))}
      </g>
    </svg>
  )
}
