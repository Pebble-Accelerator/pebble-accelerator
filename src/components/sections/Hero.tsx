'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import HeroAtmosphere from '@/components/sections/HeroAtmosphere'

const PEBBLE_PATH_D =
  'M 16 50 C 8 36, 18 20, 64 14 C 104 8, 158 10, 204 18 C 234 26, 242 42, 236 58 C 228 74, 188 86, 122 88 C 60 88, 24 76, 16 50 Z'

// Headline entrance is a single quiet reveal: the whole block fades in and rises
// ~12px once over ~500ms, then holds completely still — no per-line or per-word
// motion. Fires once on mount (Hero never unmounts, so returning to slide 0 does
// not replay) and coexists with the atmospheric background drift + stroke-draw.
const REVEAL_DURATION = 0.5
const REVEAL_RISE = 12
// The green ellipse on "pebble" draws on just after the block settles, so it reads
// as a quiet finishing touch rather than a separate flourish.
const ELLIPSE_DELAY = 0.55

export default function Hero() {
  const pebblePathRef = useRef<SVGPathElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const path = pebblePathRef.current
    if (!path) return

    const length = Math.ceil(path.getTotalLength())
    path.style.strokeDasharray = `${length}`
    path.style.setProperty('--hero-pebble-len', `${length}`)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      path.style.strokeDashoffset = '0'
      return
    }

    path.style.strokeDashoffset = `${length}`
  }, [])

  const scrollToNext = () => {
    // Prefer the slideshow controller (GSAP glide) when it's active.
    if (typeof window !== 'undefined' && window.__homeSlideshow) {
      window.__homeSlideshow.advance(1)
      return
    }
    // Fallback for reduced-motion / controller absent: native instant jump.
    const container = document.querySelector('.snap-container') as HTMLElement | null
    const heroWrapper = document.querySelector('.hero-snap-wrapper')
    const nextSlide = heroWrapper?.nextElementSibling as HTMLElement | null
    if (container && nextSlide) {
      const containerTop = container.getBoundingClientRect().top
      const slideTop = nextSlide.getBoundingClientRect().top
      const top = container.scrollTop + (slideTop - containerTop)
      container.scrollTo({ top })
    }
  }

  return (
    <section
      id="hero-section"
      className="hero-section"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'safe center',
        // Top reserve = fixed nav (64px) + comfortable breathing room.
        // Asymmetric (top > bottom) gives the headline clear space below the nav
        // while keeping the chevron near the bottom of the slide.
        padding: 'clamp(112px, 16vh, 160px) 5vw clamp(48px, 6vh, 96px)',
        boxSizing: 'border-box',
        overflow: 'visible',
      }}
    >
      <HeroAtmosphere />

      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: REVEAL_RISE }}
          animate={reduced ? false : { opacity: 1, y: 0 }}
          transition={reduced ? undefined : { duration: REVEAL_DURATION, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(52px, 8vw, 104px)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--color-canvas)',
            maxWidth: '900px',
            margin: 0,
          }}
        >
          {/* Opening lines — light but dimmed so the eye is pulled to the focal
              word over the atmospheric background. No per-line motion; the whole
              block reveals together as one quiet fade + rise. */}
          <span style={{ display: 'block', color: 'color-mix(in srgb, var(--color-canvas) 84%, transparent)' }}>
            An avalanche starts from one
          </span>
          {/* "pebble." — the single focal point: darkest ink, heavier weight, and
              the green ellipse. */}
          <span style={{ display: 'block' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'baseline',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  isolation: 'isolate',
                }}
              >
                <svg
                  viewBox="0 0 248 96"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    zIndex: 0,
                    width: 'calc(100% + 0.44em)',
                    height: 'calc(1em + 0.3em)',
                    overflow: 'visible',
                    pointerEvents: 'none',
                    transformOrigin: 'center center',
                    transform: 'translate(-50%, -50%) rotate(-1deg) scale(1.1)',
                  }}
                >
                  <path
                    ref={pebblePathRef}
                    className="hero-founders-draw hero-pebble-draw"
                    d={PEBBLE_PATH_D}
                    fill="none"
                    stroke="var(--color-sage)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className="hero-pebble-text-stack"
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    zIndex: 1,
                  }}
                >
                  <span className="hero-pebble-word">pebble</span>
                </span>
              </span>
              <span className="hero-headline-period">.</span>
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '22px',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'color-mix(in srgb, var(--color-canvas) 92%, transparent)',
            lineHeight: 1.4,
            marginTop: '24px',
            marginBottom: 0,
            maxWidth: '900px',
          }}
        >
          Ideas that change the world start in a lab.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
          style={{
            fontSize: '15px',
            fontWeight: 400,
            color: 'color-mix(in srgb, var(--color-canvas) 92%, transparent)',
            lineHeight: 1.8,
            maxWidth: '560px',
            marginTop: '20px',
            marginBottom: 0,
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          }}
        >
          Pebble is a boutique accelerator building Hong Kong into a global biomedical nexus,
          bridging the world&apos;s largest patient population with the capital and expertise to
          reach them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '36px',
            marginTop: '36px',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/contact"
            className="link-underline"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-sage-light)',
              textDecoration: 'none',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            }}
          >
            Talk to Pebble
          </Link>
          <Link
            href="/consulting"
            className="link-underline"
            style={{
              fontSize: '12px',
              color: 'color-mix(in srgb, var(--color-canvas) 60%, transparent)',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              textDecoration: 'none',
            }}
          >
            How we work →
          </Link>
        </motion.div>
      </div>

      <button
        type="button"
        className="hero-scroll-chevron"
        aria-label="Scroll to next section"
        onClick={scrollToNext}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          padding: 0,
          cursor: 'pointer',
          lineHeight: 0,
          outline: 'none',
          border: 'none',
          background: 'transparent',
          appearance: 'none',
          WebkitAppearance: 'none',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="color-mix(in srgb, var(--color-canvas) 70%, transparent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <style>{`
        .hero-pebble-text-stack {
          font: inherit;
          letter-spacing: inherit;
        }

        /* "pebble." is the focal point: heavier weight than the opening lines and
           the brightest ink (near-white over the dark atmosphere). font:inherit
           resets weight to the h1's 500, so the font-weight override must come
           after it. The stroke halo was removed — on the dark water it read as a
           hollow sticker outline, and the light glyphs already sit cleanly over
           the green ellipse behind them. */
        .hero-pebble-text-stack {
          font-weight: 600;
        }

        .hero-pebble-word {
          font: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          font-weight: 600;
          position: relative;
          z-index: 2;
          color: var(--color-canvas);
        }

        .hero-headline-period {
          flex-shrink: 0;
          /* Stone right overflow (~0.24em at 1.1 scale) + tight punctuation gap */
          margin-left: calc(0.32em + 8px);
          font: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          font-weight: 600;
          color: var(--color-canvas);
        }

        @media (prefers-reduced-motion: no-preference) {
          @keyframes heroPebbleDraw {
            from {
              stroke-dashoffset: var(--hero-pebble-len, 900);
            }
            to {
              stroke-dashoffset: 0;
            }
          }

          .hero-pebble-draw {
            animation: heroPebbleDraw 1.4s cubic-bezier(0.4, 0, 0.2, 1) ${ELLIPSE_DELAY}s forwards;
          }
        }
      `}</style>
    </section>
  )
}
