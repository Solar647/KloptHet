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
      {/* Klein blokje over de Sunsets tekst in de linker onderhoek */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '30%',
          height: '20%',
          background: '#000',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
