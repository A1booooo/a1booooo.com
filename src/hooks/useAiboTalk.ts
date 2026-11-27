import { useCallback, useEffect, useRef, useState } from 'react'
import { burstAt } from '../components/fx/particles'
import { profile } from '../data/profile'
import { onTelepathyChange, useTelepathy } from '../state/telepathy-context'

const JELLY_CLICKS = 5
const CLICK_GAP = 1400

/**
 * 相棒的说话逻辑（封面与页脚复用）：
 * - 点一下：面瘫吐槽一句
 * - 连点 5 次：掏出咖啡果冻
 * - 心灵感应开关切换时：说一句对应的话
 */
export function useAiboTalk() {
  const { aibo, telepathy } = profile.ui
  const { reaction } = useTelepathy()
  const [line, setLine] = useState<string | null>(null)
  const [talking, setTalking] = useState(false)
  const [jelly, setJelly] = useState(false)
  const idx = useRef(0)
  const clicks = useRef({ n: 0, last: 0 })
  const timers = useRef<number[]>([])

  // 只用到 setter 和 ref，所以可以保持引用稳定
  const say = useCallback((text: string, ms = 3200) => {
    timers.current.forEach((t) => window.clearTimeout(t))
    setLine(text)
    setTalking(true)
    timers.current = [window.setTimeout(() => setTalking(false), 900), window.setTimeout(() => setLine(null), ms)]
  }, [])

  // 订阅开关切换事件（而不是在 effect 里根据 reaction 同步 setState）
  useEffect(() => onTelepathyChange((on) => say(on ? telepathy.onLine : telepathy.offLine, 2200)), [say, telepathy])
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  const poke = (el?: Element | null) => {
    const now = performance.now()
    const c = clicks.current
    c.n = now - c.last < CLICK_GAP ? c.n + 1 : 1
    c.last = now
    if (c.n >= JELLY_CLICKS) {
      c.n = 0
      setJelly(true)
      say(aibo.jellyLine, 4200)
      window.setTimeout(() => setJelly(false), 4200)
      if (el) burstAt(el, { count: 28, speed: 4.2, size: 5 })
      return
    }
    say(aibo.lines[idx.current++ % aibo.lines.length])
    if (el) burstAt(el, { count: 10, speed: 3, size: 4, angle: -Math.PI / 2, spread: Math.PI * 0.9 })
  }

  return { line, talking, jelly, reaction, poke }
}
