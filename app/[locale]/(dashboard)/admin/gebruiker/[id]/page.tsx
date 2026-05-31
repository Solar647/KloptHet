import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const catColor = { safe: '#3AAC6E', doubt: '#D97B2A', phishing: '#E5532A' }
const catLabel = { safe: 'Geen alarmsignalen', doubt: 'Let op', phishing: 'Waarschuwingen' }

function parseDevice(ua: string): { device: string; os: string; browser: string } {
  if (!ua) return { device: 'Onbekend', os: 'Onbekend', browser: 'Onbekend' }
  const device = /iPhone|iPad|Android/.test(ua) ? 'Mobiel' : 'Desktop'
  const os = /Windows NT 10/.test(ua)
    ? 'Windows 10/11'
    : /Windows/.test(ua)
      ? 'Windows'
      : /Mac OS X/.test(ua)
        ? 'macOS'
        : /Android/.test(ua)
          ? 'Android'
          : /iPhone|iPad/.test(ua)
            ? 'iOS'
            : 'Onbekend'
  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /Chrome\//.test(ua)
      ? 'Chrome'
      : /Firefox\//.test(ua)
        ? 'Firefox'
        : /Safari\//.test(ua)
          ? 'Safari'
          : 'Onbekend'
  return { device, os, browser }
}

