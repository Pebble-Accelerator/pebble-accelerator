/**
 * Tailwind `md`. The single mobile/desktop layout switch used by both CSS and JS
 * (`@media (max-width: 767px)` in globals.css is its complement).
 *
 * Previously lived in `homeSlideshow.ts` as HOME_DESKTOP_MQ, where it doubled as
 * the scroll-hijack gate. The hijack is gone; this is now purely a layout query.
 */
export const DESKTOP_MQ = '(min-width: 768px)'
