import { useState } from 'react'
import type { FormEvent } from 'react'
import { AlertCircle, Loader2 } from 'lucide-react'
import type { Form } from '../types'
import { isValidEmail } from '../utils'
import { inputBase } from '../constants'

interface Props {
  form: Form
  onChange: (f: Form) => void
  onSubmit: (e: FormEvent) => void
  loading: boolean
  canSubmit: boolean
}

export function ContactForm({ form, onChange, onSubmit, loading, canSubmit }: Props) {
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
