import type { CSSProperties } from 'react'
import { hashSeed, mulberry32 } from '@/lib/ripple'

type Props = {
  /** Deterministic seed so the ring spacing is unique but consistent. */
  seed: string
  /** Stroke colour (default: faint cream, for dark grounds). */
  color?: string
  /** Base opacity of the field. */
  opacity?: number
  style?: CSSProperties
}

/** Square viewBox so the concentric rings stay circular and centred. */
const VB = 400

/**
 * A concentric ripple that radiates from the CENTRE of its own box — the point of
 * impact is always visible. The consumer sizes and positions this element so the
 * centre lands on a real anchor (e.g. the Saltagen logo card), giving the motif a
 * visible origin rather than cropped arcs. Pure static inline SVG (no filters,
 * blend, or animation) so it is cheap and never affects scroll performance.
 */
export default function SectionRipple({
  seed,
  color = 'color-mix(in srgb, var(--color-canvas) 9%, transparent)',
  opacity = 1,
  style,
}: Props) {
  const rng = mulberry32(hashSeed(seed))
  const count = 6 + Math.floor(rng() * 2) // 6–7 rings
  const spacing = VB * (0.088 + rng() * 0.022) // rings fill + slightly overflow the box
  const radii = Array.from({ length: count }, (_, i) => (i + 1) * spacing)
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox={`0 0 ${VB} ${VB}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
        ...style,
      }}
    >
      {radii.map((r, i) => (
        <circle
          key={i}
          cx={VB / 2}
          cy={VB / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={1.3}
          // Inner rings strongest; softening as they spread outward.
          opacity={Math.max(0.25, 1 - i / (count + 1))}
        />
      ))}
    </svg>
  )
}
