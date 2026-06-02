import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { SearchIcon, ArrowRightIcon } from '@/components/shared/icons'

const fraudTips = [
  {
    tag: 'Kleinkind-truc',
    title: 'Bel altijd terug op het vaste nummer',
    body: 'Krijgt u een appje van een "kind" of "kleinkind" via een nieuw nummer? Bel dan altijd terug op het nummer dat u al kent. Een echte dierbare begrijpt dat.',
  },
  {
    tag: 'Bank-fraude',
    title: 'Uw bank belt nooit om in te loggen',
    body: 'Een echte medewerker van uw bank vraagt nooit om uw pincode, wachtwoord of om in te loggen via een sms-link. Hang op en bel zelf het nummer op de achterkant van uw bankpas.',
  },
  {
    tag: 'Bezorg-fraude',
    title: 'PostNL en DHL sturen geen betaallinks',
    body: 'Een sms over "herbezorgkosten" van €1,99 is bijna altijd fraude. Officiële bezorgdiensten sturen nooit een betaalverzoek via sms.',
  },
  {
    tag: 'Phishing',
    title: 'Controleer het adres vóór de punt',
    body: 'In een link telt alleen het deel vóór de eerste "/". "ing-veilig.com" is niet van ING — "ing.nl" wel. Twijfelt u? Typ het adres zelf in uw browser.',
  },
  {
    tag: 'Romantiek-scam',
    title: 'Online liefde die om geld vraagt is bijna altijd nep',
    body: 'Iemand die u alleen online kent en snel veel aandacht geeft — en daarna om geld vraagt — is vrijwel altijd een oplichter. Hoe lief het ook voelt.',
  },
  {
    tag: 'Telefonische fraude',
    title: '"Microsoft" belt u nooit zomaar op',
    body: 'Microsoft, Google en andere techbedrijven bellen consumenten nooit ongevraagd over een "virus op uw computer". Hang direct op.',
  },
]

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/inloggen`)

  const [{ data: recentScans }, { count: totalScans }, { data: categoryData }] = await Promise.all([
    supabase
      .from('scans')
      .select('id, verdict_category, verdict_score, verdict_summary, created_at, input_kind')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase.from('scans').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    supabase.from('scans').select('verdict_category').eq('user_id', user.id),
  ])

  const safe = categoryData?.filter((s) => s.verdict_category === 'safe').length ?? 0
  const doubt = categoryData?.filter((s) => s.verdict_category === 'doubt').length ?? 0
  const phishing = categoryData?.filter((s) => s.verdict_category === 'phishing').length ?? 0
  const total = totalScans ?? 0
  const safePercent = total > 0 ? Math.round((safe / total) * 100) : 0

  const now = new Date()
  const weekNum = Math.floor(
    (now.getFullYear() * 52 + Math.floor((now.getMonth() * 52) / 12) + now.getDate()) / 7
  )
  const tip = fraudTips[weekNum % fraudTips.length]

  const name = user.user_metadata?.full_name?.split(' ')[0] ?? 'u'

  const categoryLabel = {
    safe: { label: 'Geen alarmsignalen', color: '#3AAC6E' },
    doubt: { label: 'Let op', color: '#D97B2A' },
    phishing: { label: 'Meerdere waarschuwingen', color: '#E5532A' },
  }

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', margin: '0 auto', maxWidth: 900 }}>
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
        <p
          style={{
            color: 'rgba(244,236,219,.5)',
            fontFamily: 'var(--font-sans)',
            margin: 0,
            fontSize: '.9rem',
          }}
        >
          {total
            ? `U heeft ${total} bericht${total !== 1 ? 'en' : ''} gecontroleerd.`
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
          background: 'linear-gradient(135deg, #102040 0%, #1b3a6e 100%)',
          border: '1px solid rgba(58,172,110,.35)',
          borderRadius: 16,
          padding: '1.25rem 1.5rem',
          textDecoration: 'none',
          marginBottom: '1.25rem',
          boxShadow: '0 8px 24px -8px rgba(58,172,110,.25)',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.72rem',
              fontWeight: 700,
              color: '#3AAC6E',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              marginBottom: '.25rem',
            }}
          >
            Twijfelt u over een bericht?
          </div>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: '1.3rem',
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

      {/* Statistieken */}
      {total > 0 && (
        <div
          style={{
            background: 'rgba(244,236,219,.04)',
            border: '1px solid rgba(244,236,219,.1)',
            borderRadius: 16,
            padding: '1.25rem 1.5rem',
            marginBottom: '1.25rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.72rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.4)',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Uw overzicht
          </div>

          {/* Stat kaartjes */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '.75rem',
              marginBottom: '1.1rem',
            }}
          >
            {[
              { label: 'Gecontroleerd', value: total, color: 'rgba(244,236,219,.7)' },
              { label: 'Veilig', value: safe, color: '#3AAC6E' },
              { label: 'Gevaarlijk', value: phishing + doubt, color: '#E5532A' },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                style={{
                  background: 'rgba(244,236,219,.04)',
                  border: '1px solid rgba(244,236,219,.08)',
                  borderRadius: 12,
                  padding: '.9rem 1rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    fontSize: '1.8rem',
                    lineHeight: 1,
                    color,
                    marginBottom: '.25rem',
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.75rem',
                    color: 'rgba(244,236,219,.4)',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Risicobalk */}
          <div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.72rem',
                  color: 'rgba(244,236,219,.35)',
                }}
              >
                Verdeling van uw controles
              </span>
              <span
                style={{ fontFamily: 'var(--font-sans)', fontSize: '.72rem', color: '#3AAC6E' }}
              >
                {safePercent}% veilig
              </span>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 9999,
                background: 'rgba(244,236,219,.07)',
                overflow: 'hidden',
                display: 'flex',
              }}
            >
              {safe > 0 && (
                <div
                  style={{
                    width: `${(safe / total) * 100}%`,
                    background: '#3AAC6E',
                    transition: 'width .6s ease',
                  }}
                />
              )}
              {doubt > 0 && (
                <div
                  style={{
                    width: `${(doubt / total) * 100}%`,
                    background: '#D97B2A',
                    transition: 'width .6s ease',
                  }}
                />
              )}
              {phishing > 0 && (
                <div
                  style={{
                    width: `${(phishing / total) * 100}%`,
                    background: '#E5532A',
                    transition: 'width .6s ease',
                  }}
                />
              )}
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '.5rem' }}>
              {[
                { label: 'Veilig', color: '#3AAC6E' },
                { label: 'Let op', color: '#D97B2A' },
                { label: 'Gevaarlijk', color: '#E5532A' },
              ].map(({ label, color }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.7rem',
                    color: 'rgba(244,236,219,.35)',
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: color,
                      flexShrink: 0,
                    }}
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fraude-tip */}
      <div
        style={{
          background: 'rgba(244,236,219,.04)',
          border: '1px solid rgba(244,236,219,.1)',
          borderRadius: 16,
          padding: '1.25rem 1.5rem',
          marginBottom: '1.25rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'rgba(217,123,42,.12)',
            border: '1px solid rgba(217,123,42,.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D97B2A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4M12 17h.01" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: '.4rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.65rem',
                fontWeight: 700,
                color: '#D97B2A',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
              }}
            >
              Tip van de week
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.65rem',
                color: 'rgba(244,236,219,.3)',
                background: 'rgba(244,236,219,.06)',
                padding: '2px 7px',
                borderRadius: 9999,
              }}
            >
              {tip.tag}
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '.92rem',
              color: '#F4ECDB',
              marginBottom: '.35rem',
            }}
          >
            {tip.title}
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.84rem',
              color: 'rgba(244,236,219,.55)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {tip.body}
          </p>
        </div>
      </div>

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
            padding: '1rem 1.5rem',
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
              fontSize: '.85rem',
              color: 'rgba(244,236,219,.5)',
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
                    padding: '.9rem 1.5rem',
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
                        fontSize: '.8rem',
                        fontWeight: 600,
                        color: cat.color,
                        marginBottom: '.15rem',
                      }}
                    >
                      {cat.label} · {scan.verdict_score}/10
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.85rem',
                        color: 'rgba(244,236,219,.55)',
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
                      fontSize: '.72rem',
                      color: 'rgba(244,236,219,.28)',
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
