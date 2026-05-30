'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { SearchIcon } from '@/components/shared/icons'

const examples = [
  {
    label: 'Kleinkind-truc',
    message: 'Hoi mama, dit is mijn nieuwe nummer. Kun je me €450 sturen? Het is dringend.',
    verdict: {
      score: 8,
      category: 'phishing' as const,
      label: 'Meerdere waarschuwingen',
      summary:
        'Wij zien in dit bericht een patroon dat sterk lijkt op de zogenaamde "kleinkind-truc". Het valt op dat er om geld wordt gevraagd via een onbekend nieuw nummer, gecombineerd met het woord "dringend" om tijdsdruk te creëren.',
      flags: [
        { label: 'Verzoek om geld via nieuw/onbekend nummer', severity: 'danger' as const },
        { label: 'Tijdsdruk: het woord "dringend"', severity: 'warn' as const },
        { label: 'Geen verificatie van identiteit', severity: 'warn' as const },
      ],
    },
  },
  {
    label: 'Bezorg-fraude',
    message:
      'Uw pakket kan niet worden afgeleverd. Betaal €1,99 herbezorgkosten via: post-nl-betaling.com',
    verdict: {
      score: 9,
      category: 'phishing' as const,
      label: 'Meerdere waarschuwingen',
      summary:
        'In dit bericht valt op dat er een betaalverzoek wordt gedaan via een link die niet van de officiële PostNL-website is. Wij herkennen dit als een patroon dat veel voorkomt bij nep-bezorgberichten.',
      flags: [
        { label: 'Link verwijst niet naar officiële PostNL-website', severity: 'danger' as const },
        { label: 'Onverwacht betaalverzoek voor pakketbezorging', severity: 'danger' as const },
        { label: 'Verdacht domein: post-nl-betaling.com', severity: 'warn' as const },
      ],
    },
  },
  {
    label: 'Bank-imitatie',
    message: 'Uw ING-rekening wordt geblokkeerd. Bevestig uw gegevens direct via: ing-veilig.net',
    verdict: {
      score: 9,
      category: 'phishing' as const,
      label: 'Meerdere waarschuwingen',
      summary:
        'Wij zien hier meerdere kenmerken van een nep-bankbericht. Het valt op dat de link niet naar de echte ING-website gaat, en dat er urgentie wordt gecreëerd met "wordt geblokkeerd".',
      flags: [
        {
          label: 'Echte banken sturen nooit een link om in te loggen via sms',
          severity: 'danger' as const,
        },
        {
          label: 'Nep-domein: ing-veilig.net is geen officiële ING-website',
          severity: 'danger' as const,
        },
        { label: 'Dreiging van blokkade om paniek te veroorzaken', severity: 'warn' as const },
      ],
    },
  },
]

const categoryConfig = {
  phishing: { color: '#E5532A', border: 'rgba(229,83,42,.25)', bg: 'rgba(229,83,42,.08)' },
  doubt: { color: '#D97B2A', border: 'rgba(217,123,42,.25)', bg: 'rgba(217,123,42,.08)' },
  safe: { color: '#3AAC6E', border: 'rgba(58,172,110,.25)', bg: 'rgba(58,172,110,.08)' },
}

const severityLabel = {
  info: { color: 'rgba(244,236,219,.55)', prefix: 'Let op:' },
  warn: { color: '#D97B2A', prefix: 'Aandacht:' },
  danger: { color: '#E5532A', prefix: 'Waarschuwing:' },
}

