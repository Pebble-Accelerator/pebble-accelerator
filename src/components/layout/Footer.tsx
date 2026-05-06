import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: '#0f0f0f',
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
            src="/logos/Pebble_Accelerator_Sideways_Logo_transparent_v2.png"
            alt="Pebble Accelerator"
            width={140}
            height={24}
            style={{ objectFit: 'contain', opacity: 0.5 }}
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
            <Link key={link.label} href={link.href} style={{
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
