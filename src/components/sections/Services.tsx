'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabelLine from '@/components/ui/SectionLabelLine'
import Link from 'next/link'
import { getHomeScrollScroller } from '@/lib/homeSlideshow'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    name: 'Investment',
    desc: 'We deploy starting capital alongside deep operational support, leveraging our investor network to accelerate the milestones that matter.',
    tags: 'Seed · Series A bridge · Follow-on',
  },
  {
    name: 'Consulting',
    desc: 'For companies beyond our investment scope, we serve as your extension in Hong Kong, opening doors to China, accessing government grants, building the right partnerships.',
    tags: 'Market entry · HK grants · China access',
  },
]

type ServicesProps = {
  embedded?: boolean
}

export default function Services({ embedded = false }: ServicesProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)
  const leftColRef = useRef<HTMLDivElement | null>(null)
  const rightColRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const label = labelRef.current
    const leftCol = leftColRef.current
    const rightCol = rightColRef.current
    if (!section || !leftCol || !rightCol) return
    if (!embedded && !label) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const triggers: ScrollTrigger[] = []

    if (reduced) {
      if (label) gsap.set(label, { opacity: 1, x: 0, y: 0 })
      gsap.set([leftCol, rightCol], { opacity: 1, x: 0, y: 0 })
      return
    }

    const snapScroller = getHomeScrollScroller()

    if (label) gsap.set(label, { opacity: 0, y: 12, willChange: 'transform' })
    gsap.set(leftCol, { opacity: 0, x: -24, willChange: 'transform' })
    gsap.set(rightCol, { opacity: 0, x: 24, willChange: 'transform' })

    if (label) {
      const labelTween = gsap.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
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

    const columnsTween = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scroller: snapScroller,
        start: 'top 95%',
        once: true,
      },
    })

    columnsTween
      .to(
        leftCol,
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => {
            leftCol.style.willChange = 'auto'
          },
        },
        0
      )
      .to(
        rightCol,
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => {
            rightCol.style.willChange = 'auto'
          },
        },
        0
      )

    if (columnsTween.scrollTrigger) triggers.push(columnsTween.scrollTrigger)

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [embedded])

  if (embedded) {
    return (
      <section
        ref={sectionRef}
        className="services-section services-section--embedded services-section--dark"
        style={{
          // Dark ground — carries the hero's dark language through so the homepage
          // alternates light/dark instead of running flat cream.
          background: 'var(--color-slate-dark)',
          position: 'relative',
          height: '100vh',
          maxHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'safe center',
          alignItems: 'stretch',
          boxSizing: 'border-box',
          border: 'none',
          overflow: 'hidden',
          // Consistent top-reserve rhythm with the Hero/GBA slides: nav (64px)
          // + breathing room. Content still vertically centers, but in a tighter
          // remaining area so the slide reads composed instead of under-filled.
          padding: 'var(--space-page-top) var(--gutter-x) var(--space-section-y)',
        }}
      >
        <div
          className="services-embedded-cluster"
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div ref={labelRef} className="services-embedded-label" style={{ marginBottom: '20px' }}>
            <SectionLabelLine index={3} tone="dark" marginBottom="0">
              <span
                style={{
                  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(245, 240, 232, 0.62)',
                  flexShrink: 0,
                }}
              >
                What we do
              </span>
            </SectionLabelLine>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(40px, 4.2vw, 62px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: '0 0 56px',
              maxWidth: '100%',
            }}
          >
            <span style={{ fontWeight: 400, color: '#f7f3ec' }}>How we work.</span>{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 500, color: '#a9c7b6' }}>
              Bespoke, not batched.
            </span>
          </h2>

          <div style={{ marginBottom: '56px' }}>
            <div className="services-embedded-columns">
              <div ref={leftColRef} style={{ flex: 1, maxWidth: 'none', minWidth: 0 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '32px',
                    fontWeight: 500,
                    color: '#f7f3ec',
                    margin: '0 0 16px',
                    lineHeight: 1.2,
                  }}
                >
                  {services[0].name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: 'rgba(245, 240, 232, 0.72)',
                    lineHeight: 1.7,
                    maxWidth: '440px',
                    margin: 0,
                  }}
                >
                  {services[0].desc}
                </p>
              </div>
              <div
                className="services-embedded-divider"
                aria-hidden
                style={{ background: 'rgba(245, 240, 232, 0.18)' }}
              />
              <div ref={rightColRef} style={{ flex: 1, maxWidth: 'none', minWidth: 0 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '32px',
                    fontWeight: 500,
                    color: '#f7f3ec',
                    margin: '0 0 16px',
                    lineHeight: 1.2,
                  }}
                >
                  {services[1].name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: 'rgba(245, 240, 232, 0.72)',
                    lineHeight: 1.7,
                    maxWidth: '440px',
                    margin: 0,
                  }}
                >
                  {services[1].desc}
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/services"
            className="services-full-link link-underline"
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '4px',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(245, 240, 232, 0.72)',
              textDecoration: 'none',
              transition: 'color 250ms ease',
              cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#a9c7b6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(245, 240, 232, 0.72)'
            }}
          >
            <span>SEE HOW WE WORK</span>
            <span aria-hidden>→</span>
          </Link>
        </div>

        <style jsx>{`
          .services-full-link:focus-visible {
            outline: 2px solid #5e7a6a;
            outline-offset: 2px;
            border-radius: 4px;
          }
        `}</style>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="snap-section services-section"
      style={{
        background: 'var(--color-canvas)',
        padding: '0 5vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'safe center',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'safe center',
          minHeight: 0,
        }}
      >
        <div ref={labelRef}>
          <SectionLabelLine index={3} marginBottom="48px">
            <span
              style={{
                fontSize: '11px',
                color: 'var(--color-meta)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                flexShrink: 0,
              }}
            >
              What we do
            </span>
          </SectionLabelLine>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '96px',
            flex: 1,
            alignContent: 'center',
          }}
        >
          <div ref={leftColRef}>
            <h3
              style={{
                fontSize: '22px',
                fontWeight: 500,
                color: '#0f0f0f',
                marginBottom: '20px',
                marginTop: 0,
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              }}
            >
              {services[0].name}
            </h3>
            <p
              style={{
                fontSize: '15px',
                fontWeight: 300,
                color: '#666',
                lineHeight: 1.85,
                marginBottom: '24px',
                marginTop: 0,
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              }}
            >
              {services[0].desc}
            </p>
            <span
              style={{
                fontSize: '12px',
                color: '#bbb',
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              }}
            >
              {services[0].tags}
            </span>
          </div>
          <div ref={rightColRef}>
            <h3
              style={{
                fontSize: '22px',
                fontWeight: 500,
                color: '#0f0f0f',
                marginBottom: '20px',
                marginTop: 0,
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              }}
            >
              {services[1].name}
            </h3>
            <p
              style={{
                fontSize: '15px',
                fontWeight: 300,
                color: '#666',
                lineHeight: 1.85,
                marginBottom: '24px',
                marginTop: 0,
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              }}
            >
              {services[1].desc}
            </p>
            <span
              style={{
                fontSize: '12px',
                color: '#bbb',
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              }}
            >
              {services[1].tags}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
