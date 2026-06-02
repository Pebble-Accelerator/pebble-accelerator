'use client'

import { useState } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import portfolio from '@/data/portfolio'
import type { Company } from '@/types'

interface Props {
  limit?: number
}

function CompanyRow({ company, isFirst }: { company: Company; isFirst: boolean }) {
  const href = `/portfolio/${company.slug}`

  return (
    <Link
      href={href}
      className={`group flex cursor-pointer items-baseline justify-between gap-4 border-b border-black/[0.08] py-[28px] transition-all duration-150 md:gap-6 ${
        isFirst ? 'border-t border-black/[0.08]' : ''
      }`}
    >
      <div className="flex min-w-0 shrink items-baseline gap-4">
        <span className="font-sans text-[18px] font-medium text-[#0f0f0f] transition-colors duration-150 group-hover:text-[#2D6A5A]">
          {company.name}
        </span>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.08em] text-[#2D6A5A]">
          {company.category}
        </span>
      </div>
      <div className="flex min-w-0 shrink-0 items-baseline justify-end gap-10">
        <span className="hidden max-w-[400px] text-right text-[13px] font-light text-[#888] md:block">
          {company.category}
        </span>
      </div>
    </Link>
  )
}

export default function Portfolio({ limit }: Props) {
  const [activeSector, setActiveSector] = useState('All')
  const [rippleIndex, setRippleIndex] = useState<number | null>(null)

  const companies = limit !== undefined ? portfolio.slice(0, limit) : portfolio
  const showViewAll = limit !== undefined
  const sectors = ['All', ...Array.from(new Set(portfolio.map((c) => c.filterGroup)))]

  return (
    <section
      className="bg-[#f5efe4] px-[8vw] pt-0"
      style={{
        paddingLeft: '8vw',
        paddingRight: '8vw',
        paddingBottom: '120px',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="mx-auto max-w-[1280px]"
        style={{
          maxWidth: '1280px',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxSizing: 'border-box',
        }}
      >
        {showViewAll && (
          <FadeIn>
            <div className="mb-12 flex items-baseline justify-between">
              <span className="text-[11px] font-normal uppercase tracking-[0.12em] text-[#888]">
                Portfolio
              </span>
              <Link
                href="/portfolio"
                className="text-[13px] text-[#888] transition-colors hover:text-[#0f0f0f]"
              >
                All companies →
              </Link>
            </div>
          </FadeIn>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'stretch',
          }}
        >
          {!limit && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '32px',
                width: '100%',
              }}
            >
              {sectors.map((s) => {
                const active = activeSector === s
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setActiveSector(s)}
                    style={{
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      borderRadius: '9999px',
                      padding: '6px 16px',
                      fontSize: '11px',
                      fontWeight: 400,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      transition:
                        'background-color 150ms ease, color 150ms ease, border-color 150ms ease',
                      ...(active
                        ? {
                            borderColor: '#2d3a35',
                            backgroundColor: '#2d3a35',
                            color: '#ffffff',
                          }
                        : {
                            borderColor: '#c8c2b8',
                            backgroundColor: 'transparent',
                            color: '#555555',
                          }),
                    }}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          )}

          {!limit && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '1px',
                overflow: 'hidden',
                borderRadius: '6px',
                backgroundColor: '#d4cfc2',
                border: '0.5px solid #d4cfc2',
                marginBottom: '48px',
                width: '100%',
              }}
            >
              {portfolio.map((company, i) => {
                const row = Math.floor(i / 3)
                const col = i % 3
                const dist =
                  rippleIndex !== null
                    ? Math.abs(Math.floor(rippleIndex / 3) - row) +
                      Math.abs((rippleIndex % 3) - col)
                    : null
                const isFiltered =
                  activeSector !== 'All' && company.filterGroup !== activeSector

                return (
                  <Link
                    key={company.id}
                    href={`/portfolio/${company.slug}`}
                    onMouseEnter={() => setRippleIndex(i)}
                    onMouseLeave={() => setRippleIndex(null)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: '140px',
                      padding: '24px',
                      gap: '8px',
                      boxSizing: 'border-box',
                      background:
                        dist === 0
                          ? '#e8e0d2'
                          : dist === 1
                            ? '#eee7da'
                            : dist === 2
                              ? '#f1eade'
                              : '#f5efe4',
                      opacity: isFiltered ? 0.25 : 1,
                      transition: 'background 200ms, opacity 200ms',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontSize: '17px',
                        fontWeight: 500,
                        color: '#0f0f0f',
                        lineHeight: 1.25,
                      }}
                    >
                      {company.name}
                    </span>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-ibm-plex-sans), system-ui, sans-serif',
                        fontSize: '12px',
                        fontWeight: 300,
                        lineHeight: 1.6,
                        color: '#666666',
                      }}
                    >
                      {company.category}
                    </span>
                    <span
                      style={{
                        marginTop: 'auto',
                        fontFamily:
                          'var(--font-ibm-plex-sans), system-ui, sans-serif',
                        fontSize: '10px',
                        fontWeight: 400,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#5e7a6a',
                      }}
                    >
                      {company.category}
                    </span>
                  </Link>
                )
              })}
            </div>
          )}

          {!limit && (
            <p
              style={{
                fontFamily:
                  'var(--font-ibm-plex-sans), system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#888888',
                marginTop: '48px',
                marginBottom: '20px',
              }}
            >
              All companies
            </p>
          )}

          {companies.map((company, i) => (
            <CompanyRow key={company.id} company={company} isFirst={i === 0} />
          ))}
          {showViewAll && (
            <Link
              href="/portfolio"
              className="flex cursor-pointer justify-center border-b border-black/[0.08] py-[22px] text-[13px] text-[#888] transition-colors hover:text-[#0f0f0f]"
            >
              View all companies →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
