import { createContext, useContext } from 'react'

export interface Ripple {
  id: number
  x: number
  y: number
  on: boolean
}

export interface TelepathyState {
  on: boolean
  toggle: (origin?: { x: number; y: number }) => void
  /** 正在播放的波纹转场 */
  ripple: Ripple | null
  /** 刚切换时相棒的反应，1.6 秒后清空 */
  reaction: 'on' | 'off' | null
}

export const TelepathyContext = createContext<TelepathyState | null>(null)

export function useTelepathy() {
  const v = useContext(TelepathyContext)
  if (!v) throw new Error('useTelepathy 必须在 <TelepathyProvider> 里使用')
  return v
}

/* 开关切换事件：相棒订阅它来说话 */
type Listener = (on: boolean) => void
const listeners = new Set<Listener>()
export function onTelepathyChange(l: Listener) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}
export function emitTelepathyChange(on: boolean) {
  listeners.forEach((l) => l(on))
}
