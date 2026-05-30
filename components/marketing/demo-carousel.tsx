'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRightIcon, ShieldIcon, AlertIcon, CheckIcon } from '@/components/shared/icons'

const examples = [
  {
    id: 'kleinkind',
    type: 'Kleinkind-truc',
    from: 'Onbekend nummer',
    preview: 'Hoi mama, dit is mijn nieuwe nummer. Kun je me €450 sturen? Het is dringend.',
    score: 8,
    category: 'phishing' as const,
    label: 'Meerdere waarschuwingen',
    color: '#E5532A',
    flags: ['Nieuw nummer + geldverzoek', 'Tijdsdruk aanwezig', 'Geen identiteitscheck'],
  },
  {
    id: 'bank',
    type: 'Bank-imitatie',
    from: 'ING Bank (nep)',
    preview: 'Uw ING-rekening wordt geblokkeerd. Bevestig uw gegevens direct via: ing-veilig.net',
    score: 9,
    category: 'phishing' as const,
    label: 'Meerdere waarschuwingen',
    color: '#E5532A',
    flags: ['Nep-domein gedetecteerd', 'Blokkade-dreiging', 'Link niet van ING'],
  },
  {
    id: 'bezorg',
    type: 'Bezorg-fraude',
    from: 'PostNL (nep)',
    preview: 'Uw pakket kan niet worden afgeleverd. Betaal €1,99 via: post-nl-betaling.com',
    score: 7,
    category: 'doubt' as const,
    label: 'Let op',
    color: '#D97B2A',
    flags: ['Verdacht domein', 'Onverwacht betaalverzoek'],
  },
  {
    id: 'veilig',
    type: 'Legitiem bericht',
    from: 'Bol.com',
    preview: 'Uw bestelling #4821039 is onderweg. Volg uw pakket via ons track & trace systeem.',
    score: 1,
    category: 'safe' as const,
    label: 'Geen alarmsignalen',
    color: '#3AAC6E',
    flags: ['Officieel domein', 'Geen betaalverzoek', 'Bekende afzender'],
  },
  {
    id: 'romantiek',
    type: 'Romantiek-scam',
    from: 'David Morrison',
    preview:
      'Ik ben zo blij dat ik jou gevonden heb. Ik zit nu op het boorplatform maar ik heb je nodig...',
    score: 8,
    category: 'phishing' as const,
    label: 'Meerdere waarschuwingen',
    color: '#E5532A',
    flags: ['Emotionele manipulatie', 'Boorplatform-verhaal', 'Snel vertrouwen opbouwen'],
  },
]

const categoryIcon = {
  safe: CheckIcon,
  doubt: AlertIcon,
  phishing: ShieldIcon,
}

