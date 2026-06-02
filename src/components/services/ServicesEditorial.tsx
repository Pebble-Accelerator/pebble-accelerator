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
          margin: '0 0 16px',
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
      <section style={{ paddingTop: 'clamp(100px, 28vh, 300px)', paddingBottom: 0 }}>
        <div
          className="services-editorial-hero"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px 5%',
            marginBottom: 'clamp(88px, 12vh, 160px)',
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
            flexDirection: 'column',
            gap: 'clamp(32px, 4vw, 56px)',
            alignItems: 'stretch',
            width: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              backgroundColor: '#2d3a35',
              borderRadius: '8px',
              padding: 'clamp(48px, 5vw, 56px)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#E8703A',
                margin: '0 0 36px',
              }}
            >
              INVESTMENT + 12 MONTHS ALONGSIDE
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: 500,
                lineHeight: 1.15,
                color: '#f5efe4',
                margin: '0 0 32px',
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
                margin: '0 0 40px',
              }}
            >
              Capital is the door — the year that follows is the work. We help structure HK government
              grants, open hospital and university access, run regulatory pathways, and warm the next
              round well before you raise it. Plugged into Tigermed&apos;s CRO ecosystem from day one.
            </p>
            <div
              style={{
                borderTop: '1px solid rgba(245, 239, 228, 0.15)',
                marginTop: '8px',
                paddingTop: '48px',
              }}
            >
              <div
                className="services-timeline-row"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '40px clamp(40px, 6vw, 72px)',
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
              width: '100%',
              backgroundColor: '#e8e0d0',
              border: '1px solid #d4cfc2',
              borderRadius: '8px',
              padding: 'clamp(48px, 5vw, 56px)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p style={{ ...labelStyle, marginBottom: '28px' }}>CONSULTING</p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(30px, 3.2vw, 44px)',
                fontWeight: 500,
                lineHeight: 1.2,
                color: '#1a1a1a',
                margin: '0 0 28px',
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
                margin: 0,
              }}
            >
              On retainer, we run market entry, HK grant applications, hospital access, and partner
              introductions — for companies we&apos;d back if our mandate fit. Same operators, same
              network.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
