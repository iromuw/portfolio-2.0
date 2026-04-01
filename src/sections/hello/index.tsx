import { useState } from 'react'
import HeroLeft from './HeroLeft'
import SnakeGame, { MAX_FOOD } from './SnakeGame'
import GameControls from './GameControls'

export default function HelloSection() {
  return (
    <div className="flex flex-1 items-center px-4 py-10 md:px-4">
      <div className="grid w-full max-w-[1100px] gap-10 md:ml-[var(--left-shell-width)] md:grid-cols-2 md:items-center">
        <HeroLeft />
        <HeroRight />
      </div>
    </div>
  )
}

function Screw({ position }: { position: string }) {
  return (
    <div
      className={[
        'absolute h-2.5 w-2.5 rounded-full',
        'bg-gradient-to-br from-[#1e2f50] to-[#0d1830]',
        // depth: inner top highlight + rim + faint teal halo
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.07)]',
        // hover — driven by parent group
        'transition-shadow duration-300',
        'group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.16)]',
        position,
      ].join(' ')}
    />
  )
}

function HeroRight() {
  const [foodLeft, setFoodLeft] = useState(MAX_FOOD)

  return (
    <section className="relative md:justify-self-end">
      {/* background glow — very subtle, indigo-shifted */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-[32px] bg-[radial-gradient(circle_at_50%_45%,rgba(79,70,229,0.07),transparent_55%)]"
        aria-hidden
      />

      {/* arcade cabinet — floats above bg; teal glow surfaces only on hover */}
      <div className="group relative mx-auto max-w-[520px] overflow-hidden rounded-[20px] bg-gradient-to-b from-[#0e1c36] to-[#0b1528] shadow-[0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-1px_0_rgba(0,0,0,0.4),0_10px_30px_rgba(0,0,0,0.65)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14),inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-1px_0_rgba(0,0,0,0.4),0_10px_30px_rgba(0,0,0,0.65),0_0_28px_rgba(255,255,255,0.07)]">
        {/* corner screws — physical anchors, subtle teal halo on card hover */}
        <Screw position="left-3.5 top-3.5" />
        <Screw position="right-3.5 top-3.5" />
        <Screw position="left-3.5 bottom-3.5" />
        <Screw position="right-3.5 bottom-3.5" />

        {/* inner grid: game | controls */}
        <div className="grid grid-cols-1 gap-5 p-8 md:grid-cols-[1fr_148px]">
          {/* game canvas — SnakeGame owns its border/bg */}
          <SnakeGame onFoodLeftChange={setFoodLeft} />

          {/* right panel: arrow keys + food dots */}
          <GameControls foodLeft={foodLeft} />
        </div>
      </div>
    </section>
  )
}
