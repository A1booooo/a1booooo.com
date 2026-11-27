import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { profile } from '../../data/profile'
import type { Skill } from '../../data/types'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { burst } from '../fx/particles'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { SegmentBar } from '../ui/PixelBar'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'
import { TrainingList } from './Training'

const { skillCategories, character, ui } = profile

type Entry = Skill & { category: string }
const entries: Entry[] = skillCategories.flatMap((c) => c.skills.map((s) => ({ ...s, category: c.id })))

/** 熟练度越高越亮：Lv.7 实心发光 / Lv.6 霓虹描边 / Lv.5 暗红底 / 更低是灰色 */
function tier(level: number) {
  if (level >= 7) return 'bg-neon text-white shadow-[0_0_14px_-2px_rgb(255_45_85/0.85)]'
  if (level === 6) return 'neon-outline text-neon-pale'
  if (level === 5) return 'border border-neon/25 bg-neon-dim text-neon-hi'
  return 'border border-line bg-white/[0.05] text-fg-soft'
}

/** 第 2 话 · 技能与修炼：技能栏 + 一个详情面板 */
export function Skills() {
  const [selected, setSelected] = useState(entries[0].id)
  const wide = useMediaQuery('(min-width: 1024px)')
  const current = entries.find((e) => e.id === selected) ?? entries[0]

  const pick = (id: string, el: HTMLElement) => {
    setSelected(id)
    const r = el.getBoundingClientRect()
    burst({ x: r.left + r.width / 2, y: r.top + r.height / 2, count: 10, speed: 2.6, size: 4 })
  }

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeader copy={ui.sections.skills} />

      <Reveal className="mb-16">
        <Advance />
      </Reveal>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* 技能栏：按分类分行 */}
        <div>
          <p className="mb-6 flex items-center gap-2 font-pixel text-[12px] leading-none text-fg-faint">
            <span className="flex gap-1" aria-hidden="true">
              <span className="size-2.5 rounded-[2px] bg-white/10" />
              <span className="size-2.5 rounded-[2px] bg-neon-dim" />
              <span className="size-2.5 rounded-[2px] border border-neon" />
              <span className="size-2.5 rounded-[2px] bg-neon shadow-[0_0_6px_#ff2d55]" />
            </span>
            {ui.skills.legend}
          </p>
          <div className="space-y-7">
            {skillCategories.map((c, ci) => (
              <Reveal key={c.id} delay={ci * 0.04}>
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-fg-soft">
                  <Icon name={c.icon} size={16} className="text-neon-hi" />
                  {c.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.skills.map((s) => {
                    const on = s.id === selected
                    return (
                      <motion.button
                        key={s.id}
                        type="button"
                        onClick={(ev) => pick(s.id, ev.currentTarget)}
                        aria-pressed={on}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-1.5 rounded-xl py-1.5 pr-2.5 pl-2 text-sm font-medium transition-[outline-color] ${tier(s.level)} ${
                          on ? 'outline-2 outline-offset-2 outline-white' : 'outline-2 outline-offset-2 outline-transparent'
                        }`}
                      >
                        <Icon name={s.icon} size={16} />
                        {s.name}
                        <span className="font-tiny text-[10px] opacity-75">
                          {ui.skills.levelPrefix}
                          {s.level}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
                {/* 手机：详情直接在当前分类下面展开 */}
                {!wide && (
                  <AnimatePresence initial={false}>
                    {current.category === c.id && (
                      <motion.div
                        key={current.id}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4">
                          <SkillCard skill={current} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        {/* 桌面：右侧固定详情面板 */}
        {wide && (
          <aside className="sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.18 }}
              >
                <SkillCard skill={current} />
              </motion.div>
            </AnimatePresence>
          </aside>
        )}
      </div>

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

/** 选中技能的详情：像素条 + 实战说明 + 出处 + 心声 */
function SkillCard({ skill }: { skill: Entry }) {
  return (
    <div className="card glow-box p-5">
      <div className="mb-4 flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-neon text-white shadow-[0_0_18px_rgb(255_45_85/0.7)]">
          <Icon name={skill.icon} size={30} />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-fg">{skill.name}</h3>
          <p className="font-mono text-xs text-fg-faint">
            <span className="glow-text font-tiny text-[12px]">
              {ui.skills.levelPrefix}
              {skill.level}
            </span>{' '}
            / 10 · {skill.rank}
          </p>
        </div>
      </div>
      <SegmentBar key={skill.id} value={skill.level} />
      <p className="mt-4 text-[15px] leading-7 text-fg">{skill.summary}</p>
      <SkillDetail skill={skill} />
      <OsBubble text={skill.os} />
    </div>
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
    <div className="mt-4 space-y-4 border-t border-line pt-4">
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
