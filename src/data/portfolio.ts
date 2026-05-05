import type { Company } from '@/types'

const portfolio: Company[] = [
  {
    id: 'uni-bioscience',
    name: 'Uni-Bioscience',
    sector: 'Oncology',
    oneLiner: 'Next-generation antibody therapies for treatment-resistant cancers',
    location: 'Hong Kong',
    status: 'portfolio',
  },
  {
    id: 'medvision-ai',
    name: 'MedVision AI',
    sector: 'Diagnostics',
    oneLiner: 'AI-powered imaging for early-stage disease detection across APAC',
    location: 'Singapore',
    status: 'portfolio',
  },
  {
    id: 'helix-bioworks',
    name: 'Helix Bioworks',
    sector: 'Gene Therapy',
    oneLiner: 'CRISPR-based platforms for rare monogenic diseases',
    location: 'Hong Kong',
    status: 'portfolio',
  },
  {
    id: 'nanocarrier',
    name: 'NanoCarrier',
    sector: 'Drug Delivery',
    oneLiner: 'Precision nanoparticle delivery systems reducing systemic toxicity',
    location: 'Shenzhen',
    status: 'portfolio',
  },
  {
    id: 'careflow',
    name: 'CareFlow',
    sector: 'Digital Health',
    oneLiner: 'Real-time clinical decision support integrating multi-modal patient data',
    location: 'Hong Kong',
    status: 'accelerated',
  },
  {
    id: 'bioform-labs',
    name: 'BioForm Labs',
    sector: 'MedTech',
    oneLiner: 'Organ-on-chip platforms for preclinical drug testing',
    location: 'Singapore',
    status: 'accelerated',
  },
]

export default portfolio
