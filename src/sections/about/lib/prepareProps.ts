import { highlightCode, renderMarkdown } from '@/lib/highlight'
import type {
  RawAboutData,
  RawSnippet,
  RawFileNode,
  RawFolderNode,
  HighlightedAboutData,
  HighlightedSnippet,
  HighlightedFileNode,
  HighlightedFolderNode,
} from '@/sections/about/types'

async function processSnippet(raw: RawSnippet): Promise<HighlightedSnippet> {
  return {
    username: raw.username,
    createdAt: raw.createdAt,
    stars: raw.stars,
    html: await highlightCode(raw.code, raw.lang ?? 'typescript'),
  }
}

async function processFileNode(raw: RawFileNode): Promise<HighlightedFileNode> {
  const isMarkdown = raw.lang === 'md'
  const [contentHtml, snippets] = await Promise.all([
    isMarkdown
      ? Promise.resolve(renderMarkdown(raw.content))
      : highlightCode(raw.content, raw.lang ?? 'typescript'),
    Promise.all(raw.snippets.map(processSnippet)),
  ])
  return { type: 'file', iconColor: raw.iconColor, contentHtml, isMarkdown, snippets }
}

async function processFolderNode(raw: RawFolderNode): Promise<HighlightedFolderNode> {
  const childEntries = await Promise.all(
    Object.entries(raw.children).map(async ([name, child]) => [
      name,
      await processFileNode(child),
    ] as const),
  )
  return {
    type: 'folder',
    iconColor: raw.iconColor,
    children: Object.fromEntries(childEntries),
  }
}

/**
 * Transforms raw authored data into page-ready highlighted data.
 * All Shiki processing is done here — components receive only HTML strings.
 * Call this exclusively in getStaticProps.
 */
export async function prepareAboutProps(raw: RawAboutData): Promise<HighlightedAboutData> {
  const sectionEntries = await Promise.all(
    Object.entries(raw).map(async ([sectionId, section]) => {
      const itemEntries = await Promise.all(
        Object.entries(section.items).map(async ([name, node]) => {
          const highlighted =
            node.type === 'folder'
              ? await processFolderNode(node as RawFolderNode)
              : await processFileNode(node as RawFileNode)
          return [name, highlighted] as const
        }),
      )
      return [
        sectionId,
        { items: Object.fromEntries(itemEntries), contacts: section.contacts },
      ] as const
    }),
  )
  return Object.fromEntries(sectionEntries) as HighlightedAboutData
}
