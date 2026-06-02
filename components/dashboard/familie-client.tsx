'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import Image from 'next/image'

type Scan = {
  verdict_category: 'safe' | 'doubt' | 'phishing'
  verdict_score: number
  created_at: string
}

type Member = {
  id: string
  invited_email: string
  status: 'pending' | 'active' | 'removed'
  owner_can_see_scans: boolean
  member_can_see_owner: boolean
  joined_at: string | null
  avatar_url?: string | null
  recentScans?: Scan[]
}

type Props = {
  tier: string
  userEmail: string
  members: Member[]
  max: number
}

const catColor = { safe: '#3AAC6E', doubt: '#D97B2A', phishing: '#E5532A' }
const catLabel = { safe: 'Veilig', doubt: 'Let op', phishing: 'Gevaar' }

export function FamilieClient({ tier, userEmail, members: initialMembers, max }: Props) {
  const locale = useLocale()
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [inviteEmail, setInviteEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [inviteError, setInviteError] = useState('')
  const [inviteSuccess, setInviteSuccess] = useState('')
  const [inviteLink, setInviteLink] = useState('')
  const [linkCopied, setLinkCopied] = useState(false)

  const canInvite = tier === 'family' || tier === 'premium'
  const activeMembers = members.filter((m) => m.status !== 'removed')

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim() || sending) return
    setSending(true)
    setInviteError('')
    setInviteSuccess('')
    setInviteLink('')

    try {
      const res = await fetch('/api/family/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, locale }),
      })

      let data: Record<string, unknown> = {}
      try {
        data = await res.json()
      } catch {
        /* html response */
      }

      if (!res.ok) {
        setInviteError((data.error as string) ?? `Fout ${res.status} — probeer opnieuw.`)
      } else {
        setInviteSuccess(
          data.warning ? (data.warning as string) : `Uitnodiging verstuurd naar ${inviteEmail}.`
        )
        setInviteLink((data.inviteUrl as string) ?? '')
        if (data.member) setMembers((prev) => [...prev, data.member as Member])
        setInviteEmail('')
      }
    } catch {
      setInviteError('Geen verbinding. Controleer uw internet en probeer opnieuw.')
    } finally {
      setSending(false)
    }
  }

  const updatePermission = async (
    memberId: string,
    field: 'owner_can_see_scans' | 'member_can_see_owner',
    value: boolean
  ) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, [field]: value } : m)))
    await fetch('/api/family/members', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId, [field]: value }),
    })
  }

  const removeMember = async (memberId: string) => {
    if (!confirm('Weet u zeker dat u dit lid wilt verwijderen?')) return
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, status: 'removed' as const } : m))
    )
    await fetch('/api/family/members', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId }),
    })
  }

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 720 }}>
      {/* Header */}
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
          Familie
        </h1>
        <p
          style={{
            color: 'rgba(244,236,219,.5)',
            fontFamily: 'var(--font-sans)',
            fontSize: '.9rem',
            margin: 0,
          }}
        >
          {activeMembers.length + 1} van {max} plekken bezet
        </p>
      </div>

      {/* Upgrade banner */}
      {!canInvite && (
        <div
          style={{
            background: 'rgba(58,172,110,.06)',
            border: '1px solid rgba(58,172,110,.2)',
            borderRadius: 14,
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.88rem',
              color: 'rgba(244,236,219,.7)',
              margin: 0,
            }}
          >
            Upgrade naar <strong style={{ color: '#F4ECDB' }}>Familie</strong> om tot 5 leden uit te
            nodigen.
          </p>
          <Link
            href={`/${locale}/abonnement/checkout?tier=family`}
            style={{
              background: '#3AAC6E',
              color: '#07190F',
              borderRadius: 8,
              padding: '.5rem 1rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Upgraden →
          </Link>
        </div>
      )}

      {/* Eigenaar kaart */}
      <div
        style={{
          background: 'rgba(244,236,219,.04)',
          border: '1px solid rgba(244,236,219,.1)',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            padding: '.85rem 1.25rem',
            borderBottom: '1px solid rgba(244,236,219,.07)',
            fontFamily: 'var(--font-sans)',
            fontSize: '.72rem',
            fontWeight: 700,
            color: 'rgba(244,236,219,.35)',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}
        >
          Familieleden
        </div>

        {/* Eigenaar */}
        <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar letter={userEmail.charAt(0).toUpperCase()} color="#3AAC6E" />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '.9rem',
                color: '#F4ECDB',
              }}
            >
              U (eigenaar)
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.75rem',
                color: 'rgba(244,236,219,.4)',
              }}
            >
              {userEmail}
            </div>
          </div>
          <Badge label="Eigenaar" color="#3AAC6E" />
        </div>

        {/* Leden */}
        {activeMembers.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            onToggle={updatePermission}
            onRemove={removeMember}
            locale={locale}
          />
        ))}

        {activeMembers.length === 0 && (
          <div
            style={{
              padding: '1.5rem',
              textAlign: 'center',
              borderTop: '1px solid rgba(244,236,219,.06)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.85rem',
                color: 'rgba(244,236,219,.3)',
                margin: 0,
              }}
            >
              Nog geen familieleden. Nodig iemand uit hieronder.
            </p>
          </div>
        )}
      </div>

      {/* Uitnodigen */}
      {canInvite && activeMembers.length + 1 < max && (
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.1)',
            borderRadius: 16,
            padding: '1.25rem',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.72rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.35)',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              marginBottom: '.85rem',
            }}
          >
            Familielid uitnodigen
          </div>

          <form onSubmit={handleInvite} style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="E-mailadres familielid"
              required
              style={{
                flex: 1,
                minWidth: 200,
                padding: '.8rem 1rem',
                background: 'rgba(244,236,219,.06)',
                border: '1px solid rgba(244,236,219,.16)',
                borderRadius: 10,
                color: '#F4ECDB',
                fontSize: '.9rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(58,172,110,.5)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(244,236,219,.16)'
              }}
            />
            <button
              type="submit"
              disabled={sending}
              style={{
                padding: '.8rem 1.25rem',
                borderRadius: 10,
                border: 'none',
                background: '#3AAC6E',
                color: '#07190F',
                fontFamily: 'var(--font-sans)',
                fontSize: '.9rem',
                fontWeight: 700,
                cursor: sending ? 'wait' : 'pointer',
                opacity: sending ? 0.7 : 1,
                whiteSpace: 'nowrap',
              }}
            >
              {sending ? 'Bezig…' : 'Link aanmaken'}
            </button>
          </form>

          {inviteError && (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.82rem',
                color: '#E5532A',
                margin: '.6rem 0 0',
              }}
            >
              {inviteError}
            </p>
          )}

          {inviteLink && (
            <div style={{ marginTop: '1rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.72rem',
                  fontWeight: 700,
                  color: 'rgba(244,236,219,.4)',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  marginBottom: '.5rem',
                }}
              >
                Stuur deze link naar het familielid
              </div>
              <div
                style={{
                  background: 'rgba(244,236,219,.05)',
                  border: '1px solid rgba(244,236,219,.12)',
                  borderRadius: 10,
                  padding: '.75rem 1rem',
                  marginBottom: '.6rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'ui-monospace,monospace',
                    fontSize: '.72rem',
                    color: 'rgba(244,236,219,.5)',
                    wordBreak: 'break-all',
                  }}
                >
                  {inviteLink}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => copyLink(inviteLink)}
                  style={{
                    flex: 1,
                    padding: '.65rem 1rem',
                    borderRadius: 8,
                    border: '1px solid rgba(244,236,219,.18)',
                    background: linkCopied ? 'rgba(58,172,110,.15)' : 'rgba(244,236,219,.07)',
                    color: linkCopied ? '#3AAC6E' : '#F4ECDB',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all .2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {linkCopied ? '✓ Gekopieerd!' : 'Kopieer link'}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hallo! Ik nodig u uit voor KloptHet — een app om verdachte berichten te controleren. Klik op de link om te beginnen: ${inviteLink}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    padding: '.65rem 1rem',
                    borderRadius: 8,
                    border: '1px solid rgba(37,211,102,.3)',
                    background: 'rgba(37,211,102,.08)',
                    color: '#25D366',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Stuur via WhatsApp
                </a>
              </div>
            </div>
          )}

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.75rem',
              color: 'rgba(244,236,219,.3)',
              margin: '.75rem 0 0',
              lineHeight: 1.5,
            }}
          >
            Het familielid klikt op de link en maakt gratis een account aan.
          </p>
        </div>
      )}

      {/* Info */}
      <div
        style={{
          background: 'rgba(244,236,219,.03)',
          border: '1px solid rgba(244,236,219,.07)',
          borderRadius: 12,
          padding: '.9rem 1.1rem',
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(244,236,219,.4)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: 1 }}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.8rem',
            color: 'rgba(244,236,219,.4)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Zet &ldquo;Ik zie hun scans&rdquo; aan om de scan-uitslagen van een familielid te
          bekijken. U ontvangt automatisch een melding wanneer een familielid een gevaarlijk bericht
          controleert.
        </p>
      </div>
    </div>
  )
}

