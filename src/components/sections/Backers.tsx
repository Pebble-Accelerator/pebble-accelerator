'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import backers from '@/data/backers'
import SectionLabelLine from '@/components/ui/SectionLabelLine'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { getHomeScrollScroller } from '@/lib/homeSlideshow'

gsap.registerPlugin(ScrollTrigger)

const LOGO_BY_NAME: Record<string, string> = {
  'Tiger Med Group': '/logos/tigermed.png',
  'Tiger Jade Capital': '/logos/TigerJade.png?v=3',
  'Nan Fung Group': '/logos/Nanfung.png',
  Morningside: '/logos/morningside.svg?v=2',
  'HK Cocoon': '/logos/Cocoon.jpeg',
  'THF Enterprises': '/logos/THFEnterprises.png',
}

type BackerLogoTreatment = 'default' | 'multiply' | 'dark-chip'

/** Per-asset visibility: default = color on cream; multiply = white baked box; dark-chip = light mark */
const BACKER_LOGO_TREATMENT: Record<string, BackerLogoTreatment> = {
  'Tiger Med Group': 'default',
  'Tiger Jade Capital': 'dark-chip',
  'Nan Fung Group': 'default',
  Morningside: 'default',
  'HK Cocoon': 'multiply',
  'THF Enterprises': 'multiply',
}

const bandLogoBaseStyle: CSSProperties = {
  maxHeight: 'clamp(48px, 5vw, 56px)',
  height: 'auto',
  width: 'auto',
  maxWidth: 'clamp(100px, 12vw, 150px)',
  objectFit: 'contain',
  display: 'block',
}

function backerLogoImgStyle(treatment: BackerLogoTreatment): CSSProperties {
  if (treatment === 'multiply') {
    return { ...bandLogoBaseStyle, mixBlendMode: 'multiply' }
  }
  return { ...bandLogoBaseStyle }
}

const darkChipStyle: CSSProperties = {
  background: '#1a1a1a',
  borderRadius: '7px',
  padding: '16px 20px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}

type BackersProps = {
  embedded?: boolean
  /** Thin horizontal logo strip for SaltaGen slide bottom band */
  variant?: 'default' | 'band'
}

const captionStandalone: CSSProperties = {
  marginTop: '10px',
  textAlign: 'center',
  fontSize: '11px',
  letterSpacing: '0.06em',
  color: '#999',
  display: 'block',
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
}

const bandLabelStyle: CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#888',
  flexShrink: 0,
  whiteSpace: 'nowrap',
}

function BackersBandLogo({
  b,
  src,
}: {
  b: (typeof backers)[number]
  src: string
}) {
  const treatment = BACKER_LOGO_TREATMENT[b.name] ?? 'default'
  const imgStyle: CSSProperties = {
    ...backerLogoImgStyle(treatment),
    ...(b.name === 'HK Cocoon'
      ? {
          maxHeight: 'clamp(54px, 5.65vw, 64px)',
          maxWidth: 'clamp(112px, 13.5vw, 168px)',
        }
      : {}),
  }

  const logoNode = (
    <img className="backer-band-logo" src={src} alt={b.name} style={imgStyle} />
  )

  return (
    <a
      href={b.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 auto',
        minWidth: 0,
        background: 'transparent',
      }}
    >
      {treatment === 'dark-chip' ? <div style={darkChipStyle}>{logoNode}</div> : logoNode}
    </a>
  )
}

