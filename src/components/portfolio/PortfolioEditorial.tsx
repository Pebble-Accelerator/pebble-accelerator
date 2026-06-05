'use client'

import { useMemo, useState } from 'react'
import {
  portfolioCompanies,
  getMedicalBucket,
  getTileColors,
  darkenBlockColor,
} from '@/data/portfolio'
import type { MedicalBucket } from '@/data/portfolio'
import {
  monogramFromName,
  usesTileLogo,
  WATERMARK_BOX_STYLE,
  WATERMARK_LOGO_FILTER,
  WATERMARK_MARK,
  WATERMARK_OPACITY,
} from '@/data/portfolioWatermark'
import type { Company } from '@/types'
import { FILM_GRAIN_TILE_STYLE } from '@/lib/filmGrain'
import { pebbleWaveLayer } from '@/lib/pebbleWaveMotif'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#888',
}

/** Filter pills: ALL + three medical buckets. */
const MEDICAL_BUCKETS: MedicalBucket[] = ['Therapeutics', 'Diagnostics', 'Platform']

type PortfolioFilter = 'ALL' | MedicalBucket

const BUCKET_LABELS: Record<MedicalBucket, string> = {
  Therapeutics: 'THERAPEUTICS',
  Diagnostics: 'DIAGNOSTICS',
  Platform: 'PLATFORM',
}

/** Accent for the category label — deepened from ember/teal/sage for contrast on pale tiles. */
const BUCKET_ACCENT: Record<MedicalBucket, string> = {
  Therapeutics: '#C05A2A',
  Diagnostics: '#2C6B72',
  Platform: '#4F6B5D',
}

const TILE_NAME_FOREST = '#2d3a35'

function buildFilterPills(companies: Company[]): { key: PortfolioFilter; label: string; count: number }[] {
  // ALL = distinct companies (the data already holds one row per company, no dual-era duplicates).
  const pills: { key: PortfolioFilter; label: string; count: number }[] = [
    { key: 'ALL', label: 'ALL', count: companies.length },
  ]

  for (const bucket of MEDICAL_BUCKETS) {
    const count = companies.filter((c) => getMedicalBucket(c) === bucket).length
    if (count > 0) {
      pills.push({ key: bucket, label: BUCKET_LABELS[bucket], count })
    }
  }

  return pills
}

function matchesFilter(company: Company, filter: PortfolioFilter): boolean {
  if (filter === 'ALL') return true
  return getMedicalBucket(company) === filter
}

