import { Nav } from '@/components/shared/nav'
import { Footer } from '@/components/shared/footer'
import Link from 'next/link'

export const metadata = {
  title: 'Voor wie is KloptHet? — Senioren & Familie',
  description: 'KloptHet beschermt senioren én hun familie tegen WhatsApp- en sms-fraude.',
}

export default async function VoorWiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <>
      <Nav />
      <main id="main" style={{ flex: 1 }}>
        {/* ── HERO ── */}
        <section
          style={{
            padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 3vw, 3rem) clamp(3rem, 6vw, 5rem)',
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
                'radial-gradient(ellipse at center, rgba(58,172,110,.15) 0%, transparent 70%)',
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
              Voor wie
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
              Bescherming voor uzelf.
              <br />
              <span style={{ color: '#3AAC6E' }}>Gemoedsrust voor uw familie.</span>
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.1rem',
                color: 'rgba(244,236,219,.65)',
                lineHeight: 1.75,
                margin: '0 auto',
                maxWidth: 520,
              }}
            >
              KloptHet is gemaakt voor twee groepen: senioren die snel en eenvoudig een bericht
              willen controleren, en familie die van een afstand wil helpen beschermen.
            </p>
          </div>
        </section>

        {/* ── OUDEREN ── */}
        <section
          style={{
            padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 3vw, 3rem)',
            borderTop: '1px solid rgba(244,236,219,.08)',
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(2rem, 5vw, 5rem)',
              alignItems: 'center',
            }}
            className="grid-responsive-2"
          >
            {/* Tekst */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(58,172,110,.1)',
                  border: '1px solid rgba(58,172,110,.25)',
                  borderRadius: 9999,
                  padding: '.35rem .9rem',
                  marginBottom: '1.5rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    fontWeight: 700,
                    color: '#3AAC6E',
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Voor senioren
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-.03em',
                  color: '#F4ECDB',
                  margin: '0 0 1.25rem',
                }}
              >
                Twijfelt u over een bericht? U hoeft het niet alleen uit te zoeken.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'rgba(244,236,219,.65)',
                  lineHeight: 1.75,
                  margin: '0 0 1.5rem',
                }}
              >
                Oplichters worden steeds slimmer. Ze sturen berichten die eruitzien alsof ze van uw
                bank, PostNL of uw eigen kind komen. Het is volkomen begrijpelijk dat u soms
                twijfelt.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'rgba(244,236,219,.65)',
                  lineHeight: 1.75,
                  margin: '0 0 2rem',
                }}
              >
                KloptHet is zo eenvoudig mogelijk gemaakt. Maak een screenshot, upload het, en u
                krijgt binnen 5 seconden in gewone taal te horen wat wij zien — zonder technisch
                jargon, zonder ingewikkelde uitleg.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.85rem',
                  marginBottom: '2rem',
                }}
              >
                {[
                  {
                    title: 'Geen technische kennis nodig',
                    desc: 'Als u een foto kunt maken op uw telefoon, kunt u KloptHet gebruiken.',
                  },
                  {
                    title: 'Antwoord in gewone taal',
                    desc: 'Geen jargon, geen ingewikkelde uitleg. Gewoon: wat zien wij en wat kunt u doen.',
                  },
                  {
                    title: 'Uw privacy is veilig',
                    desc: 'Uw screenshot wordt direct na analyse verwijderd. Wij bewaren niets.',
                  },
                  {
                    title: 'Altijd beschikbaar',
                    desc: 'Dag en nacht, ook in het weekend. Geen wachttijden, geen telefonische wachtrij.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: 'rgba(58,172,110,.15)',
                        border: '1px solid rgba(58,172,110,.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3AAC6E"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '.95rem',
                          color: '#F4ECDB',
                          marginBottom: '.2rem',
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.88rem',
                          color: 'rgba(244,236,219,.55)',
                          lineHeight: 1.6,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/registreren`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#3AAC6E',
                  color: '#07190F',
                  padding: '1rem 1.75rem',
                  borderRadius: 12,
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px -8px rgba(58,172,110,.5)',
                }}
              >
                Probeer het zelf — gratis
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
            </div>

            {/* Voorbeeld kaart */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <ExampleCard
                type="Kleinkind-truc"
                from="Onbekend nummer"
                message="Hoi mama, dit is mijn nieuwe nummer. Ik heb mijn telefoon kapotgemaakt. Kun je me €350 sturen? Het is dringend."
                score={8}
                verdict="Wij zien in dit bericht een patroon dat vaak voorkomt bij de 'kleinkind-truc'. Er wordt om geld gevraagd via een nieuw nummer, gecombineerd met tijdsdruk."
                color="#E5532A"
              />
            </div>
          </div>
        </section>

        {/* ── FAMILIE ── */}
        <section
          style={{
            padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 3vw, 3rem)',
            borderTop: '1px solid rgba(244,236,219,.08)',
            background: 'rgba(244,236,219,.02)',
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(2rem, 5vw, 5rem)',
              alignItems: 'center',
            }}
            className="grid-responsive-2"
          >
            {/* Illustratie links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <FamilyDashboardPreview />
            </div>

            {/* Tekst rechts */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(91,143,232,.1)',
                  border: '1px solid rgba(91,143,232,.25)',
                  borderRadius: 9999,
                  padding: '.35rem .9rem',
                  marginBottom: '1.5rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    fontWeight: 700,
                    color: 'rgba(91,143,232,.9)',
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Voor familie
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-.03em',
                  color: '#F4ECDB',
                  margin: '0 0 1.25rem',
                }}
              >
                Geef uw ouders bescherming. Zonder hen lastig te vallen.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'rgba(244,236,219,.65)',
                  lineHeight: 1.75,
                  margin: '0 0 1.5rem',
                }}
              >
                U werkt, woont niet om de hoek, en kunt niet altijd opnemen als uw ouders bellen met
                een vraag over een verdacht berichtje. Met KloptHet hoeft dat ook niet meer.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'rgba(244,236,219,.65)',
                  lineHeight: 1.75,
                  margin: '0 0 2rem',
                }}
              >
                Met het Familie-abonnement nodigt u uw ouders of andere familieleden uit. U ontvangt
                een melding als iemand een bericht controleert met een hoge risico-indicatie — zodat
                u kunt ingrijpen als dat nodig is.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.85rem',
                  marginBottom: '2rem',
                }}
              >
                {[
                  {
                    title: 'Nodig familieleden uit',
                    desc: 'Tot 5 mensen gebruiken uw abonnement. Zij hoeven zelf niets te betalen.',
                  },
                  {
                    title: 'Melding bij verdacht bericht',
                    desc: 'U ontvangt een bericht als uw ouder een bericht controleert met een hoge risico-indicatie.',
                  },
                  {
                    title: 'Gemak voor uw ouder',
                    desc: 'Uw ouder hoeft geen creditcard in te vullen of abonnement af te sluiten. Gewoon gebruiken.',
                  },
                  {
                    title: 'Cadeau-mogelijkheid',
                    desc: 'Geef KloptHet als cadeau. Verjaardag, kerst, of gewoon omdat u om ze geeft.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: 'rgba(91,143,232,.12)',
                        border: '1px solid rgba(91,143,232,.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(91,143,232,.9)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '.95rem',
                          color: '#F4ECDB',
                          marginBottom: '.2rem',
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.88rem',
                          color: 'rgba(244,236,219,.55)',
                          lineHeight: 1.6,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/abonnement/checkout?tier=family`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(91,143,232,.2)',
                  color: 'rgba(91,143,232,1)',
                  border: '1.5px solid rgba(91,143,232,.4)',
                  padding: '1rem 1.75rem',
                  borderRadius: 12,
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '.95rem',
                  textDecoration: 'none',
                }}
              >
                Bescherm uw familie — €5,99/mnd
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
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          style={{
            padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 3vw, 3rem)',
            borderTop: '1px solid rgba(244,236,219,.08)',
          }}
        >
          <div
            style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}
          >
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
              Veelgestelde vragen
            </h2>
          </div>
          <div
            style={{
              maxWidth: 720,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {[
              {
                q: 'Moet mijn ouder zelf een account aanmaken?',
                a: 'Nee. U maakt een Familie-abonnement aan en nodigt uw ouder uit via e-mail. Zij activeren hun account met één klik en kunnen meteen beginnen.',
              },
              {
                q: 'Wat als mijn ouder niet goed overweg kan met de telefoon?',
                a: 'KloptHet werkt in de browser — geen app installeren nodig. En de bediening is bewust zo simpel mogelijk gehouden: één knop om een foto te uploaden.',
              },
              {
                q: 'Zie ik welke berichten mijn ouder controleert?',
                a: 'Nee, tenzij er een hoge risico-indicatie is. Uw ouder behoudt privacy, u krijgt alleen een melding als er iets verdachts is.',
              },
              {
                q: 'Kan ik opzeggen als het niet bevalt?',
                a: 'Ja, op elk moment zonder kosten. En als u binnen 30 dagen niet tevreden bent, krijgt u uw geld terug.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(244,236,219,.04)',
                  border: '1px solid rgba(244,236,219,.1)',
                  borderRadius: 14,
                  padding: '1.25rem 1.5rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: '#F4ECDB',
                    marginBottom: '.5rem',
                  }}
                >
                  {item.q}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.9rem',
                    color: 'rgba(244,236,219,.65)',
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 3vw, 3rem)',
            borderTop: '1px solid rgba(244,236,219,.08)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 580, margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                lineHeight: 1.05,
                letterSpacing: '-.03em',
                color: '#F4ECDB',
                margin: '0 0 1rem',
              }}
            >
              Klaar om te beginnen?
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
              Voor uzelf of voor uw familie — KloptHet staat klaar.
            </p>
            <div
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Link
                href={`/${locale}/registreren`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#3AAC6E',
                  color: '#07190F',
                  padding: '1rem 1.75rem',
                  borderRadius: 12,
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px -8px rgba(58,172,110,.5)',
                }}
              >
                Voor uzelf — gratis beginnen
              </Link>
              <Link
                href={`/${locale}/abonnement/checkout?tier=family`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'transparent',
                  color: '#F4ECDB',
                  border: '1.5px solid rgba(244,236,219,.2)',
                  padding: '1rem 1.75rem',
                  borderRadius: 12,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '.9rem',
                  textDecoration: 'none',
                }}
              >
                Voor uw familie — €5,99/mnd
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ExampleCard({
  type,
  from,
  message,
  score,
  verdict,
  color,
}: {
  type: string
  from: string
  message: string
  score: number
  verdict: string
  color: string
}) {
  return (
    <div
      style={{
        background: 'rgba(244,236,219,.04)',
        border: `1px solid ${color}30`,
        borderRadius: 18,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid rgba(244,236,219,.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '.88rem',
              color: '#F4ECDB',
            }}
          >
            {from}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.72rem',
              color: 'rgba(244,236,219,.4)',
              marginTop: 2,
            }}
          >
            WhatsApp
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.65rem',
            fontWeight: 700,
            color,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            padding: '.2rem .6rem',
            borderRadius: 9999,
            letterSpacing: '.06em',
            textTransform: 'uppercase',
          }}
        >
          {type}
        </div>
      </div>
      <div style={{ padding: '1.1rem 1.25rem' }}>
        <div
          style={{
            background: 'rgba(244,236,219,.07)',
            border: '1px solid rgba(244,236,219,.09)',
            borderRadius: '4px 12px 12px 12px',
            padding: '.75rem .9rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '.88rem',
            color: 'rgba(244,236,219,.82)',
            lineHeight: 1.6,
            marginBottom: '1rem',
          }}
        >
          &ldquo;{message}&rdquo;
        </div>
        <div
          style={{
            background: `${color}12`,
            border: `1px solid ${color}25`,
            borderRadius: 10,
            padding: '.85rem 1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '.5rem' }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: color,
                boxShadow: `0 0 6px ${color}`,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '.72rem',
                color,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
              }}
            >
              Meerdere waarschuwingen · {score}/10
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.85rem',
              color: 'rgba(244,236,219,.75)',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {verdict}
          </p>
        </div>
      </div>
    </div>
  )
}

