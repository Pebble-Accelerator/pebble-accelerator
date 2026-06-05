'use client'

import StickyTabs from '@/components/ui/StickyTabs'
import {
  SERVICE_CARD_GRAIN,
  SERVICE_CARD_WAVE_CREAM,
  SERVICE_CARD_WAVE_FOREST,
} from '@/lib/serviceCardDepth'

/** Actual fixed-nav height (see Nav.tsx) so sticky headers sit just under it. */
const MAIN_NAV_HEIGHT = '64px'

const FOREST = '#2d3a35'
const CREAM_PANEL = '#e8e0d0'

const headerPadding = 'clamp(32px, 4vw, 48px) clamp(40px, 4.5vw, 56px) clamp(20px, 2.5vw, 28px)'
const contentPadding = '0 clamp(40px, 4.5vw, 56px) clamp(40px, 4.5vw, 56px)'

function ForestDecoration() {
  return (
    <>
      <div style={SERVICE_CARD_WAVE_FOREST} />
      <div style={SERVICE_CARD_GRAIN} />
    </>
  )
}

function CreamDecoration() {
  return (
    <>
      <div style={SERVICE_CARD_WAVE_CREAM} />
      <div style={SERVICE_CARD_GRAIN} />
    </>
  )
}

function InvestmentHeader() {
  return (
    <>
      <p
        style={{
          fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#E8703A',
          margin: '0 0 18px',
        }}
      >
        INVESTMENT + 12 MONTHS ALONGSIDE
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(36px, 4vw, 56px)',
          fontWeight: 500,
          lineHeight: 1.15,
          color: '#f5efe4',
          margin: 0,
          maxWidth: '520px',
        }}
      >
        We write the <span style={{ fontStyle: 'italic' }}>first cheque</span>, then stay close for a
        year.
      </h2>
    </>
  )
}

function InvestmentBody() {
  return (
    <>
      <p
        style={{
          fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          fontSize: '15px',
          lineHeight: 1.65,
          color: 'rgba(245, 239, 228, 0.85)',
          maxWidth: '560px',
          margin: '0 0 28px',
        }}
      >
        Capital is the door — the year that follows is the work. We help structure HK government
        grants, open hospital and university access, run regulatory pathways, and warm the next round
        well before you raise it. Plugged into Tigermed&apos;s CRO ecosystem from day one.
      </p>
      <div
        style={{
          borderTop: '1px solid rgba(245, 239, 228, 0.15)',
          paddingTop: '28px',
        }}
      >
        <div
          className="services-timeline-row"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px clamp(32px, 5vw, 56px)',
          }}
        >
          <TimelineCol label="MONTH 01">
            <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontStyle: 'italic' }}>
              Plan
            </span>{' '}
            set. Milestones agreed.
          </TimelineCol>
          <TimelineCol label="MID-YEAR">
            First{' '}
            <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontStyle: 'italic' }}>
              clinical pilot
            </span>{' '}
            or partnership live.
          </TimelineCol>
          <TimelineCol label="MONTH 12">
            Next round{' '}
            <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontStyle: 'italic' }}>
              warm
            </span>
            , data in hand.
          </TimelineCol>
        </div>
      </div>
    </>
  )
}

function ConsultingHeader() {
  return (
    <>
      <p
        style={{
          fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#888',
          margin: '0 0 18px',
        }}
      >
        CONSULTING
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(30px, 3.2vw, 44px)',
          fontWeight: 500,
          lineHeight: 1.2,
          color: '#1a1a1a',
          margin: 0,
        }}
      >
        For companies beyond our investment scope, the{' '}
        <span style={{ fontStyle: 'italic', color: '#2d3a35' }}>same door.</span>
      </h2>
    </>
  )
}

function ConsultingBody() {
  return (
    <p
      style={{
        fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
        fontSize: '15px',
        lineHeight: 1.65,
        color: '#1a1a1a',
        margin: 0,
        maxWidth: '620px',
      }}
    >
      On retainer, we run market entry, HK grant applications, hospital access, and partner
      introductions — for companies we&apos;d back if our mandate fit. Same operators, same network.
    </p>
  )
}

function TimelineCol({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ flex: '1 1 0', minWidth: '140px' }}>
      <p
        style={{
          fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#E8703A',
          margin: '0 0 12px',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          fontSize: '14px',
          lineHeight: 1.55,
          color: 'rgba(245, 239, 228, 0.92)',
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  )
}

const sectionBase = {
  borderRadius: '8px',
  minHeight: 'clamp(420px, 62vh, 640px)',
} as const

export default function ServicesCardStack() {
  return (
    <StickyTabs mainNavHeight={MAIN_NAV_HEIGHT} rootClassName="services-sticky-tabs">
      <StickyTabs.Item
        title={<InvestmentHeader />}
        decoration={<ForestDecoration />}
        sectionStyle={{ ...sectionBase, backgroundColor: FOREST, marginBottom: '24px' }}
        headerStyle={{ backgroundColor: FOREST, padding: headerPadding }}
        contentStyle={{ padding: contentPadding }}
      >
        <InvestmentBody />
      </StickyTabs.Item>

      <StickyTabs.Item
        title={<ConsultingHeader />}
        decoration={<CreamDecoration />}
        sectionStyle={{
          ...sectionBase,
          backgroundColor: CREAM_PANEL,
          border: '1px solid #d4cfc2',
        }}
        headerStyle={{ backgroundColor: CREAM_PANEL, padding: headerPadding }}
        contentStyle={{ padding: contentPadding }}
      >
        <ConsultingBody />
      </StickyTabs.Item>
    </StickyTabs>
  )
}
