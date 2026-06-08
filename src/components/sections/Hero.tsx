'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Link from 'next/link'

const PEBBLE_PATH_D =
  'M 16 50 C 8 36, 18 20, 64 14 C 104 8, 158 10, 204 18 C 234 26, 242 42, 236 58 C 228 74, 188 86, 122 88 C 60 88, 24 76, 16 50 Z'

// Hero-only headline reveal: each line rises + fades, staggered. Fires once on
// mount (Hero never unmounts, so returning to slide 0 does not replay) and
// coexists with the pebble stroke draw-on + ripple animations.
const headlineContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
}
const headlineLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Hero() {
  const pebblePathRef = useRef<SVGPathElement>(null)
  const reduceMotion = useReducedMotion()

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
        justifyContent: 'center',
        // Top reserve = fixed nav (64px) + comfortable breathing room.
        // Asymmetric (top > bottom) gives the headline clear space below the nav
        // while keeping the chevron near the bottom of the slide.
        padding: 'clamp(112px, 16vh, 160px) 5vw clamp(48px, 6vh, 96px)',
        boxSizing: 'border-box',
        overflow: 'visible',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle
              key={i}
              cx="920"
              cy="640"
              r={900}
              fill="none"
              stroke="rgba(45,106,90,0.35)"
              strokeWidth={1.8}
              style={{
                animation: `rippleExpand 14s linear ${-(i * 2)}s infinite`,
                transformOrigin: '920px 640px',
              }}
            />
          ))}
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <motion.h1
          variants={reduceMotion ? undefined : headlineContainer}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? false : 'visible'}
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(52px, 8vw, 104px)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#1a1a1a',
            maxWidth: '900px',
            margin: 0,
          }}
        >
          <motion.span
            variants={reduceMotion ? undefined : headlineLine}
            style={{ display: 'block' }}
          >
            An avalanche starts from one
          </motion.span>
          <motion.span
            variants={reduceMotion ? undefined : headlineLine}
            style={{ display: 'block' }}
          >
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
                    stroke="#5e7a6a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className="hero-pebble-text-stack"
                  style={{
                    position: 'relative',
                    display: 'inline-grid',
                    gridTemplateAreas: '"stack"',
                    zIndex: 1,
                  }}
                >
                  <span className="hero-pebble-halo" aria-hidden>
                    pebble
                  </span>
                  <span className="hero-pebble-word">pebble</span>
                </span>
              </span>
              <span className="hero-headline-period">.</span>
            </span>
          </motion.span>
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
            color: '#2d3a35',
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
            fontWeight: 300,
            color: '#555',
            lineHeight: 1.8,
            maxWidth: '560px',
            marginTop: '20px',
            marginBottom: 0,
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          }}
        >
          Pebble is a boutique accelerator building Hong Kong into a global biomedical nexus —
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
              color: '#2D6A5A',
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
              color: '#888',
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
            stroke="#2d3a35"
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

        .hero-pebble-halo,
        .hero-pebble-word {
          grid-area: stack;
          font: inherit;
          letter-spacing: inherit;
          line-height: inherit;
        }

        .hero-pebble-halo {
          z-index: 1;
          pointer-events: none;
          user-select: none;
          color: transparent;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 8px #f5efe4;
          paint-order: stroke;
        }

        .hero-pebble-word {
          position: relative;
          z-index: 2;
          color: #1a1a1a;
        }

        .hero-headline-period {
          flex-shrink: 0;
          /* Stone right overflow (~0.24em at 1.1 scale) + tight punctuation gap */
          margin-left: calc(0.32em + 8px);
          font: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          color: #1a1a1a;
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
            animation: heroPebbleDraw 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
          }
        }
      `}</style>
    </section>
  )
}
