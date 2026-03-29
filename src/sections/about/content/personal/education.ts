import type { RawFolderNode } from '../../types'
import { BIO_SNIPPET } from '../../snippets'

export const education: RawFolderNode = {
  type: 'folder',
  iconColor: 'bg-purple-400',
  content: `/**
 * Education
 *
 * placeholder education summary...
 */`,
  snippets: [BIO_SNIPPET],
  children: {
    bachelor: {
      type: 'file',
      iconColor: 'bg-slate-500',
      content: `/**
 * Bachelor's Degree
 *
 * placeholder bachelor details...
 */`,
      snippets: [],
    },
    master: {
      type: 'file',
      iconColor: 'bg-slate-500',
      content: `/**
 * Master's Degree
 *
 * placeholder master details...
 */`,
      snippets: [],
    },
  },
}
