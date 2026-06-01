'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Upload, ShieldCheck } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

function UploadVisual({ reduced }: { reduced: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        height: 200,
        borderRadius: 16,
        background: 'rgba(244,236,219,.04)',
        border: '1px dashed rgba(58,172,110,.35)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '0.8rem',
      }}
    >
      <motion.div
        animate={reduced ? {} : { y: [4, -7, 4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 62,
          height: 62,
          borderRadius: 14,
          background: 'rgba(58,172,110,.1)',
          border: '1px solid rgba(58,172,110,.28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#3AAC6E',
          boxShadow: '0 8px 24px rgba(58,172,110,.12)',
        }}
      >
        <Upload size={26} strokeWidth={1.5} />
      </motion.div>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.78rem',
          color: 'rgba(244,236,219,.38)',
          letterSpacing: '.01em',
        }}
      >
        Screenshot of tekst
      </span>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 130,
          height: 130,
          background: 'radial-gradient(circle, rgba(58,172,110,.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

function ScanVisual({ reduced }: { reduced: boolean }) {
  return (
    <div
      style={{
        height: 200,
        borderRadius: 16,
        background: 'rgba(244,236,219,.04)',
        border: '1px solid rgba(244,236,219,.1)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          background: 'rgba(244,236,219,.06)',
          borderRadius: 10,
          padding: '.65rem .9rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '.75rem',
          color: 'rgba(244,236,219,.5)',
          lineHeight: 1.5,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        &ldquo;Uw pakket wacht op bezorging. Klik hier...&rdquo;
        <motion.div
          animate={reduced ? {} : { top: ['-2px', '110%', '-2px'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '-2px',
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(58,172,110,.8), transparent)',
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {[0, 0.25, 0.5].map((delay, i) => (
          <motion.div
            key={i}
            animate={reduced ? {} : { opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.1, repeat: Infinity, delay, ease: 'easeInOut' }}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#3AAC6E',
              flexShrink: 0,
            }}
          />
        ))}
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.75rem',
            color: 'rgba(244,236,219,.4)',
            marginLeft: 4,
          }}
        >
          AI analyseert...
        </span>
      </div>
    </div>
  )
}

function ResultVisual({ reduced }: { reduced: boolean }) {
  return (
    <div
      style={{
        height: 200,
        borderRadius: 16,
        background: 'rgba(58,172,110,.06)',
        border: '1px solid rgba(58,172,110,.22)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={reduced ? false : { scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: 'spring', duration: 0.55, bounce: 0.25, delay: 0.12 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          background: 'rgba(58,172,110,.16)',
          border: '1px solid rgba(58,172,110,.38)',
          borderRadius: 9999,
          padding: '.32rem .85rem',
          alignSelf: 'flex-start',
        }}
      >
        <ShieldCheck size={14} strokeWidth={2.5} color="#3AAC6E" />
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '.78rem',
            color: '#3AAC6E',
            letterSpacing: '.04em',
          }}
        >
          VEILIG BERICHT
        </span>
      </motion.div>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.82rem',
          color: 'rgba(244,236,219,.55)',
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        Dit lijkt een legitiem bericht van een bekende bezorgdienst. Let op het officiële
        afzenderadres.
      </p>
    </div>
  )
}

const steps = [
  {
    num: '1',
    title: 'Upload een screenshot',
    body: 'Maak een screenshot van het verdachte bericht op uw telefoon. Of plak de tekst direct in het invoervak — het werkt allebei.',
    Visual: UploadVisual,
  },
  {
    num: '2',
    title: 'Onze AI bekijkt het bericht',
    body: 'Onze Europese AI analyseert afzender, toon, links en bekende oplichterstrategieën, net zoals een ervaren expert dat zou doen.',
    Visual: ScanVisual,
  },
  {
    num: '3',
    title: 'U krijgt een duidelijk antwoord',
    body: 'Veilig, twijfelachtig of oplichting — in gewone taal, met uitleg zodat u het de volgende keer zelf herkent.',
    Visual: ResultVisual,
  },
]

function AsteriskIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 100 100" aria-hidden="true">
      <g fill="currentColor">
        {[0, 60, 120].map((a) => (
          <rect
            key={a}
            x="44"
            y="6"
            width="12"
            height="88"
            rx="3"
            transform={`rotate(${a} 50 50)`}
          />
        ))}
      </g>
    </svg>
  )
}

export function HowItWorks() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      id="hoe-het-werkt"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 3vw, 3rem)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #04080F 0%, #060A14 40%, #08101E 70%, #091020 100%)',
      }}
    >
      <style>{`
        .hiw-step {
          display: grid;
          grid-template-columns: 42px 1fr 1fr;
          gap: 0 clamp(1.5rem, 3.5vw, 3.5rem);
          align-items: start;
        }
        @media (max-width: 768px) {
          .hiw-step { grid-template-columns: 1fr; gap: 1.25rem 0; }
          .hiw-timeline { display: none !important; }
          .hiw-line-desktop { display: none !important; }
        }
      `}</style>

      {/* Ambient glow — verbinding met hero */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 320,
          background:
            'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(58,172,110,.07) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: EASE }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '.7rem',
              fontWeight: 700,
              color: 'rgba(58,172,110,.85)',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              fontFamily: 'ui-monospace, monospace',
              marginBottom: '1.25rem',
            }}
          >
            <AsteriskIcon />
            Hoe het werkt
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.06,
              letterSpacing: '-.04em',
              color: '#F4ECDB',
              margin: '0 0 1.1rem',
              maxWidth: '20ch',
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
              fontSize: 'clamp(.95rem, 1.15vw, 1.05rem)',
              color: 'rgba(244,236,219,.58)',
              lineHeight: 1.72,
              margin: 0,
              maxWidth: 420,
            }}
          >
            Geen app te installeren, geen technische kennis nodig. In drie simpele stappen weet u of
            een bericht te vertrouwen is.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Verbindingslijn — alleen desktop */}
          <div
            className="hiw-line-desktop"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 21,
              top: 46,
              bottom: 46,
              width: 1,
              background:
                'linear-gradient(180deg, rgba(58,172,110,.45) 0%, rgba(58,172,110,.18) 70%, rgba(58,172,110,.04) 100%)',
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="hiw-step"
              initial={reduced ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              style={{
                marginBottom: i < steps.length - 1 ? 'clamp(3rem, 6vw, 5rem)' : 0,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Timeline cirkel */}
              <div
                className="hiw-timeline"
                style={{ display: 'flex', justifyContent: 'center', paddingTop: 4 }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: 'rgba(58,172,110,.1)',
                    border: '1px solid rgba(58,172,110,.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(58,172,110,.12)',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#3AAC6E',
                    }}
                  >
                    {step.num}
                  </span>
                </div>
              </div>

              {/* Tekst */}
              <div style={{ paddingTop: 6 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                    color: '#F4ECDB',
                    margin: '0 0 .8rem',
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(.95rem, 1.1vw, 1.05rem)',
                    color: 'rgba(244,236,219,.62)',
                    lineHeight: 1.72,
                    margin: 0,
                  }}
                >
                  {step.body}
                </p>
              </div>

              {/* Visuele preview */}
              <step.Visual reduced={reduced} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
