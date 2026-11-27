import { AnimatePresence, motion } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useTelepathy } from '../../state/telepathy-context'

/** 心灵感应开关切换时，从开关处扩散出一圈圈超能力波纹（SVG 动画半径，线宽保持不变） */
export function TelepathyRipple() {
  const { ripple } = useTelepathy()
  const reduced = usePrefersReducedMotion()
  if (reduced) return null
  const reach = Math.hypot(window.innerWidth, window.innerHeight) * 1.1
  const color = ripple?.on ? 'var(--color-neon)' : 'rgb(255 255 255 / 0.6)'
  return (
    <svg className="no-print pointer-events-none fixed inset-0 z-[80] h-full w-full drop-shadow-[0_0_6px_rgb(255_45_85/0.9)]" aria-hidden="true">
      <AnimatePresence>
        {ripple &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={`${ripple.id}-${i}`}
              cx={ripple.x}
              cy={ripple.y}
              fill="none"
              stroke={color}
              strokeWidth={4 - i}
              strokeDasharray={i === 1 ? '10 8' : undefined}
              initial={{ r: 0, opacity: 0.9 }}
              animate={{ r: reach, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.95, delay: i * 0.13, ease: [0.2, 0.6, 0.3, 1] }}
            />
          ))}
      </AnimatePresence>
    </svg>
  )
}
