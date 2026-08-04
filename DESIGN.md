# Pebble Accelerator — Design System

This is the contract. Every route gets checked against this, not against how any
other page happens to look. Written from what the codebase actually contains
(`src/app/globals.css`, `src/lib/ripple.ts`, `src/data/portfolio.ts`), not from
memory or aspiration. Where the codebase currently violates this contract, that's
called out explicitly below — those are the fixes, not the description.

Site context: pebbleaccelerator.com is a pre-meeting credibility check, read cold
on a phone in ~40 seconds. Every visual decision should carry a verifiable fact.
Atmosphere is a gate, not a payload. Full reasoning:
`~/.gstack/projects/Pebble-Accelerator-pebble-accelerator/kevin-main-design-*.md`

## Typography

Two families, fixed roles. Never introduce a third.

| Role | Family | CSS var | Use for |
|---|---|---|---|
| Display | Cormorant Garamond | `--font-display` / `var(--font-cormorant)` | Headlines, large numerals, one-line statements |
| Body / UI | IBM Plex Sans | `--font-sans` / `var(--font-ibm-plex-sans)` | Paragraphs, labels, buttons, nav |
| Metadata | IBM Plex Mono | `--font-mono` / `var(--font-ibm-plex-mono)` | Eyebrows, section indices `(01)`, uppercase labels, stat captions |

**Display headline sizing** (observed pattern, keep it): `clamp(Npx, Nvw, Npx)`,
weight 500, letter-spacing around `-0.02em`, line-height 1.0–1.1. Example range
in use: `clamp(52px, 8vw, 104px)` for the hero, `clamp(56px, 7vw, 88px)` for a
page h1. Don't hardcode a fixed px size for a headline — always clamp.

**Metadata labels**: 10–13px, uppercase, letter-spacing `0.12em`–`0.2em`, color
`var(--color-meta)` (light ground) or `rgba(245, 240, 232, 0.6)` (dark ground —
see `SectionLabelLine.tsx`, never the raw `#888`).

## Color Tokens

Defined once in `src/app/globals.css` under `@theme static`. Reference via
`var(--color-*)`. Never write a new hex literal for a color that already has a
token — check this table first.

| Token | Value | Use |
|---|---|---|
| `--color-canvas` | `#f5efe4` | Page ground (light) |
| `--color-slate-dark` | `#2d3a35` | Dark ground (hero, dark sections) |
| `--color-ink` | `#0f0f0f` | Primary text on light ground |
| `--color-ink-900` | `#1a1a1a` | Alternate near-black — **check before using, see gap below** |
| `--color-ink-dark` … `--color-ink-ghost` | `#333` → `#ccc` | Text hierarchy scale, light → faint |
| `--color-meta` | `#888888` | Metadata/eyebrow grey |
| `--color-border` / `--color-pillar-border` | `#e8e8e8` / `#ebebeb` | Hairlines |
| `--color-forest` | `#2D6A5A` | Brand accent green (wordmark, links) |
| `--color-ember` | `#E8703A` | Single-accent orange (one figure per composition, never more) |

