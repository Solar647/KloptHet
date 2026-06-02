import { Scanner } from '@/components/scanner/scanner'
import { createClient } from '@/lib/supabase/server'

export default async function ScanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { count: totalScans } = await supabase
    .from('scans')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user?.id ?? '')

  return (
    <div style={{ minHeight: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Achtergrond glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: 400,
          background: 'radial-gradient(ellipse, rgba(30,80,180,.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid patroon */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(244,236,219,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(244,236,219,.025) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 100% 60% at 50% 0%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 60% at 50% 0%, black 40%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)',
          maxWidth: 860,
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          {/* Schild icoon */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'rgba(30,80,180,.15)',
              border: '1px solid rgba(30,80,180,.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(100,160,255,.9)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <circle cx="12" cy="12" r="3" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>

          {/* Stats pill */}
          {(totalScans ?? 0) > 0 && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: '1rem',
                background: 'rgba(58,172,110,.08)',
                border: '1px solid rgba(58,172,110,.2)',
                borderRadius: 9999,
                padding: '.3rem .9rem',
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3AAC6E' }} />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.78rem',
                  color: 'rgba(58,172,110,.9)',
                  fontWeight: 600,
                }}
              >
                {totalScans} bericht{(totalScans ?? 0) !== 1 ? 'en' : ''} gecontroleerd
              </span>
            </div>
          )}
        </div>

        {/* Scanner */}
        <Scanner dashboard />

        {/* Tips onderaan */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '.75rem',
            marginTop: '2rem',
          }}
          className="grid-responsive"
        >
          {[
            {
              icon: (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(100,160,255,.7)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              ),
              text: 'Werkt met WhatsApp, sms, e-mail en websites',
            },
            {
              icon: (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(100,160,255,.7)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              ),
              text: 'Uw bericht wordt nooit opgeslagen',
            },
            {
              icon: (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(100,160,255,.7)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              text: 'Resultaat binnen 5 seconden',
            },
          ].map((tip) => (
            <div
              key={tip.text}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                background: 'rgba(244,236,219,.03)',
                border: '1px solid rgba(244,236,219,.07)',
                borderRadius: 10,
                padding: '.75rem 1rem',
              }}
            >
              <div style={{ flexShrink: 0, marginTop: 1 }}>{tip.icon}</div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.78rem',
                  color: 'rgba(244,236,219,.4)',
                  lineHeight: 1.5,
                }}
              >
                {tip.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
