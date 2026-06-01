import Image from 'next/image'

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <Image
      src="/favicon.png"
      alt="KloptHet logo"
      width={size}
      height={size}
      style={{ borderRadius: 8 }}
    />
  )
}
