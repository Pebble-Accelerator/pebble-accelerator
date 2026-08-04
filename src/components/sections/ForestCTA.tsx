import Link from 'next/link'
import { FILM_GRAIN_DATA_URI } from '@/lib/filmGrain'
import { PEBBLE_WAVE_LOGO } from '@/data/portfolioWatermark'

const CREAM = 'var(--color-canvas)'
const EMBER = 'var(--color-ember)'
const INK = 'var(--color-ink)'

/**
 * The `embedded` prop is gone. It existed only to switch this section between a
 * locked 100vh homepage slide and the padded section /consulting already used;
 * with the homepage on document scroll both call sites want the padded form.
 */
export default function ForestCTA() {
  return (
    <section
      className="forest-cta"
      style={{
        background: 'var(--color-slate-dark)',
        padding: 'clamp(80px, 10vw, 120px) 5vw',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        className="forest-cta-wave"
        style={{
          position: 'absolute',
          right: '-12%',
          bottom: '-18%',
          width: 'min(720px, 85vw)',
          height: 'min(640px, 75vw)',
          backgroundColor: 'var(--color-slate-dark)',
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
              fontStyle: 'italic',
              fontSize: 'clamp(56px, 7.4vw, 104px)',
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: EMBER,
              margin: 0,
            }}
          >
            Let&rsquo;s find yours.
          </h2>
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
              color: 'color-mix(in srgb, var(--color-canvas) 70%, transparent)',
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
              background: 'color-mix(in srgb, var(--color-canvas) 20%, transparent)',
            }}
          />

          <a
            href="mailto:pebbleadmin@tigerjadecapital.com"
            className="link-underline"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              fontSize: '15px',
              color: 'color-mix(in srgb, var(--color-canvas) 80%, transparent)',
              textDecoration: 'none',
            }}
          >
            pebbleadmin@tigerjadecapital.com
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .forest-cta-wave {
            right: auto !important;
            bottom: auto !important;
            left: 50% !important;
            top: 54% !important;
            transform: translate(-50%, -50%) !important;
            width: min(76vw, 300px) !important;
            height: min(54vw, 220px) !important;
            opacity: 0.1 !important;
            -webkit-mask-size: 100% !important;
            mask-size: 100% !important;
            -webkit-mask-position: center !important;
            mask-position: center !important;
          }
        }
      `}</style>
    </section>
  )
}
