import Link from 'next/link'
import { Logo } from '@/components/shared/logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        position: 'relative',
      }}
    >
      {/* Soft center glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(27,71,49,.45) 0%, transparent 70%)',
        }}
      />

      {/* Logo link back to home */}
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
          marginBottom: '2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Logo size={30} />
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
      </Link>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 460 }}>
        {children}
      </div>
    </div>
  )
}
