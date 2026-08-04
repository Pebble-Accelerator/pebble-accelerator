# TODOS

Captured by `/plan-eng-review` on 2026-08-03. Each item was surfaced during review of the
homepage redesign design doc and belongs to no stage of that plan.

---

## 6. Grid-collapse breakpoints vary across similarly-shaped grids

**What:** `PortfolioHome.tsx` (3→2→1 col) breaks at 900px/600px; `People.tsx` (4→2→1 col)
breaks at 900px/520px; `PortfolioEditorial.tsx` (2→1 col, the shared `CompanyCard` grid)
breaks straight to 1 col at 720px with no intermediate tier. The primary 768px breakpoint
(nav, mobile scroll behavior) is consistent everywhere — only these secondary column-collapse
points drift from each other.

**Why:** Surfaced by `/design-review`'s outside-voice pass (2026-08-04). Deferred: the
reviewing subagent itself called this "plausibly intentional per-grid design" — each grid has
a different column count and content density, so identical breakpoints aren't obviously
correct either. Lowest-confidence of the findings from that pass.

**Depends on:** A decision on whether these grids should share a breakpoint scale at all, or
whether per-grid tuning is the right call. Worth revisiting with real content in the grids
(People.tsx is currently unrendered — see item 0) rather than deciding in the abstract.

---

## 0. Restore the team section with real names, roles, and photos

**What:** `data/people.ts` and `components/sections/People.tsx` still exist, intentionally
unused. The `<People />` slide was removed from the homepage on 2026-08-04 because it was
shipping four fake `Name Surname` cards to every visitor — worse than no team section, since
it undercut the site's whole credibility argument. **This is a removal of fake content, not a
decision to drop a team section.** A real one is still wanted.

