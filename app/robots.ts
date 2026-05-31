import type { MetadataRoute } from 'next'

const BASE_URL = 'https://klopt-het.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/nl/dashboard', '/en/dashboard', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
