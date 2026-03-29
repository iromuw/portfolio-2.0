// ── Navigation ────────────────────────────────────────────────────────────────

export type SectionId = 'personal-info' | 'professional-info'

// ── Shared ────────────────────────────────────────────────────────────────────

export interface ContactData {
  email: string
  phone?: string
}

// ── Raw types — authored content, pre-Shiki ───────────────────────────────────

export interface RawSnippet {
  username: string
  createdAt: string
  stars: number
  /** Shiki language identifier. Defaults to 'typescript'. */
  lang?: string
  code: string
}

export interface RawFileNode {
  type: 'file'
  iconColor: string
  content: string
  snippets: RawSnippet[]
}

export interface RawFolderNode {
  type: 'folder'
  iconColor: string
  children: Record<string, RawFileNode>
}

export type RawTreeNode = RawFileNode | RawFolderNode

export interface RawSectionData {
  items: Record<string, RawTreeNode>
  contacts: ContactData
}

export type RawAboutData = Record<SectionId, RawSectionData>

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
