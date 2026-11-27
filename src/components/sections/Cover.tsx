import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useTypewriter } from '../../hooks/useTypewriter'
import { CoverAibo } from '../layout/Aibo'
import { OsBubble } from '../ui/OsBubble'
import { VitalBar } from '../ui/PixelBar'
import { Stamp } from '../ui/Stamp'

const { character: ch, ui } = profile

/** 封面：漫画单行本封面式 */
export function Cover() {
  const reduced = usePrefersReducedMotion()
  const typed = useTypewriter(ch.taglines, !reduced)

  return (
    <section id="cover" className="relative mx-auto max-w-6xl px-5 pt-24 pb-6 md:pt-28" aria-label={ui.sections.cover.title}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        className="relative"
      >
        {/* 错位网点：像封面叠在网点纸上 */}
        <span aria-hidden="true" className="tone absolute inset-0 translate-x-[10px] translate-y-[10px]" />
        <div className="panel relative overflow-hidden border-[3px]">
          <div aria-hidden="true" className="speed-lines pointer-events-none absolute inset-0" />
          {/* 封面顶栏 */}
          <div className="relative flex items-center justify-between border-b-[3px] border-ink bg-ink px-4 py-2 text-white md:px-6">
            <span className="font-pixel text-[12px] leading-none tracking-wide">{ui.brand}</span>
            <span className="font-tiny text-[10px] tracking-[0.2em] text-white/70">VOL.01 · {ui.sections.cover.chapter}</span>
          </div>

          <div className="relative grid grid-cols-[minmax(0,1fr)] gap-10 px-4 py-8 sm:px-5 md:px-10 md:py-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-6">
            {/* 左：书名 */}
            <div className="flex flex-col">
              <p className="eyebrow mb-4 text-ink-soft">{ui.cover.hello}</p>
              <h1 className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="font-pixel text-[72px] leading-none text-ink sm:text-[84px] md:text-[96px]">{ch.name}</span>
                <motion.span
                  initial={{ scale: 2.2, opacity: 0, rotate: -18 }}
                  animate={{ scale: 1, opacity: 1, rotate: -6 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 0.5 }}
                  className="inline-block"
                >
                  <Stamp size={76} />
                </motion.span>
              </h1>
              <p className="mt-3 font-tiny text-[12px] tracking-[0.18em] text-ink-faint">{ch.nameEn}</p>
              <p className="mt-6 inline-flex w-fit items-center gap-2 border-[2.5px] border-ink bg-red px-3 py-1.5 font-pixel text-[18px] leading-none text-white md:text-[18px]">
                {ch.role}
              </p>
              <p className="mt-6 min-h-[1.75em] font-mono text-[15px] text-ink md:text-base" aria-label={ch.taglines[0]}>
                <span aria-hidden="true">
                  <span className="text-red">&gt; </span>
                  {typed}
                  <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[3px] animate-blink bg-red" />
                </span>
              </p>
              <OsBubble text={ch.coverOs} className="max-w-md" />

              {/* 角色介绍栏 */}
              <div className="mt-8 w-full max-w-sm border-[2.5px] border-ink bg-card p-3.5">
                <p className="mb-2.5 font-pixel text-[12px] leading-none text-ink-soft">{ui.cover.vitalsTitle}</p>
                <ul className="space-y-2.5">
                  {ch.vitals.map((v) => (
                    <li key={v.key} className="grid grid-cols-[2.25rem_1fr] items-center gap-x-2 gap-y-1">
                      <span className="font-tiny text-[11px] text-red-strong">{v.key}</span>
                      <VitalBar value={v.value} max={v.max} />
                      <span />
                      <span className="text-xs text-ink-soft">
                        {v.label} {v.value}/{v.max} · {v.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 右：相棒 */}
            <div className="relative flex min-h-[340px] items-end justify-center lg:min-h-0">
              <div aria-hidden="true" className="tone-red absolute bottom-6 left-1/2 size-[260px] -translate-x-1/2 rounded-full md:size-[300px]" />
              <div className="relative mb-2 animate-float">
                <CoverAibo scale={6} />
              </div>
              <div aria-hidden="true" className="absolute inset-x-6 bottom-0 h-[3px] bg-ink" />
            </div>
          </div>

          {/* 目录：用墨色底 + 2.5px 间隙画出格线 */}
          <nav className="relative grid grid-cols-2 gap-[2.5px] border-t-[3px] border-ink bg-ink sm:grid-cols-3 lg:grid-cols-6" aria-label={ui.cover.tocLabel}>
            {ui.nav.slice(1).map((n) => (
              <a key={n.id} href={`#${n.id}`} className="group flex items-baseline gap-2 bg-card px-4 py-3 transition-colors hover:bg-ink hover:text-white">
                <span className="font-pixel text-[12px] text-red group-hover:text-white/80">{n.no}</span>
                <span className="font-pixel text-[12px] leading-none">{ui.sections[n.id].title}</span>
              </a>
            ))}
          </nav>
        </div>
      </motion.div>

      <a
        href="#profile"
        className="no-print mt-8 hidden flex-col items-center gap-1 text-ink-faint md:flex"
        aria-label={ui.cover.scrollHint}
      >
        <span className="font-pixel text-[12px]">{ui.cover.scrollHint}</span>
        <span className="animate-bounce text-xs">▼</span>
      </a>
    </section>
  )
}
