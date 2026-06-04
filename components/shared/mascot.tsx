'use client'

import { motion } from 'framer-motion'

type MascotProps = {
  size?: number
  animate?: boolean
  expression?: 'happy' | 'searching' | 'alert'
}

export function Mascot({ size = 120, animate = true, expression = 'happy' }: MascotProps) {
  const s = size
  const eyeColor =
    expression === 'alert' ? '#E5532A' : expression === 'searching' ? '#D97B2A' : '#3AAC6E'

  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.8 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'inline-block', userSelect: 'none' }}
    >
      <motion.svg
        width={s}
        height={s}
        viewBox="0 0 120 120"
        fill="none"
        animate={animate ? { y: [0, -5, 0] } : false}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Schaduw */}
        <ellipse cx="60" cy="112" rx="28" ry="6" fill="rgba(0,0,0,.25)" />

        {/* Lichaam */}
        <ellipse cx="60" cy="78" rx="28" ry="24" fill="#0E1A2B" />
        <ellipse cx="60" cy="78" rx="28" ry="24" fill="url(#bodyGrad)" />

        {/* Vleugels */}
        <path d="M32 72 Q18 80 22 94 Q34 88 38 80Z" fill="#0B1520" />
        <path d="M88 72 Q102 80 98 94 Q86 88 82 80Z" fill="#0B1520" />

        {/* Buik */}
        <ellipse cx="60" cy="84" rx="16" ry="14" fill="rgba(244,236,219,.06)" />
        <ellipse cx="60" cy="84" rx="12" ry="10" fill="rgba(244,236,219,.04)" />

        {/* Hoofd */}
        <circle cx="60" cy="52" r="30" fill="#0E1A2B" />
        <circle cx="60" cy="52" r="30" fill="url(#headGrad)" />

        {/* Oor-tufts */}
        <path d="M40 26 L36 14 L44 22Z" fill="#0E1A2B" />
        <path d="M80 26 L84 14 L76 22Z" fill="#0E1A2B" />
        <path d="M40 26 L37 17 L43 23Z" fill="#1a2e44" />
        <path d="M80 26 L83 17 L77 23Z" fill="#1a2e44" />

        {/* Oog-ringen */}
        <circle cx="46" cy="52" r="13" fill="#071019" />
        <circle cx="74" cy="52" r="13" fill="#071019" />
        <circle cx="46" cy="52" r="11" fill={`${eyeColor}18`} />
        <circle cx="74" cy="52" r="11" fill={`${eyeColor}18`} />
        <circle cx="46" cy="52" r="9" fill="#050d14" />
        <circle cx="74" cy="52" r="9" fill="#050d14" />

        {/* Iris */}
        <circle cx="46" cy="52" r="6" fill={eyeColor} opacity=".9" />
        <circle cx="74" cy="52" r="6" fill={eyeColor} opacity=".9" />

        {/* Pupil */}
        <circle cx="47" cy="51" r="3" fill="#000" />
        <circle cx="75" cy="51" r="3" fill="#000" />

        {/* Glans oog */}
        <circle cx="49" cy="49" r="1.5" fill="rgba(255,255,255,.7)" />
        <circle cx="77" cy="49" r="1.5" fill="rgba(255,255,255,.7)" />

        {/* Snavel */}
        <path d="M55 60 L60 67 L65 60 Q60 57 55 60Z" fill="#D97B2A" />

        {/* Vergrootglas */}
        <g transform="translate(78, 78) rotate(-20)">
          <circle
            cx="0"
            cy="0"
            r="9"
            stroke={eyeColor}
            strokeWidth="2.5"
            fill="rgba(58,172,110,.08)"
          />
          <line
            x1="6.5"
            y1="6.5"
            x2="13"
            y2="13"
            stroke={eyeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Zoek-kruisje in glas */}
          {expression === 'searching' && (
            <>
              <line
                x1="-4"
                y1="0"
                x2="4"
                y2="0"
                stroke="rgba(244,236,219,.4)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="-4"
                x2="0"
                y2="4"
                stroke="rgba(244,236,219,.4)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </>
          )}
          {expression === 'happy' && (
            <path
              d="M-3 1 Q0 4 3 1"
              stroke="rgba(244,236,219,.4)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          )}
          {expression === 'alert' && (
            <>
              <line
                x1="0"
                y1="-4"
                x2="0"
                y2="1"
                stroke="rgba(229,83,42,.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="0" cy="3.5" r="1" fill="rgba(229,83,42,.6)" />
            </>
          )}
        </g>

        {/* Pootjes */}
        <path
          d="M50 98 L46 106 M50 98 L50 106 M50 98 L54 106"
          stroke="#D97B2A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M70 98 L66 106 M70 98 L70 106 M70 98 L74 106"
          stroke="#D97B2A"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Gradients */}
        <defs>
          <radialGradient id="headGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#1a2e44" />
            <stop offset="100%" stopColor="#0a141f" />
          </radialGradient>
          <radialGradient id="bodyGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#162436" />
            <stop offset="100%" stopColor="#080f18" />
          </radialGradient>
        </defs>
      </motion.svg>
    </motion.div>
  )
}
