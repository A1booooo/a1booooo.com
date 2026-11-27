import { useEffect, useRef, useState } from 'react'
import { seededRandom } from '../../pixel/sprites'

const ROWS = 46
const GROUND_ROWS = 9

const C = {
  far: '#cfeadb',
  farTop: '#e2f4ea',
  farDot: '#bde0cc',
  mid: '#6cc98e',
  midTop: '#8ddba8',
  midDot: '#4fb377',
  near: '#2f9d63',
  nearTop: '#49b978',
  nearDot: '#24854f',
  petal: ['#ffffff', '#fff3c4', '#ffd8a0'],
  center: '#f0a020',
  trunk: '#9a5b2e',
  trunkDark: '#6e3f1e',
}

const TREES = [
  { at: 0.86, r: 11, colors: ['#f6a23a', '#ffc46b', '#d97a1a', '#a8560f'] },
  { at: 0.95, r: 13, colors: ['#7ab8ea', '#a8d4f6', '#4f93d0', '#2f6ea8'] },
  { at: 0.05, r: 8, colors: ['#f6a23a', '#ffc46b', '#d97a1a', '#a8560f'] },
]

function draw(ctx: CanvasRenderingContext2D, cols: number) {
  const rand = seededRandom(42)
  const px = (x: number, y: number, c: string) => {
    ctx.fillStyle = c
    ctx.fillRect(x, y, 1, 1)
  }

  const ridge = (minH: number, maxH: number, gapMin: number, gapMax: number, slopeMin: number, slopeMax: number) => {
    const peaks: { x: number; h: number; s: number }[] = []
    for (let x = -12; x < cols + 12; x += gapMin + rand() * (gapMax - gapMin)) {
      peaks.push({ x, h: minH + rand() * (maxH - minH), s: slopeMin + rand() * (slopeMax - slopeMin) })
    }
    const hs: number[] = []
    for (let x = 0; x < cols; x++) {
      let h = 0
      for (const p of peaks) h = Math.max(h, p.h - Math.abs(x - p.x) * p.s)
      hs.push(Math.round(h + (x % 3 === 0 ? (rand() > 0.5 ? 1 : 0) : 0)))
    }
    return hs
  }

  const layer = (hs: number[], base: string, top: string, dot: string, dotP: number) => {
    hs.forEach((h, x) => {
      const y0 = ROWS - h
      ctx.fillStyle = base
      ctx.fillRect(x, y0, 1, h)
      px(x, y0, top)
      for (let y = y0 + 2; y < ROWS; y++) if (rand() < dotP) px(x, y, dot)
    })
  }

  // 远山 / 中丘 / 近处草地
  layer(ridge(ROWS * 0.45, ROWS * 0.8, 12, 26, 0.9, 1.4), C.far, C.farTop, C.farDot, 0.04)
  const mid = ridge(ROWS * 0.28, ROWS * 0.5, 16, 30, 0.55, 0.85)
  layer(mid, C.mid, C.midTop, C.midDot, 0.08)
  const ground = Array.from({ length: cols }, (_, x) => GROUND_ROWS + (x % 7 === 0 && rand() > 0.6 ? 1 : 0))
  layer(ground, C.near, C.nearTop, C.nearDot, 0.12)

  // 小花：开在中丘和草地上
  const flower = (x: number, y: number) => {
    const petal = C.petal[Math.floor(rand() * C.petal.length)]
    px(x, y + 1, '#3a8f4f')
    px(x, y + 2, '#3a8f4f')
    px(x - 1, y, petal)
    px(x + 1, y, petal)
    px(x, y - 1, petal)
    px(x, y, C.center)
  }
  for (let x = 3; x < cols - 3; x++) {
    if (rand() < 0.05) flower(x, ROWS - mid[x] + 2 + Math.floor(rand() * 4))
    if (rand() < 0.035) flower(x, ROWS - GROUND_ROWS - 2)
  }

  // 像素树
  for (const t of TREES) {
    const cx = Math.round(cols * t.at)
    const groundY = ROWS - GROUND_ROWS
    const trunkH = Math.round(t.r * 0.9)
    for (let y = groundY - trunkH; y < groundY + 1; y++) {
      px(cx - 1, y, C.trunk)
      px(cx, y, C.trunk)
      px(cx + 1, y, C.trunkDark)
    }
    const cy = groundY - trunkH - t.r + 3
    const [base, light, shade, dark] = t.colors
    for (let y = cy - t.r; y <= cy + t.r; y++) {
      for (let x = cx - t.r - 1; x <= cx + t.r + 1; x++) {
        const dx = (x - cx) / (t.r + 1)
        const dy = (y - cy) / t.r
        const d = dx * dx + dy * dy
        if (d > 1 - rand() * 0.12) continue
        let c = base
        if (dx + dy < -0.5 && rand() > 0.3) c = light
        else if (dx + dy > 0.45 && rand() > 0.25) c = shade
        if (rand() < 0.07) c = dark
        px(x, y, c)
      }
    }
  }
}

/** 页脚像素地景：canvas 绘制后按像素放大，宽度变化时重绘 */
export function PixelLandscape({ onGround }: { onGround?: (groundPx: number) => void }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [cell, setCell] = useState(5)

  useEffect(() => {
    const canvas = ref.current!
    const render = () => {
      const w = canvas.parentElement!.clientWidth
      const size = w < 640 ? 4 : 5
      const cols = Math.ceil(w / size)
      canvas.width = cols
      canvas.height = ROWS
      canvas.style.width = `${cols * size}px`
      canvas.style.height = `${ROWS * size}px`
      const ctx = canvas.getContext('2d')!
      ctx.clearRect(0, 0, cols, ROWS)
      draw(ctx, cols)
      setCell(size)
    }
    render()
    let t = 0
    const ro = new ResizeObserver(() => {
      window.clearTimeout(t)
      t = window.setTimeout(render, 120)
    })
    ro.observe(canvas.parentElement!)
    return () => {
      ro.disconnect()
      window.clearTimeout(t)
    }
  }, [])

  useEffect(() => onGround?.(GROUND_ROWS * cell), [cell, onGround])

  return <canvas ref={ref} className="pixelated block" aria-hidden="true" />
}
