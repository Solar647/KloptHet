'use client'

import type { CSSProperties, ReactNode } from 'react'

type DoodleType =
  | 'squiggle'
  | 'arrow'
  | 'spark'
  | 'star'
  | 'spiral'
  | 'asterisk'
  | 'circle'
  | 'heart'
  | 'waves'
  | 'lightning'
  | 'flower'
  | 'crown'
  | 'diamond'
  | 'note'
  | 'zigzag'
  | 'check'
  | 'refresh'

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

const paths: Record<DoodleType, ReactNode> = {
  squiggle: <path d="M2 14 C 10 2, 18 26, 26 14 C 34 2, 42 26, 50 14" {...S} strokeWidth="2.4" />,
  arrow: (
    <path d="M3 30 C 18 8, 34 8, 45 22 M45 22 L34 20 M45 22 L40 33" {...S} strokeWidth="2.4" />
  ),
  spark: (
    <path
      d="M16 2 C 18 12, 20 14, 30 16 C 20 18, 18 20, 16 30 C 14 20, 12 18, 2 16 C 12 14, 14 12, 16 2 Z"
      {...S}
      strokeWidth="2.2"
    />
  ),
  star: (
    <path
      d="M16 3 l3.6 8 8.4 1-6 6 1.5 8.5L16 23l-7.5 3.5L10 18l-6-6 8.4-1z"
      {...S}
      strokeWidth="2.2"
    />
  ),
  spiral: (
    <path
      d="M18 18 m0 0 a4 4 0 1 1 -4 4 a8 8 0 1 0 8 -8 a12 12 0 1 0 12 12"
      {...S}
      strokeWidth="2.2"
    />
  ),
  asterisk: <path d="M16 3v26M5 8l22 16M27 8L5 24" {...S} strokeWidth="2.6" />,
  circle: (
    <path
      d="M28 16 C 28 8, 22 3, 15 4 C 7 5, 3 12, 5 19 C 7 26, 16 30, 23 26 C 27 24, 29 20, 28 17"
      {...S}
      strokeWidth="2.2"
    />
  ),
  heart: (
    <path
      d="M16 27 C 3 18, 4 7, 11 7 C 15 7, 16 11, 16 13 C 16 11, 17 7, 21 7 C 28 7, 29 18, 16 27 Z"
      {...S}
      strokeWidth="2.2"
    />
  ),
  waves: (
    <>
      <path d="M3 8 q 4 -5 8 0 t 8 0 t 8 0" {...S} strokeWidth="2.2" />
      <path d="M3 14 q 4 -5 8 0 t 8 0 t 8 0" {...S} strokeWidth="2.2" />
      <path d="M3 20 q 4 -5 8 0 t 8 0 t 8 0" {...S} strokeWidth="2.2" />
    </>
  ),
  lightning: <path d="M18 2 L7 18 H14 L12 30 L25 12 H17 L18 2 Z" {...S} strokeWidth="2.2" />,
  flower: (
    <>
      <path
        d="M16 16 m0 -10 a5 5 0 0 1 0 10 a5 5 0 0 1 0 -10
           M16 16 m10 0 a5 5 0 0 1 -10 0 a5 5 0 0 1 10 0
           M16 16 m0 10 a5 5 0 0 1 0 -10 a5 5 0 0 1 0 10
           M16 16 m-10 0 a5 5 0 0 1 10 0 a5 5 0 0 1 -10 0"
        {...S}
        strokeWidth="2"
      />
      <circle cx="16" cy="16" r="2.5" {...S} strokeWidth="2" />
    </>
  ),
  crown: <path d="M4 25 L6 9 L13 17 L16 6 L19 17 L26 9 L28 25 Z" {...S} strokeWidth="2.2" />,
  diamond: (
    <path
      d="M10 4 H22 L29 13 L16 29 L3 13 Z M3 13 H29 M10 4 L16 13 L22 4 M16 13 L16 29"
      {...S}
      strokeWidth="1.8"
    />
  ),
  note: (
    <>
      <path d="M11 5 L24 2 V19 M11 5 V23" {...S} strokeWidth="2.2" />
      <ellipse cx="7.5" cy="23" rx="4" ry="3" {...S} strokeWidth="2.2" />
      <ellipse cx="20.5" cy="19" rx="4" ry="3" {...S} strokeWidth="2.2" />
    </>
  ),
  zigzag: (
    <path
      d="M3 26 L9 15 L14 21 L20 9 L26 15 L29 6 M29 6 L22 7 M29 6 L28 14"
      {...S}
      strokeWidth="2.4"
    />
  ),
  check: <path d="M4 17 L12 25 L28 6" {...S} strokeWidth="2.6" />,
  refresh: <path d="M27 16 a11 11 0 1 1 -3.5 -8 M27 4 V11 H20" {...S} strokeWidth="2.2" />,
}

const viewBoxes: Record<DoodleType, string> = {
  squiggle: '0 0 52 28',
  arrow: '0 0 48 40',
  spark: '0 0 32 32',
  star: '0 0 32 32',
  spiral: '0 0 40 40',
  asterisk: '0 0 32 32',
  circle: '0 0 32 32',
  heart: '0 0 32 30',
  waves: '0 0 30 24',
  lightning: '0 0 30 32',
  flower: '0 0 32 32',
  crown: '0 0 32 30',
  diamond: '0 0 32 32',
  note: '0 0 28 28',
  zigzag: '0 0 32 32',
  check: '0 0 32 32',
  refresh: '0 0 32 32',
}

// Lange horizontale lijnen over de volledige breedte — subtiele achtergrondstructuur
export function BgLines({
  color = 'rgba(26,26,24,.06)',
  gap = 130,
}: {
  color?: string
  gap?: number
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent ${gap - 1}px, ${color} ${gap - 1}px, ${color} ${gap}px)`,
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    />
  )
}

// Pill-label tag (Kinetic-stijl) — kleine afgeronde tag met groene stip
export function PillLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '.42rem .9rem',
        borderRadius: 9999,
        border: `1px solid ${dark ? 'rgba(255,255,255,.2)' : 'rgba(26,26,24,.18)'}`,
        background: dark ? 'rgba(255,255,255,.05)' : 'rgba(26,26,24,.03)',
        fontFamily: 'var(--font-sans)',
        fontSize: '.72rem',
        fontWeight: 600,
        letterSpacing: '.02em',
        color: dark ? 'rgba(255,255,255,.8)' : 'rgba(26,26,24,.7)',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#3AAC6E',
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  )
}

export function Doodle({
  type,
  size = 40,
  color = 'rgba(255,255,255,.1)',
  style,
}: {
  type: DoodleType
  size?: number
  color?: string
  style?: CSSProperties
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBoxes[type]}
      width={size}
      height={size}
      style={{
        position: 'absolute',
        color,
        pointerEvents: 'none',
        overflow: 'visible',
        ...style,
      }}
    >
      {paths[type]}
    </svg>
  )
}
