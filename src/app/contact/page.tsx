import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'

const labelCol =
  'self-start p-6 uppercase tracking-[0.04em] md:px-12 md:pb-12 md:pl-12 md:pr-10 md:pt-[52px]'
const labelText = 'text-[12px] font-normal text-[#aaa]'
const contentCol = 'p-6 md:p-12 md:pb-12 md:pl-14 md:pr-12 md:pt-12'

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '60px' }}>
    <section>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 md:grid-cols-[220px_1fr]">
        <div className={labelCol}>
          <span className={labelText}>Contact</span>
        </div>

        <FadeIn delay={0.1} className={contentCol}>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="mb-4 font-display text-[48px] font-normal leading-[1.1] tracking-[-0.02em] text-[#0f0f0f] md:text-[56px]">
                Let&apos;s talk.
              </h1>
              <p className="mb-6 text-[14px] font-light leading-[1.8] text-[#555]">
                We hear from founders building the next generation of biomedical companies,
                international teams seeking a foothold in Hong Kong and Greater China, and potential
                clinical and institutional partners looking to collaborate. If any of these describe
                you, we want to hear from you.
              </p>
              <a
                href="https://linkedin.com/company/pebbleaccelerator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#888] transition-colors duration-150 hover:text-[#0f0f0f]"
              >
                Connect on LinkedIn →
              </a>
            </div>

            <div>
              <form action="mailto:hello@pebbleaccelerator.com" method="POST">
                <div className="mb-6">
                  <label className="mb-1.5 block text-[12px] font-normal text-[#888]">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border-b border-[#e8e8e8] bg-transparent pb-2.5 pt-2.5 text-[14px] font-light text-[#0f0f0f] outline-none transition-colors duration-150 focus:border-[#0f0f0f]"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-1.5 block text-[12px] font-normal text-[#888]">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="w-full border-b border-[#e8e8e8] bg-transparent pb-2.5 pt-2.5 text-[14px] font-light text-[#0f0f0f] outline-none transition-colors duration-150 focus:border-[#0f0f0f]"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-1.5 block text-[12px] font-normal text-[#888]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border-b border-[#e8e8e8] bg-transparent pb-2.5 pt-2.5 text-[14px] font-light text-[#0f0f0f] outline-none transition-colors duration-150 focus:border-[#0f0f0f]"
                  />
                </div>

                <div className="mb-8">
                  <label className="mb-1.5 block text-[12px] font-normal text-[#888]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full resize-none border-b border-[#e8e8e8] bg-transparent pb-2.5 pt-2.5 text-[14px] font-light text-[#0f0f0f] outline-none transition-colors duration-150 focus:border-[#0f0f0f]"
                  />
                </div>

                <Button
                  variant="primary"
                  label="Send message"
                  type="submit"
                  className="w-full text-center hover:bg-[#333]"
                />
              </form>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
    </div>
  )
}
