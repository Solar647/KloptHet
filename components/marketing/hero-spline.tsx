'use client'

import Spline from '@splinetool/react-spline/next'

export function HeroSpline() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
    >
      <Spline
        scene="https://prod.spline.design/CF4X-Ifi1K34A4O8/scene.splinecode"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
