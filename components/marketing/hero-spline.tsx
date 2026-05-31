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
      {/* Zwart blok linksonder — matcht de donkere hoek van de scene */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '35%',
          height: '30%',
          background: '#000',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
      {/* Zachte gradient rechts van het blok zodat de overgang niet hard is */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '20%',
          width: '25%',
          height: '30%',
          background: 'linear-gradient(to right, #000 0%, transparent 100%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
