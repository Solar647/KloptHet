import type { Metadata } from 'next'
import { Nav } from '@/components/shared/nav'
import { Footer } from '@/components/shared/footer'
import { Hero } from '@/components/marketing/hero'
import { FraudRadar } from '@/components/marketing/fraud-radar'
import { WhatIs } from '@/components/marketing/what-is'
import { HowItWorks } from '@/components/marketing/how-it-works'
import { DemoCarousel } from '@/components/marketing/demo-carousel'
import { Pricing } from '@/components/marketing/pricing'
import { Testimonials } from '@/components/marketing/testimonials'
import { FAQ } from '@/components/marketing/faq'
import { Reveal } from '@/components/shared/reveal'
import { createClient } from '@/lib/supabase/server'

// Altijd vers renderen zodat de fraude-radar de actuele cijfers toont
export const dynamic = 'force-dynamic'

const BASE_URL = 'https://www.klopthet.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isNL = locale === 'nl'

  return {
    title: isNL
      ? 'KloptHet — Fraudechecker voor WhatsApp en sms'
      : 'KloptHet — Fraud Checker for WhatsApp and SMS',
    description: isNL
      ? 'Twijfelt u over een verdacht WhatsApp- of sms-bericht? Upload een screenshot en wij vertellen u in gewone taal of het te vertrouwen is. Europese AI, geen data bewaard.'
      : "Suspicious WhatsApp or SMS message? Upload a screenshot and we'll tell you in plain language whether you can trust it. European AI, no data stored.",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: { nl: `${BASE_URL}/nl`, en: `${BASE_URL}/en` },
    },
    openGraph: {
      url: `${BASE_URL}/${locale}`,
      title: isNL ? 'KloptHet — Fraudechecker voor WhatsApp en sms' : 'KloptHet — Fraud Checker',
      description: isNL
        ? 'Upload een screenshot van een verdacht bericht. Wij analyseren het in 5 seconden.'
        : 'Upload a screenshot of a suspicious message. We analyse it in 5 seconds.',
    },
  }
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KloptHet',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  description: 'Fraudechecker voor WhatsApp en sms — bescherming voor 55+ en hun familie.',
  foundingDate: '2026',
  addressCountry: 'NL',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hulp@klopthet.nl',
    contactType: 'customer service',
    availableLanguage: ['Dutch', 'English'],
  },
  sameAs: ['https://www.klopthet.com'],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'KloptHet',
  url: BASE_URL,
  description: 'Fraudechecker voor WhatsApp en sms',
  inLanguage: ['nl', 'en'],
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/nl/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

type HomeStats = {
  totalScans: number
  scamsDetected: number
  knownPatterns: number
}

async function getHomeStats(): Promise<HomeStats | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.rpc('homepage_stats')
    if (error || !data) return null
    // De SQL-functie geeft snake_case terug — omzetten naar camelCase
    const d = data as {
      total_scans?: number
      scams_detected?: number
      known_patterns?: number
    }
    return {
      totalScans: d.total_scans ?? 0,
      scamsDetected: d.scams_detected ?? 0,
      knownPatterns: d.known_patterns ?? 0,
    }
  } catch {
    // Migratie nog niet gedraaid o.i.d. — radar valt terug op basisaantallen
    return null
  }
}

export default async function HomePage() {
  const stats = await getHomeStats()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Nav />
      <main id="main">
        <Hero />
        <FraudRadar stats={stats} />
        <Reveal>
          <WhatIs />
        </Reveal>
        <Reveal>
          <HowItWorks />
        </Reveal>
        <Reveal delay={50}>
          <DemoCarousel />
        </Reveal>
        <Reveal delay={50}>
          <Pricing />
        </Reveal>
        <Reveal delay={50}>
          <Testimonials />
        </Reveal>
        <Reveal delay={50}>
          <FAQ />
        </Reveal>
      </main>
      <Footer />
    </>
  )
}
