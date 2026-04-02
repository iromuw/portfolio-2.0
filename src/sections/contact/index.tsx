import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, Phone } from 'lucide-react'
import type { Form, Status } from './types'
import { WEB3FORMS_KEY, CONTACT_EMAIL, CONTACT_PHONE } from './constants'
import { isValidEmail } from './utils'
import { ContactSidebar } from './components/ContactSidebar'
import { ContactForm } from './components/ContactForm'
import { CodePreview } from './components/CodePreview'
import { SuccessState } from './components/SuccessState'

const EMPTY_FORM: Form = { name: '', email: '', message: '' }

export default function ContactSection() {
  const [form, setForm] = useState<Form>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>('idle')

  const canSubmit = !!(form.name.trim() && isValidEmail(form.email) && form.message.trim())

  const handleSubmit = async (e: FormEvent) => {
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
    setForm(EMPTY_FORM)
    setStatus('idle')
  }

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <ContactSidebar />

      <div className="flex flex-1 flex-col">
        {/* Mobile contact info — sidebar is hidden on mobile so show it here */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-[#314158] px-4 py-3 md:hidden">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2 font-mono text-xs text-slate-400 transition hover:text-teal-400"
          >
            <Mail size={12} className="shrink-0" />
            {CONTACT_EMAIL}
          </a>
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="flex items-center gap-2 font-mono text-xs text-slate-400 transition hover:text-teal-400"
          >
            <Phone size={12} className="shrink-0" />
            {CONTACT_PHONE}
          </a>
        </div>

        {/* Form area */}
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
      </div>

      <CodePreview form={form} />
    </div>
  )
}
