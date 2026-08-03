'use client'

import Section from '@/components/ui/Section'
import ServicesCardStack from '@/components/services/ServicesCardStack'
import { fadeUpStyle, useFadeUpReveal } from '@/components/ui/useFadeUpReveal'

export default function ServicesEditorial() {
  const { ref: revealRef, revealed, reduced } = useFadeUpReveal()

  return (
    <div ref={revealRef} className="services-editorial-wrap" style={{ overflow: 'visible' }}>
      <Section first style={{ paddingBottom: 0 }}>
        <div
          className="services-editorial-hero"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px 5%',
            marginBottom: 'var(--space-2xl)',
            alignItems: 'center',
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
              <span style={{ color: '#1a1a1a' }}>No cohorts.</span>
              <br />
              <span style={{ fontStyle: 'italic', color: '#2d3a35' }}>Every company,</span>
              <br />
              <span style={{ fontStyle: 'italic', color: '#2d3a35' }}>one-on-one.</span>
            </h1>
          </div>
          <div
            style={{
              flex: '1 1 40%',
              minWidth: '260px',
              display: 'flex',
              alignItems: 'center',
              minHeight: '100%',
            }}
          >
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
              The needs of every biomedical company are vastly different. Pebble works closely with
              each company for a full year, making sure key milestones and deliverables are actually
              hit, often through the support of{' '}
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontStyle: 'italic',
                }}
              >
                Tigermed&apos;s ecosystem
              </span>
              .
            </p>
          </div>
        </div>

        <ServicesCardStack />
      </Section>
      {/* Spacer so CTA clears the editorial column before the forest band */}
      <div className="services-pre-cta-spacer" aria-hidden style={{ height: 'var(--space-xl)' }} />
    </div>
  )
}
