import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { profile } from '../../data/profile'
import type { Skill } from '../../data/types'
import { burst } from '../fx/particles'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { Panel } from '../ui/Panel'
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
    <section id="skills" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader copy={ui.sections.skills} />

      <Reveal className="mb-12">
        <Advance />
      </Reveal>

      {/* 分类筛选 */}
      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        <FilterChip active={filter === ALL} onClick={() => setFilter(ALL)} label={ui.skills.allLabel} count={entries.length} />
        {skillCategories.map((c) => (
          <FilterChip
            key={c.id}
            active={filter === c.id}
            onClick={() => setFilter(c.id)}
            label={c.label}
            count={c.skills.length}
            icon={c.icon}
          />
        ))}
      </div>

      <LayoutGroup>
        <motion.ul layout className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  <Panel tone={isOpen ? 'red' : 'ink'} className={isOpen ? 'border-red' : ''}>
                    <button
                      type="button"
                      onClick={(ev) => toggle(s.id, ev.currentTarget)}
                      aria-expanded={isOpen}
                      className="group w-full p-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid size-10 shrink-0 place-items-center border-[2.5px] border-ink transition-colors ${
                            isOpen ? 'bg-red text-white' : 'bg-card text-ink group-hover:bg-ink group-hover:text-white'
                          }`}
                        >
                          <Icon name={s.icon} size={22} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold leading-snug">{s.name}</p>
                          <p className="font-mono text-xs text-ink-faint">
                            <span className="font-tiny text-[11px] text-red-strong">
                              {ui.skills.levelPrefix}
                              {s.level}
                            </span>{' '}
                            · {s.rank}
                          </p>
                        </div>
                        <span className="font-pixel text-[12px] text-ink-faint" aria-hidden="true">
                          {isOpen ? '▲' : '▼'}
                        </span>
                      </div>
                      <div className="mt-3.5">
                        <SegmentBar value={s.level} tone={isOpen ? 'red' : 'ink'} size="sm" />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-ink-soft">{s.summary}</p>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <SkillDetail skill={s} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Panel>
                  <OsBubble text={s.os} className="mt-2" />
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      <div className="mt-20">
        <div className="mb-8 flex flex-col gap-2">
          <p className="flex items-center gap-2 font-pixel text-[24px] leading-none md:text-[24px]">
            <span className="charge-stripes inline-block size-4 bg-red" aria-hidden="true" />
            {ui.skills.trainingTitle}
          </p>
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">{ui.skills.trainingDesc}</p>
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
      <Panel className="p-5 md:p-6">
        <p className="mb-4 font-pixel text-[12px] leading-none text-ink-soft">{ui.skills.advanceTitle}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="shrink-0 border-[2.5px] border-ink bg-ink px-3 py-1.5 font-pixel text-[18px] leading-none text-white">{adv.from}</span>
          <div className="flex min-w-[160px] flex-1 items-center gap-2">
            <div className="flex-1">
              <SegmentBar value={Math.round(adv.progress / 10)} tone="red" />
            </div>
            <span className="font-pixel text-[12px] text-red" aria-hidden="true">
              ▶
            </span>
          </div>
          <span className="shrink-0 border-[2.5px] border-dashed border-red bg-red-soft px-3 py-1.5 font-pixel text-[18px] leading-none text-red-strong">
            {adv.to}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-ink-soft">{adv.note}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="flex flex-wrap gap-2">
            {adv.fromTags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {adv.toTags.map((t) => (
              <Tag key={t} label={t} tone="red" />
            ))}
          </div>
        </div>
      </Panel>
      <OsBubble text={adv.os} className="mt-2" />
    </div>
  )
}

function SkillDetail({ skill }: { skill: Entry }) {
  return (
    <div className="space-y-4 border-t-[2.5px] border-dashed border-ink/30 p-4">
      <div>
        <p className="mb-2 font-pixel text-[12px] leading-none text-red-strong">{ui.skills.highlightsLabel}</p>
        <ul className="space-y-2">
          {skill.highlights.map((h, i) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
              className="flex gap-2.5 text-sm leading-6 text-ink-soft"
            >
              <span className="mt-[9px] size-1.5 shrink-0 bg-red" aria-hidden="true" />
              {h}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-pixel text-[12px] leading-none text-ink-faint">{ui.skills.relatedLabel}</span>
        {skill.related.map((r) => (
          <Tag key={r} label={r} size="sm" tone="soft" />
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
      className={`relative flex items-center gap-1.5 border-[2.5px] border-ink px-3 py-1.5 text-sm font-medium transition-colors ${
        active ? 'text-white' : 'bg-card text-ink hover:bg-paper-2'
      }`}
    >
      {active && (
        <motion.span layoutId="skill-filter" className="absolute inset-0 bg-ink" transition={{ type: 'spring', stiffness: 480, damping: 34 }} />
      )}
      {icon && <Icon name={icon} size={16} className="relative" />}
      <span className="relative">{label}</span>
      <span className={`relative font-mono text-xs ${active ? 'text-white/70' : 'text-ink-faint'}`}>{count}</span>
    </button>
  )
}
