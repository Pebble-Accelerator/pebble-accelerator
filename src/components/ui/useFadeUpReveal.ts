'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export type FadeUpRevealOptions = {
  /** Fraction of element visible before firing (default 0.08). */
  threshold?: number
  rootMargin?: string
}

export type FadeUpMotionOptions = {
  translateYPx?: number
  durationMs?: number
  easing?: string
}

export function useFadeUpReveal(options?: FadeUpRevealOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [revealed, setRevealed] = useState(reduced)
  const threshold = options?.threshold ?? 0.08
  const rootMargin = options?.rootMargin ?? '0px 0px -40px 0px'

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
      { threshold, rootMargin }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [reduced, threshold, rootMargin])

  return { ref, revealed, reduced }
}

export const fadeUpStyle = (
  revealed: boolean,
  reduced: boolean,
  delayMs = 0,
  motion?: FadeUpMotionOptions
): CSSProperties => {
  const translateYPx = motion?.translateYPx ?? 24
  const durationMs = motion?.durationMs ?? 800
  const easing = motion?.easing ?? 'cubic-bezier(0.4, 0, 0.2, 1)'

  return {
    opacity: revealed || reduced ? 1 : 0,
    transform: revealed || reduced ? 'translateY(0)' : `translateY(${translateYPx}px)`,
    transition: reduced
      ? 'none'
      : `opacity ${durationMs}ms ${easing} ${delayMs}ms, transform ${durationMs}ms ${easing} ${delayMs}ms`,
  }
}
