'use client'

import { useEffect, useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useScrollEntranceMode } from '@/hooks/useScrollEntranceMode'

type CityMarker = {
  id: string
  city: string
  role: string
  stat: string
  coordinates: [number, number]
}

export default function GBAMap() {
  const reduced = usePrefersReducedMotion()
  const { ref: sectionRef, mode } = useScrollEntranceMode(!reduced)
  const animate = !reduced && mode === 'animate'

  const geographyUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json'
  const guangdongGeoJsonUrl = 'https://geo.datav.aliyun.com/areas_v3/bound/440000_full.json'

  const markers: CityMarker[] = useMemo(
    () => [
      {
        id: 'hongkong',
        city: 'Hong Kong',
        role: 'Pebble HQ',
        stat: 'Capital + global access',
        coordinates: [114.155, 22.285],
      },
      {
        id: 'shenzhen',
        city: 'Shenzhen',
        role: 'Manufacturing scale-up',
        stat: '200+ biotech firms',
        coordinates: [114.06, 22.54],
      },
      {
        id: 'guangzhou',
        city: 'Guangzhou',
        role: 'Clinical trials hub',
        stat: 'Top-tier hospital network',
        coordinates: [113.45, 23.05],
      },
      {
        id: 'macau',
        city: 'Macau',
        role: 'Regulatory bridge',
        stat: 'China–EU pathways',
        coordinates: [113.5, 22.16],
      },
      {
        id: 'zhuhai',
        city: 'Zhuhai',
        role: 'Biotech parks',
        stat: 'Hengqin innovation zone',
        coordinates: [113.58, 22.27],
      },
    ],
    []
  )

  const [activeCity, setActiveCity] = useState<string | null>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCity(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div
      ref={sectionRef as any}
      className="apac-map"
      style={{
        width: '100%',
        height: '600px',
        opacity: animate ? 0 : 1,
        ...(animate && !reduced ? { animation: 'apacMapIn 600ms ease forwards' } : {}),
        position: 'relative',
        zIndex: 20,
      }}
      onClick={() => setActiveCity(null)}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [113.85, 22.65], scale: 22000 }}
        width={1000}
        height={600}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={geographyUrl}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: '#5e7a6a',
                      fillOpacity: 0.18,
                      stroke: '#4a6555',
                      strokeWidth: 0.7,
                      outline: 'none',
                    },
                    hover: {
                      fill: '#5e7a6a',
                      fillOpacity: 0.28,
                      stroke: '#4a6555',
                      strokeWidth: 0.7,
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#5e7a6a',
                      fillOpacity: 0.28,
                      stroke: '#4a6555',
                      strokeWidth: 0.7,
                      outline: 'none',
                    },
                  }}
                />
              ))}
            </>
          )}
        </Geographies>

        <Geographies geography={guangdongGeoJsonUrl}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: 'transparent',
                      stroke: '#6b8474',
                      strokeWidth: 0.4,
                      strokeDasharray: '2,2',
                      outline: 'none',
                    },
                    hover: {
                      fill: 'transparent',
                      stroke: '#6b8474',
                      strokeWidth: 0.4,
                      strokeDasharray: '2,2',
                      outline: 'none',
                    },
                    pressed: {
                      fill: 'transparent',
                      stroke: '#6b8474',
                      strokeWidth: 0.4,
                      strokeDasharray: '2,2',
                      outline: 'none',
                    },
                  }}
                />
              ))}

              {markers.map((m, idx) => {
                const isNearRight = m.coordinates[0] > 112
                const isNearTop = m.id === 'guangzhou' || m.coordinates[1] > 22.95
                const markerDelayMs = 600 + idx * 80
                const showCard = activeCity === m.id
                const cardOffset = m.id === 'guangzhou' ? 16 : 10
                const shouldFlipLeft = m.id !== 'guangzhou' && isNearRight

                return (
                  <Marker key={m.id} coordinates={m.coordinates}>
                    <g
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveCity((prev) => (prev === m.id ? null : m.id))
                      }}
                      style={{
                        opacity: animate ? 0 : 1,
                        ...(animate && !reduced
                          ? {
                              animation: `apacMarkerIn 240ms ease forwards`,
                              animationDelay: `${markerDelayMs}ms`,
                            }
                          : {}),
                      }}
                    >
                      <circle
                        r={14}
                        fill="rgba(94, 122, 106, 0.15)"
                        opacity={0.25}
                        style={{ pointerEvents: 'all' }}
                      >
                        {reduced ? null : (
                          <>
                            <animate
                              attributeName="r"
                              values="14;22.4"
                              dur="2.5s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              values="0.25;0"
                              dur="2.5s"
                              repeatCount="indefinite"
                            />
                          </>
                        )}
                      </circle>
                      <circle r={7} fill="#2d3a35" stroke="#ffffff" strokeWidth={1.5} />
                    </g>

                    <foreignObject
                      width={280}
                      height={160}
                      x={shouldFlipLeft ? -(280 + cardOffset) : cardOffset}
                      y={isNearTop ? cardOffset : -(132 + cardOffset)}
                      style={{
                        overflow: 'visible',
                        pointerEvents: 'none',
                        opacity: showCard ? 1 : 0,
                        transition: reduced
                          ? 'none'
                          : showCard
                            ? 'opacity 200ms ease, transform 200ms ease'
                            : 'opacity 150ms ease, transform 150ms ease',
                        transform: showCard ? 'translateY(0px)' : `translateY(${isNearTop ? '-6px' : '6px'})`,
                        visibility: showCard ? 'visible' : 'hidden',
                      }}
                    >
                      <div
                        style={{
                          background: '#ffffff',
                          border: '1px solid #d4d4d0',
                          borderRadius: '6px',
                          padding: '14px 16px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          pointerEvents: 'none',
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
                          {m.city}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: '#888',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                            marginBottom: '10px',
                          }}
                        >
                          {m.role}
                        </div>
                        <div
                          style={{
                            fontSize: '14px',
                            color: '#555',
                            fontWeight: 300,
                            lineHeight: 1.45,
                            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                          }}
                        >
                          {m.stat}
                        </div>
                      </div>
                    </foreignObject>
                  </Marker>
                )
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes apacMapIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes apacMarkerIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
    </div>
  )
}

