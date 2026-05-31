'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function SplineButton() {
  const locale = useLocale()

  return (
    <motion.div
      style={{ perspective: 600, display: 'inline-block' }}
      whileHover="hover"
      whileTap="tap"
      initial="idle"
    >
      <Link href={`/${locale}/#demo`} style={{ textDecoration: 'none', display: 'block' }}>
        <motion.div
          variants={{
            idle: { rotateX: 0, rotateY: 0, scale: 1 },
            hover: { rotateX: -8, rotateY: 6, scale: 1.05 },
            tap: { scale: 0.96 },
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            position: 'relative',
            borderRadius: 14,
            padding: '1px',
            background:
              'linear-gradient(135deg, rgba(255,255,255,.35) 0%, rgba(58,172,110,.5) 50%, rgba(255,255,255,.15) 100%)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Knop achtergrond */}
          <motion.div
            variants={{
              idle: { background: 'linear-gradient(135deg, #0a1f0e 0%, #0e2a14 100%)' },
              hover: { background: 'linear-gradient(135deg, #0d2812 0%, #144220 100%)' },
            }}
            style={{
              borderRadius: 13,
              padding: '1rem 1.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '.75rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Shine effect */}
            <motion.div
              variants={{
                idle: { x: '-100%', opacity: 0 },
                hover: { x: '200%', opacity: 0.15 },
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '60%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, white, transparent)',
                pointerEvents: 'none',
              }}
            />

            {/* Icoon */}
            <motion.div
              variants={{
                idle: { rotateY: 0, z: 0 },
                hover: { rotateY: 15, z: 20 },
              }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #3AAC6E 0%, #2a8a55 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(58,172,110,.4)',
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
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
                color: '#F4ECDB',
                letterSpacing: '-.01em',
              }}
            >
              Gratis beginnen
            </span>

            {/* Glow dot */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#3AAC6E',
                boxShadow: '0 0 8px #3AAC6E',
                marginLeft: 2,
              }}
            />
          </motion.div>

          {/* Onderkant 3D schaduw */}
          <motion.div
            variants={{
              idle: { opacity: 0.3, scaleX: 0.9 },
              hover: { opacity: 0.5, scaleX: 1 },
            }}
            style={{
              position: 'absolute',
              bottom: -8,
              left: '10%',
              right: '10%',
              height: 16,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(58,172,110,.5) 0%, transparent 70%)',
              filter: 'blur(4px)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
