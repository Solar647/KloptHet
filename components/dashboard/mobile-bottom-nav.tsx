'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import {
  GridIcon,
  SearchIcon,
  HistoryIcon,
  FamilyNavIcon,
  SettingsNavIcon,
} from '@/components/shared/icons'

const navItems = [
  { id: 'dashboard', label: 'Overzicht', Icon: GridIcon, path: '/dashboard' },
  { id: 'scan', label: 'Controleer', Icon: SearchIcon, path: '/scan' },
  { id: 'geschiedenis', label: 'Geschiedenis', Icon: HistoryIcon, path: '/geschiedenis' },
  { id: 'familie', label: 'Familie', Icon: FamilyNavIcon, path: '/familie' },
  { id: 'instellingen', label: 'Instellingen', Icon: SettingsNavIcon, path: '/instellingen' },
]

export function MobileBottomNav() {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <nav
      aria-label="Mobiele navigatie"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(7,25,15,.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(244,236,219,.1)',
        display: 'flex',
        paddingBottom: 'env(safe-area-inset-bottom)',
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
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: '.65rem .25rem',
              color: isActive ? '#3AAC6E' : 'rgba(244,236,219,.45)',
              textDecoration: 'none',
              transition: 'color .15s',
            }}
          >
            <item.Icon size={20} strokeWidth={isActive ? 2 : 1.6} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.6rem',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '.02em',
              }}
            >
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
