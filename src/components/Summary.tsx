import { Area, AreaChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Eye, Layers } from 'lucide-react'
import { ChartCard, InsightCard, KpiCard, Lazy, PlatformIcon, Reveal, Section, SectionTitle, ax, grid, legend, tip } from './ui'
import { colors, cumulative, derived, fmt, meta, sameTopic, stats, totals } from '../data/auditData'

const minMult = Math.round(Math.min(...sameTopic.map((r) => r.mult)))
const maxMult = Math.round(Math.max(...sameTopic.map((r) => r.mult)))

const share = [
  { name: 'TikTok', value: totals.viewsTt, fill: colors.tt },
  { name: 'Instagram', value: totals.viewsIg, fill: colors.ig },
]

export default function Summary() {
  return (
    <Section id="resumen" tone="dark" decor={{ name: 'mirror', className: '-right-10 top-24 rotate-[18deg] text-peri/25' }}>
      <SectionTitle n="01" eyebrow="Resumen ejecutivo" title={`TikTok concentra el *${totals.ttSharePct}%* de las vistas de las ${meta.totalPieces} piezas.`} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal><KpiCard value={meta.totalPieces} label="Publicaciones" note={`${meta.piecesPerPlatform} en Instagram · ${meta.piecesPerPlatform} en TikTok`} icon={<Layers size={18} className="text-coral" aria-hidden />} /></Reveal>
        <Reveal delay={0.06}><KpiCard value={totals.viewsIg} label="Vistas Instagram" accent={colors.ig} icon={<PlatformIcon platform="instagram" />} /></Reveal>
        <Reveal delay={0.12}><KpiCard value={totals.viewsTt} label="Vistas TikTok" icon={<PlatformIcon platform="tiktok" />} /></Reveal>
        <Reveal delay={0.18}><KpiCard value={totals.ttSharePct} suffix="%" label="de las vistas vienen de TikTok" note={`${fmt(totals.viewsAll)} vistas en total`} accent={colors.olive} icon={<Eye size={18} className="text-peri" aria-hidden />} /></Reveal>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_3fr]">
        <Reveal className="h-full">
          <ChartCard title="Reparto de vistas" subtitle={`Instagram + TikTok · ${fmt(totals.viewsAll)} vistas`} className="h-full">
            <Lazy className="relative h-[260px]">
              <div className="h-full w-full" role="img" aria-label={`Gráfico de dona: TikTok ${fmt(totals.viewsTt)} vistas (${totals.ttSharePct}%), Instagram ${fmt(totals.viewsIg)} vistas (${100 - totals.ttSharePct}%).`}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={share} dataKey="value" nameKey="name" innerRadius={74} outerRadius={106} paddingAngle={3} cornerRadius={6} stroke="none" animationDuration={1400}>
                      {share.map((s) => <Cell key={s.name} fill={s.fill} />)}
                    </Pie>
                    <Tooltip {...tip} formatter={(v) => (v as number).toLocaleString('en-US')} />
                    <Legend {...legend} verticalAlign="bottom" align="center" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-[96px] text-center">
                <p className="font-display text-[44px] font-light leading-none">{totals.ttSharePct}%</p>
                <p className="text-[12px] text-cream/55">TikTok</p>
              </div>
            </Lazy>
            <p className="mt-3 rounded-xl border border-cream/10 bg-cream/[0.06] px-3.5 py-2.5 text-[13.5px] text-cream/75">
              Una sola pieza de TikTok equivale al <strong className="text-coral">{derived.viralSharePct}%</strong> de todas las vistas combinadas.
            </p>
          </ChartCard>
        </Reveal>
        <Reveal delay={0.08} className="h-full">
          <ChartCard title="Vistas acumuladas por fecha de publicación" subtitle="31 ago – 15 oct · se ve el salto del 7 de octubre" className="h-full">
            <Lazy className="h-[330px]">
              <div className="h-full w-full" role="img" aria-label="Gráfico de áreas de vistas acumuladas. TikTok sube de forma marcada el 7 de octubre; Instagram crece de forma lenta.">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cumulative} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gTt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={colors.tt} stopOpacity={0.6} /><stop offset="100%" stopColor={colors.tt} stopOpacity={0} /></linearGradient>
                      <linearGradient id="gIg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={colors.ig} stopOpacity={0.5} /><stop offset="100%" stopColor={colors.ig} stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid {...grid} vertical={false} />
                    <XAxis dataKey="d" {...ax} tick={{ fontSize: 11.5, fill: '#CDBCC6' }} interval="preserveStartEnd" minTickGap={18} />
                    <YAxis {...ax} tickFormatter={(v) => (v as number).toLocaleString('en-US')} />
                    <Tooltip {...tip} formatter={(v) => (v as number).toLocaleString('en-US')} />
                    <Legend {...legend} />
                    <Area name="TikTok" dataKey="tt" type="monotone" stroke={colors.tt} strokeWidth={2.5} fill="url(#gTt)" animationDuration={1800} />
                    <Area name="Instagram" dataKey="ig" type="monotone" stroke={colors.ig} strokeWidth={2.5} fill="url(#gIg)" animationDuration={1800} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Lazy>
          </ChartCard>
        </Reveal>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Reveal className="h-full"><InsightCard n="1" tone={colors.tt} title="TikTok concentra el alcance." text={`${fmt(totals.viewsTt)} de ${fmt(totals.viewsAll)} vistas combinadas (${totals.ttShareExact}%).`} /></Reveal>
        <Reveal delay={0.06} className="h-full"><InsightCard n="2" tone={colors.ig} title="El pico depende de una sola pieza." text={`Sin ese video, el promedio de TikTok baja de ${Math.round(stats.ttMean)} a ${derived.ttMeanNoViral} vistas.`} /></Reveal>
        <Reveal delay={0.12} className="h-full"><InsightCard n="3" tone={colors.olive} title="El mismo tema rinde más en TikTok." text={`Los ${sameTopic.length} temas publicados en ambas plataformas tuvieron entre ${minMult}× y ${maxMult}× más vistas en TikTok.`} /></Reveal>
      </div>
    </Section>
  )
}
