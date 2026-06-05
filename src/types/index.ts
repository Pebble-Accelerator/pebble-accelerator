export type PortfolioFilterGroup =
  | 'Therapeutics'
  | 'Diagnostics'
  | 'Devices'
  | 'Pharma'
  | 'Platform'

export interface Company {
  id: string
  slug: string
  name: string
  category: string
  filterGroup: PortfolioFilterGroup
  logo?: string
  /** Tile gradient colors — computed from medical bucket when omitted. */
  blockColor?: string
  blockColorDark?: string
  website?: string
  /** White/light logo asset */
  lightLogo?: boolean
}

export interface Backer {
  name: string
  type: string
  href: string
  height?: number
}
