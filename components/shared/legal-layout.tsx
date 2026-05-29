import Link from 'next/link'
import { Nav } from './nav'
import { Footer } from './footer'

type Props = {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalLayout({ title, lastUpdated, children }: Props) {
  return (
    <>
      <Nav />
      <main id="main" style={{ flex: 1 }}>
        <div
          style={{
            maxWidth: 780,
            margin: '0 auto',
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 3vw, 3rem)',
          }}
        >
          <div style={{ marginBottom: '3rem' }}>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                color: '#F4ECDB',
                margin: '0 0 .5rem',
                letterSpacing: '-.03em',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.85rem',
                color: 'rgba(244,236,219,.4)',
                margin: 0,
              }}
            >
              Laatst bijgewerkt: {lastUpdated}
            </p>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'rgba(244,236,219,.82)',
            }}
          >
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 500,
          fontSize: '1.35rem',
          color: '#F4ECDB',
          margin: '0 0 .85rem',
          letterSpacing: '-.01em',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: '0 0 1rem', color: 'rgba(244,236,219,.75)', lineHeight: 1.8 }}>
      {children}
    </p>
  )
}

export function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul
      style={{
        margin: '0 0 1rem',
        paddingLeft: '1.5rem',
        color: 'rgba(244,236,219,.75)',
        display: 'flex',
        flexDirection: 'column',
        gap: '.35rem',
      }}
    >
      {children}
    </ul>
  )
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ color: '#3AAC6E', textDecoration: 'none' }}>
      {children}
    </Link>
  )
}
