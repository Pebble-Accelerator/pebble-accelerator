import CTAStrip from '@/components/sections/CTAStrip'
import FadeIn from '@/components/ui/FadeIn'

const services = [
  {
    name: 'HK as clinical & R&D node',
    description:
      'Leverage Hong Kong as a clinical trial, R&D, and logistics hub for your biomedical operations.',
  },
  {
    name: 'China strategy',
    description:
      'Formulate your China launch and globalization strategy with boots-on-the-ground expertise.',
  },
  {
    name: 'Greater Bay Area ecosystem',
    description:
      "Develop business opportunities within the Greater Bay Area's growing biomedical ecosystem.",
  },
  {
    name: 'Tigermed integration',
    description:
      'Integrate with the broader ecosystem of Tigermed and its global network of partners.',
  },
  {
    name: 'Grants & subsidies',
    description:
      'Apply for grants and subsidies from the Hong Kong Government and other available sources.',
  },
  {
    name: 'Corporate setup',
    description:
      'Set up offshore corporate entities, VIE structures, bank accounts, and visa packages.',
  },
  {
    name: 'Market validation',
    description:
      'Utilize Hong Kong as a test market to identify product-market fit before broader expansion.',
  },
  {
    name: 'Licensing & partnerships',
    description:
      'Identify potential assets for licensing, collaboration, and strategic partnerships.',
  },
]

const steps = [
  {
    number: '01',
    name: 'Initial conversation',
    description:
      'We learn about your company, goals, and where Hong Kong fits into your strategy.',
  },
  {
    number: '02',
    name: 'Assessment & fit',
    description:
      'We assess alignment with our network and identify the highest-leverage opportunities.',
  },
  {
    number: '03',
    name: 'Engagement scope',
    description: 'We define a clear scope of work, timeline, and success metrics together.',
  },
  {
    number: '04',
    name: 'Active engagement',
    description:
      'We execute — opening doors, making introductions, and navigating the local ecosystem on your behalf.',
  },
  {
    number: '05',
    name: 'Ongoing support',
    description:
      'We remain a long-term partner, available as your HK presence evolves.',
  },
]

const labelCol =
  'self-start py-6 uppercase tracking-[0.04em] md:pb-12 md:pt-[52px]'
const labelText = 'text-[12px] font-normal text-[#aaa]'
const contentCol = 'py-6 md:py-12 md:pb-12 md:pt-12'

export default function ConsultingPage() {
  return (
    <>
    <div
      style={{
        paddingTop: '60px',
        paddingLeft: '5vw',
        paddingRight: '5vw',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <section>
          <div className="py-24">
            <FadeIn>
              <p className="mb-6 text-[12px] font-normal uppercase tracking-[0.04em] text-[#aaa]">
                Services
              </p>
              <h1
                className="mb-7 max-w-[700px] font-display font-normal leading-[1.1] tracking-[-0.02em] text-[#0f0f0f]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
              >
                Consulting excellence in biomedical strategy.
              </h1>
              <p className="max-w-[520px] text-[15px] font-light leading-[1.75] text-[#555]">
                For centuries, Hong Kong has been a bridge between East and West. This position has
                never been more relevant as the US and China become the two largest markets for
                biomedical companies. Let us be your eyes and ears — boots on the ground in Hong Kong.
              </p>
            </FadeIn>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
            <div className={labelCol}>
              <span className={labelText}>What we do</span>
            </div>
            <FadeIn delay={0.05} className={contentCol}>
              <p className="max-w-[880px] font-display text-[22px] font-normal italic leading-[1.7] text-[#0f0f0f]">
                Whether you are a global company seeking to access the Chinese market, or a Chinese
                company looking to expand globally — we help you navigate the complexity of operating
                at the intersection of two worlds.
              </p>
            </FadeIn>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
            <div className={labelCol}>
              <span className={labelText}>Services</span>
            </div>
            <FadeIn delay={0.08} className={contentCol}>
              <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
                {services.map((service) => (
                  <div key={service.name}>
                    <p className="mb-2 text-[14px] font-medium text-[#0f0f0f]">{service.name}</p>
                    <p className="text-[13px] font-light leading-[1.75] text-[#666]">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
            <div className={labelCol}>
              <span className={labelText}>Process</span>
            </div>
            <FadeIn delay={0.1} className={contentCol}>
              <div>
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="flex gap-6 border-b border-black/[0.07] py-6 last:border-b-0"
                  >
                    <span className="min-w-[24px] shrink-0 pt-0.5 text-[12px] font-normal text-[#ccc]">
                      {step.number}
                    </span>
                    <div>
                      <p className="mb-1.5 text-[15px] font-medium text-[#0f0f0f]">{step.name}</p>
                      <p className="text-[13px] font-light leading-[1.7] text-[#666]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </div>

    <CTAStrip />
    </>
  )
}
