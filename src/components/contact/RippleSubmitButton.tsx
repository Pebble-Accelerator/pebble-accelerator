'use client'

import type { MouseEvent } from 'react'
import { useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * The contact form's send button. On a successful (valid) submit it emanates a
 * single ripple from the click point — the connective-ripple language applied to
 * the site's one form. Restrained; frozen under reduced motion. Keeps the existing
 * `.contact-submit` treatment (defined globally on the contact page).
 */
export default function RippleSubmitButton() {
  const reduced = usePrefersReducedMotion()
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current
    if (!btn) return
    // Only ripple when the form will actually submit (valid) — a real success cue.
    const form = btn.closest('form')
    if (form && !form.checkValidity()) return
    if (reduced) return
    const rect = btn.getBoundingClientRect()
    btn.style.setProperty('--sx', `${e.clientX - rect.left}px`)
    btn.style.setProperty('--sy', `${e.clientY - rect.top}px`)
    btn.classList.remove('is-rippling')
    void btn.offsetWidth // restart the animation
    btn.classList.add('is-rippling')
  }

  return (
    <button
      ref={btnRef}
      type="submit"
      className="contact-submit"
      onClick={handleClick}
      onAnimationEnd={() => btnRef.current?.classList.remove('is-rippling')}
    >
      <span aria-hidden className="contact-submit__ripple" />
      <span className="contact-submit__label">
        Send message
        <span aria-hidden style={{ marginLeft: '8px' }}>
          &rarr;
        </span>
      </span>

      <style jsx>{`
        .contact-submit {
          position: relative;
          overflow: hidden;
        }
        .contact-submit__label {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
        }
        .contact-submit__ripple {
          position: absolute;
          left: var(--sx, 50%);
          top: var(--sy, 50%);
          width: 14px;
          height: 14px;
          margin: -7px 0 0 -7px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            color-mix(in srgb, var(--color-canvas) 55%, transparent) 0%,
            color-mix(in srgb, var(--color-canvas) 40%, transparent) 30%,
            transparent 70%
          );
          transform: scale(0);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
        }
        .contact-submit.is-rippling .contact-submit__ripple {
          animation: contactSubmitRipple 740ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        @keyframes contactSubmitRipple {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          16% {
            opacity: 0.5;
          }
          100% {
            transform: scale(26);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-submit.is-rippling .contact-submit__ripple {
            animation: none;
          }
        }
      `}</style>
    </button>
  )
}