export function DemoCarousel() {
  const locale = useLocale()
  const [active, setActive] = useState(2)
  const [animating, setAnimating] = useState(false)

  const go = useCallback(
    (idx: number) => {
      if (animating) return
      setAnimating(true)
      setActive(idx)
      setTimeout(() => setAnimating(false), 400)
    },
    [animating]
  )

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % examples.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const current = examples[active]
  const Icon = categoryIcon[current.category]

  return (
    <section
      id="demo"
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* Achtergrond glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50%',
          height: '40%',
          background: `radial-gradient(ellipse at center, ${current.color}18 0%, transparent 70%)`,
          pointerEvents: 'none',
          filter: 'blur(40px)',
          transition: 'background .6s ease',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1.5rem, 3vw, 3rem)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              fontSize: '.72rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.6)',
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              marginBottom: '.75rem',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            Zo werkt het
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              lineHeight: 1.05,
              letterSpacing: '-.03em',
              color: '#F4ECDB',
              margin: '0 0 .75rem',
            }}
          >
            Herken jij de truc?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'rgba(244,236,219,.55)',
              maxWidth: 460,
              margin: '0 auto',
            }}
          >
            Kies een voorbeeld en zie hoe wij het analyseren.
          </p>
        </div>

        {/* Carousel */}
        <div style={{ position: 'relative', height: 320, perspective: 1200 }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
            }}
          >
            {examples.map((ex, i) => {
              const offset = i - active
              const absOffset = Math.abs(offset)
              const isActive = offset === 0
              const visible = absOffset <= 2

              if (!visible) return null

              const rotateY = offset * 28
              const translateX = offset * 52
              const scale = isActive ? 1 : absOffset === 1 ? 0.82 : 0.68
              const opacity = isActive ? 1 : absOffset === 1 ? 0.7 : 0.4
              const zIndex = isActive ? 10 : absOffset === 1 ? 8 : 5

              return (
                <div
                  key={ex.id}
                  onClick={() => go(i)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 260,
                    transform: `
                      translateX(calc(-50% + ${translateX}%))
                      translateY(-50%)
                      rotateY(${rotateY}deg)
                      scale(${scale})
                    `,
                    transformOrigin: 'center center',
                    opacity,
                    zIndex,
                    cursor: isActive ? 'default' : 'pointer',
                    transition: 'all .4s cubic-bezier(.16,1,.3,1)',
                  }}
                >
                  <div
                    style={{
                      background: isActive
                        ? `linear-gradient(145deg, rgba(${ex.category === 'safe' ? '58,172,110' : ex.category === 'doubt' ? '217,123,42' : '229,83,42'},.15) 0%, rgba(20,58,38,.95) 100%)`
                        : 'rgba(20,40,28,.9)',
                      border: `1.5px solid ${isActive ? ex.color + '50' : 'rgba(244,236,219,.1)'}`,
                      borderRadius: 20,
                      padding: '1.5rem',
                      backdropFilter: 'blur(20px)',
                      boxShadow: isActive
                        ? `0 30px 60px -20px rgba(0,0,0,.6), 0 0 0 1px ${ex.color}30`
                        : '0 10px 30px rgba(0,0,0,.3)',
                      height: 220,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '.75rem',
                      transition: 'all .4s cubic-bezier(.16,1,.3,1)',
                    }}
                  >
                    {/* Type tag */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.65rem',
                          fontWeight: 700,
                          color: ex.color,
                          letterSpacing: '.08em',
                          textTransform: 'uppercase',
                          background: `${ex.color}18`,
                          border: `1px solid ${ex.color}30`,
                          padding: '.2rem .6rem',
                          borderRadius: 9999,
                        }}
                      >
                        {ex.type}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontWeight: 700,
                          fontSize: '1.4rem',
                          color: ex.color,
                          lineHeight: 1,
                        }}
                      >
                        {ex.score}
                        <span style={{ fontSize: '.7rem', color: 'rgba(244,236,219,.3)' }}>
                          /10
                        </span>
                      </span>
                    </div>

                    {/* From */}
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.75rem',
                        color: 'rgba(244,236,219,.45)',
                        letterSpacing: '.02em',
                      }}
                    >
                      Van: {ex.from}
                    </div>

                    {/* Message preview */}
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.88rem',
                        color: 'rgba(244,236,219,.82)',
                        lineHeight: 1.55,
                        margin: 0,
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      &ldquo;{ex.preview}&rdquo;
                    </p>

                    {/* Score bar */}
                    <div
                      style={{
                        height: 3,
                        borderRadius: 9999,
                        background: 'rgba(244,236,219,.08)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          borderRadius: 9999,
                          width: `${ex.score * 10}%`,
                          background: ex.color,
                          transition: 'width .8s cubic-bezier(.16,1,.3,1)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Verdict panel */}
        <div
          style={{
            marginTop: '2rem',
            background: 'rgba(244,236,219,.04)',
            border: `1px solid ${current.color}30`,
            borderRadius: 16,
            padding: '1.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '1.5rem',
            alignItems: 'start',
            transition: 'border-color .4s',
            maxWidth: 700,
            margin: '2rem auto 0',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.75rem' }}>
              <span style={{ color: current.color, display: 'flex' }}>
                <Icon size={18} strokeWidth={2} />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '.82rem',
                  color: current.color,
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                }}
              >
                {current.label}
              </span>
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '.4rem',
              }}
            >
              {current.flags.map((f) => (
                <li
                  key={f}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.88rem',
                    color: 'rgba(244,236,219,.75)',
                  }}
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: current.color,
                      flexShrink: 0,
                    }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={`/${locale}/registreren`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '.75rem 1.25rem',
              borderRadius: 10,
              background: '#3AAC6E',
              color: '#07190F',
              fontFamily: 'var(--font-sans)',
              fontSize: '.88rem',
              fontWeight: 700,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Eigen bericht checken
            <ArrowRightIcon size={14} strokeWidth={2.2} />
          </Link>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: '1.5rem' }}>
          {examples.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Voorbeeld ${i + 1}`}
              style={{
                width: active === i ? 20 : 6,
                height: 6,
                borderRadius: 9999,
                border: 'none',
                cursor: 'pointer',
                background: active === i ? '#3AAC6E' : 'rgba(244,236,219,.2)',
                padding: 0,
                transition: 'all .3s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
