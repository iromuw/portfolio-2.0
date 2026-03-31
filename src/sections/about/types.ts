// Raw/content schema types live in the content layer — re-exported here for
// backward-compatibility with all UI and lib files that import from this path.
export type {
  SectionId,
  ContactData,
  ContentLang,
  RawSnippet,
  RawFileNode,
  RawFolderNode,
  RawTreeNode,
  RawSectionData,
  RawAboutData,
} from '~/content/about/types'

import type { SectionId, ContactData } from '~/content/about/types'

// ── Highlighted types — post-Shiki, page-ready ────────────────────────────────

export interface HighlightedSnippet {
  username: string
  createdAt: string
  stars: number
  html: string
}

export interface HighlightedFileNode {
  type: 'file'
  iconColor: string
  contentHtml: string
  snippets: HighlightedSnippet[]
}

export interface HighlightedFolderNode {
  type: 'folder'
  iconColor: string
  children: Record<string, HighlightedFileNode>
}

export type HighlightedTreeNode = HighlightedFileNode | HighlightedFolderNode

export interface HighlightedSectionData {
  items: Record<string, HighlightedTreeNode>
  contacts: ContactData
}

export type HighlightedAboutData = Record<SectionId, HighlightedSectionData>
