"use client"

import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
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
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+1234567890"
            className="flex items-center gap-1.5 text-sm font-medium text-secondary"
          >
            <Phone className="h-4 w-4" />
            <span>(123) 456-7890</span>
          </a>
          <Button className="bg-primary text-primary-foreground hover:bg-[#d1182a] font-semibold px-6">
            Request Quote
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-medium text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-border" />
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-sm font-medium text-secondary"
            >
              <Phone className="h-4 w-4" />
              <span>(123) 456-7890</span>
            </a>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-[#d1182a] font-semibold">
              Request Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
