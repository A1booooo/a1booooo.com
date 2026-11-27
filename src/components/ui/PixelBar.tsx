import { animate } from 'animejs/animation'
import { stagger } from 'animejs/utils'
import { useEffect, useRef, useState } from 'react'
import type { Accent } from '../../data/types'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface SegmentBarProps {
  value: number
  max?: number
  accent: Accent
  size?: 'sm' | 'md'
  /** 额外点亮的格子（彩蛋：GOD MODE） */
  bonus?: number
}

/** 已掌握技能：10 格分段像素条，进入视口时逐格点亮 */
export function SegmentBar({ value, max = 10, accent, size = 'md', bonus = 0 }: SegmentBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const reduced = usePrefersReducedMotion()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!inView || revealed || reduced || !ref.current) return
    const segs = ref.current.querySelectorAll('[data-hide="1"]')
    const anim = animate(segs, {
      opacity: [0, 1],
      scaleY: [0.2, 1],
      delay: stagger(55, { start: 120 }),
      duration: 320,
      ease: 'outBack(2.2)',
      onComplete: () => setRevealed(true),
    })
    return () => {
      anim.revert()
    }
  }, [inView, reduced, revealed])

  const show = revealed || (reduced && inView)
  const lit = Math.min(max, value + bonus)
  const h = size === 'sm' ? 'h-2' : 'h-2.5'

  return (
    <div ref={ref} className={`accent-${accent} flex gap-[3px]`} role="meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
      {Array.from({ length: max }, (_, i) => {
        const isLit = i < lit
        const isBonus = i >= value && i < lit
        return (
          <span
            key={i}
            data-hide={isLit && !isBonus ? '1' : '0'}
            className={`${h} flex-1 rounded-[2px] ${isLit && !isBonus && !show ? 'opacity-0' : ''} ${
              isLit
                ? isBonus
                  ? 'bg-amber shadow-[inset_0_-2px_0_rgb(0_0_0/0.12)]'
                  : 'bg-[var(--a)] shadow-[inset_0_-2px_0_rgb(0_0_0/0.12),inset_0_2px_0_rgb(255_255_255/0.35)]'
                : 'bg-paper-2'
            }`}
          />
        )
      })}
    </div>
  )
}

interface VitalBarProps {
  value: number
  max: number
  accent: Accent
}

/** HP / MP / EXP：细长连续条 + 像素刻度 */
export function VitalBar({ value, max, accent }: VitalBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const reduced = usePrefersReducedMotion()
  const pct = Math.round((value / max) * 100)

  useEffect(() => {
    if (!inView || !fill.current) return
    if (reduced) {
      fill.current.style.width = `${pct}%`
      return
    }
    animate(fill.current, { width: ['0%', `${pct}%`], duration: 1100, ease: 'outExpo', delay: 200 })
  }, [inView, pct, reduced])

  return (
    <div ref={ref} className={`accent-${accent} relative h-3 overflow-hidden rounded-[3px] bg-paper-2`}>
      <div ref={fill} className="h-full bg-[var(--a)] shadow-[inset_0_2px_0_rgb(255_255_255/0.35)]" style={{ width: 0 }} />
      {/* 像素刻度 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 calc(10% - 2px), rgb(255 255 255 / 0.9) calc(10% - 2px) 10%)' }}
      />
    </div>
  )
}
