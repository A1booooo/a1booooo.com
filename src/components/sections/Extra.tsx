import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import type { Rarity } from '../../data/types'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const { hobbies, updates, ui } = profile

/** 背包格子：稀有度越高越亮 */
const SLOT: Record<Rarity, string> = {
  legendary: 'bg-neon text-white shadow-[0_0_18px_rgb(255_45_85/0.75)]',
  epic: 'neon-outline text-neon-pale',
  rare: 'bg-neon-dim text-neon-hi',
  common: 'bg-white/[0.06] text-fg-soft',
}
const BADGE: Record<Rarity, string> = {
  legendary: 'glow-text',
  epic: 'text-neon-pale',
  rare: 'text-neon-hi/80',
  common: 'text-fg-faint',
}

/** 番外篇 · 背包与日志 */
export function Extra() {
  return (
    <section id="extra" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeader copy={ui.sections.extra} />

      <p className="mb-7 font-pixel text-[18px] leading-none text-fg">{ui.extra.inventoryTitle}</p>
      <ul className="grid items-start gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((h, i) => (
          <motion.li
            key={h.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 22, delay: (i % 3) * 0.05 }}
          >
            <div className="group flex gap-3.5">
              <span className={`grid size-12 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 ${SLOT[h.rarity]}`}>
                <Icon name={h.icon} size={26} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline gap-x-2 font-semibold leading-snug text-fg">
                  {h.name}
                  <span className={`font-pixel text-[12px] leading-none font-normal ${BADGE[h.rarity]}`}>{ui.extra.rarity[h.rarity]}</span>
                </p>
                <p className="mt-1.5 text-sm leading-6 text-fg-soft">{h.desc}</p>
              </div>
            </div>
            <OsBubble text={h.os} className="pl-[62px]" />
          </motion.li>
        ))}
      </ul>

      <p className="mt-24 mb-7 font-pixel text-[18px] leading-none text-fg">{ui.extra.updatesTitle}</p>
      <ol className="relative border-l border-line">
        {updates.map((u, i) => (
          <Reveal key={`${u.date}-${u.version}`} delay={Math.min(i, 4) * 0.04}>
            <li className="relative pb-8 pl-7">
              <span
                aria-hidden="true"
                className={`absolute top-1.5 -left-[5px] size-[9px] rounded-full ${i === 0 ? 'bg-neon shadow-[0_0_10px_#ff2d55]' : 'bg-fg-faint'}`}
              />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className={`font-tiny text-[12px] ${i === 0 ? 'glow-text' : 'text-neon-hi/80'}`}>{u.version}</span>
                <span className="font-mono text-[12px] text-fg-faint">{u.date}</span>
                <span className="rounded-full border border-line px-2 py-0.5 font-pixel text-[12px] leading-none text-fg-soft">{u.kind}</span>
                {i === 0 && <span className="rounded-full bg-neon px-1.5 py-0.5 font-tiny text-[9px] text-white shadow-[0_0_10px_#ff2d55]">{ui.extra.latest}</span>}
              </div>
              <h3 className="mt-1.5 font-semibold text-fg">{u.title}</h3>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-fg-soft">{u.text}</p>
              {u.link && (
                <a href={u.link.url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm text-neon-pale hover:underline">
                  {u.link.label}
                  <Icon name="external" size={14} />
                </a>
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
