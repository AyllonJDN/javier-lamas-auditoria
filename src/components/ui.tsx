import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { Music2 } from 'lucide-react'

const Instagram = ({ size = 16 }: { size?: number; 'aria-hidden'?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
)

export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div {...reveal} transition={{ ...reveal.transition, delay }} className={className}>
      {children}
    </motion.div>
  )
}

export function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <Reveal className="mb-7 max-w-3xl">
      <p className={`font-sans text-[12px] font-semibold uppercase tracking-[0.18em] ${light ? 'text-sand' : 'text-[#8a6f48]'}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-2 font-display text-[26px] font-semibold leading-tight md:text-[32px] ${light ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
    </Reveal>
  )
}

export function Badge({ children, tone = 'sand' }: { children: ReactNode; tone?: 'sand' | 'mint' | 'rose' | 'lav' | 'dark' }) {
  const tones = {
    sand: 'bg-sand/25 text-[#6b5231]',
    mint: 'bg-mint/40 text-[#2c5a40]',
    rose: 'bg-rose/40 text-[#7a3a3a]',
    lav: 'bg-lav/45 text-[#2f3f66]',
    dark: 'bg-white/10 text-white border border-white/15',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-[12.5px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function PlatformIcon({ platform, size = 16 }: { platform: 'instagram' | 'tiktok'; size?: number }) {
  const Icon = platform === 'instagram' ? Instagram : Music2
  const color = platform === 'instagram' ? '#B8C8E8' : '#C4A882'
  return (
    <span
      className="inline-flex items-center justify-center rounded-md p-1"
      style={{ background: color + '55', color: '#1A1A2E' }}
      role="img"
      aria-label={platform === 'instagram' ? 'Instagram' : 'TikTok'}
    >
      <Icon size={size} aria-hidden />
    </span>
  )
}

export function Num({ value, decimals = 0, suffix = '', prefix = '' }: { value: number; decimals?: number; suffix?: string; prefix?: string }) {
  return (
    <CountUp
      end={value}
      decimals={decimals}
      duration={1.4}
      separator=","
      suffix={suffix}
      prefix={prefix}
      enableScrollSpy
      scrollSpyOnce
    />
  )
}

export function KpiCard({
  value, label, note, decimals, suffix, accent = '#C4A882', icon,
}: { value: number; label: string; note?: string; decimals?: number; suffix?: string; accent?: string; icon?: ReactNode }) {
  return (
    <div className="card relative overflow-hidden">
      <span className="absolute left-0 top-0 h-full w-1" style={{ background: accent }} aria-hidden />
      <div className="flex items-center justify-between">
        <p className="font-sans text-[13.5px] font-medium text-body">{label}</p>
        {icon}
      </div>
      <p className="mt-1 font-display text-[40px] font-semibold leading-none text-ink">
        <Num value={value} decimals={decimals} suffix={suffix} />
      </p>
      {note && <p className="mt-2 text-[13px] text-muted">{note}</p>}
    </div>
  )
}

export function MiniStat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl bg-cream px-3 py-2.5">
      <p className="font-sans text-[12px] font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-0.5 font-body text-[19px] font-semibold tabular-nums" style={{ color: tone ?? '#1A1A2E' }}>
        {value}
      </p>
    </div>
  )
}

export function InsightCard({ n, title, text, tone }: { n: string; title: string; text?: string; tone: string }) {
  return (
    <div className="card flex gap-4">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-[16px] font-semibold text-ink"
        style={{ background: tone }}
        aria-hidden
      >
        {n}
      </span>
      <div>
        <p className="font-display text-[19px] font-semibold leading-snug text-ink">{title}</p>
        {text && <p className="mt-1 text-[14.5px] text-body">{text}</p>}
      </div>
    </div>
  )
}

export function ChartCard({
  title, subtitle, children, className = '', right,
}: { title: string; subtitle?: string; children: ReactNode; className?: string; right?: ReactNode }) {
  return (
    <div className={`card ${className}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-sans text-[16px] font-semibold text-ink">{title}</h3>
          {subtitle && <p className="text-[13px] text-muted">{subtitle}</p>}
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
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-sans text-[13px] font-bold sm:h-10 sm:w-10 ${
          registered ? 'border-ink bg-ink text-white' : 'border-sand/70 bg-transparent text-muted'
        }`}
        aria-label={`Semana ${n}: ${registered ? 'con guiones registrados' : 'sin guiones registrados'}`}
      >
        {n}
      </span>
      <span className="text-[11px] text-muted">{registered ? 'Registro' : 'Sin registro'}</span>
    </div>
  )
}

export function MethodItem({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-sand">{title}</p>
      <ul className="mt-2 space-y-1.5 text-[14px] leading-snug text-white/75">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-sand" aria-hidden />
            {i}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const tooltipStyle = {
  background: '#1A1A2E',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontFamily: 'Inter, sans-serif',
  fontSize: 13,
  padding: '8px 12px',
}
