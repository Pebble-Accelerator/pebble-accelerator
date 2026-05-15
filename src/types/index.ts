export type CompanyStage = 'Seed' | 'Series A' | 'Series B' | 'Growth'

export interface Company {
  id: string
  name: string
  sector: string
  oneLiner: string
  location: string
  stage: CompanyStage
  status: 'portfolio' | 'accelerated'
  href?: string
}

export interface Backer {
  name: string
  type: string
  href: string
  height?: number
}
