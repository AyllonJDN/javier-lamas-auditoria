import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react'
import { Badge, ChartCard, MiniStat, Num, PlatformIcon, Reveal, SectionTitle, tooltipStyle } from './ui'
import { fmt, platformCompare, ttTotals, ttViral } from '../data/auditData'

const miniCharts = [
  { key: 'views', title: 'Vistas', data: platformCompare.views },
  { key: 'likes', title: 'Me gusta', data: platformCompare.likes },
  { key: 'comments', title: 'Comentarios', data: platformCompare.comments },
] as const

export default function TikTok() {
  return (
    <section id="tiktok" className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 md:py-[72px]">
      <SectionTitle eyebrow="TikTok y comparativa" title="Un solo video concentra 4,883 vistas: 12 veces la mediana de TikTok." />
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-2xl bg-ink p-6 text-white shadow-[0_4px_24px_rgba(0,0,0,.12)] md:p-7">
            <svg className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-40" viewBox="0 0 200 200" aria-hidden>
              {[90, 65, 40].map((r) => <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#C4A882" strokeWidth="1" strokeDasharray="3 5" />)}
            </svg>
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <PlatformIcon platform="tiktok" />
                <Badge tone="sand">{ttViral.multiple}× la mediana</Badge>
                <span className="text-[13px] text-white/60">Publicado el {ttViral.date}</span>
              </div>
              <p className="mt-4 font-display text-[56px] font-semibold leading-none text-sand md:text-[68px]">
                <Num value={ttViral.views} />
              </p>
              <p className="mt-1 text-[14px] text-white/60">vistas</p>
              <p className="mt-4 font-display text-[22px] leading-snug">“{ttViral.title}”</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  [Heart, ttViral.likes, 'me gusta'],
                  [MessageCircle, ttViral.comments, 'comentarios'],
                  [Share2, ttViral.shares, 'compartidos'],
                  [Bookmark, ttViral.saves, 'guardados'],
                ].map(([Icon, v, l]) => {
                  const I = Icon as typeof Heart
                  return (
                    <div key={l as string} className="rounded-xl bg-white/[0.07] px-3 py-2.5">
                      <I size={16} className="text-sand" aria-hidden />
                      <p className="mt-1 text-[22px] font-semibold tabular-nums">{fmt(v as number)}</p>
                      <p className="text-[12.5px] text-white/60">{l as string}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ChartCard title="Total TikTok" subtitle="18 publicaciones" right={<PlatformIcon platform="tiktok" />} className="h-full">
            <p className="font-display text-[40px] font-semibold leading-none">
              <Num value={ttTotals.views} />
            </p>
            <p className="mb-4 text-[13px] text-muted">vistas totales</p>
            <div className="grid grid-cols-3 gap-2.5">
              <MiniStat label="Me gusta" value={fmt(ttTotals.likes)} />
              <MiniStat label="Coment." value={fmt(ttTotals.comments)} />
              <MiniStat label="Piezas" value={fmt(ttTotals.pieces)} />
            </div>
            <p className="mt-4 text-[13px] text-muted">Compartidos y guardados solo están disponibles para parte de los videos: se muestran “—” cuando no hay dato.</p>
          </ChartCard>
        </Reveal>
      </div>

      <Reveal className="mt-4">
        <ChartCard title="Instagram frente a TikTok" subtitle="Cada métrica usa su propia escala para que ninguna quede invisible">
          <div className="grid gap-4 md:grid-cols-3">
            {miniCharts.map((m) => {
              const data = [
                { name: 'Instagram', value: m.data.instagram, fill: '#B8C8E8' },
                { name: 'TikTok', value: m.data.tiktok, fill: '#C4A882' },
              ]
              return (
                <div key={m.key}>
                  <p className="mb-1 font-sans text-[13.5px] font-semibold">{m.title}</p>
                  <div className="h-[170px]" role="img" aria-label={`${m.title}: Instagram ${fmt(m.data.instagram)}, TikTok ${fmt(m.data.tiktok)}`}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data} margin={{ top: 20, right: 8, left: 8, bottom: 0 }}>
                        <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12.5, fill: '#5C5C5C' }} tickLine={false} axisLine={false} />
                        <YAxis hide domain={[0, 'dataMax']} />
                        <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} cursor={{ fill: 'rgba(0,0,0,0.04)' }} formatter={(v) => [fmt(v as number), m.title]} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={56} animationDuration={1000}>
                          <LabelList dataKey="value" position="top" formatter={(v) => fmt(v as number)} style={{ fontSize: 13, fontWeight: 600, fill: '#1A1A2E' }} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )
            })}
          </div>
        </ChartCard>
      </Reveal>
    </section>
  )
}
