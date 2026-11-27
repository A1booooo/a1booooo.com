import { profile } from '../../data/profile'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

const { experience, education, awards, character, ui } = profile

export function Quests() {
  return (
    <section id="quests" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader copy={ui.sections.quests} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
        {/* 时间线 */}
        <div className="relative">
          <div className="absolute top-2 bottom-2 left-[15px] w-[3px] bg-[repeating-linear-gradient(to_bottom,var(--color-blue-line)_0_6px,transparent_6px_10px)]" aria-hidden="true" />
          {experience.map((exp) => (
            <article key={exp.id} className="relative pl-12">
              <span className="pixel-notch absolute top-0.5 left-0 grid size-[33px] place-items-center bg-blue text-white">
                <Icon name="briefcase" size={18} />
              </span>
              <header className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-bold">{exp.org}</h3>
                <span className="font-medium text-blue-strong">{exp.role}</span>
                <span className="ml-auto font-mono text-sm text-ink-soft">{exp.period}</span>
              </header>

              <div className="space-y-5">
                {exp.quests.map((q, qi) => (
                  <Reveal key={q.title} delay={qi * 0.05}>
                    <div className="card overflow-hidden">
                      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-paper/60 px-5 py-3">
                        <span
                          className={`pixel-notch px-2 py-0.5 font-tiny text-[10px] text-white ${exp.kind === 'main' ? 'bg-blue' : 'bg-lilac'}`}
                        >
                          {exp.kind === 'main' ? ui.quests.mainQuest : ui.quests.sideQuest}
                        </span>
                        <h4 className="font-semibold">{q.title}</h4>
                      </div>
                      <div className="space-y-4 p-5">
                        <p className="text-[15px] leading-7 text-ink-soft">{q.context}</p>
                        <ul className="space-y-3.5">
                          {q.achievements.map((a) => (
                            <li key={a.title} className="flex gap-3">
                              <span className="mt-1 shrink-0 text-mint">
                                <Icon name="check" size={18} />
                              </span>
                              <p className="text-[15px] leading-7">
                                <strong className="font-semibold text-ink">{a.title}：</strong>
                                <span className="text-ink-soft">{a.text}</span>
                              </p>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="eyebrow mr-1 text-ink-faint">{ui.quests.stackLabel}</span>
                          {q.stack.map((s) => (
                            <Tag key={s} label={s} size="sm" accent="gray" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* 侧栏：简历下载 / 教育 / 荣誉 */}
        <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <Reveal className="card accent-blue overflow-hidden">
            <div className="bg-blue-soft px-5 py-3">
              <p className="eyebrow text-blue-strong">{ui.quests.resumeTitle}</p>
            </div>
            <div className="flex flex-col gap-3 p-5">
              {character.resumes.map((r, i) => (
                <Button key={r.url} href={r.url} download icon="download" variant={i === 0 ? 'primary' : 'ghost'} className="justify-center">
                  {r.label}
                </Button>
              ))}
            </div>
          </Reveal>

          <Reveal className="card p-5" delay={0.05}>
            <p className="eyebrow mb-3 text-ink-faint">{ui.quests.educationTitle}</p>
            {education.map((e) => (
              <div key={e.school} className="flex gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-mint-soft text-mint-strong">
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
          </Reveal>

          <Reveal className="card p-5" delay={0.1}>
            <p className="eyebrow mb-3 text-ink-faint">{ui.quests.awardsTitle}</p>
            {awards.map((a) => (
              <div key={a.title} className="group flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-soft text-amber-strong transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                  <Icon name={a.icon} size={22} />
                </span>
                <div>
                  <p className="font-semibold leading-snug">{a.title}</p>
                  <p className="font-mono text-xs text-ink-faint">{a.date}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </aside>
      </div>
    </section>
  )
}
