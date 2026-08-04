'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabelLine from '@/components/ui/SectionLabelLine'
import Link from 'next/link'

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

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)
  const leftColRef = useRef<HTMLDivElement | null>(null)
  const rightColRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const label = labelRef.current
    const leftCol = leftColRef.current
    const rightCol = rightColRef.current
    if (!section || !leftCol || !rightCol || !label) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const triggers: ScrollTrigger[] = []

    if (reduced) {
      gsap.set(label, { opacity: 1, x: 0, y: 0 })
      gsap.set([leftCol, rightCol], { opacity: 1, x: 0, y: 0 })
      return
    }

    gsap.set(label, { opacity: 0, y: 12, willChange: 'transform' })
    gsap.set(leftCol, { opacity: 0, x: -24, willChange: 'transform' })
    gsap.set(rightCol, { opacity: 0, x: 24, willChange: 'transform' })

    const labelTween = gsap.to(label, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 95%',
        once: true,
      },
      onComplete: () => {
        label.style.willChange = 'auto'
      },
    })
    if (labelTween.scrollTrigger) triggers.push(labelTween.scrollTrigger)

    const columnsTween = gsap.timeline({
      scrollTrigger: {
        trigger: section,
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
  }, [])

  return (
    <section
      ref={sectionRef}
      className="services-section services-section--embedded services-section--dark"
      style={{
        // Dark ground — carries the hero's dark language through so the homepage
        // alternates light/dark instead of running flat cream.
        background: 'var(--color-slate-dark)',
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'safe center',
        alignItems: 'stretch',
        boxSizing: 'border-box',
        border: 'none',
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
                color: 'color-mix(in srgb, var(--color-canvas) 62%, transparent)',
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
          <span style={{ fontWeight: 400, color: 'var(--color-canvas)' }}>How we work.</span>{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-sage-light)' }}>
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
                  color: 'var(--color-canvas)',
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
                  color: 'color-mix(in srgb, var(--color-canvas) 72%, transparent)',
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
              style={{ background: 'color-mix(in srgb, var(--color-canvas) 18%, transparent)' }}
            />
            <div ref={rightColRef} style={{ flex: 1, maxWidth: 'none', minWidth: 0 }}>
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '32px',
                  fontWeight: 500,
                  color: 'var(--color-canvas)',
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
                  color: 'color-mix(in srgb, var(--color-canvas) 72%, transparent)',
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
          href="/consulting"
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
            color: 'color-mix(in srgb, var(--color-canvas) 72%, transparent)',
            textDecoration: 'none',
            transition: 'color 250ms ease',
            cursor: 'pointer',
            alignSelf: 'flex-start',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-sage-light)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'color-mix(in srgb, var(--color-canvas) 72%, transparent)'
          }}
        >
          <span>SEE HOW WE WORK</span>
          <span aria-hidden>→</span>
        </Link>
      </div>

      <style jsx>{`
        .services-full-link:focus-visible {
          outline: 2px solid var(--color-sage);
          outline-offset: 2px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}
