import { Nav } from '@/components/shared/nav'
import { Footer } from '@/components/shared/footer'
import { Hero } from '@/components/marketing/hero'
import { HowItWorks } from '@/components/marketing/how-it-works'
import { DemoScanner } from '@/components/marketing/demo-scanner'
import { Pricing } from '@/components/marketing/pricing'
import { FAQ } from '@/components/marketing/faq'
import { Reveal } from '@/components/shared/reveal'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Reveal>
          <HowItWorks />
        </Reveal>
        <Reveal delay={50}>
          <DemoScanner />
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
