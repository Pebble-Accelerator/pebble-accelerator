'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import FadeIn from '@/components/ui/FadeIn'

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
        justifyContent: 'center',
        width: '100%',
        // Demoted: logo reads as a supporting visual, not the headline of the area.
        maxWidth: 'min(100%, 240px)',
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
        color: '#2d3a35',
        textDecoration: 'none',
        transition: 'color 150ms ease',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#5e7a6a'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#2d3a35'
      }}
    >
      <span>Visit Saltagen.com</span>
      <span aria-hidden>→</span>
    </Link>
  )

  return (
    <section
      className={embedded ? 'saltagen-section--embedded' : undefined}
      style={{
        background: '#f5efe4',
        width: '100%',
        boxSizing: 'border-box',
        ...(embedded
          ? {
              height: '100vh',
              maxHeight: '100vh',
              overflow: 'hidden',
              padding: '60px 8vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
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
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 55%) minmax(0, 45%)',
            columnGap: 'clamp(32px, 4vw, 64px)',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div
            className="saltagen-embedded-copy"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: 0,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: embedded ? '14px' : '28px',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#E8703A',
                  flexShrink: 0,
                }}
                aria-hidden
              />
              <span
                style={{
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#888',
                }}
              >
                Affiliated · Strategic Partner
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: embedded ? 'clamp(28px, 3vw, 42px)' : 'clamp(32px, 3.5vw, 48px)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                color: '#1a1a1a',
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
                  color: '#5e7a6a',
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
                color: '#1a1a1a',
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
                      color: '#E8703A',
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
                      color: '#1a1a1a',
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 0,
              minWidth: 0,
              width: '100%',
            }}
          >
            <SaltaGenVisual />
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
