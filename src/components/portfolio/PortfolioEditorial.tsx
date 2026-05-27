'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import portfolio from '@/data/portfolio'
import type { PortfolioSector } from '@/types'
import { fadeUpStyle, useFadeUpReveal } from '@/components/ui/useFadeUpReveal'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#888',
}

const stripeOverlay: React.CSSProperties = {
  backgroundImage: `repeating-linear-gradient(
    45deg,
    rgba(245, 239, 228, 0.1) 0px,
    rgba(245, 239, 228, 0.1) 1px,
    transparent 1px,
    transparent 10px
  )`,
}

type SectorFilter = 'ALL' | PortfolioSector

const SECTOR_FILTERS: { key: SectorFilter; label: string; count: number }[] = [
  { key: 'ALL', label: 'ALL', count: 18 },
  { key: 'Therapeutics', label: 'THERAPEUTICS', count: 6 },
  { key: 'Diagnostics', label: 'DIAGNOSTICS', count: 5 },
  { key: 'Devices', label: 'DEVICES', count: 4 },
  { key: 'Platform', label: 'PLATFORM', count: 3 },
]

function UnderlineLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#1a1a1a',
        textDecoration: 'none',
        display: 'inline-block',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#5e7a6a'
        const u = e.currentTarget.querySelector('[data-ul]') as HTMLElement | null
        if (u) u.style.borderBottomColor = '#5e7a6a'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#1a1a1a'
        const u = e.currentTarget.querySelector('[data-ul]') as HTMLElement | null
        if (u) u.style.borderBottomColor = '#1a1a1a'
      }}
    >
      <span
        data-ul
        style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '2px' }}
      >
        {children}
      </span>
    </Link>
  )
}

function FeaturedCard({
  founderLabel,
  portraitPlaceholder,
  visualBg,
  pillLabel,
  name,
  meta,
  body,
  milestoneLabel,
  milestoneItalic,
  milestoneRoman,
  caseStudyHref,
}: {
  founderLabel: string
  portraitPlaceholder: string
  visualBg: string
  pillLabel: string
  name: string
  meta: string
  body: string
  milestoneLabel: string
  milestoneItalic: string
  milestoneRoman: string
  caseStudyHref: string
}) {
  return (
    <article style={{ flex: '1 1 0', minWidth: 0 }}>
      <div
        style={{
          position: 'relative',
          aspectRatio: '5 / 4',
          backgroundColor: visualBg,
          ...stripeOverlay,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245, 239, 228, 0.5)',
          }}
        >
          {founderLabel}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(245, 239, 228, 0.4)',
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          {portraitPlaceholder}
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            backgroundColor: '#E8703A',
            color: '#1a1a1a',
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: '999px',
          }}
        >
          {pillLabel}
        </span>
      </div>
      <div style={{ paddingTop: '24px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(28px, 3vw, 36px)',
            fontWeight: 500,
            color: '#1a1a1a',
            margin: '0 0 8px',
            lineHeight: 1.1,
          }}
        >
          {name}
        </h3>
        <p style={{ ...labelStyle, marginBottom: '16px' }}>{meta}</p>
        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: 1.65,
            color: '#1a1a1a',
            margin: '0 0 20px',
          }}
        >
          {body}
        </p>
        <div
          style={{
            borderTop: '1px solid #d4cfc2',
            paddingTop: '16px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                ...labelStyle,
                fontSize: '10px',
              }}
            >
              {milestoneLabel}
            </span>
            <span style={{ textAlign: 'right' }}>
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '16px',
                  color: '#1a1a1a',
                }}
              >
                {milestoneItalic}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                  fontSize: '14px',
                  color: '#1a1a1a',
                  marginLeft: '6px',
                }}
              >
                {milestoneRoman}
              </span>
            </span>
          </div>
        </div>
        <UnderlineLink href={caseStudyHref}>READ CASE STUDY →</UnderlineLink>
      </div>
    </article>
  )
}

