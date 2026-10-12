import { Area, AreaChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Eye, Layers } from 'lucide-react'
import { ChartCard, InsightCard, KpiCard, PlatformIcon, Reveal, SectionTitle, tooltipStyle } from './ui'
import { colors, cumulative, derived, meta, totals } from '../data/auditData'

const share = [
  { name: 'TikTok', value: totals.viewsTt, fill: colors.ttSoft },
  { name: 'Instagram', value: totals.viewsIg, fill: colors.igSoft },
]

export default function Summary() {
  return (
    <section id="resumen" className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 md:py-[72px]">
      <SectionTitle eyebrow="Resumen ejecutivo" title="TikTok concentra el 92% de las vistas de las 36 piezas." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal><KpiCard value={meta.totalPieces} label="Publicaciones" note="18 en Instagram · 18 en TikTok" icon={<Layers size={18} className="text-sand" aria-hidden />} /></Reveal>
        <Reveal delay={0.06}><KpiCard value={totals.viewsIg} label="Vistas Instagram" accent={colors.igSoft} icon={<PlatformIcon platform="instagram" />} /></Reveal>
        <Reveal delay={0.12}><KpiCard value={totals.viewsTt} label="Vistas TikTok" icon={<PlatformIcon platform="tiktok" />} /></Reveal>
        <Reveal delay={0.18}><KpiCard value={totals.ttSharePct} suffix="%" label="de las vistas vienen de TikTok" note="12,487 vistas en total" accent="#A8D5BA" icon={<Eye size={18} className="text-sand" aria-hidden />} /></Reveal>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_3fr]">
        <Reveal>
          <ChartCard title="Reparto de vistas" subtitle="Instagram + TikTok · 12,487 vistas" className="h-full">
            <div className="relative h-[250px]" role="img" aria-label="Gráfico de dona: TikTok 11,446 vistas (92%), Instagram 1,041 vistas (8%).">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={share} dataKey="value" nameKey="name" innerRadius={68} outerRadius={100} paddingAngle={3} stroke="none" animationDuration={1000}>
                    {share.map((s) => <Cell key={s.name} fill={s.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} formatter={(v) => (v as number).toLocaleString('en-US')} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-x-0 top-[88px] text-center">
                <p className="font-display text-[34px] font-semibold leading-none">92%</p>
                <p className="text-[12px] text-muted">TikTok</p>
              </div>
            </div>
            <p className="mt-2 rounded-lg bg-cream px-3 py-2 text-[13px] text-body">
              Una sola pieza de TikTok equivale al <strong className="text-ink">{derived.viralSharePct}%</strong> de todas las vistas combinadas.
            </p>
          </ChartCard>
        </Reveal>
        <Reveal delay={0.08}>
          <ChartCard title="Vistas acumuladas por fecha de publicación" subtitle="31 ago – 8 oct · se ve el salto del 7 de octubre" className="h-full">
            <div className="h-[300px]" role="img" aria-label="Gráfico de áreas de vistas acumuladas. TikTok sube de forma marcada el 7 de octubre; Instagram crece de forma lenta.">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cumulative} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gTt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={colors.tt} stopOpacity={0.55} /><stop offset="100%" stopColor={colors.tt} stopOpacity={0.03} /></linearGradient>
                    <linearGradient id="gIg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={colors.ig} stopOpacity={0.55} /><stop offset="100%" stopColor={colors.ig} stopOpacity={0.03} /></linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="d" tick={{ fontSize: 11.5, fill: '#5C5C5C' }} tickLine={false} axisLine={false} interval="preserveStartEnd" minTickGap={18} />
                  <YAxis tick={{ fontSize: 12, fill: '#5C5C5C' }} tickLine={false} axisLine={false} tickFormatter={(v) => (v as number).toLocaleString('en-US')} />
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} labelStyle={{ color: '#C4A882' }} formatter={(v) => (v as number).toLocaleString('en-US')} />
                  <Legend verticalAlign="top" align="left" iconType="plainline" wrapperStyle={{ fontSize: 13, paddingBottom: 6 }} />
                  <Area name="TikTok" dataKey="tt" type="monotone" stroke={colors.tt} strokeWidth={2.5} fill="url(#gTt)" animationDuration={1200} />
                  <Area name="Instagram" dataKey="ig" type="monotone" stroke={colors.ig} strokeWidth={2.5} fill="url(#gIg)" animationDuration={1200} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </Reveal>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Reveal className="h-full"><InsightCard n="1" tone="#C4A882" title="TikTok concentra el alcance." text="11,446 de 12,487 vistas combinadas." /></Reveal>
        <Reveal delay={0.06} className="h-full"><InsightCard n="2" tone="#B8C8E8" title="El pico de rendimiento depende de una sola pieza." text={`Sin ese video, el promedio de TikTok baja de 636 a ${derived.ttMeanNoViral} vistas.`} /></Reveal>
        <Reveal delay={0.12} className="h-full"><InsightCard n="3" tone="#F2A7A7" title="La publicación continuó aunque la guionización documentada se detuvo." text="28 de 36 piezas sin guion registrado en el portal." /></Reveal>
      </div>
    </section>
  )
}
