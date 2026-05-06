export default function Stats() {
  const stats = [
    { number: '18+', label: 'Companies Financed' },
    { number: '30+', label: 'Companies Accelerated' },
    { number: '100m', label: 'Patient Pool by 2030' },
  ]

  return (
    <section style={{ background: '#ffffff', padding: '0 5vw' }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            padding: '72px 48px 72px 0',
            borderRight: i < 2 ? '1px solid rgba(0,0,0,0.08)' : 'none',
            paddingLeft: i === 0 ? '0' : '48px',
          }}>
            <span style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(72px, 8vw, 104px)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              color: '#0f0f0f',
              lineHeight: 1,
              display: 'block',
              marginBottom: '14px',
            }}>
              {stat.number}
            </span>
            <span style={{
              fontSize: '11px',
              color: '#999',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              display: 'block',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
