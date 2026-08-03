import CTAStrip from '@/components/sections/CTAStrip'
import ServicesEditorial from '@/components/services/ServicesEditorial'

export const metadata = {
  title: 'Services · Pebble Accelerator',
  description:
    'Primary investment and secondary consulting for biomedical companies in the Greater Bay Area.',
}

export default function ServicesPage() {
  return (
    <>
      <div className="services-page-main" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <ServicesEditorial />
      </div>
      <div className="services-page-cta" style={{ position: 'relative', zIndex: 3 }}>
        <CTAStrip />
      </div>
    </>
  )
}
