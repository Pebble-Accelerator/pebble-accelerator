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
  oneLiner: string
  section: 'current' | 'legacy'
}

export interface Backer {
  name: string
  type: string
  href: string
  height?: number
}
