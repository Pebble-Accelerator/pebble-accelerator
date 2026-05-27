'use client'

import Image from 'next/image' // TODO: replace saltagenlogo.jpg with a transparent PNG or cream-fill SVG at /public/logos/saltagen-cream.{png,svg} when available
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
    content: (
      <>
        Founded 2017. Based in Hong Kong, deal flow across <em>APAC and North America</em>.
      </>
    ),
  },
  {
    number: '02',
    content: (
      <>
        Pebble <em>sources and accelerates</em>. SaltaGen brings follow-on capital and global reach.
      </>
    ),
  },
  {
    number: '03',
    content: (
      <>
        A <em>Domain Partner</em> shared between firms — same operators, same network.
      </>
    ),
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
        boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
        background: '#2d3a35',
        overflow: 'hidden',
        marginLeft: withBand ? 'auto' : 'auto',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(245,239,228,0.5)',
          zIndex: 2,
        }}
      >
        SaltaGen · Est. 2017
      </span>

      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 2,
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
            color: 'rgba(245,239,228,0.65)',
          }}
        >
          Affiliated Partner
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12%',
          boxSizing: 'border-box',
        }}
      >
        {!logoMissing ? (
          <Image
            src="/images/saltagenlogo.jpg"
            alt="SaltaGen Ventures"
            width={SALTAGEN_LOGO_WIDTH}
            height={SALTAGEN_LOGO_HEIGHT}
            quality={100}
            style={{
              width: '72%',
              height: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              filter: 'invert(1) brightness(0.95)',
              opacity: 0.92,
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
              color: '#f5efe4',
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
                      color: '#2d3a35',
                    }}
                  >
                    Our sister fund.
                  </span>
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                    fontSize: withBand ? '13px' : embedded ? '14px' : '15px',
                    fontWeight: 300,
                    color: '#1a1a1a',
                    lineHeight: withBand ? 1.55 : embedded ? 1.6 : 1.75,
                    maxWidth: withBand ? 'none' : '460px',
                    margin: `0 0 ${withBand ? '12px' : embedded ? '18px' : '32px'}`,
                    flexShrink: 0,
                  }}
                >
                  SaltaGen is an early-stage venture firm founded in 2017, focused on deep biotech across
                  North America and Asia. Pebble works alongside SaltaGen as its Hong Kong scout and
                  accelerator — sourcing university spin-outs, accelerating them through their first year,
                  and warming them for SaltaGen and other institutional capital.
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
                          color: '#888',
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
                          fontSize: withBand ? '13px' : embedded ? '14px' : '15px',
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
