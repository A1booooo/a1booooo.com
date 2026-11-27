import { useEffect, useRef, useState } from 'react'
import { burstAt } from '../components/fx/particles'
import { profile } from '../data/profile'

/** 点击说话 + 跳一下的交互逻辑，Hero 与页脚复用 */
export function useMascotTalk() {
  const lines = profile.ui.mascot.lines
  const [line, setLine] = useState<string | null>(null)
  const [happy, setHappy] = useState(false)
  const idx = useRef(0)
  const timer = useRef(0)

  const talk = (el?: Element | null, text?: string) => {
    const next = text ?? lines[idx.current++ % lines.length]
    setLine(next)
    setHappy(true)
    if (el) burstAt(el, { count: 14, speed: 3.4, size: 5, angle: -Math.PI / 2, spread: Math.PI * 0.9 })
    window.clearTimeout(timer.current)
    window.setTimeout(() => setHappy(false), 600)
    timer.current = window.setTimeout(() => setLine(null), 3200)
  }
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return { line, happy, talk }
}
