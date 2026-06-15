'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Doodle } from './doodles'

const EASE = [0.16, 1, 0.3, 1] as const

const points = [
  {
    title: 'Veilig in Europa',
    body: 'Alles draait volledig binnen Europa. Uw gegevens verlaten de EU nooit.',
  },
  {
    title: '5 seconden',
    body: 'Upload een screenshot en u heeft binnen 5 seconden een duidelijk antwoord.',
  },
  {
    title: 'Voor iedereen',
    body: 'Van student tot senior — iedereen krijgt verdachte berichten. KloptHet helpt ze allemaal.',
  },
  {
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
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 3vw, 3rem)',
        background: '#F1EDE4',
        overflow: 'hidden',
      }}
    >
      {/* Heel subtiele blauwe gloed */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-5%',
          right: '0%',
          width: 600,
          height: 500,
          background: 'radial-gradient(ellipse, rgba(30,80,180,.08) 0%, transparent 65%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Subtiel donker diepte-accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-8%',
          left: '-5%',
          width: 520,
          height: 460,
          background: 'radial-gradient(ellipse, rgba(26,26,24,.06) 0%, transparent 62%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Doodles */}
      <Doodle
        type="star"
        size={34}
        color="rgba(58,172,110,.45)"
        style={{ top: '11%', left: '7%' }}
      />
      <Doodle
        type="spark"
        size={40}
        color="rgba(26,26,24,.4)"
        style={{ top: '16%', right: '6%' }}
      />
      <Doodle
        type="heart"
        size={30}
        color="rgba(58,172,110,.4)"
        style={{ bottom: '16%', right: '5%' }}
      />
      <Doodle
        type="lightning"
        size={34}
        color="rgba(26,26,24,.4)"
        style={{ bottom: '12%', left: '6%' }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
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
            (01)
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
            Maak kennis met KloptHet
          </span>
        </motion.div>

        {/* Groot kopwerk */}
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            lineHeight: 0.98,
            letterSpacing: '-.045em',
            color: '#1a1a18',
            textAlign: 'center',
            margin: '0 0 1rem',
          }}
        >
          Twijfel? Wij weten
          <br />
          of het klopt.
        </motion.h2>

        {/* Italic subkop */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
            color: 'rgba(26,26,24,.55)',
            textAlign: 'center',
            margin: '0 auto clamp(3rem, 6vw, 5rem)',
            maxWidth: 560,
            lineHeight: 1.4,
          }}
        >
          Uw persoonlijke fraudedetective — in gewone taal.
        </motion.p>

        {/* Onderste blok: visueel paneel + tekst */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'center',
          }}
          className="grid-responsive-2"
        >
          {/* Visueel paneel met overlappende statement */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 3',
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(26,26,24,.12)',
                boxShadow: '0 24px 60px -20px rgba(0,0,0,.6)',
              }}
            >
              {/* Afbeelding vult het hele glas */}
              <img
                src="/wat-is-paneel.png"
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* glanzende veeg */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(115deg, transparent 35%, rgba(255,255,255,.1) 50%, transparent 62%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
            {/* Overlappende vette statement */}
            <div
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                left: '-0.5rem',
                right: '2rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(1.2rem, 2.4vw, 2rem)',
                lineHeight: 1.1,
                letterSpacing: '-.02em',
                color: '#fff',
                textShadow: '0 2px 20px rgba(0,0,0,.8)',
              }}
            >
              Veiligheid hoort <span style={{ color: '#5fe0a0' }}>voor iedereen</span> toegankelijk
              te zijn.
            </div>
          </motion.div>

          {/* Tekst */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                color: 'rgba(26,26,24,.7)',
                lineHeight: 1.75,
                margin: '0 0 1.25rem',
              }}
            >
              Fraude via WhatsApp, sms en e-mail groeit explosief — en iedereen is doelwit. KloptHet
              analyseert elk verdacht bericht in seconden en geeft een duidelijk antwoord.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                color: 'rgba(26,26,24,.45)',
                lineHeight: 1.75,
                margin: '0 0 2rem',
              }}
            >
              Geen app te installeren. Geen technische kennis nodig. Gewoon een screenshot uploaden
              — en binnen 5 seconden weet u of het te vertrouwen is.
            </p>

            {/* 4 punten */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem 2rem',
                borderTop: '1px solid rgba(26,26,24,.1)',
                paddingTop: '2rem',
              }}
            >
              {points.map((p, i) => (
                <div key={p.title} style={{ display: 'flex', gap: 12 }}>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '.72rem',
                      fontWeight: 700,
                      color: '#3AAC6E',
                      flexShrink: 0,
                      paddingTop: 3,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 700,
                        fontSize: '.92rem',
                        color: '#1a1a18',
                        marginBottom: '.3rem',
                      }}
                    >
                      {p.title}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.8rem',
                        color: 'rgba(26,26,24,.45)',
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
