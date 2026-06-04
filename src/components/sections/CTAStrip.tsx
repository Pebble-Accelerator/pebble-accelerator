import Link from 'next/link'

type CTAStripProps = {
  embedded?: boolean
}

const CREAM = '#f5efe4'
const EMBER = '#E8703A'
const INK = '#1a1a1a'

export default function CTAStrip({ embedded = false }: CTAStripProps) {
  // Homepage final slide: redesigned forest-green editorial CTA.
  if (embedded) {
    return (
      <section
        style={{
          background: '#2d3a35',
          padding: '0 5vw',
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Supersized wave-mark watermark (wordmark masked off), bleeding off the
            bottom-right. mask-size 400% + position 6.8%/46% isolates the glyph
            (x 5–30% of the 980px asset) and crops the wordmark (x ≥ 34%). */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: '-30vh',
            bottom: '-14vh',
            width: '114vh',
            height: '105vh',
            backgroundColor: '#3a4a44',
            opacity: 0.19,
            WebkitMaskImage: 'url(/logos/Pebble_Accelerator_Sideways_Logo_transparent_v2.png)',
            maskImage: 'url(/logos/Pebble_Accelerator_Sideways_Logo_transparent_v2.png)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '400%',
            maskSize: '400%',
            WebkitMaskPosition: '6.8% 46%',
            maskPosition: '6.8% 46%',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        {/* Subtle film grain across the slide. */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: '160px 160px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1280px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'clamp(40px, 4vw, 72px)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '1 1 52%', minWidth: '320px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(52px, 7vw, 96px)',
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                color: CREAM,
                margin: 0,
              }}
            >
              Every avalanche
              <br />
              starts
              <br />
              with one pebble.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(40px, 4.6vw, 64px)',
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: EMBER,
                margin: '0.3em 0 0',
              }}
            >
              Let&rsquo;s find yours.
            </p>
          </div>

          <div
            style={{
              flex: '0 1 38%',
              minWidth: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '32px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                fontSize: 'clamp(18px, 1.4vw, 20px)',
                lineHeight: 1.5,
                color: 'rgba(245,239,228,0.7)',
                margin: 0,
                maxWidth: '360px',
              }}
            >
              If your company has a path through Hong Kong, we&rsquo;ll usually know within one
              conversation.
            </p>

            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: EMBER,
                color: INK,
                fontSize: '15px',
                fontWeight: 600,
                padding: '16px 32px',
                border: 'none',
                borderRadius: '999px',
                letterSpacing: '0.02em',
                textDecoration: 'none',
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              }}
            >
              Apply now
              <span aria-hidden style={{ fontSize: '17px', lineHeight: 1 }}>
                &rarr;
              </span>
            </Link>

            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'rgba(245,239,228,0.2)',
              }}
            />

            <a
              href="mailto:hello@pebbleaccelerator.com"
              className="link-underline"
              style={{
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                fontSize: '15px',
                color: 'rgba(245,239,228,0.8)',
                textDecoration: 'none',
              }}
            >
              hello@pebbleaccelerator.com
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      style={{
        background: '#0f0f0f',
        padding: '120px 5vw',
        width: '100%',
        height: 'auto',
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
            fontSize: 'clamp(36px, 4vw, 56px)',
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
