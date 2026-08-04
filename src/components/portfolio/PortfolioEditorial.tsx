'use client'

import { useMemo, useState } from 'react'
import { portfolioCompanies, getMedicalBucket } from '@/data/portfolio'
import type { MedicalBucket } from '@/data/portfolio'
import type { Company } from '@/types'
import { CompanyCard } from '@/components/portfolio/CompanyCard'
import SectionLabelLine from '@/components/ui/SectionLabelLine'
import Section from '@/components/ui/Section'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--color-meta)',
}

/** Filter pills: ALL + three medical buckets. */
const MEDICAL_BUCKETS: MedicalBucket[] = ['Therapeutics', 'Diagnostics', 'Platform']

type PortfolioFilter = 'ALL' | MedicalBucket

const BUCKET_LABELS: Record<MedicalBucket, string> = {
  Therapeutics: 'THERAPEUTICS',
  Diagnostics: 'DIAGNOSTICS',
  Platform: 'PLATFORM',
}

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
      <Section first style={{ paddingBottom: 'var(--space-2xl)' }}>
        <SectionLabelLine index={1} marginBottom="var(--space-sm)">
          <span style={{ ...labelStyle, flexShrink: 0 }}>PORTFOLIO · A–Z</span>
        </SectionLabelLine>

        <div style={{ marginBottom: 'var(--space-md)', maxWidth: 'min(720px, 100%)' }}>
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
            <span style={{ color: 'var(--color-ink)' }}>Every avalanche</span>
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--color-sage)' }}>starts here.</span>
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px 10px',
            marginBottom: 'var(--space-md)',
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
                  border: isActive
                    ? '1px solid var(--color-ink)'
                    : '1px solid var(--color-border-warm)',
                  backgroundColor: isActive ? 'var(--color-ink)' : 'transparent',
                  color: isActive ? 'var(--color-canvas)' : 'var(--color-ink)',
                  transition: 'border-color 0.25s ease, background-color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.borderColor = 'var(--color-ink)'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.borderColor = 'var(--color-border-warm)'
                }}
              >
                {label} · {count}
              </button>
            )
          })}
        </div>

        <div className="portfolio-company-grid">
          {filteredCompanies.map((company, gridIndex) => (
            <CompanyCard key={company.id} company={company} gridIndex={gridIndex} />
          ))}
        </div>
      </Section>

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
