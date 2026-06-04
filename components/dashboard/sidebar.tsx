'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Logo } from '@/components/shared/logo'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  GridIcon,
  SearchIcon,
  HistoryIcon,
  TrainingIcon,
  FamilyNavIcon,
  SettingsNavIcon,
  LogoutNavIcon,
  BadgeIcon,
} from '@/components/shared/icons'

const navItems = [
  { id: 'dashboard', label: 'Overzicht', Icon: GridIcon, path: '/dashboard' },
  { id: 'scan', label: 'Bericht controleren', Icon: SearchIcon, path: '/scan' },
  { id: 'geschiedenis', label: 'Geschiedenis', Icon: HistoryIcon, path: '/geschiedenis' },
  { id: 'training', label: 'Training', Icon: TrainingIcon, path: '/training' },
  { id: 'familie', label: 'Familie', Icon: FamilyNavIcon, path: '/familie' },
  { id: 'abonnement', label: 'Abonnement', Icon: BadgeIcon, path: '/abonnement' },
  { id: 'instellingen', label: 'Instellingen', Icon: SettingsNavIcon, path: '/instellingen' },
]

const tierLabel: Record<string, string> = {
  free: 'Gratis',
  standard: 'Standaard',
  family: 'Familie',
  premium: 'Premium',
}

const tierColor: Record<string, string> = {
  free: 'rgba(244,236,219,.35)',
  standard: '#3AAC6E',
  family: '#5B8FE8',
  premium: '#D97B2A',
}

const ADMIN_EMAIL = 'oscar1056gm@gmail.com'

