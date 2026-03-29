import type { RawFileNode } from '@/sections/about/types'
import { BIO_SNIPPET } from '@/sections/about/snippets'

export const interests: RawFileNode = {
  type: 'file',
  iconColor: 'bg-teal-400',
  content: `/**
 * Interests
 *
 * placeholder interests...
 */`,
  snippets: [BIO_SNIPPET],
}
