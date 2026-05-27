export type CompanyStage = 'Seed' | 'Series A' | 'Series B' | 'Growth' | 'Pre-Seed'

export type PortfolioSector = 'Therapeutics' | 'Diagnostics' | 'Devices' | 'Platform'

export interface Company {
  id: string
  slug: string
  name: string
  sector: PortfolioSector
  oneLiner: string
  workingOn: string
  location: string
  stage: CompanyStage
  stageLabel: string
  status: 'portfolio' | 'accelerated'
  href?: string
}

export interface Backer {
  name: string
  type: string
  href: string
  height?: number
}
