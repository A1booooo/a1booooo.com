/** 原创吉祥物「Bit」：一只头顶嫩芽的像素小团子 */
const top = [
  '................',
  '....lll..lll....',
  '.....lLllLl.....',
  '.......LL.......',
  '.....kkkkkk.....',
  '...kkggggggkk...',
  '..kgwwgggggggk..',
  '.kgwwggggggggGk.',
]
const eyesOpen = ['.kggkkggggkkgGk.', '.kggkwggggkwgGk.']
const eyesClosed = ['.kgggggggggggGk.', '.kggkkggggkkgGk.']
const eyesHappy = ['.kgggkggggkggGk.', '.kggkgkggkgkgGk.']
const bottom = [
  '.kgpgggkkggpgGk.',
  '.kggggggggggGGk.',
  '..kGgggggggGGk..',
  '...kkGGGGGGkk...',
]
const feetIdle = ['....kk....kk....', '................']
const feetStep = ['...kk......kk...', '................']
const feetTuck = ['.....kk..kk.....', '................']

export const mascot = {
  idle: [...top, ...eyesOpen, ...bottom, ...feetIdle],
  blink: [...top, ...eyesClosed, ...bottom, ...feetIdle],
  step: [...top, ...eyesOpen, ...bottom, ...feetStep],
  happy: [...top, ...eyesHappy, ...bottom, ...feetTuck],
} as const

export type MascotFrame = keyof typeof mascot

/* ---------------- 程序化像素云 ---------------- */

function rng(seed: number) {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export { rng as seededRandom }

/** 生成一朵平底像素云：c 白色主体，S 底部浅蓝阴影，s 浅蓝描边 */
export function makeCloud(seed: number, width = 34, height = 13): string[] {
  const rand = rng(seed)
  const base = height - 1
  const blobs: { x: number; y: number; r: number }[] = []
  const n = 3 + Math.floor(rand() * 2)
  for (let i = 0; i < n; i++) {
    const r = 3 + rand() * (height * 0.42)
    const x = 4 + ((width - 8) * (i + 0.5)) / n + (rand() - 0.5) * 3
    blobs.push({ x, y: base - r * 0.55, r })
  }
  const filled = (x: number, y: number) =>
    y >= 0 && y <= base && x >= 0 && x < width && blobs.some((b) => (x - b.x) ** 2 + (y - b.y) ** 2 <= b.r * b.r)

  const rows: string[] = []
  for (let y = 0; y < height; y++) {
    let row = ''
    for (let x = 0; x < width; x++) {
      if (!filled(x, y)) {
        row += '.'
        continue
      }
      const edge = !filled(x - 1, y) || !filled(x + 1, y) || !filled(x, y - 1) || y === base
      if (edge) row += 's'
      else if (y >= base - 2) row += 'S'
      else row += 'c'
    }
    rows.push(row)
  }
  return rows
}
