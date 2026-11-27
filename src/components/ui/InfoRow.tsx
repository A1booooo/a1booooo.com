import type { IconKey } from '../../pixel/icons'
import { Icon } from './Icon'

/** 参考图式信息条：图标 + 键 + 值，首条可高亮为蓝底 */
export function InfoRow({ icon, label, value, highlight }: { icon: IconKey; label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`flex min-h-13 items-center gap-3 rounded-xl border-[1.5px] px-4 py-2.5 font-mono text-[14px] ${
        highlight
          ? 'border-blue bg-blue text-white shadow-[0_3px_0_var(--color-blue-strong)]'
          : 'border-line bg-white text-ink'
      }`}
    >
      <span
        className={`grid size-8 shrink-0 place-items-center rounded-lg ${highlight ? 'bg-white/18 text-white' : 'bg-paper text-blue'}`}
      >
        <Icon name={icon} size={18} />
      </span>
      <span className={`w-24 shrink-0 font-medium sm:w-28 ${highlight ? 'text-white/85' : 'text-ink-faint'}`}>{label}</span>
      <span className="min-w-0 font-semibold">{value}</span>
    </div>
  )
}
