import type { Metadata } from "next"
import { Target, Heart, Lightbulb, Printer, Factory, Award } from "lucide-react"
import Image from "next/image"

import { PageHero } from "@/components/page-hero"
import { SectionHeader } from "@/components/section-header"
import { CTASection } from "@/components/cta-section"
import { companyInfo } from "@/lib/data"
import { CountUp } from "@/components/count-up"
import { AnimateIn } from "@/components/animate-in"

export const metadata: Metadata = {
  title: "About Us | Multi Color Printers",
  description:
    `Learn about Multi Color Printers — Zanzibar's trusted print partner with ${companyInfo.stats.yearsExperience} years of experience and industry-leading equipment.`,
}

const stats = [
  { value: companyInfo.stats.yearsExperience, label: "Years Experience" },
  { value: companyInfo.stats.projectsDelivered, label: "Projects Delivered" },
  { value: companyInfo.stats.businessesServed, label: "Businesses Served" },
  { value: companyInfo.stats.satisfaction, label: "Client Satisfaction" },
]

const pillars = [
  {
    icon: Target,
    title: "Quality",
    description: "We never compromise on print quality. Every project is inspected to meet the highest standards before delivery.",
  },
  {
    icon: Heart,
    title: "Service",
    description: "Our clients are our partners. We listen, advise, and go the extra mile to ensure complete satisfaction.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We invest in the latest printing technology to offer cutting-edge solutions that keep your brand ahead.",
  },
]

const equipment = [
  {
    icon: Printer,
    name: "HP Indigo 5500",
    type: "Digital Press",
    description:
      "Industry-leading digital press delivering offset-quality prints with the flexibility of digital. Perfect for variable data, short runs, and specialty substrates.",
    features: ["7-color printing", "Variable data", "Specialty substrates", "Offset-matching quality"],
  },
  {
    icon: Factory,
    name: "Heidelberg SpeedMaster",
    type: "Offset Press",
    description:
      "The gold standard in commercial offset printing. Delivers consistent, high-volume output with exceptional color fidelity and finishing options.",
    features: ["High-volume capacity", "Consistent color", "Varnish coating", "Multiple paper weights"],
  },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About Us"
        subtitle="Zanzibar's Trusted Print Partner"
      />

      {/* Company Story */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimateIn variant="fade-right">
              <div>
                <SectionHeader
                  label="Our story"
                  heading="Built on Quality, Driven by Passion"
                  centered={false}
                />
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Multi Color Printers has been at the heart of Zanzibar&apos;s printing
                    industry for over {new Date().getFullYear() - 1995} years. What started as a small print shop has
                    grown into the island&apos;s most trusted commercial printing house,
                    serving some of the region&apos;s leading hotels, government bodies,
                    and businesses across East Africa.
                  </p>
                  <p>
                    Our commitment to excellence has driven us to invest in world-class
                    equipment — from the HP Indigo 5500 digital press to the Heidelberg
                    SpeedMaster offset press — ensuring that every project we handle
                    meets the highest international standards. In 2022, this commitment
                    was recognized internationally when we were named{" "}
                    <strong className="text-foreground">Best Commercial Print &amp; Design Company in Tanzania</strong>{" "}
                    by Acquisition International&apos;s Business Excellence Awards.
                  </p>
                </div>
              </div>
            </AnimateIn>

            {/* Stats Grid */}
            <AnimateIn variant="fade-left" delay={150}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border bg-card p-6 text-center"
                    >
                      <CountUp
                        value={stat.value}
                        className="font-[family-name:var(--font-heading)] text-3xl font-bold text-primary"
                      />
                      <p className="mt-1 text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Award Highlight */}
                <a
                  href={companyInfo.award.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl bg-secondary p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 border-white/20">
                      <Image
                        src={companyInfo.award.image}
                        alt={`${companyInfo.award.title} — ${companyInfo.award.event}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 flex-shrink-0 text-amber-400" />
                        <p className="font-[family-name:var(--font-data)] text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                          Award Winner
                        </p>
                      </div>
                      <p className="mt-1 font-[family-name:var(--font-heading)] text-sm font-bold leading-snug text-white">
                        {companyInfo.award.title} — {companyInfo.award.region}
                      </p>
                      <p className="mt-0.5 text-xs text-white/60">
                        {companyInfo.award.event} · {companyInfo.award.organization}
                      </p>
                    </div>
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-white/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateIn>
            <SectionHeader
              label="Our mission"
              heading="What Drives Us Every Day"
            />
          </AnimateIn>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <AnimateIn key={pillar.title} variant="fade-up" delay={index * 100}>
                <div
                  className="rounded-xl border border-border bg-background p-8 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                    <pillar.icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateIn>
            <SectionHeader
              label="Our equipment"
              heading="Industry-Leading Technology"
            />
          </AnimateIn>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {equipment.map((item, index) => (
              <AnimateIn key={item.name} variant="fade-up" delay={index * 150}>
              <div
                className="rounded-2xl border border-border bg-card p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                  <item.icon className="h-6 w-6 text-secondary" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {item.type}
                </p>
                <h3 className="font-[family-name:var(--font-heading)] mt-1 text-xl font-bold text-foreground">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-2">
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
