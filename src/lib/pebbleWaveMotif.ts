import type { CSSProperties } from 'react'
import { PEBBLE_WAVE_LOGO } from '@/data/portfolioWatermark'

export type PebbleWaveVariant = 'back' | 'front'

/**
 * Tone-on-tone Pebble wave layered at two depths for strata dimensionality:
 * a larger/fainter back layer + a smaller/slightly-stronger front layer.
 * `tone` should be the tile colour darkened ~8–14% so it reads as sediment, not a stamp.
 */
export function pebbleWaveLayer(tone: string, variant: PebbleWaveVariant): CSSProperties {
  const isBack = variant === 'back'
  return {
    position: 'absolute',
    right: isBack ? '2%' : '11%',
    top: isBack ? '26%' : '41%',
    width: isBack ? '80%' : '52%',
    height: isBack ? '90%' : '62%',
    backgroundColor: tone,
    opacity: isBack ? 0.05 : 0.085,
    WebkitMaskImage: `url(${PEBBLE_WAVE_LOGO})`,
    maskImage: `url(${PEBBLE_WAVE_LOGO})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: isBack ? '420%' : '340%',
    maskSize: isBack ? '420%' : '340%',
    WebkitMaskPosition: '6.8% 46%',
    maskPosition: '6.8% 46%',
    pointerEvents: 'none',
    zIndex: 0,
  }
}
