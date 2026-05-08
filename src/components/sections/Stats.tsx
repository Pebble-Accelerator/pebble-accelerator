'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

function parseStat(display: string): { target: number; suffix: string } {
  if (display.endsWith('+')) {
    const n = parseInt(display.slice(0, -1), 10)
    return { target: Number.isFinite(n) ? n : 0, suffix: '+' }
  }
  if (/m$/i.test(display)) {
    const n = parseInt(display.slice(0, -1), 10)
    return { target: Number.isFinite(n) ? n : 0, suffix: 'm' }
  }
  const n = parseFloat(display)
  return { target: Number.isFinite(n) ? n : 0, suffix: '' }
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function animateCount(opts: {
  el: HTMLSpanElement
  from: number
  to: number
  durationMs: number
  suffix: string
}) {
  const { el, from, to, durationMs, suffix } = opts
  const start = performance.now()

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs)
    const eased = easeOutCubic(t)
    const value = Math.floor(from + (to - from) * eased)
    el.textContent = `${value}${suffix}`
    if (t < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

export default function Stats() {
  const stats = [
    { number: '18+', label: 'Companies Financed' },
    { number: '30+', label: 'Companies Accelerated' },
    { number: '100m', label: 'Patient Pool by 2030' },
  ]

  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const hasAnimatedRef = useRef(false)
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    const container = sectionRef.current
    if (!container) return

    // Always set the final values immediately if reduced-motion.
    if (reduced) {
      stats.forEach((stat, idx) => {
        const el = numberRefs.current[idx]
        if (!el) return
        const { target, suffix } = parseStat(stat.number)
        el.textContent = `${target}${suffix}`
      })
      return
    }

    if (hasAnimatedRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimatedRef.current) return
        hasAnimatedRef.current = true

        stats.forEach((stat, idx) => {
          const el = numberRefs.current[idx]
          if (!el) return
          const { target, suffix } = parseStat(stat.number)

          // Stagger starts by 200ms to avoid CPU spikes.
          window.setTimeout(() => {
            animateCount({
              el,
              from: 0,
              to: target,
              durationMs: 1800,
              suffix,
            })
          }, idx * 200)
        })

        observer.disconnect()
      },
      { threshold: 0.4 }
    )

    observer.observe(container)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  return (
    <section ref={sectionRef} style={{
      background: '#ffffff',
      padding: '0 5vw',
      contain: 'layout',
      transform: 'translateZ(0)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}>
        {stats.map((stat, i) => (
          <div key={stat.label} style={{
            padding: '72px 48px 72px 0',
            borderRight: i < 2 ? '1px solid rgba(0,0,0,0.08)' : 'none',
            paddingLeft: i === 0 ? '0' : '48px',
          }}>
            <span style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(72px, 8vw, 104px)',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              color: '#0f0f0f',
              lineHeight: 1.2,
              display: 'block',
              marginBottom: '14px',
              paddingBottom: '8px',
              willChange: 'contents',
              contain: 'layout style',
            }}>
              <span
                ref={(el) => {
                  numberRefs.current[i] = el
                }}
              >
                {stat.number}
              </span>
            </span>
            <span style={{
              fontSize: '11px',
              color: '#999',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              display: 'block',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
