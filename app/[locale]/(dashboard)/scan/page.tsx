import { Scanner } from '@/components/scanner/scanner'

export default function ScanPage() {
  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2rem)', maxWidth: 1000, margin: '0 auto' }}>
      <Scanner dashboard />
    </div>
  )
}
