import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { emitTelepathyChange, TelepathyContext, type Ripple } from './telepathy-context'

/**
 * 「心灵感应模式」全局状态：打开时全站显示内心 OS。
 * 默认开启，选择记在 localStorage 里。
 */
const KEY = 'a1b-telepathy'

function readStored() {
  try {
    return localStorage.getItem(KEY) !== 'off'
  } catch {
    return true
  }
}

export function TelepathyProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(readStored)
  const [ripple, setRipple] = useState<Ripple | null>(null)
  const [reaction, setReaction] = useState<'on' | 'off' | null>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    document.documentElement.dataset.telepathy = on ? 'on' : 'off'
  }, [on])
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next = !on
      setOn(next)
      try {
        localStorage.setItem(KEY, next ? 'on' : 'off')
      } catch {
        /* 隐私模式下写不了就算了 */
      }
      const o = origin ?? { x: window.innerWidth - 80, y: 40 }
      setRipple({ id: Date.now(), x: o.x, y: o.y, on: next })
      setReaction(next ? 'on' : 'off')
      emitTelepathyChange(next)
      timers.current.forEach((t) => window.clearTimeout(t))
      timers.current = [window.setTimeout(() => setRipple(null), 1200), window.setTimeout(() => setReaction(null), 1600)]
    },
    [on],
  )

  const value = useMemo(() => ({ on, toggle, ripple, reaction }), [on, toggle, ripple, reaction])
  return <TelepathyContext.Provider value={value}>{children}</TelepathyContext.Provider>
}
