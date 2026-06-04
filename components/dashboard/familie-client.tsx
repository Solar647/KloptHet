'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import Image from 'next/image'

type Scan = {
  verdict_category: 'safe' | 'doubt' | 'phishing'
  verdict_score: number
  verdict_summary: string | null
  input_kind: string
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
  invite_token?: string | null
  memberName?: string | null
  recentScans?: Scan[]
}

type Props = {
  tier: string
  userEmail: string
  userName?: string | null
  ownerAvatarUrl?: string | null
  members: Member[]
  max: number
}

const catColor = { safe: '#3AAC6E', doubt: '#D97B2A', phishing: '#E5532A' }
const catLabel = { safe: 'Veilig', doubt: 'Let op', phishing: 'Gevaar' }

export function FamilieClient({
  tier,
  userEmail,
  userName,
  ownerAvatarUrl,
  members: initialMembers,
  max,
}: Props) {
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

  // Alleen member_can_see_owner (lid-rechten) wordt door eigenaar gezet
  const updatePermission = async (
    memberId: string,
    field: 'member_can_see_owner',
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
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', margin: '0 auto', maxWidth: 1000 }}>
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
          <Avatar
            letter={userEmail.charAt(0).toUpperCase()}
            color="#3AAC6E"
            avatarUrl={ownerAvatarUrl}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '.9rem',
                color: '#F4ECDB',
              }}
            >
              {userName ? `${userName.slice(0, 20)} (eigenaar)` : 'U (eigenaar)'}
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
            onTogglePermission={updatePermission}
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

          {inviteLink ? (
            <div>
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
              <div
                style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}
              >
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
                    whiteSpace: 'nowrap',
                  }}
                >
                  {linkCopied ? '✓ Gekopieerd!' : 'Kopieer link'}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hallo! Ik nodig u uit voor KloptHet: ${inviteLink}`)}`}
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
                    textDecoration: 'none',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
              <button
                onClick={() => {
                  setInviteLink('')
                  setInviteSuccess('')
                }}
                style={{
                  width: '100%',
                  padding: '.75rem',
                  borderRadius: 10,
                  border: '1px solid rgba(244,236,219,.15)',
                  background: 'transparent',
                  color: 'rgba(244,236,219,.6)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                + Nog iemand uitnodigen
              </button>
            </div>
          ) : (
            <div>
              <form
                onSubmit={handleInvite}
                style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}
              >
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
              {inviteSuccess && !inviteLink && (
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.82rem',
                    color: '#3AAC6E',
                    margin: '.6rem 0 0',
                  }}
                >
                  {inviteSuccess}
                </p>
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
        </div>
      )}

      {/* Familie activiteit feed */}
      <FamilieActiviteit members={activeMembers} />

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
          Familieleden bepalen zelf of u hun scans mag zien. U kunt per lid instellen welke rechten
          zij hebben: alleen bekijken of ook zelf scannen.
        </p>
      </div>
    </div>
  )
}

