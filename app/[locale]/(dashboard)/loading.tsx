export default function DashboardLoading() {
  return (
    <div
      style={{
        flex: 1,
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: 900,
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { opacity: .4; }
          50% { opacity: .7; }
          100% { opacity: .4; }
        }
        .sk { animation: shimmer 1.4s ease-in-out infinite; background: rgba(244,236,219,.07); border-radius: 10px; }
      `}</style>
      <div className="sk" style={{ height: 32, width: 180 }} />
      <div className="sk" style={{ height: 18, width: 260, marginTop: -4 }} />
      <div
        style={{
          marginTop: '1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '1rem',
        }}
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="sk" style={{ height: 100 }} />
        ))}
      </div>
      <div className="sk" style={{ height: 200, marginTop: '1rem' }} />
      <div className="sk" style={{ height: 140 }} />
    </div>
  )
}
