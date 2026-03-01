import { HeroSection } from "@/components/hero-section"
import { ServicesStrip } from "@/components/services-strip"
import { ClientsStrip } from "@/components/clients-strip"
import { WhyChooseUs } from "@/components/why-choose-us"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesStrip />
      <ClientsStrip />
      <WhyChooseUs />
      <PortfolioPreview />
      <Testimonials />
      <CTASection />
    </main>
  )
}
