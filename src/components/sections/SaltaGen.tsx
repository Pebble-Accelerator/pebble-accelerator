'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import SectionLabelLine from '@/components/ui/SectionLabelLine'
import SectionRipple from '@/components/ui/SectionRipple'

type SaltaGenProps = {
  embedded?: boolean
}

const SALTAGEN_LOGO_WIDTH = 916
const SALTAGEN_LOGO_HEIGHT = 515

const bullets = [
  { number: '01', content: 'Founded October 2017.' },
  { number: '02', content: 'Bioscience, biomedical, AI/ML, media, edtech.' },
  { number: '03', content: 'Backs defensible, patentable technology.' },
  { number: '04', content: 'A venture-scaling conduit into Asia.' },
  { number: '05', content: 'A streamlined next step for Pebble graduates, not guaranteed.' },
]

function SaltaGenVisual() {
  const [logoMissing, setLogoMissing] = useState(false)

  return (
    <div
      className="saltagen-embedded-logo"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'safe center',
        width: '100%',
        // Demoted: logo reads as a supporting visual, not the headline of the area.
        maxWidth: 'min(100%, 280px)',
      }}
    >
      {/* Light chip so the (dark) wordmark stays legible on the dark ground —
          the Backers dark-chip treatment, inverted for a dark section. */}
      <div
        style={{
          background: 'var(--color-canvas)',
          borderRadius: '10px',
          border: '1px solid rgba(45, 58, 53, 0.14)',
          padding: 'clamp(22px, 3vw, 34px)',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'safe center',
        }}
      >
        {!logoMissing ? (
          <Image
            src="/logos/saltagen-ventures_logo-2.png"
            alt="Saltagen Ventures"
            width={SALTAGEN_LOGO_WIDTH}
            height={SALTAGEN_LOGO_HEIGHT}
            quality={100}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
            onError={() => setLogoMissing(true)}
          />
        ) : (
          <span
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '32px',
              fontStyle: 'italic',
              fontWeight: 500,
              color: '#1a1a1a',
              lineHeight: 1,
            }}
          >
            Saltagen
          </span>
        )}
      </div>
    </div>
  )
}

export default function SaltaGen({ embedded = false }: SaltaGenProps) {
  const contentRailStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto' as const,
    boxSizing: 'border-box' as const,
  }

  const visitLink = (
    <Link
      href="https://www.saltagen.com"
      target="_blank"
      rel="noopener noreferrer"
      className="link-underline saltagen-embedded-visit"
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '4px',
        marginTop: embedded ? '20px' : '32px',
        fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(245, 240, 232, 0.72)',
        textDecoration: 'none',
        transition: 'color 250ms ease',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#a9c7b6'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'rgba(245, 240, 232, 0.72)'
      }}
    >
      <span>Visit Saltagen.com</span>
      <span aria-hidden>→</span>
    </Link>
  )

  return (
    <section
      className={
        embedded ? 'saltagen-section--embedded saltagen-section--dark' : undefined
      }
      style={{
        // Dark ground — carries the hero's dark language through (alternates the
        // homepage light/dark instead of running flat cream).
        background: 'var(--color-slate-dark)',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
        ...(embedded
          ? {
              height: '100vh',
              maxHeight: '100vh',
              overflow: 'hidden',
              // 8vw gutter (wider than the 5vw standard) is deliberate for the split.
              padding: 'var(--space-page-top) 8vw var(--space-section-y)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'safe center',
            }
          : {
              padding: '120px 8vw',
              display: 'block',
            }),
      }}
    >
      <FadeIn>
        <div
          className="saltagen-embedded-grid"
          style={{
            ...contentRailStyle,
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            // Two-column split with the copy (and its right-aligned headline) on the
            // RIGHT and the logo on the LEFT — a distinct composition from the
            // neighbouring slides.
            gridTemplateColumns: 'minmax(0, 45%) minmax(0, 55%)',
            columnGap: 'clamp(32px, 4vw, 64px)',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div
            className="saltagen-embedded-copy"
            style={{
              order: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'safe center',
              minHeight: 0,
              minWidth: 0,
            }}
          >
            <SectionLabelLine index={5} tone="dark" marginBottom={embedded ? '14px' : '28px'}>
              <span
                style={{
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(245, 240, 232, 0.62)',
                  flexShrink: 0,
                }}
              >
                Affiliated · Strategic Partner
              </span>
            </SectionLabelLine>

            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: embedded ? 'clamp(28px, 3vw, 42px)' : 'clamp(32px, 3.5vw, 48px)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                color: '#f7f3ec',
                // Right-aligned headline — the distinguishing move of this two-column slide.
                textAlign: 'right',
                margin: `0 0 ${embedded ? '16px' : '24px'}`,
                flexShrink: 0,
              }}
            >
              <span style={{ fontWeight: 400 }}>Saltagen Ventures.</span>
              <br />
              <span
                style={{
                  fontWeight: 500,
                  fontStyle: 'italic',
                  color: '#a9c7b6',
                }}
              >
                Our sister fund.
              </span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                fontSize: embedded ? '16px' : '17px',
                fontWeight: 300,
                color: 'rgba(245, 240, 232, 0.82)',
                lineHeight: 1.6,
                maxWidth: '520px',
                margin: `0 0 ${embedded ? '22px' : '28px'}`,
                flexShrink: 0,
              }}
            >
              An early-stage firm backing science and technology startups, run by operators on both
              sides of the Pacific.
            </p>

            <div style={{ maxWidth: '560px', flexShrink: 0, width: '100%' }}>
              {bullets.map((item, i) => (
                <div
                  key={item.number}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    marginTop: i > 0 ? '12px' : 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                      fontSize: '11px',
                      // Lifted ember for AA legibility on the dark ground.
                      color: '#F2915E',
                      letterSpacing: '0.08em',
                      flexShrink: 0,
                      paddingTop: '2px',
                    }}
                  >
                    {item.number}
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                      fontSize: embedded ? '15px' : '17px',
                      fontWeight: 300,
                      color: 'rgba(245, 240, 232, 0.82)',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.content}
                  </p>
                </div>
              ))}
            </div>

            {visitLink}
          </div>

          <div
            style={{
              order: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'safe center',
              minHeight: 0,
              minWidth: 0,
              width: '100%',
            }}
          >
            {embedded && (
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 'clamp(360px, 46vh, 560px)',
                  aspectRatio: '1',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                {/* Reference ripple: radiates from the CENTRE of the logo card, making
                    the sister fund the visible point of impact. */}
                <SectionRipple seed="saltagen" color="rgba(245, 240, 232, 0.11)" />
              </div>
            )}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'safe center',
              }}
            >
              <SaltaGenVisual />
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
