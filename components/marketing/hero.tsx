'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'

export function Hero() {
  const locale = useLocale()

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #061710 0%, #0A2018 40%, #0D2B1E 70%, #071610 100%)',
        isolation: 'isolate',
      }}
    >
      {/* ── MESH GRADIENT ACHTERGROND ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: `
          radial-gradient(ellipse 55% 60% at 75% 40%, rgba(34,139,78,.22) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 20% 70%, rgba(16,80,46,.35) 0%, transparent 55%),
          radial-gradient(ellipse 30% 40% at 60% 10%, rgba(58,172,110,.08) 0%, transparent 50%)
        `,
        }}
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(rgba(58,172,110,.05) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(58,172,110,.05) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '50px 50px',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 100% at 50% 50%, black 0%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 0%, transparent 75%)',
        }}
      />

      {/* Grain */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.035,
          mixBlendMode: 'screen',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── HOOFD LAYOUT ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: 1320,
          margin: '0 auto',
          width: '100%',
          padding: 'clamp(5rem, 8vw, 7rem) clamp(1.5rem, 4vw, 4rem)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 5vw, 6rem)',
          alignItems: 'center',
        }}
        className="grid-responsive"
      >
        {/* ── LINKS: Tekst ── */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 2.5vw, 2rem)' }}
        >
          {/* Eyebrow pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(58,172,110,.12)',
              border: '1px solid rgba(58,172,110,.3)',
              borderRadius: 9999,
              padding: '.4rem 1rem',
              alignSelf: 'flex-start',
            }}
          >
            <span
              className="hero-live-dot"
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#3AAC6E' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.75rem',
                fontWeight: 600,
                color: '#3AAC6E',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
              }}
            >
              Europese AI · Gemaakt in Nederland
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '0.05em' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(3rem, 6.5vw, 7rem)',
                lineHeight: 0.92,
                letterSpacing: '-.04em',
                color: '#F4ECDB',
                display: 'block',
              }}
            >
              TWIJFELT U
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(3rem, 6.5vw, 7rem)',
                lineHeight: 0.92,
                letterSpacing: '-.04em',
                display: 'block',
                WebkitTextStroke: '2px #3AAC6E',
                color: 'transparent',
              }}
            >
              OVER EEN
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(3rem, 6.5vw, 7rem)',
                lineHeight: 0.92,
                letterSpacing: '-.04em',
                color: '#F4ECDB',
                display: 'block',
              }}
            >
              BERICHT?
            </span>
          </h1>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                flex: 1,
                height: 1,
                background: 'linear-gradient(90deg, rgba(58,172,110,.4), transparent)',
              }}
            />
          </div>

          {/* Subtext */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(.95rem, 1.1vw, 1.1rem)',
              lineHeight: 1.75,
              color: 'rgba(244,236,219,.6)',
              margin: 0,
              maxWidth: 400,
            }}
          >
            Upload een screenshot van een verdacht bericht. Binnen 5 seconden weet u of het te
            vertrouwen is — in gewone taal.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { value: '< 5 sec', label: 'Analyse tijd' },
              { value: 'EU', label: 'Data blijft in Europa' },
              { value: '24/7', label: 'Beschikbaar' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    color: '#3AAC6E',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    color: 'rgba(244,236,219,.4)',
                    marginTop: 3,
                    letterSpacing: '.04em',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href={`/${locale}/#demo`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.6rem',
                padding: '1rem 1.75rem',
                borderRadius: 12,
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                background: '#3AAC6E',
                color: '#061710',
                boxShadow: '0 8px 32px -8px rgba(58,172,110,.65)',
                transition: 'transform .2s, box-shadow .2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 16px 40px -8px rgba(58,172,110,.75)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 32px -8px rgba(58,172,110,.65)'
              }}
            >
              Controleer een bericht
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
            <Link
              href={`/${locale}/#hoe-het-werkt`}
              style={{
                padding: '1rem 1.3rem',
                borderRadius: 12,
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '.9rem',
                border: '1.5px solid rgba(244,236,219,.15)',
                color: 'rgba(244,236,219,.65)',
                textDecoration: 'none',
                transition: 'all .15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,236,219,.3)'
                e.currentTarget.style.color = '#F4ECDB'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,236,219,.15)'
                e.currentTarget.style.color = 'rgba(244,236,219,.65)'
              }}
            >
              Hoe werkt het?
            </Link>
          </div>
        </div>

        {/* ── RECHTS: SVG Illustratie ── */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <HeroIllustration />
        </div>
      </div>
    </section>
  )
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 480, height: 'auto' }}
      aria-hidden="true"
    >
      {/* ── Achtergrond blob ── */}
      <ellipse cx="240" cy="260" rx="200" ry="200" fill="rgba(27,71,49,.25)" />
      <ellipse cx="240" cy="260" rx="160" ry="160" fill="rgba(27,71,49,.15)" />

      {/* ── Decoratieve ring ── */}
      <circle
        cx="240"
        cy="260"
        r="195"
        stroke="rgba(58,172,110,.12)"
        strokeWidth="1"
        strokeDasharray="8 12"
      />
      <circle cx="240" cy="260" r="155" stroke="rgba(58,172,110,.08)" strokeWidth="1" />

      {/* ════ KAART 1: Kleinkind-truc (rood, links) ════ */}
      <g transform="translate(20, 80) rotate(-6, 160, 140)">
        <rect
          x="0"
          y="0"
          width="220"
          height="165"
          rx="16"
          fill="#0C2416"
          stroke="rgba(229,83,42,.35)"
          strokeWidth="1.5"
        />
        {/* Header */}
        <circle cx="24" cy="28" r="14" fill="rgba(229,83,42,.15)" />
        <text
          x="24"
          y="33"
          textAnchor="middle"
          fontFamily="system-ui"
          fontSize="11"
          fill="rgba(229,83,42,.8)"
          fontWeight="700"
        >
          ?
        </text>
        <text
          x="46"
          y="24"
          fontFamily="system-ui"
          fontSize="10"
          fill="rgba(244,236,219,.85)"
          fontWeight="600"
        >
          +31 6 84 29 17 53
        </text>
        <text x="46" y="37" fontFamily="system-ui" fontSize="8.5" fill="rgba(244,236,219,.35)">
          Onbekend nummer
        </text>
        {/* Bericht bubble */}
        <rect
          x="12"
          y="52"
          width="196"
          height="60"
          rx="4"
          ry="10"
          fill="rgba(244,236,219,.07)"
          stroke="rgba(244,236,219,.08)"
          strokeWidth="1"
        />
        <text x="22" y="70" fontFamily="system-ui" fontSize="9" fill="rgba(244,236,219,.8)">
          Hoi mama, dit is mijn nieuwe
        </text>
        <text x="22" y="84" fontFamily="system-ui" fontSize="9" fill="rgba(244,236,219,.8)">
          nummer. Kun je me €450
        </text>
        <text x="22" y="98" fontFamily="system-ui" fontSize="9" fill="rgba(244,236,219,.8)">
          sturen? Het is dringend.
        </text>
        <text
          x="190"
          y="104"
          textAnchor="end"
          fontFamily="system-ui"
          fontSize="7.5"
          fill="rgba(244,236,219,.25)"
        >
          14:23 ✓✓
        </text>
        {/* Verdict */}
        <rect
          x="12"
          y="122"
          width="196"
          height="32"
          rx="8"
          fill="rgba(229,83,42,.15)"
          stroke="rgba(229,83,42,.35)"
          strokeWidth="1"
        />
        <circle cx="26" cy="138" r="4" fill="#E5532A" />
        <text
          x="36"
          y="135"
          fontFamily="system-ui"
          fontSize="8.5"
          fill="#E5532A"
          fontWeight="700"
          letterSpacing="0.5"
        >
          MEERDERE WAARSCHUWINGEN
        </text>
        <text x="36" y="147" fontFamily="system-ui" fontSize="7.5" fill="rgba(244,236,219,.4)">
          Score 8/10 · Kleinkind-truc
        </text>
      </g>

      {/* ════ KAART 2: Bezorg-fraude (oranje, rechts) ════ */}
      <g transform="translate(240, 120) rotate(5, 120, 130)">
        <rect
          x="0"
          y="0"
          width="210"
          height="155"
          rx="16"
          fill="#0C2416"
          stroke="rgba(217,123,42,.3)"
          strokeWidth="1.5"
        />
        {/* Header */}
        <rect
          x="12"
          y="14"
          width="186"
          height="32"
          rx="8"
          fill="rgba(244,236,219,.05)"
          stroke="rgba(244,236,219,.06)"
          strokeWidth="1"
        />
        <text
          x="22"
          y="26"
          fontFamily="system-ui"
          fontSize="9"
          fill="rgba(244,236,219,.5)"
          fontWeight="700"
        >
          PostNL
        </text>
        <text x="22" y="38" fontFamily="system-ui" fontSize="7.5" fill="rgba(217,123,42,.7)">
          Vermoedelijk nep
        </text>
        {/* Bericht */}
        <text x="14" y="66" fontFamily="system-ui" fontSize="8.5" fill="rgba(244,236,219,.75)">
          Uw pakket kan niet worden
        </text>
        <text x="14" y="79" fontFamily="system-ui" fontSize="8.5" fill="rgba(244,236,219,.75)">
          afgeleverd. Betaal €1,99 via:
        </text>
        <text x="14" y="92" fontFamily="system-ui" fontSize="8.5" fill="rgba(217,123,42,.9)">
          post-nl-betaling.com
        </text>
        {/* Score balk */}
        <rect x="14" y="108" width="182" height="4" rx="2" fill="rgba(244,236,219,.08)" />
        <rect x="14" y="108" width="127" height="4" rx="2" fill="#D97B2A" />
        <text
          x="14"
          y="127"
          fontFamily="system-ui"
          fontSize="8"
          fill="rgba(217,123,42,.8)"
          fontWeight="600"
        >
          Let op · Score 7/10
        </text>
        <text
          x="186"
          y="127"
          textAnchor="end"
          fontFamily="system-ui"
          fontSize="7.5"
          fill="rgba(244,236,219,.3)"
        >
          KloptHet
        </text>
        <rect
          x="14"
          y="133"
          width="182"
          height="14"
          rx="4"
          fill="rgba(217,123,42,.1)"
          stroke="rgba(217,123,42,.25)"
          strokeWidth="1"
        />
        <text x="23" y="143" fontFamily="system-ui" fontSize="7.5" fill="rgba(217,123,42,.85)">
          Verdacht domein gedetecteerd
        </text>
      </g>

      {/* ════ KAART 3: Legitiem (groen, midden-onder) ════ */}
      <g transform="translate(100, 310) rotate(-3, 130, 90)">
        <rect
          x="0"
          y="0"
          width="240"
          height="130"
          rx="16"
          fill="#0C2416"
          stroke="rgba(58,172,110,.3)"
          strokeWidth="1.5"
        />
        <text
          x="16"
          y="26"
          fontFamily="system-ui"
          fontSize="10"
          fill="rgba(244,236,219,.85)"
          fontWeight="600"
        >
          Bol.com
        </text>
        <rect
          x="90"
          y="14"
          width="134"
          height="16"
          rx="4"
          fill="rgba(58,172,110,.12)"
          stroke="rgba(58,172,110,.25)"
          strokeWidth="1"
        />
        <circle cx="100" cy="22" r="3" fill="#3AAC6E" />
        <text x="108" y="26" fontFamily="system-ui" fontSize="7.5" fill="#3AAC6E" fontWeight="700">
          Geen alarmsignalen
        </text>
        <text x="16" y="50" fontFamily="system-ui" fontSize="8.5" fill="rgba(244,236,219,.7)">
          Uw bestelling #4821039 is onderweg.
        </text>
        <text x="16" y="64" fontFamily="system-ui" fontSize="8.5" fill="rgba(244,236,219,.7)">
          Verwachte levering: morgen 9-13u.
        </text>
        {/* Score balk groen */}
        <rect x="16" y="82" width="208" height="4" rx="2" fill="rgba(244,236,219,.08)" />
        <rect x="16" y="82" width="20" height="4" rx="2" fill="#3AAC6E" />
        <text x="16" y="101" fontFamily="system-ui" fontSize="8" fill="#3AAC6E" fontWeight="600">
          Score 1/10 · Betrouwbaar bericht
        </text>
        <rect
          x="16"
          y="108"
          width="60"
          height="14"
          rx="4"
          fill="rgba(58,172,110,.1)"
          stroke="rgba(58,172,110,.25)"
          strokeWidth="1"
        />
        <text
          x="46"
          y="118"
          textAnchor="middle"
          fontFamily="system-ui"
          fontSize="7.5"
          fill="#3AAC6E"
        >
          ✓ Veilig
        </text>
      </g>

      {/* ── Scan beam animatie lijn ── */}
      <line
        x1="40"
        y1="200"
        x2="440"
        y2="200"
        stroke="rgba(58,172,110,.15)"
        strokeWidth="1"
        strokeDasharray="6 10"
      />

      {/* ── Logo / badge midden ── */}
      <g transform="translate(200, 235)">
        <circle
          cx="40"
          cy="25"
          r="24"
          fill="rgba(58,172,110,.15)"
          stroke="rgba(58,172,110,.3)"
          strokeWidth="1.5"
        />
        <circle cx="40" cy="25" r="16" fill="rgba(58,172,110,.1)" />
        <text
          x="40"
          y="30"
          textAnchor="middle"
          fontFamily="system-ui"
          fontSize="14"
          fill="#3AAC6E"
          fontWeight="800"
        >
          KH
        </text>
      </g>

      {/* ── Kleine decoratieve dots ── */}
      <circle cx="60" cy="70" r="3" fill="rgba(58,172,110,.3)" />
      <circle cx="420" cy="350" r="4" fill="rgba(229,83,42,.3)" />
      <circle cx="380" cy="90" r="2.5" fill="rgba(244,236,219,.15)" />
      <circle cx="90" cy="430" r="3.5" fill="rgba(217,123,42,.25)" />
      <circle cx="450" cy="200" r="2" fill="rgba(58,172,110,.4)" />

      {/* ── Verbindingslijnen ── */}
      <line
        x1="130"
        y1="220"
        x2="240"
        y2="258"
        stroke="rgba(58,172,110,.15)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
      <line
        x1="350"
        y1="250"
        x2="280"
        y2="258"
        stroke="rgba(58,172,110,.1)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
    </svg>
  )
}
