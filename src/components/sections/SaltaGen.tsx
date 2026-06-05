'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Backers from '@/components/sections/Backers'
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
]

function SaltaGenVisual({ embedded, withBand }: { embedded: boolean; withBand: boolean }) {
  const [logoMissing, setLogoMissing] = useState(false)

  return (
    <div
      className="saltagen-embedded-logo"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: withBand ? 'min(100%, 440px)' : embedded ? 'min(440px, 100%)' : '480px',
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
            transform: 'translate(0, -1.5%)',
          }}
          onError={() => setLogoMissing(true)}
        />
      ) : (
        <span
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '48px',
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
  const withBand = embedded

  const contentRailStyle = {
    width: '100%',
    maxWidth: '1280px',
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
        marginTop: withBand ? '12px' : embedded ? '18px' : '32px',
        fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#1a1a1a',
        textDecoration: 'none',
        transition: 'color 150ms ease',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#5e7a6a'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#1a1a1a'
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
              paddingTop: '60px',
              paddingLeft: 0,
              paddingRight: 0,
              paddingBottom: 0,
              display: 'flex',
              flexDirection: 'column',
            }
          : {
              padding: '120px 8vw',
              display: 'block',
            }),
      }}
    >
      <div
        className={embedded ? 'saltagen-embedded-shell' : undefined}
        style={{
          ...(embedded
            ? {
                flex: 1,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '8vw',
                paddingRight: '8vw',
                width: '100%',
                boxSizing: 'border-box',
              }
            : {}),
        }}
      >
        <div
          className={embedded ? 'saltagen-embedded-main' : undefined}
          style={
            embedded
              ? {
                  flex: '1 1 auto',
                  minHeight: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  boxSizing: 'border-box',
                  paddingBottom: '32px',
                }
              : undefined
          }
        >
          <FadeIn>
            <div
              className={withBand ? 'saltagen-embedded-grid' : undefined}
              style={{
                ...contentRailStyle,
                display: 'grid',
                gridTemplateColumns: withBand
                  ? 'minmax(0, 1fr) minmax(0, 1fr)'
                  : 'minmax(0, 45%) minmax(0, 55%)',
                columnGap: withBand ? 'clamp(40px, 5vw, 72px)' : 'clamp(20px, 3.5vw, 48px)',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div
                className={withBand ? 'saltagen-embedded-copy' : undefined}
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
                    marginBottom: withBand ? '10px' : embedded ? '14px' : '28px',
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
                    fontSize: withBand
                      ? 'clamp(22px, 2.4vw, 34px)'
                      : embedded
                        ? 'clamp(24px, 2.6vw, 36px)'
                        : 'clamp(32px, 3.5vw, 48px)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.02em',
                    color: '#1a1a1a',
                    margin: `0 0 ${withBand ? '10px' : embedded ? '14px' : '24px'}`,
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
                    fontSize: withBand ? '16px' : embedded ? '16px' : '17px',
                    fontWeight: 300,
                    color: '#1a1a1a',
                    lineHeight: 1.6,
                    maxWidth: withBand ? 'none' : '460px',
                    margin: `0 0 ${withBand ? '20px' : embedded ? '22px' : '28px'}`,
                    flexShrink: 0,
                  }}
                >
                  An early-stage firm backing science and technology startups, run by operators on both
                  sides of the Pacific.
                </p>

                <div style={{ maxWidth: withBand ? 'none' : '520px', flexShrink: 0, width: '100%' }}>
                  {bullets.map((item, i) => (
                    <div
                      key={item.number}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                        marginTop: i > 0 ? '14px' : 0,
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
                          fontSize: withBand ? '16px' : embedded ? '16px' : '17px',
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

                {!withBand && visitLink}
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
                <SaltaGenVisual embedded={embedded} withBand={withBand} />
              </div>

              {withBand && visitLink}
            </div>
          </FadeIn>
        </div>

        {withBand && (
          <>
            <div
              className="saltagen-embedded-divider"
              style={{ ...contentRailStyle, borderTop: '1px solid #d4cfc2', flexShrink: 0 }}
            />
            <div
              className="saltagen-embedded-band"
              style={{
                flex: '0 0 auto',
                minHeight: 0,
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                flexShrink: 0,
                boxSizing: 'border-box',
                paddingTop: '36px',
                paddingBottom: '32px',
              }}
            >
              <Backers variant="band" />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
