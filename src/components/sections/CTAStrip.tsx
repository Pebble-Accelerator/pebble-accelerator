import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'

export default function CTAStrip() {
  return (
    <section className="border-b border-[#e8e8e8] px-6 md:px-12 py-16">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[200px_1fr]">
        {/* Label */}
        <div className="w-[200px] border-b md:border-b-0 md:border-r border-[#e8e8e8] p-6 md:p-10 self-start flex items-start">
          <span className="text-[12px] text-[#aaa]">Get in touch</span>
        </div>

        {/* Content */}
        <FadeIn className="p-6 md:py-10 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <p className="font-display text-[32px] font-normal leading-[1.35] tracking-[-0.01em] text-ink max-w-[360px]">
            Building something that changes medicine?
          </p>

          <div className="flex flex-col items-start gap-3">
            <span className="text-[12px] text-[#aaa]">hello@pebbleaccelerator.com</span>
            <Button variant="primary" label="Apply now" href="/contact" className="py-[10px] px-[22px]" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
