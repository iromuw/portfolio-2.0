import type {
  SectionId,
  HighlightedAboutData,
  HighlightedTreeNode,
  HighlightedFolderNode,
} from '@/sections/about/types'

/**
 * Resolves a dot-free file path (e.g. "bio" or "education/master")
 * to the matching tree node in the highlighted data.
 */
export function resolveNode(
  data: HighlightedAboutData,
  sectionId: SectionId,
  fileId: string,
): HighlightedTreeNode | null {
  const items = data[sectionId].items
  const [top, child] = fileId.split('/')

  if (!child) return items[top] ?? null

  const folder = items[top]
  if (folder?.type === 'folder') {
    return (folder as HighlightedFolderNode).children[child] ?? null
  }
  return null
}