**What's needed to re-add it:** real partner/team names, roles, and headshot files. Per the
original office-hours brief, real team photography already exists (the one exception to the
site's no-photography constraint) — the blocker is getting names+roles+photo files into
`data/people.ts` and `public/`, not sourcing new photography.

**How to re-add it once the data exists:** populate the `people` array in `data/people.ts`
(shape already defined — `name`, `role`, `company`, `photo`, optional `bioHref`), then re-add
`<People />` to `src/app/page.tsx` (removed between the `PortfolioHome` and `Services` slides).
No component changes needed — it was built to accept real data with zero code changes.

**Open question worth resolving with the real content:** should this live on the homepage as
a slide, or move to a dedicated page/section once the homepage restructure (stage B) lands and
the site stops being nine equal-weight slides? Worth deciding once real content exists rather
than now, since the homepage's own section ordering is still in flux.

**Depends on:** Emmanuel, or whoever holds the real names/roles/photos. Same ask as the deck
and the "39 companies accelerated" substantiation in item 3 below — bundle into one request.

---

## 1. Verify the site loads in WeChat from mainland China

**What:** Open pebbleaccelerator.com in WeChat's in-app browser on a mainland Chinese number
and network. Record what loads, what stalls, and how long it takes.

**Why:** The site's entire distribution model is a link Emmanuel pastes into WeChat, and the
diagnosed reader is a Greater Bay Area counterpart. Vercel's edge network and `api.mapbox.com`
are both unreliable-to-blocked from the mainland. The two heaviest identity-carrying elements
on the homepage are both Mapbox. If tiles do not load there, the hero renders without its
background and the GBA map renders blank, on the audience the whole site is built for.

**Pros:** Ten minutes of effort against an assumption nobody has tested. Could invalidate or
reprioritize several items in the redesign plan before any of them are built.

**Cons:** Requires access to a mainland number or a colleague who has one. A negative result
creates work nobody has scoped.

**Context:** This is a WeChat-first site on US-CDN, US-tile architecture, never tested against
its own diagnosis. Raised by the outside voice during the 2026-08-03 eng review. See the design
doc at `~/.gstack/projects/Pebble-Accelerator-pebble-accelerator/kevin-main-design-20260803-123129.md`
for why WeChat distribution is load-bearing.

**Depends on:** Nothing. Do this first — it is the cheapest high-information action available.

---

## 2. Remove the second Mapbox instance from the hero

**What:** `HeroAtmosphere.tsx:120` renders a full `react-map-gl` `<Map>` as the hero background,
distorted through an SVG `feTurbulence` + `feDisplacementMap` filter. `GBAMap.tsx:470` renders a
second one. Replace the hero instance with a static raster or vector asset.

**Why:** `mapbox-gl` is the largest dependency in `package.json`, and the homepage instantiates
it twice. The hero copy is the first thing a 40-second cold reader on a phone downloads, and it
is being used as texture, not as a map — it is blurred and displaced beyond legibility.

**Pros:** Highest-leverage performance win on the page. Also halves exposure to the Mapbox
account risk in item 5 and to the mainland-access risk in item 1.

**Cons:** The hero atmosphere is a deliberate visual effect that took real work to tune. A
static export may not reproduce the animated displacement convincingly.

**Context:** Not owned by any stage of the redesign plan. Surfaced by the outside voice during
the 2026-08-03 eng review. Note the hero map and the GBA map share one style URL, so changing
one does not affect the other's rendering.

**Depends on:** Best done after stage B, since stage B reflows the hero anyway.

---

## 3. Substantiate or drop "39 COMPANIES ACCELERATED"

**What:** `GBAMap.tsx:103` claims 39 companies accelerated alongside 28 backed. `portfolio.ts`
contains exactly 28 records. The 11-company difference exists nowhere in the repo.

**Why:** The redesign's core premise is that credibility comes from verifiable specifics. An
institutional reader who counts the portfolio grid finds 28 and sees a headline claiming 39.
That is the same unsubstantiated-superlative problem already flagged for "100% HK HOSPITAL
COVERAGE", but only the latter made it into stage A.

**Pros:** Closes the last unverifiable claim on the homepage. Also unblocks stage C, which
cannot honestly visualize a dataset that is 11 records short of its own headline.

**Cons:** Requires Emmanuel to supply the 11 company records, and he is the slow path. The
honest interim move — dropping the stat — removes a number that makes Pebble look larger.

**Context:** Commit `cf21093` shows the CEO already corrected these numbers once, so 28/39 is
believed accurate; the problem is that only 28 are evidenced on the site. See design doc Open
Question 8.

**Depends on:** Emmanuel. Bundle into the same ask as the deck and the partner names.

---

## 4. Fix nested `<main>` on /consulting

**What:** `layout.tsx:63` renders `<main>`. `consulting/page.tsx:14` renders a second `<main>`
inside it. `services/page.tsx` instead uses a `.services-page-main` div, which `globals.css:61`
targets via `html:has(.services-page-main)`.

**Why:** Nested `<main>` is invalid HTML and a landmark-navigation problem for screen readers.
It also means the two routes were never actually identical, which matters because the redesign
plan deduplicates them — redirecting the wrong direction ships the unstyled page.

**Pros:** Small, unambiguous correctness fix. Removes a trap from the route-dedupe work.

**Cons:** Whichever route survives needs its styling verified, since the two pages differ in
exactly the wrapper that carries the CSS hook.

**Context:** Surfaced by the outside voice during the 2026-08-03 eng review. Nav currently points
at `/consulting`; the outside voice suggests keeping that URL (it may appear in the deck) and
porting the `.services-page-main` wrapper onto it rather than redirecting to `/services`.

**Depends on:** Should land with the route dedupe in stage A.

---

## 5. ACCEPTED RISK: Mapbox style and token are on a personal account

**What:** Both `HeroAtmosphere.tsx:12` and `GBAMap.tsx:472` reference
`mapbox://styles/kh-chen/cmp6m5igl002001sc3g662ejb`, a style owned by a personal Mapbox account,
authenticated by a token in `NEXT_PUBLIC_MAPBOX_TOKEN` that is not committed or documented.

**Why this is recorded rather than actioned:** Raised during the 2026-08-03 eng review as
Issue 7 with a recommendation to transfer the style to a firm-owned account. **The owner
reviewed the risk and chose to leave it as-is.** This entry exists so the decision is visible
rather than invisible, not to reopen it.

**The failure mode, for whoever finds this later:** if that account lapses, is closed, or hits a
free-tier limit, the hero background and the GBA map both go blank simultaneously and nobody at
Pebble holds the credentials to fix it. The fix at that point is to create a firm-owned Mapbox
account, duplicate or rebuild the style, repoint both files, and set a new token in Vercel.

**Depends on:** Reopening this is a judgement call for whoever owns the site.
