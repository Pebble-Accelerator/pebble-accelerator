'use client'

import type { MouseEvent } from 'react'
import { getMedicalBucket, getTileColors } from '@/data/portfolio'
import {
  monogramFromName,
  usesTileLogo,
  WATERMARK_BOX_STYLE,
  WATERMARK_MARK,
  WATERMARK_OPACITY,
} from '@/data/portfolioWatermark'
import type { Company } from '@/types'
import { FILM_GRAIN_TILE_STYLE } from '@/lib/filmGrain'
import { cardRippleSpec, rippleTint, RIPPLE_VB_W, RIPPLE_VB_H } from '@/lib/ripple'

/**
 * The portfolio tile — the serif name, ghosted monogram/logo, and mono sector
 * label are preserved exactly; the wave motif is replaced by a generated
 * concentric ripple field (the site's ripple visual language). A single source
 * of truth reused by /portfolio and the homepage slide. Do not restyle.
 */

/** Accent for the category label — deepened from ember/teal/sage for contrast on pale tiles. */
const BUCKET_ACCENT: Record<string, string> = {
  Therapeutics: '#C05A2A',
  Diagnostics: '#2C6B72',
  Platform: '#4F6B5D',
}

const TILE_NAME_FOREST = 'var(--color-slate-dark)'

/**
 * Per-card concentric ripple field. Origin + ring spacing are seeded by the
 * company name, so every card is unique yet systematically consistent. Rendered
 * in a lighter/darker value of the card's own tint so it reads as texture, not an
 * overlay. Static inline SVG (no filters/blend/animation) → cheap at 28 mounted.
 */
