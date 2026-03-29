import type { RawFileNode } from '@/sections/about/types'
import { ACF_SNIPPETS } from '@/sections/about/snippets/professional/experience/acf'

export const acf: RawFileNode = {
  type: 'file',
  iconColor: 'bg-slate-500',
  content: `/**
 * UI/UX Designer (Volunteer)
 * Australia Career Forum
 * Oct 2022 – Aug 2023
 *
 * Contributed to UX improvements for a career development platform,
 * aligning design decisions with frontend implementation.
 *
 * Key contributions:
 * - Designed and prototyped responsive user interfaces with a focus
 *   on usability and accessibility.
 *
 * - Collaborated with frontend engineers to ensure technically feasible
 *   and efficient implementations.
 *
 * - Produced structured design documentation to support handoff
 *   and project delivery.
 */`,
  snippets: [ACF_SNIPPETS],
}
