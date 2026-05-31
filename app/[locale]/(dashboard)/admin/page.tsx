import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { AdminSearch } from '@/components/dashboard/admin-search'
import { AdminUserList } from '@/components/dashboard/admin-user-list'

const MONTHLY_PRICES: Record<string, number> = {
  standard: 3.99,
  family: 5.99,
  premium: 9.99,
  free: 0,
}

// Yearly MRR = jaarprijs / 12 (17% korting)
const YEARLY_MRR: Record<string, number> = {
  standard: 39.9 / 12,
  family: 59.9 / 12,
  premium: 99.9 / 12,
  free: 0,
}

function isYearly(periodEnd: string | null): boolean {
  if (!periodEnd) return false
  const daysLeft = (new Date(periodEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  return daysLeft > 180
}

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string }>
}) {
  const { locale } = await params
  const { q = '' } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/inloggen`)
  if (user.email !== process.env.ADMIN_EMAIL) redirect(`/${locale}/dashboard`)

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()

  const [
    { count: totalUsers },
    { count: newUsersThisMonth },
    { count: newUsersLastMonth },
    { count: totalScans },
    { count: scansThisMonth },
    { data: subs },
    { data: scanStats },
    { data: allUsers },
  ] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', startOfMonth),
    supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', startOfLastMonth)
      .lt('created_at', startOfMonth),
    supabase.from('scans').select('id', { count: 'exact', head: true }),
    supabase
      .from('scans')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', startOfMonth),
    supabase.from('subscriptions').select('tier, status, user_id, current_period_end'),
    supabase
      .from('scans')
      .select('verdict_category, input_kind, created_at')
      .gte('created_at', startOfMonth),
    q
      ? supabase
          .from('profiles')
          .select('id, email, full_name, created_at')
          .ilike('email', `%${q}%`)
          .order('created_at', { ascending: false })
          .limit(50)
      : supabase
          .from('profiles')
          .select('id, email, full_name, created_at')
          .order('created_at', { ascending: false })
          .limit(50),
  ])

  // Haal session/device info op via service role (optioneel)
  const sessionMap: Record<string, { user_agent: string; ip: string; created_at: string }[]> = {}
  try {
    const service = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const userIds = (allUsers ?? []).map((u) => u.id)
    if (userIds.length > 0) {
      const { data: sessions } = await service
        .from('sessions')
        .select('user_id, user_agent, ip, created_at')
        .in('user_id', userIds)
        .order('created_at', { ascending: false })
      sessions?.forEach(
        (s: { user_id: string; user_agent: string; ip: string; created_at: string }) => {
          if (!sessionMap[s.user_id]) sessionMap[s.user_id] = []
          if (sessionMap[s.user_id].length < 3) sessionMap[s.user_id].push(s)
        }
      )
    }
  } catch {
    // Service role niet beschikbaar — skip device info
  }

  // Abonnement stats
  const tierCount: Record<string, number> = { free: 0, standard: 0, family: 0, premium: 0 }
  const activeSubs = subs?.filter((s) => s.status === 'active') ?? []
  subs?.forEach((s) => {
    tierCount[s.tier] = (tierCount[s.tier] ?? 0) + 1
  })

  // MRR berekening — houdt rekening met maandelijks vs jaarlijks
  const mrr = activeSubs.reduce((sum, s) => {
    const yearly = isYearly(s.current_period_end ?? null)
    return sum + (yearly ? (YEARLY_MRR[s.tier] ?? 0) : (MONTHLY_PRICES[s.tier] ?? 0))
  }, 0)
  const arr = mrr * 12

  // Scan verdeling
  const verdictCount = { safe: 0, doubt: 0, phishing: 0 }
  const inputCount = { image: 0, text: 0 }
  scanStats?.forEach((s) => {
    if (s.verdict_category in verdictCount)
      verdictCount[s.verdict_category as keyof typeof verdictCount]++
    if (s.input_kind in inputCount) inputCount[s.input_kind as keyof typeof inputCount]++
  })
  const warningScans = verdictCount.phishing + verdictCount.doubt

  const userGrowth = newUsersLastMonth
    ? Math.round((((newUsersThisMonth ?? 0) - newUsersLastMonth) / newUsersLastMonth) * 100)
    : 0

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
              fontSize: '2rem',
              color: '#F4ECDB',
              margin: '0 0 .2rem',
              letterSpacing: '-.02em',
            }}
          >
            Admin
          </h1>
          <p
            style={{
              color: 'rgba(244,236,219,.4)',
              fontFamily: 'var(--font-sans)',
              margin: 0,
              fontSize: '.8rem',
            }}
          >
            {now.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div
          style={{
            background: 'rgba(229,83,42,.1)',
            border: '1px solid rgba(229,83,42,.25)',
            borderRadius: 8,
            padding: '.4rem .8rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '.7rem',
            fontWeight: 700,
            color: '#E5532A',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
          }}
        >
          Admin only
        </div>
      </div>

      {/* ── RIJ 1: Geld & Groei ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '1rem',
        }}
        className="grid-responsive"
      >
        <BigStatCard
          label="MRR"
          value={`€${mrr.toFixed(2).replace('.', ',')}`}
          sub="Maandelijkse inkomsten"
          color="#3AAC6E"
          note={`ARR: €${arr.toFixed(0)}/jaar`}
        />
        <BigStatCard
          label="Betaalde abonnees"
          value={activeSubs.length.toString()}
          sub="Actieve betalende gebruikers"
          color="#5B8FE8"
          note={`Van ${totalUsers ?? 0} totaal`}
        />
        <BigStatCard
          label="Nieuwe accounts"
          value={(newUsersThisMonth ?? 0).toString()}
          sub="Deze maand"
          color="#D97B2A"
          note={
            userGrowth >= 0 ? `+${userGrowth}% vs vorige maand` : `${userGrowth}% vs vorige maand`
          }
          noteColor={userGrowth >= 0 ? '#3AAC6E' : '#E5532A'}
        />
      </div>

      {/* ── RIJ 2: Scans ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '1rem',
        }}
        className="grid-responsive"
      >
        <BigStatCard
          label="Totaal scans"
          value={(totalScans ?? 0).toString()}
          sub="Alle tijd"
          color="#F4ECDB"
          note={`${scansThisMonth ?? 0} deze maand`}
        />
        <BigStatCard
          label="Waarschuwingen"
          value={warningScans.toString()}
          sub="Let op + Meerdere waarschuwingen"
          color="#E5532A"
          note={`Van ${scanStats?.length ?? 0} scans deze maand`}
        />
        <BigStatCard
          label="Totaal gebruikers"
          value={(totalUsers ?? 0).toString()}
          sub="Geregistreerde accounts"
          color="#C94A7E"
          note={`${newUsersThisMonth ?? 0} nieuw deze maand`}
        />
      </div>

      {/* ── RIJ 3: Abonnementen + Scans detail ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1rem',
        }}
        className="grid-responsive-2"
      >
        {/* Abonnement verdeling */}
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.1)',
            borderRadius: 14,
            padding: '1.25rem',
          }}
        >
          <SectionLabel>Abonnementen</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {[
              { tier: 'premium', label: 'Premium', color: '#D97B2A' },
              { tier: 'family', label: 'Familie', color: '#5B8FE8' },
              { tier: 'standard', label: 'Standaard', color: '#3AAC6E' },
              { tier: 'free', label: 'Gratis', color: 'rgba(244,236,219,.3)' },
            ].map(({ tier, label, color }) => {
              const count = tierCount[tier] ?? 0
              const pct = totalUsers ? Math.round((count / totalUsers) * 100) : 0
              const rev = count * (PRICES[tier] ?? 0)
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
                        fontSize: '.85rem',
                        color,
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.82rem',
                        color: 'rgba(244,236,219,.5)',
                        display: 'flex',
                        gap: '1rem',
                      }}
                    >
                      <span>
                        {count} gebruikers ({pct}%)
                      </span>
                      {rev > 0 && (
                        <span style={{ color: '#3AAC6E' }}>
                          €{rev.toFixed(2).replace('.', ',')}/mnd
                        </span>
                      )}
                    </span>
                  </div>
                  <div
                    style={{ height: 5, borderRadius: 9999, background: 'rgba(244,236,219,.07)' }}
                  >
                    <div
                      style={{
                        height: '100%',
                        borderRadius: 9999,
                        width: `${pct}%`,
                        background: color,
                        transition: 'width .5s',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Scan detail */}
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.1)',
            borderRadius: 14,
            padding: '1.25rem',
          }}
        >
          <SectionLabel>Scans deze maand</SectionLabel>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '.75rem',
              marginBottom: '1.25rem',
            }}
          >
            {[
              { key: 'phishing', label: 'Meerdere waarschuwingen', color: '#E5532A' },
              { key: 'doubt', label: 'Let op', color: '#D97B2A' },
              { key: 'safe', label: 'Geen alarmsignalen', color: '#3AAC6E' },
            ].map(({ key, label, color }) => {
              const count = verdictCount[key as keyof typeof verdictCount]
              const total = scanStats?.length ?? 1
              const pct = Math.round((count / total) * 100)
              return (
                <div key={key}>
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
                        color,
                        fontWeight: 600,
                      }}
                    >
                      {label}
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
                    style={{ height: 5, borderRadius: 9999, background: 'rgba(244,236,219,.07)' }}
                  >
                    <div
                      style={{
                        height: '100%',
                        borderRadius: 9999,
                        width: `${pct}%`,
                        background: color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div
            style={{
              paddingTop: '1rem',
              borderTop: '1px solid rgba(244,236,219,.08)',
              display: 'flex',
              gap: '2rem',
            }}
          >
            {[
              { label: 'Screenshot', count: inputCount.image },
              { label: 'Tekst', count: inputCount.text },
            ].map(({ label, count }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    color: '#F4ECDB',
                    lineHeight: 1,
                  }}
                >
                  {count}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    color: 'rgba(244,236,219,.4)',
                    marginTop: 2,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gebruikerslijst ── */}
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <SectionLabel noMargin>Gebruikers ({totalUsers ?? 0})</SectionLabel>
          <Suspense>
            <AdminSearch defaultValue={q} />
          </Suspense>
        </div>
        <div style={{ maxHeight: 480, overflowY: 'auto' }}>
          <AdminUserList users={allUsers ?? []} subs={subs ?? []} sessionMap={sessionMap} />
        </div>
      </div>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.72rem',
          color: 'rgba(244,236,219,.2)',
          textAlign: 'center',
          marginTop: '1.5rem',
        }}
      >
        Paginabezoeken en landdata: zie Vercel Analytics dashboard
      </p>
    </div>
  )
}

function BigStatCard({
  label,
  value,
  sub,
  color,
  note,
  noteColor,
}: {
  label: string
  value: string
  sub: string
  color: string
  note?: string
  noteColor?: string
}) {
  return (
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
          fontSize: '.72rem',
          fontWeight: 700,
          color: 'rgba(244,236,219,.4)',
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          marginBottom: '.5rem',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: '2.2rem',
          color,
          lineHeight: 1,
          marginBottom: '.3rem',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.75rem',
          color: 'rgba(244,236,219,.4)',
          marginBottom: note ? '.3rem' : 0,
        }}
      >
        {sub}
      </div>
      {note && (
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.72rem',
            color: noteColor ?? 'rgba(244,236,219,.35)',
            fontWeight: 500,
          }}
        >
          {note}
        </div>
      )}
    </div>
  )
}

function SectionLabel({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '.75rem',
        fontWeight: 700,
        color: 'rgba(244,236,219,.45)',
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        marginBottom: noMargin ? 0 : '1rem',
      }}
    >
      {children}
    </div>
  )
}
