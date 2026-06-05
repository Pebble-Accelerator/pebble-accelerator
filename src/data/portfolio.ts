import type { Company } from '@/types'

/** Public logo assets (served from /public/Portfolio). */
const L = (file: string) => `/Portfolio/${encodeURI(file)}`

/**
 * On-brand bucket hue families — soft, desaturated, ~midway to cream (#f5efe4).
 * Therapeutics = muted clay, Diagnostics = pale cool sage-petrol, Platform = pale sage.
 */
const BUCKET_HSL_BASE: Record<MedicalBucket, { h: number; s: number; l: number }> = {
  Therapeutics: { h: 28, s: 32, l: 70 },
  Diagnostics: { h: 160, s: 14, l: 74 },
  Platform: { h: 92, s: 16, l: 77 },
}

/** Subtle per-tile lightness shifts within a family (deterministic by grid index). */
const BUCKET_LIGHTNESS_OFFSETS = [0, -2, 3, -4, 4, -2, 2, -3] as const

/** Strata: lighter at top → ~12% deeper toward the bottom (sediment feel). */
const GRADIENT_DARKEN_DELTA = 12

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)))
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((n) => n.toString(16).padStart(2, '0'))
    .join('')}`
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

/** Darken same hue/saturation by reducing lightness ~22% (gradient bottom-right). */
export function darkenBlockColor(hex: string, lightnessDelta = 22): string {
  const hsl = rgbToHsl(hexToRgb(hex))
  hsl.l = Math.max(14, hsl.l - lightnessDelta)
  return rgbToHex(hslToRgb(hsl))
}

function hslBaseToHex(h: number, s: number, l: number) {
  return rgbToHex(hslToRgb({ h, s, l }))
}

/** Tile gradient base + dark corner from medical bucket and grid index. */
export function getTileColors(
  company: Company,
  gridIndex: number
): { blockColor: string; blockColorDark: string } {
  const bucket = getMedicalBucket(company)
  const fallback = '#2d3a35'
  if (!bucket) {
    return {
      blockColor: fallback,
      blockColorDark: darkenBlockColor(fallback, GRADIENT_DARKEN_DELTA),
    }
  }
  const base = BUCKET_HSL_BASE[bucket]
  const lightnessOffset =
    BUCKET_LIGHTNESS_OFFSETS[gridIndex % BUCKET_LIGHTNESS_OFFSETS.length]
  const blockColor = hslBaseToHex(base.h, base.s, base.l + lightnessOffset)
  return {
    blockColor,
    blockColorDark: darkenBlockColor(blockColor, GRADIENT_DARKEN_DELTA),
  }
}

function company(input: Company): Company {
  return input
}

/** Unified list — 28 unique companies. */
export const portfolioCompanies: Company[] = [
  company({
    id: 'cg-oncology',
    slug: 'cg-oncology',
    name: 'CG Oncology',
    category: 'Therapeutic',
    filterGroup: 'Therapeutics',
    logo: L('CGOnco.png'),
    website: 'https://cgoncology.com/',
  }),
  company({
    id: 'ka-imaging',
    slug: 'ka-imaging',
    name: 'KA Imaging',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('KAimaging.png'),
    website: 'https://kaimaging.com/',
  }),
  company({
    id: 'phase-scientific',
    slug: 'phase-scientific',
    name: 'Phase Scientific',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('phase scientific.png'),
    website: 'https://phasescientific.com/about/the-company',
  }),
  company({
    id: 'oncoustics',
    slug: 'oncoustics',
    name: 'Oncoustics',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('Oncoustics.png'),
    website: 'https://www.oncoustics.com/',
  }),
  company({
    id: 'corvista',
    slug: 'corvista',
    name: 'CorVista',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('Corvista.png'),
    website: 'https://corvista.com/',
  }),
  company({
    id: 'xandar-kardian',
    slug: 'xandar-kardian',
    name: 'Xandar Kardian',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('XandarKardian.png'),
    website: 'https://xkcorp.com/',
  }),
  company({
    id: 'endiatx',
    slug: 'endiatx',
    name: 'Endiatx',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('endiatx.png'),
    website: 'https://www.endiatx.com/',
  }),
  company({
    id: 'heranova',
    slug: 'heranova',
    name: 'Heranova',
    category: 'Diagnostic',
    filterGroup: 'Diagnostics',
    logo: L('HeraNova.png'),
    website: 'https://heranova.com/',
  }),
  company({
    id: 'e3a',
    slug: 'e3a',
    name: 'E3A',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('E3A.png'),
    website: 'https://e3ahealth.com/',
  }),
  company({
    id: 'opharmic',
    slug: 'opharmic',
    name: 'Opharmic',
    category: 'Therapeutic Device',
    filterGroup: 'Devices',
    logo: L('opharmic.png'),
    website: 'https://www.opharmic.com/',
  }),
  company({
    id: 'uni-bio-project',
    slug: 'uni-bio-project',
    name: 'Uni-Bio Project',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('UniBioScience (1).png'),
    website: 'https://www.uni-bioscience.com/en',
  }),
  company({
    id: 'innovac',
    slug: 'innovac',
    name: 'Innovac',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('innovac.png'),
    website: 'https://www.innovactx.com/',
  }),
  company({
    id: 'valora',
    slug: 'valora',
    name: 'Valora',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('Valora.png'),
    website: 'https://www.valoratherapeutics.com/',
  }),
  company({
    id: 'spiral-tx',
    slug: 'spiral-tx',
    name: 'Spiral Tx',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('Spiral.png'),
    website: 'https://www.spiraltx.com/',
  }),
  company({
    id: 'pacegenix',
    slug: 'pacegenix',
    name: 'Pacegenix',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
  }),
  company({
    id: 'pilatus',
    slug: 'pilatus',
    name: 'Pilatus',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('Pilatus.png'),
    website: 'https://www.pilatusbio.com/',
  }),
  company({
    id: 'memora',
    slug: 'memora',
    name: 'Memora',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('memora.png'),
    website:
      'https://www.cpr.cuhk.edu.hk/en/press/cuhk-innovation-summit-2026-concludes-successfully-event-accelerates-the-transformation-of-research-into-societal-impact/',
  }),
  company({
    id: 'thrive-bioscience',
    slug: 'thrive-bioscience',
    name: 'Thrive Bioscience',
    category: 'Science Tool',
    filterGroup: 'Platform',
    logo: L('Thrive.png'),
    website: 'https://www.thrivebio.com/',
  }),
  company({
    id: 'phynx',
    slug: 'phynx',
    name: 'PhynX',
    category: 'Scientific Tool',
    filterGroup: 'Platform',
    logo: L('PhynXLab.png'),
    website: 'https://www.sknetworks.co.kr/en/business/phnyx-lab',
  }),
  company({
    id: 'pebble-healthcare',
    slug: 'pebble-healthcare',
    name: 'Pebble Healthcare',
    category: 'Distribution',
    filterGroup: 'Platform',
    logo: L('PebbleHealthcare.png'),
    website: 'https://pebbleaccelerator.com/',
  }),
  company({
    id: 'smt',
    slug: 'smt',
    name: 'SMT',
    category: 'Therapeutic Device',
    filterGroup: 'Devices',
  }),
  company({
    id: 'great-bay-bio',
    slug: 'great-bay-bio',
    name: 'Great Bay Bio',
    category: 'Service/Adjacent',
    filterGroup: 'Platform',
    logo: L('GreaterBayBio.png'),
    website: 'https://www.greatbay-bio.com/',
  }),
  company({
    id: 'mixcare',
    slug: 'mixcare',
    name: 'Mixcare',
    category: 'Digital/Consumer',
    filterGroup: 'Platform',
    logo: L('MixCare.png'),
    website: 'https://m.mixcarehealth.com/en',
  }),
  company({
    id: 'zumvet',
    slug: 'zumvet',
    name: 'ZumVet',
    category: 'Digital/Consumer',
    filterGroup: 'Platform',
    logo: L('ZumVet.png'),
  }),
  company({
    id: 'vigor-medical-systems',
    slug: 'vigor-medical-systems',
    name: 'Vigor Medical Systems',
    category: 'Medical Device',
    filterGroup: 'Devices',
    logo: L('Vigor.png'),
    website: 'https://www.hellovigor.com/',
  }),
  company({
    id: 'egglogics',
    slug: 'egglogics',
    name: 'EggLogics',
    category: 'Medical Device',
    filterGroup: 'Devices',
    logo: L('egglogics-full-logo-white.png'),
    lightLogo: true,
    website: 'https://egglogics.com/',
  }),
  company({
    id: 'n-hop',
    slug: 'n-hop',
    name: 'N-Hop',
    category: 'Service/Adjacent',
    filterGroup: 'Platform',
    logo: L('NHop.png'),
    website: 'https://n-hop.com/',
  }),
  company({
    id: 'jotbody',
    slug: 'jotbody',
    name: 'JotBody',
    category: 'Service/Adjacent',
    filterGroup: 'Platform',
    logo: L('JotBody.png'),
    website: 'https://jotbody.com/',
  }),
]

/**
 * Reader-friendly medical buckets. Each display `category` string maps to exactly
 * one bucket.
 */
export type MedicalBucket = 'Therapeutics' | 'Diagnostics' | 'Platform'

const CATEGORY_TO_BUCKET: Record<string, MedicalBucket> = {
  // Therapeutics — treats or cures.
  Therapeutic: 'Therapeutics',
  'Therapeutic Device': 'Therapeutics',
  Pharmaceutical: 'Therapeutics',
  // Diagnostics — detects or measures.
  Diagnostic: 'Diagnostics',
  'Diagnostic Device': 'Diagnostics',
  // Platform — enabling tech, science tools, services, distribution, digital/consumer.
  'Science Tool': 'Platform',
  'Scientific Tool': 'Platform',
  Distribution: 'Platform',
  'Service/Adjacent': 'Platform',
  'Digital/Consumer': 'Platform',
  'Medical Device': 'Platform',
}

/** Map a company to its medical bucket; warns (never silently drops) on an unmapped category. */
export function getMedicalBucket(company: Company): MedicalBucket | null {
  const bucket = CATEGORY_TO_BUCKET[company.category]
  if (!bucket) {
    console.warn(
      `[portfolio] Unmapped category "${company.category}" for ${company.name} — not assigned to a medical bucket.`
    )
    return null
  }
  return bucket
}

export default portfolioCompanies
