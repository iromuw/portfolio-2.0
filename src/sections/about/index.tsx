import { useState } from 'react'
import type { SectionId, HighlightedAboutData } from './types'
import { DEFAULT_FILES } from './constants'
import { resolveNode } from './lib/resolveNode'
import ActivityBar from './components/ActivityBar'
import FileTree from './components/FileTree'
import MobileFileNav from './components/MobileFileNav'
import TabBar from './components/TabBar'
import ContentPanel from './components/ContentPanel'
import SummaryPanel from './components/SummaryPanel'

interface AboutSectionProps {
  data: HighlightedAboutData
}

export default function AboutSection({ data }: AboutSectionProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('personal-info')
  const [activeFile, setActiveFile] = useState<string>(DEFAULT_FILES['personal-info'])
  const [expandedFolders, setExpandedFolders] = useState<string[]>([])

  const handleSectionChange = (section: SectionId) => {
    const defaultFile = DEFAULT_FILES[section]
    const parentFolder = defaultFile.split('/')[1] ? defaultFile.split('/')[0] : null
    setActiveSection(section)
    setActiveFile(defaultFile)
    setExpandedFolders(parentFolder ? [parentFolder] : [])
  }

  const handleFolderToggle = (folderId: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId) ? prev.filter((f) => f !== folderId) : [...prev, folderId],
    )
  }

  const handleTabSelect = (sectionId: SectionId, fileId: string) => {
    if (sectionId !== activeSection) setActiveSection(sectionId)
    setActiveFile(fileId)
    const parentFolder = fileId.includes('/') ? fileId.split('/')[0] : null
    setExpandedFolders(parentFolder ? [parentFolder] : [])
  }

  const sectionData = data[activeSection]
  const activeNode = resolveNode(data, activeSection, activeFile)
  const activeFileNode = activeNode?.type === 'file' ? activeNode : null

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <ActivityBar activeSection={activeSection} onChange={handleSectionChange} />

      <FileTree
        sectionId={activeSection}
        items={sectionData.items}
        contacts={sectionData.contacts}
        activeFile={activeFile}
        expandedFolders={expandedFolders}
        onSelect={setActiveFile}
        onFolderToggle={handleFolderToggle}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <MobileFileNav
          data={data}
          activeSection={activeSection}
          activeFile={activeFile}
          onSelect={handleTabSelect}
        />
        <div className="hidden md:block">
          <TabBar activeFile={activeFile} />
        </div>
        <ContentPanel contentHtml={activeFileNode?.contentHtml ?? ''} isMarkdown={activeFileNode?.isMarkdown} />
      </div>

      <SummaryPanel snippets={activeFileNode?.snippets ?? []} />
    </div>
  )
}
