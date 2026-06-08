import type { CSSProperties } from 'react'
import FadeIn from '@/components/ui/FadeIn'

const SAGE = '#5e7a6a'
const EMBER = '#E8703A'
const FOREST = '#2d3a35'
const INK = '#1a1a1a'
const LINKEDIN = 'https://linkedin.com/company/pebbleaccelerator'

const eyebrowLabel: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(26,26,26,0.55)',
}

const fieldLabel: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(26,26,26,0.55)',
  marginBottom: '10px',
}

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
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <FadeIn>
          <div className="contact-grid">
            {/* LEFT COLUMN: copy */}
            <div className="contact-left">
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
                <span style={eyebrowLabel}>Contact</span>
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
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
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
                        fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                        fontSize: '12px',
                        fontWeight: 500,
                        letterSpacing: '0.12em',
                        color: EMBER,
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
                        color: INK,
                      }}
                    >
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

              <div style={{ display: 'flex', gap: '56px', marginTop: '44px', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ ...eyebrowLabel, marginBottom: '10px' }}>Email</p>
                  <a
                    href="mailto:pebbleadmin@tigerjadecapital.com"
                    className="link-underline"
                    style={{
                      fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                      fontSize: '15px',
                      color: INK,
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
                      color: INK,
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

                <button type="submit" className="contact-submit">
                  Send message
                  <span aria-hidden style={{ marginLeft: '8px' }}>
                    &rarr;
                  </span>
                </button>

                <p className="contact-footnote">
                  We read every message, usually back within two working days.
                </p>
              </form>
            </div>
          </div>
        </FadeIn>
      </div>

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
          color: ${INK};
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(94, 122, 106, 0.4);
          border-radius: 0;
          padding: 8px 0 12px;
          outline: none;
          transition: border-color 180ms ease, box-shadow 180ms ease;
          box-sizing: border-box;
        }
        .contact-input::placeholder {
          color: rgba(26, 26, 26, 0.35);
        }
        .contact-input:hover {
          border-bottom-color: rgba(45, 58, 53, 0.5);
        }
        .contact-input:focus {
          border-bottom-color: ${FOREST};
          box-shadow: 0 1px 0 0 ${FOREST};
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
          color: #f5efe4;
          background: ${FOREST};
          border: 0;
          border-radius: 2px;
          cursor: pointer;
          transition: background-color 160ms ease, transform 100ms ease;
        }
        .contact-submit:hover {
          background: #1f2a26;
        }
        .contact-submit:active {
          transform: translateY(1px);
        }
        .contact-submit:focus-visible {
          outline: 2px solid ${SAGE};
          outline-offset: 3px;
        }

        .contact-footnote {
          margin: 18px 0 0;
          font-family: var(--font-ibm-plex-sans), system-ui, sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(26, 26, 26, 0.6);
          line-height: 1.55;
        }
      `}</style>
    </div>
  )
}
