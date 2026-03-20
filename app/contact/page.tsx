import { Suspense } from "react"
import type { Metadata } from "next"
import { MapPin, Phone, Mail } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"
import { companyInfo } from "@/lib/data"
import { InstagramIcon, FacebookIcon } from "@/components/social-icons"
import { Toaster } from "sonner"
import { AnimateIn } from "@/components/animate-in"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Multi Color Printers for a free quote. Visit us in Mtoni, Zanzibar or reach out by phone, email, or WhatsApp.",
  alternates: { canonical: "/contact" },
}

const contactCards = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [companyInfo.address],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: [companyInfo.phone],
    href: `tel:${companyInfo.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [companyInfo.email],
    href: `mailto:${companyInfo.email}`,
  },
]

export default function ContactPage() {
  return (
    <main>
      <Toaster position="top-center" richColors />
      <PageHero
        title="Contact Us"
        subtitle="Let's Bring Your Vision to Life"
        accent="purple"
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Form */}
            <AnimateIn variant="fade-right">
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                  Request a Free Quote
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Tell us about your project and we&apos;ll get back to you within 24 hours with a quote.
                </p>
                <div className="mt-6">
                  <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-muted" />}>
                    <ContactForm />
                  </Suspense>
                </div>
              </div>
            </AnimateIn>

            {/* Contact Info */}
            <div className="flex flex-col gap-6">
              {contactCards.map((card, index) => (
                <AnimateIn key={card.title} variant="fade-left" delay={index * 100}>
                  <div
                    className="rounded-xl border border-border bg-card p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                        <card.icon className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
                          {card.title}
                        </h3>
                        {card.lines.map((line) =>
                          card.href ? (
                            <a
                              key={line}
                              href={card.href}
                              className="mt-1 block text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {line}
                            </a>
                          ) : (
                            <p key={line} className="mt-1 text-sm text-muted-foreground">
                              {line}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}

              {/* Social */}
              <AnimateIn variant="fade-left" delay={300}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
                    Follow Us
                  </h3>
                  <div className="mt-3 flex gap-3">
                    <a
                      href={companyInfo.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors hover:bg-primary hover:text-white"
                    >
                      <InstagramIcon className="h-5 w-5" />
                    </a>
                    <a
                      href={companyInfo.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors hover:bg-primary hover:text-white"
                    >
                      <FacebookIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </AnimateIn>

              {/* Google Maps */}
              <AnimateIn variant="fade-up" delay={400}>
                <div className="overflow-hidden rounded-xl border border-border">
                  <iframe
                    title="Multi Color Printers Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63430.37955928377!2d39.17!3d-6.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185cd0ba23b63ecb%3A0x5c1d25e1e0b5c0a!2sZanzibar%20City!5e0!3m2!1sen!2stz!4v1"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
