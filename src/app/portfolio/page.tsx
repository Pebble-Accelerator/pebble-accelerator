'use client'

import { useState } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import portfolio from '@/data/portfolio'
import type { Company } from '@/types'

type Filter = 'all' | 'portfolio' | 'accelerated'

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Portfolio', value: 'portfolio' },
  { label: 'Accelerated', value: 'accelerated' },
]

function cardBorder(idx: number, total: number) {
  const pos = idx + 1
  const isLast2 = pos % 2 === 0
  const isLast3 = pos % 3 === 0
  return [
    'border-b border-border',
    'sm:border-r sm:border-border',
    isLast2 ? 'sm:border-r-0' : '',
    isLast2 && !isLast3 ? 'lg:border-r lg:border-border' : '',
    isLast3 ? 'lg:border-r-0' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function CompanyCard({ company, delay }: { company: Company; delay: number }) {
  return (
    <FadeIn delay={delay} className="h-full">
      <div className="h-full px-5 md:px-10 py-7 hover:bg-hover-bg transition-colors duration-150">
        <p className="text-[11px] font-medium text-forest mb-[10px]">{company.sector}</p>
        <p className="text-[14px] font-medium text-ink mb-[6px]">{company.name}</p>
        <p className="text-[12px] font-light text-ink-muted leading-[1.6]">
          {company.oneLiner}
        </p>
        <p className="text-[11px] text-ink-ghost mt-4">{company.location}</p>
      </div>
    </FadeIn>
  )
}

export default function PortfolioPage() {
  const [active, setActive] = useState<Filter>('all')

  const filtered =
    active === 'all' ? portfolio : portfolio.filter((c) => c.status === active)

  return (
    <>
      {/* Header */}
      <div className="px-5 md:px-10 pt-16 pb-[64px] border-b border-border">
        <h1 className="text-[40px] font-normal text-ink mb-3">Portfolio</h1>
        <p className="text-[14px] font-light text-ink-muted">
          Companies we&apos;ve backed and accelerated across biomedical innovation.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-row border-b border-border">
        {filters.map((f, i) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`px-5 py-[14px] text-[13px] transition-colors duration-150 ${
              i < filters.length - 1 ? 'border-r border-border' : ''
            } ${active === f.value ? 'text-ink font-medium' : 'text-ink-faint font-normal'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((company, i) => (
          <div key={company.id} className={cardBorder(i, filtered.length)}>
            <CompanyCard company={company} delay={i * 0.05} />
          </div>
        ))}
      </div>
    </>
  )
}
