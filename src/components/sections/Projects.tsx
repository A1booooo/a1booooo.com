import { motion } from 'motion/react'
import { useRef, type PointerEvent } from 'react'
import { profile } from '../../data/profile'
import type { Project } from '../../data/types'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

const { projects, ui } = profile

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader copy={ui.sections.projects} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  )
}

/** 鼠标位置驱动的柔光聚焦（灵感：React Bits Spotlight Card） */
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const onMove = (e: PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22, delay: index * 0.06 }}
      className={`accent-${p.accent} card group relative flex flex-col overflow-hidden`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(360px circle at var(--mx) var(--my), var(--a-soft), transparent 70%)' }}
        aria-hidden="true"
      />

      {/* 像素封面 */}
      <div className="relative flex items-center gap-4 border-b border-line bg-[var(--a-soft)]/70 px-6 py-5">
        <span className="grid size-14 place-items-center rounded-2xl bg-white text-[var(--a-strong)] shadow-[0_3px_0_var(--a-line)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
          <Icon name={p.icon} size={30} />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-snug">{p.name}</h3>
          <p className="font-mono text-xs text-ink-soft">
            {p.period} · {p.role}
          </p>
        </div>
        {/* 角落像素点缀 */}
        <div className="absolute top-3 right-4 grid grid-cols-3 gap-1 opacity-60" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="size-1.5 bg-[var(--a)]" style={{ opacity: [1, 0.4, 0.7, 0.3, 0.9, 0.5][i] }} />
          ))}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-5 p-6">
        <div>
          <p className="font-semibold text-[var(--a-strong)]">{p.tagline}</p>
          <p className="mt-2 text-[15px] leading-7 text-ink-soft">{p.description}</p>
        </div>

        <dl className="grid grid-cols-3 gap-2">
          {p.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-line bg-white/80 px-3 py-2.5">
              <dd className="font-mono text-[15px] font-bold text-ink">{m.value}</dd>
              <dt className="mt-0.5 text-[11px] leading-4 text-ink-faint">{m.label}</dt>
            </div>
          ))}
        </dl>

        <div>
          <p className="eyebrow mb-2 text-ink-faint">{ui.projects.highlightsLabel}</p>
          <ul className="space-y-2.5">
            {p.highlights.map((h) => (
              <li key={h.title} className="flex gap-2.5 text-sm leading-6">
                <span className="mt-[9px] size-1.5 shrink-0 bg-[var(--a)]" aria-hidden="true" />
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
            <Tag key={s} label={s} size="sm" accent={p.accent} />
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
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--a-strong)] hover:underline"
              >
                <Icon name={l.icon ?? 'external'} size={16} />
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}
