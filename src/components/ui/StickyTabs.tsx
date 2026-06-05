'use client'

import {
  Children,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'

const NAV_VAR = '--sticky-tabs-nav-h'

export type StickyTabsItemProps = {
  /** Sticky header content (label + headline). Stays pinned while the body scrolls under it. */
  title: ReactNode
  children: ReactNode
  sectionClassName?: string
  sectionStyle?: CSSProperties
  headerClassName?: string
  headerStyle?: CSSProperties
  titleClassName?: string
  titleStyle?: CSSProperties
  contentClassName?: string
  contentStyle?: CSSProperties
  /** Absolutely-positioned brand layers (wave motif + grain), rendered behind content. */
  decoration?: ReactNode
}

/** Declarative placeholder — StickyTabs reads these props and renders the actual <section>. */
function StickyTabsItem(_props: StickyTabsItemProps): ReactElement | null {
  return null
}

export type StickyTabsProps = {
  children: ReactNode
  /** Actual fixed-nav height so sticky headers sit just under it (e.g. '64px'). */
  mainNavHeight?: string
  rootClassName?: string
  rootStyle?: CSSProperties
  /** Render a nav-height spacer before the first section (only when tabs are page-top). */
  leadingNavSpacer?: boolean
}

/**
 * Pure-CSS sticky stacking sections. No JS, no IntersectionObserver, no reveal state.
 * Each Item is a <section overflow:clip> with a position:sticky header at
 * top: calc(navHeight - 1px); as you scroll, the next section scrolls up and takes over.
 */
export default function StickyTabs({
  children,
  mainNavHeight = '4rem',
  rootClassName,
  rootStyle,
  leadingNavSpacer = false,
}: StickyTabsProps) {
  const items = Children.toArray(children).filter(
    (child): child is ReactElement<StickyTabsItemProps> =>
      isValidElement(child) && child.type === StickyTabsItem
  )

  return (
    <div
      className={cn('sticky-tabs-root', rootClassName)}
      style={{ [NAV_VAR]: mainNavHeight, width: '100%', ...rootStyle } as CSSProperties}
    >
      {leadingNavSpacer ? (
        <div aria-hidden style={{ height: `var(${NAV_VAR})` }} />
      ) : null}

      {items.map((child, index) => {
        const p = child.props
        return (
          <section
            key={child.key ?? index}
            className={cn('sticky-tabs-section', p.sectionClassName)}
            style={{
              position: 'relative',
              overflow: 'clip',
              width: '100%',
              ...p.sectionStyle,
            }}
          >
            {p.decoration ? (
              <div
                aria-hidden
                style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
              >
                {p.decoration}
              </div>
            ) : null}

            <div
              className={cn('sticky-tabs-header', p.headerClassName)}
              style={{
                position: 'sticky',
                top: `calc(var(${NAV_VAR}) - 1px)`,
                zIndex: 2,
                ...p.headerStyle,
              }}
            >
              <div className={p.titleClassName} style={p.titleStyle}>
                {p.title}
              </div>
            </div>

            <div
              className={cn('sticky-tabs-content', p.contentClassName)}
              style={{ position: 'relative', zIndex: 1, ...p.contentStyle }}
            >
              {p.children}
            </div>
          </section>
        )
      })}
    </div>
  )
}

StickyTabs.Item = StickyTabsItem
