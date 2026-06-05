import Link from 'next/link'
import { FILM_GRAIN_DATA_URI } from '@/lib/filmGrain'
import { PEBBLE_WAVE_LOGO } from '@/data/portfolioWatermark'

const CREAM = '#f5efe4'
const EMBER = '#E8703A'
const INK = '#1a1a1a'

type ForestCTAProps = {
  /** Full-viewport slide on homepage; padded section on services/contact. */
  embedded?: boolean
}

export default function ForestCTA({ embedded = false }: ForestCTAProps) {
  return (
    <section
      style={{
        background: '#2d3a35',
        padding: embedded ? '0 5vw' : 'clamp(80px, 10vw, 120px) 5vw',
        width: '100%',
        height: embedded ? '100vh' : 'auto',
        minHeight: embedded ? '100vh' : undefined,
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: embedded ? '-30vh' : '-12%',
          bottom: embedded ? '-14vh' : '-18%',
          width: embedded ? '114vh' : 'min(720px, 85vw)',
          height: embedded ? '105vh' : 'min(640px, 75vw)',
          backgroundColor: '#3a4a44',
          opacity: 0.19,
          WebkitMaskImage: `url(${PEBBLE_WAVE_LOGO})`,
          maskImage: `url(${PEBBLE_WAVE_LOGO})`,
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
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: FILM_GRAIN_DATA_URI,
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
            className="link-underline"
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
