import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import { useTelepathy } from '../../state/telepathy-context'

const { telepathy } = profile.ui

/** 心灵感应开关：打开时全站冒出内心 OS，开关本身像一根点亮的灯管 */
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
      className={`flex items-center gap-2.5 rounded-full border px-3 py-1.5 transition-[border-color,box-shadow,color] duration-300 ${
        on ? 'neon-outline text-neon-pale' : 'border-white/15 text-fg-faint hover:border-white/30 hover:text-fg-soft'
      }`}
    >
      {/* 两根小天线：开着时顶端亮红灯 */}
      <span className="relative h-4 w-4" aria-hidden="true">
        <span className="absolute bottom-0 left-[4px] h-3 w-[2px] -rotate-[18deg] bg-current" />
        <span className="absolute right-[4px] bottom-0 h-3 w-[2px] rotate-[18deg] bg-current" />
        <span className={`absolute top-0 left-0 size-[5px] rounded-full ${on ? 'animate-pulse-soft bg-neon shadow-[0_0_6px_#ff2d55]' : 'bg-current'}`} />
        <span className={`absolute top-0 right-0 size-[5px] rounded-full ${on ? 'animate-pulse-soft bg-neon shadow-[0_0_6px_#ff2d55]' : 'bg-current'}`} />
      </span>
      <span className="hidden font-pixel text-[12px] leading-none sm:inline">{telepathy.label}</span>
      <span className={`relative h-[18px] w-[34px] rounded-full transition-colors ${on ? 'bg-neon shadow-[0_0_12px_rgb(255_45_85/0.8)]' : 'bg-white/12'}`} aria-hidden="true">
        <motion.span
          className="absolute top-[3px] size-3 rounded-full bg-white"
          animate={{ left: on ? 19 : 3 }}
          transition={{ type: 'spring', stiffness: 600, damping: 30 }}
        />
      </span>
    </button>
  )
}
