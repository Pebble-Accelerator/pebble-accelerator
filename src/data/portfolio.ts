import type { Company } from '@/types'

/** Public logo assets (served from /public/Portfolio). */
const L = (file: string) => `/Portfolio/${encodeURI(file)}`

/** Harmonized brand colors (base → dark computed at build). */
const C = {
  cgo: '#8e4837',
  corvista: '#2e5f7b',
  e3a: '#397082',
  greatBay: '#304a6d',
  heranova: '#953152',
  jotbody: '#40597a',
  ka: '#945c31',
  mixcare: '#448179',
  nhop: '#88713d',
  oncoustics: '#8d6a38',
  pebbleHc: '#995b2c',
  phynx: '#a04a55',
  pilatus: '#8f363e',
  spiral: '#527467',
  thrive: '#90353c',
  uniBio: '#2b6d7e',
  valora: '#824343',
  vigor: '#2b5a9a',
  xandar: '#3d7488',
  zumvet: '#635274',
  egglogics: '#3f4a46',
  endiatx: '#257a6d',
  innovac: '#6a7f72',
  memora: '#3d5f7f',
  opharmic: '#4a6278',
  pacegenix: '#556a62',
  phase: '#2a6d85',
  smtFallback: '#2d3a35',
} as const

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

type CompanyInput = Omit<Company, 'blockColorDark'> & { blockColor: string }

function company(input: CompanyInput): Company {
  return {
    ...input,
    blockColorDark: darkenBlockColor(input.blockColor, 22),
  }
}

