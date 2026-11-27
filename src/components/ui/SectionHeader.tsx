import type { SectionCopy } from '../../data/types'

/** 章节标题：发光的「第 X 话」+ 像素大标题 + 一截霓虹线 */
export function SectionHeader({ copy, align = 'left' }: { copy: SectionCopy; align?: 'left' | 'center' }) {
  return (
    <header className={`mb-12 flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : ''}`}>
      <p className="glow-text animate-flicker font-pixel text-[18px] leading-none">{copy.chapter}</p>
      <h2 className="font-pixel text-[36px] leading-[1.1] text-fg md:text-[48px]">{copy.title}</h2>
      <span aria-hidden="true" className="h-[3px] w-20 rounded-full bg-neon shadow-[0_0_10px_rgb(255_45_85/0.9)]" />
      {copy.desc && <p className="max-w-2xl text-[15px] leading-relaxed text-fg-soft">{copy.desc}</p>}
    </header>
  )
}
