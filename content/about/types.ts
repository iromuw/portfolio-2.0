// ── Navigation ────────────────────────────────────────────────────────────────

export type SectionId = 'personal-info' | 'professional-info'

// ── Shared ────────────────────────────────────────────────────────────────────

export interface ContactData {
  email: string
  phone?: string
}

// ── Raw types — authored content, pre-Shiki ───────────────────────────────────

export type ContentLang = 'typescript' | 'javascript' | 'tsx' | 'jsx' | 'bash' | 'json' | 'md'

export interface RawSnippet {
  username: string
  createdAt: string
  stars: number
  /** Shiki language identifier. Defaults to 'typescript'. */
  lang?: ContentLang
  code: string
}

export interface RawFileNode {
  type: 'file'
  iconColor: string
  content: string
  /** Shiki language for content highlighting. Defaults to 'typescript'. */
  lang?: ContentLang
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
