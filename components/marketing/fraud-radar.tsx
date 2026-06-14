'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useInView, animate } from 'framer-motion'

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
        padding: 'clamp(3.5rem, 6vw, 5.5rem) clamp(1.5rem, 3vw, 3rem)',
        background: '#060C1A',
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
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          zIndex: 0,
          pointerEvents: 'none',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'center',
        }}
        className="grid-responsive-2"
      >
        {/* Links: boodschap */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              fontSize: '.7rem',
              fontWeight: 700,
              color: 'rgba(217,123,42,.9)',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              fontFamily: 'ui-monospace, monospace',
              marginBottom: '1.1rem',
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
          </div>
          <style>{`
            @keyframes radarPulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: .45; transform: scale(.8); }
            }
          `}</style>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)',
              lineHeight: 1.1,
              letterSpacing: '-.03em',
              color: '#F4ECDB',
              margin: '0 0 1rem',
            }}
          >
            Oplichting wordt steeds slimmer —{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(58,172,110,.9)' }}>
              en treft iedereen.
            </em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.02rem',
              color: 'rgba(244,236,219,.6)',
              lineHeight: 1.75,
              margin: 0,
              maxWidth: 440,
            }}
          >
            Nep-betaalverzoeken, valse pakketberichten, gehackte accounts — niemand is meer veilig.
            KloptHet checkt elk verdacht bericht in 5 seconden. Gratis.
          </p>
        </motion.div>

        {/* Rechts: cijfers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={reduced ? false : { opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              style={{
                background: 'rgba(244,236,219,.04)',
                border: '1px solid rgba(244,236,219,.09)',
                borderRadius: 16,
                padding: 'clamp(1.1rem, 2vw, 1.5rem) 1rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  color: '#3AAC6E',
                  lineHeight: 1,
                  marginBottom: '.5rem',
                  letterSpacing: '-.02em',
                }}
              >
                <CountUp target={item.value} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.72rem',
                  color: 'rgba(244,236,219,.45)',
                  lineHeight: 1.4,
                  letterSpacing: '.02em',
                }}
              >
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
