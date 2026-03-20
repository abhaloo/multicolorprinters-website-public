"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem("cookie-consent-accepted")) {
        setVisible(true)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent-accepted", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#111318] px-6 py-4 animate-[slideUp_0.3s_ease-out]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-gray-300 text-center sm:text-left">
          We use cookies to improve your experience.{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
        <button
          onClick={handleAccept}
          className="shrink-0 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
