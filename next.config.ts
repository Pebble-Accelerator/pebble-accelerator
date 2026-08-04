import type { NextConfig } from 'next'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [
      // /consulting is canonical (nav points there; it carries the correct
      // .services-page-main CSS hook). /services was a near-duplicate route
      // with a nested <main> bug — retired here rather than left as a second
      // live page. Permanent so search engines and any old links consolidate.
      {
        source: '/services',
        destination: '/consulting',
        permanent: true,
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
