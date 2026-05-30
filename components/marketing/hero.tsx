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

  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const dashY = useTransform(scrollYProgress, [0, 1], [0, -250])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#000',
        isolation: 'isolate',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* 3D Three.js scene — organische planten */}
      <Suspense fallback={null}>
        <HeroSpline />
      </Suspense>

      {/* Donkere overlay zodat tekst leesbaar blijft */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,.3) 0%, rgba(0,0,0,.7) 100%)',
        }}
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(rgba(58,172,110,.05) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(58,172,110,.05) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '50px 50px',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 100% at 50% 40%, black 10%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 40%, black 10%, transparent 80%)',
        }}
      />

      {/* ── HERO CONTENT ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Tekst blok met parallax */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <div
            style={{
              textAlign: 'center',
              padding: 'clamp(5rem, 9vw, 7rem) clamp(1.5rem, 3vw, 3rem) 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Liquid glass pill */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              style={{ marginBottom: '1.5rem' }}
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
                    padding: '.15rem .55rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '.72rem',
                    letterSpacing: '.04em',
                  }}
                >
                  Nieuw
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.82rem',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,.55)',
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
                textAlign: 'center',
                maxWidth: '14ch',
              }}
            >
              Twijfelt u over
              <br />
              een bericht?{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  WebkitTextStroke: '1.5px #3AAC6E',
                  color: 'transparent',
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
                fontSize: 'clamp(.95rem, 1.2vw, 1.1rem)',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,.55)',
                maxWidth: 480,
                margin: '1.25rem auto 0',
                textAlign: 'center',
              }}
            >
              Upload een screenshot van een verdacht bericht.
              <br />
              Binnen 5 seconden weet u of het te vertrouwen is.
            </motion.p>

            {/* CTA — gradient glow knop */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
              }}
              style={{ marginTop: '2rem' }}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/${locale}/#demo`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.6rem',
                    padding: '1rem 2rem',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #fff 0%, #d4f0e0 100%)',
                    color: '#000',
                    boxShadow: '0 0 30px rgba(58,172,110,.4), 0 8px 32px -8px rgba(0,0,0,.4)',
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

        {/* ── DASHBOARD — breed, met parallax ── */}
        <motion.div
          style={{ y: dashY, width: '100%' }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
        >
          <div
            style={{
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginTop: 'clamp(3rem, 5vw, 4.5rem)',
              position: 'relative',
            }}
          >
            <div style={{ padding: '0 clamp(1rem, 4vw, 4rem)', maxWidth: 1200, margin: '0 auto' }}>
              <DashboardMockup />
            </div>

            {/* Bottom fade */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 200,
                background: 'linear-gradient(to top, #000 0%, transparent 100%)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DashboardMockup() {
  return (
    <div
      style={{
        background: 'rgba(10, 20, 14, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(58,172,110,.2)',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 50px 120px -20px rgba(0,0,0,.9), 0 0 0 1px rgba(58,172,110,.1)',
        mixBlendMode: 'luminosity' as const,
      }}
    >
      {/* Titelbalk */}
      <div
        style={{
          padding: '.7rem 1.25rem',
          borderBottom: '1px solid rgba(255,255,255,.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '.6rem',
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E5532A' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#D97B2A' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#3AAC6E' }} />
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '.62rem',
            color: 'rgba(255,255,255,.25)',
            letterSpacing: '.08em',
          }}
        >
          klopthet.vercel.app — Bericht controleren
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: '1.25rem',
        }}
      >
        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              background: 'rgba(255,255,255,.03)',
              border: '1.5px dashed rgba(58,172,110,.2)',
              borderRadius: 12,
              padding: '1.5rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                color: 'rgba(58,172,110,.5)',
                marginBottom: '.5rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.78rem',
                color: '#fff',
                fontWeight: 600,
                marginBottom: '.25rem',
              }}
            >
              Screenshot uploaden
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.65rem',
                color: 'rgba(255,255,255,.3)',
              }}
            >
              PNG, JPG, HEIC
            </div>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '.55rem .8rem',
                borderBottom: '1px solid rgba(255,255,255,.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '.55rem',
                  color: 'rgba(255,255,255,.4)',
                }}
              >
                ?
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.65rem',
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                +31 6 82 49 17 53
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.55rem',
                  color: 'rgba(229,83,42,.7)',
                  fontWeight: 700,
                }}
              >
                Onbekend
              </div>
            </div>
            <div
              style={{
                padding: '.65rem .8rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '.68rem',
                color: 'rgba(255,255,255,.7)',
                lineHeight: 1.5,
              }}
            >
              &ldquo;Hoi mama, kun je me €450 sturen?&rdquo;
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              padding: '.7rem',
              background: '#3AAC6E',
              borderRadius: 9,
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '.78rem',
              color: '#000',
            }}
          >
            Controleer bericht →
          </div>
        </div>

        {/* Rechts — resultaat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              background: 'rgba(229,83,42,.07)',
              border: '1px solid rgba(229,83,42,.2)',
              borderRadius: 12,
              padding: '1.1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '.85rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.62rem',
                    fontWeight: 700,
                    color: '#E5532A',
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    marginBottom: '.2rem',
                  }}
                >
                  Onze analyse
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    color: '#fff',
                  }}
                >
                  Meerdere waarschuwingen
                </div>
              </div>
              <div
                style={{
                  background: 'rgba(229,83,42,.15)',
                  border: '1px solid rgba(229,83,42,.25)',
                  borderRadius: 8,
                  padding: '.5rem .75rem',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    color: '#E5532A',
                    lineHeight: 1,
                  }}
                >
                  8
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.5rem',
                    color: 'rgba(255,255,255,.3)',
                    letterSpacing: '.06em',
                  }}
                >
                  /10
                </div>
              </div>
            </div>
            <div
              style={{
                height: 4,
                borderRadius: 9999,
                background: 'rgba(255,255,255,.06)',
                marginBottom: '.85rem',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: '80%',
                  borderRadius: 9999,
                  background: 'linear-gradient(90deg, #E5532A88, #E5532A)',
                }}
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.75rem',
                color: 'rgba(255,255,255,.7)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Wij zien een patroon van de kleinkind-truc. Geldverzoek via onbekend nummer
              gecombineerd met tijdsdruk.
            </p>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 12,
              padding: '.9rem 1rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.62rem',
                fontWeight: 700,
                color: 'rgba(255,255,255,.35)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                marginBottom: '.65rem',
              }}
            >
              Gevonden signalen
            </div>
            {[
              { t: 'Geldverzoek via nieuw nummer', c: '#E5532A' },
              { t: 'Tijdsdruk aanwezig', c: '#D97B2A' },
              { t: 'Geen identiteitsverificatie', c: '#D97B2A' },
            ].map((s) => (
              <div
                key={s.t}
                style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: '.45rem' }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: s.c,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    color: 'rgba(255,255,255,.65)',
                  }}
                >
                  {s.t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
