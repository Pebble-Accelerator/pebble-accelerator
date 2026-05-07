import { useEffect, useRef, useState } from 'react'

export function useNearViewport<T extends Element>(options?: { rootMargin?: string }) {
  const ref = useRef<T | null>(null)
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (isNear) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setIsNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: options?.rootMargin ?? '500px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isNear, options?.rootMargin])

  return { ref, isNear }
}

