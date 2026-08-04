'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Props = {
  children: ReactNode
  /** Mono index rendered as `(NN)` before the label — numbered in document order. */
  index?: number
  /** `dark` lifts the metadata grey for legibility on a dark ground (AA-safe). */
  tone?: 'light' | 'dark'
  /** Outer wrapper block spacing (replaces prior label marginBottom on the span). */
  marginBottom?: string
  gap?: string
}

/** Meta colour per ground. On dark, a lifted cream keeps the index/hairline above
 *  AA contrast instead of the near-invisible var(--color-meta). */
const META_LIGHT = 'var(--color-meta)'
const META_DARK = 'color-mix(in srgb, var(--color-canvas) 60%, transparent)'

export default function SectionLabelLine({
  children,
  index,
  tone = 'light',
  marginBottom = '48px',
  gap = '14px',
}: Props) {
  const metaColor = tone === 'dark' ? META_DARK : META_LIGHT
  const reduced = usePrefersReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [skipLineTransition, setSkipLineTransition] = useState(false)

  useEffect(() => {
    if (reduced) {
      setSkipLineTransition(true)
      setRevealed(true)
      return
    }

    const el = wrapRef.current
    if (!el) return

    let first = true
    const io = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false
          if (entry.isIntersecting) {
            setSkipLineTransition(true)
            setRevealed(true)
            io.disconnect()
            return
          }
          return
        }
        if (entry.isIntersecting) {
          setRevealed(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  // Plain hairline divider (the ripple mark + curved arc were cropped, origin-less
  // marks and were removed). Still reveals left→right on scroll-in.
  const lineRevealStyle: CSSProperties = {
    width: revealed ? '100%' : '0%',
    height: '1px',
    background: metaColor,
    opacity: 0.5,
    transition: reduced || skipLineTransition ? undefined : 'width 600ms ease-out',
  }

  return (
    <div ref={wrapRef} style={{ marginBottom, width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap,
          width: '100%',
        }}
      >
        {typeof index === 'number' && (
          <span
            style={{
              fontFamily: 'var(--font-mono), ui-monospace, monospace',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.04em',
              color: metaColor,
              flexShrink: 0,
            }}
          >
            ({String(index).padStart(2, '0')})
          </span>
        )}
        {children}
        <div style={{ flex: 1, minWidth: 0, height: '1px', overflow: 'hidden' }}>
          <div style={lineRevealStyle} />
        </div>
      </div>
    </div>
  )
}
