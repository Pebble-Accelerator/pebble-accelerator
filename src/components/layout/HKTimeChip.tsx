'use client'

import { useEffect, useState } from 'react'

/**
 * Hong Kong time chip for the Nav: "HONG KONG · HH:MM:SS · GMT+8" in mono
 * uppercase at --color-meta. Hydration-safe per the codebase pattern — a stable
 * placeholder ("--:--:--") renders on the server and first client paint, and the
 * real Asia/Hong_Kong time only fills in inside useEffect, ticking every second.
 */
export default function HKTimeChip({ color }: { color: string }) {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Hong_Kong',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      aria-hidden
      className="hk-time-chip"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-mono), ui-monospace, monospace',
        fontSize: '10px',
        fontWeight: 400,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color,
        whiteSpace: 'nowrap',
        transition: 'color 0.25s ease',
      }}
    >
      <span>Hong Kong</span>
      <span style={{ opacity: 0.5 }}>·</span>
      {/* tabular-nums + fixed min-width so the row never reflows as digits change */}
      <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: '58px' }}>{time}</span>
      <span style={{ opacity: 0.5 }}>·</span>
      <span>GMT+8</span>
    </div>
  )
}
