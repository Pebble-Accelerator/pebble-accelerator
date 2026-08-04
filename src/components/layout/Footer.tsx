import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-ink)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '32px 5vw',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Image
            src="/logos/pebblenew.png"
            alt="Pebble Accelerator"
            width={1342}
            height={1408}
            style={{
              width: 'auto',
              height: '32px',
              objectFit: 'contain',
              opacity: 0.5,
              display: 'block',
            }}
          />
          <span style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.25)',
            fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
          }}>
            © 2025 Pebble Accelerator · Hong Kong
          </span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { label: 'LinkedIn', href: 'https://linkedin.com/company/pebbleaccelerator' },
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
          ].map((link) => (
            <Link key={link.label} href={link.href} className="link-underline" style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
