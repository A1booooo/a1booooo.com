import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import { useTelepathy } from '../../state/telepathy-context'

const { telepathy } = profile.ui

/** 心灵感应开关：打开时全站冒出内心 OS */
export function TelepathyToggle() {
  const { on, toggle } = useTelepathy()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={telepathy.aria}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
      }}
      className={`group flex items-center gap-2 border-[2.5px] border-ink px-2.5 py-1.5 transition-colors ${on ? 'bg-ink text-white' : 'bg-card text-ink'}`}
    >
      {/* 小天线：开着时发红光 */}
      <span className="relative flex h-4 w-4 items-end justify-center" aria-hidden="true">
        <span className={`absolute bottom-0 left-[3px] h-3 w-[3px] -rotate-[20deg] ${on ? 'bg-white' : 'bg-ink'}`} />
        <span className={`absolute right-[3px] bottom-0 h-3 w-[3px] rotate-[20deg] ${on ? 'bg-white' : 'bg-ink'}`} />
        <span className={`absolute -top-0.5 left-0 size-[6px] ${on ? 'animate-pulse-soft bg-red' : 'bg-ink'}`} />
        <span className={`absolute -top-0.5 right-0 size-[6px] ${on ? 'animate-pulse-soft bg-red' : 'bg-ink'}`} />
      </span>
      <span className="hidden font-pixel text-[12px] leading-none sm:inline">{telepathy.label}</span>
      <span className={`relative h-4 w-8 border-2 ${on ? 'border-white bg-red' : 'border-ink bg-paper-2'}`} aria-hidden="true">
        <motion.span
          className={`absolute top-[1px] size-2.5 ${on ? 'bg-white' : 'bg-ink'}`}
          animate={{ left: on ? 17 : 1 }}
          transition={{ type: 'spring', stiffness: 600, damping: 30 }}
        />
      </span>
      <span className="w-6 text-left font-tiny text-[10px] leading-none">{on ? telepathy.on : telepathy.off}</span>
    </button>
  )
}
