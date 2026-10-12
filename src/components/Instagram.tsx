import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard, MiniStat, PlatformIcon, Reveal, SectionTitle, tooltipStyle } from './ui'
import { igEngagement, igInsights, igTop } from '../data/auditData'
import { useMedia } from './useMedia'

export default function Instagram() {
  const narrow = useMedia('(max-width: 640px)')
  return (
    <section id="instagram" className="bg-white/50 py-14 md:py-[72px]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <SectionTitle eyebrow="Instagram" title="Instagram alcanza audiencia fuera de la cuenta, pero con interacción mínima." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {igInsights.map((d, i) => (
            <Reveal key={d.days} delay={i * 0.05}>
              <div className="card !p-4">
                <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Últimos {d.days} días</p>
                <p className="mt-1 font-display text-[30px] font-semibold leading-none">{d.views.toLocaleString('en-US')}</p>
                <p className="text-[13px] text-body">visualizaciones · {d.viewers} espectadores</p>
                <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-cream" role="img" aria-label={`${d.followers}% seguidores y ${d.nonFollowers}% no seguidores`}>
                  <div style={{ width: `${d.followers}%`, background: '#B8C8E8' }} />
                  <div style={{ width: `${d.nonFollowers}%`, background: '#C4A882' }} />
                </div>
                <div className="mt-1.5 flex justify-between text-[12.5px]">
                  <span className="text-[#5a6c99]">■ Seguidores {d.followers}%</span>
                  <span className="text-[#8a6f48]">▲ No seg. {d.nonFollowers}%</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[55fr_45fr]">
          <Reveal>
            <ChartCard title="Top 5 publicaciones por vistas" subtitle="Instagram · vistas acumuladas" right={<PlatformIcon platform="instagram" />} className="h-full">
              <div className="h-[260px]" role="img" aria-label="Gráfico de barras horizontales: Evolución mandíbula 116 vistas, Ranking 1-7 errores 100, Sonrisa bonita 96, La razón número uno 93, Sin caption 66.">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={igTop} layout="vertical" margin={{ top: 0, right: 36, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" horizontal={false} />
                    <XAxis type="number" hide domain={[0, 130]} />
                    <YAxis type="category" dataKey="short" width={narrow ? 104 : 150} tick={{ fontSize: 12.5, fill: '#1A1A2E' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} cursor={{ fill: 'rgba(0,0,0,0.04)' }} labelFormatter={(_, p) => p?.[0]?.payload?.title ?? ''} formatter={(v) => [v, 'Vistas']} />
                    <Bar dataKey="views" fill="#B8C8E8" radius={[0, 6, 6, 0]} barSize={24} animationDuration={1000}>
                      <LabelList dataKey="views" position="right" style={{ fontSize: 12.5, fontWeight: 600, fill: '#1A1A2E' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </Reveal>
          <Reveal delay={0.1}>
            <ChartCard title="Interacción acumulada" subtitle="18 publicaciones de Instagram" className="h-full">
              <div className="grid grid-cols-2 gap-3">
                <MiniStat label="Me gusta" value={String(igEngagement.likes)} />
                <MiniStat label="Comentarios" value={String(igEngagement.comments)} />
                <MiniStat label="Compartidos" value={String(igEngagement.shares)} />
                <MiniStat label="Seguidores" value={String(igEngagement.followers)} />
              </div>
              <p className="mt-4 border-l-4 border-lav pl-3 font-display text-[16px] italic leading-snug">
                El alcance existe, pero la interacción continúa en una escala reducida.
              </p>
            </ChartCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
