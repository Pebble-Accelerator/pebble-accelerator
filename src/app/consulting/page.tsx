import CTAStrip from '@/components/sections/CTAStrip'
import ServicesEditorial from '@/components/services/ServicesEditorial'

export const metadata = {
  title: 'Services · Pebble Accelerator',
  description:
    'Primary investment and secondary consulting for biomedical companies in the Greater Bay Area.',
}

export default function ConsultingPage() {
  return (
    <>
      {/* A plain div, not <main> — layout.tsx already provides the page's <main>
          landmark; a second nested <main> here was invalid HTML and a duplicate
          a11y landmark. `.services-page-main` also carries a CSS hook
          (globals.css:61, html:has(.services-page-main)) that fixes a sticky
          positioning conflict — this route silently lacked it before. */}
      <div className="services-page-main" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <ServicesEditorial />
      </div>
      <div className="services-page-cta" style={{ position: 'relative', zIndex: 3 }}>
        <CTAStrip />
      </div>
    </>
  )
}