function MemberRow({
  member,
  onTogglePermission,
  onRemove,
  locale,
}: {
  member: Member
  onTogglePermission: (id: string, field: 'member_can_see_owner', value: boolean) => void
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
            {member.status === 'active' ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {member.joined_at &&
                  `Actief · Lid sinds ${new Date(member.joined_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}`}
                {/* Indicator: lid heeft scans gedeeld */}
                {member.owner_can_see_scans && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 3,
                      color: '#3AAC6E',
                      fontSize: '.68rem',
                      fontWeight: 600,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: '#3AAC6E',
                        display: 'inline-block',
                      }}
                    />
                    Deelt scans
                  </span>
                )}
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#D97B2A',
                    flexShrink: 0,
                    display: 'inline-block',
                  }}
                />
                Wacht op acceptatie
              </span>
            )}
          </div>
        </div>

        {/* Recente scans dots — alleen als lid scans deelt */}
        {member.owner_can_see_scans && member.recentScans && member.recentScans.length > 0 && (
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

      {/* Uitnodigingslink voor pending leden */}
      {member.status === 'pending' && member.invite_token && (
        <div style={{ padding: '0 1.25rem .85rem' }}>
          <PendingInviteLink token={member.invite_token} locale={locale} />
        </div>
      )}

      {/* Uitklapbaar: rechten + scans */}
      {expanded && (
        <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid rgba(244,236,219,.05)' }}>
          {/* Lid-rechten: eigenaar kiest */}
          <div style={{ marginTop: '1rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.68rem',
                fontWeight: 700,
                color: 'rgba(244,236,219,.3)',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                marginBottom: '.75rem',
              }}
            >
              Rechten van dit lid
            </div>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              {[
                {
                  value: false,
                  label: 'Alleen bekijken',
                  desc: 'Lid kan scan-geschiedenis inzien',
                },
                {
                  value: true,
                  label: 'Bekijken + scannen',
                  desc: 'Lid kan ook zelf scans toevoegen',
                },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  onClick={() => onTogglePermission(member.id, 'member_can_see_owner', opt.value)}
                  style={{
                    flex: 1,
                    padding: '.65rem .85rem',
                    borderRadius: 10,
                    border: `1px solid ${member.member_can_see_owner === opt.value ? 'rgba(58,172,110,.4)' : 'rgba(244,236,219,.1)'}`,
                    background:
                      member.member_can_see_owner === opt.value
                        ? 'rgba(58,172,110,.08)'
                        : 'rgba(244,236,219,.03)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.82rem',
                      fontWeight: 600,
                      color:
                        member.member_can_see_owner === opt.value
                          ? '#3AAC6E'
                          : 'rgba(244,236,219,.6)',
                      marginBottom: '.2rem',
                    }}
                  >
                    {opt.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.72rem',
                      color: 'rgba(244,236,219,.3)',
                    }}
                  >
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Scans van dit lid — alleen zichtbaar als lid dit heeft ingeschakeld */}
          {member.owner_can_see_scans && member.recentScans && member.recentScans.length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
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
                Recente scans
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

          {/* Lid heeft scans niet gedeeld */}
          {!member.owner_can_see_scans && member.status === 'active' && (
            <div
              style={{
                marginTop: '1rem',
                padding: '.65rem .85rem',
                background: 'rgba(244,236,219,.03)',
                border: '1px solid rgba(244,236,219,.07)',
                borderRadius: 10,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.78rem',
                  color: 'rgba(244,236,219,.3)',
                  margin: 0,
                }}
              >
                Dit lid heeft scans nog niet gedeeld. Zij kunnen dit zelf aanzetten in hun
                familie-dashboard.
              </p>
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

function FamilieActiviteit({ members }: { members: Member[] }) {
  const [open, setOpen] = useState(false)

  // Verzamel alle scans van leden die delen, gesorteerd op datum
  const feed = members
    .filter((m) => m.status === 'active' && m.owner_can_see_scans && m.recentScans?.length)
    .flatMap((m) =>
      (m.recentScans ?? []).map((s) => ({
        ...s,
        memberEmail: m.invited_email,
        memberName: m.memberName,
        memberAvatar: m.avatar_url,
      }))
    )
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const sharingMembers = members.filter((m) => m.status === 'active' && m.owner_can_see_scans)
  const alertCount = feed.filter((s) => s.verdict_category === 'phishing').length

  if (sharingMembers.length === 0) return null

  return (
    <div
      style={{
        background: 'rgba(244,236,219,.04)',
        border: `1px solid ${alertCount > 0 ? 'rgba(229,83,42,.25)' : 'rgba(244,236,219,.1)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: '1rem',
      }}
    >
      {/* Header — klikbaar */}
      <button
        onClick={() => setOpen((x) => !x)}
        style={{
          width: '100%',
          padding: '.9rem 1.25rem',
          background: 'transparent',
          border: 'none',
          borderBottom: open ? '1px solid rgba(244,236,219,.07)' : 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.72rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.35)',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
            }}
          >
            Familie activiteit
          </span>
          {feed.length > 0 && (
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.68rem',
                fontWeight: 700,
                color: alertCount > 0 ? '#E5532A' : 'rgba(244,236,219,.4)',
                background: alertCount > 0 ? 'rgba(229,83,42,.12)' : 'rgba(244,236,219,.08)',
                border: `1px solid ${alertCount > 0 ? 'rgba(229,83,42,.25)' : 'rgba(244,236,219,.12)'}`,
                padding: '.15rem .5rem',
                borderRadius: 9999,
              }}
            >
              {alertCount > 0
                ? `${alertCount} gevaar${alertCount > 1 ? 'lijk' : 'lijk'}`
                : `${feed.length} scans`}
            </span>
          )}
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(244,236,219,.35)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'transform .2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            flexShrink: 0,
          }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Feed */}
      {open && (
        <div style={{ padding: '0 1.25rem 1.25rem' }}>
          {feed.length === 0 ? (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.82rem',
                color: 'rgba(244,236,219,.3)',
                margin: '1rem 0 0',
                textAlign: 'center',
              }}
            >
              Nog geen scans van familieleden.
            </p>
          ) : (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', marginTop: '1rem' }}
            >
              {feed.map((s, i) => {
                const isDanger = s.verdict_category === 'phishing'
                const isWarn = s.verdict_category === 'doubt'
                const color = isDanger ? '#E5532A' : isWarn ? '#D97B2A' : '#3AAC6E'
                const bg = isDanger
                  ? 'rgba(229,83,42,.07)'
                  : isWarn
                    ? 'rgba(217,123,42,.06)'
                    : 'rgba(58,172,110,.06)'
                const border = isDanger
                  ? 'rgba(229,83,42,.2)'
                  : isWarn
                    ? 'rgba(217,123,42,.18)'
                    : 'rgba(58,172,110,.15)'
                const label = isDanger ? 'Gevaarlijk' : isWarn ? 'Let op' : 'Veilig'
                const name = s.memberName || s.memberEmail.split('@')[0]

                return (
                  <div
                    key={i}
                    style={{
                      background: bg,
                      border: `1px solid ${border}`,
                      borderRadius: 12,
                      padding: '.85rem 1rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: s.verdict_summary ? '.5rem' : 0,
                      }}
                    >
                      {/* Avatar */}
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: `${color}20`,
                          border: `1.5px solid ${color}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 700,
                          fontSize: '.75rem',
                          color,
                          flexShrink: 0,
                          overflow: 'hidden',
                        }}
                      >
                        {s.memberAvatar ? (
                          <Image
                            src={s.memberAvatar}
                            alt={name}
                            width={28}
                            height={28}
                            unoptimized
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                          />
                        ) : (
                          name.charAt(0).toUpperCase()
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            flexWrap: 'wrap',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '.82rem',
                              fontWeight: 600,
                              color: '#F4ECDB',
                            }}
                          >
                            {name}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '.7rem',
                              color: 'rgba(244,236,219,.35)',
                            }}
                          >
                            {s.input_kind === 'image' ? 'screenshot' : 'tekst'}
                          </span>
                        </div>
                      </div>

                      {/* Verdict badge */}
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.7rem',
                          fontWeight: 700,
                          color,
                          background: `${color}15`,
                          border: `1px solid ${color}30`,
                          padding: '.2rem .55rem',
                          borderRadius: 9999,
                          flexShrink: 0,
                        }}
                      >
                        {label} · {s.verdict_score}/10
                      </span>

                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.7rem',
                          color: 'rgba(244,236,219,.3)',
                          flexShrink: 0,
                        }}
                      >
                        {new Date(s.created_at).toLocaleDateString('nl-NL', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>

                    {/* Samenvatting */}
                    {s.verdict_summary && (
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.78rem',
                          color: 'rgba(244,236,219,.55)',
                          margin: 0,
                          lineHeight: 1.55,
                          paddingLeft: 36,
                        }}
                      >
                        {s.verdict_summary.length > 120
                          ? s.verdict_summary.slice(0, 120) + '…'
                          : s.verdict_summary}
                      </p>
                    )}

                    {/* Alert voor gevaarlijke scan */}
                    {isDanger && (
                      <div
                        style={{
                          marginTop: '.6rem',
                          marginLeft: 36,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.75rem',
                          color: '#E5532A',
                          fontWeight: 600,
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                          <path d="M12 9v4M12 17h.01" />
                        </svg>
                        Waarschuw dit familielid — dit bericht is oplichting
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
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
          unoptimized
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

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.klopthet.com'

function PendingInviteLink({ token, locale }: { token: string; locale: string }) {
  const [copied, setCopied] = useState(false)
  const link = `${APP_URL}/${locale}/uitnodiging/${token}`
  const copy = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div
      style={{
        marginTop: '.75rem',
        padding: '.75rem',
        background: 'rgba(244,236,219,.04)',
        border: '1px solid rgba(244,236,219,.08)',
        borderRadius: 10,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.68rem',
          fontWeight: 700,
          color: 'rgba(244,236,219,.35)',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          marginBottom: '.4rem',
        }}
      >
        Uitnodigingslink
      </div>
      <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: 'ui-monospace,monospace',
            fontSize: '.68rem',
            color: 'rgba(244,236,219,.4)',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {link}
        </span>
        <button
          onClick={copy}
          style={{
            background: copied ? 'rgba(58,172,110,.15)' : 'rgba(244,236,219,.08)',
            border: 'none',
            borderRadius: 6,
            padding: '.3rem .7rem',
            color: copied ? '#3AAC6E' : 'rgba(244,236,219,.6)',
            fontFamily: 'var(--font-sans)',
            fontSize: '.72rem',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {copied ? 'Gekopieerd!' : 'Kopieer'}
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`Uitnodiging KloptHet: ${link}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'rgba(37,211,102,.08)',
            border: 'none',
            borderRadius: 6,
            padding: '.3rem .7rem',
            color: '#25D366',
            fontFamily: 'var(--font-sans)',
            fontSize: '.72rem',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          WhatsApp
        </a>
      </div>
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
