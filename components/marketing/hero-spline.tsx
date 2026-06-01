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
        src="https://my.spline.design/bganimation-NotapPXDYaifuZfA2eRMLFUX/"
        frameBorder="0"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-62%, -50%)',
          width: 'calc(100vh * 1716 / 775)',
          height: '105vh',
          border: 'none',
          pointerEvents: 'none',
          minWidth: '105%',
        }}
        title="KloptHet hero achtergrond"
      />
    </div>
  )
}
