'use client'

import { gsap } from 'gsap'
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { HOME_DESKTOP_MQ } from '@/lib/homeSlideshow'

type SlideshowApi = {
  advance: (dir: number) => void
  goTo: (index: number) => void
  getIndex: () => number
}

declare global {
  interface Window {
    __homeSlideshow?: SlideshowApi
  }
}

const GLIDE_DURATION = 0.6
const GLIDE_EASE = 'power2.out'
/** Singleton guard ; prevents a second instance (StrictMode/Fast Refresh) from
 *  attaching a rival listener set + tween that would fight over scrollTop. */
let controllerActive = false
/** Short window after a glide finishes to swallow leftover trackpad inertia.
 *  Kept minimal so deliberate back-to-back gestures are accepted right after the glide. */
const COOLDOWN_MS = 120
const SWIPE_THRESHOLD = 40
const WHEEL_MIN_DELTA = 4

/**
 * Homepage-only scroll-hijack slideshow. One gesture = exactly one slide, with a
 * GSAP glide. Input is locked mid-animation so a gesture never skips slides.
 * Disabled under prefers-reduced-motion or below 768px (native scroll fallback).
 */
export default function HomeScrollController() {
  const reduced = usePrefersReducedMotion()
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(HOME_DESKTOP_MQ).matches : true
  )

  useEffect(() => {
    const mq = window.matchMedia(HOME_DESKTOP_MQ)
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const slideshowEnabled = isDesktop && !reduced

  useEffect(() => {
    if (!slideshowEnabled) return
    if (controllerActive) return

    const scroller = document.querySelector<HTMLElement>('.snap-container')
    if (!scroller) return
    const slides = Array.from(scroller.querySelectorAll<HTMLElement>('.home-slide'))
    if (slides.length === 0) return

    controllerActive = true

    let index = 0
    let animating = false
    let cooldownUntil = 0
    let touchStartY: number | null = null

    const maxScroll = () => Math.max(0, scroller.scrollHeight - scroller.clientHeight)
    /** Clamp each slide's scroll target to the bottom so the short footer slide is reachable. */
    const targetFor = (i: number) => Math.min(slides[i].offsetTop, maxScroll())

    /** Locked while gliding, plus a brief cooldown that begins when the glide completes. */
    const isLocked = () => animating || performance.now() < cooldownUntil

    const syncIndex = () => {
      const st = scroller.scrollTop
      let best = 0
      let bestDist = Infinity
      slides.forEach((_, i) => {
        const d = Math.abs(targetFor(i) - st)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      index = best
    }
    syncIndex()

    const goTo = (target: number) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, target))
      if (animating || clamped === index) return
      index = clamped
      animating = true
      // The GSAP ticker auto-sleeps after a couple idle seconds (e.g. while the user
      // reads a slide). A tween created against a sleeping ticker never advances and
      // never completes, which would freeze the controller. Wake it on the leading
      // edge so the glide starts instantly on every gesture.
      gsap.ticker.wake()
      gsap.to(scroller, {
        scrollTop: targetFor(clamped),
        duration: GLIDE_DURATION,
        ease: GLIDE_EASE,
        overwrite: true,
        onComplete: () => {
          // Re-enable depends ONLY on the animation finishing (+ short inertia cooldown).
          animating = false
          cooldownUntil = performance.now() + COOLDOWN_MS
        },
      })
    }

    const advance = (dir: number) => goTo(index + (dir > 0 ? 1 : -1))

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isLocked()) return
      if (Math.abs(e.deltaY) < WHEEL_MIN_DELTA) return
      advance(e.deltaY > 0 ? 1 : -1)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? null
    }
    const onTouchMove = (e: TouchEvent) => {
      // Block native momentum scroll while the hijack is active.
      e.preventDefault()
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY == null) return
      const endY = e.changedTouches[0]?.clientY ?? touchStartY
      const delta = touchStartY - endY
      touchStartY = null
      if (isLocked()) return
      if (Math.abs(delta) < SWIPE_THRESHOLD) return
      advance(delta > 0 ? 1 : -1)
    }

    const isTypingTarget = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false
      const tag = el.tagName
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return

      if (e.key === ' ' || e.code === 'Space') {
        // Don't steal Space from a focused button/link (e.g. the scroll chevron).
        const ae = document.activeElement
        if (ae instanceof HTMLElement && (ae.tagName === 'BUTTON' || ae.tagName === 'A')) return
        e.preventDefault()
        if (isLocked()) return
        advance(e.shiftKey ? -1 : 1)
        return
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        if (isLocked()) return
        advance(1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        if (isLocked()) return
        advance(-1)
      }
    }

    scroller.addEventListener('wheel', onWheel, { passive: false })
    scroller.addEventListener('touchstart', onTouchStart, { passive: true })
    scroller.addEventListener('touchmove', onTouchMove, { passive: false })
    scroller.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    // Expose a small API so the Hero chevron / anchors can drive the slideshow.
    window.__homeSlideshow = { advance, goTo, getIndex: () => index }

    return () => {
      scroller.removeEventListener('wheel', onWheel)
      scroller.removeEventListener('touchstart', onTouchStart)
      scroller.removeEventListener('touchmove', onTouchMove)
      scroller.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
      gsap.killTweensOf(scroller)
      if (window.__homeSlideshow) delete window.__homeSlideshow
      controllerActive = false
    }
  }, [slideshowEnabled])

  return null
}
