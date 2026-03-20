import Link from "next/link"
import { AnimateIn } from "@/components/animate-in"
import { companyInfo } from "@/lib/data"

interface ServiceCtaProps {
  serviceTitle: string
}

export function ServiceCta({ serviceTitle }: ServiceCtaProps) {
  const whatsappNumber = companyInfo.whatsapp.replace(/\D/g, "")

  return (
    <section className="bg-[#1E2254] py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <AnimateIn variant="fade-up">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white md:text-3xl text-balance">
            Ready to start your {serviceTitle} project?
          </h2>
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={150}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/contact?service=${encodeURIComponent(serviceTitle)}`}
              className="inline-flex items-center rounded-lg bg-[#F21D2F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#F21D2F]/90"
            >
              Request a Free Quote
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
