import Link from 'next/link'
import SectionLabelLine from '@/components/ui/SectionLabelLine'
import { CompanyCard } from '@/components/portfolio/CompanyCard'
import { portfolioCompanies } from '@/data/portfolio'
import type { Company } from '@/types'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--color-meta)',
  whiteSpace: 'nowrap',
}

/** A cross-bucket selection so the three gradient families all appear on the homepage. */
const FEATURED_IDS = [
  'cg-oncology', // Therapeutics
  'phase-scientific', // Diagnostics
  'thrive-bioscience', // Platform
  'valora', // Therapeutics
  'endiatx', // Diagnostics
  'great-bay-bio', // Platform
]

const featured = FEATURED_IDS.map(
  (id) => portfolioCompanies.find((c) => c.id === id)
).filter(Boolean) as Company[]

export default function PortfolioHome() {
  const total = portfolioCompanies.length

  return (
    <section
      className="portfolio-home"
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'safe center',
        boxSizing: 'border-box',
        // Asymmetric top reserve clears the fixed 64px nav so the eyebrow is never
        // tucked beneath it when the slide centers its content.
        padding: 'var(--space-page-top) var(--gutter-x) var(--space-section-y)',
        background: 'var(--color-canvas)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <SectionLabelLine index={1} marginBottom="22px">
          <span style={labelStyle}>Portfolio</span>
        </SectionLabelLine>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '26px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(28px, 3.1vw, 42px)',
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: 'var(--color-ink)',
              margin: 0,
              maxWidth: '18ch',
            }}
          >
            A selection of the companies we back.
          </h2>

          <Link
            href="/portfolio"
            className="link-underline"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-forest)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            See all {total} →
          </Link>
        </div>

        <div className="portfolio-home-grid">
          {featured.map((company, i) => (
            <CompanyCard key={company.id} company={company} gridIndex={i} />
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-home-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        @media (max-width: 900px) {
          .portfolio-home-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .portfolio-home-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
