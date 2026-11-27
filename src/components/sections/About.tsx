import { profile } from '../../data/profile'
import { Icon } from '../ui/Icon'
import { VitalBar } from '../ui/PixelBar'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const { about, character, ui } = profile
const ATTR_ACCENTS = ['blue', 'mint', 'sky', 'coral', 'lilac'] as const

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader copy={ui.sections.about} />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <Reveal className="card p-5">
            <p className="eyebrow mb-4 text-ink-faint">{ui.hero.attributesTitle}</p>
            <ul className="space-y-4">
              {character.attributes.map((a, i) => (
                <li key={a.label}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-sm font-semibold">{a.label}</span>
                    <span className="font-tiny text-[12px] text-ink-soft">{a.value}</span>
                  </div>
                  <VitalBar value={a.value} max={100} accent={ATTR_ACCENTS[i % ATTR_ACCENTS.length]} />
                  <p className="mt-1 text-xs text-ink-faint">{a.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="card p-5" delay={0.05}>
            <p className="eyebrow mb-3 text-ink-faint">{ui.about.factsTitle}</p>
            <dl className="divide-y divide-dashed divide-line">
              {about.facts.map((f) => (
                <div key={f.label} className="flex gap-4 py-2.5 text-sm">
                  <dt className="w-12 shrink-0 text-ink-faint">{f.label}</dt>
                  <dd className="font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8">
          <Reveal className="space-y-5 text-[16px] leading-8 text-ink">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-lg font-medium' : 'text-ink-soft'}>
                {p}
              </p>
            ))}
          </Reveal>
          <div>
            <p className="eyebrow mb-4 text-ink-faint">{ui.about.principlesTitle}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {about.principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <div className="card group h-full p-5 transition-transform duration-300 hover:-translate-y-1">
                    <span className="mb-3 grid size-10 place-items-center rounded-xl bg-blue-soft text-blue transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
                      <Icon name={p.icon} size={22} />
                    </span>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-ink-soft">{p.text}</p>
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
