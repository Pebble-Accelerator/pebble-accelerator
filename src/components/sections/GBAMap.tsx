'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Map, { Marker, Popup } from 'react-map-gl/mapbox'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type CityMarker = {
  id: string
  city: string
  role: string
  stat: string
  longitude: number
  latitude: number
}

const CITIES: CityMarker[] = [
  {
    id: 'guangzhou',
    city: 'Guangzhou',
    role: 'Clinical trials hub',
    stat: 'Top-tier hospital network',
    longitude: 113.45,
    latitude: 23.05,
  },
  {
    id: 'shenzhen',
    city: 'Shenzhen',
    role: 'Manufacturing scale-up',
    stat: '200+ biotech firms',
    longitude: 114.06,
    latitude: 22.54,
  },
  {
    id: 'hongkong',
    city: 'Hong Kong',
    role: 'Pebble HQ',
    stat: 'Capital + global access',
    longitude: 114.155,
    latitude: 22.285,
  },
  {
    id: 'macau',
    city: 'Macau',
    role: 'Regulatory bridge',
    stat: 'China-EU pathways',
    longitude: 113.5,
    latitude: 22.16,
  },
  {
    id: 'zhuhai',
    city: 'Zhuhai',
    role: 'Biotech parks',
    stat: 'Hengqin innovation zone',
    longitude: 113.58,
    latitude: 22.27,
  },
]

const DOT_ORDER = ['guangzhou', 'shenzhen', 'hongkong', 'macau', 'zhuhai'] as const

function GBAMap() {
  const reduced = usePrefersReducedMotion()
  const [activeCity, setActiveCity] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [shouldLoadMap, setShouldLoadMap] = useState(false)

  const sectionRef = useRef<HTMLElement | null>(null)
  const mapContainerRef = useRef<HTMLElement | null>(null)
  const dotRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const active = CITIES.find((c) => c.id === activeCity)

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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCity(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!mapReady || !shouldLoadMap) return

    const container = mapContainerRef.current
    const dots = DOT_ORDER.map((id) => dotRefs.current[id]).filter(
      Boolean
    ) as HTMLDivElement[]

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
      ref={(el) => {
        sectionRef.current = el
        mapContainerRef.current = el
      }}
      className="snap-section apac-corridor-fullbleed apac-map"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '100vh',
        overflow: 'hidden',
        width: '100%',
        background: '#f5efe4',
        boxSizing: 'border-box',
      }}
      onClick={() => setActiveCity(null)}
    >
      <div
        className="apac-map-layer"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
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
            onClick={() => setActiveCity(null)}
          >
            {CITIES.map((m) => (
              <Marker
                key={m.id}
                longitude={m.longitude}
                latitude={m.latitude}
                anchor="center"
                style={{ cursor: 'pointer' }}
              >
                <div style={{ position: 'relative', width: '14px', height: '14px' }}>
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(94, 122, 106, 0.12)',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                      animation: reduced ? 'none' : 'pulseHalo 2.5s ease-out infinite',
                    }}
                  />
                  <div
                    ref={(el) => {
                      dotRefs.current[m.id] = el
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveCity((prev) => (prev === m.id ? null : m.id))
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.stopPropagation()
                        setActiveCity((prev) => (prev === m.id ? null : m.id))
                      }
                    }}
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#2d3a35',
                      border: '2px solid white',
                      cursor: 'pointer',
                      position: 'relative',
                      zIndex: 30,
                    }}
                  />
                </div>
              </Marker>
            ))}

            {active ? (
              <Popup
                longitude={active.longitude}
                latitude={active.latitude}
                anchor="bottom"
                offset={12}
                closeButton={false}
                closeOnClick={false}
                className="gba-city-popup"
              >
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #d4d4d0',
                    borderRadius: '6px',
                    padding: '14px 16px',
                    minWidth: '200px',
                    position: 'relative',
                    zIndex: 50,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontWeight: 500,
                      fontSize: '18px',
                      lineHeight: 1.15,
                      color: '#0f0f0f',
                      marginBottom: '6px',
                    }}
                  >
                    {active.city}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                      fontSize: '11px',
                      color: '#888',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '10px',
                    }}
                  >
                    {active.role}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                      fontSize: '14px',
                      color: '#555',
                      fontWeight: 300,
                      lineHeight: 1.45,
                    }}
                  >
                    {active.stat}
                  </div>
                </div>
              </Popup>
            ) : null}
          </Map>
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#f5efe4' }} aria-hidden />
        )}
      </div>

      <div
        className="apac-map-intro"
        style={{
          position: 'absolute',
          top: '80px',
          left: '48px',
          zIndex: 25,
          maxWidth: '520px',
          pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '36px',
            fontWeight: 700,
            lineHeight: 1.25,
            color: '#1a1a1a',
            textShadow: '0 2px 16px rgba(245,239,228,0.9)',
            margin: 0,
          }}
        >
          Pebble is built at the center of Asia&apos;s biomedical corridor — where 1.4 billion
          patients, world-class clinical infrastructure, and tier-one capital converge.
        </p>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          background: '#f5efe4',
          opacity: mapLoaded ? 0 : 1,
          pointerEvents: mapLoaded ? 'none' : 'auto',
          transition: 'opacity 0.8s ease',
        }}
        aria-hidden={mapLoaded}
      />

      <style>{`
        @keyframes pulseHalo {
          0% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.8);
          }
        }
        .apac-map .mapboxgl-marker {
          z-index: 30;
          pointer-events: auto;
        }
        .gba-city-popup.mapboxgl-popup {
          z-index: 40;
        }
        .gba-city-popup .mapboxgl-popup-content {
          padding: 0;
          background: transparent;
          box-shadow: none;
          z-index: 50;
        }
        .gba-city-popup .mapboxgl-popup-tip {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default React.memo(GBAMap)
