'use client'

import type { Verdict } from '@/lib/ai/provider'

type Props = {
  verdict: Verdict
  onReset: () => void
}

const categoryConfig = {
  safe: {
    label: 'Geen alarmsignalen',
    sublabel: 'Wij zien geen bekende oplichterstrucjes in dit bericht.',
    color: '#3AAC6E',
    bg: 'rgba(58,172,110,.08)',
    border: 'rgba(58,172,110,.25)',
    dot: '#3AAC6E',
  },
  doubt: {
    label: 'Let op',
    sublabel: 'Wij herkennen een of meer patronen die om voorzichtigheid vragen.',
    color: '#D97B2A',
    bg: 'rgba(217,123,42,.08)',
    border: 'rgba(217,123,42,.25)',
    dot: '#D97B2A',
  },
  phishing: {
    label: 'Meerdere waarschuwingen',
    sublabel: 'Wij herkennen in dit bericht meerdere kenmerken van bekende oplichtingstrucs.',
    color: '#E5532A',
    bg: 'rgba(229,83,42,.08)',
    border: 'rgba(229,83,42,.25)',
    dot: '#E5532A',
  },
}

const severityLabel = {
  info: { color: 'rgba(244,236,219,.55)', prefix: 'Let op:' },
  warn: { color: '#D97B2A', prefix: 'Aandacht:' },
  danger: { color: '#E5532A', prefix: 'Waarschuwing:' },
}

export function VerdictCard({
  verdict,
  onReset,
  dashboard = false,
}: Props & { dashboard?: boolean }) {
  const config = categoryConfig[verdict.category]

  return (
    <section
      style={{
        padding: dashboard ? '0' : 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 3vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Hoofdverdict */}
        <div
          style={{
            background: config.bg,
            border: `1px solid ${config.border}`,
            borderRadius: 18,
            padding: dashboard ? '1.25rem' : '2rem',
            marginBottom: '1rem',
          }}
        >
          {/* Label + score */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1.25rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: '.4rem',
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: config.dot,
                    flexShrink: 0,
                    boxShadow: `0 0 8px ${config.dot}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.75rem',
                    fontWeight: 700,
                    color: config.color,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Onze analyse
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 500,
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  color: '#F4ECDB',
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: '-.02em',
                }}
              >
                {config.label}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.92rem',
                  color: 'rgba(244,236,219,.6)',
                  margin: '.4rem 0 0',
                  lineHeight: 1.5,
                }}
              >
                {config.sublabel}
              </p>
            </div>

            {/* Score */}
            <div
              style={{
                flexShrink: 0,
                textAlign: 'center',
                background: 'rgba(244,236,219,.06)',
                border: '1px solid rgba(244,236,219,.12)',
                borderRadius: 12,
                padding: '.75rem 1.1rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  fontSize: '2rem',
                  lineHeight: 1,
                  color: config.color,
                }}
              >
                {verdict.score}
                <span style={{ fontSize: '1rem', color: 'rgba(244,236,219,.3)' }}>/10</span>
              </div>
              <div
                style={{
                  fontSize: '.65rem',
                  color: 'rgba(244,236,219,.4)',
                  fontFamily: 'var(--font-sans)',
                  marginTop: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '.08em',
                }}
              >
                risico-indicatie
              </div>
            </div>
          </div>

          {/* Score balk */}
          <div
            style={{
              height: 5,
              borderRadius: 9999,
              background: 'rgba(244,236,219,.08)',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                height: '100%',
                borderRadius: 9999,
                width: `${verdict.score * 10}%`,
                background: `linear-gradient(90deg, ${config.dot}88, ${config.dot})`,
                transition: 'width 1.2s cubic-bezier(.16,1,.3,1)',
              }}
            />
          </div>

          {/* Wat wij zien */}
          <div
            style={{
              background: 'rgba(244,236,219,.04)',
              borderRadius: 10,
              padding: '1rem 1.25rem',
            }}
          >
            <div
              style={{
                fontSize: '.72rem',
                fontWeight: 700,
                color: 'rgba(244,236,219,.45)',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
                marginBottom: '.6rem',
              }}
            >
              Wat wij zien
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: 'rgba(244,236,219,.88)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {verdict.summary}
            </p>
          </div>
        </div>

        {/* Gevonden signalen */}
        {verdict.flags.length > 0 && (
          <div
            style={{
              background: 'rgba(244,236,219,.04)',
              border: '1px solid rgba(244,236,219,.12)',
              borderRadius: 14,
              padding: '1.5rem',
              marginBottom: '1.25rem',
            }}
          >
            <div
              style={{
                fontSize: '.72rem',
                fontWeight: 700,
                color: 'rgba(244,236,219,.5)',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
                marginBottom: '1rem',
              }}
            >
              Gevonden signalen
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '.65rem',
              }}
            >
              {verdict.flags.map((flag, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: severityLabel[flag.severity].color,
                      marginTop: 7,
                    }}
                  />
                  <div>
                    <span
                      style={{
                        fontSize: '.72rem',
                        fontWeight: 700,
                        color: severityLabel[flag.severity].color,
                        textTransform: 'uppercase',
                        letterSpacing: '.06em',
                        marginRight: 6,
                      }}
                    >
                      {severityLabel[flag.severity].prefix}
                    </span>
                    <span style={{ fontSize: '.95rem', color: 'rgba(244,236,219,.82)' }}>
                      {flag.label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimer */}
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.1)',
            borderRadius: 12,
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '1rem', flexShrink: 0 }}>ℹ️</span>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.85rem',
              color: 'rgba(244,236,219,.5)',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            <strong style={{ color: 'rgba(244,236,219,.7)' }}>
              Dit is een indicatie, geen garantie.
            </strong>{' '}
            Onze analyse is gebaseerd op bekende patronen en kan nooit volledig uitsluitsel geven.
            Twijfelt u nog? Neem contact op met de Fraudehelpdesk:{' '}
            <strong style={{ color: 'rgba(244,236,219,.7)' }}>088 – 786 87 78</strong>
          </p>
        </div>

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
                background: 'rgba(229,83,42,.07)',
                border: '1px solid rgba(229,83,42,.2)',
                borderRadius: 12,
                padding: '1rem 1.25rem',
                color: '#F4ECDB',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '.95rem',
                transition: 'background .15s',
              }}
            >
              <span>🛡 Meld dit bij de Fraudehelpdesk</span>
              <span style={{ color: 'rgba(244,236,219,.4)' }}>→</span>
            </a>
          )}

          <button
            onClick={onReset}
            style={{
              background: 'rgba(244,236,219,.07)',
              border: '1px solid rgba(244,236,219,.14)',
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
              width: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(244,236,219,.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(244,236,219,.07)'
            }}
          >
            ← Controleer nog een bericht
          </button>
        </div>
      </div>
    </section>
  )
}