export default async function AdminUserPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const supabase = await createClient()
  const {
    data: { user: adminUser },
  } = await supabase.auth.getUser()
  if (!adminUser) redirect(`/${locale}/inloggen`)
  if (adminUser.email !== process.env.ADMIN_EMAIL) redirect(`/${locale}/dashboard`)

  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [{ data: profile }, { data: sub }, { data: scans }, { data: family }] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, email, full_name, created_at, locale')
      .eq('id', id)
      .single(),
    supabase
      .from('subscriptions')
      .select('tier, status, current_period_end')
      .eq('user_id', id)
      .single(),
    supabase
      .from('scans')
      .select('id, verdict_category, verdict_score, verdict_summary, input_kind, created_at')
      .eq('user_id', id)
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('family_members')
      .select('family_id, status, joined_at')
      .eq('user_id', id)
      .maybeSingle(),
  ])

  if (!profile) redirect(`/${locale}/admin`)

  // Sessions via service role
  let sessions: { user_agent: string; ip: string; created_at: string }[] = []
  try {
    const { data } = await service
      .from('sessions')
      .select('user_agent, ip, created_at')
      .eq('user_id', id)
      .order('created_at', { ascending: false })
      .limit(5)
    sessions = data ?? []
  } catch {
    /* geen service role */
  }

  const tierColor: Record<string, string> = {
    free: 'rgba(244,236,219,.35)',
    standard: '#3AAC6E',
    family: '#5B8FE8',
    premium: '#D97B2A',
  }

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 800 }}>
      {/* Terug */}
      <Link
        href={`/${locale}/admin`}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.85rem',
          color: 'rgba(244,236,219,.45)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: '1.5rem',
        }}
      >
        ← Terug naar admin
      </Link>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(58,172,110,.15)',
            border: '2px solid rgba(58,172,110,.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '1.3rem',
            color: '#3AAC6E',
            flexShrink: 0,
          }}
        >
          {profile.email.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: '1.6rem',
              color: '#F4ECDB',
              margin: '0 0 .2rem',
              letterSpacing: '-.02em',
            }}
          >
            {profile.full_name ? profile.full_name.slice(0, 20) : profile.email}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.85rem',
              color: 'rgba(244,236,219,.5)',
              margin: 0,
            }}
          >
            {profile.email}
          </p>
        </div>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-sans)',
            fontSize: '.75rem',
            fontWeight: 700,
            color: tierColor[sub?.tier ?? 'free'],
            textTransform: 'uppercase',
            letterSpacing: '.06em',
            background: `${tierColor[sub?.tier ?? 'free']}18`,
            padding: '.3rem .8rem',
            borderRadius: 9999,
            border: `1px solid ${tierColor[sub?.tier ?? 'free']}30`,
          }}
        >
          {sub?.tier ?? 'free'}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1rem',
        }}
        className="grid-responsive-2"
      >
        {/* Account info */}
        <InfoCard title="Account">
          <InfoRow label="E-mail" value={profile.email} />
          <InfoRow label="Naam" value={profile.full_name ?? '—'} />
          <InfoRow
            label="Aangemeld op"
            value={new Date(profile.created_at).toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          />
          <InfoRow label="Taal" value={profile.locale ?? 'nl'} />
          {family && (
            <InfoRow
              label="Familielid"
              value={family.status === 'active' ? `Actief lid` : 'Uitnodiging verstuurd'}
            />
          )}
        </InfoCard>

        {/* Abonnement */}
        <InfoCard title="Abonnement">
          <InfoRow
            label="Tier"
            value={sub?.tier ?? 'free'}
            valueColor={tierColor[sub?.tier ?? 'free']}
          />
          <InfoRow label="Status" value={sub?.status ?? '—'} />
          {sub?.current_period_end && (
            <InfoRow
              label="Verloopt op"
              value={new Date(sub.current_period_end).toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'short',
                year: '2-digit',
              })}
            />
          )}
          <InfoRow label="Totaal scans" value={(scans?.length ?? 0).toString()} />
        </InfoCard>
      </div>

      {/* Apparaten / sessies */}
      {sessions.length > 0 && (
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.1)',
            borderRadius: 14,
            padding: '1.25rem',
            marginBottom: '1rem',
          }}
        >
          <SectionLabel>Recente sessies</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {sessions.map((s, i) => {
              const dev = parseDevice(s.user_agent)
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '.65rem .9rem',
                    background: 'rgba(244,236,219,.03)',
                    borderRadius: 8,
                    border: '1px solid rgba(244,236,219,.07)',
                  }}
                >
                  <div style={{ fontSize: '1.2rem' }}>{dev.device === 'Mobiel' ? '📱' : '💻'}</div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.85rem',
                        color: '#F4ECDB',
                        fontWeight: 500,
                      }}
                    >
                      {dev.device} · {dev.os} · {dev.browser}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.72rem',
                        color: 'rgba(244,236,219,.35)',
                        marginTop: 2,
                      }}
                    >
                      {new Date(s.created_at).toLocaleDateString('nl-NL', {
                        day: 'numeric',
                        month: 'short',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {s.ip && ` · ${s.ip}`}
                    </div>
                  </div>
                  {i === 0 && (
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.65rem',
                        fontWeight: 700,
                        color: '#3AAC6E',
                        background: 'rgba(58,172,110,.1)',
                        padding: '.2rem .5rem',
                        borderRadius: 9999,
                      }}
                    >
                      Laatste
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {sessions.length === 0 && (
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.1)',
            borderRadius: 14,
            padding: '1.25rem',
            marginBottom: '1rem',
          }}
        >
          <SectionLabel>Recente sessies</SectionLabel>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.85rem',
              color: 'rgba(244,236,219,.35)',
              margin: 0,
            }}
          >
            Voeg{' '}
            <code
              style={{ background: 'rgba(244,236,219,.08)', padding: '1px 5px', borderRadius: 4 }}
            >
              SUPABASE_SERVICE_ROLE_KEY
            </code>{' '}
            toe in Vercel om sessie-info te zien.
          </p>
        </div>
      )}

      {/* Recente scans */}
      <div
        style={{
          background: 'rgba(244,236,219,.04)',
          border: '1px solid rgba(244,236,219,.1)',
          borderRadius: 14,
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(244,236,219,.08)' }}>
          <SectionLabel noMargin>Recente scans ({scans?.length ?? 0})</SectionLabel>
        </div>
        {!scans?.length ? (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.85rem',
              color: 'rgba(244,236,219,.35)',
              margin: 0,
              padding: '1.25rem',
            }}
          >
            Nog geen scans.
          </p>
        ) : (
          <div>
            {scans.map((s, i) => (
              <div
                key={s.id}
                style={{
                  padding: '.8rem 1.25rem',
                  borderBottom: i < scans.length - 1 ? '1px solid rgba(244,236,219,.05)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: catColor[s.verdict_category as keyof typeof catColor] ?? '#ccc',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.82rem',
                      fontWeight: 600,
                      color: catColor[s.verdict_category as keyof typeof catColor],
                      marginBottom: '.1rem',
                    }}
                  >
                    {catLabel[s.verdict_category as keyof typeof catLabel]} · {s.verdict_score}/10
                  </div>
                  {s.verdict_summary && (
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.8rem',
                        color: 'rgba(244,236,219,.5)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s.verdict_summary}
                    </div>
                  )}
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'rgba(244,236,219,.04)',
        border: '1px solid rgba(244,236,219,.1)',
        borderRadius: 14,
        padding: '1.25rem',
      }}
    >
      <SectionLabel>{title}</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.55rem' }}>{children}</div>
    </div>
  )
}

function InfoRow({
  label,
  value,
  valueColor,
}: {
  label: string
  value: string
  valueColor?: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <span
        style={{ fontFamily: 'var(--font-sans)', fontSize: '.8rem', color: 'rgba(244,236,219,.4)' }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.82rem',
          color: valueColor ?? '#F4ECDB',
          fontWeight: 500,
          textAlign: 'right',
          maxWidth: '60%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </span>
    </div>
  )
}

function SectionLabel({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '.72rem',
        fontWeight: 700,
        color: 'rgba(244,236,219,.4)',
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        marginBottom: noMargin ? 0 : '.85rem',
      }}
    >
      {children}
    </div>
  )
}
