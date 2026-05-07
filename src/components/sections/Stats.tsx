'use client'

import { useReducedMotion } from 'framer-motion'
import { useLayoutEffect, useEffect, useState } from 'react'
import { useScrollEntranceMode } from '@/hooks/useScrollEntranceMode'

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

function StatNumber({
  numberStr,
  animateAllowed,
}: {
  numberStr: string
  animateAllowed: boolean
}) {
  const reduced = useReducedMotion()
  const { target, suffix } = parseStat(numberStr)
  const [value, setValue] = useState(0)

  const runCounter = animateAllowed && !reduced

  useLayoutEffect(() => {
    if (!runCounter) return
    setValue(0)
  }, [runCounter])

  useEffect(() => {
    if (!runCounter) return

    let start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1800)
      const eased = easeOutCubic(t)
      setValue(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [runCounter, target])

  if (!runCounter) return <>{numberStr}</>

  return <>{`${value}${suffix}`}</>
}

export default function Stats() {
  const stats = [
    { number: '18+', label: 'Companies Financed' },
    { number: '30+', label: 'Companies Accelerated' },
    { number: '100m', label: 'Patient Pool by 2030' },
  ]

  const framerReduced = useReducedMotion()
  const { ref: sectionRef, mode } = useScrollEntranceMode(!framerReduced)

  const animateNumbers = !framerReduced && mode === 'animate'

  return (
    <section ref={sectionRef} style={{ background: '#ffffff', padding: '0 5vw' }}>
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
              lineHeight: 1,
              display: 'block',
              marginBottom: '14px',
            }}>
              <StatNumber numberStr={stat.number} animateAllowed={animateNumbers} />
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
