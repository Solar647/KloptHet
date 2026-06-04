'use client'

import { useState, useEffect } from 'react'

const STEPS = [
  {
    target: 'scan',
    title: 'Bericht controleren',
    desc: 'Upload een screenshot of plak tekst — binnen 5 seconden weet u of het te vertrouwen is.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    target: 'geschiedenis',
    title: 'Geschiedenis',
    desc: 'Al uw controles staan hier. Klik op een scan voor de volledige analyse.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
  },
  {
    target: 'familie',
    title: 'Familie',
    desc: 'Voeg familieleden toe zodat u ook hun berichten kunt volgen. Ideaal voor ouders.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    target: 'instellingen',
    title: 'Instellingen',
    desc: 'Pas uw profiel, avatar en voorkeursinstellingen aan.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
]

export function DashboardTour() {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 900) return
    const done = localStorage.getItem('kh_tour_done')
    if (!done) {
      // Wacht tot sidebar gerenderd is, probeer meerdere keren
      let attempts = 0
      const tryShow = () => {
        const el = document.querySelector(`[data-tour="${STEPS[0].target}"]`)
        if (el) {
          setVisible(true)
        } else if (attempts < 10) {
          attempts++
          setTimeout(tryShow, 300)
        }
      }
      setTimeout(tryShow, 600)
    }
  }, [])

  useEffect(() => {
    if (!visible) return
    const findRect = () => {
      const el = document.querySelector(`[data-tour="${STEPS[step]?.target}"]`)
      if (el) {
        setRect(el.getBoundingClientRect())
      } else {
        // Element nog niet gevonden, probeer opnieuw
        setTimeout(findRect, 100)
      }
    }
    findRect()
  }, [visible, step])

  const finish = () => {
    localStorage.setItem('kh_tour_done', '1')
    setVisible(false)
  }

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1)
    else finish()
  }

  if (!visible || !rect) return null

  const current = STEPS[step]
  const SIDEBAR_W = 240
  const tooltipTop = rect.top + rect.height / 2

  return (
    <>
      {/* Donkere overlay met uitsparing */}
      <div
        aria-modal="true"
        role="dialog"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      >
        {/* Bovenste blok */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: rect.top - 6,
            background: 'rgba(0,0,0,.65)',
          }}
        />
        {/* Onderste blok */}
        <div
          style={{
            position: 'absolute',
            top: rect.bottom + 6,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,.65)',
          }}
        />
        {/* Links van uitsparing */}
        <div
          style={{
            position: 'absolute',
            top: rect.top - 6,
            left: 0,
            width: rect.left - 6,
            height: rect.height + 12,
            background: 'rgba(0,0,0,.65)',
          }}
        />
        {/* Rechts van uitsparing */}
        <div
          style={{
            position: 'absolute',
            top: rect.top - 6,
            left: rect.right + 6,
            right: 0,
            height: rect.height + 12,
            background: 'rgba(0,0,0,.65)',
          }}
        />
      </div>

      {/* Highlight ring om het element */}
      <div
        style={{
          position: 'fixed',
          top: rect.top - 6,
          left: rect.left - 6,
          width: rect.width + 12,
          height: rect.height + 12,
          borderRadius: 14,
          border: '2px solid rgba(58,172,110,.8)',
          boxShadow: '0 0 0 4px rgba(58,172,110,.15), 0 0 24px rgba(58,172,110,.3)',
          zIndex: 9999,
          pointerEvents: 'none',
          transition: 'all .3s ease',
        }}
      />

      {/* Tooltip kaart */}
      <div
        style={{
          position: 'fixed',
          left: SIDEBAR_W + 24,
          top: Math.min(Math.max(tooltipTop - 90, 16), window.innerHeight - 220),
          width: 300,
          background: '#0E1A2B',
          border: '1px solid rgba(244,236,219,.15)',
          borderRadius: 16,
          padding: '1.25rem',
          zIndex: 10000,
          boxShadow: '0 20px 60px rgba(0,0,0,.5)',
        }}
      >
        {/* Stap indicator */}
        <div style={{ display: 'flex', gap: 5, marginBottom: '1rem' }}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 9999,
                background: i <= step ? '#3AAC6E' : 'rgba(244,236,219,.12)',
                transition: 'background .2s',
              }}
            />
          ))}
        </div>

        {/* Icon + titel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.6rem' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(58,172,110,.12)',
              border: '1px solid rgba(58,172,110,.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3AAC6E',
              flexShrink: 0,
            }}
          >
            {current.icon}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#F4ECDB',
            }}
          >
            {current.title}
          </span>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.88rem',
            color: 'rgba(244,236,219,.65)',
            lineHeight: 1.6,
            margin: '0 0 1.25rem',
          }}
        >
          {current.desc}
        </p>

        {/* Knoppen */}
        <div style={{ display: 'flex', gap: '.6rem' }}>
          <button
            onClick={finish}
            style={{
              flex: 1,
              padding: '.6rem',
              borderRadius: 10,
              background: 'transparent',
              border: '1px solid rgba(244,236,219,.15)',
              color: 'rgba(244,236,219,.45)',
              fontFamily: 'var(--font-sans)',
              fontSize: '.82rem',
              cursor: 'pointer',
            }}
          >
            Overslaan
          </button>
          <button
            onClick={next}
            style={{
              flex: 2,
              padding: '.6rem',
              borderRadius: 10,
              background: '#3AAC6E',
              border: 'none',
              color: '#07190F',
              fontFamily: 'var(--font-sans)',
              fontSize: '.88rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {step < STEPS.length - 1 ? 'Volgende →' : 'Klaar!'}
          </button>
        </div>
      </div>

      {/* Klik-blokkerende overlay */}
      <div
        onClick={finish}
        style={{ position: 'fixed', inset: 0, zIndex: 9997, cursor: 'default' }}
      />
    </>
  )
}
