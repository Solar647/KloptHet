'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

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

const paymentMethods = [
  { id: 'ideal', label: 'iDEAL', icon: '🏦', popular: true },
  { id: 'creditcard', label: 'Creditcard', icon: '💳', popular: false },
  { id: 'paypal', label: 'PayPal', icon: '🅿️', popular: false },
]

export default function CheckoutPage() {
  const locale = useLocale()
  const router = useRouter()
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [paymentMethod, setPaymentMethod] = useState('ideal')
  const [loading, setLoading] = useState(false)

  // Get tier from URL
  const tierParam =
    typeof window !== 'undefined'
      ? (new URLSearchParams(window.location.search).get('tier') ?? 'standard')
      : 'standard'
  const tier = tierInfo[tierParam] ?? tierInfo.standard

  const price = billing === 'monthly' ? tier.monthly : tier.yearly / 12
  const total = billing === 'yearly' ? tier.yearly : tier.monthly

  const handleCheckout = async () => {
    setLoading(true)
    // TODO: Mollie checkout koppelen
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    router.push(`/${locale}/dashboard?upgrade=success`)
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
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
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
        {/* Links: betaalinformatie */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Facturering toggle */}
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
                      border: 'none',
                      cursor: 'pointer',
                      background: billing === id ? 'rgba(58,172,110,.15)' : 'rgba(244,236,219,.06)',
                      borderColor: billing === id ? 'rgba(58,172,110,.35)' : 'rgba(244,236,219,.1)',
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
                    <span style={{ fontSize: '.65rem', color: '#3AAC6E', fontWeight: 700 }}>
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
              {paymentMethods.map((m) => (
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
                      border: 'none',
                      cursor: 'pointer',
                      background:
                        paymentMethod === m.id ? 'rgba(58,172,110,.1)' : 'rgba(244,236,219,.04)',
                      borderColor:
                        paymentMethod === m.id ? 'rgba(58,172,110,.3)' : 'rgba(244,236,219,.1)',
                      fontFamily: 'var(--font-sans)',
                      transition: 'all .15s',
                      textAlign: 'left',
                    } as React.CSSProperties
                  }
                >
                  <span style={{ fontSize: '1.2rem' }}>{m.icon}</span>
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
                        fontSize: '.65rem',
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
                fontSize: '.75rem',
                color: 'rgba(244,236,219,.35)',
                margin: '.75rem 0 0',
                lineHeight: 1.5,
              }}
            >
              🔒 Betalingen worden veilig verwerkt door Mollie. Wij slaan geen betaalgegevens op.
            </p>
          </div>
        </div>

        {/* Rechts: order summary */}
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

            {/* Plan */}
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
                    fontSize: '.75rem',
                    color: 'rgba(244,236,219,.4)',
                    marginTop: 2,
                  }}
                >
                  {billing === 'yearly' ? 'Jaarlijks gefactureerd' : 'Maandelijks gefactureerd'}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: '#F4ECDB',
                  }}
                >
                  €{price.toFixed(2).replace('.', ',')}
                  <span style={{ fontSize: '.75rem', color: 'rgba(244,236,219,.4)' }}>/mnd</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div
              style={{
                paddingTop: '.75rem',
                borderTop: '1px solid rgba(244,236,219,.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '.4rem',
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
                  <span style={{ color: '#3AAC6E', flexShrink: 0 }}>✓</span>
                  {f}
                </div>
              ))}
            </div>

            {/* Totaal */}
            <div style={{ paddingTop: '.75rem', borderTop: '1px solid rgba(244,236,219,.08)' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
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
                    fontSize: '.72rem',
                    color: 'rgba(244,236,219,.35)',
                    marginTop: 4,
                    textAlign: 'right',
                  }}
                >
                  Bespaar €{(tier.monthly * 12 - tier.yearly).toFixed(2).replace('.', ',')} per jaar
                </div>
              )}
            </div>
          </div>

          {/* Betaal knop */}
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
              boxShadow: '0 8px 32px -8px rgba(58,172,110,.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: loading ? 0.8 : 1,
              transition: 'opacity .2s',
            }}
          >
            {loading
              ? 'Doorsturen naar betaling…'
              : `Betalen met ${paymentMethods.find((m) => m.id === paymentMethod)?.label}`}
            {!loading && <span>→</span>}
          </button>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.72rem',
              color: 'rgba(244,236,219,.3)',
              textAlign: 'center',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Door te betalen gaat u akkoord met onze Algemene Voorwaarden. Opzeggen kan altijd,
            zonder kosten.
          </p>
        </div>
      </div>
    </div>
  )
}
