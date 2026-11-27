/** 标签：墨线描边方块；red 用于强调 */
export function Tag({ label, tone = 'ink', size = 'md' }: { label: string; tone?: 'ink' | 'red' | 'soft'; size?: 'sm' | 'md' }) {
  const styles = {
    ink: 'border-ink bg-card text-ink',
    red: 'border-red bg-red-soft text-red-strong',
    soft: 'border-line bg-paper text-ink-soft',
  }[tone]
  return (
    <span
      className={`inline-flex items-center border-[1.5px] font-mono font-medium ${styles} ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}
    >
      {label}
    </span>
  )
}
