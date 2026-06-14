'use client'

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const steps = [
  {
    num: '01',
    title: 'Upload een screenshot',
    body: 'Maak een screenshot van het verdachte bericht op uw telefoon. Of plak de tekst direct — het werkt allebei.',
    side: 'left' as const,
  },
  {
    num: '02',
    title: 'Onze AI bekijkt het',
    body: 'Onze Europese AI analyseert afzender, toon, links en bekende oplichterpatronen — net zoals een expert dat zou doen.',
    side: 'right' as const,
  },
  {
    num: '03',
    title: 'U krijgt een duidelijk antwoord',
    body: 'Veilig, twijfelachtig of oplichting — in gewone taal, met uitleg zodat u het de volgende keer zelf herkent.',
    side: 'left' as const,
  },
]

export function HowItWorks() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      id="hoe-het-werkt"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 3vw, 3rem)',
        background: '#0a0a0c',
        overflow: 'hidden',
      }}
    >
      {/* Subtiele groene gloed */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 600,
          background: 'radial-gradient(ellipse, rgba(31,122,77,.08) 0%, transparent 65%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '.85rem',
                fontWeight: 700,
                color: '#3AAC6E',
              }}
            >
              (02)
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.78rem',
                fontWeight: 700,
                color: 'rgba(255,255,255,.6)',
                letterSpacing: '.04em',
              }}
            >
              Zo werkt het
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              lineHeight: 1,
              letterSpacing: '-.04em',
              color: '#fff',
              margin: '0 0 1rem',
            }}
          >
            Drie stappen.{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 500, color: '#3AAC6E' }}>
              Eén antwoord.
            </span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,.5)',
              lineHeight: 1.7,
              margin: '0 auto',
              maxWidth: 460,
            }}
          >
            Geen app te installeren, geen technische kennis nodig.
          </p>
        </motion.div>

        {/* Proces met kronkellijn */}
        <div style={{ position: 'relative' }}>
          {/* Kronkelende verbindingslijn (desktop) */}
          <svg
            aria-hidden="true"
            className="process-line"
            viewBox="0 0 400 900"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 400,
              height: '100%',
              zIndex: 0,
              pointerEvents: 'none',
              overflow: 'visible',
            }}
          >
            <motion.path
              d="M200 0 C 60 140, 340 280, 200 440 C 60 600, 340 720, 200 900"
              fill="none"
              stroke="#3AAC6E"
              strokeWidth="2"
              strokeDasharray="6 8"
              strokeLinecap="round"
              opacity="0.55"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </svg>

          {/* Stappen */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={reduced ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="process-step"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'clamp(1.5rem, 5vw, 4rem)',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Tekst aan de juiste kant */}
                <div
                  style={{
                    gridColumn: step.side === 'left' ? 1 : 2,
                    gridRow: 1,
                    textAlign: step.side === 'left' ? 'right' : 'left',
                  }}
                  className="process-text"
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: '.6rem',
                      flexDirection: step.side === 'left' ? 'row-reverse' : 'row',
                    }}
                  >
                    <span
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: '50%',
                        background: '#3AAC6E',
                        boxShadow: '0 0 16px rgba(58,172,110,.9)',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '.95rem',
                        fontWeight: 700,
                        color: '#3AAC6E',
                      }}
                    >
                      {step.num}.
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 600,
                      fontSize: 'clamp(1.3rem, 2.4vw, 1.9rem)',
                      color: '#fff',
                      margin: '0 0 .6rem',
                      letterSpacing: '-.02em',
                      lineHeight: 1.15,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.95rem',
                      color: 'rgba(255,255,255,.5)',
                      lineHeight: 1.65,
                      margin: 0,
                      marginLeft: step.side === 'left' ? 'auto' : 0,
                      maxWidth: 360,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-line { display: none; }
          .process-step { grid-template-columns: 1fr !important; }
          .process-text {
            grid-column: 1 !important;
            text-align: left !important;
          }
          .process-text > div { flex-direction: row !important; }
          .process-text p { margin-left: 0 !important; }
        }
      `}</style>
    </section>
  )
}
