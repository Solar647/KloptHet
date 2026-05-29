import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// Lokale ontwikkeling: SSL-verificatie uitschakelen (zelfde netwerk-issue als npm)
// Op Vercel/productie is dit niet nodig — echte certificaten werken gewoon
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {}

export default withNextIntl(nextConfig)
