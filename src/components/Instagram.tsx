import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, LabelList, Legend, Line, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard, MiniStat, PlatformIcon, Reveal, SectionTitle, tooltipStyle } from './ui'
import { colors, igAccount, igEngagement, igInsights, igPosts, igTop, profile } from '../data/auditData'
import { useMedia } from './useMedia'

const typeData = [
  { name: 'Reels', value: 86.8, fill: colors.igSoft },
  { name: 'Historias', value: 13.2, fill: colors.ttSoft },
]

export default function Instagram() {
  const narrow = useMedia('(max-width: 640px)')
  return (
    <section id="instagram" className="bg-white/50 py-14 md:py-[72px]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <SectionTitle eyebrow="Instagram" title="Instagram alcanza audiencia fuera de la cuenta, pero con interacción mínima." />

        <div className="grid gap-4 lg:grid-cols-[2fr_3fr]">
          <Reveal>
            <div className="card h-full">
              <div className="flex items-center gap-4">
                <img src="/img/avatar.jpg" alt="Foto de perfil de @_javierlamas" width={88} height={88} className="h-[88px] w-[88px] rounded-full border-[3px] border-lav object-cover" loading="lazy" />
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-sans text-[17px] font-bold">_javierlamas <PlatformIcon platform="instagram" size={14} /></p>
                  <p className="text-[14px] text-body">{profile.name} | {profile.bio}</p>
                </div>
              </div>
              <p className="mt-3 text-[13.5px] leading-snug text-body">{profile.tagline}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[[profile.posts, 'publicaciones'], [profile.followers, 'seguidores'], [profile.following, 'seguidos']].map(([n, l]) => (
                  <div key={l as string} className="rounded-xl bg-cream py-2.5">
                    <p className="font-display text-[24px] font-semibold leading-none">{n}</p>
                    <p className="mt-1 text-[12px] text-muted">{l}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[12.5px] text-muted">Cuenta activa hace ~1 mes: la ventana de 90 días cubre prácticamente todo su historial.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {igInsights.map((d, i) => (
              <Reveal key={d.days} delay={i * 0.05}>
                <div className="card !p-4 h-full">
                  <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Últimos {d.days} días</p>
                  <p className="mt-1 font-display text-[30px] font-semibold leading-none">{d.views.toLocaleString('en-US')}</p>
                  <p className="text-[13px] text-body">visualizaciones · {d.viewers} espectadores</p>
                  <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-cream" role="img" aria-label={`${d.followers}% seguidores y ${d.nonFollowers}% no seguidores`}>
                    <div style={{ width: `${d.followers}%`, background: colors.igSoft }} />
                    <div style={{ width: `${d.nonFollowers}%`, background: colors.ttSoft }} />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[12.5px]">
                    <span className="text-[#5a6c99]">■ Seguidores {d.followers}%</span>
                    <span className="text-[#8a6f48]">▲ No seg. {d.nonFollowers}%</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[3fr_2fr]">
          <Reveal>
            <ChartCard title="Vistas por publicación, en orden cronológico" subtitle="Barras: vistas (oscuro = 96 o más) · línea: % de vistas de seguidores" className="h-full">
              <div className="h-[300px]" role="img" aria-label="Gráfico combinado de las 18 publicaciones de Instagram: vistas por pieza entre 28 y 116, y porcentaje de seguidores.">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={igPosts} margin={{ top: 14, right: 4, left: -14, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" vertical={false} />
                    <XAxis dataKey="n" tick={{ fontSize: 11.5, fill: '#5C5C5C' }} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="l" tick={{ fontSize: 12, fill: '#5C5C5C' }} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="r" orientation="right" domain={[0, 100]} tick={{ fontSize: 12, fill: '#5C5C5C' }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} width={40} />
                    <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} labelStyle={{ color: '#C4A882' }} cursor={{ fill: 'rgba(0,0,0,0.04)' }} labelFormatter={(_, p) => (p?.[0]?.payload ? `#${p[0].payload.n} · ${p[0].payload.d} · ${p[0].payload.t}` : '')} />
                    <Legend verticalAlign="top" align="left" wrapperStyle={{ fontSize: 13, top: -6 }} />
                    <Bar yAxisId="l" name="Vistas" dataKey="views" fill={colors.igSoft} radius={[4, 4, 0, 0]} animationDuration={900}>
                      {igPosts.map((p) => <Cell key={p.n} fill={p.views >= 96 ? colors.ig : colors.igSoft} />)}
                    </Bar>
                    <Line yAxisId="r" name="% seguidores" dataKey="fol" stroke={colors.tt} strokeWidth={2.5} dot={{ r: 3, fill: colors.tt }} animationDuration={1100} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </Reveal>
          <Reveal delay={0.1}>
            <ChartCard title="Crecimiento por ventana de tiempo" subtitle="Visualizaciones, espectadores y visitas al perfil" className="h-full">
              <div className="h-[300px]" role="img" aria-label="Barras agrupadas por ventana de 7, 14, 30 y 90 días: visualizaciones 198, 382, 736, 1198; espectadores 49, 143, 202, 308; visitas al perfil 21, 35, 70, 128.">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={igAccount} margin={{ top: 14, right: 4, left: -14, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" vertical={false} />
                    <XAxis dataKey="w" tick={{ fontSize: 12, fill: '#5C5C5C' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#5C5C5C' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                    <Legend verticalAlign="top" align="left" iconType="square" wrapperStyle={{ fontSize: 12.5, top: -6 }} />
                    <Bar name="Visualizaciones" dataKey="views" fill={colors.ig} radius={[4, 4, 0, 0]} animationDuration={900} />
                    <Bar name="Espectadores" dataKey="viewers" fill={colors.igSoft} radius={[4, 4, 0, 0]} animationDuration={900} />
                    <Bar name="Visitas al perfil" dataKey="visits" fill={colors.ttSoft} radius={[4, 4, 0, 0]} animationDuration={900} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <Reveal>
            <ChartCard title="Top 5 publicaciones por vistas" subtitle="Instagram · vistas acumuladas" right={<PlatformIcon platform="instagram" />} className="h-full">
              <div className="h-[260px]" role="img" aria-label="Gráfico de barras horizontales: Evolución mandíbula 116 vistas, Ranking 1-7 errores 100, Sonrisa bonita 96, La razón número uno 93, Sin caption 66.">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={igTop} layout="vertical" margin={{ top: 0, right: 36, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" horizontal={false} />
                    <XAxis type="number" hide domain={[0, 130]} />
                    <YAxis type="category" dataKey="short" width={narrow ? 104 : 128} tick={{ fontSize: 12.5, fill: '#1A1A2E' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} cursor={{ fill: 'rgba(0,0,0,0.04)' }} labelFormatter={(_, p) => p?.[0]?.payload?.title ?? ''} formatter={(v) => [v, 'Vistas']} />
                    <Bar dataKey="views" fill={colors.igSoft} radius={[0, 6, 6, 0]} barSize={24} animationDuration={1000}>
                      <LabelList dataKey="views" position="right" style={{ fontSize: 12.5, fontWeight: 600, fill: '#1A1A2E' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </Reveal>
          <Reveal delay={0.06}>
            <ChartCard title="Vistas por tipo de contenido" subtitle="Ventana de 30 y 90 días" className="h-full">
              <div className="relative h-[200px]" role="img" aria-label="Dona: Reels 86.8% de las visualizaciones, Historias 13.2%.">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={typeData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80} paddingAngle={3} stroke="none" animationDuration={1000}>
                      {typeData.map((t) => <Cell key={t.name} fill={t.fill} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} formatter={(v) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-display text-[26px] font-semibold leading-none">86.8%</p>
                  <p className="text-[12px] text-muted">Reels</p>
                </div>
              </div>
              <p className="text-[13px] text-muted">Las Historias aportan 13.2% de las visualizaciones, pero no se auditan una a una: el archivo de exportación estaba vacío.</p>
            </ChartCard>
          </Reveal>
          <Reveal delay={0.12}>
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
