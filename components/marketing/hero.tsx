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
        alignItems: 'center',
        justifyContent: 'center',
        isolation: 'isolate',
      }}
    >
      <Suspense fallback={null}>
        <HeroSpline />
      </Suspense>

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
            textAlign: 'center',
            padding: '0 clamp(1.5rem, 4vw, 4rem)',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
          }}
        >
          {/* Pill */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(58,172,110,.15)',
                border: '1px solid rgba(58,172,110,.3)',
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
                }}
              >
                Europese AI · Gemaakt in Nederland
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } },
            }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 7vw, 7.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-.04em',
              color: '#fff',
              margin: 0,
              textShadow: '0 2px 20px rgba(0,0,0,.8)',
            }}
          >
            Twijfelt u over een bericht?
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 } },
            }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              fontSize: 'clamp(1.8rem, 4vw, 4rem)',
              lineHeight: 1.1,
              letterSpacing: '-.02em',
              color: '#3AAC6E',
              margin: 0,
              textShadow: '0 2px 20px rgba(0,0,0,.8), 0 0 40px rgba(58,172,110,.3)',
            }}
          >
            Wij kijken mee.
          </motion.p>

          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25 } },
            }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,.75)',
              maxWidth: 460,
              margin: 0,
              textShadow: '0 1px 12px rgba(0,0,0,.9)',
            }}
          >
            Upload een screenshot van een verdacht bericht. Binnen 5 seconden weet u of het te
            vertrouwen is — in gewone taal.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.35 } },
            }}
            style={{ marginTop: '.5rem' }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={`/${locale}/#demo`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.6rem',
                  padding: '1rem 2.25rem',
                  borderRadius: 9999,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  textDecoration: 'none',
                  background: '#fff',
                  color: '#000',
                  boxShadow: '0 8px 32px rgba(0,0,0,.4)',
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
