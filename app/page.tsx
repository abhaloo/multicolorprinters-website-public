import { HeroSection } from "@/components/hero-section"
import { ServicesStrip } from "@/components/services-strip"
import { ClientsStrip } from "@/components/clients-strip"
import { FeaturesSection } from "@/components/features-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { ProtocolSection } from "@/components/protocol-section"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <main style={{ isolation: "isolate" }}>
      <HeroSection />
      <ServicesStrip />
      <ClientsStrip />
      <FeaturesSection />
      <PhilosophySection />
      <ProtocolSection />
      <Testimonials />
      <CTASection />
    </main>
  )
}
