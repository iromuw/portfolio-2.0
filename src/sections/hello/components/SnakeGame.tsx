import { useEffect, useRef, useState } from 'react'
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

const OPPOSITES: Record<Direction, Direction> = {
  UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT',
}

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

function drawCanvas(
  canvas: HTMLCanvasElement | null,
  snake: Point[],
  food: Point,
  score: number,
  gameState: GameState,
) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, BOARD_W, BOARD_H)
  ctx.fillStyle = '#060d1c'
  ctx.fillRect(0, 0, BOARD_W, BOARD_H)

  // grid — subtle, low contrast
  ctx.globalAlpha = 0.10
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

  // food — teal accent with glow
  ctx.fillStyle = 'rgba(64,224,208,0.88)'
  ctx.shadowColor = 'rgba(64,224,208,0.55)'
  ctx.shadowBlur = 10
  roundRect(ctx, food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6, 6)
  ctx.shadowBlur = 0

  // snake — indigo head, teal body
  snake.forEach((p, idx) => {
    ctx.fillStyle = idx === 0 ? 'rgba(129,140,248,0.95)' : 'rgba(64,224,208,0.75)'
    roundRect(ctx, p.x * CELL + 2, p.y * CELL + 2, CELL - 4, CELL - 4, 6)
  })

  // score overlay — only during running, low contrast
  if (gameState === 'running') {
    ctx.globalAlpha = 0.5
    ctx.fillStyle = 'rgba(148,163,184,1)'
    ctx.font = '10px monospace'
    ctx.fillText(`score: ${score} / ${MAX_FOOD}`, 5, 12)
    ctx.globalAlpha = 1
  }
}

// Shared ghost button style — teal accent, ghost/outline treatment
const GHOST_BTN =
  'rounded-md border border-[#40E0D0]/35 bg-[#40E0D0]/[0.08] px-8 py-2.5 font-mono text-sm font-medium text-[#40E0D0] transition-all duration-200 select-none hover:bg-[#40E0D0]/[0.15] hover:border-[#40E0D0]/60 hover:shadow-[0_0_16px_rgba(64,224,208,0.20)] active:scale-[0.97] active:shadow-[0_0_20px_rgba(64,224,208,0.28)]'

// Idle-state button — same base as GHOST_BTN but deliberately subdued.
// Fades in to full intensity on hover/focus so the game feels discoverable
// rather than competing with the primary CTAs on the left.
const IDLE_BTN =
  `${GHOST_BTN} opacity-[0.55] transition-all duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#40E0D0]/30`

