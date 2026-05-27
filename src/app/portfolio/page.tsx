import PortfolioEditorial from '@/components/portfolio/PortfolioEditorial'

export const metadata = {
  title: 'Portfolio — Pebble Accelerator',
  description: 'Companies backed and accelerated by Pebble.',
}

export default function PortfolioPage() {
  return (
    <main style={{ backgroundColor: '#f5efe4', paddingTop: '60px' }}>
      <PortfolioEditorial />
    </main>
  )
}
