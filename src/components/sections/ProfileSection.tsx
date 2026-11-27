import { profile } from '../../data/profile'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const { about, hobbies, ui } = profile
const favorites = hobbies.filter((h) => h.favorite)

/** 第 1 话 · 人物设定 */
export function ProfileSection() {
  return (
    <section id="profile" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeader copy={ui.sections.profile} />
      <div className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
        {/* 左栏：资料 + 域名由来（不装框，靠排版） */}
        <div className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <p className="mb-3 font-pixel text-[12px] leading-none text-fg-faint">{ui.profile.factsTitle}</p>
            <dl>
              {about.facts.map((f) => (
                <div key={f.label} className="flex gap-4 border-b border-line py-3 text-[15px]">
                  <dt className="w-10 shrink-0 font-pixel text-[12px] leading-6 text-neon-hi">{f.label}</dt>
                  <dd className="text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="border-l-2 border-neon pl-4 shadow-[-6px_0_12px_-8px_rgb(255_45_85/0.9)]">
              <p className="mb-2 font-pixel text-[12px] leading-none text-neon-pale">{about.domain.title}</p>
              <p className="text-sm leading-7 text-fg-soft">{about.domain.text}</p>
              <OsBubble text={about.domain.os} />
            </div>
          </Reveal>
        </div>

        {/* 右栏 */}
        <div className="flex flex-col gap-16">
          <Reveal className="space-y-6 text-[16px] leading-8">
            {about.paragraphs.map((p, i) => (
              <div key={i}>
                <p className={i === 0 ? 'text-xl leading-9 font-semibold text-fg' : 'text-fg-soft'}>{p.text}</p>
                <OsBubble text={p.os} />
              </div>
            ))}
          </Reveal>

          <div>
            <p className="mb-6 font-pixel text-[18px] leading-none text-fg">{ui.profile.likesTitle}</p>
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {favorites.map((h, i) => (
                <Reveal key={h.id} delay={i * 0.04} className="flex gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-neon-dim text-neon-hi">
                    <Icon name={h.icon} size={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold leading-snug text-fg">{h.name}</p>
                    <p className="mt-1 text-sm leading-6 text-fg-soft">{h.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-6 font-pixel text-[18px] leading-none text-fg">{ui.profile.quirksTitle}</p>
            <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {about.quirks.map((q, i) => (
                <Reveal key={q.title} delay={i * 0.05}>
                  <span className="mb-3 grid size-10 place-items-center rounded-xl border border-line bg-surface text-neon-hi">
                    <Icon name={q.icon} size={22} />
                  </span>
                  <h3 className="font-semibold text-fg">{q.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-fg-soft">{q.text}</p>
                  <OsBubble text={q.os} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
