import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/profile'
import { useAiboTalk } from '../../hooks/useAiboTalk'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { aibo, aiboPalette, type AiboFrame } from '../../pixel/aibo'
import { PixelArt } from '../../pixel/PixelArt'
import { useTelepathy } from '../../state/telepathy-context'

const { ui } = profile

/** 相棒立绘：自动眨眼；心灵感应开着时抑制器常亮 */
export function AiboSprite({ scale = 4, frame, className }: { scale?: number; frame?: AiboFrame; className?: string }) {
  const { on } = useTelepathy()
  const [blink, setBlink] = useState(false)
  useEffect(() => {
    let t = 0
    let t2 = 0
    const loop = () => {
      t = window.setTimeout(() => {
        setBlink(true)
        t2 = window.setTimeout(() => setBlink(false), 140)
        loop()
      }, 2400 + Math.random() * 2600)
    }
    loop()
    return () => {
      window.clearTimeout(t)
      window.clearTimeout(t2)
    }
  }, [])
  const f: AiboFrame = frame ?? (on ? (blink ? 'readBlink' : 'read') : blink ? 'blink' : 'idle')
  return (
    <PixelArt
      grid={aibo[f]}
      palette={aiboPalette}
      scale={scale}
      className={`transition-[filter] duration-500 ${on ? 'drop-shadow-[0_0_14px_rgb(255_45_85/0.55)]' : ''} ${className ?? ''}`}
      title={ui.aibo.name}
    />
  )
}

/** 漫画对白框 */
export function SpeechBalloon({ text, side = 'top' }: { text: string | null; side?: 'top' | 'left' }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 8, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 520, damping: 24 }}
          role="status"
          className={`neon-outline pointer-events-none absolute z-20 w-max max-w-[240px] rounded-2xl bg-surface px-3.5 py-2 text-[14px] leading-snug font-medium text-fg ${
            side === 'top' ? 'bottom-full left-1/2 mb-4 -translate-x-1/2' : 'top-6 right-full mr-3'
          }`}
        >
          {text}
          <span
            aria-hidden="true"
            className={`absolute size-3 rotate-45 border-neon bg-surface ${
              side === 'top' ? '-bottom-[7.5px] left-1/2 -translate-x-1/2 border-r-[1.5px] border-b-[1.5px]' : '-right-[7.5px] top-4 border-t-[1.5px] border-r-[1.5px]'
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function pickFrame(s: ReturnType<typeof useAiboTalk>): AiboFrame | undefined {
  if (s.jelly) return 'jelly'
  if (s.reaction === 'off') return 'serious'
  if (s.reaction === 'on') return 'read'
  if (s.talking) return 'deadpan'
  return undefined
}

/** 封面上的大相棒 */
export function CoverAibo({ scale = 8 }: { scale?: number }) {
  const talk = useAiboTalk()
  const btn = useRef<HTMLButtonElement>(null)
  return (
    <div className="relative">
      <SpeechBalloon text={talk.line} />
      <motion.button
        ref={btn}
        type="button"
        onClick={() => talk.poke(btn.current)}
        aria-label={`${ui.aibo.name} · ${ui.aibo.hint}`}
        animate={talk.jelly ? { y: [0, -20, 0], rotate: [0, -3, 3, 0] } : { y: 0 }}
        transition={{ duration: 0.5 }}
        whileTap={{ scale: 0.96 }}
        className="block cursor-pointer"
      >
        <AiboSprite scale={scale} frame={pickFrame(talk)} />
      </motion.button>
    </div>
  )
}

/** 页脚：在墨线上来回散步的相棒 */
export function WalkingAibo() {
  const reduced = usePrefersReducedMotion()
  const wrap = useRef<HTMLDivElement>(null)
  const btn = useRef<HTMLButtonElement>(null)
  const [x, setX] = useState(0.3)
  const [dir, setDir] = useState(1)
  const [hop, setHop] = useState(false)
  const talk = useAiboTalk()

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
        pos += (d * dt * 0.03) / w
        if (pos > 0.78 || pos < 0.08) {
          d = -d
          setDir(d)
          pause = 900 + Math.random() * 1600
        }
        acc += dt
        if (acc > 200) {
          acc = 0
          setHop((h) => !h)
        }
        setX(pos)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-x-0 bottom-0 h-0">
      <div className="absolute bottom-0" style={{ left: `${x * 100}%`, transform: `translateY(${hop && !reduced ? -2 : 0}px)` }}>
        <SpeechBalloon text={talk.line} />
        <button
          ref={btn}
          type="button"
          aria-label={`${ui.aibo.name} · ${ui.aibo.hint}`}
          onClick={() => talk.poke(btn.current)}
          className="pointer-events-auto block cursor-pointer"
        >
          <span className="block" style={{ transform: `scaleX(${dir})` }}>
            <AiboSprite scale={3} frame={pickFrame(talk)} />
          </span>
        </button>
      </div>
    </div>
  )
}
