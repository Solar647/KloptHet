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
        width="240"
        height="80"
        style={{
          border: 'none',
          display: 'block',
          background: 'transparent',
          cursor: 'pointer',
          borderRadius: 12,
          overflow: 'hidden',
        }}
        title="Start nu"
      />
    </div>
  )
}