**GAP — fix during the audit (task #2):** `#5e7a6a` ("sage") is used in 9+
places — `Hero.tsx`, `Backers.tsx`, `Services.tsx`, `Portfolio.tsx`,
`GBAMap.tsx`, `contact/page.tsx` — and has no token. Promote it to
`--color-sage` in `globals.css` the same way `--color-meta` was promoted from
raw `#888`/`#999` (see the comment already in the file). Then replace every
literal `#5e7a6a` with `var(--color-sage)`.

**GAP:** `contact/page.tsx` redeclares `SAGE`, `EMBER`, `FOREST`, `INK` as local
hex constants instead of importing the tokens. Worse: its `INK = '#1a1a1a'`
matches `--color-ink-900`, not `--color-ink` (`#0f0f0f`) used everywhere else —
a second undocumented "near-black" is now live on the site. Fix: delete the
local constants, use `var(--color-*)` directly, and decide once whether contact
copy should be `--color-ink` or `--color-ink-900` (pick one, it should not be
both across the site).

**Sector bucket colors** (from `src/data/portfolio.ts`, used for portfolio tiles
and the generative ripple motif — see below): Therapeutics `hsl(28, 32%, L)`
(clay), Diagnostics `hsl(160, 14%, L)` (sage-petrol), Platform `hsl(92, 16%, L)`
(sage). These are data-driven, not part of the general UI palette — don't reuse
them for chrome or navigation.

## Spacing

One scale, defined in `globals.css`, consumed via `Section.tsx`. Never hardcode
padding on a new section — use the component.

```
--space-2xs: 8px    --space-sm: 20px   --space-lg: 48px    --space-2xl: 104px
--space-xs: 12px    --space-md: 32px   --space-xl: 72px
--space-page-top: clamp(84px, 11vh, 128px)   /* first section on a page, clears the fixed nav */
--space-section-y: clamp(56px, 8vh, 104px)   /* every other section's vertical padding */
--gutter-x: 5vw
--content-max: 1400px
```

`Section.tsx` (`src/components/ui/Section.tsx`) already encodes this correctly:
`first` prop for the nav-clearing top reserve, `tone` for canvas/dark/transparent
grounds, `maxWidth` override when needed. **Use it for every new section.** A
section that hand-rolls its own padding instead of using `Section` is a
consistency bug, full stop — flag it in the audit.

## Component Primitives

- **`Section.tsx`** — the section wrapper. See above.
- **`SectionLabelLine.tsx`** — the eyebrow-plus-hairline pattern used to open a
  section: optional mono index `(01)`, label, then a hairline that draws in on
  scroll. `tone="dark"` on dark grounds (uses the AA-safe lifted cream, never the
  raw `#888` which fails contrast on slate).
- **`.link-underline`** (global CSS class) — the site's one hover-link treatment:
  underline hidden at rest, wipes left-to-right on hover/focus. Use this for
  every inline text link. `.link-underline--sage` variant exists for links on a
  sage-adjacent context.
- **`CompanyCard.tsx`** — the portfolio tile. Shared between the homepage
  featured grid and `/portfolio`. One change here fixes both surfaces — always
  edit this file, never fork a second tile component.

**Orphaned, do not use:** `src/components/ui/Button.tsx` has zero importers
(confirmed in the eng review). Scheduled for deletion in task #3 (T12). If you
need a button, check what `RippleSubmitButton.tsx` or the inline Link patterns
in `Nav.tsx`/`CTAStrip.tsx` already do before writing a new one.

## The Ripple Motif

`src/lib/ripple.ts` is the site's one generative visual language: deterministic
concentric rings, seeded (`hashSeed` + `mulberry32`) so every instance is unique
but reproducible from the same input. Currently used on the 28 portfolio card
tiles (`cardRippleSpec`) and proven out at OG-card scale (see
`~/.gstack/projects/Pebble-Accelerator-pebble-accelerator/designs/og-card-20260803/`)
seeded off the three real sector buckets.

**Rule for using it elsewhere:** the ripple must be seeded by something real —
a company name, a sector, a count. Never add rings as pure decoration with an
arbitrary or unseeded origin. That reintroduces the exact problem the site was
built to avoid: atmosphere that doesn't carry a fact. If a new surface wants the
ripple treatment, the first question is "seeded by what data," not "how should
it look."

## Known Divergences (route audit complete — 2026-08-04)

Full grep of every route's component tree, `grep -rhoE '#[0-9a-fA-F]{3,8}' src/`
counted and cross-referenced against the token table above. This is the real
backlog. Update as items close.

### 1. Color duplication — the largest finding, not just "sage is missing"

The site actually converges on five real color families, but each family has
2–6 undocumented near-duplicate literals invented ad hoc per component instead
of reusing the token. Counts are total occurrences across `src/`.

| Family | Token (correct) | Also seen as (wrong) |
|---|---|---|
| Near-black / ink | `--color-ink` `#0f0f0f` (16×) | `#1a1a1a` (**19×** — used *more* than the real token) |
| Dark ground | `--color-slate-dark` `#2d3a35` | same value, but **16 of those uses are the raw literal**, not `var()` |
| Sage green | *(no token exists)* | `#5e7a6a` (14×), `#a9c7b6` (5×), `#4F6B5D` (2×), `#2C6B72` (1×) — four different greens doing the "sage" job |
| Cream / canvas | `--color-canvas` `#f5efe4` (5×) | `#f7f3ec` (6×), `#F5F0E8` (2×), `#f1eade` (1×), `#efe8db` (1×), `#eee7da` (1×) — **six near-identical off-whites** |
| Ember accent | `--color-ember` `#E8703A` (7×) | `#F2915E` (1×, unclear if intentional lighter state or drift) |
| Metadata grey | `--color-meta` `#888888` | `#888` (14×), `#999` (3×), `#666`/`#666666` (5×), `#555`/`#555555` (5×), `#bbb` (2×) — a grey scale re-invented per component rather than using the ink-scale tokens that already exist |

This is the single highest-leverage fix: five color families, ~15 stray
literals to collapse into each. **Not currently covered by any of tasks #3–#5
— added as its own task (#8) below.**

### 2. `contact/page.tsx` redeclares tokens as local constants

Including a second undocumented near-black (`#1a1a1a`) that doesn't match
`--color-ink` (`#0f0f0f`) used elsewhere. Folds into task #8 (color
consolidation) rather than being contact-specific — the same bug exists across
the whole site, contact just names its instances as constants.

### 3. `ui/Button.tsx` is dead code, zero importers

Deletes automatically with task #3 / T12. No separate action.

### 4. `/services` vs `/consulting` render different wrapper markup

`.services-page-main` div vs. bare `<main>` — one has the CSS hook
(`html:has(.services-page-main)` in `globals.css:61`), one doesn't. They also
ship identical `<title>` metadata, a minor duplicate-content issue riding along
with the visual one. Resolve per task #4.

### 5. Portfolio logos are still ghosted decoration

`WATERMARK_OPACITY`, grayscale filter, `alt=""` in `CompanyCard.tsx`. Task #3 /
T8 fixes this at the one shared component, which is why it fixes both the
homepage grid and `/portfolio` at once.

### 6. `Section.tsx` adoption is route-dependent, and that's mostly *correct* for now

`Section.tsx` is used on `/portfolio` (`PortfolioEditorial`) and
`/services`+`/consulting` (`ServicesEditorial`). It is used by **zero** of the
eight homepage section components (`Hero`, `GBAMap`, `PortfolioHome`, `People`,
`Services`, `Backers`, `SaltaGen`, `CTAStrip`) and not on `/contact`.

The homepage gap is not a bug to fix independently — those sections are
full-viewport locked slides inside the `snap-container`/`home-slide` system
that stage B of the eng review is already removing. Once the homepage becomes
a normal scrolling document, re-evaluate whether its sections should adopt
`Section.tsx`. Trying to force it in now means redoing the work twice.

`/contact` not using `Section.tsx` is a real, independent gap — task #5.

### 7. `SectionLabelLine` (the eyebrow+hairline pattern) is missing on two routes

Used on the homepage (`SaltaGen`, `PortfolioHome`, `People`, `Backers`) and on
`/portfolio` (`PortfolioEditorial`). **Not used** on `/services`/`/consulting`
(`ServicesEditorial` goes straight into an `<h1>` with no eyebrow, hand-rolling
inline colors `#1a1a1a`/`#2d3a35` for the headline instead) or on `/contact`
(hand-rolls its own eyebrow span — see `eyebrowLabel` in `contact/page.tsx`).
Fold into tasks #4 and #5 respectively.

### 8. Stray `fontFamily: 'Georgia, "Times New Roman", serif'` in `Portfolio.tsx`

Dead code (confirmed zero importers), dies automatically with task #3 / T12.
No separate action — noted only so it isn't mistaken for a live bug.

## What "consistent" means here, concretely

A route is consistent with this system when:
- Every color on the page is a `var(--color-*)` token, or a documented
  data-driven exception (sector bucket hues).
- Every section uses `Section.tsx` for its padding/gutter/max-width, not
  hand-rolled inline styles.
- Every eyebrow/label pattern uses `SectionLabelLine.tsx` or matches its
  typography exactly.
- Display type is Cormorant with a clamp() size; body/UI type is IBM Plex Sans;
  metadata is IBM Plex Mono. No other family appears.
- Any generative/decorative mark (ripple, sector color) is seeded by real data,
  never arbitrary.
