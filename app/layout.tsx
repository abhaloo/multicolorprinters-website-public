import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Playfair_Display, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingCTA } from '@/components/floating-cta'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })
const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "700", "900"],
})
const _ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: 'Multi Color Printers | Commercial Printing Excellence',
  description: 'Premium commercial printing services. Business cards, brochures, banners, packaging & more. Request a free quote today.',
  icons: {
    icon: '/favicon.gif',
    apple: '/favicon.gif',
  },
}

export const viewport: Viewport = {
  themeColor: '#1E2254',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_spaceGrotesk.variable} ${_playfair.variable} ${_ibmPlexMono.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <FloatingCTA />
        <Analytics />
      </body>
    </html>
  )
}
