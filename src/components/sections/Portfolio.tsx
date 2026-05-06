import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import portfolio from '@/data/portfolio'
import type { Company } from '@/types'

interface Props {
  limit?: number
}

function CompanyRow({ company, isFirst }: { company: Company; isFirst: boolean }) {
  const href = company.href ?? '/portfolio'

  return (
    <Link
      href={href}
      className={`group flex cursor-pointer items-baseline justify-between gap-4 border-b border-black/[0.08] py-[22px] transition-all duration-150 md:gap-6 ${
        isFirst ? 'border-t border-black/[0.08]' : ''
      }`}
    >
      <div className="flex min-w-0 shrink items-baseline gap-4">
        <span className="font-sans text-[18px] font-medium text-[#0f0f0f] transition-colors duration-150 group-hover:text-[#2D6A5A]">
          {company.name}
        </span>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.08em] text-[#2D6A5A]">
          {company.sector}
        </span>
      </div>
      <div className="flex min-w-0 shrink-0 items-baseline justify-end gap-10">
        <span className="hidden max-w-[400px] text-right text-[13px] font-light text-[#888] md:block">
          {company.oneLiner}
        </span>
        <span className="min-w-[80px] shrink-0 whitespace-nowrap text-right text-[12px] text-[#bbb]">
          {company.location}
        </span>
      </div>
    </Link>
  )
}

export default function Portfolio({ limit }: Props) {
  const companies = limit !== undefined ? portfolio.slice(0, limit) : portfolio
  const showViewAll = limit !== undefined

  return (
    <section className="bg-[#F5F0E8] px-[5vw] py-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <FadeIn>
          <div className="mb-12 flex items-baseline justify-between md:mb-12">
            <span className="text-[11px] font-normal uppercase tracking-[0.12em] text-[#888]">
              Portfolio
            </span>
            <Link
              href="/portfolio"
              className="text-[13px] text-[#888] transition-colors hover:text-[#0f0f0f]"
            >
              All companies →
            </Link>
          </div>
        </FadeIn>

        <div>
          {companies.map((company, i) => (
            <CompanyRow key={company.id} company={company} isFirst={i === 0} />
          ))}
          {showViewAll && (
            <Link
              href="/portfolio"
              className="flex cursor-pointer justify-center border-b border-black/[0.08] py-[22px] text-[13px] text-[#888] transition-colors hover:text-[#0f0f0f]"
            >
              View all companies →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
