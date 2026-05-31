'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

type User = {
  id: string
  email: string
  full_name: string | null
  created_at: string
}

type Sub = {
  user_id: string
  tier: string
  status: string
  current_period_end: string | null
}

type Session = {
  user_agent: string
  ip: string
  created_at: string
}

type Props = {
  users: User[]
  subs: Sub[]
  sessionMap: Record<string, Session[]>
}

const tierColor: Record<string, string> = {
  free: 'rgba(244,236,219,.35)',
  standard: '#3AAC6E',
  family: '#5B8FE8',
  premium: '#D97B2A',
}

function inferBilling(sub: Sub | undefined): 'yearly' | 'monthly' | null {
  if (!sub?.current_period_end) return null
  const daysLeft = (new Date(sub.current_period_end).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  return daysLeft > 180 ? 'yearly' : 'monthly'
}

function parseDevice(ua: string) {
  if (!ua) return null
  const device = /iPhone|iPad|Android/.test(ua) ? 'Mobiel' : 'Desktop'
  const os = /Windows NT 10/.test(ua)
    ? 'Win 10/11'
    : /Windows/.test(ua)
      ? 'Windows'
      : /Mac OS X/.test(ua)
        ? 'macOS'
        : /Android/.test(ua)
          ? 'Android'
          : /iPhone|iPad/.test(ua)
            ? 'iOS'
            : null
  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /Chrome\//.test(ua)
      ? 'Chrome'
      : /Firefox\//.test(ua)
        ? 'Firefox'
        : /Safari\//.test(ua)
          ? 'Safari'
          : null
  return [device, os, browser].filter(Boolean).join(' · ')
}

export function AdminUserList({ users, subs, sessionMap }: Props) {
  const router = useRouter()
  const locale = useLocale()

  return (
    <div>
      {users.map((u, i) => {
        const sub = subs.find((s) => s.user_id === u.id)
        const billing = inferBilling(sub)
        const latestSession = sessionMap[u.id]?.[0]
        const deviceStr = latestSession ? parseDevice(latestSession.user_agent) : null

        return (
          <div
            key={u.id}
            onClick={() => router.push(`/${locale}/admin/gebruiker/${u.id}`)}
            style={{
              padding: '.8rem 1.5rem',
              borderBottom: i < users.length - 1 ? '1px solid rgba(244,236,219,.05)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              cursor: 'pointer',
              transition: 'background .15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(244,236,219,.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'rgba(58,172,110,.12)',
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
                {u.email}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  marginTop: 2,
                  flexWrap: 'wrap',
                }}
              >
                {u.full_name && (
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.72rem',
                      color: 'rgba(244,236,219,.35)',
                    }}
                  >
                    {u.full_name.slice(0, 20)}
                    {u.full_name.length > 20 ? '…' : ''}
                  </span>
                )}
                {deviceStr && (
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.68rem',
                      color: 'rgba(244,236,219,.22)',
                    }}
                  >
                    · {deviceStr}
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              {billing && (
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.65rem',
                    fontWeight: 700,
                    color: billing === 'yearly' ? '#3AAC6E' : 'rgba(244,236,219,.35)',
                    background:
                      billing === 'yearly' ? 'rgba(58,172,110,.1)' : 'rgba(244,236,219,.05)',
                    padding: '.15rem .5rem',
                    borderRadius: 9999,
                    border: `1px solid ${billing === 'yearly' ? 'rgba(58,172,110,.25)' : 'rgba(244,236,219,.1)'}`,
                  }}
                >
                  {billing === 'yearly' ? 'jaar' : 'mnd'}
                </span>
              )}
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.7rem',
                  fontWeight: 700,
                  color: tierColor[sub?.tier ?? 'free'],
                  textTransform: 'uppercase',
                  letterSpacing: '.04em',
                }}
              >
                {sub?.tier ?? 'free'}
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.72rem',
                  color: 'rgba(244,236,219,.3)',
                  minWidth: 70,
                  textAlign: 'right',
                }}
              >
                {new Date(u.created_at).toLocaleDateString('nl-NL', {
                  day: 'numeric',
                  month: 'short',
                  year: '2-digit',
                })}
              </div>
              <span style={{ color: 'rgba(244,236,219,.2)', fontSize: '.8rem' }}>›</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
