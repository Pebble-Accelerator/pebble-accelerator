/** Tailwind `md` — slideshow + slide viewport lock apply at this width and up only. */
export const HOME_DESKTOP_MQ = '(min-width: 768px)'

/** Slideshow active only on desktop with motion allowed (same gate as HomeScrollController). */
export function isHomeSlideshowActive(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return window.matchMedia(HOME_DESKTOP_MQ).matches
}

/** Scroll surface for homepage GSAP/IO — `.snap-container` when hijacked, else viewport (null root). */
export function getHomeScrollScroller(): HTMLElement | undefined {
  if (!isHomeSlideshowActive()) return undefined
  return document.querySelector<HTMLElement>('.snap-container') ?? undefined
}
