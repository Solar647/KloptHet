'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export function SplineButton() {
  const locale = useLocale()
  const router = useRouter()

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        width: 220,
        height: 60,
        cursor: 'pointer',
      }}
      onClick={() => router.push(`/${locale}/#demo`)}
    >
      {/* Container crop — verbergt branding bovenaan, toont alleen de knop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          borderRadius: 14,
        }}
      >
        <iframe
          src="https://my.spline.design/buttonwith3diconcopycopy-JXO2cay4wO7UHNfotpCoS0lS-nEE/"
          frameBorder="0"
          style={{
            width: 220,
            height: 300,
            border: 'none',
            display: 'block',
            position: 'absolute',
            top: -180 /* Schuif omhoog zodat de knop onderaan zichtbaar is */,
            left: 0,
            pointerEvents: 'none' /* Blokkeert alle iframe interacties */,
          }}
          title="Start nu"
        />
      </div>

      {/* Klik-laag */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, borderRadius: 14 }} />
    </div>
  )
}
