'use client'

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
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        style={{
          display: 'block',
          fontSize: '.75rem',
          fontWeight: 600,
          marginBottom: 6,
          color: 'rgba(244,236,219,.65)',
          letterSpacing: '.02em',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        style={{
          width: '100%',
          padding: '.8rem 1rem',
          background: 'rgba(244,236,219,.05)',
          border: '1px solid rgba(244,236,219,.14)',
          borderRadius: 10,
          color: '#F4ECDB',
          fontSize: '1rem',
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
    </div>
  )
}