function MemberRow({
  member,
  onToggle,
  onRemove,
  locale,
}: {
  member: Member
  onToggle: (
    id: string,
    field: 'owner_can_see_scans' | 'member_can_see_owner',
    value: boolean
  ) => void
  onRemove: (id: string) => void
  locale: string
}) {
  const [expanded, setExpanded] = useState(false)
  const [resending, setResending] = useState(false)
  const [resendDone, setResendDone] = useState(false)

  const handleResend = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setResending(true)
    try {
      await fetch('/api/family/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId: member.id, locale }),
      })
      setResendDone(true)
      setTimeout(() => setResendDone(false), 3000)
    } finally {
      setResending(false)
    }
  }

  return (
    <div style={{ borderTop: '1px solid rgba(244,236,219,.06)' }}>
      {/* Hoofd rij */}
      <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar
          letter={member.invited_email.charAt(0).toUpperCase()}
          color={member.status === 'active' ? 'rgba(244,236,219,.7)' : 'rgba(244,236,219,.3)'}
          avatarUrl={member.avatar_url}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.88rem',
              color: member.status === 'active' ? '#F4ECDB' : 'rgba(244,236,219,.55)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {member.invited_email}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.72rem',
              color: 'rgba(244,236,219,.35)',
              marginTop: 1,
            }}
          >
            {member.status === 'active'
              ? `Actief lid${member.joined_at ? ` · Lid sinds ${new Date(member.joined_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}` : ''}`
              : 'Uitnodiging verstuurd · wacht op acceptatie'}
          </div>
        </div>

        {/* Recente scans dots */}
        {member.recentScans && member.recentScans.length > 0 && (
          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            {member.recentScans.slice(0, 5).map((s, i) => (
              <div
                key={i}
                title={`${catLabel[s.verdict_category]} · ${s.verdict_score}/10`}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: catColor[s.verdict_category],
                }}
              />
            ))}
          </div>
        )}

        {/* Opnieuw sturen — alleen bij pending */}
        {member.status === 'pending' && (
          <button
            onClick={handleResend}
            disabled={resending}
            title={resendDone ? 'Verstuurd!' : 'Opnieuw versturen'}
            style={{
              background: resendDone ? 'rgba(58,172,110,.15)' : 'transparent',
              border: 'none',
              cursor: resending ? 'wait' : 'pointer',
              color: resendDone ? '#3AAC6E' : 'rgba(244,236,219,.35)',
              padding: '4px',
              display: 'flex',
              flexShrink: 0,
              borderRadius: 6,
              transition: 'color .2s',
            }}
            onMouseEnter={(e) => {
              if (!resendDone) e.currentTarget.style.color = 'rgba(244,236,219,.7)'
            }}
            onMouseLeave={(e) => {
              if (!resendDone) e.currentTarget.style.color = 'rgba(244,236,219,.35)'
            }}
          >
            {resendDone ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
            )}
          </button>
        )}

        {/* Uitklap toggle */}
        <button
          onClick={() => setExpanded((x) => !x)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(244,236,219,.35)',
            padding: '4px',
            display: 'flex',
            flexShrink: 0,
            transition: 'transform .2s',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
          }}
          title="Instellingen"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Uitklapbaar: instellingen + recente activiteit */}
      {expanded && (
        <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid rgba(244,236,219,.05)' }}>
          {/* Toestemmingen */}
          <div
            style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}
          >
            <Toggle
              label="Ik zie hun scan-uitslagen"
              description="U kunt de scan-uitslagen van dit familielid zien"
              value={member.owner_can_see_scans}
              onChange={(v) => onToggle(member.id, 'owner_can_see_scans', v)}
            />
            <Toggle
              label="Zij zien mijn scan-uitslagen"
              description="Uw familielid kan uw gecontroleerde berichten ook zien"
              value={member.member_can_see_owner}
              onChange={(v) => onToggle(member.id, 'member_can_see_owner', v)}
            />
          </div>

          {/* Recente activiteit */}
          {member.owner_can_see_scans && member.recentScans && member.recentScans.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.68rem',
                  fontWeight: 700,
                  color: 'rgba(244,236,219,.3)',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  marginBottom: '.6rem',
                }}
              >
                Recente activiteit
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
                {member.recentScans.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: catColor[s.verdict_category],
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.8rem',
                        color: catColor[s.verdict_category],
                        fontWeight: 600,
                        minWidth: 70,
                      }}
                    >
                      {catLabel[s.verdict_category]}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.75rem',
                        color: 'rgba(244,236,219,.3)',
                      }}
                    >
                      {new Date(s.created_at).toLocaleDateString('nl-NL', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verwijderen */}
          <button
            onClick={() => onRemove(member.id)}
            style={{
              marginTop: '1rem',
              background: 'transparent',
              border: 'none',
              color: 'rgba(229,83,42,.55)',
              fontFamily: 'var(--font-sans)',
              fontSize: '.8rem',
              cursor: 'pointer',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#E5532A'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(229,83,42,.55)'
            }}
          >
            Lid verwijderen
          </button>
        </div>
      )}
    </div>
  )
}

function Avatar({
  letter,
  color,
  avatarUrl,
}: {
  letter: string
  color: string
  avatarUrl?: string | null
}) {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: `${color}20`,
        border: `1.5px solid ${color}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: '.9rem',
        color,
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Profielfoto"
          width={36}
          height={36}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      ) : (
        letter
      )}
    </div>
  )
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '.68rem',
        fontWeight: 700,
        color,
        letterSpacing: '.06em',
        textTransform: 'uppercase',
        background: `${color}18`,
        padding: '.2rem .6rem',
        borderRadius: 9999,
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  )
}

function Toggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string
  description: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.85rem',
            fontWeight: 600,
            color: '#F4ECDB',
            marginBottom: '.15rem',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.75rem',
            color: 'rgba(244,236,219,.4)',
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        role="switch"
        aria-checked={value}
        style={{
          width: 42,
          height: 24,
          borderRadius: 9999,
          background: value ? '#3AAC6E' : 'rgba(244,236,219,.12)',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background .2s',
          flexShrink: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: value ? 21 : 3,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#fff',
            transition: 'left .2s',
            boxShadow: '0 1px 3px rgba(0,0,0,.3)',
          }}
        />
      </button>
    </div>
  )
}
