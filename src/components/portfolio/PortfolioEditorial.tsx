'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { currentPortfolio, legacyPortfolio } from '@/data/portfolio'
import type { Company, PortfolioFilterGroup } from '@/types'
import { fadeUpStyle, useFadeUpReveal } from '@/components/ui/useFadeUpReveal'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#888',
}

const BLOCK_PALETTE = ['#2d3a35', '#8e7886', '#E8703A', '#5e7a6a', '#1a1a1a'] as const

const FILTER_GROUPS: PortfolioFilterGroup[] = [
  'Therapeutics',
  'Diagnostics',
  'Devices',
  'Pharma',
  'Platform',
]

const COLOR_INDEX_SOURCE = [...currentPortfolio, ...legacyPortfolio]

function blockColorForCompany(companyId: string): string {
  const index = COLOR_INDEX_SOURCE.findIndex((c) => c.id === companyId)
  const i = index >= 0 ? index : 0
  return BLOCK_PALETTE[i % BLOCK_PALETTE.length]
}

type SectorFilter = 'ALL' | PortfolioFilterGroup

function buildFilterPills(companies: Company[]): { key: SectorFilter; label: string; count: number }[] {
  const pills: { key: SectorFilter; label: string; count: number }[] = [
    { key: 'ALL', label: 'ALL', count: companies.length },
  ]

  const labels: Record<PortfolioFilterGroup, string> = {
    Therapeutics: 'THERAPEUTICS',
    Diagnostics: 'DIAGNOSTICS',
    Devices: 'DEVICES',
    Pharma: 'PHARMA',
    Platform: 'PLATFORM',
  }

  for (const group of FILTER_GROUPS) {
    const count = companies.filter((c) => c.filterGroup === group).length
    if (count > 0) {
      pills.push({ key: group, label: labels[group], count })
    }
  }

  return pills
}

const STAGGER_MS = 100

export default function PortfolioEditorial() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<SectorFilter>('ALL')
  const { ref: revealRef, revealed, reduced } = useFadeUpReveal()

  const sectorFilters = useMemo(() => buildFilterPills(currentPortfolio), [])

  const filteredCurrent = useMemo(() => {
    if (activeFilter === 'ALL') return currentPortfolio
    return currentPortfolio.filter((c) => c.filterGroup === activeFilter)
  }, [activeFilter])

  const handleBlockClick = (slug: string) => {
    // TODO: implement /portfolio/[slug] detail pages when routes exist
    router.push(`/portfolio/${slug}`)
  }

  const legacyStaggerBase = 300 + filteredCurrent.length * STAGGER_MS + 200

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

        <p
          style={{
            ...labelStyle,
            ...fadeUpStyle(revealed, reduced, 120),
            marginBottom: '20px',
          }}
        >
          CURRENT PORTFOLIO
        </p>

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
          {sectorFilters.map(({ key, label, count }) => {
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
          {filteredCurrent.map((company, gridIndex) => (
            <CompanyBlock
              key={company.id}
              company={company}
              backgroundColor={blockColorForCompany(company.id)}
              revealStyle={fadeUpStyle(revealed, reduced, 300 + gridIndex * STAGGER_MS)}
              onClick={() => handleBlockClick(company.slug)}
            />
          ))}
        </div>

        <div
          style={{
            marginTop: '96px',
            marginBottom: '40px',
            ...fadeUpStyle(revealed, reduced, legacyStaggerBase - 100),
          }}
        >
          <p style={{ ...labelStyle, marginBottom: '16px' }}>LEGACY PORTFOLIO</p>
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(22px, 2.5vw, 28px)',
              fontWeight: 500,
              lineHeight: 1.3,
              color: '#1a1a1a',
              margin: 0,
              maxWidth: '480px',
            }}
          >
            Earlier bets, realized and matured.
          </p>
        </div>

        <div className="portfolio-company-grid">
          {legacyPortfolio.map((company, gridIndex) => (
            <CompanyBlock
              key={company.id}
              company={company}
              legacy
              backgroundColor={blockColorForCompany(company.id)}
              revealStyle={fadeUpStyle(
                revealed,
                reduced,
                legacyStaggerBase + gridIndex * STAGGER_MS
              )}
              onClick={() => handleBlockClick(company.slug)}
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

function CompanyBlock({
  company,
  backgroundColor,
  revealStyle,
  onClick,
  legacy = false,
}: {
  company: Company
  backgroundColor: string
  revealStyle: React.CSSProperties
  onClick: () => void
  legacy?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={revealStyle}>
      <article
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          aspectRatio: '4 / 3',
          height: '100%',
          backgroundColor,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(24px, 4vw, 40px)',
          boxSizing: 'border-box',
          overflow: 'hidden',
          transform: hovered ? 'scale(1.01)' : 'scale(1)',
          filter: legacy
            ? hovered
              ? 'brightness(1.04)'
              : 'brightness(0.94) saturate(0.92)'
            : hovered
              ? 'brightness(1.06)'
              : 'none',
          transition: 'transform 0.25s ease, filter 0.25s ease',
        }}
      >
        {legacy && (
          <span
            style={{
              position: 'absolute',
              top: 'clamp(20px, 3vw, 32px)',
              left: 'clamp(20px, 3vw, 32px)',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(245, 239, 228, 0.55)',
            }}
          >
            LEGACY
          </span>
        )}

        <div style={{ flex: 1, minHeight: 0 }} aria-hidden />

        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245, 239, 228, 0.7)',
            margin: '0 0 12px',
          }}
        >
          {company.category.toUpperCase()}
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#f5efe4',
            margin: '0 0 12px',
          }}
        >
          {company.name}
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'rgba(245, 239, 228, 0.75)',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            opacity: hovered ? 1 : 0.85,
            transition: 'opacity 0.2s ease',
          }}
        >
          {company.oneLiner}
        </p>

        <span
          style={{
            position: 'absolute',
            top: 'clamp(20px, 3vw, 32px)',
            right: 'clamp(20px, 3vw, 32px)',
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#f5efe4',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          READ CASE STUDY →
        </span>
      </article>
    </div>
  )
}
