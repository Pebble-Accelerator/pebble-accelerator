import type { CSSProperties } from 'react'
import FadeIn from '@/components/ui/FadeIn'

const SAGE = '#5e7a6a'
const EMBER = '#E8703A'
const INK = '#1a1a1a'
const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace"
const LINKEDIN = 'https://linkedin.com/company/pebbleaccelerator'

const monoLabel: CSSProperties = {
  display: 'block',
  fontFamily: MONO,
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(26,26,26,0.5)',
}

const inputClassName =
  'w-full rounded-[6px] border border-solid border-[rgba(26,26,26,0.10)] bg-[#fbf8f1] px-4 py-[15px] text-[15px] text-[#1a1a1a] outline-none transition-colors duration-150 placeholder:text-[rgba(26,26,26,0.4)] focus:border-[#5e7a6a]'

// Consistent vertical gap between field groups; label-to-input stays tight (8px).
const fieldGroup: CSSProperties = { marginBottom: '30px' }

const QUALIFIERS = [
  {
    num: '01',
    lead: 'Founders',
    rest: ' building the next generation of biomedical companies.',
  },
  {
    num: '02',
    lead: 'International teams',
    rest: ' seeking a foothold in Hong Kong & Greater China.',
  },
  {
    num: '03',
    lead: 'Clinical & institutional partners',
    rest: ' looking to collaborate.',
  },
]

export default function ContactPage() {
  return (
    <div
      className="flex flex-1 flex-col justify-center"
      style={{
        paddingLeft: '5vw',
        paddingRight: '5vw',
        paddingTop: 'clamp(96px, 14vh, 200px)',
        paddingBottom: 'clamp(64px, 12vh, 180px)',
      }}
    >
      {/* Desktop only: drop the form card so its top lines up with the heading cap height. */}
      <style>{`@media (min-width: 768px) { .contact-form-card { margin-top: 52px; } }`}</style>
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <FadeIn>
          <div className="flex flex-col gap-14 md:flex-row md:gap-[72px]">
            {/* LEFT COLUMN */}
            <div className="md:w-[46%] md:shrink-0">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <span
                  aria-hidden
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '999px',
                    background: EMBER,
                    display: 'inline-block',
                  }}
                />
                <span style={{ ...monoLabel, color: 'rgba(26,26,26,0.55)' }}>Contact</span>
              </div>

              <h1
                className="font-display"
                style={{
                  fontSize: 'clamp(56px, 7vw, 88px)',
                  fontWeight: 500,
                  lineHeight: 1.04,
                  letterSpacing: '-0.02em',
                  color: INK,
                  margin: '0 0 20px',
                }}
              >
                Let&rsquo;s{' '}
                <span style={{ fontStyle: 'italic', color: SAGE }}>talk.</span>
              </h1>

              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: 'rgba(26,26,26,0.75)',
                  margin: '0 0 32px',
                  maxWidth: '420px',
                }}
              >
                If any of these describe you, we want to hear from you.
              </p>

              <ol
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  borderBottom: '1px solid rgba(26,26,26,0.12)',
                }}
              >
                {QUALIFIERS.map((q) => (
                  <li
                    key={q.num}
                    style={{
                      display: 'flex',
                      gap: '24px',
                      alignItems: 'baseline',
                      padding: '22px 0',
                      borderTop: '1px solid rgba(26,26,26,0.12)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: '13px',
                        color: EMBER,
                        flexShrink: 0,
                        width: '28px',
                      }}
                    >
                      {q.num}
                    </span>
                    <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.5, color: INK }}>
                      <span
                        className="font-display"
                        style={{ fontStyle: 'italic', color: SAGE, fontSize: '21px' }}
                      >
                        {q.lead}
                      </span>
                      {q.rest}
                    </p>
                  </li>
                ))}
              </ol>

              <div style={{ display: 'flex', gap: '56px', marginTop: '44px' }}>
                <div>
                  <p style={{ ...monoLabel, marginBottom: '10px' }}>Email</p>
                  <a
                    href="mailto:hello@pebbleaccelerator.com"
                    className="link-underline"
                    style={{
                      fontSize: '15px',
                      color: INK,
                      textDecoration: 'none',
                    }}
                  >
                    hello@pebbleaccelerator.com
                  </a>
                </div>
                <div>
                  <p style={{ ...monoLabel, marginBottom: '10px' }}>Elsewhere</p>
                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                    style={{ fontSize: '15px', color: INK, textDecoration: 'none' }}
                  >
                    LinkedIn &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — FORM CARD */}
            <div className="min-w-0 md:w-[54%] md:flex-1">
              <div
                className="contact-form-card"
                style={{
                  border: '1px solid rgba(26,26,26,0.15)',
                  borderRadius: '10px',
                  padding: 'clamp(28px, 4vw, 48px)',
                  background: '#faf6ec',
                }}
              >
                <p style={{ ...monoLabel, marginBottom: '28px' }}>Send a message</p>

                <form action="mailto:hello@pebbleaccelerator.com" method="POST">
                  <div style={fieldGroup}>
                    <label htmlFor="contact-name" style={{ ...monoLabel, marginBottom: '8px' }}>
                      Full name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Chan"
                      className={inputClassName}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" style={fieldGroup}>
                    <div>
                      <label htmlFor="contact-company" style={{ ...monoLabel, marginBottom: '8px' }}>
                        Company
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        placeholder="OncoBridge"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" style={{ ...monoLabel, marginBottom: '8px' }}>
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        placeholder="jane@company.com"
                        className={inputClassName}
                      />
                    </div>
                  </div>

                  <div style={fieldGroup}>
                    <label htmlFor="contact-message" style={{ ...monoLabel, marginBottom: '8px' }}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Tell us what you're building, and how we can help."
                      className={`${inputClassName} min-h-[170px] resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full border-0 bg-[#1a1a1a] py-4 text-[14px] font-medium tracking-[0.02em] text-[#f5efe4] transition-colors duration-150 hover:bg-[#333]"
                  >
                    Send message
                    <span aria-hidden>&rarr;</span>
                  </button>

                  <p
                    style={{
                      ...monoLabel,
                      textTransform: 'none',
                      marginTop: '16px',
                      textAlign: 'center',
                      letterSpacing: '0.02em',
                    }}
                  >
                    We read every message — usually back within two working days.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
