import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { onToast } from './particles'

export function ToastHost() {
  const [msg, setMsg] = useState<{ id: number; text: string } | null>(null)
  useEffect(() => {
    let timer = 0
    const off = onToast((text) => {
      setMsg({ id: Date.now(), text })
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setMsg(null), 2400)
    })
    return () => {
      off()
      window.clearTimeout(timer)
    }
  }, [])
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center md:bottom-8" role="status" aria-live="polite">
      <AnimatePresence>
        {msg && (
          <motion.div
            key={msg.id}
            initial={{ y: 16, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 8, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            className="pixel-notch bg-ink px-4 py-2.5 font-mono text-sm text-white"
          >
            {msg.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
