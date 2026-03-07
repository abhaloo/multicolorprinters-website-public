import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { companyInfo, navLinks, servicesList } from "@/lib/data"
import { InstagramIcon, FacebookIcon } from "@/components/social-icons"

export function Footer() {
  return (
    <footer className="bg-[#111318] text-gray-300 rounded-t-[4rem] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="h-8 w-2 rounded-sm bg-primary" />
                <div className="h-8 w-2 rounded-sm bg-secondary" />
                <div className="h-8 w-2 rounded-sm bg-accent" />
                <div className="h-8 w-2 rounded-sm bg-[#F25764]" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-white">
                  Multi Color
                </span>
                <span className="font-[family-name:var(--font-heading)] text-xs font-medium uppercase tracking-widest text-gray-400">
                  Printers
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Zanzibar&apos;s trusted commercial printing partner. Delivering exceptional print quality with over 25 years of industry experience.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-primary"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-primary"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {servicesList.slice(0, 6).map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-gray-400">{companyInfo.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  {companyInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright & Status Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          {/* System Operational status indicator */}
          <div className="flex items-center gap-2" aria-label="System status: operational">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.18em] text-emerald-400/80">
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
