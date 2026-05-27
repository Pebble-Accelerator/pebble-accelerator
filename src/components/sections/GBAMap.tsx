'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Map, { Marker } from 'react-map-gl/mapbox'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type CityMarker = {
  id: string
  city: string
  longitude: number
  latitude: number
  labelSide?: 'left' | 'right'
}

const CITIES: CityMarker[] = [
  { id: 'guangzhou', city: 'Guangzhou', longitude: 113.45, latitude: 23.05 },
  { id: 'shenzhen', city: 'Shenzhen', longitude: 114.06, latitude: 22.54 },
  {
    id: 'hongkong',
    city: 'Hong Kong',
    longitude: 114.155,
    latitude: 22.285,
    labelSide: 'left',
  },
  { id: 'macau', city: 'Macau', longitude: 113.5, latitude: 22.16 },
  { id: 'zhuhai', city: 'Zhuhai', longitude: 113.58, latitude: 22.27 },
]

const DOT_ORDER = ['guangzhou', 'shenzhen', 'hongkong', 'macau', 'zhuhai'] as const

const MAP_STATS = [
  { number: '18+', label: 'Companies Financed' },
  { number: '30+', label: 'Companies Accelerated' },
  { number: '100%', label: 'HK Hospital Coverage' },
]

function GBAMap() {
  const reduced = usePrefersReducedMotion()
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [shouldLoadMap, setShouldLoadMap] = useState(false)

  const sectionRef = useRef<HTMLElement | null>(null)
  const mapCardRef = useRef<HTMLDivElement | null>(null)
  const dotRefs = useRef<Record<string, HTMLDivElement | null>>({})

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

  useEffect(() => {
    if (!mapReady || !shouldLoadMap) return

    const container = mapCardRef.current
    const dots = DOT_ORDER.map((id) => dotRefs.current[id]).filter(Boolean) as HTMLDivElement[]

    if (!container || dots.length !== DOT_ORDER.length) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const triggers: ScrollTrigger[] = []

    if (prefersReduced || reduced) {
      gsap.set(dots, { opacity: 1, scale: 1 })
      return
    }

    gsap.set(dots, { opacity: 0, scale: 0, willChange: 'transform' })

    const snapScroller = document.querySelector('.snap-container')
    if (!snapScroller) return

    const tl = gsap.timeline({
      delay: 0.1,
      scrollTrigger: {
        trigger: container,
        scroller: snapScroller,
        start: 'top 95%',
        once: true,
      },
    })

    dots.forEach((dot, i) => {
      tl.to(
        dot,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power1.out',
          onComplete: () => {
            dot.style.willChange = 'auto'
          },
        },
        i * 0.15
      )
    })

    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [mapReady, reduced, shouldLoadMap])

  return (
    <section
      ref={sectionRef}
      className="apac-map"
      style={{
        background: '#f5efe4',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            flex: '0 0 40%',
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 0 0 5vw',
            boxSizing: 'border-box',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              fontSize: '10px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#888',
              margin: '0 0 24px',
            }}
          >
            Greater Bay Area
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '36px',
              fontWeight: 500,
              lineHeight: 1.25,
              color: '#1a1a1a',
              maxWidth: '340px',
              margin: 0,
            }}
          >
            Pebble is built at the center of Asia&apos;s biomedical corridor.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              color: '#666',
              lineHeight: 1.7,
              maxWidth: '320px',
              marginTop: '16px',
              marginBottom: 0,
            }}
          >
            Where 1.4 billion patients, world-class clinical infrastructure, and tier-one capital
            converge within a 90-minute radius.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '40px',
            }}
          >
            {MAP_STATS.map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '32px',
                    fontWeight: 500,
                    color: '#0f0f0f',
                    lineHeight: 1,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    marginTop: '4px',
                    fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                    fontSize: '10px',
                    fontWeight: 400,
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            flex: '0 0 60%',
            width: '60%',
            padding: '24px 5vw 24px 24px',
            boxSizing: 'border-box',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            ref={mapCardRef}
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              height: 'calc(100vh - 48px)',
              width: '100%',
              border: '1px solid #d4cfc2',
              boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
            }}
          >
            {shouldLoadMap ? (
              <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/kh-chen/cmp6m5igl002001sc3g662ejb"
                initialViewState={{
                  longitude: 113.9,
                  latitude: 22.5,
                  zoom: 7.8,
                }}
                style={{ width: '100%', height: '100%' }}
                reuseMaps
                dragPan={false}
                dragRotate={false}
                scrollZoom={false}
                touchZoomRotate={false}
                doubleClickZoom={false}
                keyboard={false}
                attributionControl
                onLoad={() => {
                  setMapLoaded(true)
                  setMapReady(true)
                }}
              >
                {CITIES.map((m) => {
                  const labelOnLeft = m.labelSide === 'left'
                  return (
                    <Marker
                      key={m.id}
                      longitude={m.longitude}
                      latitude={m.latitude}
                      anchor="center"
                    >
                      <div
                        ref={(el) => {
                          dotRefs.current[m.id] = el
                        }}
                        style={{
                          display: 'flex',
                          flexDirection: labelOnLeft ? 'row-reverse' : 'row',
                          alignItems: 'center',
                          gap: '6px',
                          transform: labelOnLeft ? 'translateX(-50%)' : 'translateX(4px)',
                        }}
                      >
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#2d3a35',
                            border: '1.5px solid white',
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#1a1a1a',
                            background: 'rgba(245,239,228,0.85)',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            whiteSpace: 'nowrap',
                            lineHeight: 1.2,
                          }}
                        >
                          {m.city}
                        </span>
                      </div>
                    </Marker>
                  )
                })}
              </Map>
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#f5efe4' }} aria-hidden />
            )}

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#f5efe4',
                opacity: mapLoaded ? 0 : 1,
                pointerEvents: mapLoaded ? 'none' : 'auto',
                transition: 'opacity 0.8s ease',
              }}
              aria-hidden={mapLoaded}
            />
          </div>
        </div>
      </div>

      <style>{`
        .apac-map .mapboxgl-marker {
          z-index: 10;
        }
      `}</style>
    </section>
  )
}

export default React.memo(GBAMap)
