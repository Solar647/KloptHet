import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'

const BASE_URL = 'https://klopt-het.vercel.app'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'KloptHet — Fraudechecker voor WhatsApp en sms',
    template: '%s — KloptHet',
  },
  description:
    'Twijfelt u over een verdacht WhatsApp- of sms-bericht? Upload een screenshot en wij vertellen u in gewone taal of het te vertrouwen is. Europese AI, geen data bewaard.',
  keywords: [
    'WhatsApp fraude',
    'sms fraude',
    'phishing checker',
    'fraudechecker',
    'kleinkind-truc',
    'oplichting herkennen',
    'nep bericht',
    'veilig internet 55+',
  ],
  authors: [{ name: 'KloptHet', url: BASE_URL }],
  creator: 'KloptHet',
  publisher: 'KloptHet',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    siteName: 'KloptHet',
    title: 'KloptHet — Fraudechecker voor WhatsApp en sms',
    description:
      'Twijfelt u over een verdacht bericht? Upload een screenshot en wij vertellen u in 5 seconden of het te vertrouwen is.',
    url: BASE_URL,
    locale: 'nl_NL',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KloptHet — Fraudechecker voor WhatsApp en sms',
    description:
      'Upload een screenshot van een verdacht bericht. Wij analyseren het in 5 seconden.',
    site: '@klopthet',
  },
  alternates: {
    canonical: `${BASE_URL}/nl`,
    languages: {
      nl: `${BASE_URL}/nl`,
      en: `${BASE_URL}/en`,
    },
  },
  verification: {
    google: '', // Invullen na Google Search Console verificatie
  },
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'nl' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          Naar hoofdinhoud
        </a>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
