'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  const scrollToNext = () => {
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
        padding: '0 5vw',
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
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
          An avalanche starts from one{' '}
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
          >
            pebble.
            <svg
              viewBox="0 0 340 100"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -51%) rotate(-2deg)',
                width: '118%',
                height: '200%',
                overflow: 'visible',
                pointerEvents: 'none',
              }}
            >
              <path
                className="hero-founders-draw"
                d="M 30,50 
       C 20,15 80,-5 170,2 
       C 260,8 325,20 328,50 
       C 331,78 265,98 170,96 
       C 75,94 40,85 30,50 Z"
                fill="none"
                stroke="#2D6A5A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 1100,
                  strokeDashoffset: 1100,
                  animation:
                    'drawOval 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards',
                  animationIterationCount: 1,
                  animationFillMode: 'forwards',
                }}
              />
            </svg>
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
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#2D6A5A',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            }}
          >
            Talk to Pebble
          </Link>
          <Link
            href="/consulting"
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
    </section>
  )
}
