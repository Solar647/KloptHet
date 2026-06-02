'use client'

import { useState } from 'react'
import { Nav } from '@/components/shared/nav'
import { Footer } from '@/components/shared/footer'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, website: honeypot }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Er ging iets mis.')
      } else {
        setSent(true)
      }
    } catch {
      setError('Geen verbinding. Probeer het later opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />
      <main id="main" style={{ flex: 1 }}>
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 3vw, 3rem)',
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'start',
          }}
          className="grid-responsive-2"
        >
          {/* Links: info */}
          <div>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '.72rem',
                fontWeight: 700,
                color: 'rgba(244,236,219,.5)',
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Contact
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-.03em',
                color: '#F4ECDB',
                margin: '0 0 1rem',
              }}
            >
              Wij helpen u graag.
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: 'rgba(244,236,219,.6)',
                lineHeight: 1.75,
                margin: '0 0 2.5rem',
              }}
            >
              Heeft u een vraag, opmerking of wilt u een verdacht bericht melden? Stuur ons een
              bericht en wij reageren binnen één werkdag.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                {
                  label: 'E-mail',
                  value: 'hulp@klopthet.com',
                  desc: 'Voor alle vragen en verzoeken',
                  href: 'mailto:hulp@klopthet.com',
                },
                {
                  label: 'Reactietijd',
                  value: '< 1 werkdag',
                  desc: 'Maandag t/m vrijdag',
                  href: null,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(58,172,110,.1)',
                      border: '1px solid rgba(58,172,110,.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{ width: 8, height: 8, borderRadius: '50%', background: '#3AAC6E' }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.72rem',
                        fontWeight: 700,
                        color: 'rgba(244,236,219,.4)',
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                        marginBottom: '.2rem',
                      }}
                    >
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '.95rem',
                          color: '#3AAC6E',
                          textDecoration: 'none',
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '.95rem',
                          color: '#F4ECDB',
                        }}
                      >
                        {item.value}
                      </div>
                    )}
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.78rem',
                        color: 'rgba(244,236,219,.4)',
                        marginTop: 2,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '2.5rem',
                padding: '1rem 1.25rem',
                background: 'rgba(244,236,219,.04)',
                border: '1px solid rgba(244,236,219,.1)',
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '.85rem',
                  color: '#F4ECDB',
                  marginBottom: '.35rem',
                }}
              >
                Fraudehelpdesk
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.82rem',
                  color: 'rgba(244,236,219,.5)',
                  margin: '0 0 .5rem',
                  lineHeight: 1.6,
                }}
              >
                Voor het melden van fraude of hulp na oplichting kunt u ook contact opnemen met de
                Fraudehelpdesk.
              </p>
              <a
                href="https://www.fraudehelpdesk.nl"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.82rem',
                  color: '#3AAC6E',
                  fontWeight: 600,
                }}
              >
                fraudehelpdesk.nl →
              </a>
            </div>
          </div>

          {/* Rechts: formulier */}
          <div
            style={{
              background: 'rgba(244,236,219,.04)',
              border: '1px solid rgba(244,236,219,.1)',
              borderRadius: 18,
              padding: '2rem',
            }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'rgba(58,172,110,.15)',
                    border: '1px solid rgba(58,172,110,.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3AAC6E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: '#F4ECDB',
                    margin: '0 0 .5rem',
                  }}
                >
                  Bericht verstuurd!
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.95rem',
                    color: 'rgba(244,236,219,.6)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Wij reageren binnen één werkdag op uw bericht.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    color: '#F4ECDB',
                    margin: '0 0 .25rem',
                  }}
                >
                  Stuur ons een bericht
                </h2>

                {/* Honeypot — onzichtbaar voor mensen, bots vullen dit in */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Field label="Naam" required>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value.slice(0, 20))}
                      maxLength={20}
                      placeholder="Uw naam"
                      required
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(58,172,110,.5)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(244,236,219,.14)'
                      }}
                    />
                  </Field>
                  <Field label="E-mailadres" required>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.slice(0, 100))}
                      maxLength={100}
                      placeholder="uw@email.nl"
                      required
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(58,172,110,.5)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(244,236,219,.14)'
                      }}
                    />
                  </Field>
                </div>

                <Field label="Onderwerp">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{
                      ...inputStyle,
                      cursor: 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(244,236,219,0.5)' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center',
                      paddingRight: '2.5rem',
                      color: subject ? '#F4ECDB' : 'rgba(244,236,219,.4)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(58,172,110,.5)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(244,236,219,.14)'
                    }}
                  >
                    <option value="" style={{ background: '#091020', color: '#F4ECDB' }}>
                      Kies een onderwerp
                    </option>
                    <option value="vraag" style={{ background: '#091020', color: '#F4ECDB' }}>
                      Vraag over de dienst
                    </option>
                    <option value="technisch" style={{ background: '#091020', color: '#F4ECDB' }}>
                      Technisch probleem
                    </option>
                    <option value="abonnement" style={{ background: '#091020', color: '#F4ECDB' }}>
                      Vraag over abonnement
                    </option>
                    <option value="privacy" style={{ background: '#091020', color: '#F4ECDB' }}>
                      Privacyvraag (AVG)
                    </option>
                    <option value="fraude" style={{ background: '#091020', color: '#F4ECDB' }}>
                      Fraude melden
                    </option>
                    <option value="overig" style={{ background: '#091020', color: '#F4ECDB' }}>
                      Overig
                    </option>
                  </select>
                </Field>

                <Field label="Bericht" required>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 3000))}
                    placeholder="Stel uw vraag of beschrijf uw situatie..."
                    required
                    maxLength={3000}
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(58,172,110,.5)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(244,236,219,.14)'
                    }}
                  />
                  <div
                    style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '.35rem' }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.75rem',
                        color: message.length > 2800 ? '#E5532A' : 'rgba(244,236,219,.3)',
                        transition: 'color .2s',
                      }}
                    >
                      {message.length} / 3000
                    </span>
                  </div>
                </Field>

                {error && (
                  <div
                    style={{
                      background: 'rgba(229,83,42,.1)',
                      border: '1px solid rgba(229,83,42,.25)',
                      borderRadius: 8,
                      padding: '.65rem .9rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.85rem',
                      color: '#E5532A',
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '1rem',
                    borderRadius: 12,
                    border: 'none',
                    background: '#3AAC6E',
                    color: '#07190F',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '.95rem',
                    fontWeight: 700,
                    cursor: loading ? 'wait' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'opacity .2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  {loading ? 'Bezig met verzenden…' : 'Verstuur bericht →'}
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
                  Wij reageren binnen één werkdag · hulp@klopthet.com
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-sans)',
          fontSize: '.75rem',
          fontWeight: 600,
          color: 'rgba(244,236,219,.55)',
          marginBottom: 6,
          letterSpacing: '.02em',
        }}
      >
        {label}
        {required && <span style={{ color: '#E5532A', marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '.8rem 1rem',
  background: 'rgba(244,236,219,.06)',
  border: '1px solid rgba(244,236,219,.14)',
  borderRadius: 10,
  color: '#F4ECDB',
  fontSize: '.95rem',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  transition: 'border-color .15s',
  boxSizing: 'border-box',
}
