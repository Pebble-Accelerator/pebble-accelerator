'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '18+', label: 'Companies Financed' },
  { number: '30+', label: 'Companies Accelerated' },
  { number: '100m', label: 'Patient Pool by 2030' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const numbers = numberRefs.current.filter(Boolean) as HTMLSpanElement[]
    if (!section || numbers.length === 0) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = section.querySelectorAll<HTMLElement>('.stats-item')

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 })
      gsap.set(numbers, { opacity: 1, y: 0 })
      return
    }

    gsap.set(items, { opacity: 1, y: 0 })
    gsap.set(numbers, { opacity: 0, y: 12, willChange: 'transform' })

    const triggers: ScrollTrigger[] = []

    numbers.forEach((el, i) => {
      const tween = gsap.fromTo(
        el,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power1.out',
          delay: 0.1 + i * 0.15,
          scrollTrigger: {
            trigger: section,
            scroller: '.snap-container',
            start: 'center 80%',
            once: true,
          },
          onComplete: () => {
            el.style.willChange = 'auto'
          },
        }
      )
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <div id="stats-section" ref={sectionRef} className="stats-section stats-overlay">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={stat.label} className="stats-item">
            <span
              ref={(el) => {
                numberRefs.current[i] = el
              }}
              className="stats-number"
            >
              {stat.number}
            </span>
            <span className="stats-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
