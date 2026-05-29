import { Nav } from '@/components/shared/nav'
import { Footer } from '@/components/shared/footer'
import { Hero } from '@/components/marketing/hero'
import { HowItWorks } from '@/components/marketing/how-it-works'
import { Scanner } from '@/components/scanner/scanner'
import { Pricing } from '@/components/marketing/pricing'
import { FAQ } from '@/components/marketing/faq'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Scanner />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
