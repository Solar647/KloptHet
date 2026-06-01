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
        src="https://my.spline.design/bganimation-xu36L1W2yyk9ipJDwZMICzKj/"
        frameBorder="0"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-52.5%, -50%)',
          width: '105%',
          height: '105%',
          border: 'none',
          pointerEvents: 'none',
        }}
        title="KloptHet hero achtergrond"
      />
    </div>
  )
}
