'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const GBAMap = dynamic(() => import('./GBAMap'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '600px' }} aria-hidden />,
})

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoadMap, setShouldLoadMap] = useState(false)

  useEffect(() => {
    if (shouldLoadMap) return
    const observer = new IntersectionObserver(
      ([entry]) => entry?.isIntersecting && setShouldLoadMap(true),
      { rootMargin: '500px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [shouldLoadMap])

  return (
    <section
      className="apac-corridor-fullbleed"
      style={{
        background: '#F5F0E8',
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        ref={sectionRef}
        className="apac-map-wrap"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '600px',
        }}
      >
        <div className="apac-intro" style={{
          position: 'absolute',
          top: '48px',
          left: '48px',
          right: 'auto',
          zIndex: 10,
          maxWidth: '360px',
          color: '#0f0f0f',
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontWeight: 500,
          fontSize: '32px',
          lineHeight: 1.35,
          pointerEvents: 'none',
        }}>
          Pebble is built where it matters most. The Greater Bay Area connects 1.4 billion
          patients, world-class clinical infrastructure, and tier-one capital — all within a single hour.
        </div>

        {shouldLoadMap ? <GBAMap /> : <div style={{ minHeight: '600px' }} aria-hidden />}

        <style>{`
          @media (max-width: 768px) {
            .apac-intro {
              position: relative !important;
              top: auto !important;
              left: auto !important;
              max-width: none !important;
              padding: 24px !important;
              font-size: 24px !important;
              z-index: 2 !important;
            }
            .apac-map { height: 560px !important; }
            .apac-map-wrap { min-height: 0 !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
