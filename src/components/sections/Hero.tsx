'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const heroStats = [
  { number: '18+', label: 'Companies Financed' },
  { number: '30+', label: 'Companies Accelerated' },
  {
    number: '100%',
    label: "Coverage of Hong Kong's Hospitals and universities",
  },
]

export default function Hero() {
  const scrollToStats = () => {
    const wrapper = document.querySelector('.hero-snap-wrapper') as HTMLElement | null
    const stats = document.getElementById('hero-stats')
    if (wrapper && stats) {
      const top = stats.offsetTop - 24
      wrapper.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero-section"
      className="hero-section"
      style={{
        position: 'relative',
        background: '#F5F0E8',
        minHeight: '100vh',
        boxSizing: 'border-box',
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

      <div
        style={{
          paddingTop: '64px',
          paddingBottom: '120px',
          paddingLeft: '5vw',
          paddingRight: '5vw',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
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

        <button
          type="button"
          className="hero-scroll-chevron"
          aria-label="Scroll to stats"
          onClick={scrollToStats}
          style={{
            display: 'block',
            position: 'sticky',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            lineHeight: 0,
            marginTop: '48px',
            marginBottom: '8px',
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

        <div
          id="hero-stats"
          className="hero-stats"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            marginTop: '80px',
            width: '100%',
            maxWidth: '1280px',
          }}
        >
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className="hero-stats__item"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: i === 0 ? '0 48px 0 0' : '0 48px',
                borderRight: i < heroStats.length - 1 ? '1px solid #d4cfc2' : 'none',
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '72px',
                  fontWeight: 500,
                  color: '#0f0f0f',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}
              >
                {stat.number}
              </span>
              <span
                style={{
                  marginTop: '8px',
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  color: '#999',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
