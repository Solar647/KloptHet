'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function SplineButton() {
  const locale = useLocale()
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-30, 30], [12, -12])
  const rotateY = useTransform(x, [-60, 60], [-12, 12])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800, display: 'inline-block' }}
    >
      <Link href={`/${locale}/#demo`} style={{ textDecoration: 'none', display: 'block' }}>
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Gradient border */}
          <div
            style={{
              padding: 1.5,
              borderRadius: 18,
              background:
                'linear-gradient(135deg, rgba(255,255,255,.5) 0%, rgba(58,172,110,.6) 45%, rgba(255,255,255,.2) 100%)',
              boxShadow: '0 0 40px rgba(58,172,110,.25), 0 20px 40px rgba(0,0,0,.4)',
            }}
          >
            <div
              style={{
                borderRadius: 17,
                padding: '1rem 1.75rem',
                background: 'linear-gradient(160deg, #0d1f12 0%, #0a1a0e 60%, #061008 100%)',
                display: 'flex',
                alignItems: 'center',
                gap: '.85rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glasmorfisme glans */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,.06), transparent)',
                  borderRadius: '17px 17px 0 0',
                  pointerEvents: 'none',
                }}
              />

              {/* 3D Bol icoon */}
              <motion.div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 35% 35%, #6ee7a0 0%, #3AAC6E 40%, #1a5c38 100%)',
                  boxShadow: '0 4px 16px rgba(58,172,110,.5), inset 0 2px 4px rgba(255,255,255,.3)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                animate={{
                  boxShadow: [
                    '0 4px 16px rgba(58,172,110,.4), inset 0 2px 4px rgba(255,255,255,.25)',
                    '0 4px 24px rgba(58,172,110,.7), inset 0 2px 4px rgba(255,255,255,.35)',
                    '0 4px 16px rgba(58,172,110,.4), inset 0 2px 4px rgba(255,255,255,.25)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,.9)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.div>

              {/* Tekst */}
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'rgba(244,236,219,.95)',
                  letterSpacing: '-.01em',
                  textShadow: '0 1px 8px rgba(58,172,110,.3)',
                }}
              >
                Gratis beginnen
              </span>

              {/* Rechts: pulserende dot */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#3AAC6E',
                  boxShadow: '0 0 10px #3AAC6E',
                  marginLeft: 'auto',
                }}
              />
            </div>
          </div>

          {/* Diepte schaduw */}
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: 'absolute',
              bottom: -12,
              left: '15%',
              right: '15%',
              height: 20,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(58,172,110,.45) 0%, transparent 70%)',
              filter: 'blur(6px)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </Link>
    </div>
  )
}
