'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabelLine from '@/components/ui/SectionLabelLine'

gsap.registerPlugin(ScrollTrigger)

const services = [
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
    if (!section || !label || !leftCol || !rightCol) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const triggers: ScrollTrigger[] = []

    if (reduced) {
      gsap.set([label, leftCol, rightCol], { opacity: 1, x: 0, y: 0 })
      return
    }

    gsap.set(label, { opacity: 0, y: 16, willChange: 'transform' })
    gsap.set(leftCol, { opacity: 0, x: -32, willChange: 'transform' })
    gsap.set(rightCol, { opacity: 0, x: 32, willChange: 'transform' })

    const labelTween = gsap.to(label, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        scroller: '.snap-container',
        start: 'top 85%',
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
        scroller: '.snap-container',
        start: 'top 85%',
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
      className={embedded ? 'services-section services-section--embedded' : 'snap-section services-section'}
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
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          minHeight: 0,
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
