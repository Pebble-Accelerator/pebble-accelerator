'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
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

export default function Backers({ embedded = false }: BackersProps) {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)
  const logoRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const trackRef = useRef<HTMLDivElement>(null)
  const [marqueeStarted, setMarqueeStarted] = useState(reduced)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const startTranslateRef = useRef(0)
  const translateXRef = useRef(0)
  const halfWidthRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)
  const didDragRef = useRef(false)
  const suppressClickRef = useRef(false)
  const dragMovedPxRef = useRef(0)
  const [renderTranslateX, setRenderTranslateX] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const label = labelRef.current
    const logos = logoRefs.current.filter(Boolean) as HTMLAnchorElement[]
    if (!section || !label || logos.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const triggers: ScrollTrigger[] = []

    if (prefersReduced || reduced) {
      gsap.set(label, { opacity: 1, y: 0 })
      gsap.set(logos, { opacity: 1, y: 0 })
      setMarqueeStarted(true)
      return
    }

    gsap.set(label, { opacity: 0, y: 12, willChange: 'transform' })
    gsap.set(logos, { opacity: 0, y: 12, willChange: 'transform' })

    const labelTween = gsap.to(label, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power1.out',
      delay: 0.1,
      scrollTrigger: {
        trigger: section,
        scroller: '.snap-container',
        start: 'center 80%',
        once: true,
      },
      onComplete: () => {
        label.style.willChange = 'auto'
      },
    })
    if (labelTween.scrollTrigger) triggers.push(labelTween.scrollTrigger)

    const logosTween = gsap.to(logos, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power1.out',
      delay: 0.1,
      stagger: 0.15,
      scrollTrigger: {
        trigger: section,
        scroller: '.snap-container',
        start: 'center 80%',
        once: true,
      },
      onComplete: () => {
        logos.forEach((logo) => {
          logo.style.willChange = 'auto'
        })
        setMarqueeStarted(true)
      },
    })
    if (logosTween.scrollTrigger) triggers.push(logosTween.scrollTrigger)

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const el = trackRef.current
    if (!el) return
    const measure = () => {
      const half = el.scrollWidth / 2
      if (half > 0) halfWidthRef.current = half
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    if (!marqueeStarted) return
    const speedPxPerSec = 40

    const tick = (ts: number) => {
      const half = halfWidthRef.current
      if (!half) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const last = lastTsRef.current ?? ts
      const dtSec = Math.min(0.05, Math.max(0, (ts - last) / 1000))
      lastTsRef.current = ts

      if (!isDragging && !isLogoHovered) {
        translateXRef.current -= speedPxPerSec * dtSec
        if (translateXRef.current <= -half) translateXRef.current += half
        if (translateXRef.current > 0) translateXRef.current -= half
        setRenderTranslateX(translateXRef.current)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastTsRef.current = null
    }
  }, [reduced, isDragging, isLogoHovered, marqueeStarted])

  const normalizeTranslate = (x: number) => {
    const half = halfWidthRef.current
    if (!half) return x
    while (x <= -half) x += half
    while (x > 0) x -= half
    return x
  }

  const beginDrag = (clientX: number) => {
    didDragRef.current = false
    suppressClickRef.current = false
    dragMovedPxRef.current = 0
    setIsDragging(true)
    startXRef.current = clientX
    startTranslateRef.current = translateXRef.current
  }

  const moveDrag = (clientX: number) => {
    if (!isDragging) return
    const dx = clientX - startXRef.current
    dragMovedPxRef.current = Math.max(dragMovedPxRef.current, Math.abs(dx))
    if (dragMovedPxRef.current > 6) {
      didDragRef.current = true
      suppressClickRef.current = true
    }
    const next = normalizeTranslate(startTranslateRef.current + dx)
    translateXRef.current = next
    setRenderTranslateX(next)
  }

  const endDrag = () => {
    setIsDragging(false)
    window.setTimeout(() => {
      suppressClickRef.current = false
      didDragRef.current = false
      dragMovedPxRef.current = 0
    }, 0)
  }

  const links = (suffix: string, indexOffset: number) =>
    backers.map((b, i) => {
      const src = LOGO_BY_NAME[b.name]
      const logoHeightPx = b.height || 56
      const isTigerJade = src.includes('TigerJade')
      const isCocoon = src.includes('Cocoon.jpeg')
      const logoIndex = indexOffset + i

      return (
        <a
          key={`${b.name}-${suffix}-${i}`}
          ref={(el) => {
            logoRefs.current[logoIndex] = el
          }}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (suppressClickRef.current) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
          style={{
            paddingRight: '100px',
            marginBottom: reduced ? '24px' : 0,
            textDecoration: 'none',
            minWidth: '140px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: isTigerJade ? 'center' : 'flex-end',
            height: isTigerJade ? '90px' : '80px',
            overflow: 'visible',
          }}
        >
          {isTigerJade ? (
            <div
              className="backer-logo-pill"
              style={{
                background: '#1a1a1a',
                borderRadius: '6px',
                padding: '10px 14px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
              onTouchStart={() => setIsLogoHovered(true)}
              onTouchEnd={() => setIsLogoHovered(false)}
            >
              <img
                className="backer-logo-img"
                src={src}
                alt={b.name}
                style={{
                  height: '40px',
                  width: 'auto',
                  objectFit: 'contain',
                  opacity: 1,
                  transform: 'scale(1)',
                  transition: 'transform 200ms ease',
                  display: 'block',
                  marginBottom: 0,
                }}
              />
            </div>
          ) : isCocoon ? (
            <Image
              className="backer-logo-img"
              src={src}
              alt={b.name}
              width={200}
              height={56}
              style={{
                height: `${logoHeightPx}px`,
                width: 'auto',
                objectFit: 'contain',
                opacity: 1,
                transform: 'scale(1)',
                transition: 'transform 200ms ease',
                display: 'block',
                marginBottom: 0,
              }}
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            />
          ) : (
            <img
              className="backer-logo-img"
              src={src}
              alt={b.name}
              style={{
                height: `${logoHeightPx}px`,
                width: 'auto',
                objectFit: 'contain',
                opacity: 1,
                transform: 'scale(1)',
                transition: 'transform 200ms ease',
                display: 'block',
                marginBottom: 0,
              }}
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            />
          )}
          <span
            style={{
              marginTop: '10px',
              textAlign: 'center' as const,
              fontSize: '11px',
              letterSpacing: '0.06em',
              color: '#999',
              display: 'block',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            }}
          >
            {b.type}
          </span>
        </a>
      )
    })

  return (
    <section
      ref={sectionRef}
      className={
        embedded ? 'backers-section backers-section--embedded' : 'snap-section backers-section'
      }
      style={{
        background: '#f5efe4',
        padding: '0 5vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
        ...(embedded ? { flex: 1, minHeight: 0, height: 'auto' } : {}),
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

        {reduced ? (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap' as const,
              gap: '0',
              alignItems: 'flex-start',
            }}
          >
            {links('static', 0)}
          </div>
        ) : (
          <div
            className={`backers-marquee${isLogoHovered ? ' is-paused' : ''}`}
            style={{
              overflow: 'hidden',
              width: '100%',
              maskImage:
                'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            }}
          >
            <div
              ref={trackRef}
              className="backers-marquee-track"
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: 'max-content',
                overflow: 'visible',
                paddingRight: '120px',
                transform: `translateX(${renderTranslateX}px)`,
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                touchAction: 'pan-y',
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                beginDrag(e.clientX)
              }}
              onMouseMove={(e) => {
                if (!isDragging) return
                e.preventDefault()
                moveDrag(e.clientX)
              }}
              onMouseUp={() => endDrag()}
              onMouseLeave={() => endDrag()}
              onTouchStart={(e) => {
                if (e.touches.length !== 1) return
                beginDrag(e.touches[0].clientX)
              }}
              onTouchMove={(e) => {
                if (!isDragging || e.touches.length !== 1) return
                moveDrag(e.touches[0].clientX)
              }}
              onTouchEnd={() => endDrag()}
              onTouchCancel={() => endDrag()}
            >
              <div style={{ display: 'flex', flexDirection: 'row' }}>{links('a', 0)}</div>
              <div style={{ display: 'flex', flexDirection: 'row' }} aria-hidden>
                {links('b', backers.length)}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
