import { createHighlighter } from 'shiki'
import { marked } from 'marked'

type HighlighterInstance = Awaited<ReturnType<typeof createHighlighter>>

// Singleton : one instance shared across all getStaticProps calls at build time
let highlighterPromise: Promise<HighlighterInstance> | null = null

function getHighlighter(): Promise<HighlighterInstance> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark-dimmed'],
      langs: ['typescript', 'javascript', 'tsx', 'jsx', 'bash', 'json', 'md'],
    })
  }
  return highlighterPromise
}

/**
 * Convert a Markdown string to HTML.
 * Used for content files authored in Markdown so they render as prose, not
 * as Shiki-highlighted code blocks.  Runs server-side only (getStaticProps).
 */
export function renderMarkdown(content: string): string {
  return String(marked.parse(content))
}

/**
 * Highlight a code string with Shiki.
 * Returns an HTML string which is safe to render via dangerouslySetInnerHTML.
 * Should only be called server-side (getStaticProps / API routes).
 */
export async function highlightCode(
  code: string,
  lang = 'typescript',
): Promise<string> {
  const hl = await getHighlighter()
  const html = hl.codeToHtml(code.trimEnd(), { lang, theme: 'github-dark-dimmed' })
  // Remove \n between .line spans which inside <pre white-space:pre> these text nodes
  // become anonymous block boxes that render as visible blank lines.
  // display:block on .line already handles line separation, so \n is redundant.
  return html.replace(/\n/g, '')
}
