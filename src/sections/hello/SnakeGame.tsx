import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Point = { x: number; y: number }
type GameState = 'idle' | 'countdown' | 'running' | 'gameover' | 'won'

export const MAX_FOOD = 10

const GRID_W = 12   // columns
const GRID_H = 18   // rows  (portrait rectangle)
const CELL = 18
const BOARD_W = GRID_W * CELL  // 216px
const BOARD_H = GRID_H * CELL  // 324px

const INITIAL_SNAKE: Point[] = [
  { x: 5, y: 9 },
  { x: 4, y: 9 },
  { x: 3, y: 9 },
]
const INITIAL_FOOD: Point = { x: 9, y: 9 }

function move(p: Point, dir: Direction): Point {
  if (dir === 'UP') return { x: p.x, y: p.y - 1 }
  if (dir === 'DOWN') return { x: p.x, y: p.y + 1 }
  if (dir === 'LEFT') return { x: p.x - 1, y: p.y }
  return { x: p.x + 1, y: p.y }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
  ctx.fill()
}

function drawCanvas(canvas: HTMLCanvasElement | null, snake: Point[], food: Point) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, BOARD_W, BOARD_H)
  ctx.fillStyle = '#081024'
  ctx.fillRect(0, 0, BOARD_W, BOARD_H)

  // grid
  ctx.globalAlpha = 0.18
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 1
  for (let i = 0; i <= GRID_W; i++) {
    ctx.beginPath()
    ctx.moveTo(i * CELL + 0.5, 0)
    ctx.lineTo(i * CELL + 0.5, BOARD_H)
    ctx.stroke()
  }
  for (let i = 0; i <= GRID_H; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * CELL + 0.5)
    ctx.lineTo(BOARD_W, i * CELL + 0.5)
    ctx.stroke()
  }
  ctx.globalAlpha = 1

  // food
  ctx.fillStyle = 'rgba(45,212,191,0.9)'
  ctx.shadowColor = 'rgba(45,212,191,0.5)'
  ctx.shadowBlur = 10
  roundRect(ctx, food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6, 6)
  ctx.shadowBlur = 0

  // snake
  snake.forEach((p, idx) => {
    ctx.fillStyle = idx === 0 ? 'rgba(129,140,248,0.95)' : 'rgba(99,241,203,0.85)'
    roundRect(ctx, p.x * CELL + 2, p.y * CELL + 2, CELL - 4, CELL - 4, 6)
  })
}

