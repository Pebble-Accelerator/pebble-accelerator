# Pebble Accelerator — site

Public marketing site for Tiger Jade Pebble Accelerator, a boutique biomedical accelerator
in Hong Kong backed by Tigermed. Next.js, Tailwind, GSAP, Mapbox.

## What this site is for

It is a **pre-meeting credibility check**, not a lead-generation site. Emmanuel sends the
link into WeChat before or after meetings; a PDF deck carries the actual pitch. The reader
is on a phone for about 40 seconds, verifying that Pebble is real.

Consequences for any change you make here:

- **Atmosphere is a gate, not a payload.** Polish is necessary (a cheap-looking site gets
  closed before a claim is read) but it is priced in. Named entities — companies, backers,
  hospitals, sourced numbers — are the only things that carry proof.
- **No photography exists and none is obtainable**, except real team portraits. Stock
  imagery is rejected: fake lab photos attached to real portfolio companies damage
  credibility with institutional partners.
- **Never ship an unsubstantiated superlative.** A polished site plus an unverifiable claim
  reads as a shell company to the exact reader this site is for.

Full reasoning: `~/.gstack/projects/Pebble-Accelerator-pebble-accelerator/kevin-main-design-20260803-123129.md`

## Testing

- `npm run test:e2e` — Playwright, **runs against production by default** (deliberate: the
  og:image failure class is invisible in local dev).
- `npm run test:e2e:local` — same specs against `localhost:3000`.
- Metadata specs use the `request` fixture and need no browser binary. Future scroll specs
  will need `npx playwright install chromium`.

## Gotchas

- **The scroll hijack is desktop-only** (`homeSlideshow.ts`, 768px gate). Mobile already
  runs native scroll via a `@media (max-width: 767px)` block in `globals.css`.
- **`isHomeSlideshowActive()` does not control the hijack.** `HomeScrollController` computes
  its own gate and never reads it. Flipping that function blanks the Services slide instead.
- **`Footer` renders twice** (`layout.tsx` and `page.tsx`); one is hidden by a
  `body:has(.snap-container)` CSS rule. Removing `.snap-container` without deleting the
  second `<Footer/>` ships two footers.
- **`metadataBase` is load-bearing.** Without it, relative Open Graph image paths resolve to
  localhost and link previews silently go blank in production.
- The canonical origin is **`https://www.pebbleaccelerator.com`**. The bare domain 308s to it.

See `TODOS.md` for known gaps that no current work owns.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