function TileRippleField({ seed, baseColor }: { seed: string; baseColor: string }) {
  const spec = cardRippleSpec(seed)
  const stroke = rippleTint(baseColor, spec.strokeDelta)
  const n = spec.radii.length
  return (
    <svg
      aria-hidden
      className="portfolio-tile-ripplefield"
      viewBox={`0 0 ${RIPPLE_VB_W} ${RIPPLE_VB_H}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {spec.radii.map((r, i) => (
        <circle
          key={i}
          cx={spec.ox}
          cy={spec.oy}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={1.4}
          // Inner rings read strongest; they soften as they spread outward.
          opacity={Math.max(0.08, spec.opacity * (1 - i / (n + 1)))}
        />
      ))}
    </svg>
  )
}

function TileFilmGrain() {
  return <div aria-hidden className="portfolio-tile-grain" style={FILM_GRAIN_TILE_STYLE} />
}

function TileWatermark({ company }: { company: Company }) {
  const showLogo = usesTileLogo(company)

  return (
    <div
      className="portfolio-watermark-box"
      data-watermark={showLogo ? 'logo' : 'monogram'}
      style={WATERMARK_BOX_STYLE}
    >
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={company.logo}
          alt={company.name}
          className="portfolio-watermark-logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: WATERMARK_OPACITY,
          }}
        />
      ) : (
        <span
          aria-hidden
          className="portfolio-watermark-monogram"
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            fontSize: 30,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: '0.02em',
            color: WATERMARK_MARK,
            opacity: WATERMARK_OPACITY,
            userSelect: 'none',
          }}
        >
          {monogramFromName(company.name)}
        </span>
      )}
    </div>
  )
}

export function CompanyCard({ company, gridIndex }: { company: Company; gridIndex: number }) {
  const isLinked = Boolean(company.website)
  const { blockColor, blockColorDark } = getTileColors(company, gridIndex)
  const bucket = getMedicalBucket(company)
  const accent = bucket ? BUCKET_ACCENT[bucket] : TILE_NAME_FOREST
  // Signature hover pulse: a lighter value of the card's own tint.
  const rippleHoverColor = rippleTint(blockColor, 20)

  const surfaceStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    aspectRatio: '4 / 3',
    width: '100%',
    background: `linear-gradient(180deg, ${blockColor} 0%, ${blockColorDark} 100%)`,
    boxSizing: 'border-box',
    padding: 'clamp(24px, 4vw, 40px)',
    overflow: 'hidden',
    borderRadius: '10px',
    textDecoration: 'none',
    color: 'inherit',
    cursor: isLinked ? 'pointer' : 'default',
    '--ripple-color': rippleHoverColor,
  } as React.CSSProperties

  // Minimal JS: record the cursor position so the CSS :hover ripple emanates from
  // where the pointer actually entered the card.
  const setRippleOrigin = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--ripx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--ripy', `${e.clientY - rect.top}px`)
  }

  const inner = (
    <>
      <TileRippleField seed={company.name} baseColor={blockColor} />
      <TileWatermark company={company} />
      <TileFilmGrain />
      <span aria-hidden className="portfolio-tile-ripple" />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'left',
          maxWidth: '72%',
        }}
      >
        <h2
          className="portfolio-tile-name"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(26px, 3vw, 36px)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: TILE_NAME_FOREST,
            margin: '0 0 8px',
          }}
        >
          {company.name}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: accent,
            margin: 0,
            lineHeight: 1.35,
          }}
        >
          {company.category}
        </p>
      </div>
    </>
  )

  return (
    <div className="portfolio-tile">
      {isLinked ? (
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-tile-surface"
          style={surfaceStyle}
          aria-label={`${company.name}, opens website in a new tab`}
          onMouseEnter={setRippleOrigin}
        >
          {inner}
        </a>
      ) : (
        <div
          className="portfolio-tile-surface"
          style={surfaceStyle}
          aria-label={company.name}
          onMouseEnter={setRippleOrigin}
        >
          {inner}
        </div>
      )}

      <style jsx>{`
        .portfolio-tile-surface {
          /* Unified container language: 10px radius, 1px hairline, no drop shadow.
             Inset top highlight is a bevel, not a drop shadow. Elevation on hover
             is the lift + a deepened border, never a shadow. */
          border: 1px solid color-mix(in srgb, var(--color-slate-dark) 14%, transparent);
          box-shadow: inset 0 1px 0 color-mix(in srgb, var(--color-canvas) 50%, transparent);
          transition: transform 0.25s ease, border-color 0.25s ease;
          will-change: transform;
        }

        .portfolio-tile-ripplefield {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .portfolio-tile-surface:hover {
          transform: translateY(-5px);
          border-color: color-mix(in srgb, var(--color-slate-dark) 30%, transparent);
        }

        .portfolio-tile-name {
          transition: color 0.25s ease;
        }

        .portfolio-tile-surface:hover .portfolio-tile-name {
          color: #1f2a26;
        }

        /* Signature hover ripple — one pulse from the cursor position, spreading
           across the card in the card's own (lighter) tint, then settling. */
        .portfolio-tile-ripple {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          pointer-events: none;
        }

        .portfolio-tile-ripple::before {
          content: '';
          position: absolute;
          left: var(--ripx, 50%);
          top: var(--ripy, 50%);
          width: 12px;
          height: 12px;
          margin: -6px 0 0 -6px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            var(--ripple-color) 0%,
            var(--ripple-color) 22%,
            transparent 68%
          );
          opacity: 0;
          transform: scale(0);
          will-change: transform, opacity;
        }

        .portfolio-tile-surface:hover .portfolio-tile-ripple::before {
          animation: tileRippleOut 720ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        @keyframes tileRippleOut {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          14% {
            opacity: 0.4;
          }
          100% {
            transform: scale(42);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-tile-surface {
            transition: border-color 0.25s ease;
          }
          /* No lift under reduced motion; the border deepening is the only hover cue. */
          .portfolio-tile-surface:hover {
            transform: none;
            border-color: color-mix(in srgb, var(--color-slate-dark) 30%, transparent);
          }
          .portfolio-tile-surface:hover .portfolio-tile-ripple::before {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default CompanyCard
