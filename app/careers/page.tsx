import type { Metadata } from "next"
import { Briefcase, Lightbulb, Building2, Users, Mail } from "lucide-react"
import { PortableText } from "@portabletext/react"

import { PageHero } from "@/components/page-hero"
import { AnimateIn } from "@/components/animate-in"
import { SectionHeader } from "@/components/section-header"
import { companyInfo } from "@/lib/data"
import { fetchOpenJobs } from "@/lib/sanity"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Multi Color Printers — Zanzibar's leading print company. Explore open positions and build your career with our award-winning team.",
  alternates: { canonical: "/careers" },
}

export const revalidate = 3600

const values = [
  {
    icon: Lightbulb,
    title: "Growth & Learning",
    description:
      "Develop your skills with industry-leading technology and continuous learning opportunities.",
  },
  {
    icon: Briefcase,
    title: "Creative Environment",
    description:
      "Work on diverse projects across print and design that challenge and inspire.",
  },
  {
    icon: Building2,
    title: "Established Company",
    description: `${companyInfo.stats.yearsExperience} years of stability, growth, and trusted reputation in the industry.`,
  },
  {
    icon: Users,
    title: "Team Culture",
    description:
      "A collaborative, supportive workplace where every voice matters.",
  },
]

export default async function CareersPage() {
  const jobs = await fetchOpenJobs()

  return (
    <>
      <PageHero
        title="Join Our Team"
        subtitle="Build your career at Zanzibar's leading print company"
      />

      {/* Why Work Here */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateIn>
            <SectionHeader label="Why Us" heading="Why Work Here" />
          </AnimateIn>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <AnimateIn key={v.title} delay={i * 100}>
                <div className="rounded-2xl border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <v.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateIn>
            <SectionHeader label="Opportunities" heading="Open Positions" />
          </AnimateIn>

          <div className="mt-12">
            {jobs && jobs.length > 0 ? (
              <div className="space-y-6">
                {jobs.map((job: any, i: number) => (
                  <AnimateIn key={job._id} delay={i * 100}>
                    <div className="rounded-2xl border bg-card p-6 md:p-8">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">
                            {job.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {job.department && (
                              <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                                {job.department}
                              </span>
                            )}
                            {job.type && (
                              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                {job.type}
                              </span>
                            )}
                          </div>
                        </div>
                        <a
                          href={`mailto:${companyInfo.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                        >
                          <Mail className="h-4 w-4" />
                          Apply Now
                        </a>
                      </div>

                      {job.description && (
                        <div className="mt-4 prose prose-sm max-w-none text-muted-foreground">
                          <PortableText value={job.description} />
                        </div>
                      )}

                      {job.requirements && job.requirements.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-foreground">
                            Requirements
                          </h4>
                          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                            {job.requirements.map(
                              (req: string, idx: number) => (
                                <li key={idx}>{req}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </AnimateIn>
                ))}
              </div>
            ) : (
              <AnimateIn>
                <div className="rounded-2xl border bg-card p-8 text-center md:p-12">
                  <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/40" />
                  <h3 className="font-[family-name:var(--font-heading)] mt-4 text-xl font-semibold">
                    No Open Positions Right Now
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    We don&apos;t have any open positions at the moment, but
                    we&apos;re always interested in hearing from talented people.
                    Send your CV to{" "}
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="font-medium text-primary underline underline-offset-4"
                    >
                      {companyInfo.email}
                    </a>{" "}
                    and we&apos;ll keep it on file.
                  </p>
                </div>
              </AnimateIn>
            )}
          </div>
        </div>
      </section>

      {/* General Application CTA */}
      <section className="bg-[#1E2254] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <AnimateIn>
            <SectionHeader
              label="General Application"
              heading="Don't see a role that fits?"
              light
            />
            <p className="mx-auto mt-4 max-w-2xl text-accent/80">
              We&apos;re always looking for talented individuals to join our
              team. Send us your CV and let us know how you can contribute.
            </p>
            <a
              href={`mailto:${companyInfo.email}?subject=${encodeURIComponent("General Application — CV Submission")}`}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-primary/90"
            >
              <Mail className="h-5 w-5" />
              Send Your CV
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
