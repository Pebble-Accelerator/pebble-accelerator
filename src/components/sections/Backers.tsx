import Link from 'next/link'
import type { CSSProperties } from 'react'
import backers from '@/data/backers'

const LOGO_BY_NAME: Record<string, string> = {
  'Tiger Med Group': '/logos/tigermed.png',
  'Tiger Jade Capital': '/logos/TigerJade.png?v=3',
  'Nan Fung Group': '/logos/Nanfung.png',
  Morningside: '/logos/morningside.svg?v=2',
  'HK Cocoon': '/logos/Cocoon.jpeg',
  'THF Enterprises': '/logos/THFEnterprises.png',
}

type BackerLogoTreatment = 'default' | 'multiply' | 'dark-chip'

/** Per-asset visibility: default = color on cream; multiply = white baked box; dark-chip = light mark on a dark chip (logo treatment, not decoration). */
const BACKER_LOGO_TREATMENT: Record<string, BackerLogoTreatment> = {
  'Tiger Med Group': 'default',
  'Tiger Jade Capital': 'dark-chip',
  'Nan Fung Group': 'default',
  Morningside: 'default',
  'HK Cocoon': 'multiply',
  'THF Enterprises': 'multiply',
}

type BackersProps = {
  /** Use the slide-shaped 100vh layout. The home page renders <Backers embedded /> as its own slide. */
  embedded?: boolean
}

/** Uniform bounding box for the logo area in each cell (every logo reads with equal weight regardless of native aspect). */
const LOGO_BOX_HEIGHT = 64
const NAKED_LOGO_MAX_HEIGHT = 64
const NAKED_LOGO_MAX_WIDTH = 190
const CHIP_INNER_LOGO_MAX_HEIGHT = 42
const CHIP_INNER_LOGO_MAX_WIDTH = 144

