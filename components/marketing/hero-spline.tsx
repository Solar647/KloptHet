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
      {/* Iframe sterk vergroot en gecentreerd zodat de 3D scene de volledige viewport vult */}
      <iframe
        src="https://my.spline.design/retrofuturismbganimation-7xolqE33y4ARSsB9pRW7Ct3l/"
        frameBorder="0"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(2.2)',
          width: '100%',
          height: '100%',
          border: 'none',
          pointerEvents: 'none',
          transformOrigin: 'center center',
        }}
        title="KloptHet hero achtergrond"
      />

      {/* Dekt "Chasing Sunsets" tekst af (linksonder in de Spline scene) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '45%',
          height: '35%',
          background: 'linear-gradient(to top right, #000 40%, transparent 100%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Watermerk afdekken rechtsonder */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 180,
          height: 50,
          background: '#000',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
