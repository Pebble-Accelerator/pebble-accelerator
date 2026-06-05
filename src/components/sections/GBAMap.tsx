'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Map, { AttributionControl, Marker } from 'react-map-gl/mapbox'
import type { MapRef } from 'react-map-gl/mapbox'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { getHomeScrollScroller, HOME_DESKTOP_MQ } from '@/lib/homeSlideshow'

gsap.registerPlugin(ScrollTrigger)

type CityMarker = {
  id: string
  city: string
  longitude: number
  latitude: number
  labelSide?: 'left' | 'right'
  labelOffset?: { x: number; y: number }
}

const CITIES: CityMarker[] = [
  { id: 'guangzhou', city: 'Guangzhou', longitude: 113.45, latitude: 23.05 },
  { id: 'shenzhen', city: 'Shenzhen', longitude: 114.06, latitude: 22.54 },
  {
    id: 'hongkong',
    city: 'Hong Kong',
    longitude: 114.155,
    latitude: 22.285,
    labelSide: 'right',
    labelOffset: { x: 10, y: 6 },
  },
  {
    id: 'macau',
    city: 'Macau',
    longitude: 113.5,
    latitude: 22.16,
    labelSide: 'left',
    labelOffset: { x: -18, y: 24 },
  },
  {
    id: 'zhuhai',
    city: 'Zhuhai',
    longitude: 113.58,
    latitude: 22.27,
    labelSide: 'right',
    labelOffset: { x: 14, y: -20 },
  },
]

const DESKTOP_MAP_VIEW = {
  longitude: 113.9,
  latitude: 22.5,
  zoom: 7.8,
} as const

const MOBILE_FIT_PADDING = { top: 56, bottom: 56, left: 44, right: 44 } as const

function cityCoordinateBounds(): [[number, number], [number, number]] {
  const lngs = CITIES.map((c) => c.longitude)
  const lats = CITIES.map((c) => c.latitude)
  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ]
}

const DOT_ORDER = ['guangzhou', 'shenzhen', 'hongkong', 'macau', 'zhuhai'] as const

const MAP_STATS = [
  { number: '28+', label: 'COMPANIES BACKED', color: '#5e7a6a' },
  { number: '3', label: 'FIELDS OF MEDICINE', color: '#5e7a6a' },
  { number: '100%', label: 'HK HOSPITAL COVERAGE', color: '#E8703A' },
] as const

/** Split a stat string into its numeric target and trailing suffix (e.g. "28+" → 28, "+"). */
function parseStat(value: string): { target: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/)
  return { target: match ? parseInt(match[1], 10) : 0, suffix: match ? match[2] : '' }
}

