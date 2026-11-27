import type { Accent } from '../../data/types'

interface TagProps {
  label: string
  accent?: Accent
  size?: 'sm' | 'md'
}

/** 参考图那种彩色描边胶囊 */
export function Tag({ label, accent = 'gray', size = 'md' }: TagProps) {
  return (
    <span
      className={`accent-${accent} inline-flex items-center rounded-full border-[1.5px] border-[var(--a-line)] bg-[var(--a-soft)] font-mono font-medium text-[var(--a-strong)] ${
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3.5 py-1 text-sm'
      }`}
    >
      {label}
    </span>
  )
}
