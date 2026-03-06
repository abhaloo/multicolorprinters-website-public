"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Send, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const serviceOptions = [
  "Graphic Design",
  "Digital Printing",
  "Offset Printing",
  "Packaging",
  "Business Cards",
  "Brochures & Flyers",
  "Large Format Printing",
  "T-Shirt Printing",
  "Stickers & Labels",
  "Other",
]

const paperSizeOptions = [
  "A4",
  "A5",
  "A3",
  "A2",
  "A1",
  "Business Card",
  "Custom",
  "Not sure",
]

const turnaroundOptions = [
  "Standard (5–7 days)",
  "Rush (2–3 days)",
  "Not sure",
]

const inputClasses =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"

export function ContactForm() {
  const [pending, setPending] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const loadedAt = useRef<number>(0)

  useEffect(() => {
    loadedAt.current = Date.now()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const data = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      service: fd.get("service") as string,
      description: fd.get("description") as string,
      quantity: fd.get("quantity") as string,
      paperSize: fd.get("paperSize") as string,
      turnaround: fd.get("turnaround") as string,
      message: fd.get("message") as string,
      website: fd.get("website") as string, // honeypot
      _loadedAt: loadedAt.current,
    }

    if (!data.name || !data.email || !data.service || !data.message) {
      toast.error("Please fill in all required fields.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      toast.error("Please enter a valid email address.")
      return
    }

    setPending(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.status === 429) {
        toast.error("You've submitted recently. Please wait a few minutes.")
        return
      }

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        toast.error(body?.error || "Something went wrong. Please try again.")
        return
      }

      form.reset()
      toast.success("Thank you! We'll get back to you within 24 hours.")
    } catch {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot — invisible to humans, bots auto-fill it */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      />

      {/* Row 1: Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClasses}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
            Email <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClasses}
            placeholder="your@email.com"
          />
        </div>
      </div>

      {/* Row 2: Phone + Service */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-foreground">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={inputClasses}
            placeholder="+255 xxx xxx xxx"
          />
        </div>

        <div>
          <label htmlFor="service" className="mb-1 block text-sm font-medium text-foreground">
            Service <span className="text-primary">*</span>
          </label>
          <select id="service" name="service" required className={inputClasses}>
            <option value="">Select a service</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Toggle for optional details */}
      <button
        type="button"
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-foreground transition-colors self-start"
      >
        <span>{showDetails ? "Fewer details" : "Add more details (optional)"}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            showDetails && "rotate-180"
          )}
        />
      </button>

      {showDetails && (
        <>
          {/* Row 3: Product Description + Quantity */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-foreground">
                Product Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                className={inputClasses}
                placeholder="e.g., Business cards"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="mb-1 block text-sm font-medium text-foreground">
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="text"
                className={inputClasses}
                placeholder="e.g., 500, 1000, 5000"
              />
            </div>
          </div>

          {/* Row 4: Paper Size + Turnaround */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="paperSize" className="mb-1 block text-sm font-medium text-foreground">
                Paper Size
              </label>
              <select id="paperSize" name="paperSize" className={inputClasses}>
                <option value="">Select size</option>
                {paperSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="turnaround" className="mb-1 block text-sm font-medium text-foreground">
                Turnaround Time
              </label>
              <select id="turnaround" name="turnaround" className={inputClasses}>
                <option value="">Select timeframe</option>
                {turnaroundOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-foreground">
          Project Details <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={`${inputClasses} resize-none`}
          placeholder="Tell us about your project..."
        />
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="bg-primary text-primary-foreground hover:bg-[#d1182a] font-semibold py-5 text-base shadow-lg shadow-primary/25 transition-all"
      >
        {pending ? (
          "Sending..."
        ) : (
          <>
            Request a Quote
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
