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

type LabelPos = {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

type CityMarker = {
  id: string
  city: string
  longitude: number
  latitude: number
  // Anchor cities carry a permanent label; non-anchors only show their label
  // on hover (desktop) or tap (mobile). Both kinds use the same flat label
  // style ; the difference is just whether the label always renders.
  anchor: boolean
  // CSS pixels from dot center to the matching corner of the label.
  // For non-anchors the offset is tuned to point toward map center so the
  // revealed label stays inside the map frame at both breakpoints.
  labelPos: LabelPos
}

const CITIES: CityMarker[] = [
  // 4 anchors ; hand-tuned diverging offsets so the permanent labels never
  // collide with each other or with neighbouring dots at either breakpoint.
  { id: 'hongkong', city: 'Hong Kong', longitude: 114.17, latitude: 22.32, anchor: true, labelPos: { top: 10, left: 12 } },
  { id: 'macau', city: 'Macau', longitude: 113.54, latitude: 22.19, anchor: true, labelPos: { top: 10, right: 12 } },
  { id: 'shenzhen', city: 'Shenzhen', longitude: 114.06, latitude: 22.55, anchor: true, labelPos: { bottom: 10, left: 12 } },
  { id: 'guangzhou', city: 'Guangzhou', longitude: 113.26, latitude: 23.13, anchor: true, labelPos: { bottom: 10, right: 12 } },
  // 7 non-anchors ; each labelPos points toward map center (~113.45, 22.66)
  // so the revealed label can never escape the map frame on any side.
  { id: 'zhuhai', city: 'Zhuhai', longitude: 113.55, latitude: 22.27, anchor: false, labelPos: { bottom: 10, right: 12 } },
  { id: 'foshan', city: 'Foshan', longitude: 113.12, latitude: 23.02, anchor: false, labelPos: { top: 10, left: 12 } },
  { id: 'dongguan', city: 'Dongguan', longitude: 113.75, latitude: 23.02, anchor: false, labelPos: { top: 10, right: 12 } },
  { id: 'zhongshan', city: 'Zhongshan', longitude: 113.39, latitude: 22.52, anchor: false, labelPos: { bottom: 10, left: 12 } },
  { id: 'huizhou', city: 'Huizhou', longitude: 114.42, latitude: 23.11, anchor: false, labelPos: { top: 10, right: 12 } },
  { id: 'jiangmen', city: 'Jiangmen', longitude: 113.08, latitude: 22.58, anchor: false, labelPos: { top: 10, left: 12 } },
  { id: 'zhaoqing', city: 'Zhaoqing', longitude: 112.47, latitude: 23.05, anchor: false, labelPos: { top: 10, left: 12 } },
]

/** One flat label style for both permanent (anchor) and revealed (non-anchor) labels. */
const FLAT_LABEL_BASE: React.CSSProperties = {
  position: 'absolute',
  fontFamily: 'var(--font-cormorant), Georgia, serif',
  fontSize: '17px',
  fontWeight: 500,
  color: '#2d3a35',
  background: 'var(--color-canvas)',
  padding: '2px 8px',
  borderRadius: '2px',
  whiteSpace: 'nowrap',
  lineHeight: 1.2,
  pointerEvents: 'none',
}

function labelStyleFor(pos: LabelPos, revealed = false): React.CSSProperties {
  return {
    ...FLAT_LABEL_BASE,
    top: pos.top !== undefined ? `${pos.top}px` : undefined,
    bottom: pos.bottom !== undefined ? `${pos.bottom}px` : undefined,
    left: pos.left !== undefined ? `${pos.left}px` : undefined,
    right: pos.right !== undefined ? `${pos.right}px` : undefined,
    // Revealed labels get a tiny CSS fade-in; permanent labels render statically.
    animation: revealed ? 'gbaLabelReveal 160ms ease-out' : undefined,
  }
}

// 11 cities span ~1.95° lng × 0.94° lat ; wider than the previous 5,
// so both breakpoints now drive their frame from fitBounds over the full set.
const DESKTOP_FIT_PADDING = { top: 80, bottom: 80, left: 60, right: 60 } as const
const MOBILE_FIT_PADDING = { top: 70, bottom: 70, left: 50, right: 50 } as const

// Pre-fitBounds default ; replaced as soon as the map loads.
const INITIAL_VIEW = { longitude: 113.4, latitude: 22.65, zoom: 7.2 } as const

function cityCoordinateBounds(): [[number, number], [number, number]] {
  const lngs = CITIES.map((c) => c.longitude)
  const lats = CITIES.map((c) => c.latitude)
  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ]
}

