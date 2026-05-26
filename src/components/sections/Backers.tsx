'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import backers from '@/data/backers'
import SectionLabelLine from '@/components/ui/SectionLabelLine'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const LOGO_BY_NAME: Record<string, string> = {
  'Tiger Med Group': '/logos/tigermed.png',
  'Tiger Jade Capital': '/logos/TigerJade.png?v=3',
  'Nan Fung Group': '/logos/Nanfung.png',
  Morningside: '/logos/morningside.svg?v=2',
  'HK Cocoon': '/logos/Cocoon.jpeg',
}

type BackersProps = {
  embedded?: boolean
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

export default function Backers({ embedded = false }: BackersProps) {
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

    const snapScroller = document.querySelector('.snap-container')
    if (!snapScroller) return

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
    const isTigerJade = src.includes('TigerJade')
    const isCocoon = src.includes('Cocoon.jpeg')
    const imgStyle: CSSProperties = {
      maxHeight: embedded ? '44px' : `${b.height || 56}px`,
      height: 'auto',
      width: 'auto',
      objectFit: 'contain',
      display: 'block',
    }

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
        }}
      >
        {isTigerJade ? (
          <div
            className="backer-logo-pill"
            style={{
              background: '#1a1a1a',
              borderRadius: '6px',
              padding: '8px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img className="backer-logo-img" src={src} alt={b.name} style={imgStyle} />
          </div>
        ) : isCocoon ? (
          <Image className="backer-logo-img" src={src} alt={b.name} width={200} height={56} style={imgStyle} />
        ) : (
          <img className="backer-logo-img" src={src} alt={b.name} style={imgStyle} />
        )}
        <span className={embedded ? 'backer-logo-caption' : undefined} style={embedded ? undefined : captionStandalone}>
          {b.type}
        </span>
      </a>
    )
  }

  if (embedded) {
    return (
      <section
        ref={sectionRef}
        className="backers-section backers-section--embedded"
        style={{
          background: '#f5efe4',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          border: 'none',
          padding: 0,
        }}
      >
        <div ref={labelRef} className="backers-embedded-label">
          Backed by
        </div>
        <div className="backers-embedded-row">{backers.map((b, i) => renderLogo(b, i))}</div>
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
