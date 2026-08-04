import PortfolioEditorial from '@/components/portfolio/PortfolioEditorial'

export const metadata = {
  title: 'Portfolio · Pebble Accelerator',
  description: 'Companies backed and accelerated by Pebble.',
}

export default function PortfolioPage() {
  return (
    // A div, not <main> — layout.tsx already provides the page's <main>
    // landmark. Same bug as /consulting had (fixed earlier); this route
    // wasn't touched in that pass.
    <div style={{ backgroundColor: 'var(--color-canvas)' }}>
      <PortfolioEditorial />
    </div>
  )
}
