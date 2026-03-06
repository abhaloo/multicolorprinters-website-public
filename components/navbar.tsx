"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navLinks, companyInfo } from "@/lib/data"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-md"
          : "bg-card/80 backdrop-blur-sm border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="h-8 w-2 rounded-sm bg-primary" />
            <div className="h-8 w-2 rounded-sm bg-secondary" />
            <div className="h-8 w-2 rounded-sm bg-accent" />
            <div className="h-8 w-2 rounded-sm bg-[#F25764]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-foreground">
              Multi Color
            </span>
            <span className="font-[family-name:var(--font-heading)] text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Printers
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`nav-link-underline text-sm font-medium transition-colors hover:text-foreground ${pathname === link.href
                ? "text-primary"
                : "text-muted-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 text-sm font-medium text-secondary"
          >
            <Phone className="h-4 w-4" />
            <span>{companyInfo.phone}</span>
          </a>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-[#d1182a] font-semibold px-6">
            <Link href="/contact">Request Quote</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu — animated slide */}
      <div
        className={cn(
          "md:hidden grid transition-[grid-template-rows] duration-300 ease-out",
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border bg-card px-6 py-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-base font-medium ${pathname === link.href
                    ? "text-primary"
                    : "text-foreground"
                    }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-border" />
              <a
                href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm font-medium text-secondary"
              >
                <Phone className="h-4 w-4" />
                <span>{companyInfo.phone}</span>
              </a>
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-[#d1182a] font-semibold">
                <Link href="/contact">Request Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
