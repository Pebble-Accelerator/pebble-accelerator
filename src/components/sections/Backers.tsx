import backers from '@/data/backers'

export default function Backers() {
  return (
    <section style={{
      background: '#ffffff',
      padding: '80px 5vw',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
      }}>
        <span style={{
          fontSize: '11px',
          color: '#aaa',
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          marginBottom: '48px',
          display: 'block',
          fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
        }}>
          Backed by
        </span>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap' as const,
          gap: '0',
          alignItems: 'flex-start',
        }}>
          {backers.map((b, i) => (
            <a
              key={i}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                paddingRight: '72px',
                marginBottom: '24px',
                textDecoration: 'none',
                minWidth: '140px',
              }}
            >
              <span style={{
                fontSize: '16px',
                color: '#333',
                fontWeight: 400,
                display: 'block',
                marginBottom: '6px',
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              }}>
                {b.name}
              </span>
              <span style={{
                fontSize: '11px',
                color: '#bbb',
                display: 'block',
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              }}>
                {b.type}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
