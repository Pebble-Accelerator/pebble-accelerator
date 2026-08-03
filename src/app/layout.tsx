import type { Metadata } from 'next'
import { Cormorant_Garamond, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import NoiseOverlay from '@/components/ui/NoiseOverlay'
import './globals.css'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  // 600 is used for the heavier "pebble." focal word in the hero headline.
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

// Mono is the typographic metadata voice: section index numbers and other
// data-like labels across the site.
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pebble Accelerator · Biomedical Innovation from Hong Kong',
  description:
    'Pebble is a boutique accelerator empowering biomedical innovation. We back founders building the future of medicine from Hong Kong.',
  openGraph: {
    title: 'Pebble Accelerator · Biomedical Innovation from Hong Kong',
    description:
      'Pebble is a boutique accelerator empowering biomedical innovation. We back founders building the future of medicine from Hong Kong.',
    url: 'https://pebbleaccelerator.com',
    siteName: 'Pebble Accelerator',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.mapbox.com" />
        <link rel="preconnect" href="https://events.mapbox.com" />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
      </head>
      <body className={ibmPlexSans.className}>
        <NoiseOverlay />
        <Nav />
        <main className="min-w-0 relative z-[2] flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
