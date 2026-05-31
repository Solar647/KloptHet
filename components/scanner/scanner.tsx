'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useLocale } from 'next-intl'
import type { Verdict } from '@/lib/ai/provider'
import { VerdictCard } from './verdict-card'
import {
  CameraIcon,
  TextIcon,
  UploadIcon,
  AlertIcon,
  ArrowRightIcon,
} from '@/components/shared/icons'

type State = 'idle' | 'analyzing' | 'done' | 'error'

export function Scanner() {
  const locale = useLocale()
  const [state, setState] = useState<State>('idle')
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [mode, setMode] = useState<'upload' | 'text'>('upload')
  const [text, setText] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const analyze = useCallback(
    async (file?: File, textInput?: string) => {
      setState('analyzing')
      setVerdict(null)
      setErrorMsg('')

      try {
        let response: Response

        if (file) {
          const formData = new FormData()
          formData.append('file', file)
          response = await fetch('/api/scan', {
            method: 'POST',
            headers: { 'x-locale': locale },
            body: formData,
          })
        } else {
          response = await fetch('/api/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-locale': locale },
            body: JSON.stringify({ text: textInput }),
          })
        }

        const data = await response.json()

        if (!response.ok) {
          setErrorMsg(data.error ?? 'Er ging iets mis.')
          setState('error')
          return
        }

        setVerdict(data.verdict)
        setState('done')
      } catch {
        setErrorMsg('Geen verbinding. Controleer uw internet en probeer opnieuw.')
        setState('error')
      }
    },
    [locale]
  )

  const handleFile = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file)
      setPreview(url)
      analyze(file)
    },
    [analyze]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const captureScreen = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
      const video = document.createElement('video')
      video.srcObject = stream
      video.muted = true
      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => resolve()
      })
      await video.play()
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')!.drawImage(video, 0, 0)
      stream.getTracks().forEach((t) => t.stop())
      canvas.toBlob((blob) => {
        if (blob) handleFile(new File([blob], 'schermafbeelding.png', { type: 'image/png' }))
      }, 'image/png')
    } catch {
      // gebruiker heeft geannuleerd of browser ondersteunt het niet
    }
  }, [handleFile])

  // Plakken via Ctrl+V
  useEffect(() => {
    if (mode !== 'upload' || state === 'analyzing') return
    const onPaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items ?? []).find((i) => i.type.startsWith('image/'))
      if (item) {
        const file = item.getAsFile()
        if (file) handleFile(file)
      }
    }
    document.addEventListener('paste', onPaste)
    return () => document.removeEventListener('paste', onPaste)
  }, [mode, state, handleFile])

  const reset = () => {
    setState('idle')
    setVerdict(null)
    setErrorMsg('')
    setText('')
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  if (state === 'done' && verdict) {
    return <VerdictCard verdict={verdict} onReset={reset} />
  }

  return (
    <section
      id="scanner"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 3vw, 3rem)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              fontSize: '.72rem',
              fontWeight: 700,
              color: 'rgba(244,236,219,.6)',
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            Controleer een bericht
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-.03em',
              color: '#F4ECDB',
              margin: '0 0 .75rem',
            }}
          >
            Twijfelt u over een bericht?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              color: 'rgba(244,236,219,.65)',
              lineHeight: 1.65,
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            Upload een screenshot of plak de tekst — wij vertellen u in 5 seconden of het te
            vertrouwen is.
          </p>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              display: 'inline-flex',
              gap: 4,
              padding: 4,
              background: 'rgba(244,236,219,.07)',
              border: '1px solid rgba(244,236,219,.16)',
              borderRadius: 9999,
            }}
          >
            {[
              { id: 'upload' as const, label: 'Screenshot uploaden', Icon: CameraIcon },
              { id: 'text' as const, label: 'Tekst plakken', Icon: TextIcon },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                style={{
                  padding: '.55rem 1.1rem',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: 'pointer',
                  background: mode === id ? 'rgba(244,236,219,.15)' : 'transparent',
                  color: mode === id ? '#F4ECDB' : 'rgba(244,236,219,.6)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.88rem',
                  fontWeight: 600,
                  transition: 'all .2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Icon size={15} strokeWidth={1.8} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Upload zone */}
        {mode === 'upload' && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? 'rgba(58,172,110,.7)' : 'rgba(244,236,219,.25)'}`,
              borderRadius: 18,
              padding: 'clamp(2.5rem, 6vw, 4rem) 2rem',
              textAlign: 'center',
              cursor: state === 'analyzing' ? 'wait' : 'pointer',
              background: dragOver ? 'rgba(58,172,110,.06)' : 'rgba(244,236,219,.03)',
              transition: 'all .2s',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
              capture="environment"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFile(file)
              }}
            />

            {state === 'analyzing' ? (
              <AnalyzingSpinner />
            ) : preview ? (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Uw screenshot"
                  style={{
                    maxHeight: 200,
                    maxWidth: '100%',
                    borderRadius: 10,
                    marginBottom: '1rem',
                    objectFit: 'contain',
                  }}
                />
                <p
                  style={{
                    color: 'rgba(244,236,219,.5)',
                    fontSize: '.85rem',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Analyseren...
                </p>
              </div>
            ) : (
              <>
                <div style={{ color: 'rgba(244,236,219,.35)', marginBottom: '1rem' }}>
                  <UploadIcon size={48} strokeWidth={1.2} />
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    fontSize: '1.3rem',
                    color: '#F4ECDB',
                    marginBottom: '.5rem',
                  }}
                >
                  Kies uw screenshot
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.95rem',
                    color: 'rgba(244,236,219,.55)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.6,
                  }}
                >
                  Op de telefoon: kiest u een foto uit uw galerij of maakt u er een met de camera.
                  <br />
                  Op de computer: sleep uw screenshot hiernaartoe.
                </p>
                {/* Opties */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '.75rem',
                    width: '100%',
                    maxWidth: 420,
                    margin: '0 auto',
                  }}
                >
                  {/* Bestaand bestand kiezen */}
                  <UploadButton>Kies een foto of screenshot</UploadButton>

                  {/* Scherm delen */}
                  {'mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        captureScreen()
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem 1.25rem',
                        borderRadius: 14,
                        background: 'rgba(58,172,110,.08)',
                        border: '1.5px solid rgba(58,172,110,.3)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all .2s',
                        fontFamily: 'var(--font-sans)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(58,172,110,.14)'
                        e.currentTarget.style.borderColor = 'rgba(58,172,110,.5)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(58,172,110,.08)'
                        e.currentTarget.style.borderColor = 'rgba(58,172,110,.3)'
                      }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 11,
                          background: 'rgba(58,172,110,.18)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          color: '#3AAC6E',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <path d="M8 21h8M12 17v4" />
                          <path d="m9 9 3-3 3 3M12 6v7" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '.95rem', color: '#F4ECDB' }}>
                          Maak een schermfoto
                        </div>
                        <div
                          style={{ fontSize: '.8rem', color: 'rgba(244,236,219,.5)', marginTop: 2 }}
                        >
                          Kies het venster met het verdachte bericht — wij maken één foto
                        </div>
                      </div>
                    </button>
                  )}
                </div>

                <p
                  style={{
                    marginTop: '1rem',
                    fontSize: '.78rem',
                    color: 'rgba(244,236,219,.3)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  PNG, JPG, HEIC · max. 10 MB · direct verwijderd na analyse · of druk{' '}
                  <kbd
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      background: 'rgba(244,236,219,.1)',
                      padding: '1px 5px',
                      borderRadius: 4,
                    }}
                  >
                    Ctrl+V
                  </kbd>{' '}
                  om te plakken
                </p>
              </>
            )}
          </div>
        )}

        {/* Tekst invoer */}
        {mode === 'text' && (
          <div
            style={{
              background: 'rgba(244,236,219,.04)',
              border: '1px solid rgba(244,236,219,.18)',
              borderRadius: 18,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '.75rem 1.25rem',
                borderBottom: '1px solid rgba(244,236,219,.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '.75rem',
                color: 'rgba(244,236,219,.45)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: state === 'analyzing' ? '#FFD27A' : 'rgba(58,172,110,.8)',
                }}
              />
              {state === 'analyzing' ? 'Bezig met controleren…' : 'Plak hier uw bericht'}
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={state === 'analyzing'}
              placeholder="Plak hier de tekst van het verdachte bericht…"
              style={{
                width: '100%',
                minHeight: 180,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                padding: '1.25rem',
                color: '#F4ECDB',
                fontSize: '1rem',
                lineHeight: 1.65,
                fontFamily: 'var(--font-sans)',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />

            <div
              style={{
                padding: '.85rem 1.25rem',
                borderTop: '1px solid rgba(244,236,219,.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '.78rem',
                  color: 'rgba(244,236,219,.35)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Wij bewaren niets. Uw bericht blijft van u.
              </span>
              <button
                onClick={() => analyze(undefined, text)}
                disabled={!text.trim() || state === 'analyzing'}
                style={{
                  background: '#3AAC6E',
                  color: '#07190F',
                  border: 'none',
                  borderRadius: 10,
                  padding: '.8rem 1.5rem',
                  fontSize: '.95rem',
                  fontWeight: 700,
                  cursor: !text.trim() ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-sans)',
                  opacity: !text.trim() ? 0.5 : 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'opacity .2s',
                }}
              >
                {state === 'analyzing' ? 'Bezig…' : 'Controleer bericht'}
                {state !== 'analyzing' && <ArrowRightIcon size={16} strokeWidth={2.2} />}
              </button>
            </div>
          </div>
        )}

        {/* Foutmelding */}
        {state === 'error' && (
          <div
            style={{
              marginTop: '1.25rem',
              background: 'rgba(229,83,42,.1)',
              border: '1px solid rgba(229,83,42,.3)',
              borderRadius: 12,
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
            }}
          >
            <span style={{ color: '#E5532A', flexShrink: 0, display: 'flex' }}>
              <AlertIcon size={18} strokeWidth={1.8} />
            </span>
            <div>
              <p
                style={{
                  color: '#FF8585',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.95rem',
                  margin: '0 0 .5rem',
                }}
              >
                {errorMsg}
              </p>
              <button
                onClick={reset}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(244,236,219,.6)',
                  cursor: 'pointer',
                  fontSize: '.85rem',
                  fontFamily: 'var(--font-sans)',
                  padding: 0,
                }}
              >
                Probeer opnieuw
              </button>
            </div>
          </div>
        )}

        {/* Voorbeeld-berichten */}
        {state === 'idle' && mode === 'text' && (
          <div style={{ marginTop: '1.25rem' }}>
            <p
              style={{
                fontSize: '.78rem',
                color: 'rgba(244,236,219,.4)',
                marginBottom: '.6rem',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Geen bericht bij de hand? Probeer een voorbeeld:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
              {[
                'Hoi mama, dit is mijn nieuwe nummer. Kun je me €450 sturen? Het is dringend.',
                'Uw pakket kan niet worden afgeleverd. Betaal €1,99 herbezorgkosten via deze link.',
                'Uw ING-rekening wordt geblokkeerd. Bevestig uw gegevens direct via de link.',
              ].map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setText(ex)}
                  style={{
                    textAlign: 'left',
                    background: 'rgba(244,236,219,.04)',
                    border: '1px solid rgba(244,236,219,.14)',
                    color: 'rgba(244,236,219,.65)',
                    padding: '.6rem .9rem',
                    borderRadius: 8,
                    fontSize: '.82rem',
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    lineHeight: 1.5,
                    transition: 'all .15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(244,236,219,.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(244,236,219,.04)'
                  }}
                >
                  &ldquo;{ex.length > 70 ? ex.slice(0, 70) + '…' : ex}&rdquo;
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function UploadButton({ children }: { children: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.6rem',
        padding: '1rem 1.75rem',
        borderRadius: 9999,
        background: '#F4ECDB',
        color: '#07190F',
        fontFamily: 'var(--font-sans)',
        fontSize: '1rem',
        fontWeight: 700,
        boxShadow: '0 8px 22px -8px rgba(0,0,0,.4)',
      }}
    >
      {children}
    </div>
  )
}

function AnalyzingSpinner() {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '3px solid rgba(244,236,219,.15)',
          borderTopColor: '#3AAC6E',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <p
        style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#F4ECDB', margin: 0 }}
      >
        Wij kijken even mee…
      </p>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '.88rem',
          color: 'rgba(244,236,219,.5)',
          margin: 0,
        }}
      >
        Dit duurt ongeveer 5 seconden
      </p>
    </div>
  )
}
