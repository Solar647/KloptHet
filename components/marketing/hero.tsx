'use client'

import { useRef } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Hero() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: tekst beweegt omhoog en fades
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -180])
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])

  // Parallax: SVG illustratie beweegt langzamer
  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, -220])

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
  })

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #040E07 0%, #071510 40%, #0A1E0E 70%, #050E07 100%)',
        isolation: 'isolate',
      }}
    >
      {/* Gradient glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '60vw',
          height: '60vw',
          maxWidth: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(27,71,49,.65) 0%, transparent 68%)',
          filter: 'blur(90px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '-8%',
          width: '45vw',
          height: '45vw',
          maxWidth: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,172,110,.12) 0%, transparent 65%)',
          filter: 'blur(70px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(rgba(58,172,110,.06) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(58,172,110,.06) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '50px 50px',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 100% at 50% 50%, black 0%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 0%, transparent 80%)',
        }}
      />

      {/* Decoratieve ringen */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '5%',
          right: '-12%',
          width: 'clamp(280px, 52vw, 620px)',
          height: 'clamp(280px, 52vw, 620px)',
          borderRadius: '50%',
          border: '1px solid rgba(58,172,110,.1)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Grain */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.04,
          mixBlendMode: 'screen',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* Stickers (desktop) */}
      <div
        className="hero-top-strip-extras hero-sticker-1"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: 'clamp(1.5rem, 5vw, 6rem)',
          background: '#3AAC6E',
          borderRadius: 9999,
          padding: '.55rem 1.1rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: 'clamp(.65rem, .85vw, .8rem)',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: '#05110A',
          zIndex: 5,
          boxShadow: '0 6px 20px rgba(58,172,110,.35)',
          whiteSpace: 'nowrap',
        }}
      >
        Kleinkind-truc
      </div>
      <div
        className="hero-top-strip-extras hero-sticker-2"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '14%',
          right: 'clamp(2rem, 17vw, 21rem)',
          border: '2px solid rgba(244,236,219,.35)',
          borderRadius: 8,
          padding: '.45rem .85rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: 'clamp(.6rem, .75vw, .72rem)',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: 'rgba(244,236,219,.6)',
          zIndex: 5,
          whiteSpace: 'nowrap',
          background: 'rgba(244,236,219,.04)',
        }}
      >
        Bank-imitatie
      </div>
      <div
        className="hero-top-strip-extras hero-sticker-3"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '24%',
          left: 'clamp(1.5rem, 5vw, 6rem)',
          border: '2px solid rgba(229,83,42,.45)',
          borderRadius: 9999,
          padding: '.45rem 1rem',
          fontFamily: 'ui-monospace, monospace',
          fontWeight: 700,
          fontSize: 'clamp(.58rem, .7vw, .65rem)',
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: 'rgba(229,83,42,.85)',
          zIndex: 5,
          whiteSpace: 'nowrap',
          background: 'rgba(229,83,42,.06)',
        }}
      >
        ⚠ Bezorg-fraude
      </div>

      {/* Phone mockup (desktop) */}
      <div
        className="hero-top-strip-extras hero-phone"
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(2rem, 7vw, 7rem)',
          zIndex: 6,
          pointerEvents: 'none',
        }}
      >
        <PhoneMockup />
      </div>

      {/* NAV */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: 'clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.5rem, 4vw, 4rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '1.05rem',
            color: '#F4ECDB',
            letterSpacing: '-.02em',
          }}
        >
          KloptHet
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            fontFamily: 'ui-monospace, monospace',
            fontSize: '.6rem',
            color: 'rgba(244,236,219,.3)',
            letterSpacing: '.16em',
            textTransform: 'uppercase',
          }}
        >
          <span
            className="hero-live-dot"
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#3AAC6E' }}
          />
          Live · NL · 2026
        </div>
      </div>

      {/* HOOFD CONTENT — parallax */}
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
          position: 'relative',
          zIndex: 5,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            padding: '0 clamp(1.5rem, 4vw, 4rem) clamp(3rem, 6vw, 5rem)',
            position: 'relative',
            zIndex: 5,
          }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            {/* Liquid glass pill */}
            <motion.div variants={fadeUp(0)} style={{ alignSelf: 'flex-start' }}>
              <div
                className="liquid-glass"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  borderRadius: 10,
                  padding: '.4rem .9rem',
                }}
              >
                <span
                  style={{
                    background: '#3AAC6E',
                    color: '#05110A',
                    borderRadius: 6,
                    padding: '.15rem .5rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '.7rem',
                    letterSpacing: '.04em',
                  }}
                >
                  Nieuw
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.78rem',
                    fontWeight: 500,
                    color: 'rgba(244,236,219,.55)',
                  }}
                >
                  Europese AI · Geen data bewaard
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp(0.1)} style={{ margin: 0 }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(3rem, 6.5vw, 7rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-.04em',
                  color: '#F4ECDB',
                }}
              >
                TWIJFELT U
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(3rem, 6.5vw, 7rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-.04em',
                  WebkitTextStroke: '2px #3AAC6E',
                  color: 'transparent',
                }}
              >
                OVER EEN
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(3rem, 6.5vw, 7rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-.04em',
                  color: '#F4ECDB',
                }}
              >
                BERICHT?
              </span>
            </motion.h1>

            {/* Divider */}
            <motion.div variants={fadeUp(0.2)} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  flex: 1,
                  maxWidth: 420,
                  height: 1,
                  background: 'linear-gradient(90deg, rgba(58,172,110,.4), transparent)',
                }}
              />
            </motion.div>

            {/* Subtext */}
            <motion.p
              variants={fadeUp(0.25)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(.9rem, 1vw, 1rem)',
                lineHeight: 1.75,
                color: 'rgba(244,236,219,.5)',
                margin: 0,
                maxWidth: 380,
              }}
            >
              Upload een screenshot. Binnen 5 seconden weet u of het te vertrouwen is — in gewone
              taal.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp(0.3)}
              style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
            >
              {[
                { value: '< 5 sec', label: 'Analyse' },
                { value: 'EU', label: 'Data' },
                { value: '24/7', label: 'Beschikbaar' },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      color: '#3AAC6E',
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.68rem',
                      color: 'rgba(244,236,219,.35)',
                      marginTop: 3,
                      letterSpacing: '.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp(0.35)}
              style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/${locale}/#demo`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.6rem',
                    padding: '.95rem 1.7rem',
                    borderRadius: 12,
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '.95rem',
                    textDecoration: 'none',
                    background: '#3AAC6E',
                    color: '#05110A',
                    boxShadow: '0 8px 32px -8px rgba(58,172,110,.65)',
                  }}
                >
                  Controleer een bericht
                  <ArrowSvg />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={`/${locale}/#hoe-het-werkt`}
                  style={{
                    padding: '.95rem 1.3rem',
                    borderRadius: 12,
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '.88rem',
                    border: '1.5px solid rgba(244,236,219,.13)',
                    background: 'rgba(244,236,219,.04)',
                    color: 'rgba(244,236,219,.6)',
                    textDecoration: 'none',
                  }}
                >
                  Hoe werkt het?
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade naar volgende sectie */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to top, #040E07 0%, transparent 100%)',
          zIndex: 8,
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}

