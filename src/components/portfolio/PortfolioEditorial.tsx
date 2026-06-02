'use client'

import { useEffect, useMemo, useState } from 'react'
import { portfolioCompanies, darkenBlockColor, getMedicalBucket } from '@/data/portfolio'
import type { MedicalBucket } from '@/data/portfolio'
import type { Company } from '@/types'
import { fadeUpStyle, useFadeUpReveal } from '@/components/ui/useFadeUpReveal'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#888',
}

/** Four reader-friendly pills (+ ALL). LEGACY is an overlay, not a medical bucket. */
const MEDICAL_BUCKETS: MedicalBucket[] = ['Therapeutics', 'Diagnostics', 'Platform']

type PortfolioFilter = 'ALL' | MedicalBucket | 'LEGACY'

const BUCKET_LABELS: Record<MedicalBucket, string> = {
  Therapeutics: 'THERAPEUTICS',
  Diagnostics: 'DIAGNOSTICS',
  Platform: 'PLATFORM',
}

const LOGO_GHOST_SIZE = {
  width: '84%',
  height: '84%',
  scale: 1.55,
} as const

/** Deterministic bleed positions — cycle by block index. No rotation, fixed size. */
const LOGO_CROP_VARIANTS = [
  // Upper-right bleed (default)
  {
    top: '-18%',
    right: '-34%',
    left: 'auto',
    transformOrigin: '100% 0%',
    maskPosition: 'left center',
  },
  // Centered (more emblematic marks)
  {
    top: '6%',
    right: '10%',
    left: 'auto',
    transformOrigin: '50% 50%',
    maskPosition: 'center',
  },
  // Upper-center (wordmarks)
  {
    top: '-26%',
    right: 'auto',
    left: '10%',
    transformOrigin: '50% 0%',
    maskPosition: 'center',
  },
] as const

const LOGO_GHOST_OPACITY = 0.22

/** KA Imaging — literal mask values (zoom past 100% to crop wordmark from 500×250 asset). */
const KA_IMAGING_MASK_SIZE = '160%'
const KA_IMAGING_MASK_POSITION = 'left -15% bottom 35%'
const KA_IMAGING_GHOST_OPACITY = 0.32

function buildFilterPills(companies: Company[]): { key: PortfolioFilter; label: string; count: number }[] {
  // ALL = distinct companies (the data already holds one row per company, no dual-era duplicates).
  const pills: { key: PortfolioFilter; label: string; count: number }[] = [
    { key: 'ALL', label: 'ALL', count: companies.length },
  ]

  // Medical-bucket counts INCLUDE legacy companies — legacy is an overlay, not a removal.
  for (const bucket of MEDICAL_BUCKETS) {
    const count = companies.filter((c) => getMedicalBucket(c) === bucket).length
    if (count > 0) {
      pills.push({ key: bucket, label: BUCKET_LABELS[bucket], count })
    }
  }

  const legacyCount = companies.filter((c) => c.legacyFilter).length
  if (legacyCount > 0) {
    pills.push({ key: 'LEGACY', label: 'LEGACY', count: legacyCount })
  }

  return pills
}

function matchesFilter(company: Company, filter: PortfolioFilter): boolean {
  if (filter === 'ALL') return true
  if (filter === 'LEGACY') return company.legacyFilter
  return getMedicalBucket(company) === filter
}

const STAGGER_MS = 100

