import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { companyInfo } from "@/lib/data"

export function CTASection() {
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white md:text-4xl">
          Ready to Start Your Project?
        </h2>
        <p className="mt-4 text-lg text-accent">
          Get a free quote today and let us bring your vision to life with exceptional print quality.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="btn-cta bg-primary text-primary-foreground hover:bg-[#d1182a] font-semibold px-8 py-6 text-base shadow-lg shadow-primary/25"
          >
            <Link href="/contact">
              Request a Free Quote
              <ArrowRight className="ml-2 h-5 w-5 cta-arrow-icon" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-accent/40 bg-transparent text-white hover:bg-accent/10 font-medium px-8 py-6 text-base"
          >
            <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}>
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
