import { motion } from 'motion/react'
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

/**
 * 游戏按钮：底部一条同色系「台阶」阴影，按下时下沉。
 * 阴影使用主题色而非纯黑，避免新粗野主义的硬黑阴影。
 */
export function Button({ children, href, onClick, variant = 'primary', icon, download, external, className = '' }: ButtonProps) {
  const base =
    'group inline-flex select-none items-center gap-2 rounded-xl px-4.5 py-2.5 text-[15px] font-semibold transition-[box-shadow,transform] duration-150 active:translate-y-[3px]'
  const styles =
    variant === 'primary'
      ? 'bg-blue text-white shadow-[0_4px_0_var(--color-blue-strong)] hover:brightness-105 active:shadow-[0_1px_0_var(--color-blue-strong)]'
      : 'border border-line-strong bg-white text-ink shadow-[0_4px_0_var(--color-line)] hover:border-blue-line hover:text-blue-strong active:shadow-[0_1px_0_var(--color-line)]'
  const content = (
    <>
      {icon && <Icon name={icon} size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5" />}
      {children}
    </>
  )
  const motionProps = { whileHover: { y: -2 }, transition: { type: 'spring' as const, stiffness: 500, damping: 22 } }

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={`${base} ${styles} ${className}`}
        {...(download ? { download: '' } : {})}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...motionProps}
      >
        {content}
      </motion.a>
    )
  }
  return (
    <motion.button type="button" onClick={onClick} className={`${base} ${styles} ${className}`} {...motionProps}>
      {content}
    </motion.button>
  )
}
