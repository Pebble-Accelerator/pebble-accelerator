/**
 * Ripple as the site's visual language. Deterministic, seedable helpers so every
 * instance (28 portfolio cards, section marks, dividers) is individually unique
 * but systematically consistent — pure math, rendered as inline SVG/CSS.
 */

/** FNV-1a string hash → uint32. Stable across builds for a given seed. */
export function hashSeed(input: string | number): number {
  const s = String(input)
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** mulberry32 PRNG — tiny, deterministic, seeded. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* --- minimal hex <-> hsl so we can shift a tint's lightness in either direction --- */

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number) {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')
  return `#${c(r)}${c(g)}${c(b)}`
}

function rgbToHsl({ r, g, b }: { r: number; g: number; b: number }) {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0)
        break
      case gn:
        h = (bn - rn) / d + 2
        break
      default:
        h = (rn - gn) / d + 4
        break
    }
    h /= 6
  }
  return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToRgb({ h, s, l }: { h: number; s: number; l: number }) {
  const sn = s / 100
  const ln = l / 100
  const c = (1 - Math.abs(2 * ln - 1)) * sn
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = ln - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 }
}

/** Shift a hex colour's lightness by `deltaL` percentage points (clamped), keeping
 *  hue/saturation so the result stays in the same tint family. */
export function rippleTint(hex: string, deltaL: number): string {
  const hsl = rgbToHsl(hexToRgb(hex))
  hsl.l = Math.max(4, Math.min(96, hsl.l + deltaL))
  const { r, g, b } = hslToRgb(hsl)
  return rgbToHex(r, g, b)
}

/** ViewBox the card ripple field is authored in (4:3, matching the tile). */
export const RIPPLE_VB_W = 400
export const RIPPLE_VB_H = 300

export interface CardRippleSpec {
  /** Origin in viewBox units. */
  ox: number
  oy: number
  /** Concentric ring radii (viewBox units). */
  radii: number[]
  /** Lightness delta applied to the card tint for the ripple stroke (+ lighter / − darker). */
  strokeDelta: number
  /** Base stroke opacity (kept low so it reads as texture, not overlay). */
  opacity: number
}

/**
 * Deterministic per-card ripple: origin + ring spacing vary by seed, so all cards
 * are unique yet consistent. The origin is confined to a deliberate INTERIOR zone
 * (center-ish), clear of the top-right monogram and the bottom-left company name,
 * so the point of impact is always visible within the card — never a cropped arc
 * from an off-screen centre. Radii are capped so the inner rings complete inside
 * the card bounds. `seed` is typically the company name (stable) or index.
 */
export function cardRippleSpec(seed: string | number): CardRippleSpec {
  const rng = mulberry32(hashSeed(seed))
  // Interior impact zone: x 34%–56%, y 40%–60% — visible, clear of monogram + name.
  const ox = RIPPLE_VB_W * (0.34 + rng() * 0.22)
  const oy = RIPPLE_VB_H * (0.4 + rng() * 0.2)
  const spacing = 22 + rng() * 8 // 22–30 (tighter so the pattern stays contained)
  const count = 5 + Math.floor(rng() * 2) // 5–6 rings
  const phase = rng() * spacing * 0.4 // start offset so first ring size varies
  const lighter = rng() > 0.42 // mostly lighter (light-through-water), some darker
  const magnitude = 6 + rng() * 5 // 6–11 lightness points
  const radii = Array.from({ length: count }, (_, i) => phase + (i + 1) * spacing)
  return {
    ox,
    oy,
    radii,
    strokeDelta: lighter ? magnitude : -magnitude,
    // Kept low so the field reads as texture noticed on second viewing, not an overlay.
    opacity: 0.4,
  }
}
