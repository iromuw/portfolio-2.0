import { ChevronDown, ChevronRight, Mail, Phone } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import type {
  ContactData,
  HighlightedFolderNode,
  HighlightedTreeNode,
  SectionId,
} from '@/sections/about/types'

// ── Leaf file row ─────────────────────────────────────────────────────────────

interface FileRowProps {
  name: string
  iconColor: string
  isActive: boolean
  indent?: boolean
  onClick: () => void
}

function FileRow({ name, iconColor, isActive, indent = false, onClick }: FileRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex w-full items-center gap-2 rounded px-2 py-1 text-left font-mono text-xs transition',
        indent ? 'pl-7' : 'pl-2',
        isActive ? 'bg-white/5 text-slate-200' : 'text-slate-500 hover:text-slate-300',
      ].join(' ')}
    >
      <span className={`h-2 w-2 shrink-0 rounded-sm ${iconColor}`} />
      {'> '}{name}
    </button>
  )
}

// ── Folder row ────────────────────────────────────────────────────────────────

interface FolderRowProps {
  name: string
  iconColor: string
  isExpanded: boolean
  onClick: () => void
}

function FolderRow({ name, iconColor, isExpanded, onClick }: FolderRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-left font-mono text-xs text-slate-500 transition hover:text-slate-300"
    >
      {isExpanded
        ? <ChevronDown size={12} className="shrink-0" />
        : <ChevronRight size={12} className="shrink-0" />}
      <span className={`h-2 w-2 shrink-0 rounded-sm ${iconColor}`} />
      {name}
    </button>
  )
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 px-2 py-2">
      <ChevronDown size={12} className="shrink-0 text-slate-500" />
      <span className="font-mono text-xs text-slate-400">{label}</span>
    </div>
  )
}

// ── Contacts section ──────────────────────────────────────────────────────────

function ContactsSection({ contacts }: { contacts: ContactData }) {
  const { t } = useTranslation('common')
  return (
    <div className="mt-auto border-t border-[#314158] pt-2">
      <SectionHeader label={t('about.contacts')} />
      <div className="space-y-0.5 px-2 pb-2">
        <div className="flex items-center gap-2 px-2 py-1 font-mono text-xs text-slate-500">
          <Mail size={12} className="shrink-0" />
          {contacts.email}
        </div>
        {contacts.phone && (
          <div className="flex items-center gap-2 px-2 py-1 font-mono text-xs text-slate-500">
            <Phone size={12} className="shrink-0" />
            {contacts.phone}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main FileTree ─────────────────────────────────────────────────────────────

interface FileTreeProps {
  sectionId: SectionId
  items: Record<string, HighlightedTreeNode>
  contacts: ContactData
  activeFile: string
  expandedFolders: string[]
  onSelect: (fileId: string) => void
  onFolderToggle: (folderId: string) => void
}

export default function FileTree({
  sectionId,
  items,
  contacts,
  activeFile,
  expandedFolders,
  onSelect,
  onFolderToggle,
}: FileTreeProps) {
  return (
    <aside className="hidden w-[var(--file-tree-width)] shrink-0 flex-col overflow-y-auto border-r border-[#314158] md:flex">
      <SectionHeader label={sectionId} />

      <div className="space-y-0.5 px-2">
        {Object.entries(items).map(([name, node]) => {
          if (node.type === 'folder') {
            const isExpanded = expandedFolders.includes(name)
            const folder = node as HighlightedFolderNode
            return (
              <div key={name}>
                <FolderRow
                  name={name}
                  iconColor={folder.iconColor}
                  isExpanded={isExpanded}
                  onClick={() => {
                    const firstChild = Object.keys(folder.children)[0]
                    if (firstChild) onSelect(`${name}/${firstChild}`)
                    onFolderToggle(name)
                  }}
                />
                {isExpanded &&
                  Object.entries(folder.children).map(([childName, child]) => (
                    <FileRow
                      key={childName}
                      name={childName}
                      iconColor={child.iconColor}
                      isActive={activeFile === `${name}/${childName}`}
                      indent
                      onClick={() => onSelect(`${name}/${childName}`)}
                    />
                  ))}
              </div>
            )
          }

          return (
            <FileRow
              key={name}
              name={name}
              iconColor={node.iconColor}
              isActive={activeFile === name}
              onClick={() => onSelect(name)}
            />
          )
        })}
      </div>

      {/* <ContactsSection contacts={contacts} /> */}
    </aside>
  )
}