export default function PortfolioEditorial() {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>('ALL')
  const { ref: revealRef, revealed, reduced } = useFadeUpReveal()

  const filterPills = useMemo(() => buildFilterPills(portfolioCompanies), [])

  const filteredCompanies = useMemo(
    () => portfolioCompanies.filter((c) => matchesFilter(c, activeFilter)),
    [activeFilter]
  )

  return (
    <div ref={revealRef}>
      <section
        style={{
          padding: '80px 5vw 120px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <p style={{ ...labelStyle, marginBottom: '32px' }}>PORTFOLIO · ORDERED BY TRACTION</p>

        <div style={{ marginBottom: '48px', maxWidth: 'min(720px, 100%)' }}>
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
            <span style={{ color: '#1a1a1a' }}>Every avalanche</span>
            <br />
            <span style={{ fontStyle: 'italic', color: '#5e7a6a' }}>starts here.</span>
          </h1>
        </div>

        <div
          style={{
            ...fadeUpStyle(revealed, reduced, 150),
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
            <CompanyBlock
              key={company.id}
              company={company}
              variantIndex={gridIndex}
              revealStyle={fadeUpStyle(revealed, reduced, 300 + gridIndex * STAGGER_MS)}
            />
          ))}
        </div>
      </section>

      <style jsx>{`
        .portfolio-company-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        @media (max-width: 720px) {
          .portfolio-company-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </div>
  )
}

function LogoGhost({
  logoSrc,
  toneColor,
  variantIndex,
  companySlug,
}: {
  logoSrc: string
  toneColor: string
  variantIndex: number
  companySlug: string
}) {
  const variant = LOGO_CROP_VARIANTS[variantIndex % LOGO_CROP_VARIANTS.length]
  const maskUrl = `url("${logoSrc}")`

  useEffect(() => {
    if (companySlug !== 'ka-imaging') return
    console.log('[KA Imaging logo mask]', {
      maskSize: KA_IMAGING_MASK_SIZE,
      maskPosition: KA_IMAGING_MASK_POSITION,
    })
  }, [companySlug])

  if (companySlug === 'ka-imaging') {
    return (
      <div
        aria-hidden
        className="portfolio-logo-ghost portfolio-logo-ghost--ka-imaging"
        data-company="ka-imaging"
        data-mask-size={KA_IMAGING_MASK_SIZE}
        data-mask-position={KA_IMAGING_MASK_POSITION}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backgroundColor: toneColor,
          opacity: KA_IMAGING_GHOST_OPACITY,
          WebkitMaskImage: maskUrl,
          maskImage: maskUrl,
          WebkitMaskSize: KA_IMAGING_MASK_SIZE,
          maskSize: KA_IMAGING_MASK_SIZE,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: KA_IMAGING_MASK_POSITION,
          maskPosition: KA_IMAGING_MASK_POSITION,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    )
  }

  return (
    <div
      aria-hidden
      className="portfolio-logo-ghost"
      style={{
        position: 'absolute',
        width: LOGO_GHOST_SIZE.width,
        height: LOGO_GHOST_SIZE.height,
        top: variant.top,
        right: variant.right,
        left: variant.left,
        backgroundColor: toneColor,
        opacity: LOGO_GHOST_OPACITY,
        WebkitMaskImage: maskUrl,
        maskImage: maskUrl,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: variant.maskPosition,
        maskPosition: variant.maskPosition,
        transform: `scale(${LOGO_GHOST_SIZE.scale})`,
        transformOrigin: variant.transformOrigin,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

function CompanyBlock({
  company,
  revealStyle,
  variantIndex,
}: {
  company: Company
  revealStyle: React.CSSProperties
  variantIndex: number
}) {
  const [hovered, setHovered] = useState(false)
  const isLinked = Boolean(company.website)
  const logoTone = darkenBlockColor(company.blockColor, 26)

  const blockStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    aspectRatio: '4 / 3',
    width: '100%',
    background: `linear-gradient(to top right, ${company.blockColor} 0%, ${company.blockColorDark} 100%)`,
    boxSizing: 'border-box',
    padding: 'clamp(24px, 4vw, 40px)',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    cursor: isLinked ? 'pointer' : 'default',
    transform: hovered && isLinked ? 'scale(1.01)' : 'scale(1)',
    filter: hovered && isLinked ? 'brightness(1.05)' : 'none',
    transition: 'transform 0.25s ease, filter 0.25s ease',
  }

  const inner = (
    <>
      {company.logo ? (
        <LogoGhost
          logoSrc={company.logo}
          toneColor={logoTone}
          variantIndex={variantIndex}
          companySlug={company.slug}
        />
      ) : null}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'left',
          maxWidth: '72%',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(26px, 3vw, 36px)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#f5efe4',
            margin: '0 0 8px',
          }}
        >
          {company.name}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245, 239, 228, 0.7)',
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
    <div style={revealStyle}>
      {isLinked ? (
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          style={blockStyle}
          aria-label={`${company.name} — opens website in a new tab`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {inner}
        </a>
      ) : (
        <div
          style={blockStyle}
          aria-label={company.name}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {inner}
        </div>
      )}
    </div>
  )
}
