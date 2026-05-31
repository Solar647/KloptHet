import { Nav } from '@/components/shared/nav'
import { Footer } from '@/components/shared/footer'

export const metadata = {
  title: 'Over ons — KloptHet',
  description:
    'KloptHet is een Nederlands bedrijf dat ouderen en hun familie beschermt tegen WhatsApp- en sms-fraude.',
}

export default async function OverOnsPage({ params }: { params: Promise<{ locale: string }> }) {
  await params

  return (
    <>
      <Nav />
      <main id="main" style={{ flex: 1 }}>
        {/* Hero */}
        <section
          style={{
            padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 3vw, 3rem) clamp(3rem, 6vw, 5rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '60%',
              background:
                'radial-gradient(ellipse at center, rgba(58,172,110,.12) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '.72rem',
                fontWeight: 700,
                color: 'rgba(244,236,219,.5)',
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Over ons
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-.03em',
                color: '#F4ECDB',
                margin: '0 0 1.25rem',
              }}
            >
              Wij geloven dat iedereen het recht heeft om veilig te communiceren.
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.1rem',
                color: 'rgba(244,236,219,.65)',
                lineHeight: 1.75,
                margin: 0,
                maxWidth: 560,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              KloptHet is een Nederlands bedrijf met één missie: ouderen en hun familie beschermen
              tegen de groeiende stroom van WhatsApp- en sms-fraude.
            </p>
          </div>
        </section>

        {/* Missie */}
        <section
          style={{
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 3vw, 3rem)',
            borderTop: '1px solid rgba(244,236,219,.08)',
          }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(2rem, 5vw, 5rem)',
              alignItems: 'center',
            }}
            className="grid-responsive-2"
          >
            <div>
              <div
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '.72rem',
                  fontWeight: 700,
                  color: 'rgba(244,236,219,.5)',
                  letterSpacing: '.22em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                Waarom KloptHet
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-.03em',
                  color: '#F4ECDB',
                  margin: '0 0 1.25rem',
                }}
              >
                Het echte probleem is twijfel.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'rgba(244,236,219,.65)',
                  lineHeight: 1.75,
                  margin: '0 0 1rem',
                }}
              >
                Mensen weten vaak wel dát iets niet klopt — maar ze weten niet wát er niet klopt.
                Die twijfel kost tijd, energie en soms veel geld.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'rgba(244,236,219,.65)',
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                KloptHet lost die twijfel op in 5 seconden. Geen ingewikkelde uitleg, geen technisch
                jargon — gewoon een eerlijk antwoord in gewone taal.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { n: '2026', label: 'Opgericht in Nederland' },
                { n: 'EU', label: 'Alle data blijft in Europa' },
                { n: '55+', label: 'Primaire doelgroep' },
                { n: '< 5s', label: 'Gemiddelde analysetijd' },
              ].map((s) => (
                <div
                  key={s.n}
                  style={{
                    background: 'rgba(244,236,219,.04)',
                    border: '1px solid rgba(244,236,219,.1)',
                    borderRadius: 14,
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      fontSize: '1.6rem',
                      color: '#3AAC6E',
                      minWidth: 60,
                    }}
                  >
                    {s.n}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.9rem',
                      color: 'rgba(244,236,219,.7)',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waarden */}
        <section
          style={{
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 3vw, 3rem)',
            borderTop: '1px solid rgba(244,236,219,.08)',
            background: 'rgba(244,236,219,.02)',
          }}
        >
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '.72rem',
                  fontWeight: 700,
                  color: 'rgba(244,236,219,.5)',
                  letterSpacing: '.22em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                Waar wij voor staan
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-.03em',
                  color: '#F4ECDB',
                  margin: 0,
                }}
              >
                Onze waarden
              </h2>
            </div>
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}
              className="grid-responsive"
            >
              {[
                {
                  icon: '🇳🇱',
                  title: 'Europees & Privacyvriendelijk',
                  desc: 'Alle data blijft in de EU. Geen tracking, geen advertenties. Uw gegevens zijn van u.',
                },
                {
                  icon: '💬',
                  title: 'Gewone taal',
                  desc: 'Geen jargon, geen technische uitleg. Wij spreken de taal van de mensen die wij helpen.',
                },
                {
                  icon: '🤝',
                  title: 'Familie centraal',
                  desc: 'Bescherming is geen soloactiviteit. Wij bouwen voor de hele familie, niet voor één persoon.',
                },
              ].map((v) => (
                <div
                  key={v.title}
                  style={{
                    background: 'rgba(244,236,219,.04)',
                    border: '1px solid rgba(244,236,219,.1)',
                    borderRadius: 16,
                    padding: '1.75rem',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '.75rem' }}>{v.icon}</div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: '#F4ECDB',
                      margin: '0 0 .6rem',
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.88rem',
                      color: 'rgba(244,236,219,.6)',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section
          style={{
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 3vw, 3rem)',
            borderTop: '1px solid rgba(244,236,219,.08)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-.03em',
                color: '#F4ECDB',
                margin: '0 0 1rem',
              }}
            >
              Vragen of samenwerken?
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: 'rgba(244,236,219,.6)',
                lineHeight: 1.75,
                margin: '0 0 2rem',
              }}
            >
              Neem contact op via{' '}
              <a
                href="mailto:info@klopthet.nl"
                style={{ color: '#3AAC6E', textDecoration: 'none' }}
              >
                info@klopthet.nl
              </a>{' '}
              — wij reageren binnen één werkdag.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
