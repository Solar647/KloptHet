export default function Page() {
  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 900 }}>
      <div
        style={{
          background: 'rgba(244,236,219,.04)',
          border: '1px dashed rgba(244,236,219,.14)',
          borderRadius: 16,
          padding: '3rem',
          textAlign: 'center',
        }}
      >
        <p style={{ color: 'rgba(244,236,219,.4)', fontFamily: 'var(--font-sans)', margin: 0 }}>
          Binnenkort beschikbaar.
        </p>
      </div>
    </div>
  )
}
