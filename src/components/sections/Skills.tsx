import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { profile } from '../../data/profile'
import type { Accent, Skill } from '../../data/types'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { PixelArt } from '../../pixel/PixelArt'
import { mascot } from '../../pixel/sprites'
import { burst } from '../fx/particles'
import { Icon } from '../ui/Icon'
import { SegmentBar } from '../ui/PixelBar'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

const { skillCategories, ui } = profile
const ALL = '__all__'

type Entry = Skill & { accent: Accent; category: string }
const entries: Entry[] = skillCategories.flatMap((c) => c.skills.map((s) => ({ ...s, accent: c.accent, category: c.id })))
const total = entries.length

export function Skills({ godMode }: { godMode: boolean }) {
  const [filter, setFilter] = useState(ALL)
  const [hovered, setHovered] = useState<string | null>(null)
  const [pinned, setPinned] = useState<string | null>(null)
  const wide = useMediaQuery('(min-width: 1024px)')
  const bonus = godMode ? 1 : 0

  const visible = useMemo(() => (filter === ALL ? entries : entries.filter((e) => e.category === filter)), [filter])
  const shownId = pinned ?? hovered
  const shown = entries.find((e) => e.id === shownId) ?? null

  const toggle = (e: Entry, el: HTMLElement) => {
    const next = pinned === e.id ? null : e.id
    setPinned(next)
    if (next) {
      const r = el.getBoundingClientRect()
      burst({ x: r.left + 28, y: r.top + 28, count: 10, speed: 2.6, size: 4 })
    }
  }

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader copy={ui.sections.skills} />

      {/* 分类筛选 */}
      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        <FilterChip active={filter === ALL} onClick={() => setFilter(ALL)} label={ui.skills.allLabel} count={total} accent="blue" />
        {skillCategories.map((c) => (
          <FilterChip
            key={c.id}
            active={filter === c.id}
            onClick={() => setFilter(c.id)}
            label={c.label}
            count={c.skills.length}
            accent={c.accent}
            icon={c.icon}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <LayoutGroup>
          <motion.ul layout className="grid content-start gap-2.5 sm:grid-cols-2 sm:gap-3" onMouseLeave={() => setHovered(null)}>
            <AnimatePresence mode="popLayout">
              {visible.map((s) => {
                const isPinned = pinned === s.id
                const isShown = shownId === s.id
                return (
                  <motion.li
                    layout
                    key={s.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className={`accent-${s.accent}`}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => wide && setHovered(s.id)}
                      onFocus={() => wide && setHovered(s.id)}
                      onClick={(ev) => toggle(s, ev.currentTarget)}
                      aria-expanded={isPinned}
                      className={`group w-full rounded-2xl border bg-white p-3.5 text-left sm:p-4 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] ${
                        isPinned
                          ? 'border-[var(--a)] shadow-[0_0_0_3px_var(--a-soft)]'
                          : isShown
                            ? 'border-[var(--a-line)]'
                            : 'border-line shadow-[var(--shadow-soft)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--a-soft)] text-[var(--a-strong)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
                          <Icon name={s.icon} size={22} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">{s.name}</p>
                          <p className="font-mono text-xs text-ink-faint">
                            <span className="font-tiny text-[11px] text-[var(--a-strong)]">
                              {ui.skills.levelPrefix}
                              {Math.min(10, s.level + bonus)}
                            </span>{' '}
                            · {s.rank}
                          </p>
                        </div>
                        {isPinned && <span className="font-tiny text-[10px] text-[var(--a-strong)]">{ui.skills.pinnedLabel}</span>}
                      </div>
                      <div className="mt-3.5">
                        <SegmentBar value={s.level} accent={s.accent} size="sm" bonus={bonus} />
                      </div>
                    </button>
                    {/* 窄屏：点击原地展开 */}
                    {!wide && (
                      <AnimatePresence initial={false}>
                        {isPinned && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 rounded-2xl border border-[var(--a-line)] bg-[var(--a-soft)]/60 p-4">
                              <SkillDetailBody skill={s} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        {/* 宽屏：右侧固定详情面板 */}
        {wide && (
          <aside className="sticky top-28 self-start">
            <div className={`card min-h-[380px] overflow-hidden ${shown ? `accent-${shown.accent}` : ''}`}>
              <div className="flex items-center justify-between border-b border-line bg-paper/60 px-5 py-3">
                <p className="eyebrow text-ink-faint">{ui.skills.detailTitle}</p>
                {pinned && (
                  <button type="button" onClick={() => setPinned(null)} className="font-mono text-xs text-ink-soft hover:text-ink">
                    {ui.skills.unpin} ✕
                  </button>
                )}
              </div>
              <AnimatePresence mode="wait">
                {shown ? (
                  <motion.div
                    key={shown.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.18 }}
                    className="p-5"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <span className="grid size-14 place-items-center rounded-2xl bg-[var(--a-soft)] text-[var(--a-strong)]">
                        <Icon name={shown.icon} size={30} />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold">{shown.name}</h3>
                        <p className="font-mono text-xs text-ink-soft">
                          <span className="font-tiny text-[12px] text-[var(--a-strong)]">
                            {ui.skills.levelPrefix}
                            {Math.min(10, shown.level + bonus)}
                          </span>{' '}
                          / 10 · {shown.rank}
                        </p>
                      </div>
                    </div>
                    <SegmentBar key={shown.id} value={shown.level} accent={shown.accent} bonus={bonus} />
                    <div className="mt-5">
                      <SkillDetailBody skill={shown} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-[320px] flex-col items-center justify-center gap-4 p-6 text-center"
                  >
                    <div className="animate-float">
                      <PixelArt grid={mascot.idle} scale={5} />
                    </div>
                    <p className="text-sm text-ink-soft">{ui.skills.hoverHint}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>
        )}
      </div>
    </section>
  )
}

function SkillDetailBody({ skill }: { skill: Entry }) {
  return (
    <div className={`accent-${skill.accent} space-y-4`}>
      <p className="text-[15px] leading-7 text-ink">{skill.summary}</p>
      <div>
        <p className="eyebrow mb-2 text-[var(--a-strong)]">{ui.skills.highlightsLabel}</p>
        <ul className="space-y-2">
          {skill.highlights.map((h, i) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
              className="flex gap-2.5 text-sm leading-6 text-ink-soft"
            >
              <span className="mt-[9px] size-1.5 shrink-0 bg-[var(--a)]" aria-hidden="true" />
              {h}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="eyebrow text-ink-faint">{ui.skills.relatedLabel}</span>
        {skill.related.map((r) => (
          <Tag key={r} label={r} accent={skill.accent} size="sm" />
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
  accent,
  icon,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
  accent: Accent
  icon?: Parameters<typeof Icon>[0]['name']
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`accent-${accent} relative flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active ? 'border-[var(--a)] text-white' : 'border-line bg-white text-ink-soft hover:border-[var(--a-line)] hover:text-ink'
      }`}
    >
      {active && (
        <motion.span
          layoutId="skill-filter"
          className="absolute inset-0 rounded-full bg-[var(--a)]"
          transition={{ type: 'spring', stiffness: 480, damping: 34 }}
        />
      )}
      {icon && <Icon name={icon} size={16} className="relative" />}
      <span className={`relative ${label === ui.skills.allLabel ? 'font-tiny text-[11px]' : ''}`}>{label}</span>
      <span className={`relative font-mono text-xs ${active ? 'text-white/80' : 'text-ink-faint'}`}>{count}</span>
    </button>
  )
}
