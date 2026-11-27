import { useEffect, useState } from 'react'

/** 打字机轮播：逐字打出 → 停留 → 逐字删除 → 下一句 */
export function useTypewriter(lines: readonly string[], enabled = true) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(enabled ? '' : lines[0] ?? '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!enabled || lines.length === 0) return
    const full = lines[index % lines.length]
    let delay = deleting ? 28 : 70
    if (!deleting && text === full) delay = 2200
    if (deleting && text === '') delay = 300

    const t = window.setTimeout(() => {
      if (!deleting && text === full) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % lines.length)
      } else {
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1))
      }
    }, delay)
    return () => window.clearTimeout(t)
  }, [text, deleting, index, lines, enabled])

  return enabled ? text : (lines[0] ?? '')
}
