'use client'

const reviews = [
  {
    name: 'Anneke V.',
    age: 67,
    text: 'Mijn dochter had me een link gestuurd, maar ik vertrouwde het niet. KloptHet zei meteen: phishing. Precies goed!',
  },
  {
    name: 'Gerard B.',
    age: 72,
    text: "Ik krijg zo veel rare sms'jes. Nu check ik ze altijd even. Geeft me rust.",
  },
  {
    name: 'Marianne de W.',
    age: 64,
    text: 'Mijn moeder van 81 gebruikt het zelf. Ze stuurt me nu de resultaten door. Geweldig.',
  },
  {
    name: 'Henk O.',
    age: 69,
    text: 'Dacht dat het van mijn bank was. KloptHet zag meteen dat het nep was. Mijn geld is veilig gebleven.',
  },
  {
    name: 'Lien P.',
    age: 58,
    text: 'Eindelijk een app die mijn vader ook snapt. Geen ingewikkelde termen, gewoon duidelijk.',
  },
  {
    name: 'Wim S.',
    age: 74,
    text: 'Had bijna op een link geklikt van "PostNL". KloptHet gaf alarm. Goed dat ik even checkte.',
  },
  {
    name: 'Truus K.',
    age: 71,
    text: 'Mijn zoon heeft het voor mij ingesteld. Nu doe ik het zelf. Super makkelijk.',
  },
  {
    name: 'Frans N.',
    age: 66,
    text: 'Werkelijk elke verdachte mail die ik ontvang gooi ik er nu in. Altijd een duidelijk antwoord.',
  },
]

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div
      style={{
        background: 'rgba(244,236,219,.04)',
        border: '1px solid rgba(244,236,219,.09)',
        borderRadius: 16,
        padding: '1.25rem 1.5rem',
        minWidth: 280,
        maxWidth: 300,
        flexShrink: 0,
      }}
    >
      {/* Sterren */}
      <div style={{ display: 'flex', gap: 3, marginBottom: '.75rem' }}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#D97B2A" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.88rem',
          color: 'rgba(244,236,219,.78)',
          lineHeight: 1.65,
          margin: '0 0 1rem',
          fontStyle: 'italic',
        }}
      >
        &ldquo;{review.text}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'rgba(30,80,180,.2)',
            border: '1px solid rgba(30,80,180,.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '.78rem',
            color: 'rgba(100,160,255,.8)',
            flexShrink: 0,
          }}
        >
          {review.name.charAt(0)}
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.8rem',
              fontWeight: 600,
              color: '#F4ECDB',
            }}
          >
            {review.name}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.7rem',
              color: 'rgba(244,236,219,.35)',
            }}
          >
            {review.age} jaar
          </div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const doubled = [...reviews, ...reviews]

  return (
    <section
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) 0',
        background: '#091020',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div
        style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 clamp(1.5rem, 3vw, 3rem)' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '.72rem',
            fontWeight: 700,
            color: 'rgba(244,236,219,.4)',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            fontFamily: 'ui-monospace, monospace',
            marginBottom: '1rem',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#D97B2A" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Wat gebruikers zeggen
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            lineHeight: 1.08,
            letterSpacing: '-.04em',
            color: '#F4ECDB',
            margin: '0 0 .75rem',
          }}
        >
          Het hielp ons echt.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: 'rgba(244,236,219,.5)',
            maxWidth: 420,
            margin: '0 auto',
            lineHeight: 1.65,
          }}
        >
          Duizenden Nederlanders controleren dagelijks hun berichten met KloptHet.
        </p>
      </div>

      {/* Marquee */}
      <div
        style={{
          position: 'relative',
        }}
      >
        {/* Fade randen */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: 'linear-gradient(90deg, #091020 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: 'linear-gradient(270deg, #091020 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Scrollende rij */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '.5rem 0 1rem',
            animation: 'marquee 35s linear infinite',
            width: 'max-content',
          }}
        >
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
