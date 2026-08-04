'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import HKTimeChip from '@/components/layout/HKTimeChip'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // The homepage hero is dark; every section below it (and every other route) is
  // the light cream ground. While the hero occupies the top, the nav goes
  // transparent with light links so there is no hard cream seam across the dark
  // hero; the moment a light section takes over it reverts to the solid cream bar
  // with dark links. Tracked by watching the hero's position in the viewport.
  const [overHero, setOverHero] = useState(false)

  useEffect(() => {
    if (pathname !== '/') {
      setOverHero(false)
      return
    }
    // Poll the hero's position. Polling (not scroll events, rAF, or IO) is the
    // reliable signal: the prior scroll+rAF version got stuck on the SaltaGen
    // slide, leaving faint light links on the dark ground = "no nav". setInterval
    // + getBoundingClientRect fire in every environment and can't miss a boundary.
    // setOverHero with an unchanged value is a no-op, so this is cheap.
    const compute = () => {
      const hero = document.getElementById('hero-section')
      // Hero still covering the strip beneath the nav → hero slide is active.
      setOverHero(hero ? hero.getBoundingClientRect().bottom > 120 : false)
    }
    compute()
    const id = window.setInterval(compute, 120)
    const onScroll = () => compute() // immediate response on top of the poll
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      clearInterval(id)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  const linkColor = overHero ? 'color-mix(in srgb, var(--color-canvas) 88%, transparent)' : 'var(--color-ink-secondary)'
  const linkHover = overHero ? '#ffffff' : 'var(--color-ink)'
  const barColor = overHero ? 'color-mix(in srgb, var(--color-canvas) 90%, transparent)' : 'var(--color-ink)'
  // Chip is --color-meta on the light bar; lifted cream on the dark hero so it
  // stays legible (mirrors the link light/dark logic).
  const chipColor = overHero ? 'color-mix(in srgb, var(--color-canvas) 60%, transparent)' : 'var(--color-meta)'

  // On the homepage the logo is a "back to top" control; on other routes it
  // navigates to "/" normally (Next <Link>). This used to call the slideshow
  // controller's goTo(0) and fall back to scrolling `.snap-container`; both are
  // gone, so it is a plain document scroll to top.
  const handleLogoActivate = (e: { preventDefault: () => void }) => {
    if (pathname !== '/') return
    e.preventDefault()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

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
        width: '100%',
        zIndex: 100,
        background: overHero ? 'transparent' : 'color-mix(in srgb, var(--color-canvas) 96%, transparent)',
        backdropFilter: overHero ? 'none' : 'blur(8px)',
        WebkitBackdropFilter: overHero ? 'none' : 'blur(8px)',
        transition: 'background 0.35s ease, backdrop-filter 0.35s ease',
        height: '64px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 5vw',
          borderBottom: overHero ? '1px solid transparent' : '1px solid rgba(0,0,0,0.1)',
          transition: 'border-color 0.35s ease',
          boxSizing: 'border-box',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo: left (home / back-to-top control) */}
          <Link
            href="/"
            aria-label="Pebble Accelerator, back to top"
            onClick={handleLogoActivate}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
                if (pathname === '/') {
                  e.preventDefault()
                  handleLogoActivate(e)
                }
              }
            }}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            {/* Mark-only crop of the stacked logo.
                Asset is 1342×1408 with the wave mark occupying rows 292-880
                (~588px tall, ~71% of content height) and the "PEBBLE" wordmark
                occupying rows 968-1117 underneath. Wrapper height (48px) +
                image scaled to 115px tall + translateY(-24px) clips the
                wordmark below the wrapper while keeping the mark crisp and
                centered. Mark renders at ~48px tall, roughly 3× the
                effective mark size of the previous 40px stacked render. */}
            <div
              style={{
                width: '110px',
                height: '48px',
                overflow: 'hidden',
                display: 'block',
                flexShrink: 0,
              }}
            >
              <Image
                // Transparent mark on light grounds; cream light variant over the
                // dark hero. Both have a transparent background (no white box).
                src={overHero ? '/logos/pebblenew_light.png' : '/logos/pebblenew_transparent.png'}
                alt="Pebble Accelerator"
                width={1342}
                height={1408}
                priority={true}
                style={{
                  width: '110px',
                  height: '115px',
                  objectFit: 'contain',
                  objectPosition: 'left center',
                  opacity: 1,
                  filter: 'none',
                  display: 'block',
                  transform: 'translateY(-24px)',
                }}
              />
            </div>
          </Link>

          {/* Live Hong Kong time chip (desktop only) */}
          <HKTimeChip color={chipColor} />

          {/* Links: right, desktop only */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '48px',
          }} className="nav-desktop-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline link-underline--sage"
                style={{
                  fontSize: '12px',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: linkColor,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
                onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger: mobile only */}
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
            <span style={{ display: 'block', width: '22px', height: '1px', background: barColor, transition: 'background 0.35s ease' }} />
            <span style={{ display: 'block', width: '22px', height: '1px', background: barColor, transition: 'background 0.35s ease' }} />
            <span style={{ display: 'block', width: '22px', height: '1px', background: barColor, transition: 'background 0.35s ease' }} />
          </button>

        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'var(--color-canvas)',
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
              color: 'var(--color-ink)',
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
                color: 'var(--color-ink)',
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
        @media (max-width: 900px) {
          .hk-time-chip { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
