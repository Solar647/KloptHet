'use client'

import { useIsMobile } from '@/lib/utils/use-mobile'

export function HeroSpline() {
  const isMobile = useIsMobile(1024)

  if (isMobile) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 140% 70% at 75% 35%,
              rgba(30,80,180,.55) 0%,
              rgba(15,40,100,.35) 40%,
              rgba(5,15,50,.15) 70%,
              transparent 100%)
          `,
        }}
      />
    )
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        transform: 'translateZ(0)',
        isolation: 'isolate',
      }}
    >
      <iframe
        src="https://my.spline.design/bganimation-NotapPXDYaifuZfA2eRMLFUX/"
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
    </div>
  )
}
