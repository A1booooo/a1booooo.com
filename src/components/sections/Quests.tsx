import { profile } from '../../data/profile'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

const { experience, education, awards, character, ui } = profile

/** 第 4 话 · 冒险履历：左边时间线不装框，右边只有一张侧栏卡 */
export function Quests() {
  return (
    <section id="quests" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeader copy={ui.sections.quests} />

      <div className="grid gap-14 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-2 left-[15px] w-[2px] bg-gradient-to-b from-neon via-neon/40 to-transparent shadow-[0_0_8px_rgb(255_45_85/0.6)]"
          />
          {experience.map((exp) => (
            <article key={exp.id} className="relative pl-12">
              <span className="absolute top-0 left-0 grid size-8 place-items-center rounded-lg bg-neon text-white shadow-[0_0_14px_rgb(255_45_85/0.8)]">
                <Icon name="briefcase" size={18} />
              </span>
              <header className="mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-pixel text-[24px] leading-tight text-fg">{exp.org}</h3>
                <span className="font-medium text-neon-pale">{exp.role}</span>
                <span className="ml-auto font-mono text-sm text-fg-faint">{exp.period}</span>
              </header>

              <div className="space-y-12">
                {exp.quests.map((q, qi) => (
                  <Reveal key={q.title} delay={qi * 0.05}>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-fg">
                      <span className="size-2 rounded-full bg-neon shadow-[0_0_8px_#ff2d55]" aria-hidden="true" />
                      {q.title}
                    </h4>
                    <p className="text-[15px] leading-7 text-fg-soft">{q.context}</p>
                    <ul className="mt-5 space-y-4">
                      {q.achievements.map((a) => (
                        <li key={a.title}>
                          <div className="flex gap-3">
                            <span className="mt-1 shrink-0 text-neon-hi">
                              <Icon name="check" size={18} />
                            </span>
                            <p className="text-[15px] leading-7">
                              <strong className="font-semibold text-fg">{a.title}：</strong>
                              <span className="text-fg-soft">{a.text}</span>
                            </p>
                          </div>
                          <OsBubble text={a.os} className="pl-7" />
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <span className="mr-1 font-pixel text-[12px] text-fg-faint">{ui.quests.stackLabel}</span>
                      {q.stack.map((s) => (
                        <Tag key={s} label={s} size="sm" />
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* 侧栏：简历 + 教育 + 荣誉，合成一张卡 */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Reveal className="card divide-y divide-line">
            <div className="flex flex-col gap-3 p-5">
              <p className="mb-1 font-pixel text-[12px] leading-none text-fg-faint">{ui.quests.resumeTitle}</p>
              {character.resumes.map((r, i) => (
                <Button key={r.url} href={r.url} download icon="download" variant={i === 0 ? 'primary' : 'ghost'} className="justify-center">
                  {r.label}
                </Button>
              ))}
              <p className="mt-1 flex items-center gap-2 text-sm text-fg-soft">
                <span className="size-2 animate-pulse-soft rounded-full bg-neon shadow-[0_0_6px_#ff2d55]" aria-hidden="true" />
                {character.status}
              </p>
            </div>

            <div className="p-5">
              <p className="mb-3 font-pixel text-[12px] leading-none text-fg-faint">{ui.quests.educationTitle}</p>
              {education.map((e) => (
                <div key={e.school} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-neon-dim text-neon-hi">
                    <Icon name="school" size={22} />
                  </span>
                  <div>
                    <p className="font-semibold text-fg">{e.school}</p>
                    <p className="text-sm text-fg-soft">
                      {e.major} · {e.degree}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-fg-faint">{e.period}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5">
              <p className="mb-3 font-pixel text-[12px] leading-none text-fg-faint">{ui.quests.awardsTitle}</p>
              {awards.map((a) => (
                <div key={a.title}>
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-neon text-white shadow-[0_0_14px_rgb(255_45_85/0.6)]">
                      <Icon name={a.icon} size={22} />
                    </span>
                    <div>
                      <p className="font-semibold leading-snug text-fg">{a.title}</p>
                      <p className="font-mono text-xs text-fg-faint">{a.date}</p>
                    </div>
                  </div>
                  <OsBubble text={a.os} />
                </div>
              ))}
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  )
}
