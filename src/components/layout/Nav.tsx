import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Stamp } from '../ui/Stamp'
import { TelepathyToggle } from './TelepathyToggle'

const { ui } = profile
const ids = ui.nav.map((n) => n.id)

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
      <header
        className={`no-print fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? 'border-line bg-bg/80 backdrop-blur-md' : 'border-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5" aria-label={ui.navAria.main}>
          <a href="#cover" className="flex items-center gap-2.5" aria-label={ui.brand}>
            <Stamp size={32} />
            <span className="font-pixel text-[18px] leading-none tracking-wide text-fg">{ui.brand}</span>
          </a>
          <ul className="ml-auto hidden items-center gap-0.5 lg:flex">
            {ui.nav.slice(1).map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative z-10 flex items-baseline gap-1.5 px-3 py-2 font-pixel text-[12px] leading-none transition-colors ${
                      isActive ? 'glow-text' : 'text-fg-soft hover:text-fg'
                    }`}
                  >
                    <span className={isActive ? '' : 'text-neon-hi/70'}>{item.no}</span>
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-neon shadow-[0_0_8px_#ff2d55]"
                      transition={{ type: 'spring', stiffness: 480, damping: 34 }}
                    />
                  )}
                </li>
              )
            })}
          </ul>
          <div className="ml-auto lg:ml-4">
            <TelepathyToggle />
          </div>
        </nav>
      </header>

      {/* 移动端：底部目录 */}
      <nav
        className="no-print fixed inset-x-2 bottom-2 z-50 overflow-x-auto rounded-2xl border border-line bg-surface/90 backdrop-blur-md lg:hidden"
        aria-label={ui.navAria.mobile}
      >
        <ul className="flex min-w-max">
          {ui.nav.slice(1).map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id} className="relative flex-1">
                <a href={`#${item.id}`} className="relative z-10 flex flex-col items-center px-3 py-2">
                  <span className={`font-pixel text-[12px] leading-none ${isActive ? 'glow-text' : 'text-neon-hi/70'}`}>{item.no}</span>
                  <span className={`mt-1 whitespace-nowrap font-pixel text-[12px] leading-none ${isActive ? 'text-fg' : 'text-fg-soft'}`}>{item.label}</span>
                </a>
                {isActive && (
                  <motion.span
                    layoutId="tab-active"
                    className="absolute inset-x-3 bottom-0.5 h-[2px] rounded-full bg-neon shadow-[0_0_8px_#ff2d55]"
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
