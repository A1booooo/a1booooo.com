/** 极简像素粒子事件总线：任何组件调用 burst()，由 <ParticleLayer/> 统一绘制 */
export interface BurstOptions {
  x: number
  y: number
  colors?: string[]
  count?: number
  /** 初速度大小 */
  speed?: number
  /** 发射方向（弧度），不传则 360° */
  angle?: number
  /** 发射张角（弧度） */
  spread?: number
  gravity?: number
  size?: number
  /** 存活帧数 */
  life?: number
}

type Listener = (o: BurstOptions) => void
const listeners = new Set<Listener>()

export function burst(o: BurstOptions) {
  listeners.forEach((l) => l(o))
}

export function onBurst(l: Listener) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}

export const PARTY_COLORS = ['#e0452b', '#1c1917', '#f4b6a6', '#b8321c', '#ffffff']

/** 在元素中心爆发 */
export function burstAt(el: Element, o: Partial<BurstOptions> = {}) {
  const r = el.getBoundingClientRect()
  burst({ x: r.left + r.width / 2, y: r.top + r.height / 2, ...o })
}

/* ---------------- Toast ---------------- */
type ToastListener = (msg: string) => void
const toastListeners = new Set<ToastListener>()
export function toast(msg: string) {
  toastListeners.forEach((l) => l(msg))
}
export function onToast(l: ToastListener) {
  toastListeners.add(l)
  return () => {
    toastListeners.delete(l)
  }
}
