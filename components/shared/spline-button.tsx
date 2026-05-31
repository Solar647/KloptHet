'use client'

import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

export function SplineButton() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const router = useRouter()
  const locale = useLocale()

  useEffect(() => {
    const handleBlur = () => {
      // Als focus naar de iframe gaat = gebruiker heeft geklikt
      if (document.activeElement === iframeRef.current) {
        router.push(`/${locale}/#demo`)
      }
    }
    window.addEventListener('blur', handleBlur)
    return () => window.removeEventListener('blur', handleBlur)
  }, [router, locale])

  return (
    <div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
      <iframe
        ref={iframeRef}
        src="https://my.spline.design/buttonwith3diconcopycopy-JXO2cay4wO7UHNfotpCoS0lS-nEE/"
        frameBorder="0"
        style={{
          width: 220,
          height: 72,
          border: 'none',
          display: 'block',
          background: 'transparent',
        }}
        title="Start nu knop"
      />
    </div>
  )
}
