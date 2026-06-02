import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { HistoryIcon } from '@/components/shared/icons'

const categoryLabel = {
  safe: { label: 'Geen alarmsignalen', color: '#3AAC6E' },
  doubt: { label: 'Let op', color: '#D97B2A' },
  phishing: { label: 'Meerdere waarschuwingen', color: '#E5532A' },
}

export default async function GeschiedenisPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/inloggen`)

  const { data: scans } = await supabase
    .from('scans')
    .select(
      'id, verdict_category, verdict_score, verdict_summary, verdict_flags, created_at, input_kind, fraud_type'
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', margin: '0 auto', maxWidth: 900 }}>
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
          Geschiedenis
        </h1>
        <p style={{ color: 'rgba(244,236,219,.55)', fontFamily: 'var(--font-sans)', margin: 0 }}>
          Uw laatste {scans?.length ?? 0} gecontroleerde berichten.
        </p>
      </div>

      {!scans?.length ? (
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.1)',
            borderRadius: 16,
            padding: '3rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: 'rgba(244,236,219,.3)',
              marginBottom: '.75rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <HistoryIcon size={32} strokeWidth={1.4} />
          </div>
          <p style={{ color: 'rgba(244,236,219,.4)', fontFamily: 'var(--font-sans)', margin: 0 }}>
            Nog geen controles uitgevoerd.
          </p>
        </div>
      ) : (
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.1)',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {scans.map((scan, i) => {
            const cat = categoryLabel[scan.verdict_category as keyof typeof categoryLabel]
            return (
              <div
                key={scan.id}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: i < scans.length - 1 ? '1px solid rgba(244,236,219,.06)' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '.6rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: cat.color,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.82rem',
                        fontWeight: 600,
                        color: cat.color,
                      }}
                    >
                      {cat.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.78rem',
                        color: 'rgba(244,236,219,.3)',
                      }}
                    >
                      · {scan.verdict_score}/10 ·{' '}
                      {scan.input_kind === 'image' ? '📷 Screenshot' : '✏️ Tekst'}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '.75rem',
                      color: 'rgba(244,236,219,.3)',
                      fontFamily: 'var(--font-sans)',
                      flexShrink: 0,
                    }}
                  >
                    {new Date(scan.created_at).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                {scan.verdict_summary && (
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.9rem',
                      color: 'rgba(244,236,219,.65)',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {scan.verdict_summary}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
