import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '../../data/profile'
import type { SectionId } from '../../data/types'
import { useActiveSection } from '../../hooks/useActiveSection'
import { PixelArt } from '../../pixel/PixelArt'
import { mascot } from '../../pixel/sprites'
import { Icon } from '../ui/Icon'

const { ui } = profile
const ids = [...ui.nav.map((n) => n.id), 'contact'] as SectionId[]

export function Nav() {
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* 桌面：顶部悬浮游戏菜单 */}
      <header className="no-print fixed inset-x-0 top-3 z-50 flex justify-center px-4">
        <nav
          className={`flex items-center gap-1 rounded-2xl border bg-white/80 p-1.5 backdrop-blur-md transition-[box-shadow,border-color] duration-300 ${
            scrolled ? 'border-line shadow-[var(--shadow-soft)]' : 'border-transparent'
          }`}
          aria-label={ui.navAria.main}
        >
          <a href="#status" className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 hover:bg-paper" aria-label={ui.brand}>
            <PixelArt grid={mascot.idle.slice(0, 13)} scale={1.75} />
            <span className="font-tiny text-[12px] tracking-wider text-ink">{ui.brand}</span>
          </a>
          <span className="mx-1 hidden h-5 w-px bg-line lg:block" />
          <ul className="hidden items-center lg:flex">
            {ui.nav.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    title={item.sub}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative z-10 flex items-center gap-1 rounded-xl px-3 py-2 font-tiny text-[11px] tracking-wider transition-colors ${
                      isActive ? 'text-blue-strong' : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    <span className={`text-[9px] ${isActive ? 'animate-blink' : 'opacity-0'}`} aria-hidden="true">
                      ▶
                    </span>
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl bg-blue-soft"
                      transition={{ type: 'spring', stiffness: 480, damping: 34 }}
                    />
                  )}
                </li>
              )
            })}
          </ul>
          <a
            href="#contact"
            className="ml-1 flex items-center gap-1.5 rounded-xl bg-blue px-3.5 py-2 text-sm font-semibold text-white shadow-[0_3px_0_var(--color-blue-strong)] transition-transform hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-[0_1px_0_var(--color-blue-strong)]"
          >
            <Icon name="mail" size={16} />
            {ui.navCta}
          </a>
        </nav>
      </header>

      {/* 移动端：底部 Tab */}
      <nav
        className="no-print fixed inset-x-2 bottom-2 z-50 overflow-x-auto rounded-2xl border border-line bg-white/90 p-1 shadow-[var(--shadow-lift)] backdrop-blur-md lg:hidden"
        aria-label={ui.navAria.mobile}
      >
        <ul className="flex min-w-max">
          {ui.nav.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id} className="relative flex-1">
                <a href={`#${item.id}`} className="relative z-10 flex flex-col items-center px-3 py-1.5">
                  <span className={`font-tiny text-[10px] tracking-wider ${isActive ? 'text-blue-strong' : 'text-ink-faint'}`}>
                    {item.label}
                  </span>
                  <span className={`text-[12px] ${isActive ? 'font-semibold text-ink' : 'text-ink-soft'}`}>{item.sub}</span>
                </a>
                {isActive && (
                  <motion.span
                    layoutId="tab-active"
                    className="absolute inset-0 rounded-xl bg-blue-soft"
                    transition={{ type: 'spring', stiffness: 480, damping: 34 }}
                  />
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
