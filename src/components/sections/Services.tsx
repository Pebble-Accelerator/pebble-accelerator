export default function Services() {
  return (
    <section style={{
      background: '#ffffff',
      padding: '120px 5vw',
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
          marginBottom: '64px',
          display: 'block',
          fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
        }}>
          What we do
        </span>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '96px',
        }}>
          {[
            {
              name: 'Investment',
              desc: 'We deploy starting capital of US$200K alongside deep operational support, leveraging our investor network to accelerate the milestones that matter.',
              tags: 'Seed · Series A bridge · Follow-on',
            },
            {
              name: 'Consulting',
              desc: 'For companies beyond our investment scope, we serve as your extension in Hong Kong — opening doors to China, accessing government grants, building the right partnerships.',
              tags: 'Market entry · HK grants · China access',
            },
          ].map((svc, i) => (
            <div key={i}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 500,
                color: '#0f0f0f',
                marginBottom: '20px',
                marginTop: 0,
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              }}>
                {svc.name}
              </h3>
              <p style={{
                fontSize: '15px',
                fontWeight: 300,
                color: '#666',
                lineHeight: 1.85,
                marginBottom: '24px',
                marginTop: 0,
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              }}>
                {svc.desc}
              </p>
              <span style={{
                fontSize: '12px',
                color: '#bbb',
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              }}>
                {svc.tags}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
