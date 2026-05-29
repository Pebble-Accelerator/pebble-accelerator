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
  {
    number: '01',
    content:
      'Founded October 2017. Cross-Pacific deal flow between North America and Asia.',
  },
  {
    number: '02',
    content: 'Verticals: bioscience, biomedical, AI/ML, media, education tech.',
  },
  {
    number: '03',
    content: 'Looks for defensibility and patentable technology.',
  },
  {
    number: '04',
    content: 'A working venture-scaling conduit across the Pacific into Asia.',
  },
]

function SaltaGenVisual({ embedded, withBand }: { embedded: boolean; withBand: boolean }) {
  const [logoMissing, setLogoMissing] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: withBand
          ? 'min(100%, 360px)'
          : embedded
            ? 'min(360px, 100%)'
            : '420px',
        height: withBand ? 'auto' : embedded ? 'min(calc(100vh - 108px), 420px)' : undefined,
        maxHeight: withBand ? 'min(380px, 100%)' : embedded ? 'calc(100vh - 108px)' : undefined,
        aspectRatio: '4 / 5',
        borderRadius: '12px',
        border: '1px solid #d4cfc2',
        background: 'transparent',
        overflow: 'hidden',
        marginLeft: withBand ? 'auto' : 'auto',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4%',
          boxSizing: 'border-box',
        }}
      >
        {!logoMissing ? (
          <Image
            // saltagen-ventures_logo-2.png — white bg on cream card, used as-is (no filter).
            // TODO: swap for a transparent-background PNG/SVG to remove the white rectangle.
            src="/logos/saltagen-ventures_logo-2.png"
            alt="SaltaGen Ventures"
            width={SALTAGEN_LOGO_WIDTH}
            height={SALTAGEN_LOGO_HEIGHT}
            quality={100}
            style={{
              width: '92%',
              height: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
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
            SaltaGen
          </span>
        )}
      </div>
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

  return (
    <section
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
          style={
            embedded
              ? {
                  flex: '1 1 74%',
                  minHeight: 0,
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  boxSizing: 'border-box',
                }
              : undefined
          }
        >
          <FadeIn>
            <div
              style={{
                ...contentRailStyle,
                display: 'grid',
                gridTemplateColumns: withBand
                  ? '45% 40%'
                  : 'minmax(0, 45%) minmax(0, 55%)',
                ...(withBand
                  ? { justifyContent: 'space-between' as const }
                  : { columnGap: 'clamp(20px, 3.5vw, 48px)' }),
                alignItems: 'center',
                height: withBand ? '100%' : undefined,
              }}
            >
              <div
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
                  <span style={{ fontWeight: 400 }}>SaltaGen Ventures.</span>
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
                    fontSize: withBand ? '17px' : embedded ? '17px' : '18px',
                    fontWeight: 300,
                    color: '#1a1a1a',
                    lineHeight: withBand ? 1.55 : embedded ? 1.6 : 1.75,
                    maxWidth: withBand ? 'none' : '460px',
                    margin: `0 0 ${withBand ? '12px' : embedded ? '18px' : '32px'}`,
                    flexShrink: 0,
                  }}
                >
                  Founded in October 2017, SaltaGen Ventures is an early-stage venture firm investing in
                  science- and technology-based startups across bioscience, biomedical, AI & machine
                  learning, media and education tech — run by operators with decades on both sides of the
                  Pacific.
                </p>

                <div style={{ maxWidth: withBand ? 'none' : '520px', flexShrink: 0, width: '100%' }}>
                  {bullets.map((item, i) => (
                    <div
                      key={item.number}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                        padding: i === 0 ? '0 0 8px' : '8px 0',
                        borderTop: i > 0 ? '1px solid #d4cfc2' : 'none',
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

                <Link
                  href="https://www.saltagen.com"
                  target="_blank"
                  rel="noopener noreferrer"
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
                    const underline = e.currentTarget.querySelector(
                      '[data-underline]'
                    ) as HTMLElement | null
                    if (underline) underline.style.borderBottomColor = '#5e7a6a'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#1a1a1a'
                    const underline = e.currentTarget.querySelector(
                      '[data-underline]'
                    ) as HTMLElement | null
                    if (underline) underline.style.borderBottomColor = '#1a1a1a'
                  }}
                >
                  <span
                    data-underline
                    style={{
                      borderBottom: '1px solid #1a1a1a',
                      paddingBottom: '2px',
                      transition: 'border-color 150ms ease',
                    }}
                  >
                    Visit saltagen.com
                  </span>
                  <span aria-hidden>→</span>
                </Link>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  minHeight: 0,
                  minWidth: 0,
                }}
              >
                <SaltaGenVisual embedded={embedded} withBand={withBand} />
              </div>
            </div>
          </FadeIn>
        </div>

        {withBand && (
          <>
            <div style={{ ...contentRailStyle, borderTop: '1px solid #d4cfc2', flexShrink: 0 }} />
            <div
              style={{
                flex: '0 0 26%',
                minHeight: 0,
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                flexShrink: 0,
                boxSizing: 'border-box',
              paddingTop: '28px',
              paddingBottom: '28px',
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
