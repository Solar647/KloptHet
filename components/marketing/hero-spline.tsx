'use client'

import { useIsMobile } from '@/lib/utils/use-mobile'

export function HeroSpline() {
  const isMobile = useIsMobile(1024)

  // Mobiel: lichtgewicht CSS gradient ipv zware Spline iframe
  if (isMobile) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 120% 80% at 70% 40%, rgba(30,60,120,.6) 0%, rgba(10,20,60,.3) 50%, transparent 80%)',
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
      }}
    >
      <iframe
        src="https://my.spline.design/bganimation-NotapPXDYaifuZfA2eRMLFUX/"
        frameBorder="0"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-57%, -50%)',
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
