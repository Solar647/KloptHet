'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/auth-card'

export default function BevestigdPage() {
  const locale = useLocale()
  const router = useRouter()

  // Na 3 seconden automatisch doorsturen
  useEffect(() => {
    const t = setTimeout(() => {
      router.push(`/${locale}/dashboard`)
    }, 3000)
    return () => clearTimeout(t)
  }, [locale, router])

  return (
    <AuthCard
      title="E-mail bevestigd!"
      subtitle="Uw account is actief. U wordt zo doorgestuurd naar uw dashboard."
    >
      <div
        style={{
          background: 'rgba(58,172,110,.1)',
          border: '1px solid rgba(58,172,110,.25)',
          borderRadius: 12,
          padding: '1.25rem',
          marginBottom: '1.25rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(58,172,110,.15)',
            border: '2px solid rgba(58,172,110,.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto .75rem',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3AAC6E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.9rem',
            color: 'rgba(244,236,219,.75)',
            margin: '0 0 .5rem',
            lineHeight: 1.6,
          }}
        >
          U bent nu ingelogd op dit apparaat.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.78rem',
            color: 'rgba(244,236,219,.4)',
            margin: 0,
          }}
        >
          Doorsturen over enkele seconden…
        </p>
      </div>

      <Link
        href={`/${locale}/dashboard`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: '100%',
          padding: '1rem',
          background: '#3AAC6E',
          color: '#07190F',
          border: 'none',
          borderRadius: 12,
          fontSize: '1rem',
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(58,172,110,.25)',
        }}
      >
        Naar mijn dashboard →
      </Link>
    </AuthCard>
  )
}
