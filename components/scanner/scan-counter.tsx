'use client'

import { useState, useEffect } from 'react'

export function ScanCounter({ initial, limit }: { initial: number; limit: number }) {
  const [left, setLeft] = useState(initial)

  useEffect(() => {
    const onScan = () => setLeft((n) => Math.max(0, n - 1))
    window.addEventListener('kh:scan_done', onScan)
    return () => window.removeEventListener('kh:scan_done', onScan)
  }, [])

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        marginTop: '1rem',
        background: left === 0 ? 'rgba(229,83,42,.08)' : 'rgba(244,236,219,.06)',
        border: `1px solid ${left === 0 ? 'rgba(229,83,42,.25)' : 'rgba(244,236,219,.14)'}`,
        borderRadius: 9999,
        padding: '.35rem 1rem',
        transition: 'all .3s',
      }}
    >
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: i < left ? '#3AAC6E' : 'rgba(244,236,219,.2)',
              transition: 'background .4s ease',
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.78rem',
          fontWeight: 600,
          color: left === 0 ? '#E5532A' : 'rgba(244,236,219,.7)',
          transition: 'color .3s',
        }}
      >
        {left === 0
          ? 'Gratis controles op'
          : `${left} van ${limit} gratis ${left === 1 ? 'controle' : 'controles'} over`}
      </span>
    </div>
  )
}
