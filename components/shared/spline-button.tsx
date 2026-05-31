'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export function SplineButton() {
  const locale = useLocale()
  const router = useRouter()

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', width: 300, height: 80 }}
      onClick={() => router.push(`/${locale}/#demo`)}
    >
      {/* Spline iframe — iets groter zodat watermark onder de container valt */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 140,
          overflow: 'hidden',
          borderRadius: 14,
        }}
      >
        <iframe
          src="https://my.spline.design/buttonwith3diconcopycopy-JXO2cay4wO7UHNfotpCoS0lS-nEE/"
          frameBorder="0"
          style={{
            width: '100%',
            height: 140,
            border: 'none',
            display: 'block',
            marginTop: -10,
          }}
          title="Start nu"
        />
      </div>

      {/* Transparante klik-laag over de hele knop — onderschept alle kliks */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          cursor: 'pointer',
          zIndex: 10,
          borderRadius: 14,
        }}
      />
    </div>
  )
}