function BackersBand() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollButtons = () => {
    const el = scrollRef.current
    if (!el) {
      setCanScrollLeft(false)
      setCanScrollRight(false)
      return
    }

    const atLeft = el.scrollLeft <= 0
    const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1

    setCanScrollLeft(!atLeft)
    setCanScrollRight(!atRight)
  }

  useEffect(() => {
    updateScrollButtons()
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => updateScrollButtons()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateScrollButtons)

    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [])

  const scrollByAmount = 350

  return (
    <>
      <div
        className="backers-band"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingRight: '40px',
          height: '100%',
          gap: '0',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <span style={bandLabelStyle}>Backed by</span>
          <div
            aria-hidden
            style={{
              width: '1px',
              height: '32px',
              background: '#d4cfc2',
              flexShrink: 0,
              marginLeft: '28px',
              marginRight: '28px',
            }}
          />
        </div>

        <div
          style={{
            flex: '1 1 auto',
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <button
            type="button"
            aria-label="Scroll backers left"
            aria-disabled={!canScrollLeft}
            disabled={!canScrollLeft}
            className="backers-band-arrow backers-band-arrow--left"
            onClick={() => {
              const el = scrollRef.current
              if (!el) return
              el.scrollBy({ left: -scrollByAmount, behavior: 'smooth' })
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M8.7 3.2L4.4 7l4.3 3.8"
                stroke="#1a1a1a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="backers-band-scroll"
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollBehavior: 'smooth',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(48px, 4vw, 64px)',
              flex: '0 1 auto',
              minWidth: 0,
              padding: 0,
            }}
          >
            {backers.map((b) => {
              const src = LOGO_BY_NAME[b.name]
              return (
                <BackersBandLogo key={b.name} b={b} src={src} />
              )
            })}
          </div>

          <button
            type="button"
            aria-label="Scroll backers right"
            aria-disabled={!canScrollRight}
            disabled={!canScrollRight}
            className="backers-band-arrow backers-band-arrow--right"
            onClick={() => {
              const el = scrollRef.current
              if (!el) return
              el.scrollBy({ left: scrollByAmount, behavior: 'smooth' })
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M5.3 3.2L9.6 7l-4.3 3.8"
                stroke="#1a1a1a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .backers-band-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .backers-band-scroll::-webkit-scrollbar {
          display: none;
        }

        .backers-band-arrow {
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          border: 1px solid #d4cfc2;
          background: transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          cursor: pointer;
          transition: border-color 150ms ease, transform 100ms ease, opacity 150ms ease;
          flex-shrink: 0;
        }

        .backers-band-arrow--left {
          margin-right: 18px;
        }

        .backers-band-arrow--right {
          margin-left: 18px;
        }

        .backers-band-arrow:hover {
          border-color: #1a1a1a;
        }

        .backers-band-arrow:active {
          transform: scale(0.95);
        }

        .backers-band-arrow:focus-visible {
          outline: 2px solid #5e7a6a;
          outline-offset: 2px;
        }

        .backers-band-arrow:disabled {
          opacity: 0.3;
          pointer-events: none;
        }
      `}</style>
    </>
  )
}

export default function Backers({ embedded = false, variant = 'default' }: BackersProps) {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)
  const logoRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const label = labelRef.current
    const logos = logoRefs.current.filter(Boolean) as HTMLAnchorElement[]
    if (!section || logos.length === 0) return
    if (!embedded && !label) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const triggers: ScrollTrigger[] = []

    if (prefersReduced || reduced) {
      if (label) gsap.set(label, { opacity: 1, y: 0 })
      gsap.set(logos, { opacity: 1, y: 0 })
      return
    }

    const snapScroller = getHomeScrollScroller()

    if (label) gsap.set(label, { opacity: 0, y: 12, willChange: 'transform' })
    gsap.set(logos, { opacity: 0, y: 12, willChange: 'transform' })

    if (label) {
      const labelTween = gsap.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power1.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: section,
          scroller: snapScroller,
          start: 'top 95%',
          once: true,
        },
        onComplete: () => {
          label.style.willChange = 'auto'
        },
      })
      if (labelTween.scrollTrigger) triggers.push(labelTween.scrollTrigger)
    }

    const logosTween = gsap.to(logos, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power1.out',
      delay: 0.1,
      stagger: 0.15,
      scrollTrigger: {
        trigger: section,
        scroller: snapScroller,
        start: 'top 95%',
        once: true,
      },
      onComplete: () => {
        logos.forEach((logo) => {
          logo.style.willChange = 'auto'
        })
      },
    })
    if (logosTween.scrollTrigger) triggers.push(logosTween.scrollTrigger)

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [reduced, embedded])

  const renderLogo = (b: (typeof backers)[number], i: number) => {
    const src = LOGO_BY_NAME[b.name]
    const treatment = BACKER_LOGO_TREATMENT[b.name] ?? 'default'
    const imgStyle: CSSProperties = {
      maxHeight: embedded ? '44px' : `${b.height || 56}px`,
      height: 'auto',
      width: 'auto',
      objectFit: 'contain',
      display: 'block',
      ...(treatment === 'multiply' ? { mixBlendMode: 'multiply' } : {}),
    }

    const logoNode = (
      <img className="backer-logo-img" src={src} alt={b.name} style={imgStyle} />
    )

    return (
      <a
        key={b.name}
        ref={(el) => {
          logoRefs.current[i] = el
        }}
        href={b.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: 'none',
          flex: embedded ? '1 1 0' : undefined,
          minWidth: embedded ? 0 : '140px',
          flexShrink: embedded ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        {treatment === 'dark-chip' ? (
          <div className="backer-logo-pill" style={darkChipStyle}>
            {logoNode}
          </div>
        ) : (
          logoNode
        )}
        <span className={embedded ? 'backer-logo-caption' : undefined} style={embedded ? undefined : captionStandalone}>
          {b.type}
        </span>
      </a>
    )
  }

  if (variant === 'band') {
    return <BackersBand />
  }

  if (embedded) {
    return (
      <section
        ref={sectionRef}
        className="backers-section backers-section--embedded"
        style={{
          background: '#f5efe4',
          height: '100vh',
          maxHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          border: 'none',
          overflow: 'hidden',
          paddingTop: '60px',
          paddingLeft: '5vw',
          paddingRight: '5vw',
          paddingBottom: '20px',
        }}
      >
        <div className="backers-embedded-inner">
          <div ref={labelRef} className="backers-embedded-label">
            Backed by
          </div>
          <div className="backers-embedded-row">{backers.map((b, i) => renderLogo(b, i))}</div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="snap-section backers-section"
      style={{
        background: '#f5efe4',
        padding: '0 5vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div ref={labelRef}>
          <SectionLabelLine marginBottom="48px">
            <span
              style={{
                fontSize: '11px',
                color: '#aaa',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                flexShrink: 0,
              }}
            >
              Backed by
            </span>
          </SectionLabelLine>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          {backers.map((b, i) => renderLogo(b, i))}
        </div>
      </div>
    </section>
  )
}
