import { profile } from '../../data/profile'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { Panel } from '../ui/Panel'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const { about, hobbies, ui } = profile
const favorites = hobbies.filter((h) => h.favorite)

/** 第 1 话 · 人物设定：仿单行本卷首的人物介绍页 */
export function ProfileSection() {
  return (
    <section id="profile" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader copy={ui.sections.profile} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
        {/* 左栏：资料卡 + 域名由来 */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <Panel className="p-5">
              <p className="mb-3 font-pixel text-[12px] leading-none">{ui.profile.factsTitle}</p>
              <dl className="divide-y-[1.5px] divide-dashed divide-ink/25">
                {about.facts.map((f) => (
                  <div key={f.label} className="flex gap-4 py-2.5 text-sm">
                    <dt className="w-10 shrink-0 font-pixel text-[12px] leading-5 text-red-strong">{f.label}</dt>
                    <dd className="font-medium text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </Reveal>
          <Reveal delay={0.05}>
            <Panel tone="red" className="p-5">
              <p className="mb-2 font-pixel text-[12px] leading-none text-red-strong">{about.domain.title}</p>
              <p className="text-sm leading-7 text-ink-soft">{about.domain.text}</p>
              <OsBubble text={about.domain.os} />
            </Panel>
          </Reveal>
        </div>

        {/* 右栏：自述 + 喜欢的东西 + 小执念 */}
        <div className="flex flex-col gap-12">
          <Reveal className="space-y-5 text-[16px] leading-8">
            {about.paragraphs.map((p, i) => (
              <div key={i}>
                <p className={i === 0 ? 'text-lg font-semibold text-ink' : 'text-ink-soft'}>{p.text}</p>
                <OsBubble text={p.os} />
              </div>
            ))}
          </Reveal>

          <div>
            <p className="mb-5 font-pixel text-[18px] leading-none">{ui.profile.likesTitle}</p>
            <div className="grid gap-5 sm:grid-cols-2">
              {favorites.map((h, i) => (
                <Reveal key={h.id} delay={i * 0.04}>
                  <Panel tone={h.rarity === 'legendary' ? 'red' : 'ink'} className="flex gap-3.5 p-4">
                    <span className="grid size-11 shrink-0 place-items-center border-[2.5px] border-ink bg-red-soft text-red-strong">
                      <Icon name={h.icon} size={24} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug">{h.name}</p>
                      <p className="mt-1 text-sm leading-6 text-ink-soft">{h.desc}</p>
                    </div>
                  </Panel>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 font-pixel text-[18px] leading-none">{ui.profile.quirksTitle}</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {about.quirks.map((q, i) => (
                <Reveal key={q.title} delay={i * 0.05}>
                  <div>
                    <Panel className="p-5">
                      <span className="mb-3 grid size-10 place-items-center bg-ink text-white">
                        <Icon name={q.icon} size={22} />
                      </span>
                      <h3 className="font-semibold">{q.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-ink-soft">{q.text}</p>
                    </Panel>
                    <OsBubble text={q.os} className="mt-2" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
