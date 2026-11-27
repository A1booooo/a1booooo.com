import { animate } from 'animejs/animation'
import { stagger } from 'animejs/utils'
import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface SegmentBarProps {
  value: number
  max?: number
  size?: 'sm' | 'md'
  /** 熄灭状态（未选中）时亮格不发光 */
  dim?: boolean
}

/** 分段像素条：进入视口时逐格点亮（每格带高光和暗边，亮格会发光） */
export function SegmentBar({ value, max = 10, size = 'md', dim = false }: SegmentBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const reduced = usePrefersReducedMotion()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!inView || revealed || reduced || !ref.current) return
    const segs = ref.current.querySelectorAll('[data-lit="1"]')
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
  const h = size === 'sm' ? 'h-2' : 'h-2.5'

  return (
    <div ref={ref} className="flex gap-[3px]" role="meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
      {Array.from({ length: max }, (_, i) => {
        const lit = i < value
        return (
          <span
            key={i}
            data-lit={lit ? '1' : '0'}
            className={`${h} flex-1 rounded-[2px] ${
              lit
                ? `bg-neon shadow-[inset_0_-2px_0_rgb(0_0_0/0.22),inset_0_2px_0_rgb(255_255_255/0.35)] ${dim ? '' : 'drop-shadow-[0_0_4px_rgb(255_45_85/0.7)]'} ${show ? '' : 'opacity-0'}`
                : 'bg-white/[0.08]'
            }`}
          />
        )
      })}
    </div>
  )
}

/** 细长连续条 + 像素刻度（封面上的 HP / MP） */
export function VitalBar({ value, max }: { value: number; max: number }) {
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
    animate(fill.current, { width: ['0%', `${pct}%`], duration: 1100, ease: 'outExpo', delay: 300 })
  }, [inView, pct, reduced])

  return (
    <div ref={ref} className="relative h-3 overflow-hidden rounded-[3px] bg-white/[0.08]">
      <div
        ref={fill}
        className="h-full bg-neon shadow-[inset_0_2px_0_rgb(255_255_255/0.35),0_0_10px_rgb(255_45_85/0.8)]"
        style={{ width: 0 }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 calc(10% - 2px), var(--color-bg) calc(10% - 2px) 10%)' }}
      />
    </div>
  )
}
