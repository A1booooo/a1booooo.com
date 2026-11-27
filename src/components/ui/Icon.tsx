import { icons, type IconKey } from '../../pixel/icons'

interface IconProps {
  name: IconKey
  size?: number
  className?: string
}

export function Icon({ name, size = 20, className }: IconProps) {
  const Cmp = icons[name]
  return (
    <Cmp
      width={size}
      height={size}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    />
  )
}
