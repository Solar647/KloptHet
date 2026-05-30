import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { SearchIcon, ArrowRightIcon } from '@/components/shared/icons'

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/inloggen`)

  const { data: recentScans } = await supabase
    .from('scans')
    .select('id, verdict_category, verdict_score, verdict_summary, created_at, input_kind')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalScans } = await supabase
    .from('scans')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const name = user.user_metadata?.full_name?.split(' ')[0] ?? 'u'

  const categoryLabel = {
    safe: { label: 'Geen alarmsignalen', color: '#3AAC6E' },
    doubt: { label: 'Let op', color: '#D97B2A' },
    phishing: { label: 'Meerdere waarschuwingen', color: '#E5532A' },
  }

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            color: '#F4ECDB',
            margin: '0 0 .35rem',
            letterSpacing: '-.02em',
          }}
        >
          Welkom{name !== 'u' ? `, ${name}` : ''}.
        </h1>
        <p style={{ color: 'rgba(244,236,219,.55)', fontFamily: 'var(--font-sans)', margin: 0 }}>
          {totalScans
            ? `U heeft in totaal ${totalScans} berichten gecontroleerd.`
            : 'U heeft nog geen berichten gecontroleerd.'}
        </p>
      </div>

      {/* Snelle actie */}
      <Link
        href={`/${locale}/scan`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #1B4731 0%, #2A6541 100%)',
          border: '1px solid rgba(58,172,110,.35)',
          borderRadius: 16,
          padding: '1.5rem',
          textDecoration: 'none',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 24px -8px rgba(58,172,110,.25)',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.75rem',
              fontWeight: 700,
              color: '#3AAC6E',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              marginBottom: '.3rem',
            }}
          >
            Twijfelt u over een bericht?
          </div>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: '1.4rem',
              color: '#F4ECDB',
              letterSpacing: '-.02em',
            }}
          >
            Controleer een bericht
          </div>
        </div>
        <span style={{ color: 'rgba(244,236,219,.5)', display: 'flex' }}>
          <ArrowRightIcon size={20} strokeWidth={1.8} />
        </span>
      </Link>

      {/* Recente scans */}
      <div
        style={{
          background: 'rgba(244,236,219,.04)',
          border: '1px solid rgba(244,236,219,.1)',
          borderRadius: 16,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1.1rem 1.5rem',
            borderBottom: '1px solid rgba(244,236,219,.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '.9rem',
              color: 'rgba(244,236,219,.6)',
              margin: 0,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
            }}
          >
            Recente controles
          </h2>
          {(totalScans ?? 0) > 5 && (
            <Link
              href={`/${locale}/geschiedenis`}
              style={{
                fontSize: '.82rem',
                color: 'rgba(58,172,110,.8)',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Alles bekijken →
            </Link>
          )}
        </div>

        {!recentScans?.length ? (
          <div style={{ padding: '2.5rem', textAlign: 'center' }}>
            <div
              style={{
                color: 'rgba(244,236,219,.3)',
                marginBottom: '.75rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <SearchIcon size={32} strokeWidth={1.4} />
            </div>
            <p
              style={{
                color: 'rgba(244,236,219,.4)',
                fontFamily: 'var(--font-sans)',
                margin: 0,
                fontSize: '.9rem',
              }}
            >
              Nog geen controles. Controleer uw eerste bericht.
            </p>
          </div>
        ) : (
          <div>
            {recentScans.map((scan, i) => {
              const cat = categoryLabel[scan.verdict_category as keyof typeof categoryLabel]
              return (
                <div
                  key={scan.id}
                  style={{
                    padding: '1rem 1.5rem',
                    borderBottom:
                      i < recentScans.length - 1 ? '1px solid rgba(244,236,219,.06)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: cat.color,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.82rem',
                        fontWeight: 600,
                        color: cat.color,
                        marginBottom: '.2rem',
                      }}
                    >
                      {cat.label} · {scan.verdict_score}/10
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.88rem',
                        color: 'rgba(244,236,219,.6)',
                        lineHeight: 1.4,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {scan.verdict_summary ?? 'Geen samenvatting beschikbaar'}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: '.75rem',
                      color: 'rgba(244,236,219,.3)',
                      fontFamily: 'var(--font-sans)',
                      flexShrink: 0,
                    }}
                  >
                    {new Date(scan.created_at).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