const DOT_ORDER = CITIES.map((c) => c.id)

const MAP_STATS = [
  { number: '28', label: 'STARTUPS BACKED', color: '#5e7a6a' },
  { number: '39', label: 'COMPANIES ACCELERATED', color: '#5e7a6a' },
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
  // One source of truth for which non-anchor city is currently revealed.
  // Hover (desktop) and tap (mobile) both drive this ; guarantees only one
  // revealed label is visible at a time, so labels never pile up.
  const [activeCity, setActiveCity] = useState<string | null>(null)

  const sectionRef = useRef<HTMLElement | null>(null)
  const mapCardRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MapRef | null>(null)
  const dotRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const statNumberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const statsAnimated = useRef(false)
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(HOME_DESKTOP_MQ).matches : true
  )
  // Whether the device can hover (fine pointer). Used to gate the
  // onMouseEnter / onMouseLeave handlers so iPad-style touch devices don't
  // ghost-hover-then-toggle and immediately hide the label they just opened.
  // This is a capability query, not a viewport breakpoint ; the 768px gate
  // remains the single mobile/desktop layout switch.
  const [supportsHover, setSupportsHover] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia(HOME_DESKTOP_MQ)
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // TEMP DIAGNOSTIC: keep section height vs viewport live.
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setSupportsHover(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Tapping/clicking empty map clears any revealed label. Mapbox fires map.click
  // only for clicks that hit the canvas, NOT for clicks on Marker DOM children ;
  // so anchor/non-anchor dot interactions never trigger this clear.
  useEffect(() => {
    if (!mapReady) return
    const map = mapRef.current?.getMap()
    if (!map) return
    const clear = () => setActiveCity(null)
    map.on('click', clear)
    return () => {
      map.off('click', clear)
    }
  }, [mapReady])

  const applyMapFraming = useCallback(() => {
    const map = mapRef.current?.getMap()
    if (!map) return

    map.fitBounds(cityCoordinateBounds(), {
      padding: isDesktop ? DESKTOP_FIT_PADDING : MOBILE_FIT_PADDING,
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

    if (!container || dots.length === 0) return

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
          duration: 0.7,
          ease: 'power1.out',
          onComplete: () => {
            dot.style.willChange = 'auto'
          },
        },
        i * 0.08
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
        background: 'var(--color-canvas)',
        // Locked to one viewport like the other slides so the slideshow
        // advances in one wheel. vh-aware font clamps on H2/lede/stats
        // guarantee content fits the available inner area at 700vh+, so
        // "100%" never clips under the overflow:hidden ceiling.
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        padding: 'var(--space-page-top) var(--gutter-x) var(--space-section-y)',
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
            // No stretch / no min-height / no own justify ; the column hugs its
            // natural content height, and the row's alignItems:center vertically
            // centers this stacked block against the centered map.
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
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(18px, min(1.9vw, 2.8vh), 26px)',
                fontWeight: 400,
                color: '#2d3a35',
                lineHeight: 1.4,
                maxWidth: '520px',
                marginTop: '24px',
                marginBottom: 0,
              }}
            >
              Tiger Jade Pebble Accelerator (Pebble) is a boutique accelerator building the next
              generation of biomedical ventures across the Greater Bay Area.
            </p>
          </div>

          <div
            className="apac-map-stats"
            style={{
              // Natural height: stats stack with a fixed comfortable gap rather
              // than stretching to the column's extremes. The visible separation
              // from the body text above comes from marginTop, not flex:1.
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 'clamp(12px, 1.5vh, 20px)',
              marginTop: 'clamp(8px, 1.5vh, 24px)',
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
                    fontSize: 'clamp(40px, min(5vw, 8vh), 76px)',
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'safe center',
            gap: '10px',
          }}
        >
          <div
            ref={mapCardRef}
            className="apac-map-card"
            style={{
              position: 'relative',
              borderRadius: '10px',
              overflow: 'hidden',
              height: 'min(420px, calc(100vh - 300px))',
              width: '100%',
              border: '1px solid rgba(45, 58, 53, 0.14)',
            }}
          >
            {shouldLoadMap ? (
              <Map
                ref={mapRef}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/kh-chen/cmp6m5igl002001sc3g662ejb"
                initialViewState={INITIAL_VIEW}
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
                  const isActive = activeCity === m.id
                  const showLabel = m.anchor || isActive
                  return (
                    <Marker
                      key={m.id}
                      longitude={m.longitude}
                      latitude={m.latitude}
                      anchor="center"
                    >
                      {/* Zero-sized wrapper sits exactly on the coordinate.
                          Dot, hit zone, and label are absolutely positioned
                          relative to that point so the dot never drifts off
                          its city and the label offsets are pure CSS pixels. */}
                      <div
                        ref={(el) => {
                          dotRefs.current[m.id] = el
                        }}
                        style={{
                          position: 'relative',
                          width: 0,
                          height: 0,
                        }}
                      >
                        {/* Visible dot. Anchors keep the original full-weight
                            treatment; non-anchors render smaller + muted and
                            scale up to anchor weight when revealed. */}
                        <div
                          aria-hidden
                          className={`gba-dot ${m.anchor ? 'gba-dot--anchor' : 'gba-dot--quiet'} ${
                            !m.anchor && isActive ? 'gba-dot--active' : ''
                          }`}
                        />

                        {/* Hit zone for non-anchors only. Anchors are already
                            permanently labeled, so they don't need interaction. */}
                        {!m.anchor && (
                          <button
                            type="button"
                            aria-label={`Reveal ${m.city}`}
                            aria-pressed={isActive}
                            onMouseEnter={
                              supportsHover ? () => setActiveCity(m.id) : undefined
                            }
                            onMouseLeave={
                              supportsHover
                                ? () =>
                                    setActiveCity((prev) => (prev === m.id ? null : prev))
                                : undefined
                            }
                            onClick={(e) => {
                              // Stop bubbling to the map-card div so this tap
                              // is treated as a dot interaction, not a "tap
                              // empty map" clear.
                              e.stopPropagation()
                              setActiveCity((prev) => (prev === m.id ? null : m.id))
                            }}
                            className="gba-hit"
                          />
                        )}

                        {showLabel && (
                          <span style={labelStyleFor(m.labelPos, !m.anchor)}>{m.city}</span>
                        )}
                      </div>
                    </Marker>
                  )
                })}
              </Map>
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'var(--color-canvas)' }} aria-hidden />
            )}

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--color-canvas)',
                opacity: mapLoaded ? 0 : 1,
                pointerEvents: mapLoaded ? 'none' : 'auto',
                transition: 'opacity 0.8s ease',
              }}
              aria-hidden={mapLoaded}
            />
          </div>
          <p
            className="apac-map-caption"
            style={{
              margin: 0,
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#888',
              alignSelf: 'flex-start',
            }}
          >
            Greater Bay Area · 11 cities
          </p>
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

        /* === GBA dot + hit-zone + label === */
        .gba-dot {
          position: absolute;
          left: -6.5px;
          top: -6.5px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #2d3a35;
          box-sizing: content-box;
          pointer-events: none;
          transition: transform 200ms ease, opacity 200ms ease, border-color 200ms ease;
          border: 1.5px solid transparent;
        }
        .gba-dot--anchor {
          border-color: rgba(245, 239, 228, 0.95);
        }
        .gba-dot--quiet {
          /* ~78% of anchor size, near-solid opacity, same cream halo as
             anchors ; reads as a definite point, just visually subordinate
             to the labeled anchors. */
          transform: scale(0.78);
          opacity: 0.9;
          border-color: rgba(245, 239, 228, 0.95);
        }
        .gba-dot--quiet.gba-dot--active {
          /* On hover/tap, scale up to full anchor weight for feedback. */
          transform: scale(1);
          opacity: 1;
          border-color: rgba(245, 239, 228, 0.95);
        }
        .gba-hit {
          position: absolute;
          /* 24x24 touch / hover target centered on the dot. */
          left: -12px;
          top: -12px;
          width: 24px;
          height: 24px;
          padding: 0;
          margin: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          /* Sit above the dot so events reliably hit this element. */
          z-index: 2;
        }
        .gba-hit:focus-visible {
          outline: 2px solid #5e7a6a;
          outline-offset: 2px;
          border-radius: 50%;
        }
        @keyframes gbaLabelReveal {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gba-dot { transition: none; }
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
          background: var(--color-canvas);
          border: 1px solid rgba(45, 58, 53, 0.14);
          border-radius: 4px;
          padding: 6px 10px;
        }

        .apac-map-card .mapboxgl-ctrl-attrib-inner a {
          color: #888;
        }
      `}</style>
    </section>
  )
}

export default React.memo(GBAMap)
