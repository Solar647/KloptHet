'use client'

import { useRouter } from 'next/navigation'
import { Logo } from '@/components/shared/logo'

type Props = {
  title: string
  subtitle: string
  children: React.ReactNode
}

export function AuthCard({ title, subtitle, children }: Props) {
  const router = useRouter()

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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
        <button
          onClick={() => router.back()}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(244,236,219,.4)',
            fontFamily: 'var(--font-sans)',
            fontSize: '.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '.25rem 0',
            transition: 'color .15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(244,236,219,.8)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(244,236,219,.4)'
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Terug
        </button>
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
