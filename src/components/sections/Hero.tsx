'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      background: '#F5F0E8',
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: '60px',
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
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

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        paddingTop: '140px',
        paddingBottom: '100px',
        paddingLeft: '5vw',
        paddingRight: '5vw',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(48px, 6.5vw, 88px)',
            fontWeight: 400,
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
            color: '#0f0f0f',
            maxWidth: '860px',
            marginBottom: '36px',
            marginTop: 0,
          }}
        >
          We back the{' '}
          <span style={{ 
            position: 'relative', 
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}>
            founders
            <svg
              viewBox="0 0 340 100"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -51%) rotate(-2deg)',
                width: '130%',
                height: '220%',
                overflow: 'visible',
                pointerEvents: 'none',
              }}
            >
              <path
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
                  animation: 'drawOval 1.6s cubic-bezier(0.4,0,0.2,1) 0.6s forwards',
                }}
              />
            </svg>
          </span>
          {' '}<br />redefining medicine.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          style={{
            fontSize: '17px',
            fontWeight: 300,
            color: '#555',
            lineHeight: 1.8,
            maxWidth: '500px',
            marginBottom: '48px',
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          }}
        >
          Pebble is a boutique accelerator building Hong Kong into a global
          biomedical nexus — bridging the world&apos;s largest patient population
          with the capital and expertise to reach them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '36px' }}
        >
          <Link href="/portfolio" style={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#2D6A5A',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          }}>
            View portfolio
          </Link>
          <Link href="/consulting" style={{
            fontSize: '14px',
            color: '#888',
            fontWeight: 300,
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            textDecoration: 'none',
          }}>
            How we work →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
