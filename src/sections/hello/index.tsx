import { useState } from 'react'
import HeroLeft from './HeroLeft'
import SnakeGame, { MAX_FOOD } from './SnakeGame'
import GameControls from './GameControls'

export default function HelloSection() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10 md:px-10">
      <div className="grid w-full max-w-5xl gap-10 md:grid-cols-2 md:items-center">
        <HeroLeft />
        <HeroRight />
      </div>
    </div>
  )
}

function HeroRight() {
  const [foodLeft, setFoodLeft] = useState(MAX_FOOD)

  return (
    <section className="relative">
      {/* background glow */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-[32px] bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.18),transparent_50%)]"
        aria-hidden
      />

      {/* arcade cabinet — raised / embossed panel */}
      <div className="relative mx-auto max-w-[520px] overflow-hidden rounded-[20px] bg-gradient-to-b from-[#0e1c36] to-[#0b1528] shadow-[0_0_0_1.5px_rgba(34,211,238,0.45),0_0_0_3px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-1px_0_rgba(0,0,0,0.35),0_12px_40px_rgba(0,0,0,0.55),0_0_80px_rgba(34,211,238,0.1)]">
        {/* corner screws */}
        <div className="absolute left-4 top-4 h-2 w-2 rounded-full bg-cyan-900/60 shadow-[0_0_0_1px_rgba(34,211,238,0.3)]" />
        <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-cyan-900/60 shadow-[0_0_0_1px_rgba(34,211,238,0.3)]" />
        <div className="absolute bottom-4 left-4 h-2 w-2 rounded-full bg-cyan-900/60 shadow-[0_0_0_1px_rgba(34,211,238,0.3)]" />
        <div className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-cyan-900/60 shadow-[0_0_0_1px_rgba(34,211,238,0.3)]" />

        {/* inner grid: game | controls */}
        <div className="grid grid-cols-1 gap-5 p-8 md:grid-cols-[1fr_148px]">
          {/* game canvas — SnakeGame owns the border/bg */}
          <SnakeGame onFoodLeftChange={setFoodLeft} />

          {/* right panel: arrow keys + food dots */}
          <GameControls foodLeft={foodLeft} />
        </div>
      </div>
    </section>
  )
}
