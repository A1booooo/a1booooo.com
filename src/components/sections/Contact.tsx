import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import { WalkingAibo } from '../layout/Aibo'
import { burstAt, toast } from '../fx/particles'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { OsBubble } from '../ui/OsBubble'
import { SectionHeader } from '../ui/SectionHeader'
import { Stamp } from '../ui/Stamp'

const { contact, ui } = profile

/** 最终话 · 组队邀请 + 页脚 */
export function Contact() {
  const copy = async (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    try {
      await navigator.clipboard.writeText(contact.email)
    } catch {
      /* 剪贴板不可用时仍给出反馈 */
    }
    toast(ui.contact.copied)
    burstAt(el, { count: 24, speed: 4.5 })
  }

  return (
    <section id="contact" className="relative pt-20">
      <div className="mx-auto max-w-3xl px-5 pb-20">
        <SectionHeader copy={ui.sections.contact} align="center" />
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 160, damping: 20 }}
        >
          <div className="card glow-box p-6 text-center sm:p-9">
            <p className="mx-auto max-w-xl text-[16px] leading-8 text-fg">{contact.blurb}</p>
            <div className="mx-auto flex max-w-xl justify-center">
              <OsBubble text={contact.os} />
            </div>

            <div className="mx-auto mt-7 flex max-w-md flex-col items-stretch gap-2">
              <p className="eyebrow text-fg-faint">{ui.contact.emailLabel}</p>
              <div className="flex items-center gap-2 rounded-xl border border-line bg-bg p-1.5 pl-4">
                <Icon name="mail" size={18} className="shrink-0 text-neon-hi" />
                <span className="min-w-0 flex-1 truncate text-left font-mono text-[15px] font-semibold text-fg">{contact.email}</span>
                <motion.button
                  type="button"
                  onClick={copy}
                  whileTap={{ scale: 0.92 }}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-neon px-3 py-2 text-sm font-semibold text-white shadow-[0_0_14px_rgb(255_45_85/0.7)]"
                >
                  <Icon name="copy" size={16} />
                  {ui.contact.copy}
                </motion.button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {contact.links.map((l, i) => (
                <Button
                  key={l.url}
                  href={l.url}
                  icon={l.icon}
                  variant={i === 0 ? 'primary' : 'ghost'}
                  download={l.url.endsWith('.pdf')}
                  external={l.url.startsWith('http')}
                >
                  {l.label}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 页脚：相棒在霓虹线上散步 */}
      <div className="no-print relative h-32">
        <WalkingAibo />
      </div>
      <footer className="border-t-2 border-neon bg-black/40 px-5 pt-7 pb-24 text-center shadow-[0_-2px_18px_-2px_rgb(255_45_85/0.6)] lg:pb-8">
        <div className="mb-4 flex justify-center">
          <Stamp size={44} />
        </div>
        <div className="space-y-1.5 font-mono text-xs text-fg-faint">
          {ui.footer.map((f) => (
            <p key={f}>{f}</p>
          ))}
        </div>
        <a href="#cover" className="mt-4 inline-block font-pixel text-[12px] text-fg-soft hover:text-neon-pale">
          ▲ {ui.backToTop}
        </a>
      </footer>
    </section>
  )
}
