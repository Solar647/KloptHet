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
      {/* Kleur glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: 550,
          height: 550,
          background: 'radial-gradient(circle, rgba(20,200,150,.22) 0%, transparent 55%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(140,60,230,.2) 0%, transparent 55%)',
          filter: 'blur(80px)',
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
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.14) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
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
          {/* Links: tekst — elk element staggered */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={
              reduced
                ? {}
                : {
                    hidden: {},
                    show: { transition: { staggerChildren: 0.12 } },
                  }
            }
          >
            <motion.div
              variants={
                reduced
                  ? {}
                  : {
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                    }
              }
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
                marginBottom: '1.5rem',
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
              Wat is KloptHet?
            </motion.div>

            <motion.h2
              variants={
                reduced
                  ? {}
                  : {
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
                    }
              }
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
            </motion.h2>

            <motion.p
              variants={
                reduced
                  ? {}
                  : {
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }
              }
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.15rem',
                fontWeight: 500,
                color: 'rgba(244,236,219,.85)',
                lineHeight: 1.75,
                margin: '0 0 1rem',
                maxWidth: 480,
              }}
            >
              Fraude via WhatsApp, sms en e-mail groeit explosief — en senioren zijn het vaakst het
              doelwit.
            </motion.p>

            <motion.p
              variants={
                reduced
                  ? {}
                  : {
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }
              }
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                color: 'rgba(244,236,219,.55)',
                lineHeight: 1.8,
                margin: 0,
                maxWidth: 480,
              }}
            >
              KloptHet analyseert elk verdacht bericht in seconden en geeft een duidelijk antwoord
              in gewone taal. Geen app te installeren, geen technische kennis nodig — gewoon een
              screenshot uploaden.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={
                reduced
                  ? {}
                  : {
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }
              }
              style={{
                display: 'flex',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                marginTop: '2.75rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(244,236,219,.08)',
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: '5s', label: 'Analyse tijd' },
                { value: '99%', label: 'Nauwkeurigheid' },
                { value: '0', label: 'Data bewaard' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    paddingLeft: i > 0 ? 'clamp(1.5rem, 3vw, 2.5rem)' : 0,
                    borderLeft: i > 0 ? '1px solid rgba(244,236,219,.08)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 500,
                      fontSize: '2.1rem',
                      color: '#3AAC6E',
                      lineHeight: 1,
                      marginBottom: '.3rem',
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
            </motion.div>
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
                initial={reduced ? false : { opacity: 0, y: 60, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: EASE }}
                whileHover={
                  reduced
                    ? {}
                    : {
                        y: -4,
                        borderColor: 'rgba(58,172,110,.3)',
                        boxShadow: '0 12px 32px rgba(0,0,0,.25)',
                        transition: { duration: 0.2 },
                      }
                }
                style={{
                  position: 'relative',
                  background: 'rgba(244,236,219,.04)',
                  border: '1px solid rgba(244,236,219,.08)',
                  borderRadius: 16,
                  padding: '1.4rem 1.25rem',
                  cursor: 'default',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '1.1rem',
                    right: '1.1rem',
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '.7rem',
                    fontWeight: 700,
                    color: 'rgba(244,236,219,.18)',
                    letterSpacing: '.05em',
                  }}
                >
                  0{i + 1}
                </span>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 13,
                    background: 'rgba(58,172,110,.12)',
                    border: '1px solid rgba(58,172,110,.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3AAC6E',
                    marginBottom: '.9rem',
                    marginLeft: '.5rem',
                  }}
                >
                  {p.icon}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '.95rem',
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
                    fontSize: '.82rem',
                    color: 'rgba(244,236,219,.5)',
                    lineHeight: 1.65,
                    margin: 0,
                    maxWidth: '90%',
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
