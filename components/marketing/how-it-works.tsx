'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Doodle } from './doodles'

const EASE = [0.16, 1, 0.3, 1] as const

const steps = [
  {
    num: '01',
    title: 'Upload een screenshot',
    body: 'Maak een foto of screenshot van het verdachte bericht — WhatsApp, sms, e-mail of een website. Of plak gewoon de tekst. Beide werken net zo goed.',
    side: 'left' as const,
  },
  {
    num: '02',
    title: 'Onze AI bekijkt het',
    body: 'Onze Europese AI ontleedt de afzender, de toon, de links en bekende oplichterspatronen — precies zoals een ervaren expert dat zou doen, maar in seconden.',
    side: 'right' as const,
  },
  {
    num: '03',
    title: 'U krijgt een duidelijk antwoord',
    body: 'Veilig, twijfelachtig of oplichting — in gewone taal, met uitleg erbij zodat u het de volgende keer zélf herkent. Geen jargon, geen twijfel.',
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
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 700,
          background: 'radial-gradient(ellipse, rgba(31,122,77,.07) 0%, transparent 65%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Doodles */}
      <Doodle
        type="arrow"
        size={56}
        color="rgba(58,172,110,.16)"
        style={{ top: '16%', right: '12%' }}
      />
      <Doodle
        type="asterisk"
        size={30}
        color="rgba(255,255,255,.08)"
        style={{ top: '44%', left: '7%' }}
      />
      <Doodle
        type="spiral"
        size={46}
        color="rgba(255,255,255,.07)"
        style={{ bottom: '12%', right: '10%' }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
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
              maxWidth: 480,
            }}
          >
            Geen app te installeren, geen technische kennis nodig. Van screenshot tot zekerheid in
            vijf seconden.
          </p>
        </motion.div>

        {/* Proces met kronkellijn */}
        <div style={{ position: 'relative' }}>
          {/* Kronkelende verbindingslijn (desktop) */}
          <svg
            aria-hidden="true"
            className="process-line"
            viewBox="0 0 1200 1080"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              pointerEvents: 'none',
              overflow: 'visible',
            }}
          >
            <motion.path
              d="M600 20
                 C 980 120, 1120 240, 980 360
                 C 820 500, 180 460, 200 620
                 C 215 760, 1050 740, 980 880
                 C 930 980, 500 1000, 600 1080"
              fill="none"
              stroke="#3AAC6E"
              strokeWidth="2.5"
              strokeDasharray="2 10"
              strokeLinecap="round"
              opacity="0.6"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 2.4, ease: 'easeInOut' }}
            />
          </svg>

          {/* Start-label */}
          <div
            className="process-start"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: '#3AAC6E',
              textAlign: 'center',
              marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            het proces.
          </div>

          {/* Stappen */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(3rem, 9vw, 8rem)',
            }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.num}
                initial={reduced ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="process-step"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  justifyContent: step.side === 'left' ? 'flex-start' : 'flex-end',
                }}
              >
                <div
                  className="process-text"
                  style={{
                    maxWidth: 380,
                    textAlign: step.side === 'left' ? 'left' : 'right',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: '.7rem',
                      flexDirection: step.side === 'left' ? 'row' : 'row-reverse',
                    }}
                  >
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: '#3AAC6E',
                        boxShadow: '0 0 18px rgba(58,172,110,.9)',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '1.05rem',
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
                      fontSize: 'clamp(1.4rem, 2.6vw, 2.1rem)',
                      color: '#fff',
                      margin: '0 0 .7rem',
                      letterSpacing: '-.02em',
                      lineHeight: 1.12,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.98rem',
                      color: 'rgba(255,255,255,.55)',
                      lineHeight: 1.7,
                      margin: 0,
                      marginLeft: step.side === 'left' ? 0 : 'auto',
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
          .process-start { text-align: left !important; }
          .process-step { justify-content: flex-start !important; }
          .process-text { text-align: left !important; }
          .process-text > div { flex-direction: row !important; }
          .process-text p { margin-left: 0 !important; }
        }
      `}</style>
    </section>
  )
}
