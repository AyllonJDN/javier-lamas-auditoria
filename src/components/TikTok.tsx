import { Bar, BarChart, CartesianGrid, Cell, LabelList, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react'
import { Badge, ChartCard, InsightCard, MiniStat, Num, PlatformIcon, Reveal, SectionTitle, tooltipStyle } from './ui'
import { colors, derived, fmt, platformCompare, sameTopic, ttPosts, ttTotals, ttViral } from '../data/auditData'

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
            <img src="/img/doctor-consulta.jpg" alt="Dr. Javier Lamas en consulta, cuadro del video" width={457} height={811} loading="lazy"
              className="absolute bottom-0 right-0 hidden h-full max-h-[420px] w-[34%] rounded-tl-3xl object-cover object-top opacity-95 md:block" />
            <div className="relative md:pr-[36%]">
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


      <div className="mt-4 grid gap-4 lg:grid-cols-[3fr_2fr]">
        <Reveal>
          <ChartCard title="Las 18 publicaciones de TikTok, en orden cronológico" subtitle="Una pieza se aleja del resto; las demás se mueven entre 148 y 728 vistas" className="h-full">
            <div className="h-[300px]" role="img" aria-label="Barras de vistas de los 18 videos de TikTok. El video 18, del 7 de octubre, alcanza 4,883 vistas; el resto está entre 148 y 728. La mediana es 395.">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ttPosts} margin={{ top: 18, right: 12, left: -8, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="n" tick={{ fontSize: 11.5, fill: '#5C5C5C' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#5C5C5C' }} tickLine={false} axisLine={false} tickFormatter={(v) => (v as number).toLocaleString('en-US')} />
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} labelStyle={{ color: '#C4A882' }} cursor={{ fill: 'rgba(0,0,0,0.04)' }} labelFormatter={(_, p) => (p?.[0]?.payload ? `#${p[0].payload.n} · ${p[0].payload.d} · ${p[0].payload.t}` : '')} formatter={(v) => [(v as number).toLocaleString('en-US'), 'Vistas']} />
                  <ReferenceLine y={395} stroke="#1A1A2E" strokeDasharray="5 4" label={{ value: 'Mediana 395', position: 'insideTopLeft', dy: -9, fontSize: 12, fill: '#1A1A2E' }} />
                  <Bar dataKey="views" radius={[4, 4, 0, 0]} animationDuration={1000}>
                    {ttPosts.map((p) => <Cell key={p.n} fill={p.views > 4000 ? colors.tt : colors.ttSoft} fillOpacity={p.views > 4000 ? 1 : 0.7} />)}
                    <LabelList dataKey="views" content={({ x, y, width, value }) => (Number(value) > 4000
                      ? <text x={(x as number) + (width as number) / 2} y={(y as number) - 6} textAnchor="middle" fontSize={12.5} fontWeight={700} fill="#1A1A2E">4,883</text>
                      : null)} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </Reveal>
        <Reveal delay={0.1}>
          <ChartCard title="Mismo tema, dos plataformas" subtitle="Cuántas veces más vistas tuvo TikTok que Instagram con la misma idea" className="h-full">
            <div className="h-[300px]" role="img" aria-label="Barras horizontales del múltiplo de vistas TikTok sobre Instagram por tema: universidad 122 veces, oído 19, clic 11.6, evolución 3.5 y 10.3, molestias 9, sonrisa 3.1.">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[...sameTopic].sort((a, b) => b.mult - a.mult)} layout="vertical" margin={{ top: 0, right: 44, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide domain={[0, 140]} />
                  <YAxis type="category" dataKey="tema" width={178} tick={{ fontSize: 12, fill: '#1A1A2E' }} tickLine={false} axisLine={false} interval={0} />
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} cursor={{ fill: 'rgba(0,0,0,0.04)' }} formatter={(_, __, item) => [`IG ${item.payload.ig} → TikTok ${item.payload.tt.toLocaleString('en-US')}`, 'Vistas']} />
                  <Bar dataKey="mult" fill={colors.ttSoft} radius={[0, 6, 6, 0]} barSize={20} animationDuration={1000}>
                    <LabelList dataKey="mult" position="right" formatter={(v) => `${v}×`} style={{ fontSize: 12.5, fontWeight: 700, fill: '#1A1A2E' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Reveal className="h-full"><InsightCard n="↗" tone="#C4A882" title={`Mediana de TikTok: 395 vistas`} text="Es el rendimiento típico de una pieza; el promedio de 636 está inflado por un solo video." /></Reveal>
        <Reveal delay={0.06} className="h-full"><InsightCard n="2" tone="#B8C8E8" title={`Sin el viral: ${derived.ttMeanNoViral} vistas de promedio`} text="Aun así, es casi 7 veces el promedio de Instagram (58)." /></Reveal>
        <Reveal delay={0.12} className="h-full"><InsightCard n="%" tone="#A8D5BA" title="Me gusta por cada 100 vistas" text={`Instagram ${derived.likesPer100.instagram} · TikTok ${derived.likesPer100.tiktok}. El alcance de TikTok no se traduce en mayor interacción relativa.`} /></Reveal>
      </div>

      <Reveal className="mt-4">
        <ChartCard title="Instagram frente a TikTok" subtitle="Cada métrica usa su propia escala para que ninguna quede invisible">
          <div className="grid gap-4 md:grid-cols-3">
            {miniCharts.map((m) => {
              const data = [
                { name: 'Instagram', value: m.data.instagram, fill: colors.ig },
                { name: 'TikTok', value: m.data.tiktok, fill: colors.tt },
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
