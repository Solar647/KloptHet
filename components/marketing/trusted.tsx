'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Doodle, PillLabel } from './doodles'

const EASE = [0.16, 1, 0.3, 1] as const

// PLACEHOLDER-quotes — vervang door echte, geverifieerde uitspraken van
// experts/organisaties. Laat ze niet als "echt" overkomen tot ze bevestigd zijn.
const quotes = [
  {
    quote: '[Plek voor een quote van een expert of organisatie over KloptHet.]',
    name: 'Naam',
    role: 'Functie · Organisatie',
  },
  {
    quote: '[Plek voor een aanbeveling van bijvoorbeeld een ouderenbond of bank.]',
    name: 'Naam',
    role: 'Functie · Organisatie',
  },
  {
    quote: '[Plek voor een uitspraak van een veiligheidsexpert of journalist.]',
    name: 'Naam',
    role: 'Functie · Organisatie',
  },
]

export function Trusted() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(6rem, 11vw, 10rem) clamp(1.5rem, 3vw, 3rem)',
        background: '#0d0d0f',
        overflow: 'hidden',
      }}
    >
      {/* Doodles */}
      <Doodle
        type="star"
        size={34}
        color="rgba(58,172,110,.4)"
        style={{ top: '14%', left: '9%' }}
      />
      <Doodle
        type="spark"
        size={36}
        color="rgba(255,255,255,.14)"
        style={{ bottom: '16%', right: '9%' }}
      />

      <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <PillLabel dark>Vertrouwd door</PillLabel>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              lineHeight: 1.04,
              letterSpacing: '-.04em',
              color: '#fff',
              margin: '0 0 1rem',
            }}
          >
            Experts en organisaties{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 500, color: '#3AAC6E' }}>
              over KloptHet.
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
            Wat professionals en partners zeggen over veilig communiceren met KloptHet.
          </p>
        </motion.div>

        {/* Quote-kaarten */}
        <div
          className="grid-responsive"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
            marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
          }}
        >
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              style={{
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.09)',
                borderRadius: 18,
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="rgba(58,172,110,.5)"
                aria-hidden="true"
              >
                <path d="M7 7h4v4l-2 6H6l2-6H7V7Zm8 0h4v4l-2 6h-3l2-6h-1V7Z" />
              </svg>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  color: 'rgba(255,255,255,.82)',
                  lineHeight: 1.5,
                  margin: 0,
                  flex: 1,
                  fontStyle: 'italic',
                }}
              >
                {q.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid rgba(255,255,255,.12)',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '.88rem',
                      color: '#fff',
                    }}
                  >
                    {q.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.76rem',
                      color: 'rgba(255,255,255,.45)',
                    }}
                  >
                    {q.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo-balk (plekken voor organisatie-logo's) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(1rem, 3vw, 2.5rem)',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,.08)',
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 120,
                height: 38,
                borderRadius: 8,
                background: 'rgba(255,255,255,.05)',
                border: '1px dashed rgba(255,255,255,.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans)',
                fontSize: '.68rem',
                color: 'rgba(255,255,255,.3)',
              }}
            >
              logo
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