function PhoneMockup() {
  return (
    <div
      style={{
        width: 'clamp(220px, 22vw, 300px)',
        background: 'linear-gradient(160deg, #0C2416 0%, #081A0E 100%)',
        border: '1.5px solid rgba(58,172,110,.18)',
        borderRadius: 28,
        padding: '1.25rem .9rem .9rem',
        boxShadow: '0 40px 80px -20px rgba(0,0,0,.75), 0 0 0 1px rgba(58,172,110,.08)',
      }}
    >
      <div
        style={{
          width: 50,
          height: 5,
          borderRadius: 9999,
          background: 'rgba(244,236,219,.08)',
          margin: '0 auto .9rem',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '.6rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '.5rem',
          color: 'rgba(244,236,219,.35)',
        }}
      >
        <span>9:41</span>
        <span>●●●</span>
      </div>
      <div
        style={{
          background: 'rgba(244,236,219,.05)',
          borderRadius: 9,
          padding: '.5rem .65rem',
          display: 'flex',
          alignItems: 'center',
          gap: '.4rem',
          marginBottom: '.6rem',
          border: '1px solid rgba(244,236,219,.07)',
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'rgba(244,236,219,.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '.6rem',
            color: 'rgba(244,236,219,.4)',
            flexShrink: 0,
          }}
        >
          ?
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '.58rem',
              color: '#F4ECDB',
            }}
          >
            +31 6 82 49 17 53
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.48rem',
              color: 'rgba(244,236,219,.3)',
            }}
          >
            Onbekend nummer
          </div>
        </div>
      </div>
      <div
        style={{
          background: 'rgba(244,236,219,.07)',
          border: '1px solid rgba(244,236,219,.09)',
          borderRadius: '3px 10px 10px 10px',
          padding: '.55rem .65rem',
          marginBottom: '.45rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.58rem',
            color: 'rgba(244,236,219,.8)',
            lineHeight: 1.5,
          }}
        >
          Hoi mama, dit is mijn nieuwe nummer. Kun je me €450 sturen?
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.46rem',
            color: 'rgba(244,236,219,.25)',
            textAlign: 'right',
            marginTop: '.25rem',
          }}
        >
          14:23 ✓✓
        </div>
      </div>
      <div
        style={{
          background: 'rgba(229,83,42,.14)',
          border: '1px solid rgba(229,83,42,.3)',
          borderRadius: 7,
          padding: '.38rem .55rem',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          marginBottom: '.6rem',
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: '#E5532A',
            flexShrink: 0,
            boxShadow: '0 0 5px #E5532A',
          }}
        />
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '.5rem',
              color: '#E5532A',
              letterSpacing: '.04em',
              textTransform: 'uppercase',
            }}
          >
            Meerdere waarschuwingen
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.46rem',
              color: 'rgba(244,236,219,.4)',
              marginTop: 1,
            }}
          >
            Score 8/10 · Kleinkind-truc
          </div>
        </div>
      </div>
      <div
        style={{
          paddingTop: '.55rem',
          borderTop: '1px solid rgba(244,236,219,.05)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '.5rem',
            color: '#3AAC6E',
            letterSpacing: '.05em',
            textTransform: 'uppercase',
          }}
        >
          KloptHet — Analyseren →
        </div>
      </div>
    </div>
  )
}

function ArrowSvg() {
  return (
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
  )
}
