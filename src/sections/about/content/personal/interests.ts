import type { RawFileNode } from '../../types'
import { BIO_SNIPPET } from '../../snippets'

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
