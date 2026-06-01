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
          transform: 'translate(-57%, -50%)',
          width: 'calc(110vh * 1716 / 775)',
          height: '110vh',
          border: 'none',
          pointerEvents: 'none',
          minWidth: '110%',
        }}
        title="KloptHet hero achtergrond"
      />
    </div>
  )
}
