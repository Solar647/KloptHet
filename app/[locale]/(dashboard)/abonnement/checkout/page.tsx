'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'

const tierInfo: Record<
  string,
  { name: string; monthly: number; yearly: number; features: string[] }
> = {
  standard: {
    name: 'Standaard',
    monthly: 3.99,
    yearly: 39.9,
    features: ['Onbeperkt controles', 'Volledige uitleg + leermodule', 'Scangeschiedenis (1 jaar)'],
  },
  family: {
    name: 'Familie',
    monthly: 5.99,
    yearly: 59.9,
    features: ['Onbeperkt controles', 'Tot 5 familieleden', 'Mantelzorger-dashboard'],
  },
  premium: {
    name: 'Premium',
    monthly: 9.99,
    yearly: 99.9,
    features: ['Alles uit Familie', 'Telefonische hulplijn (24/7)', 'Prioriteit-support'],
  },
}

function CheckoutContent() {
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tierParam = searchParams.get('tier') ?? 'standard'
  const tier = tierInfo[tierParam] ?? tierInfo.standard

  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [paymentMethod, setPaymentMethod] = useState('ideal')
  const [loading, setLoading] = useState(false)

  const price = billing === 'monthly' ? tier.monthly : tier.yearly / 12
  const total = billing === 'yearly' ? tier.yearly : tier.monthly

  const handleCheckout = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))

    // Update subscription tier in database
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      await supabase
        .from('subscriptions')
        .update({
          tier: tierParam,
          status: 'active',
          current_period_end: new Date(
            Date.now() + (billing === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000
          ).toISOString(),
        })
        .eq('user_id', user.id)
    }

    setLoading(false)
    router.push(`/${locale}/familie`)
    router.refresh()
  }

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 760 }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          href={`/${locale}/abonnement`}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '.85rem',
            color: 'rgba(244,236,219,.45)',
            textDecoration: 'none',
          }}
        >
          ← Terug naar abonnementen
        </Link>
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          color: '#F4ECDB',
          margin: '0 0 1.5rem',
          letterSpacing: '-.02em',
        }}
      >
        Upgraden naar {tier.name}
      </h1>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: '1.5rem' }}
        className="grid-responsive-2"
      >
        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Facturering */}
          <div
            style={{
              background: 'rgba(244,236,219,.04)',
              border: '1px solid rgba(244,236,219,.1)',
              borderRadius: 14,
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.75rem',
                fontWeight: 700,
                color: 'rgba(244,236,219,.5)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Factureringsperiode
            </div>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              {[
                { id: 'monthly', label: 'Maandelijks' },
                { id: 'yearly', label: 'Jaarlijks', badge: '2 mnd gratis' },
              ].map(({ id, label, badge }) => (
                <button
                  key={id}
                  onClick={() => setBilling(id as 'monthly' | 'yearly')}
                  style={
                    {
                      flex: 1,
                      padding: '.75rem',
                      borderRadius: 10,
                      cursor: 'pointer',
                      background: billing === id ? 'rgba(58,172,110,.15)' : 'rgba(244,236,219,.06)',
                      border: `1.5px solid ${billing === id ? 'rgba(58,172,110,.4)' : 'rgba(244,236,219,.1)'}`,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.85rem',
                      fontWeight: 600,
                      color: billing === id ? '#3AAC6E' : 'rgba(244,236,219,.6)',
                      transition: 'all .15s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 3,
                    } as React.CSSProperties
                  }
                >
                  {label}
                  {badge && (
                    <span style={{ fontSize: '.62rem', color: '#3AAC6E', fontWeight: 700 }}>
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Betaalmethode */}
          <div
            style={{
              background: 'rgba(244,236,219,.04)',
              border: '1px solid rgba(244,236,219,.1)',
              borderRadius: 14,
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.75rem',
                fontWeight: 700,
                color: 'rgba(244,236,219,.5)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Betaalmethode
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {[
                { id: 'ideal', label: 'iDEAL', icon: <IDealLogo />, popular: true },
                { id: 'creditcard', label: 'Creditcard', icon: <CreditcardLogo />, popular: false },
                { id: 'paypal', label: 'PayPal', icon: <PayPalLogo />, popular: false },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  style={
                    {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '.9rem 1rem',
                      borderRadius: 10,
                      cursor: 'pointer',
                      background:
                        paymentMethod === m.id ? 'rgba(58,172,110,.08)' : 'rgba(244,236,219,.04)',
                      border: `1.5px solid ${paymentMethod === m.id ? 'rgba(58,172,110,.35)' : 'rgba(244,236,219,.1)'}`,
                      fontFamily: 'var(--font-sans)',
                      transition: 'all .15s',
                      textAlign: 'left',
                    } as React.CSSProperties
                  }
                >
                  <span
                    style={{
                      width: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {m.icon}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontWeight: 600,
                      fontSize: '.9rem',
                      color: paymentMethod === m.id ? '#F4ECDB' : 'rgba(244,236,219,.65)',
                    }}
                  >
                    {m.label}
                  </span>
                  {m.popular && (
                    <span
                      style={{
                        fontSize: '.62rem',
                        fontWeight: 700,
                        color: '#3AAC6E',
                        background: 'rgba(58,172,110,.12)',
                        padding: '.15rem .5rem',
                        borderRadius: 9999,
                      }}
                    >
                      Populair
                    </span>
                  )}
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: `2px solid ${paymentMethod === m.id ? '#3AAC6E' : 'rgba(244,236,219,.2)'}`,
                      background: paymentMethod === m.id ? '#3AAC6E' : 'transparent',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {paymentMethod === m.id && (
                      <div
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#07190F' }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.72rem',
                color: 'rgba(244,236,219,.3)',
                margin: '.75rem 0 0',
                lineHeight: 1.5,
              }}
            >
              🔒 Veilig verwerkt door Mollie. Wij slaan geen betaalgegevens op.
            </p>
          </div>
        </div>

        {/* Rechts: samenvatting */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              background: 'rgba(244,236,219,.04)',
              border: '1px solid rgba(244,236,219,.1)',
              borderRadius: 14,
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '.75rem',
                fontWeight: 700,
                color: 'rgba(244,236,219,.5)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Samenvatting
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#F4ECDB',
                  }}
                >
                  {tier.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    color: 'rgba(244,236,219,.4)',
                    marginTop: 2,
                  }}
                >
                  {billing === 'yearly' ? 'Jaarlijks' : 'Maandelijks'} gefactureerd
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: '#F4ECDB',
                  }}
                >
                  €{price.toFixed(2).replace('.', ',')}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.72rem',
                    color: 'rgba(244,236,219,.4)',
                  }}
                >
                  /mnd
                </span>
              </div>
            </div>
            <div
              style={{
                paddingTop: '.75rem',
                borderTop: '1px solid rgba(244,236,219,.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '.35rem',
                marginBottom: '1rem',
              }}
            >
              {tier.features.map((f) => (
                <div
                  key={f}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.8rem',
                    color: 'rgba(244,236,219,.65)',
                  }}
                >
                  <span style={{ color: '#3AAC6E' }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
            <div
              style={{
                paddingTop: '.75rem',
                borderTop: '1px solid rgba(244,236,219,.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '.9rem',
                  color: '#F4ECDB',
                }}
              >
                Totaal vandaag
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '1.4rem',
                  color: '#3AAC6E',
                }}
              >
                €{total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            {billing === 'yearly' && (
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.7rem',
                  color: 'rgba(244,236,219,.3)',
                  marginTop: 4,
                  textAlign: 'right',
                }}
              >
                Bespaar €{(tier.monthly * 12 - tier.yearly).toFixed(2).replace('.', ',')} per jaar
              </div>
            )}
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.1rem',
              background: '#3AAC6E',
              color: '#07190F',
              border: 'none',
              borderRadius: 12,
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: loading ? 'wait' : 'pointer',
              boxShadow: '0 8px 32px -8px rgba(58,172,110,.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: loading ? 0.8 : 1,
              transition: 'opacity .2s',
            }}
          >
            {loading
              ? 'Doorsturen…'
              : `Betalen met ${paymentMethod === 'ideal' ? 'iDEAL' : paymentMethod === 'creditcard' ? 'Creditcard' : 'PayPal'}`}
            {!loading && <span>→</span>}
          </button>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.7rem',
              color: 'rgba(244,236,219,.3)',
              textAlign: 'center',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Door te betalen gaat u akkoord met onze Algemene Voorwaarden. Opzeggen wanneer u wilt.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{ padding: '2rem', color: 'rgba(244,236,219,.5)', fontFamily: 'var(--font-sans)' }}
        >
          Laden…
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}

function IDealLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 50 50" fill="none" aria-label="iDEAL">
      <rect width="50" height="50" rx="8" fill="#CC0066" />
      <text
        x="25"
        y="33"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="900"
        fill="white"
      >
        iD
      </text>
    </svg>
  )
}

function PayPalLogo() {
  return (
    <svg width="56" height="24" viewBox="0 0 100 32" fill="none" aria-label="PayPal">
      <text
        x="0"
        y="24"
        fontFamily="Arial, sans-serif"
        fontSize="22"
        fontWeight="900"
        fill="#003087"
      >
        Pay
      </text>
      <text
        x="42"
        y="24"
        fontFamily="Arial, sans-serif"
        fontSize="22"
        fontWeight="900"
        fill="#009CDE"
      >
        Pal
      </text>
    </svg>
  )
}

function CreditcardLogo() {
  return (
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none" aria-label="Creditcard">
      <rect width="36" height="24" rx="4" fill="#252525" />
      <rect x="2" y="8" width="32" height="4" fill="#FFB74D" opacity=".8" />
      <circle cx="26" cy="16" r="5" fill="#E53935" opacity=".9" />
      <circle cx="31" cy="16" r="5" fill="#FB8C00" opacity=".7" />
    </svg>
  )
}
