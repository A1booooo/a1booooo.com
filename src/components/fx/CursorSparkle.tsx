import { useEffect } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { burst } from './particles'

const COLORS = ['#a9c1ff', '#ffd48a', '#a9e2c6', '#cfc2ff']

/** 极淡的像素光点拖尾（仅精细指针设备） */
export function CursorSparkle() {
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    let lastX = 0
    let lastY = 0
    let lastT = 0
    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY)
      if (now - lastT < 45 || dist < 22) return
      lastT = now
      lastX = e.clientX
      lastY = e.clientY
      burst({ x: e.clientX, y: e.clientY + 6, count: 1, size: 4, speed: 0.6, gravity: -0.015, life: 34, colors: COLORS })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])
  return null
}
