'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Logo } from './logo'

export function Footer() {
  const locale = useLocale()

  const columns = [
    {
      title: 'Product',
      links: [
        { label: 'Hoe het werkt', href: `/${locale}/#hoe-het-werkt` },
        { label: 'Voor wie', href: `/${locale}/#voor-wie` },
        { label: 'Abonnementen', href: `/${locale}/#abonnementen` },
        { label: 'Voorbeelden', href: `/${locale}/voorbeelden` },
      ],
    },
    {
      title: 'Bedrijf',
      links: [
        { label: 'Over ons', href: `/${locale}/over-ons` },
        { label: 'Blog', href: `/${locale}/blog` },
        { label: 'Contact', href: `/${locale}/contact` },
      ],
    },
    {
      title: 'Juridisch',
      links: [
        { label: 'Privacyverklaring', href: `/${locale}/privacy` },
        { label: 'Algemene Voorwaarden', href: `/${locale}/voorwaarden` },
        { label: 'Cookies', href: `/${locale}/cookies` },
        { label: 'Impressum', href: `/${locale}/impressum` },
      ],
    },
  ]

  return (
    <footer
      style={{
        background: '#07190F',
        borderTop: '1px solid rgba(244,236,219,.1)',
        padding: '3.5rem clamp(1.5rem, 3vw, 3rem) 2rem',
        color: 'rgba(244,236,219,.6)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          className="grid-responsive"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: '1rem',
              }}
            >
              <Logo size={28} />
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: '#F4ECDB',
                  letterSpacing: '-.03em',
                }}
              >
                KloptHet
              </span>
            </div>
            <p
              style={{
                fontSize: '.92rem',
                lineHeight: 1.7,
                maxWidth: 300,
                fontFamily: 'var(--font-sans)',
                margin: 0,
              }}
            >
              Bescherming tegen WhatsApp- en sms-fraude, in gewone taal. Voor families en ouderen in
              Nederland.
            </p>
            <p
              style={{
                fontSize: '.82rem',
                fontStyle: 'italic',
                color: 'rgba(244,236,219,.4)',
                marginTop: '1rem',
                fontFamily: 'var(--font-serif)',
              }}
            >
              Twijfelen is slim. Wij helpen u zeker te weten.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontSize: '.72rem',
                  fontWeight: 700,
                  color: '#3AAC6E',
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {col.title}
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.55rem',
                }}
              >
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        color: 'rgba(244,236,219,.55)',
                        textDecoration: 'none',
                        fontSize: '.9rem',
                        fontFamily: 'var(--font-sans)',
                        transition: 'color .15s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#F4ECDB'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(244,236,219,.55)'
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(244,236,219,.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '.8rem',
            color: 'rgba(244,236,219,.35)',
            flexWrap: 'wrap',
            gap: '.5rem',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <div>© 2026 KloptHet. Gemaakt in Nederland.</div>
          <div>KvK-nummer · BTW-nummer</div>
        </div>
      </div>
    </footer>
  )
}
