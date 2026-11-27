import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import type { Rarity } from '../../data/types'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { Panel } from '../ui/Panel'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const { hobbies, updates, ui } = profile

const RARITY: Record<Rarity, { badge: string; icon: string; tone: 'red' | 'ink' }> = {
  legendary: { badge: 'bg-red text-white', icon: 'bg-red text-white', tone: 'red' },
  epic: { badge: 'bg-ink text-white', icon: 'bg-ink text-white', tone: 'ink' },
  rare: { badge: 'border-[1.5px] border-ink text-ink', icon: 'bg-red-soft text-red-strong', tone: 'ink' },
  common: { badge: 'border-[1.5px] border-ink/40 text-ink-soft', icon: 'bg-paper-2 text-ink', tone: 'ink' },
}

/** 番外篇 · 背包与日志 */
export function Extra() {
  return (
    <section id="extra" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader copy={ui.sections.extra} />

      <p className="mb-6 font-pixel text-[18px] leading-none">{ui.extra.inventoryTitle}</p>
      <ul className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((h, i) => {
          const r = RARITY[h.rarity]
          return (
            <motion.li
              key={h.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ type: 'spring', stiffness: 200, damping: 22, delay: (i % 3) * 0.05 }}
            >
              <Panel tone={r.tone} className="p-4">
                <div className="flex items-start gap-3">
                  <span className={`grid size-11 shrink-0 place-items-center border-[2.5px] border-ink ${r.icon}`}>
                    <Icon name={h.icon} size={24} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold leading-snug">{h.name}</p>
                      <span className={`px-1.5 py-0.5 font-pixel text-[12px] leading-none ${r.badge}`}>{ui.extra.rarity[h.rarity]}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-6 text-ink-soft">{h.desc}</p>
                  </div>
                </div>
              </Panel>
              <OsBubble text={h.os} className="mt-2" />
            </motion.li>
          )
        })}
      </ul>

      <p className="mt-20 mb-6 font-pixel text-[18px] leading-none">{ui.extra.updatesTitle}</p>
      <ol className="space-y-5">
        {updates.map((u, i) => (
          <Reveal key={`${u.date}-${u.version}`} delay={Math.min(i, 4) * 0.04}>
            <li>
              <Panel tone={i === 0 ? 'red' : false} className="flex gap-4 p-4">
                <div className="flex w-[70px] shrink-0 flex-col items-start gap-1">
                  <span className="font-tiny text-[12px] text-red-strong">{u.version}</span>
                  <span className="font-mono text-[11px] text-ink-faint">{u.date.slice(5)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="border-[1.5px] border-ink px-1.5 py-0.5 font-pixel text-[12px] leading-none">{u.kind}</span>
                    <h3 className="font-semibold">{u.title}</h3>
                    {i === 0 && (
                      <span className="animate-pulse-soft bg-red px-1.5 py-0.5 font-tiny text-[9px] text-white">{ui.extra.latest}</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{u.text}</p>
                  {u.link && (
                    <a href={u.link.url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm text-red-strong hover:underline">
                      {u.link.label}
                      <Icon name="external" size={14} />
                    </a>
                  )}
                </div>
              </Panel>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
