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

  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -120])
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: 'linear-gradient(135deg, #05080F 0%, #080F1E 40%, #0A1028 70%, #060A16 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        isolation: 'isolate',
      }}
    >
      {/* Spline achtergrond */}
      <Suspense fallback={null}>
        <HeroSpline />
      </Suspense>

      {/* Gradient fade naar de lichte sectie eronder */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '28%',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(10,16,30,0.6) 55%, #F1EDE4 100%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity, position: 'relative', zIndex: 5, width: '100%' }}
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <div
            style={{
              textAlign: 'center',
              padding: 'clamp(3rem, 8vh, 6rem) clamp(1.5rem, 3vw, 3rem) clamp(2rem, 6vh, 4rem)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            }}
          >
            <style>{`
              .hero-heading {
                font-size: clamp(2.6rem, 5.2vw, 6.2rem) !important;
              }
              @media (max-height: 850px) {
                .hero-heading { font-size: clamp(2.2rem, 4.2vw, 4.8rem) !important; }
              }
              @media (max-height: 700px) {
                .hero-heading { font-size: clamp(2rem, 3.6vw, 4.1rem) !important; }
              }
            `}</style>
            {/* Liquid glass pill */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <div
                className="liquid-glass"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  borderRadius: 10,
                  padding: '.45rem 1rem',
                }}
              >
                <span
                  style={{
                    background: '#3AAC6E',
                    color: '#000',
                    borderRadius: 6,
                    padding: '.18rem .6rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '.75rem',
                  }}
                >
                  Nieuw
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.88rem',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,.55)',
                  }}
                >
                  Controleer elk verdacht bericht in 5 seconden
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="hero-heading"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } },
              }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(2.6rem, 5.2vw, 6.2rem)',
                lineHeight: 1.08,
                letterSpacing: '-.04em',
                color: '#fff',
                margin: 0,
                maxWidth: '14ch',
              }}
            >
              Twijfelt u over een bericht?{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  color: '#fff',
                  textShadow: '0 2px 8px rgba(0,0,0,.8)',
                }}
              >
                Wij kijken mee.
              </em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
              }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.05rem, 1.35vw, 1.2rem)',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,.55)',
                maxWidth: 500,
                margin: 0,
              }}
            >
              Upload een screenshot van een verdacht bericht. Binnen 5 seconden weet u of het te
              vertrouwen is — in gewone taal.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
              }}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/${locale}/registreren`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.6rem',
                    padding: '1.1rem 2.2rem',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '1.08rem',
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #fff 0%, #d4f0e0 100%)',
                    color: '#000',
                    boxShadow: '0 0 30px rgba(58,172,110,.35), 0 8px 24px rgba(0,0,0,.3)',
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
      </motion.div>
    </section>
  )
}
