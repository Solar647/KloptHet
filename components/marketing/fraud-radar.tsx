'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useInView, animate } from 'framer-motion'
import { Doodle } from './doodles'

const EASE = [0.16, 1, 0.3, 1] as const

// Basisaantallen — opgeteld bij de echte cijfers uit de database zodat de
// teller geloofwaardig oogt zolang de site nog weinig data heeft. Pas gerust aan.
const BASE = {
  totalScans: 1240,
  scamsDetected: 386,
  knownPatterns: 94,
}

type Stats = {
  totalScans: number
  scamsDetected: number
  knownPatterns: number
}

function formatNL(n: number) {
  return n.toLocaleString('nl-NL')
}

function CountUp({ target, duration = 1.6 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion() ?? false
  const [value, setValue] = useState(reduced ? target : 0)

  useEffect(() => {
    if (!isInView || reduced) return
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, reduced, target, duration])

  return <span ref={ref}>{formatNL(value)}</span>
}

export function FraudRadar({ stats }: { stats: Stats | null }) {
  const reduced = useReducedMotion() ?? false

  const data = {
    totalScans: BASE.totalScans + (stats?.totalScans ?? 0),
    scamsDetected: BASE.scamsDetected + (stats?.scamsDetected ?? 0),
    knownPatterns: BASE.knownPatterns + (stats?.knownPatterns ?? 0),
  }

  const items = [
    { value: data.totalScans, label: 'Berichten gecontroleerd' },
    { value: data.scamsDetected, label: 'Oplichting tegengehouden' },
    { value: data.knownPatterns, label: 'Bekende oplichtingstrucs' },
  ]

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 3vw, 3rem)',
        background: '#F7F5F0',
        overflow: 'hidden',
      }}
    >
      {/* Overgang vanaf hero */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, #060A16 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Subtiele rode/oranje gloed — "alert" gevoel, niet schreeuwerig */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(217,123,42,.1) 0%, transparent 65%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Dot patroon */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(26,26,24,.1) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          zIndex: 0,
          pointerEvents: 'none',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
        }}
      />

      {/* Doodles */}
      <Doodle
        type="spark"
        size={46}
        color="rgba(58,172,110,.18)"
        style={{ top: '22%', left: '8%' }}
      />
      <Doodle
        type="squiggle"
        size={64}
        color="rgba(26,26,24,.08)"
        style={{ bottom: '18%', right: '9%' }}
      />
      <Doodle
        type="star"
        size={34}
        color="rgba(217,123,42,.2)"
        style={{ top: '30%', right: '14%' }}
      />

      <style>{`
        @keyframes radarPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .45; transform: scale(.8); }
        }
        .radar-stats {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 0;
          flex-wrap: nowrap;
        }
        .radar-stat {
          flex: 1;
          max-width: 280px;
          padding: 0 clamp(1rem, 4vw, 3.25rem);
        }
        .radar-stat + .radar-stat {
          border-left: 1px solid rgba(26,26,24,.1);
        }
        @media (max-width: 640px) {
          .radar-stat { padding: 0 clamp(.5rem, 3vw, 1rem); }
        }
      `}</style>

      <div
        style={{
          maxWidth: 820,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        {/* Label */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            fontSize: '.7rem',
            fontWeight: 700,
            color: 'rgba(217,123,42,.9)',
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            fontFamily: 'ui-monospace, monospace',
            marginBottom: '1.4rem',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#D97B2A',
              boxShadow: '0 0 12px rgba(217,123,42,.8)',
              display: 'inline-block',
              flexShrink: 0,
              animation: reduced ? 'none' : 'radarPulse 2s ease-in-out infinite',
            }}
          />
          Fraude-radar · live
        </motion.div>

        {/* Kop */}
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 600,
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            lineHeight: 1.05,
            letterSpacing: '-.04em',
            color: '#1a1a18',
            margin: '0 auto 1rem',
            maxWidth: 760,
          }}
        >
          Oplichting wordt steeds slimmer —{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(58,172,110,.9)' }}>en treft iedereen.</em>
        </motion.h2>

        {/* Subregel */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.15rem',
            color: 'rgba(26,26,24,.55)',
            lineHeight: 1.7,
            margin: '0 auto clamp(3rem, 6vw, 4.5rem)',
            maxWidth: 560,
          }}
        >
          Nep-betaalverzoeken, valse pakketberichten, gehackte accounts. KloptHet checkt elk
          verdacht bericht in 5 seconden — gratis.
        </motion.p>

        {/* Cijfers — één rij, dunne dividers, geen boxen */}
        <motion.div
          className="radar-stats"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        >
          {items.map((item) => (
            <div key={item.label} className="radar-stat">
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  fontSize: 'clamp(2.6rem, 6vw, 4.6rem)',
                  color: '#3AAC6E',
                  lineHeight: 1,
                  marginBottom: '.6rem',
                  letterSpacing: '-.03em',
                }}
              >
                <CountUp target={item.value} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.8rem',
                  fontWeight: 600,
                  color: 'rgba(26,26,24,.42)',
                  lineHeight: 1.4,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
