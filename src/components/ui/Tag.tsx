/** 标签：暗色胶囊；neon 用于强调 */
export function Tag({ label, tone = 'plain', size = 'md' }: { label: string; tone?: 'plain' | 'neon'; size?: 'sm' | 'md' }) {
  const styles = tone === 'neon' ? 'border-neon/60 bg-neon-dim text-neon-pale' : 'border-line bg-white/[0.04] text-fg-soft'
  return (
    <span className={`inline-flex items-center rounded-full border font-mono ${styles} ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-[13px]'}`}>
      {label}
    </span>
  )
}