export default function PortfolioEditorial() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<SectorFilter>('ALL')
  const { ref: revealRef, revealed, reduced } = useFadeUpReveal()

  const filtered = useMemo(() => {
    if (activeFilter === 'ALL') return portfolio
    return portfolio.filter((c) => c.sector === activeFilter)
  }, [activeFilter])

  const handleRowClick = (slug: string) => {
    // TODO: implement /portfolio/[slug] detail pages
    router.push(`/portfolio/${slug}`)
  }

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

        <div
          className="portfolio-editorial-hero"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px 5%',
            marginBottom: '72px',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flex: '1 1 45%', minWidth: '280px' }}>
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
              <span style={{ color: '#1a1a1a' }}>Our biggest two,</span>
              <br />
              <span style={{ fontStyle: 'italic', color: '#2d3a35' }}>still close in.</span>
            </h1>
          </div>
          <div style={{ flex: '1 1 40%', minWidth: '260px' }}>
            <p
              style={{
                ...fadeUpStyle(revealed, reduced, 150),
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: 1.65,
                color: '#1a1a1a',
                maxWidth: '480px',
                margin: 0,
              }}
            >
              The two companies leading the cohort by stage and traction. The full portfolio of
              eighteen follows below — ordered largest to earliest, filterable by sector.
            </p>
          </div>
        </div>

        {/* Featured cards stack below ~900px */}
        <div
          className="portfolio-featured-cards"
          style={{
            ...fadeUpStyle(revealed, reduced, 300),
            display: 'flex',
            gap: '32px',
            marginBottom: '64px',
          }}
        >
          <FeaturedCard
            founderLabel="FOUNDER · 01"
            portraitPlaceholder="[ DR. ELIAS WONG — BENCH PORTRAIT ]"
            visualBg="#2d3a35"
            pillLabel="SERIES B"
            name="CellAxis"
            meta="PLATFORM · SERIES B"
            body="Automated cell therapy manufacturing at a third of the unit cost. Pebble's largest portfolio company — now operating across three GMP suites with five global pharma partners on its production roster."
            milestoneLabel="LATEST MILESTONE"
            milestoneItalic="Series B"
            milestoneRoman="· US$48M"
            caseStudyHref="/portfolio/cellaxis"
          />
          <FeaturedCard
            founderLabel="FOUNDER · 02"
            portraitPlaceholder="[ DR. AMINA HUANG — LAB BENCH ]"
            visualBg="#8e7886"
            pillLabel="IND"
            name="OncoBridge"
            meta="DIAGNOSTICS · SERIES A · IND"
            body="A liquid-biopsy platform that detects early-stage colorectal cancer in blood with 92% sensitivity. Now running a 4,000-patient validation study across three GBA teaching hospitals."
            milestoneLabel="LATEST MILESTONE"
            milestoneItalic="IND"
            milestoneRoman="· Mar 2026"
            caseStudyHref="/portfolio/oncobridge"
          />
        </div>

        <div
          style={{
            ...fadeUpStyle(revealed, reduced, 450),
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px 10px',
            marginBottom: '24px',
          }}
        >
          <span style={{ ...labelStyle, marginRight: '8px' }}>FILTER</span>
          {SECTOR_FILTERS.map(({ key, label, count }) => {
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

        {/*
          Mobile table: horizontal scroll (min-width 720px) — preserves column alignment
          on narrow screens instead of stacking fields per row.
        */}
        <div
          className="portfolio-sediment-scroll"
          style={{
            ...fadeUpStyle(revealed, reduced, 600),
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div style={{ minWidth: '720px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '48px 1.1fr 2fr 110px 100px 28px',
                gap: '16px',
                paddingBottom: '12px',
                ...labelStyle,
              }}
            >
              <span>No</span>
              <span>Company</span>
              <span>Working on</span>
              <span>Sector</span>
              <span>Stage</span>
              <span aria-hidden style={{ textAlign: 'right' }}>
                →
              </span>
            </div>

            {filtered.map((company) => (
              <SedimentRow
                key={company.id}
                number={company.id}
                name={company.name}
                workingOn={company.workingOn}
                sector={company.sector.toUpperCase()}
                stage={company.stageLabel}
                onClick={() => handleRowClick(company.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 900px) {
          .portfolio-featured-cards {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

function SedimentRow({
  number,
  name,
  workingOn,
  sector,
  stage,
  onClick,
}: {
  number: string
  name: string
  workingOn: string
  sector: string
  stage: string
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
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
        display: 'grid',
        gridTemplateColumns: '48px 1.1fr 2fr 110px 100px 28px',
        gap: '16px',
        alignItems: 'baseline',
        padding: '20px 0',
        borderTop: '1px solid #d4cfc2',
        cursor: 'pointer',
        backgroundColor: hovered ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
        transition: 'background-color 0.15s ease',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          fontSize: '11px',
          color: '#888',
        }}
      >
        {number}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: '22px',
          fontWeight: 500,
          color: '#1a1a1a',
          lineHeight: 1.2,
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          fontSize: '14px',
          color: '#1a1a1a',
          lineHeight: 1.45,
        }}
      >
        {workingOn}
      </span>
      <span style={{ ...labelStyle, fontSize: '11px' }}>{sector}</span>
      <span style={{ ...labelStyle, fontSize: '11px' }}>{stage}</span>
      <span
        aria-hidden
        style={{
          textAlign: 'right',
          fontSize: '14px',
          color: hovered ? '#1a1a1a' : '#888',
          transition: 'color 0.15s ease',
        }}
      >
        →
      </span>
    </div>
  )
}
