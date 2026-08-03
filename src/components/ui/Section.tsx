import type { CSSProperties, ElementType, ReactNode } from 'react'

type Tone = 'canvas' | 'dark' | 'transparent'

type Props = {
  children: ReactNode
  /** First section on a standalone page → uses the nav-clearing top reserve so
   *  primary content begins within the first viewport. */
  first?: boolean
  /** Background ground. `dark` reuses the hero's slate ground. */
  tone?: Tone
  as?: ElementType
  className?: string
  /** Extra styles on the outer padded band. */
  style?: CSSProperties
  /** Extra styles on the centered max-width inner column. */
  innerStyle?: CSSProperties
  /** Override the inner max-width (defaults to the shared content-max token). */
  maxWidth?: string
}

const TONE_BG: Record<Tone, string> = {
  canvas: 'var(--color-canvas)',
  dark: 'var(--color-slate-dark)',
  transparent: 'transparent',
}

/**
 * Shared section wrapper: one gutter, one max-width column, and vertical rhythm
 * pulled from the spacing scale (`--space-*`). Replaces per-section hardcoded
 * padding so every page shares the same cadence. `first` uses `--space-page-top`
 * (nav clearance); every other section uses `--space-section-y`.
 */
export default function Section({
  children,
  first = false,
  tone = 'transparent',
  as: Tag = 'section',
  className,
  style,
  innerStyle,
  maxWidth = 'var(--content-max)',
}: Props) {
  return (
    <Tag
      className={className}
      style={{
        background: TONE_BG[tone],
        paddingTop: first ? 'var(--space-page-top)' : 'var(--space-section-y)',
        paddingBottom: 'var(--space-section-y)',
        paddingLeft: 'var(--gutter-x)',
        paddingRight: 'var(--gutter-x)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ maxWidth, margin: '0 auto', width: '100%', ...innerStyle }}>{children}</div>
    </Tag>
  )
}