export default function PortfolioEditorial() {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>('ALL')

  const filterPills = useMemo(() => buildFilterPills(portfolioCompanies), [])

  const filteredCompanies = useMemo(
    () =>
      portfolioCompanies
        .filter((c) => matchesFilter(c, activeFilter))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })),
    [activeFilter]
  )

  return (
    <div>
      <section
        style={{
          padding: '80px 5vw 120px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <p style={{ ...labelStyle, marginBottom: '32px' }}>PORTFOLIO · A–Z</p>

        <div style={{ marginBottom: '48px', maxWidth: 'min(720px, 100%)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(48px, 5.5vw, 80px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            <span style={{ color: '#1a1a1a' }}>Every avalanche</span>
            <br />
            <span style={{ fontStyle: 'italic', color: '#5e7a6a' }}>starts here.</span>
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px 10px',
            marginBottom: '40px',
          }}
        >
          <span style={{ ...labelStyle, marginRight: '8px' }}>FILTER</span>
          {filterPills.map(({ key, label, count }) => {
            const isActive = activeFilter === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFilter(key)}
                style={{
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  border: isActive ? '1px solid #1a1a1a' : '1px solid #d4cfc2',
                  backgroundColor: isActive ? '#1a1a1a' : 'transparent',
                  color: isActive ? '#f5efe4' : '#1a1a1a',
                  transition: 'border-color 0.15s ease, background-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.borderColor = '#1a1a1a'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.borderColor = '#d4cfc2'
                }}
              >
                {label} · {count}
              </button>
            )
          })}
        </div>

        <div className="portfolio-company-grid">
          {filteredCompanies.map((company, gridIndex) => (
            <CompanyBlock key={company.id} company={company} gridIndex={gridIndex} />
          ))}
        </div>
      </section>

      <style jsx>{`
        .portfolio-company-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        /* Pure-CSS staggered scroll reveal — base state is fully VISIBLE.
           The entrance only applies where scroll-driven timelines are supported AND
           motion is allowed. No JS, no IntersectionObserver, no hidden start-state. */
        .portfolio-tile {
          opacity: 1;
          transform: none;
        }

        @keyframes portfolioTileEnter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @supports (animation-timeline: view()) {
          @media (prefers-reduced-motion: no-preference) {
            .portfolio-tile {
              animation: portfolioTileEnter linear both;
              animation-timeline: view();
              animation-range: entry 0% entry 55%;
            }

            /* Stagger: even column resolves a touch later → gentle diagonal cascade. */
            .portfolio-tile:nth-child(even) {
              animation-range: entry 14% entry 70%;
            }
          }
        }

        @media (max-width: 720px) {
          .portfolio-company-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  )
}

function TileFilmGrain() {
  return <div aria-hidden className="portfolio-tile-grain" style={FILM_GRAIN_TILE_STYLE} />
}

function TileWatermark({ company }: { company: Company }) {
  const showLogo = usesTileLogo(company)

  return (
    <div
      aria-hidden
      className="portfolio-watermark-box"
      data-watermark={showLogo ? 'logo' : 'monogram'}
      style={WATERMARK_BOX_STYLE}
    >
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={company.logo}
          alt=""
          className="portfolio-watermark-logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: WATERMARK_OPACITY,
            filter: WATERMARK_LOGO_FILTER,
          }}
        />
      ) : (
        <span
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

function CompanyBlock({ company, gridIndex }: { company: Company; gridIndex: number }) {
  const isLinked = Boolean(company.website)
  const { blockColor, blockColorDark } = getTileColors(company, gridIndex)
  const waveTone = darkenBlockColor(blockColor, 16)
  const bucket = getMedicalBucket(company)
  const accent = bucket ? BUCKET_ACCENT[bucket] : TILE_NAME_FOREST

  const surfaceStyle: React.CSSProperties = {
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
    border: '1px solid rgba(45, 58, 53, 0.14)',
    textDecoration: 'none',
    color: 'inherit',
    cursor: isLinked ? 'pointer' : 'default',
  }

  const inner = (
    <>
      <div aria-hidden style={pebbleWaveLayer(waveTone, 'back')} />
      <div aria-hidden className="portfolio-tile-wave-front" style={pebbleWaveLayer(waveTone, 'front')} />
      <TileWatermark company={company} />
      <TileFilmGrain />

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
          aria-label={`${company.name} — opens website in a new tab`}
        >
          {inner}
        </a>
      ) : (
        <div className="portfolio-tile-surface" style={surfaceStyle} aria-label={company.name}>
          {inner}
        </div>
      )}

      <style jsx>{`
        .portfolio-tile-surface {
          box-shadow: inset 0 1px 0 rgba(245, 239, 228, 0.5), 0 1px 2px rgba(45, 58, 53, 0.05);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          will-change: transform;
        }

        .portfolio-tile-surface:hover {
          transform: translateY(-5px);
          box-shadow: inset 0 1px 0 rgba(245, 239, 228, 0.5), 0 18px 38px -14px rgba(45, 58, 53, 0.3);
        }

        .portfolio-tile-name {
          transition: color 0.25s ease;
        }

        .portfolio-tile-surface:hover .portfolio-tile-name {
          color: #1f2a26;
        }

        .portfolio-tile-wave-front {
          transition: transform 0.25s ease;
          will-change: transform;
        }

        .portfolio-tile-surface:hover .portfolio-tile-wave-front {
          transform: translate3d(-6px, -3px, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-tile-surface {
            transition: box-shadow 0.25s ease;
          }
          .portfolio-tile-surface:hover {
            transform: none;
            box-shadow: inset 0 1px 0 rgba(245, 239, 228, 0.5), 0 6px 16px -8px rgba(45, 58, 53, 0.22);
          }
          .portfolio-tile-surface:hover .portfolio-tile-wave-front {
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}
