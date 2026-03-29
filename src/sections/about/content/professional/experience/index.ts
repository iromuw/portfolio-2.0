import type { RawFolderNode } from '../../../types'
import { tpi } from './tpi'
import { acf } from './acf'

export const experience: RawFolderNode = {
  type: 'folder',
  iconColor: 'bg-amber-400',
  children: { tpi, acf },
}
