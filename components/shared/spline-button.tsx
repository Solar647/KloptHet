'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useRef, useEffect } from 'react'

export function SplineButton() {
  const locale = useLocale()
  const router = useRouter()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleBlur = () => {
      if (document.activeElement === iframeRef.current) {
        router.push(`/${locale}/#demo`)
      }
    }
    window.addEventListener('blur', handleBlur)
    return () => window.removeEventListener('blur', handleBlur)
  }, [router, locale])

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <iframe
        ref={iframeRef}
        src="https://my.spline.design/buttonwith3diconcopycopy-JXO2cay4wO7UHNfotpCoS0lS-nEE/"
        frameBorder="0"
        style={{
          width: 320,
          height: 100,
          border: 'none',
          display: 'block',
          background: 'transparent',
          borderRadius: 14,
          overflow: 'hidden',
        }}
        title="Start nu"
        loading="lazy"
      />
    </div>
  )
}
