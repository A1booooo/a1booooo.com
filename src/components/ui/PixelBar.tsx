import { animate } from 'animejs/animation'
import { stagger } from 'animejs/utils'
import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface SegmentBarProps {
  value: number
  max?: number
  tone?: 'ink' | 'red'
  size?: 'sm' | 'md'
}

/** 分段像素条：进入视口时逐格点亮 */
export function SegmentBar({ value, max = 10, tone = 'ink', size = 'md' }: SegmentBarProps) {
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
      delay: stagger(50, { start: 100 }),
      duration: 280,
      ease: 'outBack(2.2)',
      onComplete: () => setRevealed(true),
    })
    return () => {
      anim.revert()
    }
  }, [inView, reduced, revealed])

  const show = revealed || (reduced && inView)
  const h = size === 'sm' ? 'h-2' : 'h-3'
  const fill = tone === 'red' ? 'bg-red' : 'bg-ink'

  return (
    <div ref={ref} className="flex gap-[3px]" role="meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
      {Array.from({ length: max }, (_, i) => {
        const lit = i < value
        return (
          <span
            key={i}
            data-lit={lit ? '1' : '0'}
            className={`${h} flex-1 ${lit ? `${fill} ${show ? '' : 'opacity-0'}` : 'border border-ink/25 bg-card'}`}
          />
        )
      })}
    </div>
  )
}

/** 细长连续条（封面角色介绍里的 HP / MP） */
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
    <div ref={ref} className="relative h-2.5 border-[1.5px] border-ink bg-card">
      <div ref={fill} className="h-full bg-red" style={{ width: 0 }} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 calc(10% - 2px), #fff calc(10% - 2px) 10%)' }}
      />
    </div>
  )
}
