import type { CSSProperties } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import RippleSubmitButton from '@/components/contact/RippleSubmitButton'
import Section from '@/components/ui/Section'
import SectionLabelLine from '@/components/ui/SectionLabelLine'

// Previously local hex constants (SAGE/EMBER/FOREST/INK) — replaced with the
// real design tokens throughout this file. FOREST's value (#2d3a35) was
// actually --color-slate-dark, not --color-forest (#2D6A5A) — a naming
// collision with a different real token. INK's value (#1a1a1a) was a second,
// undocumented near-black; standardized to var(--color-ink) (#0f0f0f), the
// one used everywhere else on the site. See DESIGN.md.
const LINKEDIN = 'https://linkedin.com/company/pebbleaccelerator'

const eyebrowLabel: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'color-mix(in srgb, var(--color-ink) 55%, transparent)',
}

const fieldLabel: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'color-mix(in srgb, var(--color-ink) 55%, transparent)',
  marginBottom: '10px',
}

const QUALIFIERS = [
  { num: '01', lead: 'Founders', rest: ' building biomedical companies.' },
  { num: '02', lead: 'International teams', rest: ' entering Greater China.' },
  { num: '03', lead: 'Clinical & institutional partners', rest: ' seeking collaboration.' },
]

export default function ContactPage() {
  return (
    <Section
      first
      maxWidth="1280px"
      className="flex flex-1 flex-col justify-center"
      // Contact's original bottom padding was --space-2xl (fixed), not
      // Section's default --space-section-y (responsive clamp) — preserved
      // here rather than silently adopting the default.
      style={{ paddingBottom: 'var(--space-2xl)' }}
    >
      <FadeIn>
        <div className="contact-grid">
          {/* LEFT COLUMN: copy */}
          <div className="contact-left">
            {/* SectionLabelLine, not the hand-rolled ember-dot eyebrow this
                page used to have — matches the numbered-hairline pattern
                every other route's opening eyebrow already uses
                (PortfolioEditorial, Backers, SaltaGen, Services). Real,
                visible change: the ember dot is gone, replaced by "(01)"
                and a hairline that draws in on scroll. */}
            <SectionLabelLine index={1} marginBottom="28px">
              <span style={eyebrowLabel}>Contact</span>
            </SectionLabelLine>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(56px, 7vw, 88px)',
                fontWeight: 500,
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
                margin: '0 0 20px',
              }}
            >
              Let&rsquo;s{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--color-sage)' }}>talk.</span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                fontSize: '16px',
                lineHeight: 1.6,
                color: 'color-mix(in srgb, var(--color-ink) 75%, transparent)',
                margin: '0 0 32px',
                maxWidth: '420px',
              }}
            >
              If any of these describe you, we want to hear from you.
            </p>

            {/* Three qualifier items wrapped in a single flat container with
                a thin sage hairline border. Internal dividers between items
                use the same hairline; the container border handles the top
                and bottom edges, so no rules above item 1 or below item 3. */}
            <ol
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                border: '1px solid color-mix(in srgb, var(--color-sage) 28%, transparent)',
                borderRadius: '3px',
                background: 'transparent',
                width: '100%',
              }}
            >
              {QUALIFIERS.map((q, i) => (
                <li
                  key={q.num}
                  style={{
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'baseline',
                    padding: '22px 24px',
                    borderTop:
                      i === 0
                        ? 'none'
                        : '1px solid color-mix(in srgb, var(--color-sage) 28%, transparent)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      color: 'var(--color-ember)',
                      flexShrink: 0,
                      width: '28px',
                    }}
                  >
                    {q.num}
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                      fontSize: '17px',
                      lineHeight: 1.5,
                      color: 'var(--color-ink)',
                    }}
                  >
                    <span
                      className="font-display"
                      style={{
                        fontStyle: 'italic',
                        color: 'var(--color-sage)',
                        fontSize: '21px',
                      }}
                    >
                      {q.lead}
                    </span>
                    {q.rest}
                  </p>
                </li>
              ))}
            </ol>

            <div style={{ display: 'flex', gap: '56px', marginTop: '44px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ ...eyebrowLabel, marginBottom: '10px' }}>Email</p>
                <a
                  href="mailto:pebbleadmin@tigerjadecapital.com"
                  className="link-underline"
                  style={{
                    fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                    fontSize: '15px',
                    color: 'var(--color-ink)',
                    textDecoration: 'none',
                  }}
                >
                  pebbleadmin@tigerjadecapital.com
                </a>
              </div>
              <div>
                <p style={{ ...eyebrowLabel, marginBottom: '10px' }}>Elsewhere</p>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                  style={{
                    fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                    fontSize: '15px',
                    color: 'var(--color-ink)',
                    textDecoration: 'none',
                  }}
                >
                  LinkedIn &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: flat form on cream, no card */}
          <div className="contact-right">
            <p style={{ ...eyebrowLabel, marginBottom: '32px' }}>Send a message</p>

            <form action="mailto:pebbleadmin@tigerjadecapital.com" method="POST" noValidate>
              <div className="contact-field">
                <label htmlFor="contact-name" style={fieldLabel}>
                  Full name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  placeholder="Jane Chan"
                  className="contact-input"
                />
              </div>

              <div className="contact-field-row">
                <div className="contact-field">
                  <label htmlFor="contact-company" style={fieldLabel}>
                    Company
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    placeholder="OncoBridge"
                    className="contact-input"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email" style={fieldLabel}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="jane@company.com"
                    className="contact-input"
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message" style={fieldLabel}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us what you're building, and how we can help."
                  className="contact-input contact-input--textarea"
                />
              </div>

              <RippleSubmitButton />

              <p className="contact-footnote">
                We read every message, usually back within two working days.
              </p>
            </form>
          </div>
        </div>
      </FadeIn>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          row-gap: 56px;
          width: 100%;
        }
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: minmax(0, 46%) minmax(0, 1fr);
            column-gap: 72px;
            row-gap: 0;
            align-items: start;
          }
          .contact-right {
            /* Drop the form so its first label sits at the headline cap-height row. */
            padding-top: 60px;
          }
        }

        .contact-left, .contact-right { min-width: 0; }

        .contact-field {
          margin-bottom: 36px;
          min-width: 0;
        }
        .contact-field-row {
          display: grid;
          grid-template-columns: 1fr;
          column-gap: 32px;
          margin-bottom: 0;
        }
        @media (min-width: 640px) {
          .contact-field-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .contact-input {
          display: block;
          width: 100%;
          font-family: var(--font-ibm-plex-sans), system-ui, sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          color: var(--color-ink);
          background: transparent;
          border: 0;
          border-bottom: 1px solid color-mix(in srgb, var(--color-sage) 40%, transparent);
          border-radius: 0;
          padding: 8px 0 12px;
          outline: none;
          transition: border-color 240ms ease, box-shadow 240ms ease;
          box-sizing: border-box;
        }
        .contact-input::placeholder {
          color: color-mix(in srgb, var(--color-ink) 35%, transparent);
        }
        .contact-input:hover {
          border-bottom-color: color-mix(in srgb, var(--color-slate-dark) 50%, transparent);
        }
        .contact-input:focus {
          border-bottom-color: var(--color-slate-dark);
          box-shadow: 0 1px 0 0 var(--color-slate-dark);
        }
        .contact-input--textarea {
          min-height: 140px;
          resize: vertical;
          padding-top: 10px;
        }

        .contact-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 12px;
          padding: 14px 28px;
          font-family: var(--font-ibm-plex-sans), system-ui, sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-canvas);
          background: var(--color-slate-dark);
          border: 0;
          border-radius: 2px;
          cursor: pointer;
          transition: background-color 240ms ease, transform 100ms ease;
        }
        .contact-submit:hover {
          /* Darkened slate for the hover state. #1f2a26 is a hand-picked shade,
             not yet a token — the same value is independently used in
             CompanyCard.tsx's hover state. Candidate for its own token
             (--color-slate-hover?) when color consolidation (DESIGN.md task #8)
             sweeps hover states. */
          background: #1f2a26;
        }
        .contact-submit:active {
          transform: translateY(1px);
        }
        .contact-submit:focus-visible {
          outline: 2px solid var(--color-sage);
          outline-offset: 3px;
        }

        .contact-footnote {
          margin: 18px 0 0;
          font-family: var(--font-ibm-plex-sans), system-ui, sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: color-mix(in srgb, var(--color-ink) 60%, transparent);
          line-height: 1.55;
        }
      `}</style>
    </Section>
  )
}
