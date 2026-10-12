import { motion } from 'framer-motion'

type Shape = { d: string } | { c: [number, number, number] }
export type InstrumentName = 'mirror' | 'probe' | 'forceps' | 'tooth' | 'caliper' | 'arch'

const archTeeth: Shape[] = Array.from({ length: 9 }, (_, i) => {
  const a = Math.PI * (0.08 + (i * 0.84) / 8)
  return { c: [60 - 46 * Math.cos(a), 92 - 62 * Math.sin(a), 4.6] as [number, number, number] }
})

const rulerTicks = Array.from({ length: 11 }, (_, i) => `M${20 + i * 8} 20v${i % 5 === 0 ? 10 : 6}`).join('')

const defs: Record<InstrumentName, Shape[]> = {
  mirror: [
    { c: [60, 24, 17] },
    { c: [60, 24, 12] },
    { d: 'M54 20Q57 14 65 16' },
    { d: 'M60 41V52' },
    { d: 'M55 52h10l-1.5 58q-3.5 5-7 0z' },
    { d: 'M56 64h8M56 70h8M56 76h8M56 82h8' },
  ],
  probe: [
    { d: 'M55 58h10l-1.5 52q-3.5 5-7 0z' },
    { d: 'M60 58V38Q60 22 70 14Q76 10 81 15' },
    { d: 'M56 70h8M56 76h8M56 82h8M56 88h8' },
  ],
  forceps: [
    { d: 'M44 112L56 64Q60 48 56 20' },
    { d: 'M76 112L64 64Q60 48 64 20' },
    { d: 'M56 20Q60 8 64 20' },
    { c: [60, 62, 2.6] },
    { d: 'M49 92H71M52 84H68' },
  ],
  tooth: [
    {
      d: 'M60 18C44 9 24 18 26 40C28 58 35 63 37 82C39 103 45 111 50 107C56 103 54 88 60 88C66 88 64 103 70 107C75 111 81 103 83 82C85 63 92 58 94 40C96 18 76 9 60 18Z',
    },
    { d: 'M42 28Q48 22 56 24' },
    { d: 'M60 18Q58 30 60 40' },
  ],
  caliper: [
    { d: 'M14 20H106V30H14Z' },
    { d: rulerTicks },
    { d: 'M30 30V98Q30 106 38 106' },
    { d: 'M70 30V90Q70 98 78 98' },
    { d: 'M62 30h16v12H62z' },
  ],
  arch: [{ d: 'M14 96C14 24 106 24 106 96' }, ...archTeeth],
}

const draw = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 1.6, delay, ease: 'easeInOut' as const },
})

export function Instrument({
  name, size = 120, className = '', delay = 0, strokeWidth = 1.3,
}: { name: InstrumentName; size?: number; className?: string; delay?: number; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {defs[name].map((s, i) =>
        'd' in s
          ? <motion.path key={i} d={s.d} {...draw(delay + i * 0.12)} />
          : <motion.circle key={i} cx={s.c[0]} cy={s.c[1]} r={s.c[2]} {...draw(delay + i * 0.12)} />,
      )}
    </svg>
  )
}

/** Hilera ornamental de instrumentos con línea, para cerrar secciones. */
export function InstrumentRow({ className = '' }: { className?: string }) {
  const items: InstrumentName[] = ['mirror', 'probe', 'tooth', 'forceps', 'caliper']
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-current opacity-20" />
      {items.map((n, i) => (
        <Instrument key={n} name={n} size={44} delay={i * 0.15} strokeWidth={2.2} className="opacity-70" />
      ))}
      <span className="h-px flex-1 bg-current opacity-20" />
    </div>
  )
}
