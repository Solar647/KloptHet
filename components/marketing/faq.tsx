'use client'

import { useState } from 'react'
import { Doodle, PillLabel } from './doodles'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hoe lang duurt een controle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gemiddeld 5 seconden. U uploadt een screenshot, wij analyseren het en u heeft direct een antwoord.',
      },
    },
    {
      '@type': 'Question',
      name: 'Heb ik technische kennis nodig?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nee. Als u een foto kunt maken op uw telefoon, kunt u KloptHet gebruiken.',
      },
    },
    {
      '@type': 'Question',
      name: 'Bewaren jullie mijn berichten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nee. Uw screenshot wordt direct na de analyse verwijderd — binnen 5 minuten. Wij bewaren niets en delen niets met derden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Werkt het ook voor WhatsApp-berichten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. WhatsApp, sms, e-mail — maak een screenshot en upload het. Of plak de tekst van het bericht direct in het invoervak.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kan ik het voor mijn ouders instellen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, dat is precies waar ons Familie-abonnement voor gemaakt is. U beheert het account, uw ouders gebruiken het.',
      },
    },
  ],
}

const items = [
  {
    q: 'Hoe lang duurt een controle?',
    a: 'Gemiddeld 5 seconden. U uploadt een screenshot, wij analyseren het en u heeft direct een antwoord.',
  },
  {
    q: 'Heb ik technische kennis nodig?',
    a: 'Nee. Als u een foto kunt maken op uw telefoon, kunt u KloptHet gebruiken. Lukt het niet? Bel ons — een echte medewerker helpt u.',
  },
  {
    q: 'Bewaren jullie mijn berichten?',
    a: 'Nee. Uw screenshot wordt direct na de analyse verwijderd — binnen 5 minuten. Wij bewaren niets en delen niets met derden.',
  },
  {
    q: 'Werkt het ook voor WhatsApp-berichten?',
    a: 'Ja. WhatsApp, sms, e-mail — maak een screenshot en upload het. Of plak de tekst van het bericht direct in het invoervak.',
  },
  {
    q: 'Wat als het toch een keer fout gaat?',
    a: 'De analyse is zeer nauwkeurig, maar niet onfeilbaar. Twijfelt u nog? Neem contact op via onze hulplijn en een medewerker kijkt persoonlijk mee.',
  },
  {
    q: 'Kan ik het voor mijn ouders instellen?',
    a: 'Ja, dat is precies waar ons Familie-abonnement voor gemaakt is. U beheert het account, uw ouders gebruiken het. U ontvangt een melding als zij een verdacht bericht scannen.',
  },
]

export function FAQ() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQContent />
    </>
  )
}

function FAQContent() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(6rem, 11vw, 10rem) clamp(1.5rem, 3vw, 3rem)',
        background: '#F1EDE4',
        overflow: 'hidden',
      }}
    >
      {/* Spotlight achter de titel */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'clamp(3rem, 7vw, 6rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 820,
          height: 420,
          background: 'radial-gradient(ellipse, rgba(30,80,180,.08) 0%, transparent 68%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Doodles */}
      <Doodle
        type="spark"
        size={34}
        color="rgba(58,172,110,.42)"
        style={{ top: '16%', left: '11%' }}
      />
      <Doodle
        type="refresh"
        size={32}
        color="rgba(26,26,24,.4)"
        style={{ bottom: '16%', right: '10%' }}
      />
      <Doodle
        type="waves"
        size={38}
        color="rgba(26,26,24,.38)"
        style={{ top: '40%', right: '8%' }}
      />

      <div style={{ maxWidth: 880, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <PillLabel>Veelgestelde vragen</PillLabel>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              lineHeight: 1,
              letterSpacing: '-.04em',
              color: '#1a1a18',
              margin: 0,
            }}
          >
            Vragen?{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 500, color: '#3AAC6E' }}>Logisch.</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                style={{
                  borderTop: '1px solid rgba(26,26,24,.16)',
                  borderBottom: i === items.length - 1 ? '1px solid rgba(26,26,24,.16)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '1.4rem 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    fontFamily: 'inherit',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 500,
                      fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)',
                      color: '#1a1a18',
                      letterSpacing: '-.02em',
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    style={{
                      color: '#3AAC6E',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                      transition: 'transform .25s',
                      fontSize: '1.4rem',
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 200 : 0,
                    overflow: 'hidden',
                    transition: 'max-height .3s ease, opacity .3s',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1rem',
                      color: 'rgba(26,26,24,.7)',
                      lineHeight: 1.7,
                      paddingBottom: '1.4rem',
                      maxWidth: 680,
                      margin: 0,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
