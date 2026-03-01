import type { Metadata } from "next"
import { MapPin, Phone, Mail } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"
import { CTASection } from "@/components/cta-section"
import { companyInfo } from "@/lib/data"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Contact Us | Multi Color Printers",
  description:
    "Get in touch with Multi Color Printers for a free quote. Visit us in Zanzibar or reach out by phone, email, or our contact form.",
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
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
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Form */}
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                Request a Free Quote
              </h2>
              <p className="mt-2 text-muted-foreground">
                Tell us about your project and we&apos;ll get back to you within 24 hours with a quote.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-6">
              {contactCards.map((card) => (
                <div
                  key={card.title}
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
              ))}

              {/* Social */}
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

              {/* Google Maps */}
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
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
