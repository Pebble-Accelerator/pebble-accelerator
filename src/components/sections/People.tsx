'use client'

import SectionLabelLine from '@/components/ui/SectionLabelLine'
import { people } from '@/data/people'
import type { Person } from '@/data/people'
import { darkenBlockColor } from '@/data/portfolio'
import { FILM_GRAIN_TILE_STYLE } from '@/lib/filmGrain'
import { pebbleWaveLayer } from '@/lib/pebbleWaveMotif'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--color-meta)',
  whiteSpace: 'nowrap',
}

const TILE_NAME_FOREST = 'var(--color-slate-dark)'
/** Neutral stone in the same family as the portfolio tiles; the placeholder tile
 *  uses the identical gradient system (base → 12% darker) so people can be dropped
 *  in later without a redesign. */
const PERSON_BASE = '#c3bdaf'
const PERSON_DARK = darkenBlockColor(PERSON_BASE, 12)
const PERSON_WAVE = darkenBlockColor(PERSON_BASE, 16)

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

function PersonCard({ person }: { person: Person }) {
  const hasPhoto = Boolean(person.photo)
  const mark = person.placeholderMark ?? initials(person.name)

  const surfaceStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    aspectRatio: '4 / 5',
    width: '100%',
    background: `linear-gradient(180deg, ${PERSON_BASE} 0%, ${PERSON_DARK} 100%)`,
    boxSizing: 'border-box',
    padding: 'clamp(18px, 2.4vw, 28px)',
    overflow: 'hidden',
    borderRadius: '10px',
    border: '1px solid color-mix(in srgb, var(--color-slate-dark) 14%, transparent)',
  }

  const nameColor = hasPhoto ? 'var(--color-canvas)' : TILE_NAME_FOREST
  // #4F6B5D left as-is: coincides with the Platform bucket accent value but
  // isn't part of the general token set — see DESIGN.md.
  const roleColor = hasPhoto ? 'color-mix(in srgb, var(--color-canvas) 85%, transparent)' : '#4F6B5D'

  return (
    <div className="person-tile">
      <div className="person-tile-surface" style={surfaceStyle} aria-label={person.name}>
        {hasPhoto ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.photo}
              alt={person.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Bottom scrim so the name stays legible over the portrait. */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(20,26,22,0) 40%, rgba(20,26,22,0.72) 100%)',
              }}
            />
          </>
        ) : (
          <>
            <div aria-hidden style={pebbleWaveLayer(PERSON_WAVE, 'back')} />
            <div aria-hidden className="person-tile-wave-front" style={pebbleWaveLayer(PERSON_WAVE, 'front')} />
            {/* Ghosted mark — the neutral placeholder stand-in for a portrait. */}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -58%)',
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(52px, 6vw, 76px)',
                fontWeight: 500,
                lineHeight: 1,
                color: TILE_NAME_FOREST,
                opacity: 0.14,
                userSelect: 'none',
              }}
            >
              {mark}
            </span>
          </>
        )}
        <div aria-hidden style={FILM_GRAIN_TILE_STYLE} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
          <h3
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(22px, 2.4vw, 30px)',
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: nameColor,
              margin: '0 0 6px',
            }}
          >
            {person.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: roleColor,
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {person.role}
            {person.company ? ` · ${person.company}` : ''}
          </p>

          {person.bioHref && (
            <a
              href={person.bioHref}
              className="link-underline"
              style={{
                display: 'inline-block',
                marginTop: '12px',
                fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
                // Matches PortfolioHome.tsx's "See all →" — the same functional
                // element (in-content CTA link with trailing arrow), previously
                // 11px/500/0.08em here vs 12px/500/0.1em there.
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: hasPhoto ? 'var(--color-canvas)' : 'var(--color-forest)',
              }}
            >
              Read →
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .person-tile-surface {
          box-shadow:
            inset 0 1px 0 color-mix(in srgb, var(--color-canvas) 50%, transparent),
            0 1px 2px color-mix(in srgb, var(--color-slate-dark) 5%, transparent);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          will-change: transform;
        }

        .person-tile-surface:hover {
          transform: translateY(-5px);
          box-shadow:
            inset 0 1px 0 color-mix(in srgb, var(--color-canvas) 50%, transparent),
            0 18px 38px -14px color-mix(in srgb, var(--color-slate-dark) 30%, transparent);
        }

        .person-tile-wave-front {
          transition: transform 0.25s ease;
          will-change: transform;
        }

        .person-tile-surface:hover .person-tile-wave-front {
          transform: translate3d(-6px, -3px, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .person-tile-surface {
            transition: box-shadow 0.25s ease;
          }
          .person-tile-surface:hover {
            transform: none;
            box-shadow:
              inset 0 1px 0 color-mix(in srgb, var(--color-canvas) 50%, transparent),
              0 6px 16px -8px color-mix(in srgb, var(--color-slate-dark) 22%, transparent);
          }
          .person-tile-surface:hover .person-tile-wave-front {
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}

export default function People() {
  return (
    <section
      className="people-section"
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'safe center',
        boxSizing: 'border-box',
        // Asymmetric top reserve clears the fixed 64px nav (see PortfolioHome).
        padding: 'var(--space-page-top) var(--gutter-x) var(--space-section-y)',
        background: 'var(--color-canvas)',
      }}
    >
      {/* Centered composition — eyebrow + headline sit as the focal on an airy
          field, breaking the left-aligned label/headline pattern of its neighbours. */}
      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ maxWidth: '320px', margin: '0 auto 28px' }}>
          <SectionLabelLine index={2} marginBottom="0">
            <span style={labelStyle}>People</span>
          </SectionLabelLine>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(30px, 3.4vw, 46px)',
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            margin: '0 auto clamp(48px, 7vh, 88px)',
            maxWidth: '22ch',
          }}
        >
          The people behind Pebble.
        </h2>

        <div className="people-grid">
          {people.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </div>

      <style>{`
        .people-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 900px) {
          .people-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 520px) {
          .people-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
