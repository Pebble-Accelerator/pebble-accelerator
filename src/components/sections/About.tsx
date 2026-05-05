import FadeIn from '@/components/ui/FadeIn'

export default function About() {
  return (
    <section id="about" className="border-b border-[#e8e8e8] px-6 md:px-12 py-16">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[200px_1fr]">
        {/* Label */}
        <div className="w-[200px] border-b md:border-b-0 md:border-r border-[#e8e8e8] p-6 md:p-10 self-start flex items-start">
          <span className="text-[12px] text-[#aaa]">About</span>
        </div>

        {/* Content */}
        <FadeIn className="p-6 md:py-10 md:px-12">
          <p className="font-display text-[24px] font-normal italic leading-[1.65] text-ink max-w-[580px]">
            Hong Kong sits at a{' '}
            <span className="not-italic">singular crossroads</span> — the gateway
            between China&apos;s vast patient population and the world&apos;s deepest
            capital markets. Pebble was built to exploit this position, backing founders
            with the unfair advantages that come from deep local alignment.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
