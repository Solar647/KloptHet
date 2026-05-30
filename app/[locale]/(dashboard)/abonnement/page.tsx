import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const tiers = [
  {
    id: 'standard',
    name: 'Standaard',
    price: '3,99',
    yearlyPrice: '39,90',
    features: [
      'Onbeperkt controles',
      'Volledige uitleg + leermodule',
      'Scangeschiedenis (1 jaar)',
      'Wekelijkse fraude-nieuwsbrief',
    ],
    color: '#3AAC6E',
  },
  {
    id: 'family',
    name: 'Familie',
    price: '5,99',
    yearlyPrice: '59,90',
    features: [
      'Alles uit Standaard',
      'Tot 5 familieleden',
      'Mantelzorger-dashboard',
      'Melding bij verdacht bericht',
    ],
    color: '#5B8FE8',
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '9,99',
    yearlyPrice: '99,90',
    features: [
      'Alles uit Familie',
      'Telefonische hulplijn (24/7)',
      'Persoonlijke installatie-hulp',
      'Prioriteit-support',
    ],
    color: '#D97B2A',
    badge: 'Meest gekozen',
  },
]

const tierLabel: Record<string, string> = {
  free: 'Gratis',
  standard: 'Standaard',
  family: 'Familie',
  premium: 'Premium',
}

export default async function AbonnementPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/inloggen`)

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('tier, status, current_period_end')
    .eq('user_id', user.id)
    .single()

  const currentTier = sub?.tier ?? 'free'

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 900 }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            color: '#F4ECDB',
            margin: '0 0 .35rem',
            letterSpacing: '-.02em',
          }}
        >
          Abonnement
        </h1>
        <p style={{ color: 'rgba(244,236,219,.55)', fontFamily: 'var(--font-sans)', margin: 0 }}>
          Huidig abonnement: <strong style={{ color: '#F4ECDB' }}>{tierLabel[currentTier]}</strong>
          {sub?.current_period_end && (
            <span>
              {' '}
              · Verlengt op{' '}
              {new Date(sub.current_period_end).toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'long',
              })}
            </span>
          )}
        </p>
      </div>

      {/* Huidig plan banner */}
      {currentTier !== 'free' && (
        <div
          style={{
            background: 'rgba(58,172,110,.08)',
            border: '1px solid rgba(58,172,110,.2)',
            borderRadius: 14,
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.75rem',
                fontWeight: 700,
                color: '#3AAC6E',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                marginBottom: '.2rem',
              }}
            >
              Actief abonnement
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: '#F4ECDB',
              }}
            >
              {tierLabel[currentTier]}
            </div>
          </div>
          <button
            style={{
              background: 'transparent',
              border: '1px solid rgba(244,236,219,.2)',
              borderRadius: 10,
              padding: '.65rem 1.1rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '.85rem',
              color: 'rgba(244,236,219,.6)',
              cursor: 'pointer',
            }}
          >
            Opzeggen
          </button>
        </div>
      )}

      {/* Tier cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
        }}
        className="pricing-grid"
      >
        {tiers.map((tier) => {
          const tierOrder = ['free', 'standard', 'family', 'premium']
          const isCurrent = tier.id === currentTier
          const isUpgrade = tierOrder.indexOf(tier.id) > tierOrder.indexOf(currentTier)

          return (
            <div
              key={tier.id}
              style={{
                background: tier.highlighted ? 'rgba(91,143,232,.06)' : 'rgba(244,236,219,.04)',
                border: `1px solid ${isCurrent ? 'rgba(58,172,110,.4)' : tier.highlighted ? 'rgba(91,143,232,.25)' : 'rgba(244,236,219,.1)'}`,
                borderRadius: 16,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
              }}
            >
              {tier.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: tier.color,
                    color: '#07190F',
                    fontSize: '.65rem',
                    fontWeight: 700,
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                    padding: '.25rem .75rem',
                    borderRadius: 9999,
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  ★ {tier.badge}
                </div>
              )}
              {isCurrent && (
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#3AAC6E',
                    color: '#07190F',
                    fontSize: '.65rem',
                    fontWeight: 700,
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                    padding: '.25rem .75rem',
                    borderRadius: 9999,
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  ✓ Huidig plan
                </div>
              )}

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.75rem',
                    fontWeight: 700,
                    color: tier.color,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    marginBottom: '.3rem',
                  }}
                >
                  {tier.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '.3rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      fontSize: '2rem',
                      color: '#F4ECDB',
                    }}
                  >
                    €{tier.price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.78rem',
                      color: 'rgba(244,236,219,.4)',
                    }}
                  >
                    /mnd
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    color: 'rgba(244,236,219,.35)',
                    marginTop: 2,
                  }}
                >
                  of €{tier.yearlyPrice}/jaar (2 mnd gratis)
                </div>
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                  flex: 1,
                }}
              >
                {tier.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.85rem',
                      color: 'rgba(244,236,219,.75)',
                    }}
                  >
                    <span style={{ color: tier.color, flexShrink: 0, marginTop: 1 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '.85rem',
                    borderRadius: 10,
                    border: '1px solid rgba(58,172,110,.2)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.88rem',
                    color: '#3AAC6E',
                    fontWeight: 600,
                  }}
                >
                  Huidig plan
                </div>
              ) : (
                <Link
                  href={`/${locale}/abonnement/checkout?tier=${tier.id}&billing=monthly`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '.85rem',
                    borderRadius: 10,
                    background: isUpgrade ? tier.color : 'rgba(244,236,219,.08)',
                    color: isUpgrade ? '#07190F' : 'rgba(244,236,219,.6)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.88rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: isUpgrade ? 'none' : '1px solid rgba(244,236,219,.14)',
                    transition: 'opacity .15s',
                  }}
                >
                  {isUpgrade ? `Upgraden naar ${tier.name}` : `Wijzigen naar ${tier.name}`}
                </Link>
              )}
            </div>
          )
        })}
      </div>

      {/* Trust */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem 1.5rem',
          background: 'rgba(244,236,219,.03)',
          border: '1px solid rgba(244,236,219,.08)',
          borderRadius: 12,
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          fontFamily: 'var(--font-sans)',
          fontSize: '.8rem',
          color: 'rgba(244,236,219,.4)',
        }}
      >
        {['Geen verbintenis', 'Opzeggen wanneer u wilt', '30 dagen geld-terug-garantie'].map(
          (t) => (
            <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#3AAC6E' }}>✓</span>
              {t}
            </span>
          )
        )}
      </div>
    </div>
  )
}
