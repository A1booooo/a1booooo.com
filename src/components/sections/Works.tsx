import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import type { Project } from '../../data/types'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { Panel } from '../ui/Panel'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

const { projects, ui } = profile

/** 第 3 话 · 作品 */
export function Works() {
  return (
    <section id="works" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader copy={ui.sections.works} />
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
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
      <Panel tone={index === 0 ? 'red' : 'ink'} className="flex flex-col">
        {/* 扉页式标题栏 */}
        <div className="relative flex items-center gap-4 border-b-[2.5px] border-ink bg-ink px-5 py-4 text-white">
          <span className="grid size-12 shrink-0 place-items-center border-[2.5px] border-white bg-red">
            <Icon name={p.icon} size={28} />
          </span>
          <div className="min-w-0">
            <h3 className="font-pixel text-[18px] leading-tight">{p.name}</h3>
            <p className="mt-1 font-mono text-xs text-white/70">
              {p.period} · {p.role}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5 md:p-6">
          <div>
            <p className="font-semibold text-red-strong">{p.tagline}</p>
            <p className="mt-2 text-[15px] leading-7 text-ink-soft">{p.description}</p>
          </div>

          <dl className="grid grid-cols-3 gap-[2.5px] border-[2.5px] border-ink bg-ink">
            {p.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse bg-card px-3 py-2.5">
                <dt className="mt-0.5 text-[11px] leading-4 text-ink-faint">{m.label}</dt>
                <dd className="font-mono text-[14px] font-bold text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div>
            <p className="mb-2 font-pixel text-[12px] leading-none text-red-strong">{ui.works.highlightsLabel}</p>
            <ul className="space-y-2.5">
              {p.highlights.map((h) => (
                <li key={h.title} className="flex gap-2.5 text-sm leading-6">
                  <span className="mt-[9px] size-1.5 shrink-0 bg-red" aria-hidden="true" />
                  <p>
                    <strong className="font-semibold">{h.title}：</strong>
                    <span className="text-ink-soft">{h.text}</span>
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
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-strong hover:underline"
                >
                  <Icon name={l.icon ?? 'external'} size={16} />
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </Panel>
      <OsBubble text={p.os} className="mt-2" />
    </motion.article>
  )
}
