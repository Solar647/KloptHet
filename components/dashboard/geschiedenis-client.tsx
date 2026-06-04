'use client'

import { useState } from 'react'
import { HistoryIcon } from '@/components/shared/icons'

type Flag = { label: string; severity: 'danger' | 'warn' | 'info' }

type Scan = {
  id: string
  verdict_category: string
  verdict_score: number
  verdict_summary: string | null
  verdict_flags: Flag[] | null
  created_at: string
  input_kind: string
  fraud_type: string | null
}

const cat = {
  safe: {
    label: 'Veilig',
    color: '#3AAC6E',
    bg: 'rgba(58,172,110,.1)',
    border: 'rgba(58,172,110,.25)',
  },
  doubt: {
    label: 'Let op',
    color: '#D97B2A',
    bg: 'rgba(217,123,42,.1)',
    border: 'rgba(217,123,42,.25)',
  },
  phishing: {
    label: 'Gevaarlijk',
    color: '#E5532A',
    bg: 'rgba(229,83,42,.1)',
    border: 'rgba(229,83,42,.25)',
  },
}

const flagColor = {
  danger: { color: '#E5532A', bg: 'rgba(229,83,42,.1)', dot: '#E5532A' },
  warn: { color: '#D97B2A', bg: 'rgba(217,123,42,.1)', dot: '#D97B2A' },
  info: { color: 'rgba(244,236,219,.6)', bg: 'rgba(244,236,219,.05)', dot: 'rgba(244,236,219,.4)' },
}

const PAGE_SIZE = 5

