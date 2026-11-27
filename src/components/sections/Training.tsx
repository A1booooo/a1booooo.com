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

const { training, ui } = profile
const SPARKS = ['#ff2d55', '#ff6f8c', '#ffb3c3', '#ffffff']

/** 修炼中的技能（第 2 话下半） */
export function TrainingList() {
  return (
    <ul className="grid items-start gap-5 md:grid-cols-2">
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
      <div className="card card-hover flex flex-col overflow-hidden">
        <div className="charge-stripes h-1.5 bg-gradient-to-r from-neon via-[#ff5e7e] to-[#ff9a8b] shadow-[0_0_12px_rgb(255_45_85/0.8)]" aria-hidden="true" />
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-neon-dim text-neon-hi">
              <Icon name={t.icon} size={24} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold leading-snug text-fg">{t.name}</h3>
              <p className="mt-0.5 font-mono text-xs text-fg-faint">
                {ui.training.startedLabel} {t.startedAt}
              </p>
            </div>
            <span className="neon-outline flex items-center gap-1.5 rounded-full px-2 py-1 font-pixel text-[12px] leading-none text-neon-pale">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-neon" />
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
                  className="glow-text pointer-events-none absolute -top-2 font-tiny text-[13px]"
                  style={{ left: `calc(${value}% - 18px)` }}
                >
                  {ui.training.expPopup}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <div className="space-y-2.5 text-sm">
            <p>
              <span className="mr-2 font-pixel text-[12px] text-fg-faint">{ui.training.stageLabel}</span>
              <span className="leading-6 text-fg">{t.stage}</span>
            </p>
            <p className="flex gap-2 rounded-xl bg-neon-dim px-3 py-2 leading-6 text-fg">
              <span className="mt-0.5 shrink-0 text-neon-hi">
                <Icon name="flag" size={16} />
              </span>
              <span>
                <span className="font-semibold text-neon-pale">{ui.training.nextLabel}：</span>
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
                <div className="space-y-4 border-t border-dashed border-line pt-4 text-sm">
                  <div>
                    <p className="mb-1 font-pixel text-[12px] text-fg-faint">{ui.training.whyLabel}</p>
                    <p className="leading-6 text-fg-soft">{t.why}</p>
                  </div>
                  <div>
                    <p className="mb-1.5 font-pixel text-[12px] text-fg-faint">{ui.training.logLabel}</p>
                    <ul className="space-y-1.5">
                      {t.log.map((l, i) => (
                        <li key={i} className="flex gap-3 leading-6">
                          <span className="shrink-0 font-mono text-xs leading-6 text-neon-hi">{l.date}</span>
                          <span className="text-fg-soft">{l.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1.5 font-pixel text-[12px] text-fg-faint">{ui.training.resourcesLabel}</p>
                    <ul className="flex flex-wrap gap-2">
                      {t.resources.map((r) => (
                        <li key={r.label}>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 font-mono text-xs text-fg-soft transition-colors hover:border-neon/70 hover:text-neon-pale"
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
              className="font-mono text-xs text-fg-soft underline-offset-4 hover:text-fg hover:underline"
            >
              {open ? ui.training.collapse : ui.training.expand} {open ? '▲' : '▼'}
            </button>
            <motion.button
              type="button"
              onClick={charge}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-neon to-[#ff7a7a] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_16px_-2px_rgb(255_45_85/0.8)]"
            >
              <Icon name="zap" size={14} />
              {ui.training.charge}
            </motion.button>
          </div>
        </div>
      </div>
      <OsBubble text={t.os} className="px-1" />
    </motion.li>
  )
}

/** 修炼进度条：霓虹渐变 + 流动斜纹 + 前沿呼吸块 + 数字滚动 */
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
        <span className="font-tiny text-[11px] text-fg-faint">EXP</span>
        <span ref={num} className="glow-text font-tiny text-[13px]">
          0%
        </span>
      </div>
      <div ref={ref} className="relative h-4 rounded-[4px] bg-neon-dim p-[3px] ring-1 ring-neon/40">
        <div className="relative h-full overflow-hidden rounded-[2px]">
          <div
            ref={fill}
            className="relative h-full bg-gradient-to-r from-neon via-[#ff5e7e] to-[#ff9a8b] shadow-[0_0_10px_rgb(255_45_85/0.9)]"
            style={{ width: 0 }}
          >
            <div className="charge-stripes absolute inset-0" />
            {/* 前沿呼吸块 */}
            <span className="absolute top-0 right-0 h-full w-1.5 animate-pulse-soft bg-white/85" />
          </div>
          {/* 分段缝隙，形成像素格 */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 calc(5% - 2px), var(--color-surface) calc(5% - 2px) 5%)' }}
          />
        </div>
      </div>
    </div>
  )
}
