import { motion } from 'framer-motion'
import { Badge, PlatformIcon, Num } from './ui'
import { meta, totals } from '../data/auditData'

function ClinicalArt() {
  const dots = [
    [210, 52], [340, 110], [372, 230], [320, 340], [190, 372], [78, 300], [52, 180], [112, 78],
  ]
  return (
    <svg viewBox="0 0 420 420" className="h-full w-full" role="img" aria-label="Composición abstracta de círculos concéntricos y puntos de medición">
      <defs>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C4A882" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#C4A882" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="420" height="420" fill="url(#grid)" />
      <circle cx="210" cy="210" r="190" fill="url(#glow)" />
      {[160, 120, 80, 40].map((r, i) => (
        <motion.circle
          key={r} cx="210" cy="210" r={r} fill="none"
          stroke={i === 1 ? '#C4A882' : 'rgba(255,255,255,0.22)'}
          strokeWidth={i === 1 ? 1.5 : 1}
          strokeDasharray={i % 2 ? '3 6' : undefined}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 + i * 0.15 }}
        />
      ))}
      {/* arco anatómico abstracto */}
      <motion.path
        d="M70 250 Q210 130 350 250" fill="none" stroke="#A8D5BA" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.6 }}
      />
      <path d="M40 210H380M210 40V380" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <path d="M210 210L340 110M210 210L78 300" stroke="rgba(196,168,130,0.5)" strokeWidth="1" strokeDasharray="2 5" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 2.5} fill={i % 3 === 0 ? '#C4A882' : '#B8C8E8'} />
      ))}
      <circle cx="210" cy="210" r="6" fill="#C4A882" />
      <circle cx="210" cy="210" r="14" fill="none" stroke="#C4A882" strokeWidth="1">
        <animate attributeName="r" values="12;22;12" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0;0.8" dur="5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

const miniStats = [
  { n: totals.viewsAll, label: 'vistas totales', suffix: '' },
  { n: totals.ttSharePct, label: 'del alcance en TikTok', suffix: '%' },
  { n: totals.maxViews, label: 'vistas, pieza máxima', suffix: '' },
  { n: totals.scripts, label: 'guiones registrados', suffix: '' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto grid max-w-[1320px] items-center gap-6 px-4 pb-8 pt-10 sm:px-6 md:min-h-[min(70vh,640px)] md:grid-cols-[1.1fr_0.9fr] md:pt-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-sans text-[12.5px] font-semibold uppercase tracking-[0.22em] text-sand">Auditoría digital</p>
          <h1 className="mt-4 font-display text-[32px] font-semibold leading-[1.15] sm:text-[40px] lg:text-[46px]">
            Lectura cuantitativa del desempeño en Instagram y TikTok
          </h1>
          <p className="mt-5 font-sans text-[18px] font-medium">{meta.client}</p>
          <p className="mt-1 flex items-center gap-2 text-[15px] text-white/65">
            <PlatformIcon platform="instagram" /> <PlatformIcon platform="tiktok" /> {meta.handle}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge tone="dark">{meta.totalPieces} publicaciones analizadas</Badge>
            <Badge tone="dark">Corte {meta.cutoff}</Badge>
          </div>
        </motion.div>
        <motion.div
          className="mx-auto aspect-square w-full max-w-[400px] md:max-w-[440px]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        >
          <ClinicalArt />
        </motion.div>
      </div>
      <div className="border-t border-white/10 bg-white/[0.03]">
        <dl className="mx-auto grid max-w-[1320px] grid-cols-2 gap-y-4 px-4 py-5 sm:px-6 md:grid-cols-4">
          {miniStats.map((s) => (
            <div key={s.label} className="md:border-l md:border-white/10 md:pl-5 md:first:border-l-0 md:first:pl-0">
              <dd className="font-display text-[28px] font-semibold leading-none text-white">
                <Num value={s.n} suffix={s.suffix} />
              </dd>
              <dt className="mt-1 text-[13px] text-white/55">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
