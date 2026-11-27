import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/profile'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { PixelArt } from '../../pixel/PixelArt'
import { mascot, type MascotFrame } from '../../pixel/sprites'
import { useMascotTalk } from '../../hooks/useMascotTalk'

/** 自动眨眼；外部可传入 override 帧（走路 / 开心） */
export function MascotSprite({ scale = 6, frame, className }: { scale?: number; frame?: MascotFrame; className?: string }) {
  const [blink, setBlink] = useState(false)
  useEffect(() => {
    let t = 0
    const loop = () => {
      t = window.setTimeout(() => {
        setBlink(true)
        window.setTimeout(() => setBlink(false), 140)
        loop()
      }, 2400 + Math.random() * 2600)
    }
    loop()
    return () => window.clearTimeout(t)
  }, [])
  const f: MascotFrame = frame ?? (blink ? 'blink' : 'idle')
  return <PixelArt grid={mascot[f]} scale={scale} className={className} title={profile.ui.mascot.name} />
}

export function SpeechBubble({ text, side = 'top' }: { text: string | null; side?: 'top' | 'right' }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 8, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 520, damping: 24 }}
          className={`pointer-events-none absolute z-20 w-max max-w-[230px] rounded-xl border border-line bg-white px-3 py-2 text-[13px] leading-snug text-ink shadow-[var(--shadow-lift)] ${
            side === 'top' ? 'bottom-full left-1/2 mb-3 -translate-x-1/2' : 'left-full top-2 ml-3'
          }`}
        >
          {text}
          <span
            className={`absolute size-2.5 rotate-45 border-line bg-white ${
              side === 'top' ? '-bottom-[6px] left-1/2 -translate-x-1/2 border-r border-b' : '-left-[6px] top-3 border-b border-l'
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** 页脚：在草地上来回散步的 Bit */
export function WalkingMascot({ ground }: { ground: number }) {
  const reduced = usePrefersReducedMotion()
  const wrap = useRef<HTMLDivElement>(null)
  const sprite = useRef<HTMLButtonElement>(null)
  const [x, setX] = useState(0.3)
  const [dir, setDir] = useState(1)
  const [step, setStep] = useState(false)
  const { line, happy, talk } = useMascotTalk()

  useEffect(() => {
    if (reduced) return
    let raf = 0
    let last = performance.now()
    let acc = 0
    let pause = 0
    let pos = 0.3
    let d = 1
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50)
      last = now
      if (pause > 0) {
        pause -= dt
      } else {
        const w = wrap.current?.clientWidth ?? 1000
        pos += (d * dt * 0.035) / w
        if (pos > 0.7 || pos < 0.12) {
          d = -d
          setDir(d)
          pause = 900 + Math.random() * 1600
        }
        acc += dt
        if (acc > 170) {
          acc = 0
          setStep((s) => !s)
        }
        setX(pos)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  const frame: MascotFrame = happy ? 'happy' : step ? 'step' : 'idle'

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-x-0" style={{ bottom: ground }}>
      <div className="absolute bottom-0" style={{ left: `${x * 100}%` }}>
        <SpeechBubble text={line} />
        <motion.button
          ref={sprite}
          type="button"
          aria-label={profile.ui.mascot.name}
          onClick={() => talk(sprite.current)}
          animate={happy ? { y: [0, -18, 0] } : { y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="pointer-events-auto block cursor-pointer"
        >
          <span className="block" style={{ transform: `scaleX(${dir})` }}>
            <MascotSprite scale={4} frame={reduced ? undefined : frame} />
          </span>
        </motion.button>
      </div>
    </div>
  )
}
