'use client'

import type { Verdict } from '@/lib/ai/provider'

type Props = {
  verdict: Verdict
  onReset: () => void
}

const categoryConfig = {
  safe: {
    label: 'Veilig',
    color: '#3AAC6E',
    bg: 'rgba(58,172,110,.1)',
    border: 'rgba(58,172,110,.3)',
    emoji: '✓',
    description: 'Geen alarmsignalen gevonden.',
  },
  doubt: {
    label: 'Twijfelachtig',
    color: '#D97B2A',
    bg: 'rgba(217,123,42,.1)',
    border: 'rgba(217,123,42,.3)',
    emoji: '⚠',
    description: 'Wees voorzichtig.',
  },
  phishing: {
    label: 'Oplichting',
    color: '#E5532A',
    bg: 'rgba(229,83,42,.1)',
    border: 'rgba(229,83,42,.3)',
    emoji: '✗',
    description: 'Niet vertrouwen.',
  },
}

const severityColor = {
  info: 'rgba(244,236,219,.6)',
  warn: '#D97B2A',
  danger: '#E5532A',
}

export function VerdictCard({ verdict, onReset }: Props) {
  const config = categoryConfig[verdict.category]

  return (
    <section
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 3vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Verdict badge */}
        <div
          style={{
            background: config.bg,
            border: `1px solid ${config.border}`,
            borderRadius: 18,
            padding: '2rem',
            marginBottom: '1.25rem',
          }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: config.border,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                flexShrink: 0,
                color: config.color,
              }}
            >
              {config.emoji}
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.75rem',
                  fontWeight: 700,
                  color: config.color,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  marginBottom: '.2rem',
                }}
              >
                {config.description}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 500,
                  fontSize: '2rem',
                  color: '#F4ECDB',
                  lineHeight: 1,
                  letterSpacing: '-.02em',
                }}
              >
                {config.label}
              </div>
            </div>

            {/* Score meter */}
            <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  fontSize: '2.4rem',
                  lineHeight: 1,
                  color: config.color,
                }}
              >
                {verdict.score}
                <span style={{ fontSize: '1.2rem', color: 'rgba(244,236,219,.4)' }}>/10</span>
              </div>
              <div
                style={{
                  fontSize: '.72rem',
                  color: 'rgba(244,236,219,.4)',
                  fontFamily: 'var(--font-sans)',
                  marginTop: 2,
                }}
              >
                verdachtheid
              </div>
            </div>
          </div>

          {/* Score bar */}
          <div
            style={{
              height: 6,
              borderRadius: 9999,
              background: 'rgba(244,236,219,.1)',
              marginBottom: '1.5rem',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                borderRadius: 9999,
                width: `${verdict.score * 10}%`,
                background: config.color,
                transition: 'width 1s cubic-bezier(.16,1,.3,1)',
              }}
            />
          </div>

          {/* Uitleg */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              color: 'rgba(244,236,219,.88)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {verdict.summary}
          </p>
        </div>

        {/* Waarschuwingssignalen */}
        {verdict.flags.length > 0 && (
          <div
            style={{
              background: 'rgba(244,236,219,.04)',
              border: '1px solid rgba(244,236,219,.14)',
              borderRadius: 14,
              padding: '1.5rem',
              marginBottom: '1.25rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '.85rem',
                color: 'rgba(244,236,219,.6)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                margin: '0 0 1rem',
              }}
            >
              Waarschuwingssignalen
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '.6rem',
              }}
            >
              {verdict.flags.map((flag, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.95rem',
                    color: 'rgba(244,236,219,.85)',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: severityColor[flag.severity],
                    }}
                  />
                  {flag.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Acties */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          {verdict.category !== 'safe' && (
            <a
              href="https://www.fraudehelpdesk.nl/meld-fraude/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(229,83,42,.08)',
                border: '1px solid rgba(229,83,42,.25)',
                borderRadius: 12,
                padding: '1rem 1.25rem',
                color: '#F4ECDB',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '.95rem',
              }}
            >
              <span>🛡 Meld dit bij de Fraudehelpdesk</span>
              <span style={{ color: 'rgba(244,236,219,.4)' }}>→</span>
            </a>
          )}

          <button
            onClick={onReset}
            style={{
              background: 'rgba(244,236,219,.08)',
              border: '1px solid rgba(244,236,219,.16)',
              borderRadius: 12,
              padding: '1rem 1.25rem',
              color: '#F4ECDB',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: '.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'background .15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(244,236,219,.13)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(244,236,219,.08)'
            }}
          >
            ← Controleer nog een bericht
          </button>
        </div>

        <p
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '.78rem',
            color: 'rgba(244,236,219,.3)',
            fontFamily: 'var(--font-sans)',
            lineHeight: 1.6,
          }}
        >
          Dit is een advies, geen garantie. Twijfelt u nog? Bel de Fraudehelpdesk: 088 – 786 87 78
        </p>
      </div>
    </section>
  )
}
