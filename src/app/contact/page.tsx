import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'

export default function ContactPage() {
  return (
    <section className="border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
        {/* Label */}
        <div className="border-b md:border-b-0 md:border-r border-border px-5 md:px-10 py-10 flex items-start">
          <span className="text-[12px] text-ink-faint">Contact</span>
        </div>

        {/* Content */}
        <FadeIn delay={0.1} className="py-10 px-5 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left */}
            <div>
              <h1 className="text-[36px] font-normal text-ink mb-4">
                Let&apos;s talk.
              </h1>
              <p className="text-[14px] font-light text-ink-body leading-[1.8] mb-6">
                We hear from founders building the next generation of biomedical companies,
                international teams seeking a foothold in Hong Kong and Greater China, and
                potential clinical and institutional partners looking to collaborate. If
                any of these describe you, we want to hear from you.
              </p>
              <a
                href="https://linkedin.com/company/pebbleaccelerator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-ink-muted hover:text-ink transition-colors duration-150"
              >
                Connect on LinkedIn →
              </a>
            </div>

            {/* Right — contact form */}
            <div>
              {/* TODO: Replace mailto with Resend or Formspree for production */}
              <form action="mailto:hello@pebbleaccelerator.com" method="POST">
                <div className="mb-6">
                  <label className="block text-[12px] font-normal text-ink-muted mb-[6px]">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-border pb-[10px] pt-[10px] text-[14px] font-light text-ink outline-none focus:border-ink transition-colors duration-150"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-[12px] font-normal text-ink-muted mb-[6px]">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="w-full bg-transparent border-b border-border pb-[10px] pt-[10px] text-[14px] font-light text-ink outline-none focus:border-ink transition-colors duration-150"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-[12px] font-normal text-ink-muted mb-[6px]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-border pb-[10px] pt-[10px] text-[14px] font-light text-ink outline-none focus:border-ink transition-colors duration-150"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-[12px] font-normal text-ink-muted mb-[6px]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-transparent border-b border-border pb-[10px] pt-[10px] text-[14px] font-light text-ink outline-none focus:border-ink transition-colors duration-150 resize-none"
                  />
                </div>

                <Button variant="primary" label="Send message" type="submit" className="w-full text-center" />
              </form>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
