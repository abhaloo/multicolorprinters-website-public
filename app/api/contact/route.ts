import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Rate limiting: IP -> array of timestamps
// Uses Node.js runtime (default) so the Map persists across warm invocations
const submissions = new Map<string, number[]>()
const RATE_LIMIT = 3
const RATE_WINDOW = 15 * 60 * 1000 // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = submissions.get(ip) || []
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW)
  submissions.set(ip, recent)
  if (recent.length >= RATE_LIMIT) return true
  recent.push(now)
  submissions.set(ip, recent)
  return false
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      service,
      description,
      quantity,
      paperSize,
      turnaround,
      message,
      website,
      _loadedAt,
    } = body

    // Honeypot: bots fill hidden fields, humans don't
    if (website) {
      return NextResponse.json({ success: true })
    }

    // Timing: no human fills a form in under 3 seconds
    if (_loadedAt && Date.now() - Number(_loadedAt) < 3000) {
      return NextResponse.json({ success: true })
    }

    // Rate limiting by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in a few minutes." },
        { status: 429 }
      )
    }

    // Validation
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    // Build email HTML
    const rows = [
      ["Name", escapeHtml(name)],
      ["Email", escapeHtml(email)],
      ["Phone", escapeHtml(phone || "—")],
      ["Service", escapeHtml(service)],
      ["Product Description", escapeHtml(description || "—")],
      ["Quantity", escapeHtml(quantity || "—")],
      ["Paper Size", escapeHtml(paperSize || "—")],
      ["Turnaround", escapeHtml(turnaround || "—")],
      ["Message", escapeHtml(message)],
    ]

    const tableRows = rows
      .map(
        ([label, value]) =>
          `<tr>
            <td style="padding:10px 14px;font-weight:600;color:#2E338C;border-bottom:1px solid #e8e8ee;white-space:nowrap;vertical-align:top;">${label}</td>
            <td style="padding:10px 14px;color:#1a1a2e;border-bottom:1px solid #e8e8ee;">${value}</td>
          </tr>`
      )
      .join("")

    const html = `
      <div style="font-family:'Inter',system-ui,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#2E338C;padding:24px 28px;border-radius:12px 12px 0 0;">
          <h1 style="color:#ffffff;font-size:20px;margin:0;">New Quote Request</h1>
          <p style="color:#9395BF;font-size:14px;margin:6px 0 0;">from multicolorprinters.com</p>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e8e8ee;border-top:none;">
          ${tableRows}
        </table>
        <div style="padding:16px 28px;background:#F2F2F2;border-radius:0 0 12px 12px;border:1px solid #e8e8ee;border-top:none;">
          <p style="color:#6b6b8d;font-size:13px;margin:0;">Reply directly to this email to respond to the customer.</p>
        </div>
      </div>
    `

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: "Multi Color Printers <quotes@multicolorprinters.com>",
      replyTo: email,
      to: ["info@multicolorprinters.com"],
      subject: `Quote Request: ${escapeHtml(service)} — ${escapeHtml(name)}`,
      html,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send your message. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
