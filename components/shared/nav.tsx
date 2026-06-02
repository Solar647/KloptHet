'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Logo } from './logo'
import type { User } from '@supabase/supabase-js'

export function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setDropdownOpen(false)
    router.push(`/${locale}`)
    router.refresh()
  }

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : (user?.email?.charAt(0).toUpperCase() ?? '?')

  const links = [
    { label: t('howItWorks'), href: `/${locale}/#hoe-het-werkt` },
    { label: t('forWho'), href: `/${locale}/voor-wie` },
    { label: t('pricing'), href: `/${locale}/#abonnementen` },
  ]

  return (
    <nav
      aria-label="Hoofdnavigatie"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(0,0,0,.92)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid rgba(244,236,219,.14)' : '1px solid transparent',
        transition: 'all .25s',
      }}
    >
      <div
        style={{
          maxWidth: 1300,
          margin: '0 auto',
          padding: '0 1.5rem',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
        >
          <Logo size={32} />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 800,
              fontSize: '1.2rem',
              color: '#F4ECDB',
              letterSpacing: '-.03em',
            }}
          >
            KloptHet
          </span>
        </Link>

        {/* Links — desktop only */}
        <ul
          className="nav-desktop"
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '0',
            padding: 0,
            margin: 0,
          }}
        >
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  textDecoration: 'none',
                  color: 'rgba(244,236,219,.65)',
                  fontSize: '.88rem',
                  fontWeight: 500,
                  padding: '.45rem 1.1rem',
                  display: 'inline-block',
                  transition: 'color .15s',
                  letterSpacing: '.01em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F4ECDB'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(244,236,219,.65)'
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger — mobile only */}
        <button
          className="nav-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu openen"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#F4ECDB',
            padding: '.5rem',
            display: 'none',
            flexDirection: 'column',
            gap: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              width: 22,
              height: 2,
              background: '#F4ECDB',
              borderRadius: 2,
              transition: 'all .2s',
              transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            }}
          />
          <span
            style={{
              width: 22,
              height: 2,
              background: '#F4ECDB',
              borderRadius: 2,
              opacity: menuOpen ? 0 : 1,
              transition: 'all .2s',
            }}
          />
          <span
            style={{
              width: 22,
              height: 2,
              background: '#F4ECDB',
              borderRadius: 2,
              transition: 'all .2s',
              transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }}
          />
        </button>

        {/* Auth */}
        <div
          className="nav-desktop"
          style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}
        >
          {user ? (
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="Profiel menu"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1B4731 0%, #2A6541 100%)',
                  border: '2px solid rgba(58,172,110,.5)',
                  color: '#F4ECDB',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.88rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'border-color .15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(58,172,110,.9)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(58,172,110,.5)'
                }}
              >
                {initials}
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    background: 'linear-gradient(160deg, #0F1A0E 0%, #0A1508 100%)',
                    border: '1px solid rgba(244,236,219,.16)',
                    borderRadius: 14,
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,.6)',
                    minWidth: 200,
                    zIndex: 100,
                  }}
                >
                  {/* User info */}
                  <div
                    style={{
                      padding: '1rem 1.1rem',
                      borderBottom: '1px solid rgba(244,236,219,.08)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.8rem',
                        color: 'rgba(244,236,219,.45)',
                        marginBottom: '.2rem',
                      }}
                    >
                      Ingelogd als
                    </div>
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
                      {user.email}
                    </div>
                  </div>

                  {/* Menu items */}
                  <div style={{ padding: '.4rem' }}>
                    <DropdownItem
                      href={`/${locale}/dashboard`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <DashboardIcon />
                      Dashboard
                    </DropdownItem>
                    <DropdownItem href={`/${locale}/scan`} onClick={() => setDropdownOpen(false)}>
                      <ScanIcon />
                      Bericht controleren
                    </DropdownItem>
                    <DropdownItem
                      href={`/${locale}/instellingen`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <SettingsIcon />
                      Instellingen
                    </DropdownItem>

                    <div
                      style={{ height: 1, background: 'rgba(244,236,219,.08)', margin: '.4rem 0' }}
                    />

                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '.6rem .75rem',
                        borderRadius: 8,
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(244,236,219,.55)',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.88rem',
                        transition: 'background .15s, color .15s',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(229,83,42,.1)'
                        e.currentTarget.style.color = '#E5532A'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'rgba(244,236,219,.55)'
                      }}
                    >
                      <LogoutIcon />
                      Uitloggen
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href={`/${locale}/inloggen`}
                style={{
                  color: 'rgba(244,236,219,.85)',
                  fontSize: '.92rem',
                  fontWeight: 500,
                  background: 'transparent',
                  padding: '.55rem .9rem',
                  borderRadius: 9999,
                  textDecoration: 'none',
                }}
              >
                {t('login')}
              </Link>
              <Link
                href={`/${locale}/registreren`}
                style={{
                  background: '#F4ECDB',
                  color: '#07190F',
                  padding: '.65rem 1.2rem',
                  borderRadius: 9999,
                  fontSize: '.9rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  border: '2px solid #F4ECDB',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('register')}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(7,25,15,.97)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(244,236,219,.1)',
            padding: '1rem 1.5rem 1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '.25rem',
              marginBottom: '1rem',
            }}
          >
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'rgba(244,236,219,.8)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  padding: '.8rem 0',
                  borderBottom: '1px solid rgba(244,236,219,.06)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <Link
                href={`/${locale}/dashboard`}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#F4ECDB',
                  color: '#07190F',
                  padding: '.9rem',
                  borderRadius: 12,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.95rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Dashboard →
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(244,236,219,.2)',
                  color: 'rgba(244,236,219,.6)',
                  padding: '.9rem',
                  borderRadius: 12,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.95rem',
                  cursor: 'pointer',
                }}
              >
                Uitloggen
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <Link
                href={`/${locale}/registreren`}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#F4ECDB',
                  color: '#07190F',
                  padding: '.9rem',
                  borderRadius: 12,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.95rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                {t('register')}
              </Link>
              <Link
                href={`/${locale}/inloggen`}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: '1px solid rgba(244,236,219,.2)',
                  color: 'rgba(244,236,219,.8)',
                  padding: '.9rem',
                  borderRadius: 12,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {t('login')}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

function DropdownItem({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '.6rem .75rem',
        borderRadius: 8,
        color: 'rgba(244,236,219,.75)',
        textDecoration: 'none',
        fontFamily: 'var(--font-sans)',
        fontSize: '.88rem',
        transition: 'background .15s, color .15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(244,236,219,.08)'
        e.currentTarget.style.color = '#F4ECDB'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = 'rgba(244,236,219,.75)'
      }}
    >
      {children}
    </Link>
  )
}

function DashboardIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}
function ScanIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
function SettingsIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}
function LogoutIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}
