import SectionLabelLine from '@/components/ui/SectionLabelLine'

type WhyHKProps = {
  embedded?: boolean
}

export default function WhyHK({ embedded = false }: WhyHKProps) {
  const pillars = [
    "Access to China's 1.4B patient population",
    'HK government grants & regulatory pathways',
    'Bridge to global institutional capital',
    'Deep clinical network across APAC',
  ]

  return (
    <section
      style={{
        background: '#F5F0E8',
        padding: embedded ? '0 5vw' : '120px 5vw',
        width: '100%',
        height: embedded ? '100%' : 'auto',
        display: embedded ? 'flex' : 'block',
        alignItems: embedded ? 'center' : undefined,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: embedded ? '64px' : '120px',
          alignItems: embedded ? 'center' : 'start',
        }}
      >
        <div>
          <SectionLabelLine marginBottom="32px">
            <span
              style={{
                fontSize: '11px',
                color: '#aaa',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                flexShrink: 0,
              }}
            >
              Why Hong Kong
            </span>
          </SectionLabelLine>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: embedded ? 'clamp(32px, 3.5vw, 48px)' : 'clamp(28px, 3vw, 38px)',
              fontWeight: 500,
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
              color: '#0f0f0f',
              marginBottom: embedded ? '16px' : '24px',
              marginTop: 0,
            }}
          >
            Building Hong Kong into the world&apos;s biomedical nexus.
          </h2>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: '#555',
              lineHeight: 1.85,
              margin: 0,
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            }}
          >
            HK&apos;s regulatory environment, proximity to the world&apos;s largest patient pool,
            and integration into global capital markets create a compounding advantage for every
            company we back.
          </p>
        </div>
        <div
          style={
            embedded
              ? {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }
              : { paddingTop: '56px' }
          }
        >
          {pillars.map((p, i) => (
            <div
              key={i}
              style={{
                padding: embedded ? '0 0 20px' : '20px 0',
                borderBottom: embedded && i === pillars.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.08)',
                borderTop: !embedded && i === 0 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                fontSize: '15px',
                fontWeight: 300,
                color: '#333',
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                ...(embedded && i === pillars.length - 1 ? { paddingBottom: 0 } : {}),
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
