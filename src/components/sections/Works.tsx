import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import type { Project } from '../../data/types'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

const { projects, ui } = profile

/** 第 3 话 · 作品 */
export function Works() {
  return (
    <section id="works" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeader copy={ui.sections.works} />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {projects.map((p, i) => (
          <WorkCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  )
}

function WorkCard({ p, index }: { p: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 22, delay: index * 0.06 }}
    >
      <div className={`card card-hover flex flex-col overflow-hidden ${index === 0 ? 'border-neon/40' : ''}`}>
        <div className="relative flex items-center gap-4 px-6 pt-6">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-neon text-white shadow-[0_0_18px_rgb(255_45_85/0.6)]">
            <Icon name={p.icon} size={28} />
          </span>
          <div className="min-w-0">
            <h3 className="font-pixel text-[18px] leading-tight text-fg md:text-[24px]">{p.name}</h3>
            <p className="mt-1.5 font-mono text-xs text-fg-faint">
              {p.period} · {p.role}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div>
            <p className="font-semibold text-neon-pale">{p.tagline}</p>
            <p className="mt-2 text-[15px] leading-7 text-fg-soft">{p.description}</p>
          </div>

          <dl className="grid grid-cols-3 gap-4">
            {p.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-[11px] leading-4 text-fg-faint">{m.label}</dt>
                <dd className="glow-text font-mono text-[15px] font-bold">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div>
            <p className="mb-2.5 font-pixel text-[12px] leading-none text-fg-faint">{ui.works.highlightsLabel}</p>
            <ul className="space-y-2.5">
              {p.highlights.map((h) => (
                <li key={h.title} className="flex gap-2.5 text-sm leading-6">
                  <span className="mt-[9px] size-1.5 shrink-0 bg-neon shadow-[0_0_6px_#ff2d55]" aria-hidden="true" />
                  <p>
                    <strong className="font-semibold text-fg">{h.title}：</strong>
                    <span className="text-fg-soft">{h.text}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {p.stack.map((s) => (
              <Tag key={s} label={s} size="sm" />
            ))}
          </div>

          {p.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {p.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neon-pale hover:underline">
                  <Icon name={l.icon ?? 'external'} size={16} />
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <OsBubble text={p.os} className="px-1" />
    </motion.article>
  )
}
