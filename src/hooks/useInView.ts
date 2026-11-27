import { useEffect, useState, type RefObject } from 'react'

/** 元素首次进入视口后返回 true（只触发一次） */
export function useInView(ref: RefObject<Element | null>, rootMargin = '0px 0px -12% 0px') {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin, inView])
  return inView
}
