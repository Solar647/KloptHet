'use client'

import { useRef } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Hero() {
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Tekst fades en beweegt omhoog bij scrollen
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  // Dashboard drifts licht omhoog (parallax)
  const dashY = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#040E07',
        isolation: 'isolate',
      }}
    >
      {/* Gradient glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '0%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '50vh',
          background: 'radial-gradient(ellipse at center, rgba(27,71,49,.7) 0%, transparent 65%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Grid achtergrond */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(rgba(58,172,110,.055) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(58,172,110,.055) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '50px 50px',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 100% at 50% 40%, black 20%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 40%, black 20%, transparent 80%)',
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

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 3vw, 3rem) 0',
          textAlign: 'center',
        }}
      >
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Liquid glass pill */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}
          >
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
                  color: '#040E07',
                  borderRadius: 6,
                  padding: '.15rem .55rem',
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
                  color: 'rgba(244,236,219,.5)',
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
              show: { opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.1 } },
            }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2.8rem, 6.5vw, 7rem)',
              lineHeight: 1.0,
              letterSpacing: '-.04em',
              color: '#F4ECDB',
              margin: '0 0 .1em',
              maxWidth: '14ch',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Twijfelt u over een bericht?{' '}
            <span style={{ WebkitTextStroke: '2px #3AAC6E', color: 'transparent' }}>
              Wij kijken mee.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
            }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(.95rem, 1.2vw, 1.15rem)',
              lineHeight: 1.7,
              color: 'rgba(244,236,219,.55)',
              maxWidth: 480,
              margin: '1.25rem auto 0',
            }}
          >
            Upload een screenshot van een verdacht WhatsApp- of sms-bericht. Binnen 5 seconden weet
            u of het te vertrouwen is — in gewone taal.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
            }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '.75rem',
              flexWrap: 'wrap',
              marginTop: '2rem',
            }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={`/${locale}/#demo`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.6rem',
                  padding: '1rem 1.75rem',
                  borderRadius: 9999,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  background: '#F4ECDB',
                  color: '#040E07',
                  boxShadow: '0 8px 32px -8px rgba(244,236,219,.25)',
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
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={`/${locale}/#hoe-het-werkt`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.5rem',
                  padding: '1rem 1.4rem',
                  borderRadius: 9999,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '.92rem',
                  border: '1.5px solid rgba(244,236,219,.18)',
                  background: 'rgba(244,236,219,.05)',
                  color: 'rgba(244,236,219,.7)',
                  textDecoration: 'none',
                }}
              >
                Hoe werkt het?
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── DASHBOARD AREA — brede product preview ── */}
        <motion.div
          ref={dashboardRef}
          style={{ y: dashY }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
        >
          <div
            style={{
              position: 'relative',
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginTop: 'clamp(3rem, 5vw, 4.5rem)',
            }}
          >
            {/* Dashboard mockup */}
            <div
              style={{
                margin: '0 auto',
                maxWidth: 1100,
                padding: '0 clamp(1rem, 3vw, 3rem)',
              }}
            >
              <DashboardPreview />
            </div>

            {/* Bottom fade */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 180,
                background: 'linear-gradient(to top, #040E07 0%, transparent 100%)',
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

function DashboardPreview() {
  return (
    <div
      style={{
        background: 'linear-gradient(160deg, #0A1E10 0%, #071509 100%)',
        border: '1px solid rgba(58,172,110,.2)',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 40px 100px -20px rgba(0,0,0,.8), 0 0 0 1px rgba(58,172,110,.1)',
      }}
    >
      {/* Titelbalk */}
      <div
        style={{
          padding: '.75rem 1.25rem',
          borderBottom: '1px solid rgba(244,236,219,.06)',
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
            fontSize: '.65rem',
            color: 'rgba(244,236,219,.3)',
            letterSpacing: '.08em',
          }}
        >
          klopt-het.vercel.app/nl/scan
        </div>
      </div>

      {/* Dashboard inhoud */}
      <div
        style={{
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: '1.25rem',
          alignItems: 'start',
        }}
      >
        {/* Links: scanner input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Upload zone */}
          <div
            style={{
              background: 'rgba(244,236,219,.03)',
              border: '1.5px dashed rgba(58,172,110,.25)',
              borderRadius: 14,
              padding: '1.75rem 1rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                color: 'rgba(58,172,110,.5)',
                marginBottom: '.6rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <svg
                width="32"
                height="32"
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
                fontWeight: 600,
                fontSize: '.82rem',
                color: '#F4ECDB',
                marginBottom: '.3rem',
              }}
            >
              Kies uw screenshot
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.7rem',
                color: 'rgba(244,236,219,.35)',
              }}
            >
              PNG, JPG, HEIC · max 10 MB
            </div>
          </div>

          {/* Voorbeeld bericht */}
          <div
            style={{
              background: 'rgba(244,236,219,.04)',
              border: '1px solid rgba(244,236,219,.08)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '.6rem .85rem',
                borderBottom: '1px solid rgba(244,236,219,.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: 'rgba(244,236,219,.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '.6rem',
                  color: 'rgba(244,236,219,.4)',
                }}
              >
                ?
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.7rem',
                  color: '#F4ECDB',
                  fontWeight: 600,
                }}
              >
                +31 6 82 49 17 53
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.58rem',
                  color: 'rgba(229,83,42,.7)',
                  fontWeight: 700,
                }}
              >
                Onbekend
              </div>
            </div>
            <div
              style={{
                padding: '.75rem .85rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '.72rem',
                color: 'rgba(244,236,219,.75)',
                lineHeight: 1.5,
              }}
            >
              &ldquo;Hoi mama, kun je me €450 sturen? Nieuw nummer, dringend.&rdquo;
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '.75rem',
              background: '#3AAC6E',
              borderRadius: 10,
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '.82rem',
              color: '#040E07',
            }}
          >
            Controleer bericht
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Rechts: analyse resultaat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Verdict */}
          <div
            style={{
              background: 'rgba(229,83,42,.08)',
              border: '1px solid rgba(229,83,42,.25)',
              borderRadius: 14,
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.68rem',
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
                    fontSize: '1.3rem',
                    color: '#F4ECDB',
                    letterSpacing: '-.02em',
                  }}
                >
                  Meerdere waarschuwingen
                </div>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  background: 'rgba(229,83,42,.15)',
                  border: '1px solid rgba(229,83,42,.3)',
                  borderRadius: 10,
                  padding: '.6rem .9rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1.6rem',
                    color: '#E5532A',
                    lineHeight: 1,
                  }}
                >
                  8
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.55rem',
                    color: 'rgba(244,236,219,.35)',
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                    marginTop: 2,
                  }}
                >
                  /10
                </div>
              </div>
            </div>
            {/* Score balk */}
            <div
              style={{
                height: 5,
                borderRadius: 9999,
                background: 'rgba(244,236,219,.07)',
                marginBottom: '1rem',
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
                fontSize: '.82rem',
                color: 'rgba(244,236,219,.75)',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Wij zien een patroon van de kleinkind-truc. Geldverzoek via onbekend nummer met
              tijdsdruk.
            </p>
          </div>

          {/* Signalen */}
          <div
            style={{
              background: 'rgba(244,236,219,.04)',
              border: '1px solid rgba(244,236,219,.1)',
              borderRadius: 14,
              padding: '1rem 1.1rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.68rem',
                fontWeight: 700,
                color: 'rgba(244,236,219,.4)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                marginBottom: '.75rem',
              }}
            >
              Gevonden signalen
            </div>
            {[
              { t: 'Geldverzoek via nieuw nummer', c: '#E5532A' },
              { t: 'Tijdsdruk: "dringend"', c: '#D97B2A' },
              { t: 'Geen identiteitsverificatie', c: '#D97B2A' },
            ].map((s) => (
              <div
                key={s.t}
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '.5rem' }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: s.c,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.78rem',
                    color: 'rgba(244,236,219,.7)',
                  }}
                >
                  {s.t}
                </span>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.68rem',
              color: 'rgba(244,236,219,.3)',
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Dit is een indicatie. Twijfelt u nog? Bel 088 – 786 87 78
          </div>
        </div>
      </div>
    </div>
  )
}
