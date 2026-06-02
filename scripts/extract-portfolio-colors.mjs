/**
 * One-time portfolio logo color extraction + Pebble harmonization.
 * Run: node scripts/extract-portfolio-colors.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Vibrant } from 'node-vibrant/node'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const LOGO_DIR = path.join(ROOT, 'public', 'Portfolio')
const OUT_FILE = path.join(__dirname, 'portfolio-colors.json')

const BRAND_OVERRIDES = {
  'opharmic.png': '#0f2b57',
}

const FALLBACK_PALETTE = ['#2d3a35', '#8e7886', '#5e7a6a', '#1a1a1a', '#8e7886']
const PEBBLE_FOREST = hexToRgb('#2d3a35')

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function rgbToHex({ r, g, b }) {
  const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)))
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((n) => n.toString(16).padStart(2, '0'))
    .join('')}`
}

function rgbToHsl({ r, g, b }) {
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

function hslToRgb({ h, s, l }) {
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

  return {
    r: (r + m) * 255,
    g: (g + m) * 255,
    b: (b + m) * 255,
  }
}

function isNearNeutral({ r, g, b }) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const spread = max - min
  const lightness = (max + min) / 2
  return spread < 18 || lightness > 235 || lightness < 20
}

function pickSwatch(palette) {
  const order = ['Vibrant', 'DarkVibrant', 'LightVibrant', 'Muted', 'DarkMuted']
  for (const key of order) {
    const swatch = palette[key]
    if (!swatch) continue
    const rgb = swatch.rgb
    if (!isNearNeutral(rgb)) return swatch.hex
  }
  return palette.Vibrant?.hex || palette.Muted?.hex || '#2d3a35'
}

function harmonize(hex, fallbackIndex = 0) {
  if (!hex) return FALLBACK_PALETTE[fallbackIndex % FALLBACK_PALETTE.length]

  let rgb = hexToRgb(hex)
  let hsl = rgbToHsl(rgb)

  hsl.s = hsl.s * 0.62
  hsl.l = Math.min(42, Math.max(28, hsl.l * 0.72 + 8))
  rgb = hslToRgb(hsl)

  const blend = 0.15
  rgb = {
    r: rgb.r * (1 - blend) + PEBBLE_FOREST.r * blend,
    g: rgb.g * (1 - blend) + PEBBLE_FOREST.g * blend,
    b: rgb.b * (1 - blend) + PEBBLE_FOREST.b * blend,
  }

  return rgbToHex(rgb)
}

async function main() {
  const files = fs
    .readdirSync(LOGO_DIR)
    .filter((f) => f.toLowerCase().endsWith('.png') && !f.startsWith('.'))

  const results = {}

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const filePath = path.join(LOGO_DIR, file)
    let extracted = BRAND_OVERRIDES[file]

    if (!extracted) {
      try {
        const palette = await Vibrant.from(filePath).getPalette()
        extracted = pickSwatch(palette)
        const rgb = hexToRgb(extracted)
        if (isNearNeutral(rgb)) {
          extracted = FALLBACK_PALETTE[i % FALLBACK_PALETTE.length]
        }
      } catch (err) {
        console.warn(`Failed ${file}:`, err.message)
        extracted = FALLBACK_PALETTE[i % FALLBACK_PALETTE.length]
      }
    }

    const harmonized = harmonize(extracted, i)
    results[file] = { extracted, harmonized }
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2))

  console.log('\nPortfolio logo colors (extracted → harmonized):\n')
  for (const [file, { extracted, harmonized }] of Object.entries(results)) {
    console.log(`${file.padEnd(32)} ${extracted} → ${harmonized}`)
  }
  console.log(`\nWrote ${OUT_FILE}\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
