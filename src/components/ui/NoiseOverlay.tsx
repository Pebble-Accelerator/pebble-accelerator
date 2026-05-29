export default function NoiseOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
        opacity: 0.04,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="paperNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.65}
              numOctaves={2}
              stitchTiles="stitch"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#paperNoise)" />
      </svg>
    </div>
  )
}
