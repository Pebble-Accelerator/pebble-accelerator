export default function About() {
  return (
    <section style={{
      background: '#F5F0E8',
      padding: '120px 5vw',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
      }}>

        {/* Left — quote + coordinates */}
        <div>
          <p style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(24px, 2.8vw, 38px)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.55,
            color: '#0f0f0f',
            margin: '0 0 48px 0',
          }}>
            Hong Kong sits at a singular crossroads — the gateway between
            China&apos;s vast patient population and the world&apos;s deepest capital
            markets. Pebble was built to exploit this position, backing founders
            with the unfair advantages that come from deep local alignment.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <span style={{
              fontSize: '11px',
              color: 'rgba(0,0,0,0.3)',
              letterSpacing: '0.12em',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            }}>22.3193° N</span>
            <span style={{
              width: '24px', height: '1px',
              background: 'rgba(0,0,0,0.15)',
              display: 'inline-block',
            }} />
            <span style={{
              fontSize: '11px',
              color: 'rgba(0,0,0,0.3)',
              letterSpacing: '0.12em',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            }}>114.1694° E</span>
            <span style={{
              width: '24px', height: '1px',
              background: 'rgba(0,0,0,0.15)',
              display: 'inline-block',
            }} />
            <span style={{
              fontSize: '11px',
              color: 'rgba(0,0,0,0.3)',
              letterSpacing: '0.12em',
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
            }}>Hong Kong</span>
          </div>
        </div>

        {/* Right — HK coastline SVG */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.5,
        }}>
          <svg
            viewBox="0 0 500 400"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '100%',
              maxWidth: '460px',
              height: 'auto',
            }}
            fill="none"
          >
            {/* 
              Hong Kong coastline — two main landmasses:
              1. New Territories / Kowloon Peninsula (north)
              2. Hong Kong Island (south)
              Separated by Victoria Harbour
              Distinctive jagged coastline with inlets
            */}

            {/* Kowloon Peninsula + New Territories */}
            <path
              d="
                M 30,20
                L 60,18 L 85,22 L 110,18 L 135,24
                L 155,20 L 180,16 L 210,18 L 240,14
                L 265,18 L 290,15 L 320,20 L 350,16
                L 375,22 L 400,18 L 430,24 L 460,20
                L 470,30 L 465,45 L 455,55 L 448,68
                L 440,75 L 430,82 L 418,78 L 405,85
                L 395,92 L 385,88 L 372,95 L 360,102
                L 348,98 L 335,106 L 322,112 L 310,108
                L 298,115 L 285,110 L 272,118 L 258,114
                L 245,122 L 232,118 L 220,126
                L 212,132 L 205,128 L 195,135
                L 185,130 L 175,138 L 165,143
                L 155,138 L 145,145 L 135,140
                L 125,148 L 115,144 L 105,150
                L 95,145 L 85,152 L 75,148
                L 65,154 L 55,150 L 45,156
                L 38,150 L 30,155 L 22,148
                L 18,138 L 20,125 L 18,112
                L 22,98 L 20,85 L 24,72
                L 22,58 L 26,44 L 28,32 L 30,20 Z
              "
              stroke="#c8c0b0"
              strokeWidth="1.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Victoria Harbour — water gap label area */}
            <text
              x="250"
              y="188"
              textAnchor="middle"
              style={{
                fontSize: '9px',
                fill: '#c8c0b0',
                letterSpacing: '0.2em',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              VICTORIA HARBOUR
            </text>

            {/* Hong Kong Island */}
            <path
              d="
                M 85,215
                L 95,208 L 110,204 L 125,210
                L 140,205 L 158,200 L 175,205
                L 192,200 L 210,196 L 228,200
                L 245,196 L 262,200 L 278,196
                L 295,202 L 312,198 L 328,204
                L 342,200 L 355,208 L 365,215
                L 370,225 L 365,235 L 355,242
                L 342,248 L 328,252 L 312,255
                L 295,258 L 278,260 L 262,258
                L 245,262 L 228,260 L 210,256
                L 192,260 L 175,256 L 158,252
                L 142,248 L 128,242 L 115,235
                L 102,228 L 90,222 L 85,215 Z
              "
              stroke="#c8c0b0"
              strokeWidth="1.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Lantau Island — west */}
            <path
              d="
                M 22,185
                L 35,178 L 50,182 L 62,176
                L 72,182 L 78,192 L 74,204
                L 62,212 L 48,216 L 35,210
                L 24,202 L 18,192 L 22,185 Z
              "
              stroke="#c8c0b0"
              strokeWidth="1.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Lamma Island — south */}
            <path
              d="
                M 145,285
                L 158,280 L 170,284 L 178,292
                L 175,302 L 165,308 L 152,305
                L 142,298 L 140,288 L 145,285 Z
              "
              stroke="#c8c0b0"
              strokeWidth="1.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Sai Kung peninsula detail — east */}
            <path
              d="
                M 420,88
                L 435,95 L 448,105 L 458,118
                L 462,132 L 458,145 L 448,152
                L 435,148 L 425,138 L 418,125
                L 415,112 L 418,100 L 420,88 Z
              "
              stroke="#c8c0b0"
              strokeWidth="1"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* HK dot marker */}
            <circle
              cx="220"
              cy="228"
              r="3"
              fill="#2D6A5A"
              opacity="0.6"
            />

            {/* Subtle grid lines — cartographic feel */}
            <line x1="0" y1="100" x2="500" y2="100"
              stroke="#c8c0b0" strokeWidth="0.3"
              strokeDasharray="4 8" opacity="0.4"/>
            <line x1="0" y1="200" x2="500" y2="200"
              stroke="#c8c0b0" strokeWidth="0.3"
              strokeDasharray="4 8" opacity="0.4"/>
            <line x1="0" y1="300" x2="500" y2="300"
              stroke="#c8c0b0" strokeWidth="0.3"
              strokeDasharray="4 8" opacity="0.4"/>
            <line x1="125" y1="0" x2="125" y2="400"
              stroke="#c8c0b0" strokeWidth="0.3"
              strokeDasharray="4 8" opacity="0.4"/>
            <line x1="250" y1="0" x2="250" y2="400"
              stroke="#c8c0b0" strokeWidth="0.3"
              strokeDasharray="4 8" opacity="0.4"/>
            <line x1="375" y1="0" x2="375" y2="400"
              stroke="#c8c0b0" strokeWidth="0.3"
              strokeDasharray="4 8" opacity="0.4"/>

            {/* Compass rose — minimal */}
            <g transform="translate(460, 350)">
              <line x1="0" y1="-14" x2="0" y2="14"
                stroke="#c8c0b0" strokeWidth="0.8"/>
              <line x1="-14" y1="0" x2="14" y2="0"
                stroke="#c8c0b0" strokeWidth="0.8"/>
              <text x="0" y="-18" textAnchor="middle"
                style={{
                  fontSize: '8px',
                  fill: '#c8c0b0',
                  fontFamily: 'system-ui',
                }}>N</text>
            </g>
          </svg>
        </div>

      </div>
    </section>
  )
}