function GBAMap() {
  const reduced = usePrefersReducedMotion()
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [shouldLoadMap, setShouldLoadMap] = useState(false)

  const sectionRef = useRef<HTMLElement | null>(null)
  const mapCardRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MapRef | null>(null)
  const dotRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const statNumberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const statsAnimated = useRef(false)
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(HOME_DESKTOP_MQ).matches : true
  )

  useEffect(() => {
    const mq = window.matchMedia(HOME_DESKTOP_MQ)
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const applyMapFraming = useCallback(() => {
    const map = mapRef.current?.getMap()
    if (!map) return

    if (isDesktop) {
      map.jumpTo({
        center: [DESKTOP_MAP_VIEW.longitude, DESKTOP_MAP_VIEW.latitude],
        zoom: DESKTOP_MAP_VIEW.zoom,
      })
      return
    }

    map.fitBounds(cityCoordinateBounds(), {
      padding: MOBILE_FIT_PADDING,
      duration: 0,
    })
  }, [isDesktop])

  useEffect(() => {
    if (!mapReady) return
    applyMapFraming()
  }, [mapReady, applyMapFraming])

  useEffect(() => {
    if (shouldLoadMap) return
    const snapScroller = getHomeScrollScroller()
    const observer = new IntersectionObserver(
      ([entry]) => entry?.isIntersecting && setShouldLoadMap(true),
      {
        root: snapScroller ?? null,
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

    const snapScroller = getHomeScrollScroller()

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

  // Count-up on the GBA stats: fires once when the slide enters view (guarded so
  // revisiting the slide in the slideshow never replays). Reduced-motion shows the
  // final values immediately (no observer, no count-up).
  useEffect(() => {
    if (statsAnimated.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || reduced) return

    const target = sectionRef.current
    if (!target) return
    const snapScroller = getHomeScrollScroller()

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || statsAnimated.current) return
        statsAnimated.current = true

        MAP_STATS.forEach((stat, i) => {
          const el = statNumberRefs.current[i]
          if (!el) return
          const { target: end, suffix } = parseStat(stat.number)
          const counter = { value: 0 }
          el.textContent = `0${suffix}`
          gsap.to(counter, {
            value: end,
            duration: 1.35,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${Math.round(counter.value)}${suffix}`
            },
            // Snap to the exact source string at the end (preserves "28+", "100%", etc.).
            onComplete: () => {
              el.textContent = stat.number
            },
          })
        })

        observer.disconnect()
      },
      {
        root: snapScroller ?? null,
        threshold: 0.35,
      }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      className="apac-map"
      style={{
        background: '#f5efe4',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5vw',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        className="apac-map-layout"
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 'clamp(48px, 5vw, 72px)',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="apac-map-copy"
          style={{
            flex: '0 0 40%',
            maxWidth: '40%',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'stretch',
            minHeight: 'min(560px, calc(100vh - 140px))',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(40px, 4.2vw, 64px)',
                fontWeight: 500,
                lineHeight: 1.07,
                letterSpacing: '-0.02em',
                color: '#1a1a1a',
                margin: 0,
              }}
            >
              <span style={{ fontWeight: 500, fontStyle: 'normal', color: '#1a1a1a' }}>
                Pebble is built at the center of Asia&apos;s{' '}
              </span>
              <span style={{ fontWeight: 500, fontStyle: 'italic', color: '#5e7a6a' }}>
                biomedical corridor.
              </span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 300,
                color: '#1a1a1a',
                lineHeight: 1.7,
                maxWidth: '460px',
                marginTop: '18px',
                marginBottom: 0,
              }}
            >
              Where 1.4 billion patients, world-class clinical infrastructure, and tier-one capital
              converge within a 90-minute radius.
            </p>
          </div>

          <div
            className="apac-map-stats"
            style={{
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginTop: 'clamp(24px, 3vh, 40px)',
              paddingTop: 'clamp(20px, 2.5vh, 32px)',
              width: '100%',
            }}
          >
            {MAP_STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  gap: '18px',
                  maxWidth: '100%',
                }}
              >
                <span
                  ref={(el) => {
                    statNumberRefs.current[i] = el
                  }}
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(48px, 5vw, 76px)',
                    fontWeight: 500,
                    color: stat.color,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {stat.number}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 400,
                    color: '#888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    lineHeight: 1.2,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="apac-map-mapcol"
          style={{
            flex: '1 1 58%',
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            ref={mapCardRef}
            className="apac-map-card"
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              height: 'min(560px, calc(100vh - 140px))',
              width: '100%',
              border: '1px solid #d4cfc2',
              boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
            }}
          >
            {shouldLoadMap ? (
              <Map
                ref={mapRef}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/kh-chen/cmp6m5igl002001sc3g662ejb"
                initialViewState={DESKTOP_MAP_VIEW}
                style={{ width: '100%', height: '100%' }}
                reuseMaps
                dragPan={false}
                dragRotate={false}
                scrollZoom={false}
                touchZoomRotate={false}
                doubleClickZoom={false}
                keyboard={false}
                attributionControl={false}
                logoPosition="bottom-left"
                onLoad={() => {
                  setMapLoaded(true)
                  setMapReady(true)
                }}
              >
                <AttributionControl compact position="bottom-right" />
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
                          transform: `translate(${m.labelOffset?.x ?? (labelOnLeft ? -50 : 4)}px, ${
                            m.labelOffset?.y ?? 0
                          }px)`,
                        }}
                      >
                        <div
                          style={{
                            width: '11px',
                            height: '11px',
                            borderRadius: '50%',
                            background: '#2d3a35',
                            border: '1.5px solid rgba(245,239,228,0.95)',
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                            fontSize: '17px',
                            fontWeight: 500,
                            color: '#1a1a1a',
                            background: 'rgba(245,239,228,0.95)',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
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
        @media (max-width: 767px) {
          .apac-map-card {
            height: 500px !important;
          }
        }

        .apac-map .mapboxgl-marker {
          z-index: 10;
        }

        .apac-map-card .mapboxgl-ctrl-bottom-left,
        .apac-map-card .mapboxgl-ctrl-bottom-right {
          z-index: 2;
        }

        .apac-map-card .mapboxgl-ctrl-logo {
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .apac-map-card .mapboxgl-ctrl-logo:hover {
          opacity: 1;
        }

        .apac-map-card .mapboxgl-ctrl-attrib {
          background: transparent;
          margin: 8px;
        }

        .apac-map-card .mapboxgl-ctrl-attrib.mapboxgl-compact {
          min-height: 24px;
        }

        .apac-map-card .mapboxgl-ctrl-attrib-button {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: rgba(245, 239, 228, 0.85);
          border: 1px solid #d4cfc2;
          box-shadow: none;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .apac-map-card .mapboxgl-ctrl-attrib-button:hover {
          background-color: rgba(245, 239, 228, 1);
          border-color: #888;
        }

        .apac-map-card .mapboxgl-ctrl-attrib-button:focus-visible {
          outline: 2px solid #5e7a6a;
          outline-offset: 2px;
        }

        .apac-map-card .mapboxgl-ctrl-attrib-inner {
          font-family: var(--font-ibm-plex-sans), system-ui, sans-serif;
          font-size: 11px;
          color: #888;
          background: #f5efe4;
          border: 1px solid #d4cfc2;
          border-radius: 4px;
          padding: 6px 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .apac-map-card .mapboxgl-ctrl-attrib-inner a {
          color: #888;
        }
      `}</style>
    </section>
  )
}

export default React.memo(GBAMap)
