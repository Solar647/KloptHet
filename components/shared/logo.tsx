export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="22" r="20" fill="#F4ECDB" />
      <circle cx="22" cy="22" r="6.5" fill="#0E2A1B" />
      <circle cx="24" cy="20" r="2" fill="#F4ECDB" />
    </svg>
  )
}
