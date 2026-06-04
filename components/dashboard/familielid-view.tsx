'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type OtherMember = {
  id: string
  email: string
  name: string
  avatarUrl: string | null
  joinedAt: string | null
}

type ActivityScan = {
  memberEmail: string
  memberName: string | null
  memberAvatar: string | null
  verdict_category: 'safe' | 'doubt' | 'phishing'
  verdict_score: number
  verdict_summary: string | null
  input_kind: string
  created_at: string
}

type Props = {
  memberId: string
  ownerName: string
  ownerEmail: string
  ownerAvatarUrl: string | null
  ownAvatarUrl?: string | null
  joinedAt: string | null
  ownerCanSeeScans: boolean
  memberCanSeeOwner: boolean
  otherMembers?: OtherMember[]
  activityFeed?: ActivityScan[]
}

export function FamilielidView({
  memberId,
  ownerName,
  ownerEmail,
  ownerAvatarUrl,
  ownAvatarUrl,
  joinedAt,
  ownerCanSeeScans: initialOwnerCanSeeScans,
  memberCanSeeOwner,
  otherMembers = [],
  activityFeed = [],
}: Props) {
  const locale = useLocale()
  const router = useRouter()
  const [leaving, setLeaving] = useState(false)
  const [confirmLeave, setConfirmLeave] = useState(false)
  const [ownerCanSeeScans, setOwnerCanSeeScans] = useState(initialOwnerCanSeeScans)
  const [savingPrivacy, setSavingPrivacy] = useState(false)

  const toggleOwnerCanSee = async () => {
    const newVal = !ownerCanSeeScans
    setOwnerCanSeeScans(newVal)
    setSavingPrivacy(true)
    await fetch('/api/family/members', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId, owner_can_see_scans: newVal }),
    })
    setSavingPrivacy(false)
  }

  const handleLeave = async () => {
    setLeaving(true)
    await fetch('/api/family/members', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId }),
    })
    router.refresh()
    setLeaving(false)
    setConfirmLeave(false)
  }

  const allMembers = [
    {
      name: ownerName,
      email: ownerEmail,
      avatarUrl: ownerAvatarUrl,
      role: 'Eigenaar',
      roleColor: '#3AAC6E',
      joinedAt: null as string | null,
    },
    ...otherMembers.map((m) => ({
      name: m.name,
      email: m.email,
      avatarUrl: m.avatarUrl,
      role: 'Lid',
      roleColor: 'rgba(244,236,219,.4)',
      joinedAt: m.joinedAt,
    })),
  ]

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 700, margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
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
            U bent lid van een familiegroep
          </p>
        </div>
        <button
          onClick={() => router.refresh()}
          style={{
            background: 'transparent',
            border: '1px solid rgba(244,236,219,.15)',
            borderRadius: 8,
            padding: '.45rem .8rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '.78rem',
            color: 'rgba(244,236,219,.45)',
            cursor: 'pointer',
            flexShrink: 0,
            marginTop: 4,
          }}
        >
          ↻ Vernieuwen
        </button>
      </div>

      {/* Status banner */}
      <div
        style={{
          background: 'rgba(58,172,110,.07)',
          border: '1px solid rgba(58,172,110,.2)',
          borderRadius: 14,
          padding: '1rem 1.25rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(58,172,110,.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3AAC6E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '.9rem',
              color: '#F4ECDB',
            }}
          >
            Gratis toegang via familieabonnement
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.78rem',
              color: 'rgba(244,236,219,.45)',
              marginTop: 2,
            }}
          >
            Uw gebruik is inbegrepen bij het abonnement van {ownerName}
          </div>
        </div>
      </div>

      {/* Leden lijst */}
      <div
        style={{
          background: 'rgba(244,236,219,.04)',
          border: '1px solid rgba(244,236,219,.1)',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: '1.25rem',
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
          Leden van uw familiegroep
        </div>

        {allMembers.map((member, i) => (
          <div
            key={i}
            style={{
              padding: '1rem 1.25rem',
              borderBottom: i < allMembers.length - 1 ? '1px solid rgba(244,236,219,.06)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(244,236,219,.08)',
                border: '1.5px solid rgba(244,236,219,.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '.9rem',
                color: 'rgba(244,236,219,.6)',
                flexShrink: 0,
                overflow: 'hidden',
              }}
            >
              {member.avatarUrl ? (
                <Image
                  src={member.avatarUrl}
                  alt={member.name}
                  width={40}
                  height={40}
                  unoptimized
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              ) : (
                member.name.charAt(0).toUpperCase()
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '.9rem',
                  color: '#F4ECDB',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {member.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.75rem',
                  color: 'rgba(244,236,219,.35)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {member.email}
              </div>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.68rem',
                fontWeight: 700,
                color: member.roleColor,
                background: `${member.roleColor}18`,
                border: `1px solid ${member.roleColor}30`,
                padding: '.2rem .6rem',
                borderRadius: 9999,
                textTransform: 'uppercase',
                letterSpacing: '.05em',
                flexShrink: 0,
              }}
            >
              {member.role}
            </span>
          </div>
        ))}

        {/* Uzelf */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderTop: '1px solid rgba(244,236,219,.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(30,80,180,.05)',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(30,80,180,.15)',
              border: '1.5px solid rgba(30,80,180,.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '.9rem',
              color: 'rgba(100,160,255,.8)',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {ownAvatarUrl ? (
              <Image
                src={ownAvatarUrl}
                alt="U"
                width={40}
                height={40}
                unoptimized
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            ) : (
              'U'
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '.9rem',
                color: '#F4ECDB',
              }}
            >
              U
            </div>
            {joinedAt && (
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.75rem',
                  color: 'rgba(244,236,219,.35)',
                }}
              >
                Lid sinds{' '}
                {new Date(joinedAt).toLocaleDateString('nl-NL', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            )}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.68rem',
              fontWeight: 700,
              color: 'rgba(100,160,255,.8)',
              background: 'rgba(30,80,180,.12)',
              border: '1px solid rgba(30,80,180,.2)',
              padding: '.2rem .6rem',
              borderRadius: 9999,
              textTransform: 'uppercase',
              letterSpacing: '.05em',
              flexShrink: 0,
            }}
          >
            Lid
          </span>
        </div>
      </div>

      {/* Privacy instellingen */}
      <div
        style={{
          background: 'rgba(244,236,219,.04)',
          border: '1px solid rgba(244,236,219,.1)',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: '1.25rem',
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
          Privacy
        </div>

        {/* Toggle: eigenaar mag mijn scans zien */}
        <div style={{ padding: '1rem 1.25rem' }}>
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
                  fontWeight: 600,
                  fontSize: '.9rem',
                  color: '#F4ECDB',
                  marginBottom: '.25rem',
                }}
              >
                {ownerName} mag mijn scans zien
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.78rem',
                  color: 'rgba(244,236,219,.4)',
                  lineHeight: 1.5,
                }}
              >
                {ownerCanSeeScans
                  ? `${ownerName} kan uw scan-uitslagen bekijken in het familie-dashboard.`
                  : 'Uw scan-uitslagen zijn privé. Alleen u kunt ze zien.'}
              </div>
            </div>
            <button
              onClick={toggleOwnerCanSee}
              disabled={savingPrivacy}
              role="switch"
              aria-checked={ownerCanSeeScans}
              style={{
                width: 42,
                height: 24,
                borderRadius: 9999,
                background: ownerCanSeeScans ? '#3AAC6E' : 'rgba(244,236,219,.12)',
                border: 'none',
                cursor: savingPrivacy ? 'wait' : 'pointer',
                position: 'relative',
                transition: 'background .2s',
                flexShrink: 0,
                padding: 0,
                opacity: savingPrivacy ? 0.6 : 1,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 3,
                  left: ownerCanSeeScans ? 21 : 3,
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
        </div>

        {/* Info: wat eigenaar voor jou heeft ingesteld */}
        <div
          style={{
            padding: '.75rem 1.25rem 1rem',
            borderTop: '1px solid rgba(244,236,219,.06)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.78rem',
              color: 'rgba(244,236,219,.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Uw rechten:{' '}
            <span style={{ color: 'rgba(244,236,219,.6)', fontWeight: 600 }}>
              {memberCanSeeOwner ? 'Bekijken + scannen' : 'Alleen bekijken'}
            </span>
          </div>
        </div>
      </div>

      {/* Familie activiteit */}
      {activityFeed.length > 0 && <FamilieActiviteitLid feed={activityFeed} />}

      <div
        style={{
          marginBottom: '1.5rem',
          padding: '.75rem 1rem',
          background: 'rgba(244,236,219,.02)',
          border: '1px solid rgba(244,236,219,.06)',
          borderRadius: 10,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.78rem',
            color: 'rgba(244,236,219,.35)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Wilt u uw eigen familiegroep beheren?{' '}
          <Link
            href={`/${locale}/abonnement`}
            style={{ color: 'rgba(58,172,110,.8)', textDecoration: 'none' }}
          >
            Bekijk abonnementen
          </Link>
          .
        </p>
      </div>

      {/* Verlaten */}
      {!confirmLeave ? (
        <button
          onClick={() => setConfirmLeave(true)}
          style={{
            background: 'transparent',
            border: '1px solid rgba(229,83,42,.3)',
            borderRadius: 10,
            padding: '.65rem 1.1rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '.85rem',
            color: 'rgba(229,83,42,.7)',
            cursor: 'pointer',
          }}
        >
          Familiegroep verlaten
        </button>
      ) : (
        <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.85rem',
              color: 'rgba(244,236,219,.5)',
            }}
          >
            Weet u het zeker?
          </span>
          <button
            onClick={handleLeave}
            disabled={leaving}
            style={{
              background: 'rgba(229,83,42,.12)',
              border: '1px solid rgba(229,83,42,.35)',
              borderRadius: 8,
              padding: '.5rem .9rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '.82rem',
              color: '#E5532A',
              cursor: leaving ? 'wait' : 'pointer',
              fontWeight: 700,
            }}
          >
            {leaving ? 'Bezig…' : 'Ja, verlaten'}
          </button>
          <button
            onClick={() => setConfirmLeave(false)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(244,236,219,.15)',
              borderRadius: 8,
              padding: '.5rem .9rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '.82rem',
              color: 'rgba(244,236,219,.5)',
              cursor: 'pointer',
            }}
          >
            Annuleren
          </button>
        </div>
      )}
    </div>
  )
}

const catColor = { safe: '#3AAC6E', doubt: '#D97B2A', phishing: '#E5532A' }
const catLabel = { safe: 'Veilig', doubt: 'Let op', phishing: 'Gevaarlijk' }

function FamilieActiviteitLid({ feed }: { feed: ActivityScan[] }) {
  const [open, setOpen] = useState(false)
  const alertCount = feed.filter((s) => s.verdict_category === 'phishing').length

  return (
    <div
      style={{
        background: 'rgba(244,236,219,.04)',
        border: `1px solid ${alertCount > 0 ? 'rgba(229,83,42,.25)' : 'rgba(244,236,219,.1)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: '1.25rem',
      }}
    >
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
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.72rem',
            fontWeight: 700,
            color: 'rgba(244,236,219,.35)',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            flex: 1,
            textAlign: 'left',
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
            {alertCount > 0 ? `${alertCount} gevaarlijk` : `${feed.length} scans`}
          </span>
        )}
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

      {open && (
        <div
          style={{
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '.6rem',
          }}
        >
          {feed.map((s, i) => {
            const color = catColor[s.verdict_category]
            const label = catLabel[s.verdict_category]
            const name = s.memberName || s.memberEmail.split('@')[0]
            const isDanger = s.verdict_category === 'phishing'

            return (
              <div
                key={i}
                style={{
                  background: isDanger
                    ? 'rgba(229,83,42,.07)'
                    : s.verdict_category === 'doubt'
                      ? 'rgba(217,123,42,.06)'
                      : 'rgba(58,172,110,.06)',
                  border: `1px solid ${color}30`,
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
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.82rem',
                      fontWeight: 600,
                      color: '#F4ECDB',
                      flex: 1,
                    }}
                  >
                    {name}
                  </span>
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
  )
}
