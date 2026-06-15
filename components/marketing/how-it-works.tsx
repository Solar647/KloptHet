'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Doodle } from './doodles'

const EASE = [0.16, 1, 0.3, 1] as const

const steps: {
  num: string
  title: string
  body: string
  side: 'left' | 'right'
  photo?: string
}[] = [
  {
    num: '01',
    title: 'Upload een screenshot',
    body: 'Maak een foto of screenshot van het verdachte bericht — WhatsApp, sms, e-mail of een website. Of plak gewoon de tekst. Beide werken net zo goed.',
    side: 'left' as const,
  },
  {
    num: '02',
    title: 'Het wordt gescreend',
    body: 'Uw bericht wordt direct getoetst aan duizenden bekende oplichtingspatronen, data en ervaringen — precies zoals een ervaren expert dat zou doen, maar in seconden.',
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
        background: '#F1EDE4',
        overflow: 'hidden',
      }}
    >
      {/* Heel subtiel grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(26,26,24,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,24,.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 78% 70% at 50% 45%, black 25%, transparent 82%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 78% 70% at 50% 45%, black 25%, transparent 82%)',
        }}
      />

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
          background: 'radial-gradient(ellipse, rgba(31,122,77,.1) 0%, transparent 65%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '-6%',
          width: 620,
          height: 540,
          background: 'radial-gradient(ellipse, rgba(30,80,180,.08) 0%, transparent 62%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Doodles */}
      <Doodle
        type="zigzag"
        size={42}
        color="rgba(58,172,110,.42)"
        style={{ top: '15%', right: '11%' }}
      />
      <Doodle type="note" size={32} color="rgba(26,26,24,.4)" style={{ top: '46%', left: '6%' }} />
      <Doodle
        type="spiral"
        size={46}
        color="rgba(26,26,24,.38)"
        style={{ bottom: '12%', right: '9%' }}
      />
      <Doodle
        type="spark"
        size={30}
        color="rgba(58,172,110,.4)"
        style={{ bottom: '30%', left: '9%' }}
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
                color: 'rgba(26,26,24,.6)',
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
              color: '#1a1a18',
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
              color: 'rgba(26,26,24,.5)',
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
          {/* Kronkelende verbindingslijn (desktop) — non-scaling-stroke houdt 'm strak */}
          <svg
            aria-hidden="true"
            className="process-line"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              pointerEvents: 'none',
              overflow: 'visible',
            }}
          >
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3AAC6E" stopOpacity="0.15" />
                <stop offset="8%" stopColor="#3AAC6E" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#3AAC6E" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <path
              d="M500 6
                 C 440 110, 440 240, 500 340
                 C 560 440, 560 560, 500 660
                 C 440 760, 440 890, 500 994"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeDasharray="1 11"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Start-node + label */}
          <div
            className="process-start"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '.8rem',
              marginBottom: 'clamp(2rem, 5vw, 3.5rem)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <span className="process-start-dot">
              <span className="process-start-core" />
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.15rem',
                color: '#3AAC6E',
              }}
            >
              het proces.
            </span>
          </div>

          {/* Stappen */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(3rem, 9vw, 8rem)',
            }}
          >
            {steps.map((step) => {
              const textCol = (
                <div
                  className="process-text"
                  style={{ textAlign: step.side === 'left' ? 'left' : 'right' }}
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
                      color: '#1a1a18',
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
                      color: 'rgba(26,26,24,.55)',
                      lineHeight: 1.7,
                      margin: 0,
                      marginLeft: step.side === 'left' ? 0 : 'auto',
                      maxWidth: 380,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              )

              const photoCol = (
                <div
                  className="process-photo"
                  style={{
                    aspectRatio: '4 / 3',
                    borderRadius: 18,
                    overflow: 'hidden',
                    border: '1px solid rgba(26,26,24,.12)',
                    boxShadow: '0 24px 60px -28px rgba(0,0,0,.35)',
                    background: 'linear-gradient(155deg, #e9e4d8 0%, #d6d0c2 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    color: 'rgba(26,26,24,.32)',
                  }}
                >
                  {step.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={step.photo}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <>
                      <svg
                        width="34"
                        height="34"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
                        <circle cx="12" cy="13" r="3.5" />
                      </svg>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.78rem',
                          fontWeight: 600,
                        }}
                      >
                        Foto volgt
                      </span>
                    </>
                  )}
                </div>
              )

              return (
                <motion.div
                  key={step.num}
                  initial={reduced ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                  className="process-step"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'clamp(2rem, 6vw, 4.5rem)',
                    alignItems: 'center',
                  }}
                >
                  {/* Groot ghost-nummer als achtergrond-watermerk */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      [step.side === 'left' ? 'right' : 'left']: '2%',
                      transform: 'translateY(-50%)',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      fontSize: 'clamp(7rem, 16vw, 15rem)',
                      lineHeight: 1,
                      color: 'rgba(26,26,24,.045)',
                      zIndex: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    {step.num}
                  </span>

                  {step.side === 'left' ? (
                    <>
                      {textCol}
                      {photoCol}
                    </>
                  ) : (
                    <>
                      {photoCol}
                      {textCol}
                    </>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Ruimte zodat de lijn netjes onder stap 03 kan eindigen */}
          <div style={{ height: 'clamp(3rem, 7vw, 6rem)' }} />

          {/* Schone eind-node */}
          <div
            className="process-end"
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#3AAC6E',
                boxShadow: '0 0 18px rgba(58,172,110,.9)',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .process-start-dot {
          position: relative;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(58,172,110,.2);
        }
        .process-start-dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(58,172,110,.6);
          animation: processPing 2s ease-out infinite;
        }
        .process-start-core {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #3AAC6E;
          box-shadow: 0 0 14px rgba(58,172,110,.9);
        }
        @keyframes processPing {
          0% { transform: scale(1); opacity: .8; }
          80%, 100% { transform: scale(2.4); opacity: 0; }
        }
        @media (max-width: 768px) {
          .process-line { display: none; }
          .process-step { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
          .process-photo { order: -1; }
          .process-text { text-align: left !important; }
          .process-text > div { flex-direction: row !important; }
          .process-text p { margin-left: 0 !important; max-width: none !important; }
        }
      `}</style>
    </section>
  )
}
