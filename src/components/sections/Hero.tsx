import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'

export default function Hero() {
  return (
    <section className="border-b border-[#e8e8e8] px-6 md:px-12 py-16 md:py-24">
      <FadeIn className="mx-auto max-w-[1200px]">
        <div className="max-w-[860px]">
          {/* Tag line */}
          <p className="text-[12px] text-[#888] mb-6">
            Hong Kong · Biomedical accelerator
          </p>

          {/* H1 */}
          <h1 className="font-display text-[36px] md:text-[56px] font-normal leading-[1.1] tracking-[-0.02em] text-ink max-w-[700px] mb-6">
            We back the founders redefining medicine.
          </h1>

          {/* Body */}
          <p className="text-[15px] font-light text-[#555] leading-[1.7] max-w-[480px] mb-10">
            Pebble is a boutique accelerator building Hong Kong into a global biomedical
            nexus — bridging the world&apos;s largest patient population with the capital
            and expertise to reach them.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-6">
            <Link
              href="/portfolio"
              className="text-[13px] font-normal text-ink underline hover:text-ink-mid transition-colors duration-150"
            >
              View portfolio
            </Link>
            <Link
              href="/consulting"
              className="text-[12px] text-ink-muted hover:text-ink transition-colors duration-150"
            >
              How we work →
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