export function Sidebar() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [tier, setTier] = useState('free')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [badges, setBadges] = useState<Record<string, number>>({})
  const [fadingBadges, setFadingBadges] = useState<Set<string>>(new Set())

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      setIsAdmin(data.user.email === ADMIN_EMAIL)
      setUserEmail(data.user.email ?? '')
      setUserName(data.user.user_metadata?.full_name ?? '')

      const [{ data: sub }, { data: profile }, { count: scanCount }, { count: familyCount }] =
        await Promise.all([
          supabase.from('subscriptions').select('tier').eq('user_id', data.user.id).single(),
          supabase.from('profiles').select('avatar_url').eq('id', data.user.id).single(),
          supabase
            .from('scans')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', data.user.id),
          supabase
            .from('family_members')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', data.user.id)
            .eq('status', 'active'),
        ])
      if (sub) setTier(sub.tier)
      if (profile?.avatar_url) setAvatarUrl(profile.avatar_url)

      // Badge berekening via localStorage
      const stored = JSON.parse(localStorage.getItem('kh_seen') ?? '{}')
      const newBadges: Record<string, number> = {}
      let changed = false

      const currentScans = scanCount ?? 0
      const currentFamily = familyCount ?? 0

      if (stored.scans === undefined) {
        // Eerste keer: sla huidige staat op als baseline
        stored.scans = currentScans
        stored.family = currentFamily
        changed = true
      } else {
        if (currentScans > stored.scans)
          newBadges.geschiedenis = Math.min(currentScans - stored.scans, 9)
        if (currentFamily > stored.family)
          newBadges.familie = Math.min(currentFamily - (stored.family ?? 0), 9)
      }

      if (changed) localStorage.setItem('kh_seen', JSON.stringify(stored))
      setBadges(newBadges)
    })

    const onScanDone = () => {
      setBadges((prev) => ({
        ...prev,
        geschiedenis: Math.min((prev.geschiedenis ?? 0) + 1, 9),
      }))
    }
    window.addEventListener('kh:scan_done', onScanDone)
    return () => window.removeEventListener('kh:scan_done', onScanDone)
  }, [])

  const clearBadge = (tabId: string, tabPath: string) => {
    if (!badges[tabId]) return
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      const stored = JSON.parse(localStorage.getItem('kh_seen') ?? '{}')
      if (tabId === 'geschiedenis') {
        const { count } = await supabase
          .from('scans')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', data.user.id)
        stored.scans = count ?? 0
      }
      if (tabId === 'familie') {
        const { count } = await supabase
          .from('family_members')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', data.user.id)
          .eq('status', 'active')
        stored.family = count ?? 0
      }
      localStorage.setItem('kh_seen', JSON.stringify(stored))
      setFadingBadges((prev) => new Set(prev).add(tabId))
      setTimeout(() => {
        setBadges((prev) => {
          const n = { ...prev }
          delete n[tabId]
          return n
        })
        setFadingBadges((prev) => {
          const n = new Set(prev)
          n.delete(tabId)
          return n
        })
      }, 400)
    })
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push(`/${locale}`)
  }

  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const initials = userName
    ? userName
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : userEmail.charAt(0).toUpperCase()

  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        background: '#000',
        borderRight: '1px solid rgba(244,236,219,.1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '1.25rem 1.25rem .85rem',
          borderBottom: '1px solid rgba(244,236,219,.07)',
        }}
      >
        <Link
          href={`/${locale}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
        >
          <Logo size={24} />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 800,
              fontSize: '.95rem',
              color: '#F4ECDB',
            }}
          >
            KloptHet
          </span>
        </Link>
      </div>

      {/* Gebruikersprofiel */}
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(244,236,219,.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(30,80,180,.2)',
              border: '1.5px solid rgba(30,80,180,.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '.85rem',
              color: 'rgba(100,160,255,.9)',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Profielfoto"
                unoptimized
                width={34}
                height={34}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            ) : (
              initials
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            {userName && (
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.82rem',
                  fontWeight: 600,
                  color: '#F4ECDB',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {userName.slice(0, 18)}
              </div>
            )}
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.7rem',
                color: 'rgba(244,236,219,.35)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {userEmail}
            </div>
          </div>
        </div>

        {/* Abonnement badge */}
        <div style={{ marginTop: '.65rem' }}>
          <Link
            href={`/${locale}/abonnement`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              background: `${tierColor[tier]}14`,
              border: `1px solid ${tierColor[tier]}30`,
              borderRadius: 9999,
              padding: '.2rem .65rem',
              textDecoration: 'none',
              transition: 'all .15s',
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: tierColor[tier],
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.68rem',
                fontWeight: 700,
                color: tierColor[tier],
                letterSpacing: '.04em',
                textTransform: 'uppercase',
              }}
            >
              {tierLabel[tier] ?? tier}
            </span>
          </Link>
        </div>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: '.75rem .75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflowY: 'auto',
        }}
      >
        {navItems.map((item) => {
          const href = `/${locale}${item.path}`
          const isActive = pathname.includes(item.path)
          const badgeCount = badges[item.id] ?? 0
          return (
            <Link
              key={item.id}
              href={href}
              prefetch={true}
              onMouseEnter={() => {
                setHoveredId(item.id)
                clearBadge(item.id, item.path)
                router.prefetch(href)
              }}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '.65rem .85rem',
                background: isActive
                  ? 'rgba(244,236,219,.08)'
                  : hoveredId === item.id
                    ? 'rgba(244,236,219,.05)'
                    : 'transparent',
                border: `1px solid ${isActive ? 'rgba(244,236,219,.14)' : hoveredId === item.id ? 'rgba(244,236,219,.08)' : 'transparent'}`,
                color: isActive
                  ? '#F4ECDB'
                  : hoveredId === item.id
                    ? 'rgba(244,236,219,.85)'
                    : 'rgba(244,236,219,.5)',
                borderRadius: 10,
                cursor: 'pointer',
                fontSize: '.85rem',
                fontWeight: isActive ? 600 : hoveredId === item.id ? 500 : 400,
                fontFamily: 'var(--font-sans)',
                textDecoration: 'none',
                transition: 'color .12s, background .12s, border-color .12s',
                position: 'relative',
              }}
            >
              <item.Icon size={15} strokeWidth={isActive || hoveredId === item.id ? 2 : 1.6} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {badgeCount > 0 && (
                <span
                  style={{
                    background: '#E5532A',
                    color: '#fff',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.6rem',
                    fontWeight: 700,
                    lineHeight: 1,
                    minWidth: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px',
                    flexShrink: 0,
                    opacity: fadingBadges.has(item.id) ? 0 : 1,
                    transform: fadingBadges.has(item.id) ? 'scale(.6)' : 'scale(1)',
                    transition: 'opacity .35s ease, transform .35s ease',
                  }}
                >
                  {badgeCount === 9 ? '9+' : badgeCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Onderste sectie */}
      <div
        style={{
          padding: '.75rem .75rem 1.25rem',
          borderTop: '1px solid rgba(244,236,219,.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* Hulp */}
        <Link
          href={`/${locale}/contact?from=dashboard`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '.6rem .85rem',
            borderRadius: 10,
            background: 'rgba(30,80,180,.07)',
            border: '1px solid rgba(30,80,180,.15)',
            color: 'rgba(100,160,255,.75)',
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
            fontSize: '.82rem',
            fontWeight: 500,
            transition: 'all .15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(30,80,180,.13)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(30,80,180,.07)'
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
          </svg>
          Hulp nodig?
        </Link>

        {isAdmin && (
          <Link
            href={`/${locale}/admin`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '.6rem .85rem',
              borderRadius: 10,
              background: pathname.includes('/admin') ? 'rgba(229,83,42,.1)' : 'transparent',
              color: 'rgba(229,83,42,.7)',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '.82rem',
              fontWeight: 600,
              transition: 'all .15s',
            }}
          >
            <span style={{ fontSize: '.68rem' }}>⚙</span>
            Admin
          </Link>
        )}

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '.6rem .85rem',
            background: 'transparent',
            border: 'none',
            color: 'rgba(244,236,219,.35)',
            borderRadius: 10,
            cursor: 'pointer',
            fontSize: '.82rem',
            fontFamily: 'var(--font-sans)',
            transition: 'color .15s',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(244,236,219,.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(244,236,219,.35)'
          }}
        >
          <LogoutNavIcon size={14} strokeWidth={1.7} />
          Uitloggen
        </button>
      </div>
    </aside>
  )
}
