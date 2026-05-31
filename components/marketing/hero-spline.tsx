'use client'

export function HeroSpline() {
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
        src="https://my.spline.design/retrofuturismbganimation-7xolqE33y4ARSsB9pRW7Ct3l/"
        frameBorder="0"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%) scale(2.5)',
          width: '100%',
          height: '100%',
          border: 'none',
          pointerEvents: 'none',
          transformOrigin: 'center center',
        }}
        title="KloptHet hero achtergrond"
      />
      {/* Dekt onderkant af waar de Spline tekst zit */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          zIndex: 10,
          pointerEvents: 'none',
          background:
            'linear-gradient(to top, #000 0%, rgba(0,0,0,.98) 25%, rgba(0,0,0,.7) 55%, transparent 100%)',
        }}
      />
    </div>
  )
}
