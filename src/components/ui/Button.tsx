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

/** 按钮：主按钮是发光的霓虹块，次按钮是细线 */
export function Button({ children, href, onClick, variant = 'primary', icon, download, external, className = '' }: ButtonProps) {
  const base =
    'group inline-flex select-none items-center gap-2 rounded-xl px-4.5 py-2.5 text-[15px] font-semibold transition-[box-shadow,transform,background-color,border-color] duration-200 hover:-translate-y-0.5 active:translate-y-0'
  const styles =
    variant === 'primary'
      ? 'bg-neon text-white shadow-[0_0_18px_-2px_rgb(255_45_85/0.75)] hover:shadow-[0_0_28px_0_rgb(255_45_85/0.85)]'
      : 'border border-white/15 bg-white/[0.03] text-fg hover:border-neon/70 hover:text-neon-pale hover:shadow-[0_0_18px_-4px_rgb(255_45_85/0.6)]'
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
