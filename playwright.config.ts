import { defineConfig } from '@playwright/test'

/**
 * Default target is PRODUCTION, deliberately.
 *
 * The failure class these specs exist to catch — a relative og:image resolving
 * against localhost — is invisible in local dev by construction. A dev server
 * renders whatever `metadataBase` says regardless of where it is served from, so
 * a local run cannot tell you whether the deployed site serves the right tag or
 * whether the image actually resolves at the real host.
 *
 * Override for a local run:
 *   PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test
 *
 * Note: the metadata specs use the `request` fixture and need no browser binary.
 * The scroll specs planned in T13 will need `npx playwright install chromium`.
 */
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'https://www.pebbleaccelerator.com'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: BASE_URL,
    // Follow redirects so a run against the bare domain still resolves, but the
    // canonical-host assertions below will (correctly) flag the mismatch.
    extraHTTPHeaders: {
      // Some scrapers are served different markup by UA. Assert on what a plain
      // crawler sees, which is the closest analogue to a chat-app link unfurler.
      'user-agent': 'pebble-e2e-metadata-check',
    },
  },
})
