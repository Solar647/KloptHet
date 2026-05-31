import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.klopthet.com'

const staticRoutes = [
  '',
  '/hoe-het-werkt',
  '/voor-wie',
  '/prijzen',
  '/blog',
  '/over-ons',
  '/contact',
  '/privacy',
  '/voorwaarden',
  '/cookies',
  '/impressum',
]

const blogSlugs = [
  'kleinkind-truc',
  'bezorg-fraude',
  'bank-imitatie',
  'romantiek-scam',
  'telefonische-fraude',
  'phishing-links',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['nl', 'en'] as const
  const now = new Date()

  const pages: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of staticRoutes) {
      pages.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/blog' ? 0.8 : 0.7,
        alternates: {
          languages: {
            nl: `${BASE_URL}/nl${route}`,
            en: `${BASE_URL}/en${route}`,
          },
        },
      })
    }

    for (const slug of blogSlugs) {
      pages.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            nl: `${BASE_URL}/nl/blog/${slug}`,
            en: `${BASE_URL}/en/blog/${slug}`,
          },
        },
      })
    }
  }

  return pages
}
