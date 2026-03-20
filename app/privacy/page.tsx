import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/page-hero"
import { companyInfo } from "@/lib/data"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Multi Color Printers website.",
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="How we handle your data" />

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="space-y-10">
          {/* Information We Collect */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Information We Collect
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              When you use our website or contact us through our forms, we may
              collect personal information such as your name, email address,
              phone number, and any details you provide about your printing
              project. This information is used solely to respond to your
              inquiries and provide our services.
            </p>
          </div>

          {/* Analytics */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Analytics
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              We use Vercel Analytics to understand how visitors interact with
              our website. This service collects anonymous usage data such as
              page views and general traffic patterns. No personally
              identifiable information is collected through analytics. This data
              helps us improve our website and the experience we offer.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Cookies
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Our website uses cookies to remember your preferences, such as
              your cookie consent choice. Cookies are small text files stored on
              your device by your browser. You can manage or disable cookies
              through your browser settings, but doing so may affect your
              experience on our site.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Contact
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              If you have any questions about this privacy policy or how we
              handle your data, please contact us:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                Email:{" "}
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-primary hover:underline"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                  className="text-primary hover:underline"
                >
                  {companyInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
