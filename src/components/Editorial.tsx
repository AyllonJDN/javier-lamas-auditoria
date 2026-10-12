import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Copy } from 'lucide-react'
import { Badge, ChartCard, PlatformIcon, Reveal, SectionTitle, TimelineWeek, Num, tooltipStyle } from './ui'
import { colors, derived, editorial, scriptsByWeek } from '../data/auditData'

export default function Editorial() {
  return (
    <section id="editorial" className="bg-white/50 py-14 md:py-[72px]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <SectionTitle eyebrow="Sistema editorial" title="Los guiones registrados cubren solo las semanas 1 y 2 de 9." />
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="card h-full">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-display text-[44px] font-semibold leading-none"><Num value={editorial.scripts} /></p>
                  <p className="mt-1 text-[14px] text-body">Guiones registrados</p>
                </div>
                <div>
                  <p className="font-display text-[44px] font-semibold leading-none text-[#8a6f48]"><Num value={editorial.published} /></p>
                  <p className="mt-1 text-[14px] text-body">Piezas publicadas</p>
                </div>
              </div>
              <div className="mt-6 flex gap-1 sm:gap-2" role="list" aria-label="Línea de tiempo de semanas 1 a 9">
                {editorial.weeks.map((w) => (
                  <div key={w.n} role="listitem" className="flex flex-1 justify-center">
                    <TimelineWeek n={w.n} registered={w.registered} />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-muted">
                <span>● Relleno: guiones registrados</span>
                <span>○ Contorno: sin registro</span>
              </div>
              <p className="mt-5 border-l-4 border-sand pl-3 font-display text-[17px] italic leading-snug">
                La ejecución continuó; la planificación documentada no.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-rose/60 bg-gradient-to-br from-rose/20 to-sand/20 p-6">
              <div className="flex items-center gap-2">
                <Copy size={18} className="text-[#7a3a3a]" aria-hidden />
                <Badge tone="rose">Observación editorial</Badge>
              </div>
              <h3 className="mt-3 font-display text-[22px] font-semibold">Contenido duplicado</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-3 rounded-xl bg-white/70 p-3.5">
                  <PlatformIcon platform="instagram" />
                  <div>
                    <p className="font-sans text-[14px] font-semibold">Instagram · dos piezas</p>
                    <p className="text-[14.5px] text-body">Mismo tema: evolución de mandíbula / dientes chuecos.</p>
                  </div>
                </li>
                <li className="flex gap-3 rounded-xl bg-white/70 p-3.5">
                  <PlatformIcon platform="tiktok" />
                  <div>
                    <p className="font-sans text-[14px] font-semibold">TikTok · dos publicaciones</p>
                    <p className="text-[14.5px] text-body">Caption idéntico sobre el mismo tema.</p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Reveal>
            <ChartCard title="Guiones registrados por semana del plan" subtitle="Portal de cliente · semanas 1 a 9" className="h-full">
              <div className="h-[220px]" role="img" aria-label="Barras de guiones registrados por semana: 4 en la semana 1, 4 en la semana 2 y ninguno de la semana 3 a la 9.">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scriptsByWeek} margin={{ top: 18, right: 8, left: -24, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" vertical={false} />
                    <XAxis dataKey="w" tick={{ fontSize: 12, fill: '#5C5C5C' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#5C5C5C' }} tickLine={false} axisLine={false} allowDecimals={false} domain={[0, 5]} />
                    <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} cursor={{ fill: 'rgba(0,0,0,0.04)' }} formatter={(v) => [v, 'Guiones']} />
                    <Bar dataKey="scripts" radius={[6, 6, 0, 0]} barSize={30} minPointSize={3} animationDuration={900}>
                      {scriptsByWeek.map((r) => <Cell key={r.w} fill={r.scripts ? colors.tt : '#E4DDD3'} />)}
                      <LabelList dataKey="scripts" position="top" style={{ fontSize: 12.5, fontWeight: 600, fill: '#1A1A2E' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </Reveal>
          <Reveal delay={0.1}>
            <ChartCard title="Planificado frente a publicado" subtitle="Brecha entre guiones y piezas reales" className="h-full">
              <div className="space-y-4 pt-1">
                <div>
                  <div className="flex justify-between text-[13.5px]"><span>Piezas publicadas</span><strong>36</strong></div>
                  <div className="mt-1 h-3.5 overflow-hidden rounded-full bg-cream"><div className="h-full w-full rounded-full" style={{ background: colors.ig }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[13.5px]"><span>Guiones registrados</span><strong>8</strong></div>
                  <div className="mt-1 h-3.5 overflow-hidden rounded-full bg-cream"><div className="h-full rounded-full" style={{ width: '22.2%', background: colors.tt }} /></div>
                </div>
                <div className="rounded-xl bg-rose/25 px-4 py-3">
                  <p className="font-display text-[34px] font-semibold leading-none text-[#7a3a3a]">{derived.withoutScript}</p>
                  <p className="mt-1 text-[13.5px] text-body">piezas publicadas sin guion registrado en el portal (78% del total).</p>
                </div>
              </div>
            </ChartCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
