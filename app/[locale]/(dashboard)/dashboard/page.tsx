import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/inloggen`)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        fontFamily: 'var(--font-sans)',
        color: '#F4ECDB',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'rgba(244,236,219,.06)',
          border: '1px solid rgba(244,236,219,.14)',
          borderRadius: 18,
          padding: '2.5rem',
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: '1.8rem',
            marginBottom: '.5rem',
            letterSpacing: '-.02em',
          }}
        >
          Welkom terug.
        </h1>
        <p style={{ color: 'rgba(244,236,219,.6)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Ingelogd als <strong style={{ color: '#F4ECDB' }}>{user.email}</strong>
        </p>
        <p style={{ color: 'rgba(244,236,219,.4)', fontSize: '.88rem' }}>
          Dashboard wordt gebouwd — kom snel terug.
        </p>
      </div>
    </div>
  )
}
