export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* Achtergrond cirkel */}
      <circle cx="22" cy="22" r="21" fill="#1B4731" />

      {/* K */}
      <path
        d="M10 13 L10 31 M10 22 L18 13 M10 22 L18 31"
        stroke="#F4ECDB"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* H */}
      <path
        d="M22 13 L22 31 M34 13 L34 31 M22 22 L34 22"
        stroke="#F4ECDB"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
