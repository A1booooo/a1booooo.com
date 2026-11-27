import { useEffect, useRef } from 'react'

const SEQ = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function useKonami(onUnlock: () => void) {
  const cb = useRef(onUnlock)
  useEffect(() => {
    cb.current = onUnlock
  })
  useEffect(() => {
    let i = 0
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      i = key === SEQ[i] ? i + 1 : key === SEQ[0] ? 1 : 0
      if (i === SEQ.length) {
        i = 0
        cb.current()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
