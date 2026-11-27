import type { ReactNode } from 'react'
import type { IconKey } from '../../pixel/icons'
import { Icon } from './Icon'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  variant?: 'primary' | 'ghost'
  icon?: IconKey
  download?: boolean
  external?: boolean
  className?: string
}

/** 漫画按钮：粗墨线 + 错位墨块，按下时贴合 */
export function Button({ children, href, onClick, variant = 'primary', icon, download, external, className = '' }: ButtonProps) {
  const base =
    'group inline-flex select-none items-center gap-2 border-[2.5px] border-ink px-4 py-2 text-[15px] font-semibold shadow-[4px_4px_0_var(--color-ink)] transition-[transform,box-shadow] duration-100 hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_var(--color-ink)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_var(--color-ink)]'
  const styles = variant === 'primary' ? 'bg-red text-white' : 'bg-card text-ink'
  const content = (
    <>
      {icon && <Icon name={icon} size={18} />}
      {children}
    </>
  )
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`${base} ${styles} ${className}`}
        {...(download ? { download: '' } : {})}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} ${className}`}>
      {content}
    </button>
  )
}
