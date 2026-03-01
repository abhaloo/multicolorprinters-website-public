import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesStrip } from "@/components/services-strip"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesStrip />
    </main>
  )
}
