import type { Metadata } from 'next'
import { Nav } from '@/components/shared/nav'
import { Footer } from '@/components/shared/footer'
import { Hero } from '@/components/marketing/hero'
import { HowItWorks } from '@/components/marketing/how-it-works'
import { DemoCarousel } from '@/components/marketing/demo-carousel'
import { Pricing } from '@/components/marketing/pricing'
import { FAQ } from '@/components/marketing/faq'
import { Reveal } from '@/components/shared/reveal'

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

export default function HomePage() {
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
          <FAQ />
        </Reveal>
      </main>
      <Footer />
    </>
  )
}
