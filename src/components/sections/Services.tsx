import FadeIn from '@/components/ui/FadeIn'

const services = [
  {
    name: 'Investment',
    description:
      'We deploy starting capital of US$200K alongside deep operational support, leveraging our investor network to accelerate the milestones that matter.',
    tags: 'Seed · Series A bridge · Follow-on',
  },
  {
    name: 'Consulting',
    description:
      'For companies beyond our investment scope, we serve as your extension in Hong Kong — opening doors to China, accessing government grants, building the right partnerships.',
    tags: 'Market entry · HK grants · China access',
  },
]

export default function Services() {
  return (
    <section className="border-b border-[#e8e8e8]">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[200px_1fr]">
        {/* Label */}
        <div className="w-[200px] border-b md:border-b-0 md:border-r border-[#e8e8e8] p-5 md:p-10 md:pt-11 self-start flex items-start">
          <span className="text-[12px] text-[#aaa]">What we do</span>
        </div>

        {/* Content: two service sub-columns */}
        <FadeIn className="grid grid-cols-1 md:grid-cols-2 p-5 md:py-10 md:px-12">
          {services.map((service, i) => (
            <div
              key={service.name}
              className={`py-10 pr-10 pl-12 ${i < services.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#e8e8e8]' : ''}`}
            >
              <p className="text-[15px] font-medium text-[#0f0f0f] mb-[14px]">{service.name}</p>
              <p className="text-[13px] font-light text-[#666] leading-[1.75] mb-5">
                {service.description}
              </p>
              <p className="text-[12px] text-[#bbb]">{service.tags}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
