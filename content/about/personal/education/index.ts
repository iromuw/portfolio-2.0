import type { RawFolderNode } from '~/content/about/types'
import { master } from './master'
import { bachelor } from './bachelor'

export const education: RawFolderNode = {
  type: 'folder',
  iconColor: 'bg-purple-400',
  children: { master, bachelor },
}
