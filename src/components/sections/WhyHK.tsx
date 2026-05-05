import FadeIn from '@/components/ui/FadeIn'

const pillars = [
  "Access to China's 1.4B patient population",
  'HK government grants & regulatory pathways',
  'Bridge to global institutional capital',
  'Deep clinical network across APAC',
]

export default function WhyHK() {
  return (
    <section className="border-b border-[#e8e8e8]">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[200px_1fr]">
        {/* Label */}
        <div className="w-[200px] border-b md:border-b-0 md:border-r border-[#e8e8e8] p-5 md:p-10 md:pt-11 self-start flex items-start">
          <span className="text-[12px] text-[#aaa]">Why Hong Kong</span>
        </div>

        {/* Content */}
        <FadeIn className="p-5 md:py-10 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12">
            {/* Left sub-column */}
            <div>
              <h2 className="font-display text-[26px] font-normal leading-[1.4] tracking-[-0.01em] text-ink mb-[14px]">
                Building Hong Kong into the world&apos;s biomedical nexus.
              </h2>
              <p className="text-[13px] font-light text-[#777] leading-[1.8]">
                HK&apos;s regulatory environment, proximity to the world&apos;s largest
                patient pool, and integration into global capital markets create a
                compounding advantage for every company we back.
              </p>
            </div>

            {/* Right sub-column */}
            <div>
              {pillars.map((pillar, i) => (
                <div
                  key={pillar}
                  className={`py-[13px] border-b border-[#ebebeb] text-[13px] font-light text-[#444] ${i === 0 ? 'border-t border-[#ebebeb]' : ''}`}
                >
                  {pillar}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
