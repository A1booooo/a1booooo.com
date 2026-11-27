import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useTypewriter } from '../../hooks/useTypewriter'
import { CoverAibo } from '../layout/Aibo'
import { OsBubble } from '../ui/OsBubble'
import { VitalBar } from '../ui/PixelBar'
import { Stamp } from '../ui/Stamp'

const { character: ch, ui } = profile

/** 封面 */
export function Cover() {
  const reduced = usePrefersReducedMotion()
  const typed = useTypewriter(ch.taglines, !reduced)

  return (
    <section id="cover" className="relative mx-auto max-w-6xl px-5 pt-28 pb-10 md:pt-36" aria-label={ui.sections.cover.title}>
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-6">
        {/* 左：名字与介绍 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          className="flex flex-col"
        >
          <p className="eyebrow mb-5 text-fg-faint">{ui.cover.hello}</p>
          <h1 className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <span className="glow-soft font-pixel text-[72px] leading-none text-fg sm:text-[84px] md:text-[96px]">{ch.name}</span>
            <motion.span
              initial={{ scale: 2.2, opacity: 0, rotate: -18 }}
              animate={{ scale: 1, opacity: 1, rotate: -6 }}
              transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 0.5 }}
              className="inline-block"
            >
              <Stamp size={76} />
            </motion.span>
          </h1>
          <p className="mt-4 font-tiny text-[12px] tracking-[0.2em] text-fg-faint">{ch.nameEn}</p>

          <p className="neon-outline mt-7 inline-flex w-fit items-center rounded-lg px-3.5 py-2 font-pixel text-[18px] leading-none text-neon-pale md:text-[24px]">
            {ch.role}
          </p>

          <p className="mt-7 min-h-[1.75em] font-mono text-[15px] text-fg md:text-base" aria-label={ch.taglines[0]}>
            <span aria-hidden="true">
              <span className="glow-text">&gt; </span>
              {typed}
              <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[3px] animate-blink bg-neon shadow-[0_0_8px_#ff2d55]" />
            </span>
          </p>
          <OsBubble text={ch.coverOs} className="max-w-lg" />

          {/* 角色介绍：原来那种像素条 */}
          <div className="mt-9 w-full max-w-sm">
            <p className="mb-3 font-pixel text-[12px] leading-none text-fg-faint">{ui.cover.vitalsTitle}</p>
            <ul className="space-y-3">
              {ch.vitals.map((v) => (
                <li key={v.key}>
                  <div className="mb-1.5 flex items-center gap-2 text-[13px]">
                    <span className="w-7 font-tiny text-[11px] text-neon-hi">{v.key}</span>
                    <span className="font-medium text-fg">{v.label}</span>
                    <span className="ml-auto font-mono text-xs text-fg-faint">
                      {v.value}/{v.max}
                    </span>
                  </div>
                  <VitalBar value={v.value} max={v.max} />
                  <p className="mt-1 text-xs text-fg-faint">{v.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 右：相棒 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 18, delay: 0.15 }}
          className="relative flex min-h-[340px] items-end justify-center pb-6"
        >
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 size-[320px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_45_85/0.35),transparent_65%)] blur-md"
          />
          <div className="relative animate-float">
            <CoverAibo scale={10} />
          </div>
          <div aria-hidden="true" className="absolute inset-x-10 bottom-0 h-[2px] rounded-full bg-neon shadow-[0_0_14px_2px_rgb(255_45_85/0.7)]" />
        </motion.div>
      </div>

      {/* 目录 */}
      <nav className="mt-16 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-6" aria-label={ui.cover.tocLabel}>
        {ui.nav.slice(1).map((n) => (
          <a key={n.id} href={`#${n.id}`} className="group flex items-baseline gap-2 font-pixel text-[12px] leading-none">
            <span className="text-neon-hi/80 transition-colors group-hover:text-neon-pale">{n.no}</span>
            <span className="text-fg-soft transition-colors group-hover:text-fg">{ui.sections[n.id].title}</span>
          </a>
        ))}
      </nav>
    </section>
  )
}
