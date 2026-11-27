import { profile } from '../../data/profile'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { Panel } from '../ui/Panel'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

const { experience, education, awards, character, ui } = profile

/** 第 4 话 · 冒险履历 */
export function Quests() {
  return (
    <section id="quests" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader copy={ui.sections.quests} />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
        {/* 时间线 */}
        <div className="relative">
          <div className="absolute top-2 bottom-2 left-[16px] w-[3px] bg-[repeating-linear-gradient(to_bottom,var(--color-ink)_0_8px,transparent_8px_13px)]" aria-hidden="true" />
          {experience.map((exp) => (
            <article key={exp.id} className="relative pl-14">
              <span className="absolute top-0 left-0 grid size-[35px] place-items-center border-[2.5px] border-ink bg-red text-white">
                <Icon name="briefcase" size={18} />
              </span>
              <header className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-pixel text-[24px] leading-tight">{exp.org}</h3>
                <span className="font-medium text-red-strong">{exp.role}</span>
                <span className="ml-auto font-mono text-sm text-ink-soft">{exp.period}</span>
              </header>

              <div className="space-y-8">
                {exp.quests.map((q, qi) => (
                  <Reveal key={q.title} delay={qi * 0.05}>
                    <Panel>
                      <div className="border-b-[2.5px] border-ink bg-paper-2 px-5 py-3">
                        <h4 className="font-pixel text-[18px] leading-tight">{q.title}</h4>
                      </div>
                      <div className="space-y-4 p-5">
                        <p className="text-[15px] leading-7 text-ink-soft">{q.context}</p>
                        <ul className="space-y-3.5">
                          {q.achievements.map((a) => (
                            <li key={a.title}>
                              <div className="flex gap-3">
                                <span className="mt-1 shrink-0 text-red">
                                  <Icon name="check" size={18} />
                                </span>
                                <p className="text-[15px] leading-7">
                                  <strong className="font-semibold text-ink">{a.title}：</strong>
                                  <span className="text-ink-soft">{a.text}</span>
                                </p>
                              </div>
                              <OsBubble text={a.os} className="pl-7" />
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="mr-1 font-pixel text-[12px] text-ink-faint">{ui.quests.stackLabel}</span>
                          {q.stack.map((s) => (
                            <Tag key={s} label={s} size="sm" tone="soft" />
                          ))}
                        </div>
                      </div>
                    </Panel>
                  </Reveal>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* 侧栏：简历下载 / 教育 / 荣誉 */}
        <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <Panel tone="red">
              <div className="border-b-[2.5px] border-ink bg-red px-5 py-3 text-white">
                <p className="font-pixel text-[12px] leading-none">{ui.quests.resumeTitle}</p>
              </div>
              <div className="flex flex-col gap-4 p-5">
                {character.resumes.map((r, i) => (
                  <Button key={r.url} href={r.url} download icon="download" variant={i === 0 ? 'primary' : 'ghost'} className="justify-center">
                    {r.label}
                  </Button>
                ))}
                <p className="flex items-center gap-2 text-sm text-ink-soft">
                  <span className="size-2 animate-pulse-soft bg-red" aria-hidden="true" />
                  {character.status}
                </p>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={0.05}>
            <Panel className="p-5">
              <p className="mb-3 font-pixel text-[12px] leading-none">{ui.quests.educationTitle}</p>
              {education.map((e) => (
                <div key={e.school} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center bg-ink text-white">
                    <Icon name="school" size={22} />
                  </span>
                  <div>
                    <p className="font-semibold">{e.school}</p>
                    <p className="text-sm text-ink-soft">
                      {e.major} · {e.degree}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-ink-faint">{e.period}</p>
                  </div>
                </div>
              ))}
            </Panel>
          </Reveal>

          <Reveal delay={0.1}>
            <Panel className="p-5">
              <p className="mb-3 font-pixel text-[12px] leading-none">{ui.quests.awardsTitle}</p>
              {awards.map((a) => (
                <div key={a.title}>
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center bg-red text-white">
                      <Icon name={a.icon} size={22} />
                    </span>
                    <div>
                      <p className="font-semibold leading-snug">{a.title}</p>
                      <p className="font-mono text-xs text-ink-faint">{a.date}</p>
                    </div>
                  </div>
                  <OsBubble text={a.os} />
                </div>
              ))}
            </Panel>
          </Reveal>
        </aside>
      </div>
    </section>
  )
}
