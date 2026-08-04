import { test, expect, type APIRequestContext } from '@playwright/test'

/**
 * Open Graph / link-preview metadata.
 *
 * Why this suite exists: the site's entire distribution model is a link pasted
 * into WeChat. If the preview card is blank, every impression the site makes is
 * degraded before anyone clicks. The specific bug this guards against is a
 * relative `og:image` path with no `metadataBase`, which Next.js resolves against
 * `http://localhost:3000` — correct-looking in dev, blank in production.
 *
 * These assert on metadata, never on layout, so they survive the homepage
 * restructure and the visual work still ahead.
 */

const CANONICAL_ORIGIN = 'https://www.pebbleaccelerator.com'

/** Pull the content of a <meta property="..."> or <meta name="..."> tag. */
function readMetaTag(html: string, key: string): string | null {
  // Attribute order varies between Next.js versions, so match either ordering
  // rather than assuming property-then-content.
  const patterns = [
    new RegExp(`<meta[^>]*(?:property|name)="${key}"[^>]*content="([^"]*)"`, 'i'),
    new RegExp(`<meta[^>]*content="([^"]*)"[^>]*(?:property|name)="${key}"`, 'i'),
  ]
  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match) return match[1]
  }
  return null
}

async function fetchHomepageHtml(request: APIRequestContext): Promise<string> {
  const response = await request.get('/')
  expect(
    response.status(),
    'homepage must return 200 before metadata can be asserted'
  ).toBe(200)
  return response.text()
}

test.describe('link preview metadata', () => {
  test('og:image is present and absolute', async ({ request }) => {
    const html = await fetchHomepageHtml(request)
    const ogImage = readMetaTag(html, 'og:image')

    expect(ogImage, 'og:image tag must exist — a missing tag is a blank preview card').toBeTruthy()

    // The core regression guard. Each of these is a distinct real failure:
    //   - relative path  → scrapers cannot resolve it
    //   - localhost      → metadataBase missing or wrong
    //   - http           → many scrapers refuse mixed content
    expect(ogImage, 'og:image must be absolute, not a relative path').toMatch(/^https?:\/\//)
    expect(ogImage, 'og:image must not point at localhost — metadataBase is missing or wrong').not.toContain(
      'localhost'
    )
    expect(ogImage, 'og:image must not point at a private/loopback host').not.toMatch(
      /127\.0\.0\.1|0\.0\.0\.0|\[::1\]/
    )
    expect(ogImage, 'og:image must be served over https').toMatch(/^https:\/\//)
  })

  test('og:image resolves to a real file (HTTP 200)', async ({ request }) => {
    const html = await fetchHomepageHtml(request)
    const ogImage = readMetaTag(html, 'og:image')
    expect(ogImage).toBeTruthy()

    const imageResponse = await request.get(ogImage as string)

    // This is the assertion that stays red until public/og.png is supplied.
    // A 404 here means the metadata is correct but the image is missing, which
    // still renders a blank card.
    expect(
      imageResponse.status(),
      `og:image URL must return 200. Got ${imageResponse.status()} for ${ogImage}. ` +
        'If this is a 404, public/og.png has not been added yet.'
    ).toBe(200)

    const contentType = imageResponse.headers()['content-type'] ?? ''
    expect(contentType, 'og:image must be served as an image').toMatch(/^image\//)
  })

  test('og:image is on the canonical www host', async ({ request }) => {
    const html = await fetchHomepageHtml(request)
    const ogImage = readMetaTag(html, 'og:image')
    expect(ogImage).toBeTruthy()

    // The bare domain 308-redirects to www. Scrapers are unreliable about
    // following redirects when fetching preview images, so the tag must name the
    // post-redirect host directly.
    expect(
      new URL(ogImage as string).origin,
      'og:image must use the canonical www origin — the bare domain 308-redirects'
    ).toBe(CANONICAL_ORIGIN)
  })

  test('og:url points at the canonical origin', async ({ request }) => {
    const html = await fetchHomepageHtml(request)
    const ogUrl = readMetaTag(html, 'og:url')

    expect(ogUrl, 'og:url tag must exist').toBeTruthy()
    expect(
      new URL(ogUrl as string).origin,
      'og:url must name the canonical www origin, not the redirecting bare domain'
    ).toBe(CANONICAL_ORIGIN)
  })

  test('core og tags are populated', async ({ request }) => {
    const html = await fetchHomepageHtml(request)

    for (const key of ['og:title', 'og:description', 'og:site_name', 'og:type']) {
      const value = readMetaTag(html, key)
      expect(value, `${key} must exist`).toBeTruthy()
      expect((value ?? '').trim().length, `${key} must not be empty`).toBeGreaterThan(0)
    }

    expect(readMetaTag(html, 'og:type')).toBe('website')
  })

  test('twitter card is the large variant with an image', async ({ request }) => {
    const html = await fetchHomepageHtml(request)

    // Without an explicit twitter block Next.js synthesizes card="summary",
    // which renders a small thumbnail rather than the wide card.
    expect(
      readMetaTag(html, 'twitter:card'),
      'twitter:card should be summary_large_image, not the synthesized summary'
    ).toBe('summary_large_image')

    const twitterImage = readMetaTag(html, 'twitter:image')
    expect(twitterImage, 'twitter:image must exist').toBeTruthy()
    expect(twitterImage, 'twitter:image must be absolute').toMatch(/^https:\/\//)
    expect(twitterImage, 'twitter:image must not point at localhost').not.toContain('localhost')
  })
})
