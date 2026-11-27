import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import type { Os } from '../../data/types'
import { useTelepathy } from '../../state/telepathy-context'

interface OsBubbleProps {
  text?: Os
  className?: string
  /** 气泡尾巴（两颗小圆点）朝哪边 */
  tail?: 'left' | 'right'
}

/** 内心 OS 思考气泡：心灵感应模式打开时才冒出来 */
export function OsBubble({ text, className = '', tail = 'left' }: OsBubbleProps) {
  const { on } = useTelepathy()
  // 每个气泡的倾斜角和出场延迟略有不同，看起来更像手写贴上去的
  const [jitter] = useState(() => ({ rotate: (Math.random() - 0.5) * 2.4, delay: Math.random() * 0.35 }))

  return (
    <AnimatePresence initial={false}>
      {on && text && (
        <motion.div
          initial={{ opacity: 0, height: 0, scale: 0.7 }}
          animate={{ opacity: 1, height: 'auto', scale: 1 }}
          exit={{ opacity: 0, height: 0, scale: 0.7 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26, delay: jitter.delay }}
          className={`${tail === 'left' ? 'origin-top-left' : 'origin-top-right'} ${className}`}
        >
          <div className={`relative pt-4 ${tail === 'right' ? 'text-right' : ''}`}>
            <span
              aria-hidden="true"
              className={`absolute top-0 size-2 rounded-full border-2 border-ink bg-card ${tail === 'left' ? 'left-4' : 'right-4'}`}
            />
            <span
              aria-hidden="true"
              className={`absolute top-[7px] size-3 rounded-full border-2 border-ink bg-card ${tail === 'left' ? 'left-6' : 'right-6'}`}
            />
            <p className="os-bubble text-left" style={{ rotate: `${jitter.rotate}deg` }}>
              {text}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
