import { useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Music2 } from 'lucide-react'
import { Instrument } from './Instruments'
import type { InstrumentName } from './Instruments'

export type Tone = 'dark' | 'grape' | 'light'

/* ---------- Marca ---------- */
export function Monogram({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 60 72" className={className} aria-hidden>
      <ellipse cx="30" cy="36" rx="27" ry="33" fill="none" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="30" cy="36" rx="23.5" ry="29.5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      <text x="30" y="43" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontStyle="italic" fontSize="26" fill="currentColor">Mz</text>
    </svg>
  )
}

export const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
)

export function PlatformIcon({ platform, size = 16 }: { platform: 'instagram' | 'tiktok'; size?: number }) {
  const Icon = platform === 'instagram' ? InstagramIcon : Music2
  const color = platform === 'instagram' ? '#C4D3F7' : '#F47358'
  return (
    <span
      className="inline-flex items-center justify-center rounded-md p-1"
      style={{ background: color + '2e', color }}
      role="img"
      aria-label={platform === 'instagram' ? 'Instagram' : 'TikTok'}
    >
      <Icon size={size} aria-hidden />
    </span>
  )
}

/* ---------- Movimiento ---------- */
export const reveal = {
  initial: { opacity: 0, y: 36, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] },
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div {...reveal} transition={{ ...reveal.transition, delay }} className={className}>
      {children}
    </motion.div>
  )
}

/** Texto que sube palabra por palabra. `*así*` marca palabras en cursiva de acento. */
export function WordReveal({ text, italic = 'italic text-peri', immediate = false, delay = 0 }: { text: string; italic?: string; immediate?: boolean; delay?: number }) {
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean)
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-60px' } }
  return (
    <motion.span initial="hidden" {...trigger} variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }} className="inline">
      {parts.flatMap((p, pi) => {
        const em = p.startsWith('*')
        return p.replace(/\*/g, '').split(' ').filter(Boolean).map((w, wi) => (
          <span key={`${pi}-${wi}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${em ? italic : ''}`}
              variants={{ hidden: { y: '115%' }, show: { y: 0, transition: { duration: 0.85, ease: [0.2, 0.7, 0.2, 1] } } }}
            >
              {w}&nbsp;
            </motion.span>
          </span>
        ))
      })}
    </motion.span>
  )
}

export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 180, damping: 18 })
  const move = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} className={className}>
      {children}
    </motion.div>
  )
}

/** Monta el gráfico solo al entrar en pantalla, para que su animación se vea. */
export function Lazy({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  return <div ref={ref} className={className}>{inView ? children : null}</div>
}

export function Marquee({ items, className = '', reverse = false, fast = false }: { items: ReactNode[]; className?: string; reverse?: boolean; fast?: boolean }) {
  const row = (k: string) => (
    <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 'b'}>
      {items.map((it, i) => <div key={i} className="shrink-0">{it}</div>)}
    </div>
  )
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className={`marquee-track ${reverse ? 'rev' : ''} ${fast ? 'fast' : ''}`}>{row('a')}{row('b')}</div>
    </div>
  )
}

/* ---------- Estructura ---------- */
const tones: Record<Tone, string> = {
  dark: 'bg-grape-deep text-cream',
  grape: 'bg-grape text-cream',
  light: 'on-light bg-[linear-gradient(180deg,#fffaf5_0%,#e6ecfc_100%)] text-grape',
}

export function Section({
  id, tone = 'dark', children, decor,
}: { id: string; tone?: Tone; children: ReactNode; decor?: { name: InstrumentName; className: string } }) {
  return (
    <section id={id} className={`relative -mt-10 overflow-hidden rounded-t-[36px] md:-mt-14 md:rounded-t-[72px] ${tones[tone]}`}>
      {tone !== 'light' && (
        <div className="pointer-events-none absolute inset-0" aria-hidden
          style={{ background: 'radial-gradient(50% 40% at 90% 0%, rgba(196,211,247,.10), transparent 70%), radial-gradient(40% 40% at 0% 100%, rgba(244,115,88,.10), transparent 70%)' }} />
      )}
      {decor && <Instrument name={decor.name} size={220} strokeWidth={0.7} className={`pointer-events-none absolute ${decor.className}`} />}
      <div className="relative mx-auto max-w-[1320px] px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28">{children}</div>
    </section>
  )
}

export function SectionTitle({ n, eyebrow, title, tone = 'dark' }: { n: string; eyebrow: string; title?: string; tone?: Tone }) {
  const light = tone === 'light'
  return (
    <div className="mb-10 max-w-4xl md:mb-14">
      <div className="flex items-center gap-3">
        <span className="font-display text-[26px] italic leading-none text-coral">{n}</span>
        <motion.span className={`h-px origin-left ${light ? 'bg-grape/30' : 'bg-cream/30'}`} initial={{ width: 0 }} whileInView={{ width: 56 }} viewport={{ once: true }} transition={{ duration: 0.9 }} />
        <span className={`font-sans text-[12px] font-semibold uppercase tracking-[0.22em] ${light ? 'text-grape/70' : 'text-cream/60'}`}>{eyebrow}</span>
      </div>
      {title && (
        <h2 className="mt-5 font-display text-[38px] font-light leading-[1.02] md:text-[60px]">
          <WordReveal text={title} italic={light ? 'italic text-coral' : 'italic text-peri'} />
        </h2>
      )}
    </div>
  )
}

