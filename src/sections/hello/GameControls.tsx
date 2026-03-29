import { useTranslation } from 'next-i18next'
import { MAX_FOOD } from './SnakeGame'

function KeyCap({ label }: { label: string }) {
  return (
    <div className="flex h-9 w-9 select-none items-center justify-center rounded-lg border border-white/[0.07] bg-[#0d1525] text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_12px_rgba(0,0,0,0.3)]">
      <span className="text-sm">{label}</span>
    </div>
  )
}

function ControlsHint() {
  const { t } = useTranslation('common')
  return (
    <div className="space-y-3">
      <div className="font-mono text-xs leading-5 text-slate-500/80">
        <div>{t('hello.useKeyboard')}</div>
        <div>{t('hello.arrowsToPlay')}</div>
      </div>
      {/* Standard arrow-key layout: ↑ centered, then ← ↓ → */}
      <div className="grid grid-cols-3 gap-2" style={{ width: 116 }}>
        <span />
        <KeyCap label="↑" />
        <span />
        <KeyCap label="←" />
        <KeyCap label="↓" />
        <KeyCap label="→" />
      </div>
    </div>
  )
}

function FoodLeft({ remaining }: { remaining: number }) {
  const { t } = useTranslation('common')
  return (
    <div className="space-y-2">
      <div className="font-mono text-xs text-slate-500/80">{t('hello.foodLeft')}</div>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: MAX_FOOD }).map((_, i) => (
          <span
            key={i}
            className={[
              'h-2 w-2 rounded-full transition-all duration-200',
              i < remaining
                ? 'bg-[#f5d44d]/85 shadow-[0_0_8px_rgba(64,224,208,0.55)]'
                : 'bg-white/[0.09]',
            ].join(' ')}
            aria-hidden
          />
        ))}
      </div>
    </div>
  )
}

export default function GameControls({ foodLeft }: { foodLeft: number }) {
  return (
    <div className="flex flex-col gap-5 pt-1">
      <ControlsHint />
      <FoodLeft remaining={foodLeft} />
    </div>
  )
}
