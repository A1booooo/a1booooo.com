import { animate } from 'animejs/animation'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/profile'
import type { TrainingSkill } from '../../data/types'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { burst } from '../fx/particles'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

const { training, ui } = profile
const WARM = ['#f0a020', '#ffc65c', '#eb5a73', '#ff8fa3', '#ffd54d']

export function Training() {
  return (
    <section id="training" className="relative py-20">
      {/* 暖色底带，与「已掌握」冷色区拉开 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(180deg, transparent, rgb(255 244 222 / 0.75) 18%, rgb(255 235 239 / 0.6) 82%, transparent)' }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader copy={ui.sections.training} />
        <ul className="grid gap-5 md:grid-cols-2">
          {training.map((t, i) => (
            <TrainingCard key={t.id} t={t} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function TrainingCard({ t, index }: { t: TrainingSkill; index: number }) {
  const [open, setOpen] = useState(false)
  const [boost, setBoost] = useState(0)
  const [pops, setPops] = useState<number[]>([])
  const barRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const value = Math.min(100, t.progress + boost)

  const emitFromLead = (count: number, speed = 2.2) => {
    const bar = barRef.current
    if (!bar) return
    const r = bar.getBoundingClientRect()
    burst({
      x: r.left + (r.width * value) / 100,
      y: r.top + r.height / 2,
      count,
      speed,
      size: 4,
      angle: -Math.PI / 2,
      spread: Math.PI * 0.8,
      gravity: 0.05,
      life: 40,
      colors: WARM,
    })
  }

  // 悬停时从进度前沿持续冒出小火花
  const hoverTimer = useRef(0)
  const startSparks = () => {
    if (reduced) return
    window.clearInterval(hoverTimer.current)
    hoverTimer.current = window.setInterval(() => emitFromLead(2, 1.4), 260)
  }
  const stopSparks = () => window.clearInterval(hoverTimer.current)
  useEffect(() => () => window.clearInterval(hoverTimer.current), [])

  const charge = () => {
    setBoost((b) => Math.min(b + 3, 100 - t.progress))
    const id = Date.now()
    setPops((p) => [...p, id])
    window.setTimeout(() => setPops((p) => p.filter((x) => x !== id)), 900)
    emitFromLead(16, 3.6)
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, delay: (index % 3) * 0.07 }}
      onMouseEnter={startSparks}
      onMouseLeave={stopSparks}
      className={`accent-${t.accent} group relative flex flex-col overflow-hidden rounded-2xl border border-amber-line/70 bg-white/90 shadow-[0_1px_0_rgb(36_48_72/0.04),0_14px_36px_-16px_rgb(240_160_32/0.45)] transition-transform duration-300 hover:-translate-y-1`}
    >
      {/* 顶部流动充能条 */}
      <div className="charge-stripes h-1.5 bg-gradient-to-r from-amber via-[#ff9a62] to-coral" aria-hidden="true" />

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--a-soft)] text-[var(--a-strong)] transition-transform duration-300 group-hover:rotate-[8deg] group-hover:scale-110">
            <Icon name={t.icon} size={24} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold leading-snug">{t.name}</h3>
            <p className="mt-0.5 font-mono text-xs text-ink-faint">
              {ui.training.startedLabel} {t.startedAt}
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-amber-soft px-2 py-1 font-tiny text-[10px] text-amber-strong">
            <span className="size-1.5 animate-pulse-soft bg-amber" />
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
                className="pointer-events-none absolute -top-2 font-tiny text-[13px] text-coral"
                style={{ left: `calc(${value}% - 18px)` }}
              >
                {ui.training.expPopup}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        <div className="space-y-2.5 text-sm">
          <p>
            <span className="eyebrow mr-2 text-ink-faint">{ui.training.stageLabel}</span>
            <span className="leading-6 text-ink">{t.stage}</span>
          </p>
          <p className="flex gap-2 rounded-xl bg-amber-soft/70 px-3 py-2 leading-6 text-ink">
            <span className="mt-0.5 shrink-0 text-amber-strong">
              <Icon name="flag" size={16} />
            </span>
            <span>
              <span className="font-semibold text-amber-strong">{ui.training.nextLabel}：</span>
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
                  <p className="eyebrow mb-1 text-ink-faint">{ui.training.whyLabel}</p>
                  <p className="leading-6 text-ink-soft">{t.why}</p>
                </div>
                <div>
                  <p className="eyebrow mb-1.5 text-ink-faint">{ui.training.logLabel}</p>
                  <ul className="space-y-1.5">
                    {t.log.map((l, i) => (
                      <li key={i} className="flex gap-3 leading-6">
                        <span className="shrink-0 font-mono text-xs leading-6 text-amber-strong">{l.date}</span>
                        <span className="text-ink-soft">{l.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-1.5 text-ink-faint">{ui.training.resourcesLabel}</p>
                  <ul className="flex flex-wrap gap-2">
                    {t.resources.map((r) => (
                      <li key={r.label}>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2.5 py-1 font-mono text-xs text-ink-soft transition-colors hover:border-[var(--a-line)] hover:text-[var(--a-strong)]"
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
            whileHover={{ y: -2 }}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber to-coral px-3 py-1.5 text-xs font-semibold text-white shadow-[0_3px_0_#c9576a]"
          >
            <Icon name="zap" size={14} />
            {ui.training.charge}
          </motion.button>
        </div>
      </div>
    </motion.li>
  )
}

/** 修炼进度条：暖色渐变 + 流动斜纹 + 前沿呼吸块 + 数字滚动 */
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
        <span ref={num} className="font-tiny text-[13px] text-amber-strong">
          0%
        </span>
      </div>
      <div ref={ref} className="relative h-4 rounded-[4px] bg-amber-soft p-[3px] ring-1 ring-amber-line/70">
        <div className="relative h-full overflow-hidden rounded-[2px]">
          <div ref={fill} className="relative h-full bg-gradient-to-r from-amber via-[#ff9a62] to-coral" style={{ width: 0 }}>
            <div className="charge-stripes absolute inset-0" />
            {/* 前沿呼吸块 */}
            <span className="absolute top-0 right-0 h-full w-1.5 animate-pulse-soft bg-white/85" />
          </div>
          {/* 分段缝隙，形成像素格 */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 calc(5% - 2px), var(--color-amber-soft) calc(5% - 2px) 5%)' }}
          />
        </div>
      </div>
    </div>
  )
}
