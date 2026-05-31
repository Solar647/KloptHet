import { Logo } from '@/components/shared/logo'

type Props = {
  title: string
  subtitle: string
  children: React.ReactNode
}

export function AuthCard({ title, subtitle, children }: Props) {
  return (
    <div
      style={{
        background: 'linear-gradient(160deg, #0F0F0F 0%, #0A1A0E 100%)',
        border: '1px solid rgba(244,236,219,.18)',
        borderRadius: 20,
        padding: '1.75rem 2rem 1.5rem',
        boxShadow: '0 30px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(168,203,160,.05) inset',
        color: '#F4ECDB',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
        <Logo size={26} />
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '.95rem',
            fontWeight: 600,
            letterSpacing: '-.01em',
          }}
        >
          KloptHet
        </span>
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 500,
          fontSize: '1.55rem',
          letterSpacing: '-.02em',
          margin: '0 0 .3rem',
          lineHeight: 1.1,
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: '.82rem', color: 'rgba(244,236,219,.5)', margin: '0 0 1.25rem' }}>
        {subtitle}
      </p>

      {children}
    </div>
  )
}
