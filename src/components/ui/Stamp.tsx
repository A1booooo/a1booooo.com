import { profile } from '../../data/profile'

/** 像素印章：四个字按「右列从上到下，再左列」的印章读法排布；字号取 12 的整数倍，像素字才清晰 */
export function Stamp({ size = 64, className = '' }: { size?: number; className?: string }) {
  const [a, b, c, d] = [...profile.ui.stamp]
  const step = Math.max(2, Math.round(size / 24))
  const notch = `polygon(0 ${step}px, ${step}px ${step}px, ${step}px 0, calc(100% - ${step}px) 0, calc(100% - ${step}px) ${step}px, 100% ${step}px, 100% calc(100% - ${step}px), calc(100% - ${step}px) calc(100% - ${step}px), calc(100% - ${step}px) 100%, ${step}px 100%, ${step}px calc(100% - ${step}px), 0 calc(100% - ${step}px))`
  return (
    <span
      role="img"
      aria-label={profile.ui.stamp}
      className={`inline-grid shrink-0 bg-red text-white ${className}`}
      style={{ width: size, height: size, clipPath: notch, padding: size * 0.09 }}
    >
      <span
        className="grid grid-cols-2 grid-rows-2 place-items-center border-white font-pixel leading-none"
        style={{ borderWidth: Math.max(1.5, size / 32), fontSize: 12 * Math.max(1, Math.round((size * 0.34) / 12)) }}
      >
        <span>{c}</span>
        <span>{a}</span>
        <span>{d}</span>
        <span>{b}</span>
      </span>
    </span>
  )
}
