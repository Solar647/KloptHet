'use client'

import type { CSSProperties } from 'react'

type DoodleType = 'squiggle' | 'arrow' | 'spark' | 'star' | 'spiral' | 'asterisk' | 'circle'

const paths: Record<DoodleType, React.ReactNode> = {
  squiggle: (
    <path
      d="M2 14 C 10 2, 18 26, 26 14 C 34 2, 42 26, 50 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  ),
  arrow: (
    <path
      d="M3 30 C 18 8, 34 8, 45 22 M45 22 L34 20 M45 22 L40 33"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  spark: (
    <path
      d="M16 2 C 18 12, 20 14, 30 16 C 20 18, 18 20, 16 30 C 14 20, 12 18, 2 16 C 12 14, 14 12, 16 2 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  ),
  star: (
    <path
      d="M16 3 l3.6 8 8.4 1-6 6 1.5 8.5L16 23l-7.5 3.5L10 18l-6-6 8.4-1z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  ),
  spiral: (
    <path
      d="M18 18 m0 0 a4 4 0 1 1 -4 4 a8 8 0 1 0 8 -8 a12 12 0 1 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  ),
  asterisk: (
    <path
      d="M16 3v26M5 8l22 16M27 8L5 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
  ),
  circle: (
    <path
      d="M28 16 C 28 8, 22 3, 15 4 C 7 5, 3 12, 5 19 C 7 26, 16 30, 23 26 C 27 24, 29 20, 28 17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  ),
}

const viewBoxes: Record<DoodleType, string> = {
  squiggle: '0 0 52 28',
  arrow: '0 0 48 40',
  spark: '0 0 32 32',
  star: '0 0 32 32',
  spiral: '0 0 40 40',
  asterisk: '0 0 32 32',
  circle: '0 0 32 32',
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
