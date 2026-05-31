'use client'

import { useState } from 'react'

type Props = {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  autoComplete?: string
}

export function AuthField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  autoComplete,
}: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div style={{ marginBottom: '.65rem' }}>
      <label
        style={{
          display: 'block',
          fontSize: '.72rem',
          fontWeight: 600,
          marginBottom: 4,
          color: 'rgba(244,236,219,.65)',
          letterSpacing: '.02em',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          style={{
            width: '100%',
            padding: isPassword ? '.65rem 2.5rem .65rem .9rem' : '.65rem .9rem',
            background: 'rgba(244,236,219,.05)',
            border: '1px solid rgba(244,236,219,.14)',
            borderRadius: 9,
            color: '#F4ECDB',
            fontSize: '.95rem',
            fontFamily: 'var(--font-sans)',
            outline: 'none',
            transition: 'border-color .15s',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(58,172,110,.7)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(244,236,219,.14)'
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(244,236,219,.45)',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              transition: 'color .15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(244,236,219,.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(244,236,219,.45)'
            }}
            aria-label={showPassword ? 'Wachtwoord verbergen' : 'Wachtwoord tonen'}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    </div>
  )
}

function EyeIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  )
}
