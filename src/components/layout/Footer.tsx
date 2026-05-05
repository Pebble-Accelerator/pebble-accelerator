import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 md:px-10 py-[18px] flex flex-row items-center justify-between">
      <div className="flex flex-col items-start">
        <Image
          src="/logos/Pebble_Accelerator_Sideways_Logo.png"
          alt="Pebble Accelerator"
          height={24}
          width={140}
          style={{ objectFit: 'contain', opacity: 0.6, marginBottom: '12px' }}
        />
        <span className="text-[12px] text-ink-ghost">
          © 2025 Pebble Accelerator · Hong Kong
        </span>
      </div>
      <div className="flex items-center gap-5">
        <a
          href="https://linkedin.com/company/pebbleaccelerator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-ink-ghost hover:text-ink-secondary transition-colors duration-150"
        >
          LinkedIn
        </a>
        <Link
          href="/privacy"
          className="text-[12px] text-ink-ghost hover:text-ink-secondary transition-colors duration-150"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="text-[12px] text-ink-ghost hover:text-ink-secondary transition-colors duration-150"
        >
          Terms
        </Link>
      </div>
    </footer>
  )
}
