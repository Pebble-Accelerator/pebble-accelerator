import type { CSSProperties } from 'react'
import type { Company } from '@/types'

/** Tiles are now light — watermark reads as a muted dark/forest tonal mark. */
export const WATERMARK_MARK = '#2d3a35'
export const WATERMARK_OPACITY = 0.2

/** Dark tonal filter for colour PNGs so logos read quietly on light tiles. */
export const WATERMARK_LOGO_FILTER = 'grayscale(100%) brightness(0.32) contrast(1.05)'

/** Fixed top-right box — identical on every tile (24px inset, 92px box). */
export const WATERMARK_BOX_STYLE: CSSProperties = {
  position: 'absolute',
  top: 24,
  right: 24,
  width: 92,
  height: 92,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  zIndex: 1,
}

/** Pebble brand wave glyph (same asset as CTA slide / favicon source). */
export const PEBBLE_WAVE_LOGO = '/logos/Pebble_Accelerator_Sideways_Logo_transparent_v2.png'

/**
 * Monogram instead of logo in the top-right box — no file, wrong asset, or extreme
 * wide wordmark illegible at 96px (prefer monogram over shrunk lockup text).
 */
export const MONOGRAM_ONLY_SLUGS = new Set([
  'smt',
  'pacegenix',
  'great-bay-bio',
  'endiatx',
  'valora',
  'phase-scientific',
  'egglogics',
])

export function monogramFromName(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

/** Real logo in box when portfolio file is wired and not monogram-only. */
export function usesTileLogo(company: Company): boolean {
  return Boolean(company.logo && !MONOGRAM_ONLY_SLUGS.has(company.slug))
}
