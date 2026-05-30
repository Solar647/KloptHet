'use client'

import Spline from '@splinetool/react-spline'

export function HeroSpline() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Spline
        scene="https://prod.spline.design/retrofuturismbganimation-CpzfSUJhcDgtz1Q25ezWIJlN/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
