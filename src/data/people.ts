export interface Person {
  id: string
  name: string
  role: string
  company?: string
  /** Portrait asset in /public. When absent, the card renders a neutral gradient
   *  placeholder (matching the portfolio tile system) so it can be populated later. */
  photo?: string
  /** Internal bio page. The "Read" affordance only renders when this is present. */
  bioHref?: string
  /** Ghosted mark on the placeholder tile. Defaults to the person's initials. */
  placeholderMark?: string
}

/**
 * PLACEHOLDER SCAFFOLD — replace name/role/company with the real partners or
 * portfolio founders, add a `photo` path once portraits exist, and add a
 * `bioHref` to surface the "Read" affordance. The People section is designed so
 * these entries can be filled in with no component changes.
 */
export const people: Person[] = [
  { id: 'p1', name: 'Name Surname', role: 'Founding Partner', company: 'Pebble Accelerator', placeholderMark: '01' },
  { id: 'p2', name: 'Name Surname', role: 'Partner', company: 'Pebble Accelerator', placeholderMark: '02' },
  { id: 'p3', name: 'Name Surname', role: 'Principal', company: 'Pebble Accelerator', placeholderMark: '03' },
  { id: 'p4', name: 'Name Surname', role: 'Venture Partner', company: 'Pebble Accelerator', placeholderMark: '04' },
]

export default people
