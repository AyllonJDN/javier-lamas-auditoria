import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Music2 } from 'lucide-react'
import { Badge, InstagramIcon, Marquee, Monogram, Num, WordReveal } from './ui'
import { Instrument } from './Instruments'
import { links, meta, totals } from '../data/auditData'

const miniStats = [
  { n: totals.viewsAll, label: 'vistas totales', suffix: '' },
  { n: totals.ttSharePct, label: 'del alcance viene de TikTok', suffix: '%' },
  { n: totals.maxViews, label: 'vistas en la pieza máxima', suffix: '' },
  { n: totals.scripts, label: 'guiones registrados', suffix: '' },
]

const ticker = ['Ortodoncia craneomandibular', 'Diagnóstico funcional', 'ATM', 'Ortodoncia', 'Instagram', 'TikTok', 'Auditoría cuantitativa']

function Orbit() {
  return (
    <motion.svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden
      animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}>
      <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(196,211,247,.35)" strokeWidth="1" strokeDasharray="2 8" />
      <circle cx="200" cy="200" r="158" fill="none" stroke="rgba(244,115,88,.45)" strokeWidth="1" />
      <circle cx="200" cy="12" r="5" fill="#F47358" />
      <circle cx="366" cy="290" r="3.5" fill="#C4D3F7" />
      <circle cx="60" cy="300" r="3" fill="#B9AE6F" />
    </motion.svg>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bigM = useTransform(scrollYProgress, [0, 1], [0, 220])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useMotionValue(-400)
  const sy = useMotionValue(-400)
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 80, damping: 18 })
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 18 })
  const spot = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(244,115,88,.16), transparent 62%)`

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    sx.set(e.clientX - r.left)
    sy.set(e.clientY - r.top)
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <>
      <section ref={ref} id="top" onMouseMove={onMove} className="grain relative isolate min-h-[100svh] overflow-hidden bg-grape text-cream">
        <div className="absolute inset-0 -z-10" aria-hidden
          style={{ background: 'radial-gradient(70% 60% at 88% 18%, rgba(196,211,247,.20), transparent 60%), radial-gradient(60% 70% at 8% 95%, rgba(244,115,88,.24), transparent 60%), linear-gradient(160deg,#5c1232 0%,#470b24 48%,#2a0615 100%)' }} />
        <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ background: spot }} aria-hidden />

        <motion.span style={{ y: bigM, WebkitTextStroke: '1px rgba(196,211,247,.14)' }} aria-hidden
          className="pointer-events-none absolute -left-[4vw] top-[4vh] -z-10 select-none font-display text-[72vw] font-light italic leading-none text-transparent md:text-[44vw]">
          M
        </motion.span>

        <Instrument name="mirror" size={190} strokeWidth={0.9} delay={0.6} className="floaty pointer-events-none absolute right-[3%] top-[20%] hidden rotate-[28deg] text-peri/50 [--r:28deg] lg:block" />
        <Instrument name="probe" size={150} strokeWidth={0.9} delay={0.9} className="floaty pointer-events-none absolute bottom-[16%] left-[40%] hidden -rotate-[24deg] text-coral/55 [--r:-24deg] md:block" />
        <Instrument name="tooth" size={90} strokeWidth={1} delay={1.2} className="floaty pointer-events-none absolute left-[6%] top-[22%] hidden text-peri/45 lg:block" />

        <div className="mx-auto grid min-h-[100svh] max-w-[1320px] items-center gap-10 px-4 pb-44 pt-28 sm:px-6 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="flex items-center gap-3 font-sans text-[12.5px] font-semibold uppercase tracking-[0.26em] text-peri">
              <Monogram size={20} /> Auditoría digital
            </motion.p>
            <h1 className="mt-6 font-display text-[48px] font-light leading-[0.98] sm:text-[64px] lg:text-[84px]">
              <WordReveal immediate delay={0.35} text="Lectura cuantitativa del *desempeño* en Instagram y TikTok" />
            </h1>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}>
              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-12 bg-coral" />
                <div>
                  <p className="font-sans text-[18px] font-semibold">{meta.client}</p>
                  <p className="text-[14px] text-cream/60">Ortodoncia craneomandibular</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={links.instagram} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-2 text-[14px] backdrop-blur transition-colors hover:border-coral hover:bg-coral hover:text-grape-deep">
                  <InstagramIcon size={16} /> {meta.handle} <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
                <a href={links.tiktok} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-2 text-[14px] backdrop-blur transition-colors hover:border-coral hover:bg-coral hover:text-grape-deep">
                  <Music2 size={16} aria-hidden /> {meta.handle} <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge>{meta.totalPieces} publicaciones analizadas</Badge>
                <Badge>Corte {meta.cutoff}</Badge>
              </div>
            </motion.div>
          </div>

          <motion.div style={{ y: photoY }} className="relative mx-auto w-full max-w-[420px] md:max-w-[460px]">
            <div className="relative aspect-[4/5]">
              <Orbit />
              <motion.div style={{ x: px, y: py }} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute inset-[9%] overflow-hidden rounded-t-[999px] rounded-b-[28px] border border-peri/40 shadow-[0_40px_90px_-20px_rgba(0,0,0,.7)]">
                <img src="/img/doctor-azul.jpg" alt="Dr. Javier Lamas, ortodoncista craneomandibular" width={412} height={625} fetchPriority="high"
                  className="h-full w-full object-cover object-[50%_20%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-grape-deep/60 via-transparent to-transparent" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}
                className="absolute -left-2 bottom-[16%] rounded-2xl border border-cream/20 bg-cream/90 px-4 py-2.5 text-grape-deep shadow-xl backdrop-blur sm:-left-6">
                <p className="font-display text-[34px] font-medium leading-none">{totals.ttSharePct}%</p>
                <p className="text-[12px] font-medium">del alcance en TikTok</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.7 }}
                className="absolute -right-2 top-[14%] rounded-2xl bg-coral px-4 py-2.5 text-grape-deep shadow-xl sm:-right-4">
                <p className="font-display text-[34px] font-medium leading-none">{totals.maxViews.toLocaleString('en-US')}</p>
                <p className="text-[12px] font-medium">vistas · pieza máxima</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-cream/10 bg-grape-deep/40 backdrop-blur-md">
          <dl className="mx-auto grid max-w-[1320px] grid-cols-2 gap-y-4 px-4 pb-14 pt-6 sm:px-6 md:grid-cols-4 md:pb-16">
            {miniStats.map((s) => (
              <div key={s.label} className="md:border-l md:border-cream/10 md:pl-6 md:first:border-l-0 md:first:pl-0">
                <dd className="font-display text-[40px] font-light leading-none"><Num value={s.n} suffix={s.suffix} /></dd>
                <dt className="mt-1 text-[13px] text-cream/55">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="relative z-20 -mt-8 -rotate-[1.2deg] scale-[1.03] overflow-hidden bg-coral py-3 text-grape-deep shadow-[0_10px_40px_rgba(0,0,0,.35)]" aria-hidden>
        <Marquee fast items={ticker.map((t) => (
          <span key={t} className="flex items-center font-display text-[24px] font-medium italic">
            <span className="px-6">{t}</span><span className="text-[14px] not-italic">✦</span>
          </span>
        ))} />
      </div>
    </>
  )
}
