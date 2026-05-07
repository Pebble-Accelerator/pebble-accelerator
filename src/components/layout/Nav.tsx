'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: 'Our Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/consulting' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(245,240,232,0.96)',
        backdropFilter: 'blur(8px)',
        height: '64px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 5vw',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          boxSizing: 'border-box',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo — left */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/logos/Pebble_Accelerator_Sideways_Logo_transparent_v2.png"
              alt="Pebble Accelerator"
              width={220}
              height={40}
              priority={true}
              style={{
                objectFit: 'contain',
                objectPosition: 'left center',
                opacity: 1,
                filter: 'none',
              }}
            />
          </Link>

          {/* Links — right, desktop only */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '48px',
          }} className="nav-desktop-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '12px',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#555',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0f0f0f')}
                onMouseLeave={e => (e.currentTarget.style.color = '#555')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              flexDirection: 'column',
              gap: '5px',
            }}
            className="nav-hamburger"
            aria-label="Toggle menu"
          >
            <span style={{ display: 'block', width: '22px', height: '1px', background: '#0f0f0f' }} />
            <span style={{ display: 'block', width: '22px', height: '1px', background: '#0f0f0f' }} />
            <span style={{ display: 'block', width: '22px', height: '1px', background: '#0f0f0f' }} />
          </button>

        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: '#F5F0E8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 5vw',
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '5vw',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#0f0f0f',
            }}
          >
            ×
          </button>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '40px',
                fontWeight: 500,
                color: '#0f0f0f',
                textDecoration: 'none',
                padding: '16px 0',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* CSS for responsive nav */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
