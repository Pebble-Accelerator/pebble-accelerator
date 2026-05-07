'use client'

import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

export type ScrollEntranceMode = 'pending' | 'static' | 'animate'

/**
 * First IO callback: if already intersecting → static (no entrance animation).
 * If not intersecting, later intersection → animate.
 */
export function useScrollEntranceMode(enabled: boolean): {
  ref: RefObject<HTMLElement | null>
  mode: ScrollEntranceMode
} {
  const ref = useRef<HTMLElement | null>(null)
  const [mode, setMode] = useState<ScrollEntranceMode>(() =>
    enabled ? 'pending' : 'static'
  )

  useEffect(() => {
    if (!enabled) {
      setMode('static')
      return
    }

    const el = ref.current
    if (!el) return

    let first = true
    const io = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false
          if (entry.isIntersecting) {
            setMode('static')
            io.disconnect()
            return
          }
          return
        }
        if (entry.isIntersecting) {
          setMode('animate')
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [enabled])

  return { ref, mode }
}
