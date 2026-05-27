import CTAStrip from '@/components/sections/CTAStrip'
import ServicesEditorial from '@/components/services/ServicesEditorial'

export const metadata = {
  title: 'Services — Pebble Accelerator',
  description:
    'Primary investment and secondary consulting for biomedical companies in the Greater Bay Area.',
}

export default function ServicesPage() {
  return (
    <>
      <main style={{ backgroundColor: '#f5efe4' }}>
        <ServicesEditorial />
      </main>
      <CTAStrip />
    </>
  )
}
