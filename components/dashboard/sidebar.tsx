'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Logo } from '@/components/shared/logo'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  GridIcon,
  SearchIcon,
  HistoryIcon,
  TrainingIcon,
  FamilyNavIcon,
  SettingsNavIcon,
  LogoutNavIcon,
} from '@/components/shared/icons'

const navItems = [
  { id: 'dashboard', label: 'Overzicht', Icon: GridIcon, path: '/dashboard' },
  { id: 'scan', label: 'Bericht controleren', Icon: SearchIcon, path: '/scan' },
  { id: 'geschiedenis', label: 'Geschiedenis', Icon: HistoryIcon, path: '/geschiedenis' },
  { id: 'training', label: 'Training', Icon: TrainingIcon, path: '/training' },
  { id: 'familie', label: 'Familie', Icon: FamilyNavIcon, path: '/familie' },
  { id: 'instellingen', label: 'Instellingen', Icon: SettingsNavIcon, path: '/instellingen' },
]

export function Sidebar() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push(`/${locale}`)
  }

  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        background: 'linear-gradient(180deg, #0A1A0E 0%, #071509 100%)',
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
          padding: '1.5rem 1.25rem 1rem',
          borderBottom: '1px solid rgba(244,236,219,.08)',
        }}
      >
        <Link
          href={`/${locale}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
          }}
        >
          <Logo size={26} />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 800,
              fontSize: '1rem',
              color: '#F4ECDB',
            }}
          >
            KloptHet
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: '1rem .75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {navItems.map((item) => {
          const href = `/${locale}${item.path}`
          const isActive = pathname.includes(item.path)
          return (
            <Link
              key={item.id}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '.7rem .85rem',
                background: isActive ? 'rgba(244,236,219,.1)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(244,236,219,.16)' : 'transparent'}`,
                color: isActive ? '#F4ECDB' : 'rgba(244,236,219,.6)',
                borderRadius: 10,
                cursor: 'pointer',
                fontSize: '.88rem',
                fontWeight: isActive ? 600 : 500,
                fontFamily: 'var(--font-sans)',
                textDecoration: 'none',
                transition: 'all .15s',
              }}
            >
              <item.Icon size={16} strokeWidth={1.8} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Uitloggen */}
      <div
        style={{
          padding: '1rem .75rem 1.5rem',
          borderTop: '1px solid rgba(244,236,219,.06)',
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '.7rem .85rem',
            background: 'transparent',
            border: 'none',
            color: 'rgba(244,236,219,.4)',
            borderRadius: 10,
            cursor: 'pointer',
            fontSize: '.85rem',
            fontFamily: 'var(--font-sans)',
            transition: 'color .15s',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(244,236,219,.7)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(244,236,219,.4)'
          }}
        >
          <LogoutNavIcon size={15} strokeWidth={1.8} />
          Uitloggen
        </button>
      </div>
    </aside>
  )
}
