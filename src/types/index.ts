export interface Company {
  id: string
  name: string
  sector: string
  oneLiner: string
  location: string
  status: 'portfolio' | 'accelerated'
  href?: string
}

export interface Backer {
  name: string
  type: string
  href: string
  height?: number
}
