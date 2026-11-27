import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { profile } from '../../data/profile'
import type { Skill } from '../../data/types'
import { burst } from '../fx/particles'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { SegmentBar } from '../ui/PixelBar'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'
import { TrainingList } from './Training'

const { skillCategories, character, ui } = profile
const ALL = '__all__'

type Entry = Skill & { category: string }
const entries: Entry[] = skillCategories.flatMap((c) => c.skills.map((s) => ({ ...s, category: c.id })))

/** 第 2 话 · 技能与修炼 */
export function Skills() {
  const [filter, setFilter] = useState(ALL)
  const [open, setOpen] = useState<string | null>(null)
  const visible = useMemo(() => (filter === ALL ? entries : entries.filter((e) => e.category === filter)), [filter])

  const toggle = (id: string, el: HTMLElement) => {
    const next = open === id ? null : id
    setOpen(next)
    if (next) {
      const r = el.getBoundingClientRect()
      burst({ x: r.left + 30, y: r.top + 30, count: 10, speed: 2.6, size: 4 })
    }
  }

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeader copy={ui.sections.skills} />

      <Reveal className="mb-14">
        <Advance />
      </Reveal>

      {/* 分类筛选 */}
      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        <FilterChip active={filter === ALL} onClick={() => setFilter(ALL)} label={ui.skills.allLabel} count={entries.length} />
        {skillCategories.map((c) => (
          <FilterChip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)} label={c.label} count={c.skills.length} icon={c.icon} />
        ))}
      </div>

      <LayoutGroup>
        <motion.ul layout className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((s) => {
              const isOpen = open === s.id
              return (
                <motion.li
                  layout
                  key={s.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                >
                  <div className={`card card-hover overflow-hidden ${isOpen ? 'glow-box' : ''}`}>
                    <button type="button" onClick={(ev) => toggle(s.id, ev.currentTarget)} aria-expanded={isOpen} className="group w-full p-4 text-left">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid size-10 shrink-0 place-items-center rounded-xl transition-colors ${
                            isOpen ? 'bg-neon text-white shadow-[0_0_14px_rgb(255_45_85/0.7)]' : 'bg-neon-dim text-neon-hi'
                          }`}
                        >
                          <Icon name={s.icon} size={22} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold leading-snug text-fg">{s.name}</p>
                          <p className="font-mono text-xs text-fg-faint">
                            <span className="font-tiny text-[11px] text-neon-hi">
                              {ui.skills.levelPrefix}
                              {s.level}
                            </span>{' '}
                            · {s.rank}
                          </p>
                        </div>
                        <span className={`text-[10px] text-fg-faint transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true">
                          ▼
                        </span>
                      </div>
                      <div className="mt-3.5">
                        <SegmentBar value={s.level} size="sm" dim={!isOpen} />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-fg-soft">{s.summary}</p>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <SkillDetail skill={s} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <OsBubble text={s.os} className="px-1" />
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      <div className="mt-24">
        <div className="mb-8 flex flex-col gap-2">
          <p className="flex items-center gap-2.5 font-pixel text-[24px] leading-none text-fg">
            <span className="charge-stripes inline-block size-4 rounded-[3px] bg-neon shadow-[0_0_10px_#ff2d55]" aria-hidden="true" />
            {ui.skills.trainingTitle}
          </p>
          <p className="max-w-2xl text-[15px] leading-relaxed text-fg-soft">{ui.skills.trainingDesc}</p>
        </div>
        <TrainingList />
      </div>
    </section>
  )
}

/** 转职进度：AI 前端 ━━━▶ AI 全栈 */
function Advance() {
  const adv = character.advance
  return (
    <div>
      <p className="mb-4 font-pixel text-[12px] leading-none text-fg-faint">{ui.skills.advanceTitle}</p>
      <div className="flex flex-wrap items-center gap-3">
        <span className="shrink-0 rounded-lg bg-neon px-3 py-1.5 font-pixel text-[18px] leading-none text-white shadow-[0_0_16px_rgb(255_45_85/0.7)]">
          {adv.from}
        </span>
        <div className="flex min-w-[160px] flex-1 items-center gap-2">
          <div className="flex-1">
            <SegmentBar value={Math.round(adv.progress / 10)} />
          </div>
          <span className="glow-text text-[12px]" aria-hidden="true">
            ▶
          </span>
        </div>
        <span className="shrink-0 rounded-lg border border-dashed border-neon/70 px-3 py-1.5 font-pixel text-[18px] leading-none text-neon-pale">{adv.to}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-fg-soft">{adv.note}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {adv.fromTags.map((t) => (
          <Tag key={t} label={t} />
        ))}
        {adv.toTags.map((t) => (
          <Tag key={t} label={t} tone="neon" />
        ))}
      </div>
      <OsBubble text={adv.os} />
    </div>
  )
}

function SkillDetail({ skill }: { skill: Entry }) {
  return (
    <div className="space-y-4 border-t border-line px-4 pt-3.5 pb-4">
      <div>
        <p className="mb-2 font-pixel text-[12px] leading-none text-neon-hi">{ui.skills.highlightsLabel}</p>
        <ul className="space-y-2">
          {skill.highlights.map((h, i) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
              className="flex gap-2.5 text-sm leading-6 text-fg-soft"
            >
              <span className="mt-[9px] size-1.5 shrink-0 bg-neon shadow-[0_0_6px_#ff2d55]" aria-hidden="true" />
              {h}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-pixel text-[12px] leading-none text-fg-faint">{ui.skills.relatedLabel}</span>
        {skill.related.map((r) => (
          <Tag key={r} label={r} size="sm" />
        ))}
      </div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  label,
  count,
  icon,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
  icon?: Parameters<typeof Icon>[0]['name']
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`relative flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active ? 'border-neon text-white' : 'border-line text-fg-soft hover:border-white/25 hover:text-fg'
      }`}
    >
      {active && (
        <motion.span
          layoutId="skill-filter"
          className="absolute inset-0 rounded-full bg-neon shadow-[0_0_16px_rgb(255_45_85/0.7)]"
          transition={{ type: 'spring', stiffness: 480, damping: 34 }}
        />
      )}
      {icon && <Icon name={icon} size={16} className="relative" />}
      <span className="relative">{label}</span>
      <span className={`relative font-mono text-xs ${active ? 'text-white/75' : 'text-fg-faint'}`}>{count}</span>
    </button>
  )
}
