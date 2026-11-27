import type { ReactNode } from 'react'

interface PanelProps {
  children: ReactNode
  className?: string
  /** 右下错位的网点阴影，像漫画格子叠在网点纸上 */
  tone?: 'ink' | 'red' | false
  as?: 'div' | 'article' | 'li' | 'aside'
}

/** 漫画分镜格：粗墨线白底，可选错位网点阴影 */
export function Panel({ children, className = '', tone = 'ink', as: Tag = 'div' }: PanelProps) {
  return (
    <Tag className="relative">
      {tone && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 translate-x-[7px] translate-y-[7px] ${tone === 'red' ? 'tone-red' : 'tone'}`}
        />
      )}
      <div className={`panel h-full ${className}`}>{children}</div>
    </Tag>
  )
}
