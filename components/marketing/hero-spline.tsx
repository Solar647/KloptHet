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
      {/* Iframe iets groter dan container zodat het goed schaalt en vult */}
      <iframe
        src="https://my.spline.design/retrofuturismbganimation-7xolqE33y4ARSsB9pRW7Ct3l/"
        frameBorder="0"
        style={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          width: '110%',
          height: '115%',
          border: 'none',
          pointerEvents: 'none',
        }}
        title="KloptHet hero achtergrond"
      />
      {/* Dekt het Spline-watermerk af (linksonder) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 220,
          height: 60,
          background: '#000',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
