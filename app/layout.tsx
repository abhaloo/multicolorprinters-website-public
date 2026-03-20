import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Playfair_Display, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingCTA } from '@/components/floating-cta'
import { CookieConsent } from '@/components/cookie-consent'
import { SiteShell } from '@/components/site-shell'
import { companyInfo, servicesList } from '@/lib/data'
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

const baseUrl = "https://multicolorprinters.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Multi Color Printers | Commercial Printing in Zanzibar, Tanzania",
    template: "%s | Multi Color Printers",
  },
  description:
    "Zanzibar's leading commercial printing company since 1995. Award-winning quality and precision printing for business cards, brochures, banners, packaging & more.",
  keywords: [
    "printing Zanzibar",
    "commercial printing Tanzania",
    "Multi Color Printers",
    "business cards Zanzibar",
    "brochures Tanzania",
    "packaging printing",
    "offset printing",
    "digital printing",
    "large format printing Zanzibar",
  ],
  icons: {
    icon: "/favicon.gif",
    apple: "/favicon.gif",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Multi Color Printers",
    title: "Multi Color Printers | Commercial Printing in Zanzibar, Tanzania",
    description:
      "Zanzibar's leading commercial printing company since 1995. Award-winning quality and precision printing for business cards, brochures, banners, packaging & more.",
    images: [
      {
        url: "/images/hero-printing.webp",
        width: 1200,
        height: 630,
        alt: "Multi Color Printers — Commercial Printing in Zanzibar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi Color Printers | Commercial Printing in Zanzibar",
    description:
      "Zanzibar's leading commercial printing company since 1995. Award-winning quality and precision printing for business cards, brochures, banners, packaging & more.",
    images: ["/images/hero-printing.webp"],
  },
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#1E2254',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${baseUrl}/#business`,
              name: companyInfo.name,
              description:
                "Award-winning commercial printing company in Zanzibar, Tanzania. Specializing in digital printing, offset printing, graphic design, and packaging since 1995.",
              url: baseUrl,
              telephone: companyInfo.phone,
              email: companyInfo.email,
              image: `${baseUrl}/images/hero-printing.webp`,
              logo: `${baseUrl}/images/logo-company.svg`,
              foundingDate: "1995",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mtoni",
                addressRegion: "Zanzibar",
                addressCountry: "TZ",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -6.1659,
                longitude: 39.2026,
              },
              sameAs: [
                companyInfo.social.instagram,
                companyInfo.social.facebook,
                companyInfo.social.linkedin,
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Printing Services",
                itemListElement: servicesList.map((service, i) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: service,
                  },
                  position: i + 1,
                })),
              },
              award: companyInfo.award.title,
            }),
          }}
        />
      </head>
      <body className={`${_inter.variable} ${_spaceGrotesk.variable} ${_playfair.variable} ${_ibmPlexMono.variable} font-sans antialiased`}>
        <SiteShell>
          <Navbar />
        </SiteShell>
        {children}
        <SiteShell>
          <Footer />
          <FloatingCTA />
          <CookieConsent />
        </SiteShell>
        <Analytics />
      </body>
    </html>
  )
}