const darkChipStyle: CSSProperties = {
  background: '#1a1a1a',
  borderRadius: '6px',
  padding: '8px 14px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}

function backerLogoImg(b: (typeof backers)[number], src: string, treatment: BackerLogoTreatment) {
  const isChip = treatment === 'dark-chip'
  const imgStyle: CSSProperties = {
    maxHeight: isChip ? `${CHIP_INNER_LOGO_MAX_HEIGHT}px` : `${NAKED_LOGO_MAX_HEIGHT}px`,
    maxWidth: isChip ? `${CHIP_INNER_LOGO_MAX_WIDTH}px` : `${NAKED_LOGO_MAX_WIDTH}px`,
    height: 'auto',
    width: 'auto',
    objectFit: 'contain',
    display: 'block',
    ...(treatment === 'multiply' ? { mixBlendMode: 'multiply' } : {}),
  }
  return <img className="backer-logo-img" src={src} alt={b.name} style={imgStyle} />
}

export default function Backers({ embedded = false }: BackersProps) {
  const renderCell = (b: (typeof backers)[number]) => {
    const src = LOGO_BY_NAME[b.name]
    const treatment = BACKER_LOGO_TREATMENT[b.name] ?? 'default'
    const logoNode = backerLogoImg(b, src, treatment)
    return (
      <a
        key={b.name}
        href={b.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${b.name}, ${b.region}`}
        className="backer-cell"
      >
        <div className="backer-cell__logobox">
          {treatment === 'dark-chip' ? <div style={darkChipStyle}>{logoNode}</div> : logoNode}
        </div>
        <div className="backer-cell__divider" aria-hidden />
        <div className="backer-cell__region">{b.region}</div>
      </a>
    )
  }

  const sectionStyle: CSSProperties = embedded
    ? {
        background: '#f5efe4',
        width: '100%',
        height: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden',
        // Top reserve matches the hero / GBA slides so the eyebrow clears the fixed 64px nav.
        padding: 'clamp(112px, 14vh, 144px) 5vw clamp(48px, 6vh, 80px)',
      }
    : {
        background: '#f5efe4',
        width: '100%',
        padding: '96px 5vw',
        boxSizing: 'border-box',
      }

  return (
    <section className="backers-section backers-section--embedded" style={sectionStyle}>
      <div
        className="backers-shell"
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          flex: embedded ? 1 : undefined,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'clamp(32px, 4vh, 56px)',
        }}
      >
        {/* Header: eyebrow spans both cols, then headline (col 1) + lede (col 2)
            sit as peers in row 2. Top-aligned so the lede starts at the same Y
            as the headline's first line, removing the prior "floating low" dead space. */}
        <div className="backers-header">
          <div className="backers-eyebrow">
            <span className="backers-eyebrow-dot" aria-hidden />
            <span className="backers-eyebrow-label">Our partners</span>
          </div>
          <h2 className="backers-headline">
            Backed by leaders in medicine, capital, and industry.
          </h2>
          <p className="backers-lede">
            Pebble is supported by a network of strategic investors and institutions across Greater
            China and beyond.
          </p>
        </div>

        {/* Grid: 3 desktop, 2 mobile; logo + region only */}
        <div className="backers-grid">{backers.map((b) => renderCell(b))}</div>

        {/* Footer line: partner CTA */}
        <p className="backers-footnote">
          Interested in partnering with Pebble?{' '}
          <Link href="/contact" className="backers-footnote__link">
            Get in touch
          </Link>
          .
        </p>
      </div>

      <style>{`
        .backers-header {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          grid-template-rows: auto auto;
          column-gap: clamp(32px, 5vw, 80px);
          row-gap: clamp(18px, 2.4vh, 32px);
          align-items: start;
          width: 100%;
        }
        .backers-eyebrow {
          grid-column: 1 / -1;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .backers-eyebrow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #E8703A;
          display: inline-block;
          flex-shrink: 0;
        }
        .backers-eyebrow-label {
          font-family: var(--font-ibm-plex-sans), system-ui, sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(26, 26, 26, 0.55);
        }
        .backers-headline {
          grid-column: 1;
          margin: 0;
          font-family: var(--font-cormorant), Georgia, serif;
          font-weight: 500;
          font-size: clamp(28px, 3vw, 44px);
          line-height: 1.12;
          letter-spacing: -0.015em;
          color: #1a1a1a;
          max-width: 18ch;
        }
        .backers-lede {
          grid-column: 2;
          margin: 0;
          font-family: var(--font-ibm-plex-sans), system-ui, sans-serif;
          font-size: 15px;
          font-weight: 300;
          line-height: 1.6;
          color: #555;
          max-width: 38ch;
          /* Optical alignment: drop the lede slightly so its top reads aligned
             with the Cormorant headline's cap-line, not its x-height. */
          padding-top: 6px;
        }

        .backers-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          column-gap: clamp(24px, 3vw, 40px);
          row-gap: clamp(24px, 3vw, 40px);
          align-items: stretch;
          width: 100%;
        }

        .backer-cell {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: flex-start;
          text-decoration: none;
          background: #efe8db;
          padding: clamp(18px, 1.8vw, 22px) clamp(20px, 2vw, 28px) clamp(12px, 1.3vw, 16px);
          box-sizing: border-box;
          border-radius: 3px;
          transition: background-color 200ms ease, transform 200ms ease;
        }
        .backer-cell:hover {
          background: #e8e0d0;
          transform: translateY(-2px);
        }
        .backer-cell:focus-visible {
          outline: 2px solid #5e7a6a;
          outline-offset: 4px;
        }
        .backer-cell__logobox {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: ${LOGO_BOX_HEIGHT}px;
        }
        .backer-cell__divider {
          height: 1px;
          background: rgba(26, 26, 26, 0.1);
          margin: clamp(10px, 1.1vw, 14px) 0 clamp(7px, 0.8vw, 10px);
        }
        .backer-cell__region {
          font-family: var(--font-ibm-plex-sans), system-ui, sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888;
        }

        .backers-footnote {
          margin: 0;
          font-family: var(--font-ibm-plex-sans), system-ui, sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #666;
          line-height: 1.5;
        }
        .backers-footnote__link {
          color: #2d3a35;
          font-weight: 400;
          text-decoration: none;
          border-bottom: 1px solid rgba(45, 58, 53, 0.3);
          transition: border-color 150ms ease, color 150ms ease;
        }
        .backers-footnote__link:hover {
          color: #5e7a6a;
          border-bottom-color: #5e7a6a;
        }

        @media (max-width: 767px) {
          .backers-header {
            grid-template-columns: 1fr;
            row-gap: 14px;
            align-items: start;
          }
          .backers-eyebrow,
          .backers-headline,
          .backers-lede {
            grid-column: 1;
          }
          .backers-lede {
            padding-top: 0;
            max-width: none;
          }
          .backers-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 16px;
            row-gap: 16px;
          }
          .backer-cell {
            padding: 16px 14px 12px;
          }
        }
      `}</style>
    </section>
  )
}
