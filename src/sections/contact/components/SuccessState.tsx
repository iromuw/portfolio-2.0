export function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="font-mono text-base text-slate-200">Thank you!</p>
      <p className="font-mono text-xs leading-relaxed text-slate-500">
        Thanks for reaching out!<br />
        I will be in touch shortly.
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