export default function SnakeGame({
  onFoodLeftChange,
}: {
  onFoodLeftChange?: (remaining: number) => void
}) {
  const { t } = useTranslation('common')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTickRef = useRef<number>(0)
  // Synchronous refs so the RAF loop doesn't read stale closure values
  const runningRef = useRef(false)
  const scoreRef = useRef(0)

  const [gameState, setGameState] = useState<GameState>('idle')
  const [countdown, setCountdown] = useState(3)
  const [speedMs, setSpeedMs] = useState(120)
  const [score, setScore] = useState(0)
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE)
  const [dir, setDir] = useState<Direction>('RIGHT')
  const [food, setFood] = useState<Point>(INITIAL_FOOD)

  const occupied = useMemo(() => {
    const s = new Set<string>()
    snake.forEach((p) => s.add(`${p.x},${p.y}`))
    return s
  }, [snake])

  const spawnFood = (): Point => {
    for (let i = 0; i < 200; i++) {
      const p = {
        x: Math.floor(Math.random() * GRID_W),
        y: Math.floor(Math.random() * GRID_H),
      }
      if (!occupied.has(`${p.x},${p.y}`)) return p
    }
    return { x: 0, y: 0 }
  }

  /** Transition game state and keep runningRef in sync. */
  const go = (state: GameState) => {
    runningRef.current = state === 'running'
    setGameState(state)
  }

  /** Full reset → back to idle (or a given next state). */
  const doReset = () => {
    runningRef.current = false
    scoreRef.current = 0
    setGameState('idle')
    setScore(0)
    setSpeedMs(120)
    setSnake(INITIAL_SNAKE)
    setDir('RIGHT')
    setFood(INITIAL_FOOD)
    setCountdown(3)
  }

  /** Start / restart: reset positions then begin countdown. */
  const handleStart = () => {
    runningRef.current = false
    scoreRef.current = 0
    setScore(0)
    setSpeedMs(120)
    setSnake(INITIAL_SNAKE)
    setDir('RIGHT')
    setFood(INITIAL_FOOD)
    setCountdown(3)
    setGameState('countdown')
  }

  // Notify parent of remaining food
  useEffect(() => {
    onFoodLeftChange?.(Math.max(0, MAX_FOOD - score))
  }, [score, onFoodLeftChange])

  // Countdown: 3 → 2 → 1 → 0 → running
  useEffect(() => {
    if (gameState !== 'countdown') return
    if (countdown === 0) {
      go('running')
      lastTickRef.current = performance.now()
      return
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [gameState, countdown])

  // Keyboard controls (only while running)
  useEffect(() => {
    if (gameState !== 'running') return
    const setDirSafe = (next: Direction) => {
      setDir((cur) => {
        if (cur === 'UP' && next === 'DOWN') return cur
        if (cur === 'DOWN' && next === 'UP') return cur
        if (cur === 'LEFT' && next === 'RIGHT') return cur
        if (cur === 'RIGHT' && next === 'LEFT') return cur
        return next
      })
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); setDirSafe('UP') }
      if (e.key === 'ArrowDown') { e.preventDefault(); setDirSafe('DOWN') }
      if (e.key === 'ArrowLeft') { e.preventDefault(); setDirSafe('LEFT') }
      if (e.key === 'ArrowRight') { e.preventDefault(); setDirSafe('RIGHT') }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [gameState, dir])

  // Main game loop (RAF)
  useEffect(() => {
    const step = () => {
      if (!runningRef.current) return
      setSnake((prev) => {
        const head = prev[0]
        const next = move(head, dir)

        // wall collision
        if (next.x < 0 || next.y < 0 || next.x >= GRID_W || next.y >= GRID_H) {
          go('gameover')
          return prev
        }
        // self collision
        if (prev.some((p) => p.x === next.x && p.y === next.y)) {
          go('gameover')
          return prev
        }

        const ate = next.x === food.x && next.y === food.y
        const newSnake = [next, ...prev]
        if (!ate) newSnake.pop()

        if (ate) {
          scoreRef.current += 1
          setScore(scoreRef.current)
          if (scoreRef.current >= MAX_FOOD) {
            go('won')
            return newSnake // don't spawn new food
          }
          setSpeedMs((ms) => Math.max(70, ms - 3))
          setFood(spawnFood())
        }
        return newSnake
      })
    }

    const loop = (ts: number) => {
      if (runningRef.current && ts - lastTickRef.current >= speedMs) {
        lastTickRef.current = ts
        step()
      }
      drawCanvas(canvasRef.current, snake, food)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, speedMs, snake, food, dir])

  return (
    <div className="relative w-fit overflow-hidden rounded-xl bg-[#080c14]">
      {/* Game canvas */}
      <canvas
        ref={canvasRef}
        width={BOARD_W}
        height={BOARD_H}
        className="block"
      />

      {/* State overlay — hidden only when running */}
      {gameState !== 'running' && (
        <div className="absolute inset-0 flex flex-col rounded-xl bg-[#060c18]/75">

          {/* IDLE: start-game button pinned to bottom center */}
          {gameState === 'idle' && (
            <div className="flex flex-1 items-end justify-center pb-6">
              <button
                type="button"
                onClick={handleStart}
                className="min-w-[120px] rounded-md bg-amber-400 px-8 py-2.5 font-mono text-sm font-medium text-[#0b1220] transition hover:bg-amber-300"
              >
                {t('hello.startGame')}
              </button>
            </div>
          )}

          {/* COUNTDOWN: big number centered */}
          {gameState === 'countdown' && (
            <div className="flex flex-1 items-center justify-center">
              <span className="font-mono text-7xl font-bold tabular-nums text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                {countdown}
              </span>
            </div>
          )}

          {/* GAME OVER */}
          {gameState === 'gameover' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-5">
              <p className="font-mono text-sm text-slate-400">{'// game over'}</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleStart}
                  className="rounded-md bg-amber-400 px-6 py-2 font-mono text-sm font-medium text-[#0b1220] transition hover:bg-amber-300"
                >
                  {t('hello.startGame')}
                </button>
                <button
                  type="button"
                  onClick={doReset}
                  className="rounded-md border border-cyan-500/25 bg-[#0d1525] px-5 py-2 font-mono text-sm text-slate-400 transition hover:bg-white/5"
                >
                  {t('hello.reset')}
                </button>
              </div>
            </div>
          )}

          {/* WON */}
          {gameState === 'won' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-5">
              <p className="font-mono text-sm text-cyan-300">{t('hello.allFoodEaten')}</p>
              <button
                type="button"
                onClick={handleStart}
                className="rounded-md bg-amber-400 px-8 py-2.5 font-mono text-sm font-medium text-[#0b1220] transition hover:bg-amber-300"
              >
                {t('hello.startGame')}
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
