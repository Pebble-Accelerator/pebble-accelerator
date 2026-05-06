import type { Metadata } from 'next'
import { Cormorant_Garamond, IBM_Plex_Sans } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import './globals.css'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pebble Accelerator — Biomedical Innovation from Hong Kong',
  description:
    'Pebble is a boutique accelerator empowering biomedical innovation. We back founders building the future of medicine from Hong Kong.',
  openGraph: {
    title: 'Pebble Accelerator — Biomedical Innovation from Hong Kong',
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
    <html lang="en" className={`${cormorantGaramond.variable} ${ibmPlexSans.variable}`}>
      <body className={ibmPlexSans.className}>
        <Nav />
        <main className="min-w-0">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
