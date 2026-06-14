'use client'

import { useEffect, useRef, useState } from 'react'

const SPLINE_SRC = 'https://my.spline.design/bganimation-UbaeTL6qYDkDSbXLxE5l3ik8/'

export function HeroSpline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Door de key te verhogen wordt de iframe opnieuw gemount = verse WebGL-scene.
  // Dit voorkomt het geflikker/degraderen nadat de pagina lang openstond of de
  // tab op de achtergrond is geweest.
  const [reloadKey, setReloadKey] = useState(0)

  const showOverlay = () => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    overlay.style.transition = 'none'
    overlay.style.opacity = '1'
  }

  const hideOverlay = (delay = 700) => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    fadeTimer.current = setTimeout(() => {
      overlay.style.transition = 'opacity .9s ease'
      overlay.style.opacity = '0'
    }, delay)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let inView = true
    let hasLeft = false
    let leftAt = 0

    // Verse scene laden + overlay eroverheen tot de iframe geladen is
    const refresh = () => {
      showOverlay()
      setReloadKey((k) => k + 1)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (!entry.isIntersecting) {
          if (!document.hidden) {
            hasLeft = true
            leftAt = Date.now()
            showOverlay()
          }
        } else if (hasLeft) {
          hasLeft = false
          // Lang weg geweest? Dan verse scene. Kort weg? Alleen overlay wegfaden.
          if (Date.now() - leftAt > 4000) {
            refresh()
          } else {
            hideOverlay(200)
          }
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)

    // Tab terug op de voorgrond na achtergrond → verse scene als hero in beeld is
    const onVisibility = () => {
      if (!document.hidden && inView) {
        refresh()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .spline-mobile-bg {
          display: none;
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 160% 80% at 70% 40%,
            rgba(30,80,180,.65) 0%,
            rgba(15,40,110,.45) 35%,
            rgba(5,15,60,.2) 65%,
            transparent 100%
          );
        }
        .spline-desktop-iframe {
          display: block;
          animation: splineFadeIn 1.8s ease forwards;
        }
        @keyframes splineFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 1023px) {
          .spline-mobile-bg { display: block; }
          .spline-desktop-iframe { display: none; }
        }
      `}</style>

      <div className="spline-mobile-bg" />

      <iframe
        key={reloadKey}
        className="spline-desktop-iframe"
        src={SPLINE_SRC}
        frameBorder="0"
        onLoad={() => {
          // Iframe (her)geladen — overlay wegfaden zodra de scene zichtbaar is
          if (reloadKey > 0) hideOverlay(600)
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-57%, -50%) translateZ(0)',
          width: 'calc(110vh * 1716 / 775)',
          height: '110vh',
          border: 'none',
          pointerEvents: 'none',
          minWidth: '110%',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
        title="KloptHet hero achtergrond"
      />

      {/* Spline watermerk verbergen */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 200,
          height: 52,
          background: 'linear-gradient(135deg, transparent 0%, #05080F 55%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Re-entry overlay: dekt geflikker af terwijl de scene (her)laadt */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #05080F 0%, #080F1E 40%, #0A1028 70%, #060A16 100%)',
          zIndex: 2,
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'opacity',
        }}
      />
    </div>
  )
}
