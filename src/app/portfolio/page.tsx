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

function CompanyCard({ company, delay }: { company: Company; delay: number }) {
  return (
    <FadeIn delay={delay} className="h-full">
      <div className="h-full py-6">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.04em] text-[#2D6A5A]">
          {company.sector}
        </p>
        <p className="mb-2.5 text-[16px] font-medium text-[#0f0f0f]">{company.name}</p>
        <p className="text-[13px] font-light leading-[1.65] text-[#888]">{company.oneLiner}</p>
        <p className="mt-5 text-[11px] text-[#ccc]">{company.location}</p>
      </div>
    </FadeIn>
  )
}

export default function PortfolioPage() {
  const [active, setActive] = useState<Filter>('all')

  const filtered =
    active === 'all' ? portfolio : portfolio.filter((c) => c.status === active)

  return (
    <div style={{ paddingTop: '60px' }}>
    <>
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-12">
          <h1 className="mb-3 font-display text-[48px] font-normal leading-[1.1] tracking-[-0.02em] text-[#0f0f0f] md:text-[56px]">
            Portfolio
          </h1>
          <p className="text-[14px] font-light leading-[1.75] text-[#555]">
            Companies we&apos;ve backed and accelerated across biomedical innovation.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-[1200px] flex-row flex-wrap gap-x-10 gap-y-3 px-6 md:px-12">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setActive(f.value)}
              className={`py-2 text-[13px] transition-colors duration-150 ${
                active === f.value ? 'font-medium text-[#0f0f0f]' : 'font-normal text-[#aaa]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-x-16 gap-y-8 px-6 pb-24 md:grid-cols-2 md:px-12 lg:grid-cols-3">
          {filtered.map((company, i) => (
            <CompanyCard key={company.id} company={company} delay={i * 0.05} />
          ))}
        </div>
      </section>
    </>
    </div>
  )
}
