export type ClassValue = string | number | null | false | undefined

/** Tiny class-name joiner (project uses inline styles + Tailwind; no need for clsx). */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
