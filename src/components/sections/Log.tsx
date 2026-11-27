import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { profile } from '../../data/profile'
import type { Rarity } from '../../data/types'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const { hobbies, updates, ui } = profile

const RARITY: Record<Rarity, { accent: string; glow: string }> = {
  common: { accent: 'accent-gray', glow: '' },
  rare: { accent: 'accent-sky', glow: '' },
  epic: { accent: 'accent-lilac', glow: 'shadow-[0_0_0_3px_var(--a-soft)]' },
  legendary: { accent: 'accent-amber', glow: 'shadow-[0_0_0_3px_var(--a-soft),0_8px_24px_-8px_var(--a)]' },
}
const SLOTS = 9

export function Log() {
  const [hover, setHover] = useState<string | null>(null)
  const active = hobbies.find((h) => h.id === hover)

  return (
    <section id="log" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader copy={ui.sections.log} />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* 背包 */}
        <Reveal className="card self-start p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <p className="eyebrow text-ink">{ui.log.inventoryTitle}</p>
            <p className="text-xs text-ink-faint">{ui.log.inventoryDesc}</p>
          </div>
          <ul className="grid grid-cols-3 gap-3" onMouseLeave={() => setHover(null)}>
            {Array.from({ length: Math.max(SLOTS, hobbies.length) }, (_, i) => {
              const h = hobbies[i]
              if (!h)
                return (
                  <li
                    key={`empty-${i}`}
                    className="aspect-square rounded-xl border-2 border-dashed border-line bg-paper/60"
                    aria-hidden="true"
                  />
                )
              const r = RARITY[h.rarity]
              return (
                <li key={h.id} className={r.accent}>
                  <motion.button
                    type="button"
                    onMouseEnter={() => setHover(h.id)}
                    onFocus={() => setHover(h.id)}
                    onClick={() => setHover(hover === h.id ? null : h.id)}
                    whileHover={{ y: -4, rotate: i % 2 ? 3 : -3 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    className={`relative flex aspect-square w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-[var(--a-line)] bg-[var(--a-soft)] text-[var(--a-strong)] ${r.glow} ${
                      hover === h.id ? 'border-[var(--a)]' : ''
                    }`}
                    aria-label={h.name}
                  >
                    {h.rarity === 'legendary' && (
                      <span className="absolute top-1.5 right-1.5 animate-pulse-soft text-[10px]" aria-hidden="true">
                        ✦
                      </span>
                    )}
                    <Icon name={h.icon} size={30} />
                    <span className="px-1 text-center text-[12px] leading-tight font-medium text-ink">{h.name}</span>
                  </motion.button>
                </li>
              )
            })}
          </ul>
          <div className="mt-4 min-h-[74px] rounded-xl bg-paper p-3.5">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div key={active.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <p className={`${RARITY[active.rarity].accent} flex items-center gap-2 text-sm font-semibold`}>
                    {active.name}
                    <span className="font-tiny text-[10px] text-[var(--a-strong)]">{ui.log.rarity[active.rarity]}</span>
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{active.desc}</p>
                </motion.div>
              ) : (
                <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-ink-faint">
                  {ui.log.inventoryDesc} ▸
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Patch notes */}
        <div>
          <p className="eyebrow mb-4 text-ink">{ui.log.updatesTitle}</p>
          <ol className="relative space-y-3">
            {updates.map((u, i) => (
              <Reveal key={`${u.date}-${u.version}`} delay={Math.min(i, 4) * 0.04}>
                <li className={`accent-${u.kind.accent} card group flex gap-4 p-4 transition-colors hover:border-[var(--a-line)]`}>
                  <div className="flex w-[74px] shrink-0 flex-col items-start gap-1">
                    <span className="font-tiny text-[12px] text-[var(--a-strong)]">{u.version}</span>
                    <span className="font-mono text-[11px] text-ink-faint">{u.date.slice(5)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-[var(--a-soft)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--a-strong)]">
                        {u.kind.label}
                      </span>
                      <h3 className="font-semibold">{u.title}</h3>
                      {i === 0 && (
                        <span className="pixel-notch animate-pulse-soft bg-coral px-1.5 py-0.5 font-tiny text-[9px] text-white">
                          {ui.log.latest}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">{u.text}</p>
                    {u.link && (
                      <a href={u.link.url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm text-[var(--a-strong)] hover:underline">
                        {u.link.label}
                        <Icon name="external" size={14} />
                      </a>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
