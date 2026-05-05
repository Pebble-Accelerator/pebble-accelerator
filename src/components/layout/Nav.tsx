'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'

const links = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/consulting' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-[#e8e8e8] h-[56px]">
        <div className="h-full max-w-[1200px] mx-auto px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/Pebble_Accelerator_Sideways_Logo.png"
              alt="Pebble Accelerator"
              height={32}
              width={180}
              priority
              style={{ objectFit: 'contain' }}
            />
          </Link>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] text-[#888] hover:text-[#0f0f0f] transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — desktop */}
          <div className="hidden md:block">
            <Button
              variant="primary"
              label="Apply"
              href="/contact"
              className="py-2 px-[18px] rounded-none bg-[#0f0f0f] text-white text-[13px] font-medium"
            />
          </div>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col justify-between w-5 h-[14px]"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-full h-px bg-ink" />
            <span className="block w-full h-px bg-ink" />
            <span className="block w-full h-px bg-ink" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-10">
          <button
            className="self-end text-[13px] text-ink-muted hover:text-ink mb-10"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            Close
          </button>
          <nav className="flex flex-col gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-sans text-[32px] font-normal text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
