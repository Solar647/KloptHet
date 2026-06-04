'use client'

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const pillars = [
  {
    icon: (
      <svg
        width="22"
        height="22"
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
    title: 'Europese AI',
    body: 'Onze AI draait volledig in Europa. Uw gegevens verlaten de EU nooit.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: '5 seconden',
    body: 'Upload een screenshot en u heeft binnen 5 seconden een duidelijk antwoord.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Voor families',
    body: 'Uw ouders gebruiken het zelf. U kunt meekijken als mantelzorger.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Nooit opgeslagen',
    body: 'Uw bericht wordt direct na analyse verwijderd. Wij bewaren niets.',
  },
]

export function WhatIs() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 3vw, 3rem)',
        background: '#060C1A',
        overflow: 'hidden',
      }}
    >
      {/* Kleur glows — links teal, rechts paars */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(20,200,150,.35) 0%, transparent 55%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(140,60,230,.35) 0%, transparent 55%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Grid dot patroon */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          zIndex: 1,
          pointerEvents: 'none',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'center',
          }}
          className="grid-responsive-2"
        >
          {/* Links: tekst */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '.7rem',
                fontWeight: 700,
                color: 'rgba(244,236,219,.4)',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                fontFamily: 'ui-monospace, monospace',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 1,
                  background: 'currentColor',
                  display: 'inline-block',
                }}
              />
              Wat is KloptHet?
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
                lineHeight: 1.06,
                letterSpacing: '-.04em',
                color: '#F4ECDB',
                margin: '0 0 1.5rem',
              }}
            >
              Uw persoonlijke{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(58,172,110,.9)' }}>
                fraude&shy;detective.
              </em>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                color: 'rgba(244,236,219,.62)',
                lineHeight: 1.8,
                margin: '0 0 1.5rem',
                maxWidth: 480,
              }}
            >
              Fraude via WhatsApp, sms en e-mail groeit explosief — en ouderen zijn het vaakst het
              doelwit. KloptHet analyseert elk verdacht bericht in seconden en geeft een duidelijk
              antwoord in gewone taal.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                color: 'rgba(244,236,219,.62)',
                lineHeight: 1.8,
                margin: 0,
                maxWidth: 480,
              }}
            >
              Geen app te installeren. Geen technische kennis nodig. Gewoon een screenshot uploaden
              — en binnen 5 seconden weet u of het te vertrouwen is.
            </p>

            {/* Stats */}
            <div
              style={{
                display: 'flex',
                gap: '2.5rem',
                marginTop: '2.5rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: '5s', label: 'Analyse tijd' },
                { value: '99%', label: 'Nauwkeurigheid' },
                { value: '0', label: 'Data bewaard' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 500,
                      fontSize: '2rem',
                      color: '#3AAC6E',
                      lineHeight: 1,
                      marginBottom: '.25rem',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.75rem',
                      color: 'rgba(244,236,219,.4)',
                      textTransform: 'uppercase',
                      letterSpacing: '.08em',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Rechts: 4 pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}
          >
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                style={{
                  background: 'rgba(244,236,219,.04)',
                  border: '1px solid rgba(244,236,219,.08)',
                  borderRadius: 16,
                  padding: '1.25rem',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(30,80,180,.12)',
                    border: '1px solid rgba(30,80,180,.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(100,160,255,.85)',
                    marginBottom: '.9rem',
                  }}
                >
                  {p.icon}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '.9rem',
                    color: '#F4ECDB',
                    marginBottom: '.4rem',
                    letterSpacing: '-.01em',
                  }}
                >
                  {p.title}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.8rem',
                    color: 'rgba(244,236,219,.5)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
