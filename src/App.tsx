import { useEffect } from 'react'
import { CursorSparkle } from './components/fx/CursorSparkle'
import { ParticleLayer } from './components/fx/ParticleLayer'
import { burst, toast } from './components/fx/particles'
import { TelepathyRipple } from './components/fx/TelepathyRipple'
import { ToastHost } from './components/fx/ToastHost'
import { Nav } from './components/layout/Nav'
import { Contact } from './components/sections/Contact'
import { Cover } from './components/sections/Cover'
import { Extra } from './components/sections/Extra'
import { ProfileSection } from './components/sections/ProfileSection'
import { Quests } from './components/sections/Quests'
import { Skills } from './components/sections/Skills'
import { Works } from './components/sections/Works'
import { profile } from './data/profile'
import { useKonami } from './hooks/useKonami'
import { TelepathyProvider } from './state/telepathy'

export default function App() {
  useEffect(() => {
    // 直接打开 /#skills 这类链接时，等组件挂载后再跳转到对应章节
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      requestAnimationFrame(() => target?.scrollIntoView())
    }
    document.title = profile.meta.title
    document.documentElement.lang = profile.meta.lang
    document.querySelector('meta[name="description"]')?.setAttribute('content', profile.meta.description)
    console.log(
      `%c${profile.ui.stamp} ${profile.ui.brand}%c\n${profile.ui.consoleGreeting}${profile.contact.email}`,
      'font: 700 14px monospace; color: #fff; background: #e0452b; padding: 4px 8px;',
      'font: 12px sans-serif; color: #4d4741;',
    )
  }, [])

  // 彩蛋：↑↑↓↓←→←→BA 触发「超能力暴走」
  useKonami(() => {
    const root = document.documentElement
    if (root.classList.contains('psychic')) return
    root.classList.add('psychic')
    window.setTimeout(() => root.classList.remove('psychic'), 2500)
    toast(profile.ui.konami)
    const w = window.innerWidth
    for (let i = 0; i < 6; i++) {
      window.setTimeout(() => {
        burst({ x: (w * (i + 0.5)) / 6, y: window.innerHeight + 10, count: 18, speed: 6, angle: -Math.PI / 2, spread: Math.PI * 0.5, gravity: 0.1, life: 80, size: 6 })
      }, i * 80)
    }
  })

  return (
    <TelepathyProvider>
      <Nav />
      <main>
        <Cover />
        <ProfileSection />
        <Skills />
        <Works />
        <Quests />
        <Extra />
        <Contact />
      </main>
      <TelepathyRipple />
      <ParticleLayer />
      <CursorSparkle />
      <ToastHost />
    </TelepathyProvider>
  )
}
