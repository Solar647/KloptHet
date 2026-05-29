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
        padding: '2.5rem 2.25rem 2rem',
        boxShadow: '0 30px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(168,203,160,.05) inset',
        color: '#F4ECDB',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
        <Logo size={30} />
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
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
          fontSize: '1.85rem',
          letterSpacing: '-.02em',
          marginBottom: '.4rem',
          lineHeight: 1.1,
          margin: '0 0 .4rem',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: '.88rem',
          color: 'rgba(244,236,219,.5)',
          marginBottom: '1.75rem',
          margin: '0 0 1.75rem',
        }}
      >
        {subtitle}
      </p>

      {children}
    </div>
  )
}