export default function SnakeGame({
  onFoodLeftChange,
}: {
  onFoodLeftChange?: (remaining: number) => void
}) {
  const { t } = useTranslation('common')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTickRef = useRef<number>(0)

  // All mutable game data lives in refs — never inside setState updaters.
  // This prevents React StrictMode from double-invoking side effects.
  const runningRef = useRef(false)
  const snakeRef = useRef<Point[]>(INITIAL_SNAKE.map((p) => ({ ...p })))
  const foodRef = useRef<Point>({ ...INITIAL_FOOD })
  const dirRef = useRef<Direction>('RIGHT')
  const nextDirRef = useRef<Direction>('RIGHT') // buffered input
  const scoreRef = useRef(0)
  const speedMsRef = useRef(200)

  const [gameState, setGameState] = useState<GameState>('idle')
  const [countdown, setCountdown] = useState(3)
  const [score, setScore] = useState(0)

  const spawnFood = (): Point => {
    const occupied = new Set(snakeRef.current.map((p) => `${p.x},${p.y}`))
    for (let i = 0; i < 200; i++) {
      const p = {
        x: Math.floor(Math.random() * GRID_W),
        y: Math.floor(Math.random() * GRID_H),
      }
      if (!occupied.has(`${p.x},${p.y}`)) return p
    }
    return { x: 0, y: 0 }
  }

  const go = (state: GameState) => {
    runningRef.current = state === 'running'
    setGameState(state)
  }

  const handleStart = () => {
    runningRef.current = false
    scoreRef.current = 0
    speedMsRef.current = 200
    snakeRef.current = INITIAL_SNAKE.map((p) => ({ ...p }))
    foodRef.current = { ...INITIAL_FOOD }
    dirRef.current = 'RIGHT'
    nextDirRef.current = 'RIGHT'
    setScore(0)
    setCountdown(3)
    setGameState('countdown')
    onFoodLeftChange?.(MAX_FOOD)
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

  // Keyboard controls — always active, direction buffered into nextDirRef
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      let next: Direction | null = null
      if (e.key === 'ArrowUp') next = 'UP'
      else if (e.key === 'ArrowDown') next = 'DOWN'
      else if (e.key === 'ArrowLeft') next = 'LEFT'
      else if (e.key === 'ArrowRight') next = 'RIGHT'
      if (next && next !== OPPOSITES[dirRef.current]) {
        e.preventDefault()
        nextDirRef.current = next
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Main game loop (RAF) — only restarts when gameState changes
  useEffect(() => {
    const step = () => {
      // Apply buffered direction (prevents 180° reversal)
      dirRef.current = nextDirRef.current

      const prev = snakeRef.current
      const head = prev[0]
      const next = move(head, dirRef.current)

      // Wall collision
      if (next.x < 0 || next.y < 0 || next.x >= GRID_W || next.y >= GRID_H) {
        go('gameover')
        return
      }
      // Self collision
      if (prev.some((p) => p.x === next.x && p.y === next.y)) {
        go('gameover')
        return
      }

      const ate = next.x === foodRef.current.x && next.y === foodRef.current.y
      const newSnake = [next, ...prev]
      if (!ate) newSnake.pop()
      snakeRef.current = newSnake

      if (ate) {
        scoreRef.current += 1
        setScore(scoreRef.current)
        if (scoreRef.current >= MAX_FOOD) {
          go('won')
          return
        }
        speedMsRef.current = Math.max(100, speedMsRef.current - 10)
        foodRef.current = spawnFood()
      }
    }

    const loop = (ts: number) => {
      if (runningRef.current && ts - lastTickRef.current >= speedMsRef.current) {
        lastTickRef.current = ts
        step()
      }
      drawCanvas(canvasRef.current, snakeRef.current, foodRef.current, scoreRef.current, gameState)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [gameState])

  return (
    <div className="relative w-fit overflow-hidden rounded-xl bg-[#060d1c]">
      {/* Game canvas */}
      <canvas
        ref={canvasRef}
        width={BOARD_W}
        height={BOARD_H}
        className="block"
      />

      {/* State overlay — hidden only while running */}
      {gameState !== 'running' && (
        <div className="absolute inset-0 flex flex-col rounded-xl bg-[#060e1c]/82 backdrop-blur-[1.5px]">

          {/* IDLE — calm, low contrast; button is the sole focal point */}
          {gameState === 'idle' && (
            <div className="flex flex-1 flex-col items-center justify-end gap-3 pb-6">
              <p className="font-mono text-xs text-slate-600">{t('hello.pressStart')}</p>
              <button type="button" onClick={handleStart} className={IDLE_BTN}>
                {t('hello.startGame')}
              </button>
            </div>
          )}

          {/* COUNTDOWN — single focal element, teal accent */}
          {gameState === 'countdown' && (
            <div className="flex flex-1 items-center justify-center">
              <span className="font-mono text-7xl font-bold tabular-nums text-[#fffff]/40 drop-shadow-[0_0_24px_rgba(64,224,208,0.45)]">
                {countdown}
              </span>
            </div>
          )}

          {/* GAME OVER — rose tone distinguishes from active; dimmed overlay, rose headline */}
          {gameState === 'gameover' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-5">
              <div className="flex flex-col items-center gap-1.5">
                <p className="font-mono text-lg font-bold tracking-wide text-rose-400">
                  {t('hello.gameOver')}
                </p>
                <p className="font-mono text-xs text-slate-600">{`${t('hello.score')} ${score} / ${MAX_FOOD}`}</p>
              </div>
              <button type="button" onClick={handleStart} className={`${GHOST_BTN} px-6 py-2`}>
                {t('hello.startAgain')}
              </button>
            </div>
          )}

          {/* WON — teal headline mirrors the accent; celebratory but restrained */}
          {gameState === 'won' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-5">
              <div className="flex flex-col items-center gap-1.5">
                <p className="font-mono text-lg font-bold text-[#40E0D0] drop-shadow-[0_0_12px_rgba(64,224,208,0.35)]">
                  {t('hello.allFoodEaten')}
                </p>
                <p className="font-mono text-xs text-slate-500">{t('hello.wellDoneHint')}</p>
              </div>
              <button type="button" onClick={handleStart} className={GHOST_BTN}>
                {t('hello.playAgain')}
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