function FamilyDashboardPreview() {
  const members = [
    { name: 'U (eigenaar)', email: 'u@...', initial: 'U', active: true },
    { name: 'Moeder', email: 'truus@...', initial: 'T', active: true },
    { name: 'Vader', email: 'jan@...', initial: 'J', active: false },
  ]
  return (
    <div
      style={{
        background: 'rgba(244,236,219,.04)',
        border: '1px solid rgba(244,236,219,.1)',
        borderRadius: 18,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '.9rem 1.25rem',
          borderBottom: '1px solid rgba(244,236,219,.08)',
          fontFamily: 'var(--font-sans)',
          fontSize: '.78rem',
          fontWeight: 700,
          color: 'rgba(244,236,219,.4)',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
        }}
      >
        Familie-dashboard
      </div>
      {members.map((m, i) => (
        <div
          key={i}
          style={{
            padding: '.85rem 1.25rem',
            borderBottom: i < members.length - 1 ? '1px solid rgba(244,236,219,.06)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: m.active ? 'rgba(58,172,110,.2)' : 'rgba(244,236,219,.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '.85rem',
                color: m.active ? '#3AAC6E' : 'rgba(244,236,219,.4)',
              }}
            >
              {m.initial}
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.88rem',
                  fontWeight: 600,
                  color: '#F4ECDB',
                }}
              >
                {m.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.72rem',
                  color: 'rgba(244,236,219,.35)',
                }}
              >
                {m.email}
              </div>
            </div>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.65rem',
              fontWeight: 700,
              color: m.active ? '#3AAC6E' : 'rgba(244,236,219,.35)',
              background: m.active ? 'rgba(58,172,110,.1)' : 'rgba(244,236,219,.05)',
              padding: '.2rem .6rem',
              borderRadius: 9999,
              letterSpacing: '.04em',
              textTransform: 'uppercase',
            }}
          >
            {m.active ? 'Actief' : 'Uitgenodigd'}
          </span>
        </div>
      ))}
      <div
        style={{
          padding: '1rem 1.25rem',
          background: 'rgba(58,172,110,.05)',
          borderTop: '1px solid rgba(58,172,110,.12)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.75rem',
            fontWeight: 700,
            color: '#3AAC6E',
            marginBottom: '.3rem',
          }}
        >
          Recente melding
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.82rem',
            color: 'rgba(244,236,219,.65)',
          }}
        >
          Truus heeft een bericht gecontroleerd — risico-indicatie 8/10
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.72rem',
            color: 'rgba(244,236,219,.3)',
            marginTop: 2,
          }}
        >
          Vandaag 14:23
        </div>
      </div>
    </div>
  )
}
