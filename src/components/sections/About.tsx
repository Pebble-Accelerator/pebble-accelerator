'use client'

import { useEffect, useRef, useState } from 'react'
import GBAMap from './GBAMap'

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoadMap, setShouldLoadMap] = useState(false)

  useEffect(() => {
    if (shouldLoadMap) return
    const snapContainer = document.querySelector('.snap-container')
    const observer = new IntersectionObserver(
      ([entry]) => entry?.isIntersecting && setShouldLoadMap(true),
      {
        root: snapContainer instanceof HTMLElement ? snapContainer : null,
        rootMargin: '250px',
      }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [shouldLoadMap])

  return (
    <section
      className="snap-section apac-corridor-fullbleed"
      style={{
        background: '#f5efe4',
        padding: 0,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <div
        ref={sectionRef}
        className="apac-map-wrap"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '100%',
          background: '#f5efe4',
        }}
      >
        {shouldLoadMap ? (
          <GBAMap />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#f5efe4' }} aria-hidden />
        )}

        <style>{`
          @media (max-width: 768px) {
            .apac-intro {
              position: relative !important;
              top: auto !important;
              left: auto !important;
              max-width: 100% !important;
              padding: 24px !important;
              font-size: 22px !important;
              z-index: 2 !important;
            }
            .apac-map-wrap {
              min-height: 0 !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
