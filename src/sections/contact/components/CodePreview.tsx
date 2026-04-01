import { useMemo } from 'react'
import type { ReactNode } from 'react'
import type { Form } from '../types'
import { currentDate } from '../utils'

// Inline syntax-highlight helpers (intentionally lowercase — not React components)
const kw = (s: string) => <span className="text-indigo-400">{s}</span>
const id = (s: string) => <span className="text-teal-400">{s}</span>
const str = (s: string) => <span className="text-amber-300">&quot;{s}&quot;</span>
const p = (s: string) => <span className="text-slate-400">{s}</span>
const fn = (s: string) => <span className="text-slate-300">{s}</span>

function CodeLine({ n, children }: { n: number; children?: ReactNode }) {
  return (
    <div className="flex min-h-[1.5em]">
      <span className="mr-5 w-4 shrink-0 select-none text-right font-mono text-xs leading-6 text-slate-700">
        {n}
      </span>
      <span className="font-mono text-xs leading-6">{children}</span>
    </div>
  )
}

export function CodePreview({ form }: { form: Form }) {
  const date = useMemo(currentDate, [])
  const msgPreview = form.message.replace(/\n/g, ' ').slice(0, 32) + (form.message.length > 32 ? '...' : '')

  return (
    <aside className="hidden w-2/5 shrink-0 flex-col overflow-y-auto border-l border-[#314158] lg:flex">
      <div className="p-5 pt-6">
        <CodeLine n={1}>{kw('const')} {id('button')} {p('=')} {fn('document.querySelector(')}{str('#sendBtn')}{fn(');')}</CodeLine>
        <CodeLine n={2} />
        <CodeLine n={3}>{kw('const')} {id('message')} {p('= {')} </CodeLine>
        <CodeLine n={4}><span className="pl-4">{id('name')}{p(': ')}{str(form.name)}{p(',')}</span></CodeLine>
        <CodeLine n={5}><span className="pl-4">{id('email')}{p(': ')}{str(form.email)}{p(',')}</span></CodeLine>
        <CodeLine n={6}><span className="pl-4">{id('message')}{p(': ')}{str(msgPreview)}{p(',')}</span></CodeLine>
        <CodeLine n={7}><span className="pl-4">{id('date')}{p(': ')}{str(date)}</span></CodeLine>
        <CodeLine n={8}>{p('}')}</CodeLine>
        <CodeLine n={9} />
        <CodeLine n={10}>{id('button')}{p('.addEventListener(')}{str('click')}{p(', () => {')}</CodeLine>
        <CodeLine n={11}><span className="pl-4">{fn('form.send(')}{id('message')}{fn(');')}</span></CodeLine>
        <CodeLine n={12}>{p('})')}</CodeLine>
      </div>
    </aside>
  )
}
