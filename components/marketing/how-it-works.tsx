'use client'

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const steps = [
  {
    num: '01',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Upload een screenshot',
    body: 'Maak een screenshot van het verdachte bericht op uw telefoon. Of plak de tekst direct — het werkt allebei.',
    tag: 'Stap 1',
  },
  {
    num: '02',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    title: 'Onze AI bekijkt het',
    body: 'Onze Europese AI analyseert afzender, toon, links en bekende oplichterpatronen — net zoals een expert dat zou doen.',
    tag: 'Stap 2',
  },
  {
    num: '03',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'U krijgt een duidelijk antwoord',
    body: 'Veilig, twijfelachtig of oplichting — in gewone taal, met uitleg zodat u het de volgende keer zelf herkent.',
    tag: 'Stap 3',
  },
]

export function HowItWorks() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      id="hoe-het-werkt"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 3vw, 3rem)',
        background: 'linear-gradient(180deg, #04080F 0%, #060A14 40%, #08101E 70%, #091020 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Vloeiende overgang vanaf vorige sectie */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, #060C1A 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid patroon */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(244,236,219,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244,236,219,.04) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '40%',
          background: 'radial-gradient(ellipse, rgba(30,80,180,.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', maxWidth: 560 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: '.7rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.4)',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              fontFamily: 'ui-monospace, monospace',
              marginBottom: '1.25rem',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#3AAC6E',
                boxShadow: '0 0 12px rgba(58,172,110,.7)',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            Hoe het werkt
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
              lineHeight: 1.06,
              letterSpacing: '-.04em',
              color: '#F4ECDB',
              margin: '0 0 1rem',
            }}
          >
            Drie stappen.{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(58,172,110,.9)' }}>
              Één duidelijk antwoord.
            </em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'rgba(244,236,219,.55)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Geen app te installeren, geen technische kennis nodig.
          </p>
        </motion.div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}
          className="grid-responsive"
        >
          {steps.map((step, i) => {
            const origins = [
              { x: -40, y: 20 },
              { x: 0, y: 50 },
              { x: 40, y: 20 },
            ]
            const origin = origins[i] || { x: 0, y: 32 }
            return (
              <motion.div
                key={step.num}
                initial={reduced ? false : { opacity: 0, x: origin.x, y: origin.y, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                whileHover={reduced ? {} : { y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
                style={{
                  background: 'rgba(244,236,219,.04)',
                  border: '1px solid rgba(244,236,219,.1)',
                  borderRadius: 20,
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
              >
                {/* Subtiele achtergrond glow per kaart */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: -40,
                    right: -40,
                    width: 140,
                    height: 140,
                    background: 'radial-gradient(circle, rgba(30,80,180,.06) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Stap nummer + icoon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: 'rgba(30,80,180,.1)',
                      border: '1px solid rgba(30,80,180,.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(100,160,255,.85)',
                      flexShrink: 0,
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '.65rem',
                      fontWeight: 700,
                      color: 'rgba(244,236,219,.2)',
                      letterSpacing: '.12em',
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Tekst */}
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                      color: '#F4ECDB',
                      margin: '0 0 .6rem',
                      lineHeight: 1.25,
                      letterSpacing: '-.01em',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.92rem',
                      color: 'rgba(244,236,219,.58)',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {step.body}
                  </p>
                </div>

                {/* Stap label onderaan */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    fontWeight: 700,
                    color: 'rgba(58,172,110,.7)',
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#3AAC6E',
                      flexShrink: 0,
                    }}
                  />
                  {step.tag}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
