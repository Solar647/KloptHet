'use client'

import { useRef, Suspense } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HeroSpline } from './hero-spline'

export function Hero() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        isolation: 'isolate',
      }}
    >
      <Suspense fallback={null}>
        <HeroSpline />
      </Suspense>

      {/* Subtiele overlay voor contrast */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(0,0,0,.0) 0%, rgba(0,0,0,.28) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity, position: 'relative', zIndex: 5, width: '100%' }}
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 clamp(1rem, 3vw, 2rem)',
          }}
        >
          {/* Glazen kaart */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            style={{
              background: 'rgba(0,0,0,.5)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,.1)',
              borderRadius: 28,
              padding: 'clamp(2rem, 4vw, 3.5rem) clamp(2.5rem, 6vw, 5rem)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              textAlign: 'center',
              maxWidth: 720,
              boxShadow: '0 32px 80px rgba(0,0,0,.4)',
            }}
          >
            {/* Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(58,172,110,.12)',
                border: '1px solid rgba(58,172,110,.28)',
                borderRadius: 9999,
                padding: '.4rem .9rem',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#3AAC6E',
                  boxShadow: '0 0 8px #3AAC6E',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.78rem',
                  fontWeight: 600,
                  color: '#3AAC6E',
                  letterSpacing: '.04em',
                }}
              >
                Europese AI · Gemaakt in Nederland
              </span>
            </div>

            {/* Heading */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(2.2rem, 5vw, 5rem)',
                lineHeight: 1.05,
                letterSpacing: '-.035em',
                color: '#fff',
                margin: 0,
              }}
            >
              Twijfelt u over een bericht?
            </h1>

            {/* Subheading in groen */}
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                fontSize: 'clamp(1.3rem, 2.5vw, 2.4rem)',
                lineHeight: 1.2,
                letterSpacing: '-.02em',
                color: '#3AAC6E',
                margin: 0,
              }}
            >
              Wij kijken mee.
            </p>

            {/* Lijn */}
            <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,.15)' }} />

            {/* Subtitle */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(.9rem, 1.1vw, 1rem)',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,.6)',
                maxWidth: 420,
                margin: 0,
              }}
            >
              Upload een screenshot van een verdacht bericht. Binnen 5 seconden weet u of het te
              vertrouwen is — in gewone taal.
            </p>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{ marginTop: '.25rem' }}
            >
              <Link
                href={`/${locale}/#demo`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.6rem',
                  padding: '.95rem 2rem',
                  borderRadius: 9999,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  background: '#fff',
                  color: '#000',
                  boxShadow: '0 8px 32px rgba(0,0,0,.35)',
                }}
              >
                Gratis beginnen
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
