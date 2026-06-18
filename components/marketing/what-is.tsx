'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Doodle, PillLabel } from './doodles'

const EASE = [0.16, 1, 0.3, 1] as const

export function WhatIs() {
  const reduced = useReducedMotion() ?? false

  const fade = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: EASE },
  })

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(6rem, 11vw, 10rem) clamp(1.5rem, 3vw, 3rem)',
        background: '#F1EDE4',
        overflow: 'hidden',
      }}
    >
      {/* Dikkere scheidingslijn tussen fraude-radar en deze sectie */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          background: 'linear-gradient(to bottom, rgba(26,26,24,.7) 0%, rgba(26,26,24,.32) 100%)',
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 5,
          background: '#3AAC6E',
          boxShadow: '0 0 16px rgba(58,172,110,.7)',
          borderRadius: '0 0 3px 3px',
          zIndex: 2,
        }}
      />

      {/* Glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-5%',
          right: '0%',
          width: 600,
          height: 500,
          background: 'radial-gradient(ellipse, rgba(30,80,180,.1) 0%, transparent 65%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '4%',
          left: '-6%',
          width: 600,
          height: 520,
          background: 'radial-gradient(ellipse, rgba(58,172,110,.1) 0%, transparent 62%)',
          filter: 'blur(85px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Doodles */}
      <Doodle type="star" size={34} color="rgba(58,172,110,.4)" style={{ top: '8%', left: '6%' }} />
      <Doodle
        type="spark"
        size={36}
        color="rgba(26,26,24,.35)"
        style={{ top: '12%', right: '7%' }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Kop */}
        <motion.div {...fade()} style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', maxWidth: 760 }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <PillLabel>Maak kennis met KloptHet</PillLabel>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 0.96,
              letterSpacing: '-.045em',
              color: '#1a1a18',
              margin: '0 0 1.25rem',
            }}
          >
            Twijfel? Wij weten of het{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 500, color: '#3AAC6E' }}>klopt.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
              color: 'rgba(26,26,24,.6)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 560,
            }}
          >
            Fraude via WhatsApp, sms en e-mail groeit explosief — en iedereen is doelwit. KloptHet
            geeft binnen 5 seconden een duidelijk antwoord, in gewone taal.
          </p>
        </motion.div>

        {/* Bento — bovenste rij: beeld + donkere kaart */}
        <motion.div
          {...fade(0.05)}
          className="bento-top"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          {/* Beeldkaart met statement */}
          <div
            style={{
              position: 'relative',
              minHeight: 320,
              borderRadius: 22,
              overflow: 'hidden',
              border: '1px solid rgba(26,26,24,.1)',
              boxShadow: '0 24px 60px -28px rgba(0,0,0,.4)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(8,10,20,.85) 0%, transparent 55%)',
              }}
            />
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
              <PillLabel dark>Onze missie</PillLabel>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '1.75rem',
                left: '1.75rem',
                right: '1.75rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)',
                lineHeight: 1.1,
                letterSpacing: '-.02em',
                color: '#fff',
              }}
            >
              Veiligheid hoort <span style={{ color: '#5fe0a0' }}>voor iedereen</span> toegankelijk
              te zijn.
            </div>
          </div>

          {/* Donkere kaart */}
          <DarkCard
            tag="Privacy"
            title="Veilig in Europa"
            body="Alles draait volledig binnen Europa. Uw gegevens verlaten de EU nooit en worden nooit doorverkocht."
          />
        </motion.div>

        {/* Bento — onderste rij: 3 kaarten */}
        <motion.div
          {...fade(0.1)}
          className="bento-bottom"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
        >
          <LightCard
            tag="Snelheid"
            title="5 seconden"
            body="Upload een screenshot en u heeft binnen 5 seconden een duidelijk antwoord."
            accent
          />
          <LightCard
            tag="Toegankelijk"
            title="Voor iedereen"
            body="Van student tot senior — iedereen krijgt verdachte berichten. KloptHet helpt ze allemaal."
          />
          <LightCard
            tag="Privacy"
            title="Nooit opgeslagen"
            body="Uw bericht wordt direct na analyse verwijderd. Wij bewaren niets."
          />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bento-top { grid-template-columns: 1fr !important; }
          .bento-bottom { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function DarkCard({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: 320,
        borderRadius: 22,
        padding: '1.75rem',
        background: 'linear-gradient(165deg, #1c1c20 0%, #131316 100%)',
        border: '1px solid rgba(255,255,255,.08)',
        boxShadow: '0 24px 60px -30px rgba(0,0,0,.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-25%',
          right: '-10%',
          width: 260,
          height: 220,
          background: 'radial-gradient(ellipse, rgba(58,172,110,.22) 0%, transparent 65%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PillLabel dark>{tag}</PillLabel>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '.5rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3AAC6E' }} />
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              fontSize: '1.6rem',
              color: '#fff',
              margin: 0,
              letterSpacing: '-.02em',
            }}
          >
            {title}
          </h3>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.92rem',
            color: 'rgba(255,255,255,.55)',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  )
}

function LightCard({
  tag,
  title,
  body,
  accent = false,
}: {
  tag: string
  title: string
  body: string
  accent?: boolean
}) {
  return (
    <div
      style={{
        minHeight: 220,
        borderRadius: 22,
        padding: '1.75rem',
        background: accent ? 'rgba(58,172,110,.1)' : '#ffffff',
        border: accent ? '1px solid rgba(58,172,110,.3)' : '1px solid rgba(26,26,24,.1)',
        boxShadow: '0 16px 40px -24px rgba(0,0,0,.2)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <PillLabel>{tag}</PillLabel>
      <div style={{ flex: 1, minHeight: '1.5rem' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '.5rem' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3AAC6E' }} />
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 600,
            fontSize: '1.5rem',
            color: '#1a1a18',
            margin: 0,
            letterSpacing: '-.02em',
          }}
        >
          {title}
        </h3>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.9rem',
          color: 'rgba(26,26,24,.6)',
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  )
}
