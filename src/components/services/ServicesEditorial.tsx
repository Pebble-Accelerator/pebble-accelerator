'use client'

import { fadeUpStyle, useFadeUpReveal } from '@/components/ui/useFadeUpReveal'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#888',
}

const consultingPills = [
  'MARKET ENTRY',
  'HK GRANTS',
  'HOSPITAL ACCESS',
  'BD INTROS',
  'TIGERMED CRO',
]

function TimelineCol({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div style={{ flex: '1 1 0', minWidth: '140px' }}>
      <p
        style={{
          fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#E8703A',
          margin: '0 0 12px',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          fontSize: '14px',
          lineHeight: 1.55,
          color: 'rgba(245, 239, 228, 0.92)',
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  )
}

export default function ServicesEditorial() {
  const { ref: revealRef, revealed, reduced } = useFadeUpReveal()

  return (
    <div
      ref={revealRef}
      style={{
        paddingTop: '60px',
        paddingLeft: '5vw',
        paddingRight: '5vw',
        maxWidth: '1400px',
        margin: '0 auto',
        paddingBottom: '80px',
      }}
    >
      <section style={{ padding: '80px 0 64px' }}>
        <p style={{ ...labelStyle, marginBottom: '32px' }}>SERVICES · 04</p>

        <div
          className="services-editorial-hero"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px 5%',
            marginBottom: '72px',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flex: '1 1 45%', minWidth: '280px' }}>
            <h1
              style={{
                ...fadeUpStyle(revealed, reduced, 0),
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(48px, 5.5vw, 80px)',
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              <span style={{ color: '#1a1a1a' }}>No cohorts.</span>
              <br />
              <span style={{ fontStyle: 'italic', color: '#2d3a35' }}>Every company,</span>
              <br />
              <span style={{ fontStyle: 'italic', color: '#2d3a35' }}>one-on-one.</span>
            </h1>
          </div>
          <div style={{ flex: '1 1 40%', minWidth: '260px' }}>
            <p
              style={{
                ...fadeUpStyle(revealed, reduced, 150),
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: 1.65,
                color: '#1a1a1a',
                maxWidth: '480px',
                margin: 0,
              }}
            >
              The needs of every biomedical company are vastly different. Pebble works closely with
              each company for a full year — making sure key milestones and deliverables are actually
              hit, often through the support of{' '}
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontStyle: 'italic',
                }}
              >
                Tigermed&apos;s ecosystem
              </span>
              .
            </p>
          </div>
        </div>

        <div
          className="services-cards-row"
          style={{
            ...fadeUpStyle(revealed, reduced, 300),
            display: 'flex',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              flex: '1 1 58%',
              minWidth: 0,
              backgroundColor: '#2d3a35',
              borderRadius: '8px',
              padding: '48px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '28px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#E8703A',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#E8703A',
                }}
              >
                ★ PRIMARY · INVESTMENT + 12 MONTHS ALONGSIDE
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(32px, 3.5vw, 48px)',
                fontWeight: 500,
                lineHeight: 1.15,
                color: '#f5efe4',
                margin: '0 0 24px',
                maxWidth: '520px',
              }}
            >
              We write the{' '}
              <span style={{ fontStyle: 'italic' }}>first cheque</span>, then stay close for a year.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                fontSize: '15px',
                lineHeight: 1.65,
                color: 'rgba(245, 239, 228, 0.85)',
                maxWidth: '560px',
                margin: '0 0 32px',
              }}
            >
              Capital is the door — the year that follows is the work. We help structure HK government
              grants, open hospital and university access, run regulatory pathways, and warm the next
              round well before you raise it. Plugged into Tigermed&apos;s CRO ecosystem from day one.
            </p>
            <div
              style={{
                borderTop: '1px solid rgba(245, 239, 228, 0.15)',
                paddingTop: '28px',
              }}
            >
              <div
                className="services-timeline-row"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '28px 32px',
                }}
              >
                <TimelineCol label="MONTH 01">
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontStyle: 'italic',
                    }}
                  >
                    Plan
                  </span>{' '}
                  set. Milestones agreed.
                </TimelineCol>
                <TimelineCol label="MID-YEAR">
                  First{' '}
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontStyle: 'italic',
                    }}
                  >
                    clinical pilot
                  </span>{' '}
                  or partnership live.
                </TimelineCol>
                <TimelineCol label="MONTH 12">
                  Next round{' '}
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontStyle: 'italic',
                    }}
                  >
                    warm
                  </span>
                  , data in hand.
                </TimelineCol>
              </div>
            </div>
          </div>

          <div
            style={{
              flex: '1 1 42%',
              minWidth: 0,
              backgroundColor: '#e8e0d0',
              border: '1px solid #d4cfc2',
              borderRadius: '8px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p style={{ ...labelStyle, marginBottom: '20px' }}>SECONDARY · CONSULTING</p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(26px, 2.8vw, 36px)',
                fontWeight: 500,
                lineHeight: 1.2,
                color: '#1a1a1a',
                margin: '0 0 20px',
              }}
            >
              For companies beyond our investment scope, the{' '}
              <span style={{ fontStyle: 'italic', color: '#2d3a35' }}>same door.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                fontSize: '15px',
                lineHeight: 1.65,
                color: '#1a1a1a',
                margin: '0 0 28px',
              }}
            >
              On retainer, we run market entry, HK grant applications, hospital access, and partner
              introductions — for companies we&apos;d back if our mandate fit. Same operators, same
              network.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: 'auto',
              }}
            >
              {consultingPills.map((pill) => (
                <span
                  key={pill}
                  style={{
                    fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#1a1a1a',
                    padding: '5px 14px',
                    borderRadius: '999px',
                    border: '1px solid #d4cfc2',
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 900px) {
          .services-cards-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
