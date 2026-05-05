# Pebble Accelerator

Pebble Accelerator is a boutique biomedical accelerator based in Hong Kong, backing founders building the future of medicine. This repository contains the production website.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repository.
3. Vercel auto-detects Next.js. Click **Deploy**.
4. Every push to `main` triggers an automatic redeploy.

## Custom domain (GoDaddy → Vercel)

**Step 1:** In the Vercel dashboard → your project → **Settings → Domains** → add `pebbleaccelerator.com`.

**Step 2:** In GoDaddy DNS settings, delete any existing A records for `@`.

**Step 3:** Add an A record:

- Host: `@`
- Points to: `76.76.21.21`
- TTL: `600`

**Step 4:** Add a CNAME record:

- Host: `www`
- Points to: `cname.vercel-dns.com`
- TTL: `600`

**Step 5:** Back in Vercel, click **Verify**. DNS propagation takes 10–60 minutes.

**Step 6:** Vercel automatically provisions an SSL certificate. No action needed.

## Replacing the contact form

The form currently uses a `mailto:` action which opens the user's email client. For a production form that submits in-browser:

1. Sign up for [Formspree](https://formspree.io) (free tier supports up to 50 submissions/month).
2. Create a new form and copy the endpoint URL (e.g. `https://formspree.io/f/xyzabcde`).
3. In `src/app/contact/page.tsx`, replace `action="mailto:hello@pebbleaccelerator.com" method="POST"` with `action="https://formspree.io/f/xyzabcde" method="POST"`.

## Updating portfolio companies

Edit `src/data/portfolio.ts`. Add, remove, or modify entries in the array. The portfolio page and homepage grid update automatically — no other code changes needed.

## Adding the real logo

1. Place your logo files in `/public/`:
  - `logo.png` — dark version (used on white backgrounds)
  - `logo-white.png` — white version (for any future dark-background contexts)
2. In `src/components/layout/Nav.tsx`, replace the ember circle `<div>` and "Pebble" text with:

```tsx
import Image from 'next/image'

// Inside the Link component:
<Image src="/logo.png" alt="Pebble Accelerator" width={120} height={24} priority />
```

