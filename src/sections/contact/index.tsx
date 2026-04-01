import { useState, useMemo } from 'react'
import { ChevronDown, Mail, Phone, AlertCircle, Loader2 } from 'lucide-react'

// ── Constants ─────────────────────────────────────────────────────────────────

const CONTACT_EMAIL = 'mori.moyun.wu@gmail.com'
const CONTACT_PHONE = '+61 452 509 151'
const WEB3FORMS_KEY = '57b3efa2-8a4d-4122-bcb7-eb2ba484374c'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Form {
  name: string
  email: string
  message: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function currentDate() {
  const d = new Date()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`
}

// ── Left sidebar ──────────────────────────────────────────────────────────────

function ContactSidebar() {
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

// ── Live code preview ─────────────────────────────────────────────────────────

// Inline syntax-highlight helpers (intentionally lowercase — not React components)
const kw = (s: string) => <span className="text-indigo-400">{s}</span>
const id = (s: string) => <span className="text-teal-400">{s}</span>
const str = (s: string) => <span className="text-amber-300">"{s}"</span>
const p = (s: string) => <span className="text-slate-400">{s}</span>
const fn = (s: string) => <span className="text-slate-300">{s}</span>

function CodeLine({ n, children }: { n: number; children?: React.ReactNode }) {
  return (
    <div className="flex min-h-[1.5em]">
      <span className="mr-5 w-4 shrink-0 select-none text-right font-mono text-xs leading-6 text-slate-700">
        {n}
      </span>
      <span className="font-mono text-xs leading-6">{children}</span>
    </div>
  )
}

function CodePreview({ form }: { form: Form }) {
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

// ── Contact form ──────────────────────────────────────────────────────────────

const inputBase =
  'w-full rounded border bg-transparent px-3 py-2 font-mono text-xs text-slate-200 outline-none transition placeholder:text-slate-700'

function ContactForm({
  form,
  onChange,
  onSubmit,
  loading,
  canSubmit,
}: {
  form: Form
  onChange: (f: Form) => void
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
  canSubmit: boolean
}) {
  const [emailTouched, setEmailTouched] = useState(false)
  const emailError = emailTouched && form.email && !isValidEmail(form.email)

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm space-y-5">

      {/* Name */}
      <div className="space-y-1.5">
        <label className="block font-mono text-xs text-slate-400">_name:</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
          className={`${inputBase} border-[#314158] focus:border-slate-500`}
          autoComplete="name"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="block font-mono text-xs text-slate-400">_email:</label>
        <div className="relative">
          <input
            type="email"
            value={form.email}
            onChange={(e) => onChange({ ...form, email: e.target.value })}
            onBlur={() => setEmailTouched(true)}
            className={[
              inputBase,
              emailError
                ? 'border-rose-500/60 focus:border-rose-400'
                : 'border-[#314158] focus:border-slate-500',
            ].join(' ')}
            autoComplete="email"
          />
          {emailError && (
            <AlertCircle
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-rose-400"
            />
          )}
        </div>
        {emailError && (
          <p className="font-mono text-xs text-rose-400">Wrong email address</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="block font-mono text-xs text-slate-400">_message</label>
        <textarea
          value={form.message}
          onChange={(e) => onChange({ ...form, message: e.target.value })}
          rows={5}
          placeholder="your message here ..."
          className={`${inputBase} resize-none border-[#314158] focus:border-slate-500`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit || loading}
        className={[
          'flex items-center gap-2 rounded border px-4 py-2 font-mono text-sm transition',
          canSubmit && !loading
            ? 'border-teal-500/50 bg-teal-500/[0.08] text-teal-400 hover:border-teal-400/70 hover:bg-teal-500/[0.14]'
            : 'cursor-not-allowed border-[#314158] text-slate-700',
        ].join(' ')}
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        submit-message
      </button>
    </form>
  )
}

// ── Success state ─────────────────────────────────────────────────────────────

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="font-mono text-base text-slate-200">Thank you!</p>
      <p className="font-mono text-xs leading-relaxed text-slate-500">
        Your message has been accepted.<br />
        You will receive an answer soon!
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 rounded border border-teal-500/50 bg-teal-500/[0.08] px-4 py-2 font-mono text-sm text-teal-400 transition hover:border-teal-400/70 hover:bg-teal-500/[0.14]"
      >
        send-new-message
      </button>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function ContactSection() {
  const [form, setForm] = useState<Form>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const canSubmit = !!(form.name.trim() && isValidEmail(form.email) && form.message.trim())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setStatus('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'idle')
    } catch {
      setStatus('idle')
    }
  }

  const reset = () => {
    setForm({ name: '', email: '', message: '' })
    setStatus('idle')
  }

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <ContactSidebar />

      <div className="flex flex-1 items-center justify-center p-8">
        {status === 'success' ? (
          <SuccessState onReset={reset} />
        ) : (
          <ContactForm
            form={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            loading={status === 'loading'}
            canSubmit={canSubmit}
          />
        )}
      </div>

      <CodePreview form={form} />
    </div>
  )
}
