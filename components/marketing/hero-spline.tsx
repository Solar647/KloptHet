'use client'

import { useEffect, useRef } from 'react'

export function HeroSpline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    const overlay = overlayRef.current
    if (!el || !overlay) return

    let hasEntered = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasEntered) {
            // Heeft de viewport verlaten en is terug: even afdekken zodat
            // de Spline-scene kan bijtrekken zonder dat je het geflikker ziet.
            overlay.style.transition = 'none'
            overlay.style.opacity = '1'
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                overlay.style.transition = 'opacity .8s ease'
                overlay.style.opacity = '0'
              })
            })
          }
          hasEntered = true
        } else if (hasEntered) {
          overlay.style.transition = 'none'
          overlay.style.opacity = '1'
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
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
        className="spline-desktop-iframe"
        src="https://my.spline.design/bganimation-UbaeTL6qYDkDSbXLxE5l3ik8/"
        frameBorder="0"
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

      {/* Re-entry overlay: dekt geflikker af terwijl de scene bijtrekt */}
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
