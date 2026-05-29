'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Logo } from './logo'

export function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t('howItWorks'), href: `/${locale}/#hoe-het-werkt` },
    { label: t('forWho'), href: `/${locale}/#voor-wie` },
    { label: t('pricing'), href: `/${locale}/#abonnementen` },
  ]

  return (
    <nav
      aria-label="Hoofdnavigatie"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(7,25,15,.82)' : 'rgba(7,25,15,.40)',
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
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
          }}
        >
          <Logo size={32} />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '1.15rem',
              color: '#F4ECDB',
              letterSpacing: '-.025em',
            }}
          >
            Klopt Het
          </span>
        </Link>

        {/* Links */}
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '.25rem',
            padding: '4px',
            margin: 0,
            background: 'rgba(244,236,219,.06)',
            border: '1px solid rgba(244,236,219,.14)',
            borderRadius: 9999,
          }}
        >
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  textDecoration: 'none',
                  color: 'rgba(244,236,219,.80)',
                  fontSize: '.88rem',
                  fontWeight: 500,
                  padding: '.45rem .95rem',
                  borderRadius: 9999,
                  display: 'inline-block',
                  transition: 'background .15s, color .15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(244,236,219,.10)'
                  e.currentTarget.style.color = '#F4ECDB'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(244,236,219,.80)'
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
          <Link
            href={`/${locale}/inloggen`}
            style={{
              color: 'rgba(244,236,219,.85)',
              fontSize: '.92rem',
              fontWeight: 500,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
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
        </div>
      </div>
    </nav>
  )
}
