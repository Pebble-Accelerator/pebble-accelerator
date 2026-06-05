import type { CSSProperties } from 'react'
import { FILM_GRAIN_DATA_URI } from '@/lib/filmGrain'
import { PEBBLE_WAVE_LOGO } from '@/data/portfolioWatermark'

const waveBase: CSSProperties = {
  position: 'absolute',
  right: '6%',
  top: '28%',
  width: '58%',
  height: '68%',
  WebkitMaskImage: `url(${PEBBLE_WAVE_LOGO})`,
  maskImage: `url(${PEBBLE_WAVE_LOGO})`,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: '380%',
  maskSize: '380%',
  WebkitMaskPosition: '6.8% 46%',
  maskPosition: '6.8% 46%',
  pointerEvents: 'none',
  zIndex: 0,
}

export const SERVICE_CARD_WAVE_FOREST: CSSProperties = {
  ...waveBase,
  backgroundColor: 'rgba(245, 239, 228, 0.55)',
  opacity: 0.06,
}

export const SERVICE_CARD_WAVE_CREAM: CSSProperties = {
  ...waveBase,
  backgroundColor: 'rgba(45, 58, 53, 0.45)',
  opacity: 0.06,
}

export const SERVICE_CARD_GRAIN: CSSProperties = {
  position: 'absolute',
  inset: 0,
  opacity: 0.05,
  backgroundImage: FILM_GRAIN_DATA_URI,
  backgroundSize: '160px 160px',
  pointerEvents: 'none',
  zIndex: 1,
}
