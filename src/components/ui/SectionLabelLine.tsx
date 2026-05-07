'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Props = {
  children: ReactNode
  /** Outer wrapper block spacing (replaces prior label marginBottom on the span). */
  marginBottom?: string
  gap?: string
}

export default function SectionLabelLine({
  children,
  marginBottom = '48px',
  gap = '16px',
}: Props) {
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

  const lineInnerStyle: CSSProperties = {
    height: '1px',
    background: '#e5e5e5',
    width: revealed ? '100%' : '0%',
    transition:
      reduced || skipLineTransition ? undefined : 'width 600ms ease-out',
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
        {children}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            height: '1px',
            overflow: 'hidden',
          }}
        >
          <div style={lineInnerStyle} />
        </div>
      </div>
    </div>
  )
}
