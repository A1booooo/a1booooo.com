import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/** 进入视口时轻微上浮淡入 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ type: 'spring', stiffness: 140, damping: 20, delay }}
    >
      {children}
    </motion.div>
  )
}
