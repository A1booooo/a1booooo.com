import { motion } from 'motion/react'
import { useCallback, useState } from 'react'
import { profile } from '../../data/profile'
import { WalkingMascot } from '../layout/Mascot'
import { PixelLandscape } from '../layout/PixelLandscape'
import { burstAt, toast } from '../fx/particles'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeader } from '../ui/SectionHeader'

const { contact, ui } = profile

export function Contact() {
  const [ground, setGround] = useState(45)
  const onGround = useCallback((g: number) => setGround(g), [])

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
      <div className="mx-auto max-w-3xl px-5 pb-16">
        <SectionHeader copy={ui.sections.contact} align="center" />
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          className="card p-6 text-center sm:p-8"
        >
          <p className="mx-auto max-w-xl text-[16px] leading-8 text-ink">{contact.blurb}</p>

          <div className="mx-auto mt-6 flex max-w-md flex-col items-stretch gap-2">
            <p className="eyebrow text-ink-faint">{ui.contact.emailLabel}</p>
            <div className="flex items-center gap-2 rounded-xl border border-line bg-paper p-1.5 pl-4">
              <Icon name="mail" size={18} className="shrink-0 text-blue" />
              <span className="min-w-0 flex-1 truncate text-left font-mono text-[15px] font-semibold">{contact.email}</span>
              <motion.button
                type="button"
                onClick={copy}
                whileTap={{ scale: 0.92 }}
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-blue px-3 py-2 text-sm font-semibold text-white shadow-[0_3px_0_var(--color-blue-strong)] active:translate-y-[2px] active:shadow-none"
              >
                <Icon name="copy" size={16} />
                {ui.contact.copy}
              </motion.button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
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
        </motion.div>
      </div>

      {/* 像素地景 + 散步的 Bit */}
      <div className="no-print relative mt-4 overflow-hidden">
        <div className="h-[230px]" />
        <div className="absolute inset-x-0 bottom-0">
          <PixelLandscape onGround={onGround} />
        </div>
        <WalkingMascot ground={ground} />
      </div>
      <footer className="bg-[#2f9d63] px-5 pt-1 pb-24 text-center font-mono text-xs text-white/85 lg:pb-6">
        <p>{ui.footer}</p>
        <a href="#status" className="mt-2 inline-block font-tiny text-[10px] tracking-wider text-white/90 hover:text-white">
          ▲ {ui.backToTop}
        </a>
      </footer>
    </section>
  )
}
