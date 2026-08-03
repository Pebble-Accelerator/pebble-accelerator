'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import { useEffect, useRef, useState } from 'react'
import Map, { AttributionControl } from 'react-map-gl/mapbox'
import type { MapEvent } from 'react-map-gl/mapbox'
import { gsap } from 'gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/** Same GBA terrain style as the map slide, reused as full-bleed atmosphere. */
const HERO_MAP_STYLE = 'mapbox://styles/kh-chen/cmp6m5igl002001sc3g662ejb'
/** Wider, lower-zoom framing of the delta so terrain interest carries across the
 *  full width. */
const HERO_VIEW = { longitude: 113.75, latitude: 22.55, zoom: 7.7 } as const

/**
 * Full-bleed atmospheric background behind the Hero. The GBA terrain map is
 * stripped to terrain only (no labels/pins), heavily desaturated + darkened +
 * blurred, and distorted by an animated feTurbulence + feDisplacementMap so its
 * pixels drift like light through water. That map IS the ambient layer — there is
 * no separate ripple field (a second ambient layer competed with the map and read
 * as a stray light streak). The ground derives from the single dark token
 * (--color-slate-dark); a deep forest overlay keeps it atmospheric, not flat
 * green. Motion freezes under prefers-reduced-motion. Degrades to the dark ground
 * without a token.
 */
export default function HeroAtmosphere() {
  const reduced = usePrefersReducedMotion()
  const [mounted, setMounted] = useState(false)
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  const rootRef = useRef<HTMLDivElement>(null)
  const turbRef = useRef<SVGFETurbulenceElement>(null)
  const dispRef = useRef<SVGFEDisplacementMapElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Strip every label / icon / dot layer so only terrain remains.
  const handleMapLoad = (e: MapEvent) => {
    const map = e.target
    const layers = map.getStyle()?.layers ?? []
    for (const layer of layers) {
      if (layer.type === 'symbol' || layer.type === 'circle') {
        try {
          map.setLayoutProperty(layer.id, 'visibility', 'none')
        } catch {
          /* layer may be immutable in some styles; ignore */
        }
      }
    }
  }

  useEffect(() => {
    if (!mounted || reduced) return
    // Slow water distortion — morph the turbulence + displacement so the map
    // pixels warp. Two mismatched durations read as organic. This is the hero's
    // only ambient motion.
    const ctx = gsap.context(() => {
      if (turbRef.current) {
        gsap.to(turbRef.current, {
          attr: { baseFrequency: 0.016 },
          duration: 17,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }
      if (dispRef.current) {
        gsap.to(dispRef.current, {
          attr: { scale: 26 },
          duration: 19,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }
    }, rootRef)

    return () => ctx.revert()
  }, [mounted, reduced])

  return (
    <div className="hero-atmosphere" ref={rootRef}>
      {/* Filter defs (zero-size host). */}
      <svg className="hero-atmosphere__defs" width="0" height="0" aria-hidden focusable="false">
        <defs>
          <filter
            id="hero-water"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.008"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale={14}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {mounted && token && (
        <div className="hero-atmosphere__map">
          <Map
            mapboxAccessToken={token}
            mapStyle={HERO_MAP_STYLE}
            initialViewState={HERO_VIEW}
            style={{ width: '100%', height: '100%' }}
            interactive={false}
            attributionControl={false}
            logoPosition="bottom-left"
            onLoad={handleMapLoad}
          >
            <AttributionControl compact position="bottom-right" />
          </Map>
        </div>
      )}

      <div className="hero-atmosphere__overlay" aria-hidden />

      <style>{`
        .hero-atmosphere {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          /* Single dark ground token (SaltaGen forest). Depth comes from the map
             + the deep overlay below, not from a near-black base. */
          background: var(--color-slate-dark);
        }

        .hero-atmosphere__defs {
          position: absolute;
          width: 0;
          height: 0;
          pointer-events: none;
        }

        .hero-atmosphere__map {
          position: absolute;
          /* Oversize so the displacement never reveals an edge. */
          inset: -10%;
          /* Water displacement, then blur + heavy desaturation + darkening so no
             road or label is individually readable — pure atmosphere. */
          filter: url(#hero-water) blur(2.5px) saturate(0.24) brightness(0.55) contrast(0.95);
        }

        .hero-atmosphere__overlay {
          position: absolute;
          inset: 0;
          /* Deep forest scrim (a darkened form of the slate token) — left-weighted
             for the headline + a vertical vignette. Keeps the hero deep and
             atmospheric rather than a flat mid-green. */
          background:
            linear-gradient(90deg, rgba(15,21,18,0.92) 0%, rgba(15,21,18,0.68) 50%, rgba(15,21,18,0.52) 100%),
            linear-gradient(180deg, rgba(15,21,18,0.44) 0%, rgba(15,21,18,0.24) 40%, rgba(15,21,18,0.68) 100%);
        }
      `}</style>
    </div>
  )
}
