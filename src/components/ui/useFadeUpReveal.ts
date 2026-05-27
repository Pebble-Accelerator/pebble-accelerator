'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function useFadeUpReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [revealed, setRevealed] = useState(reduced)

  useEffect(() => {
    if (reduced) {
      setRevealed(true)
      return
    }

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          io.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  return { ref, revealed, reduced }
}

export const fadeUpStyle = (
  revealed: boolean,
  reduced: boolean,
  delayMs = 0
): CSSProperties => ({
  opacity: revealed || reduced ? 1 : 0,
  transform: revealed || reduced ? 'translateY(0)' : 'translateY(24px)',
  transition: reduced
    ? 'none'
    : `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delayMs}ms, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delayMs}ms`,
})
