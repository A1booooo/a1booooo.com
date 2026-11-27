import { useEffect, useState } from 'react'
import { CursorSparkle } from './components/fx/CursorSparkle'
import { ParticleLayer } from './components/fx/ParticleLayer'
import { burst, toast } from './components/fx/particles'
import { ToastHost } from './components/fx/ToastHost'
import { Nav } from './components/layout/Nav'
import { SkyBackground } from './components/layout/SkyBackground'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Log } from './components/sections/Log'
import { Projects } from './components/sections/Projects'
import { Quests } from './components/sections/Quests'
import { Skills } from './components/sections/Skills'
import { Training } from './components/sections/Training'
import { profile } from './data/profile'
import { useKonami } from './hooks/useKonami'

export default function App() {
  const [godMode, setGodMode] = useState(false)

  useEffect(() => {
    // 直接打开 /#training 这类链接时，等组件挂载后再跳转到对应区块
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      requestAnimationFrame(() => target?.scrollIntoView())
    }
    document.title = profile.meta.title
    document.documentElement.lang = profile.meta.lang
    document.querySelector('meta[name="description"]')?.setAttribute('content', profile.meta.description)
    console.log(
      `%c▶ ${profile.ui.brand}%c\n${profile.ui.consoleGreeting}${profile.contact.email}`,
      'font: 700 14px monospace; color: #4f7bf5; background: #edf2ff; padding: 4px 8px;',
      'font: 12px sans-serif; color: #566078;',
    )
  }, [])

  useKonami(() => {
    setGodMode(true)
    toast(`${profile.ui.konami.title} · ${profile.ui.konami.text}`)
    const w = window.innerWidth
    for (let i = 0; i < 7; i++) {
      window.setTimeout(() => {
        burst({ x: (w * (i + 0.5)) / 7, y: -10, count: 26, speed: 5, angle: Math.PI / 2, spread: Math.PI * 0.9, gravity: 0.12, life: 90, size: 6 })
      }, i * 90)
    }
  })

  return (
    <>
      <SkyBackground />
      <Nav />
      <main>
        <Hero godMode={godMode} />
        <About />
        <Skills godMode={godMode} />
        <Training />
        <Quests />
        <Projects />
        <Log />
        <Contact />
      </main>
      <ParticleLayer />
      <CursorSparkle />
      <ToastHost />
    </>
  )
}
