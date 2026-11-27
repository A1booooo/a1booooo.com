import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import type { Os } from '../../data/types'
import { useTelepathy } from '../../state/telepathy-context'

/** 内心 OS：心灵感应模式打开时，在内容下方冒出一行发光的心声 */
export function OsBubble({ text, className = '' }: { text?: Os; className?: string }) {
  const { on } = useTelepathy()
  // 每条心声的出场延迟略有不同，像一句句被读出来
  const [delay] = useState(() => Math.random() * 0.35)

  return (
    <AnimatePresence initial={false}>
      {on && text && (
        <motion.div
          initial={{ opacity: 0, height: 0, x: -8 }}
          animate={{ opacity: 1, height: 'auto', x: 0 }}
          exit={{ opacity: 0, height: 0, x: -8 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30, delay }}
          className={className}
        >
          <p className="flex items-start gap-2 pt-2.5">
            <span
              aria-hidden="true"
              className="neon-outline mt-[3px] shrink-0 rounded-[4px] px-1 py-[3px] font-tiny text-[9px] leading-none text-neon-pale"
            >
              OS
            </span>
            <span className="font-os text-[15px] leading-relaxed text-neon-pale">{text}</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
