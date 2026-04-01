import { ChevronDown, Mail, Phone } from 'lucide-react'
import { CONTACT_EMAIL, CONTACT_PHONE } from '../constants'

export function ContactSidebar() {
  return (
    <aside className="hidden w-[var(--left-shell-width)] shrink-0 flex-col border-r border-[#314158] md:flex">
      <div className="flex items-center gap-1 px-4 py-2.5">
        <ChevronDown size={12} className="shrink-0 text-slate-500" />
        <span className="font-mono text-xs text-slate-400">contacts</span>
      </div>
      <div className="space-y-0.5 px-2 pb-3">
        <div className="flex items-center gap-2 px-2 py-1 font-mono text-xs text-slate-500">
          <Mail size={12} className="shrink-0" />
          {CONTACT_EMAIL}
        </div>
        <div className="flex items-center gap-2 px-2 py-1 font-mono text-xs text-slate-500">
          <Phone size={12} className="shrink-0" />
          {CONTACT_PHONE}
        </div>
      </div>
    </aside>
  )
}
