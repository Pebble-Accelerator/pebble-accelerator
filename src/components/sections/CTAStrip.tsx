import Link from 'next/link'

type CTAStripProps = {
  embedded?: boolean
}

export default function CTAStrip({ embedded = false }: CTAStripProps) {
  return (
    <section
      style={{
        background: '#0f0f0f',
        padding: embedded ? '0 5vw' : '120px 5vw',
        width: '100%',
        height: embedded ? '100vh' : 'auto',
        minHeight: embedded ? '100vh' : undefined,
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '64px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: embedded ? 'clamp(36px, 5vw, 64px)' : 'clamp(36px, 4vw, 56px)',
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            maxWidth: '520px',
            margin: 0,
          }}
        >
          Building something that changes medicine?
        </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'flex-start',
            gap: '20px',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            }}
          >
            hello@pebbleaccelerator.com
          </span>
          <Link
            href="/contact"
            style={{
              background: '#ffffff',
              color: '#0f0f0f',
              fontSize: '13px',
              fontWeight: 500,
              padding: '14px 36px',
              border: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              display: 'inline-block',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            }}
          >
            Apply now
          </Link>
        </div>
      </div>
    </section>
  )
}
