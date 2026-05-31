'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function AdminSearch({ defaultValue }: { defaultValue: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams.toString())
      if (e.target.value) {
        params.set('q', e.target.value)
      } else {
        params.delete('q')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  return (
    <input
      type="search"
      defaultValue={defaultValue}
      onChange={handleSearch}
      placeholder="Zoek op e-mail..."
      style={{
        padding: '.55rem 1rem',
        background: 'rgba(244,236,219,.06)',
        border: '1px solid rgba(244,236,219,.16)',
        borderRadius: 8,
        color: '#F4ECDB',
        fontFamily: 'var(--font-sans)',
        fontSize: '.85rem',
        outline: 'none',
        width: 220,
      }}
    />
  )
}
