import Link from 'next/link'

interface Props {
  variant: 'primary' | 'text'
  label: string
  href?: string
  type?: 'button' | 'submit'
  className?: string
}

export default function Button({ variant, label, href, type, className = '' }: Props) {
  const primaryStyles =
    'inline-block bg-ink text-white text-[13px] font-medium py-[10px] px-[22px] hover:bg-ink-dark transition-colors duration-150'
  const textStyles =
    'inline-block text-ink-muted text-[13px] font-normal hover:text-ink transition-colors duration-150'

  const styles = variant === 'primary' ? primaryStyles : textStyles
  const children = variant === 'text' ? `${label} →` : label

  if (href) {
    return (
      <Link href={href} className={`${styles} ${className}`}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type ?? 'button'} className={`${styles} ${className}`}>
      {children}
    </button>
  )
}
