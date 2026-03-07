"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { navLinks, companyInfo } from "@/lib/data"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    // Set initial state
    setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [mobileOpen])

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className={cn(
            "flex items-center gap-6 rounded-full px-5 py-3 transition-all duration-500 pointer-events-auto",
            scrolled
              ? "bg-[#F5F0EB]/85 backdrop-blur-xl border border-[#1E2254]/15 shadow-lg shadow-[#111318]/8"
              : "bg-[#111318]/35 backdrop-blur-md border border-white/10"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo.gif"
              alt={companyInfo.name}
              width={32}
              height={32}
              className="h-8 w-auto"
              unoptimized
            />
            <span
              className={cn(
                "font-[family-name:var(--font-heading)] text-sm font-bold tracking-tight transition-colors duration-500",
                scrolled ? "text-[#111318]" : "text-white"
              )}
            >
              {companyInfo.name.split(" ").slice(0, 2).join(" ")}
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium link-lift transition-colors duration-300",
                  scrolled
                    ? pathname === link.href
                      ? "text-[#F21D2F]"
                      : "text-[#111318]/70 hover:text-[#111318]"
                    : pathname === link.href
                      ? "text-[#F21D2F]"
                      : "text-white/90 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA button */}
          <Link
            href="/contact"
            className="btn-magnetic hidden md:inline-flex items-center rounded-full bg-[#F21D2F] px-5 py-2 text-sm font-semibold text-white shadow-[0_2px_12px_rgba(242,29,47,0.3)] hover:shadow-[0_4px_20px_rgba(242,29,47,0.45)]"
          >
            <span className="btn-slide-layer bg-[#d1182a]" aria-hidden="true" />
            <span className="relative">Request Quote</span>
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "md:hidden rounded-full p-1.5 transition-colors",
              scrolled ? "text-[#111318]" : "text-white"
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#111318]/97 backdrop-blur-md transition-all duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "font-[family-name:var(--font-heading)] text-3xl font-bold transition-colors",
              pathname === link.href ? "text-[#F21D2F]" : "text-white/85 hover:text-white"
            )}
            onClick={() => setMobileOpen(false)}
            style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/contact"
          className="mt-4 btn-magnetic rounded-full bg-[#F21D2F] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#F21D2F]/30"
          onClick={() => setMobileOpen(false)}
        >
          <span className="btn-slide-layer bg-[#d1182a]" aria-hidden="true" />
          <span className="relative">Request Quote</span>
        </Link>
      </div>
    </>
  )
}