export function DemoScanner() {
  const locale = useLocale()
  const [selected, setSelected] = useState(0)
  const [showVerdict, setShowVerdict] = useState(false)
  const [loading, setLoading] = useState(false)

  const example = examples[selected]
  const config = categoryConfig[example.verdict.category]

  const handleAnalyze = () => {
    setLoading(true)
    setShowVerdict(false)
    setTimeout(() => {
      setLoading(false)
      setShowVerdict(true)
    }, 1800)
  }

  return (
    <section
      id="demo"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 3vw, 3rem)',
        position: 'relative',
      }}
    >
      {/* Zachte glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(58,172,110,.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              fontSize: '.72rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.6)',
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            Zo werkt het
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-.03em',
              color: '#F4ECDB',
              margin: '0 0 .75rem',
            }}
          >
            Bekijk een voorbeeld.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'rgba(244,236,219,.6)',
              lineHeight: 1.65,
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            Kies een voorbeeldbericht en zie hoe onze analyse werkt.
          </p>
        </div>

        <div
          className="grid-responsive-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
            gap: '1.5rem',
            alignItems: 'start',
          }}
        >
          {/* Links: kies voorbeeld */}
          <div>
            <p
              style={{
                fontSize: '.78rem',
                fontWeight: 600,
                color: 'rgba(244,236,219,.45)',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                marginBottom: '.75rem',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Kies een voorbeeld
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5rem',
                marginBottom: '1.25rem',
              }}
            >
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelected(i)
                    setShowVerdict(false)
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '1rem',
                    background: selected === i ? 'rgba(244,236,219,.1)' : 'rgba(244,236,219,.04)',
                    border: `1px solid ${selected === i ? 'rgba(244,236,219,.25)' : 'rgba(244,236,219,.1)'}`,
                    borderRadius: 12,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    transition: 'all .15s',
                  }}
                >
                  <div
                    style={{
                      fontSize: '.72rem',
                      fontWeight: 700,
                      color: '#E5532A',
                      marginBottom: '.3rem',
                      letterSpacing: '.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {ex.label}
                  </div>
                  <div
                    style={{ fontSize: '.88rem', color: 'rgba(244,236,219,.75)', lineHeight: 1.5 }}
                  >
                    &ldquo;{ex.message.length > 60 ? ex.message.slice(0, 60) + '…' : ex.message}
                    &rdquo;
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                background: '#F4ECDB',
                color: '#07190F',
                border: 'none',
                borderRadius: 12,
                fontSize: '1rem',
                fontWeight: 700,
                cursor: loading ? 'wait' : 'pointer',
                fontFamily: 'var(--font-sans)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                opacity: loading ? 0.7 : 1,
                transition: 'opacity .2s',
              }}
            >
              {loading ? 'Analyseren…' : 'Analyseer dit bericht'}
              {!loading && <span>→</span>}
            </button>
          </div>

          {/* Rechts: resultaat */}
          <div style={{ minHeight: 300 }}>
            {!showVerdict && !loading && (
              <div
                style={{
                  height: '100%',
                  minHeight: 280,
                  background: 'rgba(244,236,219,.03)',
                  border: '1px dashed rgba(244,236,219,.15)',
                  borderRadius: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    color: 'rgba(244,236,219,.3)',
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <SearchIcon size={36} strokeWidth={1.3} />
                </div>
                <p
                  style={{
                    color: 'rgba(244,236,219,.35)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.9rem',
                    margin: 0,
                  }}
                >
                  Kies een voorbeeld en klik op Analyseer
                </p>
              </div>
            )}

            {loading && (
              <div
                style={{
                  height: '100%',
                  minHeight: 280,
                  background: 'rgba(244,236,219,.03)',
                  border: '1px solid rgba(244,236,219,.12)',
                  borderRadius: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '3px solid rgba(244,236,219,.1)',
                    borderTopColor: '#3AAC6E',
                    animation: 'spin 1s linear infinite',
                  }}
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                <p
                  style={{
                    color: 'rgba(244,236,219,.5)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.9rem',
                    margin: 0,
                  }}
                >
                  Wij kijken even mee…
                </p>
              </div>
            )}

            {showVerdict && (
              <div
                style={{
                  background: config.bg,
                  border: `1px solid ${config.border}`,
                  borderRadius: 16,
                  padding: '1.5rem',
                  animation: 'fadeUp .4s cubic-bezier(.16,1,.3,1)',
                }}
              >
                <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }`}</style>

                <div
                  style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}
                >
                  <div
                    style={{ width: 8, height: 8, borderRadius: '50%', background: config.color }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: '#F4ECDB',
                    }}
                  >
                    {example.verdict.label}
                  </span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.5rem',
                      color: config.color,
                      fontWeight: 400,
                    }}
                  >
                    {example.verdict.score}/10
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.9rem',
                    color: 'rgba(244,236,219,.82)',
                    lineHeight: 1.65,
                    marginBottom: '1rem',
                  }}
                >
                  {example.verdict.summary}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
                  {example.verdict.flags.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: severityLabel[f.severity].color,
                          marginTop: 7,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: '.82rem',
                          color: 'rgba(244,236,219,.75)',
                          fontFamily: 'var(--font-sans)',
                          lineHeight: 1.5,
                        }}
                      >
                        <strong style={{ color: severityLabel[f.severity].color }}>
                          {severityLabel[f.severity].prefix}
                        </strong>{' '}
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid rgba(244,236,219,.1)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '.75rem',
                      color: 'rgba(244,236,219,.35)',
                      fontFamily: 'var(--font-sans)',
                      margin: '0 0 .75rem',
                      lineHeight: 1.5,
                    }}
                  >
                    Dit is een demo. Log in om uw eigen bericht te laten analyseren.
                  </p>
                  <Link
                    href={`/${locale}/registreren`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      background: '#3AAC6E',
                      color: '#07190F',
                      padding: '.8rem 1.25rem',
                      borderRadius: 10,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.9rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    Begin nu — analyseer uw eigen bericht →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
