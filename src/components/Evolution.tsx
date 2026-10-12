import { Bar, BarChart, CartesianGrid, LabelList, Legend, Line, LineChart, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion } from 'framer-motion'
import { ChartCard, Lazy, MiniStat, PlatformIcon, Reveal, Section, SectionTitle, ax, grid, legend, tip } from './ui'
import { colors, derived, publishedByWeek, stats, weekly } from '../data/auditData'
import { useMedia } from './useMedia'

function PeakLabel({ viewBox, narrow }: { viewBox?: { x: number; y: number }; narrow: boolean }) {
  if (!viewBox) return null
  const { x, y } = viewBox
  const lines = narrow ? ['TikTok: 5,735', 'vistas, semana 41'] : ['TikTok alcanza 5,735', 'vistas en la semana 41.']
  const w = narrow ? 122 : 156
  return (
    <g>
      <rect x={x - w - 14} y={y - 4} width={w} height={40} rx={10} fill="#FFFAF5" />
      {lines.map((t, i) => (
        <text key={t} x={x - w - 6} y={y + 13 + i * 15} fill="#2A0615" fontSize={12} fontWeight={600} fontFamily="Hanken Grotesk, sans-serif">{t}</text>
      ))}
    </g>
  )
}

function StatCard({ platform, s }: { platform: 'instagram' | 'tiktok'; s: typeof stats.instagram }) {
  const color = platform === 'instagram' ? colors.ig : colors.tt
  return (
    <div className="card !p-4">
      <p className="mb-3 flex items-center gap-2 font-sans text-[15px] font-semibold">
        <PlatformIcon platform={platform} /> {platform === 'instagram' ? 'Instagram' : 'TikTok'}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <MiniStat label="Media" value={s.mean} tone={color} />
        <MiniStat label="Mediana" value={s.median} />
        <MiniStat label="Desv. σ" value={s.sd} />
        <MiniStat label="Rango" value={s.range} />
      </div>
    </div>
  )
}

export default function Evolution() {
  const narrow = useMedia('(max-width: 640px)')
  return (
    <Section id="evolucion" tone="light" decor={{ name: 'caliper', className: '-left-8 top-20 -rotate-12 text-grape/15' }}>
      <SectionTitle tone="light" n="02" eyebrow="Evolución y estadística" title="Una sola semana de TikTok, la 41, explica el *salto* del alcance." />
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <Reveal className="h-full">
          <ChartCard title="Vistas semanales por plataforma" subtitle="Semanas 36–41" className="h-full">
            <Lazy className="h-[400px] w-full">
              <div className="h-full w-full" role="img" aria-label="Gráfico de líneas de vistas semanales de Instagram y TikTok, semanas 36 a 41. TikTok sube a 5,735 vistas en la semana 41.">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weekly} margin={{ top: 30, right: 16, left: -8, bottom: 0 }}>
                    <CartesianGrid {...grid} vertical={false} />
                    <XAxis dataKey="week" {...ax} />
                    <YAxis {...ax} domain={[0, 6500]} tickFormatter={(v) => v.toLocaleString('en-US')} />
                    <Tooltip {...tip} />
                    <Legend {...legend} />
                    <Line name="Instagram" dataKey="instagram" stroke={colors.ig} strokeWidth={3} strokeDasharray="6 4" dot={{ r: 4, fill: colors.ig, strokeWidth: 0 }} animationDuration={1800} />
                    <Line name="TikTok" dataKey="tiktok" stroke={colors.tt} strokeWidth={3.5} dot={{ r: 4.5, fill: colors.tt, strokeWidth: 0 }} animationDuration={1800} />
                    <ReferenceDot x="S41" y={5735} r={8} fill={colors.tt} stroke="#FFFAF5" strokeWidth={2.5} label={<PeakLabel narrow={narrow} />} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Lazy>
          </ChartCard>
        </Reveal>
        <div className="flex flex-col gap-4">
          <Reveal delay={0.08}><StatCard platform="instagram" s={stats.instagram} /></Reveal>
          <Reveal delay={0.14}><StatCard platform="tiktok" s={stats.tiktok} /></Reveal>
          <Reveal delay={0.2}>
            <p className="rounded-2xl border-l-4 border-coral bg-white/60 px-5 py-4 font-display text-[22px] italic leading-snug text-grape">
              El promedio de TikTok todavía no representa a una publicación típica.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Reveal className="h-full">
          <ChartCard title="Publicaciones por semana" subtitle="Cadencia real de publicación, semanas ISO 36–41" className="h-full">
            <Lazy className="h-[240px]">
              <div className="h-full w-full" role="img" aria-label="Barras apiladas de publicaciones por semana: S36 9, S37 8, S38 4, S39 6, S40 3, S41 6.">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={publishedByWeek} margin={{ top: 18, right: 8, left: -22, bottom: 0 }}>
                    <CartesianGrid {...grid} vertical={false} />
                    <XAxis dataKey="w" {...ax} />
                    <YAxis {...ax} allowDecimals={false} />
                    <Tooltip {...tip} />
                    <Legend {...legend} iconType="square" />
                    <Bar name="Instagram" dataKey="ig" stackId="a" fill={colors.ig} barSize={36} animationDuration={1200} />
                    <Bar name="TikTok" dataKey="tt" stackId="a" fill={colors.tt} radius={[7, 7, 0, 0]} barSize={36} animationDuration={1200}>
                      <LabelList content={({ x, y, width, index }) => {
                        const r = publishedByWeek[index as number]
                        return <text x={(x as number) + (width as number) / 2} y={(y as number) - 7} textAnchor="middle" fontSize={13} fontWeight={700} fill="#FFFAF5">{r.ig + r.tt}</text>
                      }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Lazy>
          </ChartCard>
        </Reveal>
        <Reveal delay={0.1} className="h-full">
          <ChartCard title="Dispersión de vistas por pieza" subtitle="Coeficiente de variación (desv. estándar ÷ promedio)" className="h-full">
            <div className="space-y-6 pt-2">
              {([
                ['Instagram', derived.cv.instagram, colors.ig, 'Dispersión moderada: las piezas se parecen entre sí.'],
                ['TikTok', derived.cv.tiktok, colors.tt, 'Dispersión muy alta: un valor atípico domina la serie.'],
              ] as const).map(([name, v, c, note]) => (
                <div key={name}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[14px] font-semibold">{name}</span>
                    <span className="font-display text-[38px] font-light leading-none tabular-nums">{v}%</span>
                  </div>
                  <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-cream/10" role="img" aria-label={`${name}: coeficiente de variación ${v}%`}>
                    <motion.div className="h-full rounded-full" style={{ background: c }} initial={{ width: 0 }} whileInView={{ width: `${(v / 170) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }} />
                  </div>
                  <p className="mt-1.5 text-[13px] text-cream/55">{note}</p>
                </div>
              ))}
              <p className="rounded-xl border border-cream/10 bg-cream/[0.06] px-3.5 py-2.5 text-[13.5px] text-cream/75">
                Sin el video del 7 de octubre, el promedio de TikTok pasa de <strong className="text-coral">636</strong> a <strong className="text-coral">{derived.ttMeanNoViral}</strong> vistas.
              </p>
            </div>
          </ChartCard>
        </Reveal>
      </div>
    </Section>
  )
}
