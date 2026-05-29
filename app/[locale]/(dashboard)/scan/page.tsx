import { Scanner } from '@/components/scanner/scanner'

export default function ScanPage() {
  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.5rem) 0' }}>
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
          Bericht controleren
        </h1>
        <p style={{ color: 'rgba(244,236,219,.55)', fontFamily: 'var(--font-sans)', margin: 0 }}>
          Upload een screenshot of plak de tekst van het verdachte bericht.
        </p>
      </div>
      <Scanner />
    </div>
  )
}
