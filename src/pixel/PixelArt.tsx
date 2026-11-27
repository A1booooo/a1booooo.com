import { memo, useMemo } from 'react'

interface PixelArtProps {
  /** 每行一个字符串，每个字符是一个像素，'.' 透明 */
  grid: readonly string[]
  /** 单个像素的显示尺寸（px） */
  scale?: number
  palette: Record<string, string>
  className?: string
  title?: string
}

/** 把字符矩阵渲染成 SVG；同色相邻像素合并成一条 rect，减少节点数量 */
export const PixelArt = memo(function PixelArt({
  grid,
  scale = 4,
  palette,
  className,
  title,
}: PixelArtProps) {
  const width = Math.max(...grid.map((r) => r.length))
  const height = grid.length

  const rects = useMemo(() => {
    const out: { x: number; y: number; w: number; fill: string }[] = []
    grid.forEach((row, y) => {
      let x = 0
      while (x < row.length) {
        const ch = row[x]
        if (ch === '.' || ch === ' ' || !palette[ch]) {
          x++
          continue
        }
        let run = 1
        while (row[x + run] === ch) run++
        out.push({ x, y, w: run, fill: palette[ch] })
        x += run
      }
    })
    return out
  }, [grid, palette])

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      className={className}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  )
})
