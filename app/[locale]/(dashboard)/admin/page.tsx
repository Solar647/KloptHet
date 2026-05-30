import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect(`/${locale}/inloggen`)

  // Alleen admin
  if (user.email !== process.env.ADMIN_EMAIL) {
    redirect(`/${locale}/dashboard`)
  }

  // ── Stats ophalen ──
  const [
    { count: totalUsers },
    { count: totalScans },
    { data: recentUsers },
    { data: recentScans },
    { data: subStats },
  ] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('scans').select('id', { count: 'exact', head: true }),
    supabase
      .from('profiles')
      .select('id, email, full_name, created_at')
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('scans')
      .select('verdict_category, verdict_score, created_at, input_kind')
      .order('created_at', { ascending: false })
      .limit(20),
    supabase.from('subscriptions').select('tier, status'),
  ])

  // Subscription verdeling
  const tierCount: Record<string, number> = { free: 0, standard: 0, family: 0, premium: 0 }
  subStats?.forEach((s) => {
    tierCount[s.tier] = (tierCount[s.tier] ?? 0) + 1
  })

  // Scan verdeling
  const verdictCount = { safe: 0, doubt: 0, phishing: 0 }
  recentScans?.forEach((s) => {
    if (s.verdict_category in verdictCount)
      verdictCount[s.verdict_category as keyof typeof verdictCount]++
  })

  const statCards = [
    { label: 'Totaal gebruikers', value: totalUsers ?? 0, color: '#3AAC6E' },
    { label: 'Totaal scans', value: totalScans ?? 0, color: '#5B8FE8' },
    {
      label: 'Betaalde abonnees',
      value: tierCount.standard + tierCount.family + tierCount.premium,
      color: '#D97B2A',
    },
    { label: 'Familie/Premium', value: tierCount.family + tierCount.premium, color: '#C94A7E' },
  ]

  const tierLabel: Record<string, { name: string; color: string }> = {
    free: { name: 'Gratis', color: 'rgba(244,236,219,.4)' },
    standard: { name: 'Standaard', color: '#3AAC6E' },
    family: { name: 'Familie', color: '#5B8FE8' },
    premium: { name: 'Premium', color: '#D97B2A' },
  }

  const verdictLabel: Record<string, { name: string; color: string }> = {
    safe: { name: 'Geen alarmsignalen', color: '#3AAC6E' },
    doubt: { name: 'Let op', color: '#D97B2A' },
    phishing: { name: 'Meerdere waarschuwingen', color: '#E5532A' },
  }

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 1100 }}>
      {/* Header */}
      <div
        style={{
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: '#F4ECDB',
              margin: '0 0 .25rem',
              letterSpacing: '-.02em',
            }}
          >
            Admin
          </h1>
          <p
            style={{
              color: 'rgba(244,236,219,.45)',
              fontFamily: 'var(--font-sans)',
              margin: 0,
              fontSize: '.85rem',
            }}
          >
            Alleen zichtbaar voor {process.env.ADMIN_EMAIL}
          </p>
        </div>
        <div
          style={{
            background: 'rgba(229,83,42,.1)',
            border: '1px solid rgba(229,83,42,.25)',
            borderRadius: 8,
            padding: '.4rem .8rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '.72rem',
            fontWeight: 700,
            color: '#E5532A',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
          }}
        >
          Admin
        </div>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
        className="pricing-grid"
      >
        {statCards.map((s) => (
          <div
            key={s.label}
            style={{
              background: 'rgba(244,236,219,.04)',
              border: '1px solid rgba(244,236,219,.1)',
              borderRadius: 14,
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.72rem',
                fontWeight: 700,
                color: 'rgba(244,236,219,.4)',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                marginBottom: '.5rem',
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '2rem',
                color: s.color,
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
        className="grid-responsive-2"
      >
        {/* Abonnementen verdeling */}
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.1)',
            borderRadius: 14,
            padding: '1.25rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.75rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.45)',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Abonnementen
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {Object.entries(tierCount).map(([tier, count]) => {
              const cfg = tierLabel[tier]
              const pct = totalUsers ? Math.round((count / totalUsers) * 100) : 0
              return (
                <div key={tier}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '.3rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.82rem',
                        color: cfg.color,
                        fontWeight: 600,
                      }}
                    >
                      {cfg.name}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.82rem',
                        color: 'rgba(244,236,219,.5)',
                      }}
                    >
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div
                    style={{ height: 4, borderRadius: 9999, background: 'rgba(244,236,219,.08)' }}
                  >
                    <div
                      style={{
                        height: '100%',
                        borderRadius: 9999,
                        width: `${pct}%`,
                        background: cfg.color,
                        transition: 'width .5s',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Scan verdeling */}
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.1)',
            borderRadius: 14,
            padding: '1.25rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.75rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.45)',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Laatste 20 scans
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {Object.entries(verdictCount).map(([verdict, count]) => {
              const cfg = verdictLabel[verdict]
              const pct = recentScans?.length ? Math.round((count / recentScans.length) * 100) : 0
              return (
                <div key={verdict}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '.3rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.82rem',
                        color: cfg.color,
                        fontWeight: 600,
                      }}
                    >
                      {cfg.name}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.82rem',
                        color: 'rgba(244,236,219,.5)',
                      }}
                    >
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div
                    style={{ height: 4, borderRadius: 9999, background: 'rgba(244,236,219,.08)' }}
                  >
                    <div
                      style={{
                        height: '100%',
                        borderRadius: 9999,
                        width: `${pct}%`,
                        background: cfg.color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recente gebruikers */}
      <div
        style={{
          background: 'rgba(244,236,219,.04)',
          border: '1px solid rgba(244,236,219,.1)',
          borderRadius: 14,
          overflow: 'hidden',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(244,236,219,.08)',
            fontFamily: 'var(--font-sans)',
            fontSize: '.75rem',
            fontWeight: 700,
            color: 'rgba(244,236,219,.45)',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
          }}
        >
          Recente gebruikers
        </div>
        {recentUsers?.map((u, i) => (
          <div
            key={u.id}
            style={{
              padding: '.85rem 1.5rem',
              borderBottom: i < recentUsers.length - 1 ? '1px solid rgba(244,236,219,.06)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'rgba(58,172,110,.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '.8rem',
                color: '#3AAC6E',
                flexShrink: 0,
              }}
            >
              {u.email.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.88rem',
                  color: '#F4ECDB',
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {u.full_name || u.email}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.75rem',
                  color: 'rgba(244,236,219,.4)',
                }}
              >
                {u.email}
              </div>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.72rem',
                color: 'rgba(244,236,219,.3)',
                flexShrink: 0,
              }}
            >
              {new Date(u.created_at).toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Recente scans */}
      <div
        style={{
          background: 'rgba(244,236,219,.04)',
          border: '1px solid rgba(244,236,219,.1)',
          borderRadius: 14,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(244,236,219,.08)',
            fontFamily: 'var(--font-sans)',
            fontSize: '.75rem',
            fontWeight: 700,
            color: 'rgba(244,236,219,.45)',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
          }}
        >
          Recente scans
        </div>
        {recentScans?.map((s, i) => {
          const cfg = verdictLabel[s.verdict_category] ?? {
            name: s.verdict_category,
            color: 'rgba(244,236,219,.5)',
          }
          return (
            <div
              key={i}
              style={{
                padding: '.75rem 1.5rem',
                borderBottom:
                  i < recentScans.length - 1 ? '1px solid rgba(244,236,219,.06)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: cfg.color,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.82rem',
                    color: cfg.color,
                    fontWeight: 600,
                  }}
                >
                  {cfg.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.75rem',
                    color: 'rgba(244,236,219,.35)',
                    marginLeft: 8,
                  }}
                >
                  {s.verdict_score}/10 · {s.input_kind === 'image' ? 'Screenshot' : 'Tekst'}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.72rem',
                  color: 'rgba(244,236,219,.3)',
                  flexShrink: 0,
                }}
              >
                {new Date(s.created_at).toLocaleDateString('nl-NL', {
                  day: 'numeric',
                  month: 'short',
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