export function Badge({ children, tone = 'glass' }: { children: ReactNode; tone?: 'glass' | 'coral' | 'peri' }) {
  const t = {
    glass: 'border border-cream/20 bg-cream/10 text-cream',
    coral: 'bg-coral text-grape-deep',
    peri: 'bg-peri text-grape-deep',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[12.5px] font-semibold backdrop-blur ${t[tone]}`}>
      {children}
    </span>
  )
}

export function Num({ value, decimals = 0, suffix = '', prefix = '' }: { value: number; decimals?: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setV(value)
      return
    }
    const c = animate(0, value, { duration: 1.8, ease: [0.2, 0.7, 0.2, 1], onUpdate: setV })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

export function KpiCard({
  value, label, note, decimals, suffix, accent = '#F47358', icon,
}: { value: number; label: string; note?: string; decimals?: number; suffix?: string; accent?: string; icon?: ReactNode }) {
  return (
    <Tilt className="h-full">
      <div className="card h-full overflow-hidden">
        <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl" style={{ background: accent }} aria-hidden />
        <div className="relative flex items-center justify-between">
          <p className="font-sans text-[13.5px] font-medium text-cream/70">{label}</p>
          {icon}
        </div>
        <p className="relative mt-2 font-display text-[58px] font-light leading-none">
          <Num value={value} decimals={decimals} suffix={suffix} />
        </p>
        <span className="relative mt-3 block h-[2px] w-10 rounded-full" style={{ background: accent }} aria-hidden />
        {note && <p className="relative mt-3 text-[13px] text-cream/60">{note}</p>}
      </div>
    </Tilt>
  )
}

export function MiniStat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl border border-cream/10 bg-cream/[0.06] px-3 py-2.5">
      <p className="font-sans text-[11.5px] font-medium uppercase tracking-wide text-cream/55">{label}</p>
      <p className="mt-0.5 font-sans text-[20px] font-semibold tabular-nums" style={{ color: tone ?? '#FFFAF5' }}>{value}</p>
    </div>
  )
}

export function InsightCard({ n, title, text, tone }: { n: string; title: string; text?: string; tone: string }) {
  return (
    <div className="card flex h-full gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-[20px] italic" style={{ borderColor: tone, color: tone }} aria-hidden>
        {n}
      </span>
      <div>
        <p className="font-display text-[23px] font-medium leading-[1.12]">{title}</p>
        {text && <p className="mt-1.5 text-[14px] leading-snug text-cream/65">{text}</p>}
      </div>
    </div>
  )
}

export function ChartCard({
  title, subtitle, children, className = '', right,
}: { title: string; subtitle?: string; children: ReactNode; className?: string; right?: ReactNode }) {
  return (
    <div className={`card ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-sans text-[16px] font-semibold">{title}</h3>
          {subtitle && <p className="text-[13px] text-cream/55">{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  )
}

export function TimelineWeek({ n, registered }: { n: number; registered: boolean }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1.5">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: n * 0.07, type: 'spring', stiffness: 260, damping: 16 }}
        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-sans text-[13px] font-bold sm:h-10 sm:w-10 ${
          registered ? 'border-coral bg-coral text-grape-deep' : 'border-cream/25 bg-transparent text-cream/55'
        }`}
        aria-label={`Semana ${n}: ${registered ? 'con guiones registrados' : 'sin guiones registrados'}`}
      >
        {n}
      </motion.span>
      <span className="text-[11px] text-cream/50">{registered ? 'Registro' : 'Sin registro'}</span>
    </div>
  )
}

export function MethodItem({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-peri">{title}</p>
      <ul className="mt-3 space-y-2 text-[14px] leading-snug text-cream/70">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-coral" aria-hidden />
            {i}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Ajustes compartidos de gráficos (sobre fondo uva) ---------- */
export const tip = {
  contentStyle: {
    background: '#FFFAF5', color: '#2A0615', border: 'none', borderRadius: 12,
    fontFamily: 'Hanken Grotesk, sans-serif', fontSize: 13, padding: '10px 14px',
    boxShadow: '0 12px 32px rgba(0,0,0,.35)',
  },
  itemStyle: { color: '#2A0615' },
  labelStyle: { color: '#C2452D', fontWeight: 600, marginBottom: 2 },
  cursor: { fill: 'rgba(255,255,255,0.05)', stroke: 'rgba(255,255,255,.2)' },
}

export const ax = { tick: { fontSize: 12, fill: '#CDBCC6' }, tickLine: false as const, axisLine: false as const }
export const grid = { stroke: 'rgba(255,255,255,0.09)', strokeDasharray: '4 4' }
export const legend = {
  verticalAlign: 'top' as const,
  align: 'left' as const,
  iconType: 'circle' as const,
  iconSize: 8,
  wrapperStyle: { fontSize: 13, paddingBottom: 10 },
  formatter: (v: string) => <span style={{ color: '#E8DCE2' }}>{v}</span>,
}
