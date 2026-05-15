'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Map, { Marker, Popup } from 'react-map-gl/mapbox'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import Stats from './Stats'

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

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const introRef = useRef<HTMLDivElement | null>(null)
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
    const intro = introRef.current
    const dots = DOT_ORDER.map((id) => dotRefs.current[id]).filter(
      Boolean
    ) as HTMLDivElement[]

    if (!container || dots.length !== DOT_ORDER.length) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const triggers: ScrollTrigger[] = []

    if (prefersReduced || reduced) {
      if (intro) gsap.set(intro, { opacity: 1, x: 0 })
      gsap.set(dots, { opacity: 1, scale: 1 })
      return
    }

    if (intro) gsap.set(intro, { opacity: 0, x: -16, willChange: 'transform' })
    gsap.set(dots, { opacity: 0, scale: 0, willChange: 'transform' })

    const tl = gsap.timeline({
      delay: 0.1,
      scrollTrigger: {
        trigger: container,
        scroller: '.snap-container',
        start: 'center 80%',
        once: true,
      },
    })

    if (intro) {
      tl.to(
        intro,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power1.out',
          onComplete: () => {
            intro.style.willChange = 'auto'
          },
        },
        0
      )
    }

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
      className="snap-section apac-corridor-fullbleed"
      style={{
        background: '#f5efe4',
        padding: 0,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <div
        ref={mapContainerRef}
        className="apac-map"
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: '#f5efe4',
        }}
        onClick={() => setActiveCity(null)}
      >
        {shouldLoadMap ? (
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/kh-chen/cmp6m5igl002001sc3g662ejb"
            initialViewState={{
              longitude: 113.85,
              latitude: 22.6,
              zoom: 8.5,
            }}
            style={{ width: '100%', height: '100%', background: '#f5efe4' }}
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
                onClick={(e) => {
                  e.originalEvent.stopPropagation()
                  setActiveCity((prev) => (prev === m.id ? null : m.id))
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '14px',
                    height: '14px',
                    cursor: 'pointer',
                    zIndex: 30,
                  }}
                >
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
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#2d3a35',
                      border: '2px solid #ffffff',
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

        <div className="gba-stats-band">
          <p ref={introRef} className="gba-stats-band__intro">
            Pebble is built at the center of Asia&apos;s biomedical corridor — where 1.4 billion
            patients, world-class clinical infrastructure, and tier-one capital converge.
          </p>
          <Stats />
        </div>

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
          .gba-city-popup .mapboxgl-popup-content {
            padding: 0;
            background: transparent;
            box-shadow: none;
            z-index: 50;
          }
          .gba-city-popup .mapboxgl-popup-tip {
            display: none;
          }
          .gba-stats-band {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 20;
            padding: 28px 5vw 24px;
            background: rgba(245, 239, 228, 0.92);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-sizing: border-box;
          }
          .gba-stats-band .stats-overlay {
            position: static;
            bottom: auto;
            left: auto;
            right: auto;
            z-index: auto;
            padding: 0;
            background: transparent;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
          .gba-stats-band__intro {
            font-family: var(--font-cormorant), Georgia, serif;
            font-size: 28px;
            font-weight: 600;
            line-height: 1.3;
            color: #e8703a;
            max-width: 680px;
            text-align: left;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(212, 207, 194, 0.6);
            margin: 0 0 20px;
          }
          @media (max-width: 768px) {
            .gba-stats-band {
              padding: 20px 24px 18px;
            }
            .gba-stats-band__intro {
              font-size: 17px;
            }
            .gba-stats-band .stats-number {
              font-size: 48px;
            }
            .gba-stats-band .stats-label {
              font-size: 9px;
            }
          }
        `}</style>
      </div>
    </section>
  )
}

export default React.memo(GBAMap)
