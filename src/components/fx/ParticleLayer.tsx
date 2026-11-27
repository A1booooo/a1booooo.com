import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { onBurst, PARTY_COLORS } from './particles'

interface P {
  x: number
  y: number
  vx: number
  vy: number
  g: number
  size: number
  color: string
  life: number
  max: number
}

/** 全屏透明 canvas，只在有粒子时运行 rAF */
export function ParticleLayer() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const parts: P[] = []
    let raf = 0

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = false
    }
    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.vy += p.g
        p.vx *= 0.985
        p.x += p.vx
        p.y += p.vy
        p.life--
        if (p.life <= 0) {
          parts.splice(i, 1)
          continue
        }
        // 透明度按 4 档阶梯衰减，保持像素感
        ctx.globalAlpha = Math.ceil((p.life / p.max) * 4) / 4
        ctx.fillStyle = p.color
        const s = p.size
        ctx.fillRect(Math.round(p.x - s / 2), Math.round(p.y - s / 2), s, s)
      }
      ctx.globalAlpha = 1
      raf = parts.length ? requestAnimationFrame(tick) : 0
    }

    const off = onBurst((o) => {
      const colors = o.colors ?? PARTY_COLORS
      const count = o.count ?? 18
      for (let i = 0; i < count; i++) {
        const angle =
          o.angle !== undefined ? o.angle + (Math.random() - 0.5) * (o.spread ?? Math.PI / 2) : Math.random() * Math.PI * 2
        const speed = (o.speed ?? 4) * (0.45 + Math.random() * 0.75)
        const max = (o.life ?? 46) * (0.7 + Math.random() * 0.6)
        parts.push({
          x: o.x,
          y: o.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          g: o.gravity ?? 0.16,
          size: Math.round((o.size ?? 5) * (0.7 + Math.random() * 0.6)),
          color: colors[Math.floor(Math.random() * colors.length)],
          life: max,
          max,
        })
      }
      if (!raf) raf = requestAnimationFrame(tick)
    })

    return () => {
      off()
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[60] h-full w-full no-print" aria-hidden="true" />
}
