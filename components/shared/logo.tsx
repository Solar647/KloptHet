export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 46" fill="none" aria-hidden="true">
      {/* Schild + chat-bubble vorm */}
      <path
        d="M22 2C22 2 6 5.5 4 14V27C4 35 12 40.5 20 43L22 46L24 43C32 40.5 40 35 40 27V14C38 5.5 22 2 22 2Z"
        fill="#091428"
        stroke="#3AAC6E"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Vergrootglas cirkel */}
      <circle cx="20" cy="21" r="8.5" stroke="#F4ECDB" strokeWidth="2.2" />
      {/* Vinkje in cirkel */}
      <path
        d="M15.5 21.5L18.5 24.5L24.5 17.5"
        stroke="#3AAC6E"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vergrootglas handvat */}
      <line
        x1="26.5"
        y1="27.5"
        x2="31"
        y2="32"
        stroke="#F4ECDB"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
