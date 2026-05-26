import FadeIn from '@/components/ui/FadeIn'

const fieldClassName =
  'w-full border-0 border-b border-solid border-[#d4cfc2] bg-transparent py-3 text-[15px] text-[#1a1a1a] outline-none placeholder:text-[#aaa] focus:border-[#0f0f0f]'

export default function ContactPage() {
  return (
    <div
      style={{
        paddingTop: '80px',
        paddingLeft: '5vw',
        paddingRight: '5vw',
        paddingBottom: '48px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      <p className="mb-10 text-[12px] font-normal uppercase tracking-[0.04em] text-[#aaa]">
        Contact
      </p>

      <FadeIn>
        <div className="flex flex-col gap-12 md:flex-row md:gap-[80px]">
          <div className="md:w-[45%] md:shrink-0">
            <h1
              className="mb-4 font-display font-medium leading-[1.1] tracking-[-0.02em] text-[#0f0f0f]"
              style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
            >
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

          <div className="min-w-0 md:w-[55%] md:flex-1">
            <form action="mailto:hello@pebbleaccelerator.com" method="POST">
              <div className="mb-6">
                <label className="mb-1.5 block text-[12px] font-normal text-[#888]">
                  Full name
                </label>
                <input type="text" name="name" required className={fieldClassName} />
              </div>

              <div className="mb-6">
                <label className="mb-1.5 block text-[12px] font-normal text-[#888]">
                  Company
                </label>
                <input type="text" name="company" className={fieldClassName} />
              </div>

              <div className="mb-6">
                <label className="mb-1.5 block text-[12px] font-normal text-[#888]">
                  Email
                </label>
                <input type="email" name="email" required className={fieldClassName} />
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-normal text-[#888]">
                  Message
                </label>
                <textarea name="message" rows={5} required className={`${fieldClassName} resize-none`} />
              </div>

              <button
                type="submit"
                className="mt-8 w-full border-0 bg-[#1a1a1a] py-4 text-[12px] font-normal uppercase tracking-[0.12em] text-white transition-colors duration-150 hover:bg-[#333]"
                style={{ borderRadius: 0 }}
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