/** Unified list — 28 unique companies, prominent-first. No duplicate ALL-view entries. */
export const portfolioCompanies: Company[] = [
  company({
    id: 'cg-oncology',
    slug: 'cg-oncology',
    name: 'CG Oncology',
    category: 'Therapeutic',
    filterGroup: 'Therapeutics',
    logo: L('CGOnco.png'),
    blockColor: C.cgo,
    website: 'https://cgoncology.com/',
    isLegacy: true,
    legacyFilter: true,
  }),
  company({
    id: 'ka-imaging',
    slug: 'ka-imaging',
    name: 'KA Imaging',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('KAimaging.png'),
    blockColor: C.ka,
    website: 'https://kaimaging.com/',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'phase-scientific',
    slug: 'phase-scientific',
    name: 'Phase Scientific',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('phase scientific.png'),
    blockColor: C.phase,
    website: 'https://phasescientific.com/about/the-company',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'oncoustics',
    slug: 'oncoustics',
    name: 'Oncoustics',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('Oncoustics.png'),
    blockColor: C.oncoustics,
    website: 'https://www.oncoustics.com/',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'corvista',
    slug: 'corvista',
    name: 'CorVista',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('Corvista.png'),
    blockColor: C.corvista,
    website: 'https://corvista.com/',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'xandar-kardian',
    slug: 'xandar-kardian',
    name: 'Xandar Kardian',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('XandarKardian.png'),
    blockColor: C.xandar,
    website: 'https://xkcorp.com/',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'endiatx',
    slug: 'endiatx',
    name: 'Endiatx',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('endiatx.png'),
    blockColor: C.endiatx,
    website: 'https://www.endiatx.com/',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'heranova',
    slug: 'heranova',
    name: 'Heranova',
    category: 'Diagnostic',
    filterGroup: 'Diagnostics',
    logo: L('HeraNova.png'),
    blockColor: C.heranova,
    website: 'https://heranova.com/',
    isLegacy: false,
    legacyFilter: true,
  }),
  company({
    id: 'e3a',
    slug: 'e3a',
    name: 'E3A',
    category: 'Diagnostic Device',
    filterGroup: 'Diagnostics',
    logo: L('E3A.png'),
    blockColor: C.e3a,
    website: 'https://e3ahealth.com/',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'opharmic',
    slug: 'opharmic',
    name: 'Opharmic',
    category: 'Therapeutic Device',
    filterGroup: 'Devices',
    logo: L('opharmic.png'),
    blockColor: C.opharmic,
    website: 'https://www.opharmic.com/',
    isLegacy: false,
    legacyFilter: true,
  }),
  company({
    id: 'uni-bio-project',
    slug: 'uni-bio-project',
    name: 'Uni-Bio Project',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('UniBioScience (1).png'),
    blockColor: C.uniBio,
    website: 'https://www.uni-bioscience.com/en',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'innovac',
    slug: 'innovac',
    name: 'Innovac',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('innovac.png'),
    blockColor: C.innovac,
    website: 'https://www.innovactx.com/',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'valora',
    slug: 'valora',
    name: 'Valora',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('Valora.png'),
    blockColor: C.valora,
    website: 'https://www.valoratherapeutics.com/',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'spiral-tx',
    slug: 'spiral-tx',
    name: 'Spiral Tx',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('Spiral.png'),
    blockColor: C.spiral,
    website: 'https://www.spiraltx.com/',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'pacegenix',
    slug: 'pacegenix',
    name: 'Pacegenix',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('pacegenix.png'),
    blockColor: C.pacegenix,
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'pilatus',
    slug: 'pilatus',
    name: 'Pilatus',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('Pilatus.png'),
    blockColor: C.pilatus,
    website: 'https://www.pilatusbio.com/',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'memora',
    slug: 'memora',
    name: 'Memora',
    category: 'Pharmaceutical',
    filterGroup: 'Pharma',
    logo: L('memora.png'),
    blockColor: C.memora,
    website:
      'https://www.cpr.cuhk.edu.hk/en/press/cuhk-innovation-summit-2026-concludes-successfully-event-accelerates-the-transformation-of-research-into-societal-impact/',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'thrive-bioscience',
    slug: 'thrive-bioscience',
    name: 'Thrive Bioscience',
    category: 'Science Tool',
    filterGroup: 'Platform',
    logo: L('Thrive.png'),
    blockColor: C.thrive,
    website: 'https://www.thrivebio.com/',
    isLegacy: false,
    legacyFilter: true,
  }),
  company({
    id: 'phynx',
    slug: 'phynx',
    name: 'PhynX',
    category: 'Scientific Tool',
    filterGroup: 'Platform',
    logo: L('PhynXLab.png'),
    blockColor: C.phynx,
    website: 'https://www.sknetworks.co.kr/en/business/phnyx-lab',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'pebble-healthcare',
    slug: 'pebble-healthcare',
    name: 'Pebble Healthcare',
    category: 'Distribution',
    filterGroup: 'Platform',
    logo: L('PebbleHealthcare.png'),
    blockColor: C.pebbleHc,
    website: 'https://pebbleaccelerator.com/',
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'smt',
    slug: 'smt',
    name: 'SMT',
    category: 'Therapeutic Device',
    filterGroup: 'Devices',
    blockColor: C.smtFallback,
    isLegacy: false,
    legacyFilter: false,
  }),
  company({
    id: 'great-bay-bio',
    slug: 'great-bay-bio',
    name: 'Great Bay Bio',
    category: 'Service/Adjacent',
    filterGroup: 'Platform',
    logo: L('GreaterBayBio.png'),
    blockColor: C.greatBay,
    website: 'https://www.greatbay-bio.com/',
    isLegacy: true,
    legacyFilter: true,
  }),
  company({
    id: 'mixcare',
    slug: 'mixcare',
    name: 'Mixcare',
    category: 'Digital/Consumer',
    filterGroup: 'Platform',
    logo: L('MixCare.png'),
    blockColor: C.mixcare,
    website: 'https://m.mixcarehealth.com/en',
    isLegacy: true,
    legacyFilter: true,
  }),
  company({
    id: 'zumvet',
    slug: 'zumvet',
    name: 'ZumVet',
    category: 'Digital/Consumer',
    filterGroup: 'Platform',
    logo: L('ZumVet.png'),
    blockColor: C.zumvet,
    isLegacy: true,
    legacyFilter: true,
  }),
  company({
    id: 'vigor-medical-systems',
    slug: 'vigor-medical-systems',
    name: 'Vigor Medical Systems',
    category: 'Medical Device',
    filterGroup: 'Devices',
    logo: L('Vigor.png'),
    blockColor: C.vigor,
    website: 'https://www.hellovigor.com/',
    isLegacy: true,
    legacyFilter: true,
  }),
  company({
    id: 'egglogics',
    slug: 'egglogics',
    name: 'EggLogics',
    category: 'Medical Device',
    filterGroup: 'Devices',
    logo: L('egglogics-full-logo-white.png'),
    blockColor: C.egglogics,
    lightLogo: true,
    website: 'https://egglogics.com/',
    isLegacy: true,
    legacyFilter: true,
  }),
  company({
    id: 'n-hop',
    slug: 'n-hop',
    name: 'N-Hop',
    category: 'Service/Adjacent',
    filterGroup: 'Platform',
    logo: L('NHop.png'),
    blockColor: C.nhop,
    website: 'https://n-hop.com/',
    isLegacy: true,
    legacyFilter: true,
  }),
  company({
    id: 'jotbody',
    slug: 'jotbody',
    name: 'JotBody',
    category: 'Service/Adjacent',
    filterGroup: 'Platform',
    logo: L('JotBody.png'),
    blockColor: C.jotbody,
    website: 'https://jotbody.com/',
    isLegacy: true,
    legacyFilter: true,
  }),
]

/**
 * Reader-friendly medical buckets. Each display `category` string maps to exactly
 * one bucket. LEGACY is a separate time/status overlay (see `legacyFilter`), NOT a
 * bucket — legacy companies still belong to their medical bucket here.
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
