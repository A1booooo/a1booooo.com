import { animate } from 'animejs/animation'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/profile'
import type { TrainingSkill } from '../../data/types'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { burst } from '../fx/particles'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { Panel } from '../ui/Panel'

const { training, ui } = profile
const SPARKS = ['#e0452b', '#1c1917', '#f4b6a6']

/** 修炼中的技能（第 2 话下半） */
export function TrainingList() {
  return (
    <ul className="grid items-start gap-8 md:grid-cols-2">
      {training.map((t, i) => (
        <TrainingCard key={t.id} t={t} index={i} />
      ))}
    </ul>
  )
}

function TrainingCard({ t, index }: { t: TrainingSkill; index: number }) {
  const [open, setOpen] = useState(false)
  const [boost, setBoost] = useState(0)
  const [pops, setPops] = useState<number[]>([])
  const barRef = useRef<HTMLDivElement>(null)
  const value = Math.min(100, t.progress + boost)

  const charge = () => {
    setBoost((b) => Math.min(b + 3, 100 - t.progress))
    const id = Date.now()
    setPops((p) => [...p, id])
    window.setTimeout(() => setPops((p) => p.filter((x) => x !== id)), 900)
    const bar = barRef.current
    if (!bar) return
    const r = bar.getBoundingClientRect()
    burst({
      x: r.left + (r.width * value) / 100,
      y: r.top + r.height / 2,
      count: 16,
      speed: 3.6,
      size: 4,
      angle: -Math.PI / 2,
      spread: Math.PI * 0.8,
      gravity: 0.05,
      life: 40,
      colors: SPARKS,
    })
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, delay: (index % 2) * 0.07 }}
    >
      <Panel tone="red" className="flex flex-col">
        <div className="charge-stripes h-2 border-b-[2.5px] border-ink bg-red" aria-hidden="true" />
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center border-[2.5px] border-ink bg-red-soft text-red-strong">
              <Icon name={t.icon} size={24} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold leading-snug">{t.name}</h3>
              <p className="mt-0.5 font-mono text-xs text-ink-faint">
                {ui.training.startedLabel} {t.startedAt}
              </p>
            </div>
            <span className="flex items-center gap-1.5 border-[1.5px] border-red px-2 py-1 font-pixel text-[12px] leading-none text-red-strong">
              <span className="size-1.5 animate-pulse-soft bg-red" />
              {ui.training.badge}
            </span>
          </div>

          <div className="relative">
            <ChargeBar ref={barRef} value={value} />
            <AnimatePresence>
              {pops.map((id) => (
                <motion.span
                  key={id}
                  initial={{ opacity: 0, y: 0, scale: 0.6 }}
                  animate={{ opacity: 1, y: -30, scale: 1 }}
                  exit={{ opacity: 0, y: -44 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="pointer-events-none absolute -top-2 font-tiny text-[13px] text-red"
                  style={{ left: `calc(${value}% - 18px)` }}
                >
                  {ui.training.expPopup}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <div className="space-y-2.5 text-sm">
            <p>
              <span className="mr-2 font-pixel text-[12px] text-ink-faint">{ui.training.stageLabel}</span>
              <span className="leading-6 text-ink">{t.stage}</span>
            </p>
            <p className="tone-red flex gap-2 border-[1.5px] border-ink bg-card px-3 py-2 leading-6 text-ink">
              <span className="mt-0.5 shrink-0 text-red-strong">
                <Icon name="flag" size={16} />
              </span>
              <span className="bg-card/85">
                <span className="font-semibold text-red-strong">{ui.training.nextLabel}：</span>
                {t.nextMilestone}
              </span>
            </p>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 border-t-[2px] border-dashed border-ink/30 pt-4 text-sm">
                  <div>
                    <p className="mb-1 font-pixel text-[12px] text-ink-faint">{ui.training.whyLabel}</p>
                    <p className="leading-6 text-ink-soft">{t.why}</p>
                  </div>
                  <div>
                    <p className="mb-1.5 font-pixel text-[12px] text-ink-faint">{ui.training.logLabel}</p>
                    <ul className="space-y-1.5">
                      {t.log.map((l, i) => (
                        <li key={i} className="flex gap-3 leading-6">
                          <span className="shrink-0 font-mono text-xs leading-6 text-red-strong">{l.date}</span>
                          <span className="text-ink-soft">{l.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1.5 font-pixel text-[12px] text-ink-faint">{ui.training.resourcesLabel}</p>
                    <ul className="flex flex-wrap gap-2">
                      {t.resources.map((r) => (
                        <li key={r.label}>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 border-[1.5px] border-ink bg-card px-2.5 py-1 font-mono text-xs text-ink-soft transition-colors hover:bg-ink hover:text-white"
                          >
                            {r.label}
                            <Icon name="external" size={12} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="font-mono text-xs text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              {open ? ui.training.collapse : ui.training.expand} {open ? '▲' : '▼'}
            </button>
            <motion.button
              type="button"
              onClick={charge}
              whileTap={{ scale: 0.92 }}
              className="flex items-center gap-1.5 border-[2.5px] border-ink bg-red px-3 py-1.5 text-xs font-semibold text-white shadow-[3px_3px_0_var(--color-ink)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--color-ink)]"
            >
              <Icon name="zap" size={14} />
              {ui.training.charge}
            </motion.button>
          </div>
        </div>
      </Panel>
      <OsBubble text={t.os} className="mt-2" />
    </motion.li>
  )
}

/** 修炼进度条：朱红 + 流动斜纹 + 数字滚动 */
function ChargeBar({ value, ref }: { value: number; ref: React.Ref<HTMLDivElement> }) {
  const wrap = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLDivElement>(null)
  const num = useRef<HTMLSpanElement>(null)
  const inView = useInView(wrap)
  const reduced = usePrefersReducedMotion()
  const shown = useRef(0)

  useEffect(() => {
    if (!inView || !fill.current || !num.current) return
    const from = shown.current
    shown.current = value
    if (reduced) {
      fill.current.style.width = `${value}%`
      num.current.textContent = `${value}%`
      return
    }
    const counter = { v: from }
    const n = num.current
    animate(fill.current, { width: [`${from}%`, `${value}%`], duration: from === 0 ? 1400 : 500, ease: 'outExpo' })
    animate(counter, {
      v: value,
      duration: from === 0 ? 1400 : 500,
      ease: 'outExpo',
      onUpdate: () => {
        n.textContent = `${Math.round(counter.v)}%`
      },
    })
  }, [inView, value, reduced])

  return (
    <div ref={wrap}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-tiny text-[11px] text-ink-faint">EXP</span>
        <span ref={num} className="font-tiny text-[13px] text-red-strong">
          0%
        </span>
      </div>
      <div ref={ref} className="relative h-4 border-[2.5px] border-ink bg-card">
        <div ref={fill} className="relative h-full bg-red" style={{ width: 0 }}>
          <div className="charge-stripes absolute inset-0" />
          <span className="absolute top-0 right-0 h-full w-1 animate-pulse-soft bg-white/90" />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 calc(5% - 2px), #fff calc(5% - 2px) 5%)' }}
        />
      </div>
    </div>
  )
}
