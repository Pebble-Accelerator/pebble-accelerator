import CTAStrip from '@/components/sections/CTAStrip'
import FadeIn from '@/components/ui/FadeIn'

const steps = [
  {
    number: '01',
    name: 'Initial conversation',
    description:
      'A brief call to understand your company, technology, and where you are in the journey. No deck required.',
  },
  {
    number: '02',
    name: 'Assessment & fit',
    description:
      'We evaluate scientific differentiation, market opportunity, and strategic fit with our portfolio and network.',
  },
  {
    number: '03',
    name: 'Term sheet',
    description:
      'If there is mutual interest, we move quickly to a term sheet. Our standard terms are clean and founder-friendly.',
  },
  {
    number: '04',
    name: 'Onboarding',
    description:
      'Introductions to our network begin immediately — investors, clinical advisors, regulatory experts, and government contacts.',
  },
  {
    number: '05',
    name: 'Active support',
    description:
      'We remain actively involved through milestone planning, follow-on fundraising, and strategic pivots as they arise.',
  },
]

export default function ConsultingPage() {
  return (
    <>
      {/* Header */}
      <div className="px-5 md:px-10 pt-16 pb-[64px] border-b border-border">
        <h1 className="text-[40px] font-normal text-ink mb-3">How we work</h1>
        <p className="text-[14px] font-light text-ink-muted">
          Our model combines capital, operational depth, and unparalleled Hong Kong access.
        </p>
      </div>

      {/* Investment */}
      <section className="border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <div className="border-b md:border-b-0 md:border-r border-border px-5 md:px-10 py-10 flex items-start">
            <span className="text-[12px] text-ink-faint">Investment</span>
          </div>
          <FadeIn delay={0.1} className="py-10 px-5 md:px-12">
            <p className="text-[14px] font-light text-ink-body leading-[1.8] max-w-[580px]">
              Pebble deploys starting capital of US$200K alongside hands-on operational
              support tailored to your stage. We take concentrated positions in biomedical
              companies with clear differentiation — typically pre-Series A with validated
              technology and a defined path to the clinic or market. Our milestone-based
              support model means we actively work alongside founders on regulatory
              strategy, key hires, and investor positioning. The ideal Pebble company has
              a strong scientific founder, an addressable market with significant
              Asia-Pacific exposure, and capital efficiency built into its model.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Consulting */}
      <section className="border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <div className="border-b md:border-b-0 md:border-r border-border px-5 md:px-10 py-10 flex items-start">
            <span className="text-[12px] text-ink-faint">Consulting</span>
          </div>
          <FadeIn delay={0.1} className="py-10 px-5 md:px-12">
            <p className="text-[14px] font-light text-ink-body leading-[1.8] max-w-[580px]">
              For companies that are not a fit for our investment program, Pebble serves
              as your operational extension in Hong Kong. This means navigating the
              Innovation and Technology Fund (ITF) and the Health and Medical Research
              Fund (HMRF), connecting you with local CROs and clinical networks, and
              facilitating introductions to strategic investors and corporate partners in
              Greater China. We work on a project or retainer basis, with scope defined
              by your specific market entry objectives. Past mandates have included
              regulatory mapping, joint venture structuring, and KOL engagement across
              APAC.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <div className="border-b md:border-b-0 md:border-r border-border px-5 md:px-10 py-10 flex items-start">
            <span className="text-[12px] text-ink-faint">Process</span>
          </div>
          <FadeIn delay={0.1} className="py-10 px-5 md:px-12">
            <div>
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="border-b border-border py-5 last:border-b-0"
                >
                  <p className="text-[12px] text-ink-ghost mb-1">{step.number}</p>
                  <p className="text-[14px] font-medium text-ink mb-1">{step.name}</p>
                  <p className="text-[13px] font-light text-ink-body">{step.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <CTAStrip />
    </>
  )
}
