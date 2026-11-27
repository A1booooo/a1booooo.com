import { useMemo } from 'react'
import { PixelArt } from '../../pixel/PixelArt'
import { makeCloud } from '../../pixel/sprites'

const CLOUDS = [
  { seed: 3, top: '9%', left: '-3%', scale: 5, dur: 70, w: 34 },
  { seed: 11, top: '15%', left: '78%', scale: 5, dur: 85, w: 38 },
  { seed: 7, top: '42%', left: '64%', scale: 4, dur: 60, w: 30 },
  { seed: 21, top: '62%', left: '4%', scale: 3, dur: 75, w: 30 },
  { seed: 5, top: '82%', left: '84%', scale: 3, dur: 90, w: 28 },
]

/** 固定在内容背后的像素云层，缓慢左右漂移 */
export function SkyBackground() {
  const clouds = useMemo(() => CLOUDS.map((c) => ({ ...c, grid: makeCloud(c.seed, c.w, 13) })), [])
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1150px] overflow-hidden no-print" aria-hidden="true">
      {clouds.map((c, i) => (
        <div
          key={i}
          className="absolute opacity-90"
          style={{ top: c.top, left: c.left, animation: `drift ${c.dur}s ease-in-out ${-i * 9}s infinite alternate` }}
        >
          <PixelArt grid={c.grid} scale={c.scale} />
        </div>
      ))}
    </div>
  )
}
