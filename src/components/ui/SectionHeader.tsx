import type { SectionCopy } from '../../data/types'

export function SectionHeader({ copy, align = 'left' }: { copy: SectionCopy; align?: 'left' | 'center' }) {
  return (
    <header className={`mb-10 flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : ''}`}>
      <p className="eyebrow flex items-center gap-2 text-blue">
        <span className="animate-blink" aria-hidden="true">▶</span>
        {copy.eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">{copy.title}</h2>
      <PixelDivider />
      {copy.desc && <p className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">{copy.desc}</p>}
    </header>
  )
}

/** 一排渐变的小像素方块，当作标题下划线 */
export function PixelDivider() {
  const colors = ['bg-blue', 'bg-sky', 'bg-mint', 'bg-amber', 'bg-coral', 'bg-lilac']
  return (
    <div className="flex gap-1" aria-hidden="true">
      {colors.map((c, i) => (
        <span key={c} className={`size-1.5 ${c}`} style={{ opacity: 1 - i * 0.1 }} />
      ))}
    </div>
  )
}
