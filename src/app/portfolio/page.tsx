import Portfolio from '@/components/sections/Portfolio'

export const metadata = {
  title: 'Portfolio — Pebble Accelerator',
  description: 'Companies backed and accelerated by Pebble.',
}

export default function PortfolioPage() {
  return (
    <main style={{ backgroundColor: '#f5efe4', paddingTop: '60px' }}>

      {/* Hero */}
      <section style={{
        backgroundColor: '#f5efe4',
        padding: '80px 5vw 80px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#888',
            marginBottom: '20px',
          }}>
            Portfolio
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#0f0f0f',
            maxWidth: '720px',
            marginBottom: '20px',
          }}>
            18+ companies building<br />
            the future of medicine.
          </h1>
          <p style={{
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            fontSize: '15px',
            fontWeight: 300,
            color: '#888',
            maxWidth: '480px',
            lineHeight: 1.6,
          }}>
            Backed, accelerated, and scaled across the Greater Bay Area.
          </p>
        </div>
      </section>

      {/* Portfolio grid + sediment rows */}
      <Portfolio />

    </main>
  )
}
