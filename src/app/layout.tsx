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

/**
 * Canonical production origin. MUST be the `www` host: the bare domain
 * `https://pebbleaccelerator.com` returns a 308 redirect to this one, and link
 * scrapers (WeChat in particular) are unreliable about following redirects when
 * fetching og:image. Verified 2026-08-03 against production.
 *
 * This is also what `metadataBase` resolves relative image paths against. Without
 * it, Next.js falls back to `http://localhost:3000`, which renders correctly in
 * local dev and produces a blank card in production — a silent failure that only
 * shows up when someone pastes the link into a chat app.
 */
const SITE_ORIGIN = 'https://www.pebbleaccelerator.com'

const SITE_TITLE = 'Pebble Accelerator · Biomedical Innovation from Hong Kong'
const SITE_DESCRIPTION =
  'Pebble is a boutique accelerator empowering biomedical innovation. We back founders building the future of medicine from Hong Kong.'

/**
 * Social preview card. Resolved against SITE_ORIGIN via metadataBase, so the
 * rendered tag is absolute.
 *
 * NOTE: `public/og.png` does not exist yet. Until it is added, the tag points at
 * a 404 and previews stay blank. `e2e/metadata.spec.ts` asserts this URL returns
 * 200, so that test is the tripwire — it goes green the moment the file lands.
 * Target: 1200x630 PNG.
 */
const OG_IMAGE = '/og.png'
const OG_IMAGE_WIDTH = 1200
const OG_IMAGE_HEIGHT = 630

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_ORIGIN,
    siteName: 'Pebble Accelerator',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: 'Pebble Accelerator — biomedical innovation from Hong Kong',
      },
    ],
  },
  twitter: {
    // Without an explicit block Next.js synthesizes `summary` from openGraph,
    // which renders a small thumbnail. `summary_large_image` is the wide card.
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
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
