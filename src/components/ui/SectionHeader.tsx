import type { SectionCopy } from '../../data/types'

/** 章节标题：「第 X 话」朱红标签 + 像素大标题 + 墨线 */
export function SectionHeader({ copy, align = 'left' }: { copy: SectionCopy; align?: 'left' | 'center' }) {
  return (
    <header className={`mb-12 flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : ''}`}>
      <p className="inline-flex w-fit items-center bg-red px-2.5 py-1 font-pixel text-[12px] leading-none text-white">{copy.chapter}</p>
      <h2 className="font-pixel text-[36px] leading-[1.1] text-ink md:text-[48px]">{copy.title}</h2>
      <div className={`flex w-full max-w-md items-center gap-1.5 ${align === 'center' ? 'justify-center' : ''}`} aria-hidden="true">
        <span className="h-[3px] w-24 bg-ink" />
        <span className="size-[7px] bg-red" />
        <span className="size-[5px] bg-ink" />
      </div>
      {copy.desc && <p className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">{copy.desc}</p>}
    </header>
  )
}
