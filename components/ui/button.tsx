'use client'

import { type CSSProperties, type ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'green'
type Size = 'sm' | 'md' | 'lg'

type Props = {
  children: ReactNode
  variant?: Variant
  size?: Size
  onClick?: () => void
  href?: string
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  className?: string
}

const base: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  borderRadius: 12,
  fontFamily: 'var(--font-sans)',
  fontWeight: 700,
  cursor: 'pointer',
  border: 'none',
  textDecoration: 'none',
  transition: 'opacity .15s, transform .15s, background .15s',
  whiteSpace: 'nowrap',
}

const variants: Record<Variant, CSSProperties> = {
  primary: {
    background: '#F4ECDB',
    color: '#07190F',
  },
  green: {
    background: '#3AAC6E',
    color: '#07190F',
    boxShadow: '0 8px 24px rgba(58,172,110,.2)',
  },
  secondary: {
    background: 'rgba(244,236,219,.08)',
    color: '#F4ECDB',
    border: '1px solid rgba(244,236,219,.18)',
  },
  ghost: {
    background: 'transparent',
    color: 'rgba(244,236,219,.75)',
    border: '1px solid rgba(244,236,219,.2)',
  },
  danger: {
    background: 'rgba(229,83,42,.15)',
    color: '#E5532A',
    border: '1px solid rgba(229,83,42,.25)',
  },
}

const sizes: Record<Size, CSSProperties> = {
  sm: { padding: '.55rem 1rem', fontSize: '.85rem', borderRadius: 10 },
  md: { padding: '.8rem 1.4rem', fontSize: '.95rem' },
  lg: { padding: '1rem 1.75rem', fontSize: '1rem' },
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  loading,
  type = 'button',
  fullWidth,
}: Props) {
  const style: CSSProperties = {
    ...base,
    ...variants[variant],
    ...sizes[size],
    ...(fullWidth ? { width: '100%' } : {}),
    opacity: disabled || loading ? 0.6 : 1,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      onMouseEnter={(e) => {
        if (!disabled && !loading) e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {loading ? 'Bezig…' : children}
    </button>
  )
}