export function GeschiedenisClient({ scans }: { scans: Scan[] }) {
  const [selected, setSelected] = useState<Scan | null>(null)
  const [page, setPage] = useState(1)

  const visible = scans.slice(0, page * PAGE_SIZE)
  const hasMore = scans.length > visible.length

  if (selected) {
    const c = cat[selected.verdict_category as keyof typeof cat] ?? cat.safe
    const flags = selected.verdict_flags ?? []
    const date = new Date(selected.created_at).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    const time = new Date(selected.created_at).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
    })

    return (
      <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', margin: '0 auto', maxWidth: 760 }}>
        {/* Terug */}
        <button
          onClick={() => setSelected(null)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: '.85rem',
            color: 'rgba(244,236,219,.45)',
            padding: 0,
            marginBottom: '1.5rem',
            transition: 'color .15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(244,236,219,.8)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(244,236,219,.45)'
          }}
        >
          ← Terug naar geschiedenis
        </button>

        {/* Detail kaart */}
        <div
          style={{
            background: c.bg,
            border: `1px solid ${c.border}`,
            borderRadius: 18,
            padding: '1.75rem',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1.25rem',
            }}
          >
            <div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '.35rem' }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: c.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: c.color,
                  }}
                >
                  {c.label}
                </span>
                <span
                  style={{
                    fontFamily: 'ui-monospace,monospace',
                    fontSize: '.78rem',
                    color: c.color,
                    fontWeight: 700,
                  }}
                >
                  {selected.verdict_score}/10
                </span>
              </div>
              {selected.fraud_type && (
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    fontWeight: 700,
                    color: 'rgba(244,236,219,.4)',
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {selected.fraud_type}
                </span>
              )}
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.78rem',
                  color: 'rgba(244,236,219,.5)',
                }}
              >
                {date}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.72rem',
                  color: 'rgba(244,236,219,.3)',
                  marginTop: 2,
                }}
              >
                {time} · {selected.input_kind === 'image' ? 'Screenshot' : 'Tekst'}
              </div>
            </div>
          </div>

          {/* Samenvatting */}
          {selected.verdict_summary && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.7rem',
                  fontWeight: 700,
                  color: 'rgba(244,236,219,.35)',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  marginBottom: '.5rem',
                }}
              >
                Analyse
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.95rem',
                  color: 'rgba(244,236,219,.75)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {selected.verdict_summary}
              </p>
            </div>
          )}

          {/* Flags */}
          {flags.length > 0 && (
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.7rem',
                  fontWeight: 700,
                  color: 'rgba(244,236,219,.35)',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  marginBottom: '.6rem',
                }}
              >
                Signalen ({flags.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
                {flags.map((flag, i) => {
                  const fc = flagColor[flag.severity] ?? flagColor.info
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        padding: '.65rem .9rem',
                        background: fc.bg,
                        borderRadius: 10,
                        border: `1px solid ${fc.dot}30`,
                      }}
                    >
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          background: fc.dot,
                          flexShrink: 0,
                          marginTop: 5,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.85rem',
                          color: 'rgba(244,236,219,.75)',
                          lineHeight: 1.5,
                        }}
                      >
                        {flag.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {flags.length === 0 && !selected.verdict_summary && (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.9rem',
                color: 'rgba(244,236,219,.45)',
                margin: 0,
              }}
            >
              Geen verdere details beschikbaar.
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', margin: '0 auto', maxWidth: 900 }}>
      <div style={{ marginBottom: '1.75rem' }}>
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
        <p
          style={{
            color: 'rgba(244,236,219,.5)',
            fontFamily: 'var(--font-sans)',
            fontSize: '.9rem',
            margin: 0,
          }}
        >
          {scans.length} gecontroleerde berichten — klik voor details
        </p>
      </div>

      {!scans.length ? (
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
        <>
          <div
            style={{
              background: 'rgba(244,236,219,.04)',
              border: '1px solid rgba(244,236,219,.1)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {visible.map((scan, i) => {
              const c = cat[scan.verdict_category as keyof typeof cat] ?? cat.safe
              const flags = scan.verdict_flags ?? []
              const dangerCount = flags.filter((f) => f.severity === 'danger').length

              return (
                <button
                  key={scan.id}
                  onClick={() => setSelected(scan)}
                  style={{
                    width: '100%',
                    padding: '.9rem 1.25rem',
                    background: 'transparent',
                    border: 'none',
                    borderBottom:
                      i < visible.length - 1 ? '1px solid rgba(244,236,219,.06)' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    textAlign: 'left',
                    transition: 'background .12s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(244,236,219,.04)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {/* Status dot */}
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: c.color,
                      flexShrink: 0,
                    }}
                  />

                  {/* Label + score */}
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.85rem',
                      fontWeight: 600,
                      color: c.color,
                      minWidth: 100,
                    }}
                  >
                    {c.label}
                  </span>

                  {/* Score */}
                  <span
                    style={{
                      fontFamily: 'ui-monospace,monospace',
                      fontSize: '.75rem',
                      color: 'rgba(244,236,219,.35)',
                      flexShrink: 0,
                    }}
                  >
                    {scan.verdict_score}/10
                  </span>

                  {/* Samenvatting preview */}
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.82rem',
                      color: 'rgba(244,236,219,.45)',
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {scan.verdict_summary
                      ? scan.verdict_summary.slice(0, 80) +
                        (scan.verdict_summary.length > 80 ? '…' : '')
                      : scan.input_kind === 'image'
                        ? 'Screenshot geanalyseerd'
                        : 'Tekst geanalyseerd'}
                  </span>

                  {/* Flags badge */}
                  {dangerCount > 0 && (
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.68rem',
                        fontWeight: 700,
                        color: '#E5532A',
                        background: 'rgba(229,83,42,.1)',
                        border: '1px solid rgba(229,83,42,.2)',
                        borderRadius: 9999,
                        padding: '.15rem .5rem',
                        flexShrink: 0,
                      }}
                    >
                      {dangerCount} signaal{dangerCount > 1 ? 'en' : ''}
                    </span>
                  )}

                  {/* Datum */}
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.75rem',
                      color: 'rgba(244,236,219,.28)',
                      flexShrink: 0,
                    }}
                  >
                    {new Date(scan.created_at).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>

                  {/* Pijl */}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(244,236,219,.25)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              )
            })}
          </div>

          {hasMore && (
            <button
              onClick={() => setPage((p) => p + 1)}
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '.75rem',
                background: 'rgba(244,236,219,.04)',
                border: '1px solid rgba(244,236,219,.1)',
                borderRadius: 12,
                color: 'rgba(244,236,219,.5)',
                fontFamily: 'var(--font-sans)',
                fontSize: '.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all .15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(244,236,219,.08)'
                e.currentTarget.style.color = '#F4ECDB'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(244,236,219,.04)'
                e.currentTarget.style.color = 'rgba(244,236,219,.5)'
              }}
            >
              Meer laden ({scans.length - visible.length} resterend)
            </button>
          )}
        </>
      )}
    </div>
  )
}
