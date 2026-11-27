import { motion } from 'motion/react'
import { useRef } from 'react'
import { profile } from '../../data/profile'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useTypewriter } from '../../hooks/useTypewriter'
import { useMascotTalk } from '../../hooks/useMascotTalk'
import { MascotSprite, SpeechBubble } from '../layout/Mascot'
import { Button } from '../ui/Button'
import { InfoRow } from '../ui/InfoRow'
import { SegmentBar, VitalBar } from '../ui/PixelBar'
import { Tag } from '../ui/Tag'
import type { ClassTag } from '../../data/types'

const { character: ch, ui } = profile

export function Hero({ godMode }: { godMode: boolean }) {
  const reduced = usePrefersReducedMotion()
  const cls = ch.mainClass
  const adv = ch.advance
  const typed = useTypewriter(ch.taglines, !reduced)
  const { line, happy, talk } = useMascotTalk()
  const spriteRef = useRef<HTMLButtonElement>(null)

  return (
    <section id="status" className="relative mx-auto max-w-6xl px-5 pt-28 pb-20 md:pt-36" aria-label={ui.sections.status.title}>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        {/* ---------- 角色卡 ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          className="card p-4 sm:p-5"
        >
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#d9ecff] via-[#eef7ff] to-[#f7fbff]">
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="pixel-notch bg-amber px-2 py-1 font-tiny text-[11px] text-white">{ch.level}</span>
              <span className="font-mono text-xs text-ink-soft">{ch.levelNote}</span>
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 font-mono text-[11px] text-mint-strong">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative size-2 rounded-full bg-mint" />
              </span>
              ONLINE
            </div>

            <div className="relative flex h-60 items-end justify-center sm:h-64">
              <div className="relative mb-6 animate-float">
                <SpeechBubble text={line} />
                <motion.button
                  ref={spriteRef}
                  type="button"
                  onClick={() => talk(spriteRef.current)}
                  aria-label={`${ui.mascot.name} · ${ui.mascot.hint}`}
                  animate={happy ? { y: [0, -22, 0], rotate: [0, -4, 4, 0] } : { y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="block cursor-pointer drop-shadow-[0_10px_0_rgb(79_123_245/0.12)]"
                >
                  <MascotSprite scale={9} frame={happy ? 'happy' : undefined} />
                </motion.button>
              </div>
              {/* 像素草地 */}
              <div className="pixelated absolute inset-x-0 bottom-0 h-6 bg-[#49b978]">
                <div className="h-1.5 bg-[#8ddba8]" />
                <div
                  className="h-full opacity-60"
                  style={{ backgroundImage: 'repeating-linear-gradient(90deg,#2f9d63 0 6px,transparent 6px 18px)' }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between gap-3 px-1">
            <div>
              <p className="text-xl font-bold">{ch.name}</p>
              <p className="font-tiny text-[11px] tracking-wider text-ink-faint">{ch.nameEn}</p>
            </div>
            <p className="font-mono text-xs text-ink-soft">{ch.status}</p>
          </div>

          <div className="mt-4 rounded-xl bg-paper p-4">
            <p className="eyebrow mb-3 text-ink-faint">{ui.hero.vitalsTitle}</p>
            <ul className="space-y-3">
              {ch.vitals.map((v) => (
                <li key={v.key} className={`accent-${v.accent}`}>
                  <div className="mb-1.5 flex items-center gap-2 text-[13px]">
                    <span className="w-8 font-tiny text-[11px] text-[var(--a-strong)]">{v.key}</span>
                    <span className="font-medium">{v.label}</span>
                    <span className="ml-auto font-mono text-xs text-ink-soft">
                      {v.value}/{v.max}
                    </span>
                  </div>
                  <VitalBar value={v.value} max={v.max} accent={v.accent} />
                  <p className="mt-1 text-xs text-ink-faint">{v.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ---------- 介绍 ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.08 }}
          className="order-first flex flex-col gap-6 lg:order-none"
        >
          <div>
            <p className="eyebrow mb-3 text-ink-soft">{ui.hero.hello}</p>
            <h1 className="flex flex-wrap items-end gap-x-4 gap-y-1 text-5xl font-bold tracking-tight md:text-6xl">
              {ch.name}
              <span className="mb-1.5 text-xl font-semibold text-blue md:text-2xl">{cls.title}</span>
            </h1>
            <p className="mt-4 min-h-[1.75em] font-mono text-[15px] text-ink md:text-base" aria-label={ch.taglines[0]}>
              <span aria-hidden="true">
                <span className="text-blue">&gt; </span>
                {typed}
                <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[3px] animate-blink bg-blue" />
              </span>
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-7 text-ink-soft">{ch.bio}</p>
          </div>

          {/* 转职任务：AI 前端 → AI 全栈 */}
          <div className="rounded-xl border border-line bg-white p-4 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between gap-3">
              <span className="eyebrow text-ink-faint">{adv.title}</span>
              <span className="flex items-center gap-1.5 rounded-full bg-amber-soft px-2.5 py-0.5 text-xs font-semibold text-amber-strong">
                <span className="size-1.5 animate-pulse bg-amber" aria-hidden="true" />
                {adv.status}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="pixel-notch shrink-0 bg-blue px-2.5 py-1 text-sm font-semibold text-white">{cls.label}</span>
              <div className="flex min-w-0 flex-1 items-center gap-1.5">
                <div className="flex-1">
                  <SegmentBar value={Math.round(adv.progress / 10)} max={10} accent="amber" size="sm" />
                </div>
                <span className="text-xs text-amber-strong" aria-hidden="true">▶</span>
              </div>
              <span className="pixel-notch shrink-0 border border-dashed border-lilac-line bg-lilac-soft px-2.5 py-1 text-sm font-semibold text-lilac-strong">
                {adv.label}
              </span>
            </div>
            <p className="mt-2.5 text-[13px] leading-5 text-ink-soft">{adv.note}</p>
          </div>

          <div className="flex flex-col gap-2.5">
            <InfoRow icon="sword" label="Class" value={cls.title} highlight />
            {ch.infoRows.map((r) => (
              <InfoRow key={r.label} {...r} />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <p className="max-w-[62ch] text-[15px] leading-7 text-ink">{cls.summary}</p>
            <div className="flex flex-col gap-2.5">
              <TagRow label={adv.mainTagsLabel} tags={cls.tags} godMode={godMode} />
              <TagRow label={adv.tagsLabel} tags={adv.tags} godMode={godMode} delay={cls.tags.length} dashed />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            {ch.resumes.map((r, i) => (
              <Button key={r.url} href={r.url} icon={r.icon ?? 'download'} variant={i === 0 ? 'primary' : 'ghost'} download>
                {r.label}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="no-print absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink-faint md:flex"
        aria-label={ui.hero.scrollHint}
      >
        <span className="font-tiny text-[10px] tracking-[0.2em]">{ui.hero.scrollHint}</span>
        <span className="animate-bounce text-xs">▼</span>
      </a>
    </section>
  )
}

function TagRow({
  label,
  tags,
  godMode,
  delay = 0,
  dashed = false,
}: {
  label: string
  tags: ClassTag[]
  godMode: boolean
  delay?: number
  dashed?: boolean
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span
        className={`w-10 shrink-0 font-tiny text-[11px] ${dashed ? 'text-lilac-strong' : 'text-blue'}`}
      >
        {label}
      </span>
      <ul className="flex flex-1 flex-wrap gap-2.5">
        {tags.map((t, i) => (
          <motion.li
            key={t.label}
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 20, delay: (delay + i) * 0.04 }}
            whileHover={{ y: -3, rotate: i % 2 ? 2 : -2 }}
            className={dashed ? 'opacity-90' : undefined}
          >
            <Tag label={t.label} accent={godMode ? 'amber' : t.accent} />
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
