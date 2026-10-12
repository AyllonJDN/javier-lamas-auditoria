import { CartesianGrid, Legend, Line, LineChart, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard, MiniStat, PlatformIcon, Reveal, SectionTitle, tooltipStyle } from './ui'
import { stats, weekly } from '../data/auditData'
import { useMedia } from './useMedia'

function PeakLabel({ viewBox, narrow }: { viewBox?: { x: number; y: number }; narrow: boolean }) {
  if (!viewBox) return null
  const { x, y } = viewBox
  const lines = narrow ? ['TikTok: 5,735', 'vistas, semana 41'] : ['TikTok alcanza 5,735', 'vistas en la semana 41.']
  const w = narrow ? 118 : 150
  return (
    <g>
      <rect x={x - w - 14} y={y - 4} width={w} height={38} rx={8} fill="#1A1A2E" />
      {lines.map((t, i) => (
        <text key={t} x={x - w - 6} y={y + 12 + i * 15} fill="#fff" fontSize={12} fontFamily="Inter, sans-serif">{t}</text>
      ))}
    </g>
  )
}

function StatCard({ platform, s }: { platform: 'instagram' | 'tiktok'; s: typeof stats.instagram }) {
  const color = platform === 'instagram' ? '#5a6c99' : '#8a6f48'
  return (
    <div className="card !p-4">
      <p className="mb-2.5 flex items-center gap-2 font-sans text-[15px] font-semibold">
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
    <section id="evolucion" className="mx-auto max-w-[1320px] px-4 pb-14 sm:px-6 md:pb-[72px]">
      <SectionTitle eyebrow="Evolución y estadística" title="Una sola semana de TikTok, la 41, explica el salto del alcance." />
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <Reveal>
          <ChartCard title="Vistas semanales por plataforma" subtitle="Semanas 36–41" className="h-full">
            <div className="h-[320px] w-full" role="img" aria-label="Gráfico de líneas de vistas semanales de Instagram y TikTok, semanas 36 a 41. TikTok sube a 5,735 vistas en la semana 41.">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weekly} margin={{ top: 30, right: 16, left: -8, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#5C5C5C' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#5C5C5C' }} tickLine={false} axisLine={false} domain={[0, 6500]} tickFormatter={(v) => v.toLocaleString('en-US')} />
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} labelStyle={{ color: '#C4A882' }} cursor={{ stroke: 'rgba(0,0,0,0.12)' }} />
                  <Legend verticalAlign="top" align="left" height={28} iconType="plainline" wrapperStyle={{ fontSize: 13, left: 8, top: -4 }} />
                  <Line name="Instagram" dataKey="instagram" stroke="#B8C8E8" strokeWidth={3} strokeDasharray="6 4" dot={{ r: 3.5, fill: '#B8C8E8' }} animationDuration={1100} />
                  <Line name="TikTok" dataKey="tiktok" stroke="#C4A882" strokeWidth={3} dot={{ r: 3.5, fill: '#C4A882' }} animationDuration={1100} />
                  <ReferenceDot x="S41" y={5735} r={7} fill="#C4A882" stroke="#1A1A2E" strokeWidth={2} label={<PeakLabel narrow={narrow} />} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </Reveal>
        <div className="flex flex-col gap-4">
          <Reveal delay={0.08}><StatCard platform="instagram" s={stats.instagram} /></Reveal>
          <Reveal delay={0.14}><StatCard platform="tiktok" s={stats.tiktok} /></Reveal>
          <Reveal delay={0.2}>
            <p className="rounded-xl border-l-4 border-sand bg-white/60 px-4 py-3 font-display text-[16px] italic leading-snug text-ink">
              El promedio de TikTok todavía no representa a una publicación típica.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
