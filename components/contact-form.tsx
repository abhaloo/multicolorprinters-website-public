"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Send, ChevronDown, Check } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { SuccessCelebration } from "@/components/success-celebration"

const serviceOptions = [
  "Graphic Design",
  "Digital Printing",
  "Offset Printing",
  "Packaging",
  "Business Cards",
  "Brochures & Flyers",
  "Large Format Printing",
  "Garment & T-Shirt Printing",
  "Label & Sticker Printing",
  "UV Printing",
  "Embroidery",
  "Screen Printing",
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
  "Standard (5-7 days)",
  "Rush (2-3 days)",
  "Not sure",
]

// Micro-copy shown below each field when valid
const validationMessages: Record<string, string> = {
  name: "Perfect, thank you",
  email: "We'll reach out to you soon",
  phone: "Got it, thanks",
  service: "Great choice",
  message: "Thank you for sharing",
  description: "Noted",
  quantity: "Got it",
}

// Validation rules per field
function isFieldValid(name: string, value: string): boolean {
  if (!value || value.trim() === "") return false
  if (name === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  if (name === "phone") {
    const digits = value.replace(/\D/g, "")
    return digits.length >= 10
  }
  return true
}

interface FieldState {
  touched: boolean
  valid: boolean
}

const errorMessages: Record<string, string> = {
  phone: "Please enter at least 10 digits",
}

function ValidationFeedback({ field, name }: { field: FieldState | undefined; name: string }) {
  if (!field?.touched) return null
  if (field.valid) {
    return (
      <p className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600 animate-in fade-in slide-in-from-bottom-1 duration-300">
        {validationMessages[name] || "Looks good"}
      </p>
    )
  }
  if (errorMessages[name]) {
    return (
      <p className="mt-1 text-xs font-medium text-red-500 animate-in fade-in slide-in-from-bottom-1 duration-300">
        {errorMessages[name]}
      </p>
    )
  }
  return null
}

function CheckIcon({ field, className }: { field: FieldState | undefined; className?: string }) {
  if (!field?.touched || !field.valid) return null
  return (
    <div className={cn("pointer-events-none absolute right-3 animate-in fade-in zoom-in duration-200", className ?? "top-1/2 -translate-y-1/2")}>
      <Check className="h-5 w-5 text-green-500" strokeWidth={2.5} />
    </div>
  )
}

const initialFieldState: Record<string, FieldState> = {}

export function ContactForm() {
  const [pending, setPending] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [fieldState, setFieldState] = useState<Record<string, FieldState>>(initialFieldState)
  const loadedAt = useRef<number>(0)
  const serviceRef = useRef<HTMLSelectElement>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    loadedAt.current = Date.now()
  }, [])

  useEffect(() => {
    const serviceParam = searchParams.get("service")
    if (serviceParam) {
      const match = serviceOptions.find(
        (opt) => opt.toLowerCase() === serviceParam.toLowerCase()
      )
      if (match && serviceRef.current) {
        serviceRef.current.value = match
        setFieldState((prev) => ({ ...prev, service: { touched: true, valid: true } }))
      }
    }
  }, [searchParams])

  const handleFieldBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (!name) return
    setFieldState((prev) => ({
      ...prev,
      [name]: {
        touched: true,
        valid: isFieldValid(name, value),
      },
    }))
  }, [])

  const handleFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (!name) return
    setFieldState((prev) => {
      const field = prev[name]
      // Only re-validate on change if already touched
      if (!field?.touched) return prev
      return {
        ...prev,
        [name]: {
          ...field,
          valid: isFieldValid(name, value),
        },
      }
    })
  }, [])

  function getFieldClasses(name: string) {
    const field = fieldState[name]
    if (!field?.touched) return "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
    if (field.valid) return "border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
    return "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
  }

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

    if (data.phone && data.phone.replace(/\D/g, "").length < 10) {
      toast.error("Phone number must be at least 10 digits.")
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
      setSubmitted(true)
    } catch {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setPending(false)
    }
  }

  if (submitted) {
    return (
      <SuccessCelebration
        onReset={() => {
          setSubmitted(false)
          setFieldState(initialFieldState)
        }}
      />
    )
  }

  const baseInputClasses = "w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors"

  return (
    <div>
      <p className="mb-6 text-sm text-muted-foreground">
        Free, no-obligation quotes — typically responded within 24 hours
      </p>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot */}
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
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              required
              className={cn(baseInputClasses, "pr-10", getFieldClasses("name"))}
              placeholder="Your name"
              onBlur={handleFieldBlur}
              onChange={handleFieldChange}
            />
            <CheckIcon field={fieldState.name} />
          </div>
          <ValidationFeedback field={fieldState.name} name="name" />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
            Email <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              required
              className={cn(baseInputClasses, "pr-10", getFieldClasses("email"))}
              placeholder="your@email.com"
              onBlur={handleFieldBlur}
              onChange={handleFieldChange}
            />
            <CheckIcon field={fieldState.email} />
          </div>
          <ValidationFeedback field={fieldState.email} name="email" />
        </div>
      </div>

      {/* Row 2: Phone + Service */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-foreground">
            Phone
          </label>
          <div className="relative">
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              pattern="[\d\s\+\-\(\)]{10,}"
              className={cn(baseInputClasses, "pr-10", getFieldClasses("phone"))}
              placeholder="+255 xxx xxx xxx"
              onBlur={handleFieldBlur}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^\d\s\+\-()]/g, "")
                handleFieldChange(e)
              }}
            />
            <CheckIcon field={fieldState.phone} />
          </div>
          <ValidationFeedback field={fieldState.phone} name="phone" />
        </div>

        <div>
          <label htmlFor="service" className="mb-1 block text-sm font-medium text-foreground">
            Service <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <select
              ref={serviceRef}
              id="service"
              name="service"
              required
              className={cn(baseInputClasses, "pr-10", getFieldClasses("service"))}
              onBlur={handleFieldBlur}
              onChange={handleFieldChange}
            >
              <option value="">Select a service</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <CheckIcon field={fieldState.service} />
          </div>
          <ValidationFeedback field={fieldState.service} name="service" />
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
              <div className="relative">
                <input
                  id="description"
                  name="description"
                  type="text"
                  className={cn(baseInputClasses, "pr-10", getFieldClasses("description"))}
                  placeholder="e.g., Business cards"
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                />
                <CheckIcon field={fieldState.description} />
              </div>
              <ValidationFeedback field={fieldState.description} name="description" />
            </div>

            <div>
              <label htmlFor="quantity" className="mb-1 block text-sm font-medium text-foreground">
                Quantity
              </label>
              <div className="relative">
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  className={cn(baseInputClasses, "pr-10", getFieldClasses("quantity"))}
                  placeholder="e.g., 500, 1000, 5000"
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                />
                <CheckIcon field={fieldState.quantity} />
              </div>
              <ValidationFeedback field={fieldState.quantity} name="quantity" />
            </div>
          </div>

          {/* Row 4: Paper Size + Turnaround */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="paperSize" className="mb-1 block text-sm font-medium text-foreground">
                Paper Size
              </label>
              <div className="relative">
                <select
                  id="paperSize"
                  name="paperSize"
                  className={cn(baseInputClasses, "pr-10", getFieldClasses("paperSize"))}
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                >
                  <option value="">Select size</option>
                  {paperSizeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <CheckIcon field={fieldState.paperSize} />
              </div>
              <ValidationFeedback field={fieldState.paperSize} name="paperSize" />
            </div>

            <div>
              <label htmlFor="turnaround" className="mb-1 block text-sm font-medium text-foreground">
                Turnaround Time
              </label>
              <div className="relative">
                <select
                  id="turnaround"
                  name="turnaround"
                  className={cn(baseInputClasses, "pr-10", getFieldClasses("turnaround"))}
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                >
                  <option value="">Select timeframe</option>
                  {turnaroundOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <CheckIcon field={fieldState.turnaround} />
              </div>
              <ValidationFeedback field={fieldState.turnaround} name="turnaround" />
            </div>
          </div>
        </>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-foreground">
          Project Details <span className="text-primary">*</span>
        </label>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className={cn(baseInputClasses, "resize-none pr-10", getFieldClasses("message"))}
            placeholder="Tell us about your project..."
            onBlur={handleFieldBlur}
            onChange={handleFieldChange}
          />
          <CheckIcon field={fieldState.message} className="top-3" />
        </div>
        <ValidationFeedback field={fieldState.message} name="message" />
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
    </div>
  )
}
