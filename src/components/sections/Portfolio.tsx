import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import portfolio from '@/data/portfolio'
import type { Company } from '@/types'

interface Props {
  limit?: number
}

function cardBorder(idx: number) {
  const pos = idx + 1
  const isSecondInRow = pos % 2 === 0
  const isThirdInRow = pos % 3 === 0
  return [
    'border-b border-[#e8e8e8]',
    'md:border-r md:border-[#e8e8e8]',
    isSecondInRow ? 'md:border-r-0' : '',
    isSecondInRow && !isThirdInRow ? 'lg:border-r lg:border-[#e8e8e8]' : '',
    isThirdInRow ? 'lg:border-r-0' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function CompanyCard({ company, delay }: { company: Company; delay: number }) {
  return (
    <FadeIn delay={delay} className="h-full">
      <div className="h-full py-7 px-10 hover:bg-[#fafafa] transition-colors duration-150">
        <p className="text-[11px] font-medium text-[#2D6A5A] mb-[10px]">{company.sector}</p>
        <p className="text-[15px] font-medium text-[#0f0f0f] mb-2">{company.name}</p>
        <p className="text-[13px] font-light text-[#888] leading-[1.6]">
          {company.oneLiner}
        </p>
        <p className="text-[11px] text-[#ccc] mt-4">{company.location}</p>
      </div>
    </FadeIn>
  )
}

export default function Portfolio({ limit }: Props) {
  const companies = limit !== undefined ? portfolio.slice(0, limit) : portfolio
  const showViewAll = limit !== undefined

  return (
    <section className="border-b border-[#e8e8e8] px-6 md:px-12 py-16">
      <div className="mx-auto max-w-[1200px]">
      {/* Header row */}
        <FadeIn>
          <div className="py-7 px-10 border-b border-[#e8e8e8] flex items-center justify-between">
            <span className="text-[12px] text-ink-faint">Portfolio</span>
            <Link
              href="/portfolio"
              className="text-[12px] text-ink-muted hover:text-ink transition-colors duration-150"
            >
              All companies →
            </Link>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company, i) => (
            <div key={company.id} className={cardBorder(i)}>
              <CompanyCard company={company} delay={i * 0.06} />
            </div>
          ))}
          {showViewAll && (
            <div className={cardBorder(companies.length)}>
              <FadeIn delay={companies.length * 0.06} className="h-full">
                <Link
                  href="/portfolio"
                  className="flex h-full min-h-[140px] items-center justify-center hover:bg-[#fafafa] transition-colors duration-150"
                >
                  <span className="text-[12px] text-ink-ghost">View all companies →</span>
                </Link>
              </FadeIn>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
