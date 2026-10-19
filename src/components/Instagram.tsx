import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, LabelList, Legend, Line, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ChartCard, Lazy, MiniStat, PlatformIcon, Reveal, Section, SectionTitle, ax, grid, legend, tip } from './ui'
import { colors, igAccount, igEngagement, igInsights, igPosts, igStoriesPct, igTop, links, profile } from '../data/auditData'
import { useMedia } from './useMedia'

const typeData = [
  { name: 'Reels', value: Math.round((100 - igStoriesPct) * 10) / 10, fill: colors.ig },
  { name: 'Historias', value: igStoriesPct, fill: colors.tt },
]

export default function Instagram() {
  const narrow = useMedia('(max-width: 640px)')
  return (
    <Section id="instagram" tone="grape" decor={{ name: 'probe', className: '-left-6 bottom-10 rotate-[20deg] text-peri/25' }}>
      <SectionTitle n="03" eyebrow="Instagram" title="Alcanza audiencia *fuera* de la cuenta, pero con interacción mínima." />

      <div className="grid gap-4 lg:grid-cols-[2fr_3fr]">
        <Reveal className="h-full">
          <div className="card h-full overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-coral/30 via-peri/20 to-transparent" aria-hidden />
            <div className="relative flex items-center gap-4">
              <div className="rounded-full bg-gradient-to-tr from-coral via-peri to-olive p-[3px]">
                <img src="/img/avatar.jpg" alt="Foto de perfil de @_javierlamas" width={88} height={88} className="h-[88px] w-[88px] rounded-full border-[3px] border-grape-deep object-cover" loading="lazy" />
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-sans text-[18px] font-bold">_javierlamas <PlatformIcon platform="instagram" size={14} /></p>
                <p className="text-[14px] text-cream/70">{profile.name} | {profile.bio}</p>
              </div>
            </div>
            <p className="relative mt-4 text-[13.5px] leading-snug text-cream/65">{profile.tagline}</p>
            <div className="relative mt-4 grid grid-cols-3 gap-2 text-center">
              {[[profile.posts, 'publicaciones'], [profile.followers, 'seguidores'], [profile.following, 'seguidos']].map(([n, l]) => (
                <div key={l as string} className="rounded-xl border border-cream/10 bg-cream/[0.06] py-2.5">
                  <p className="font-display text-[30px] font-light leading-none">{n}</p>
                  <p className="mt-1 text-[12px] text-cream/55">{l}</p>
                </div>
              ))}
            </div>
            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="relative mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-coral hover:underline">
              Ver el perfil <ArrowUpRight size={14} aria-hidden />
            </a>
            <p className="relative mt-3 text-[12.5px] text-cream/45">Cuenta activa desde septiembre: la ventana de 90 días cubre todo su historial.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {igInsights.map((d, i) => (
            <Reveal key={d.days} delay={i * 0.06} className="h-full">
              <div className="card h-full !p-4">
                <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-cream/55">Últimos {d.days} días</p>
                <p className="mt-1 font-display text-[44px] font-light leading-none">{d.views.toLocaleString('en-US')}</p>
                <p className="text-[13px] text-cream/65">visualizaciones · {d.viewers} espectadores</p>
                <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-cream/10" role="img" aria-label={`${d.followers}% seguidores y ${d.nonFollowers}% no seguidores`}>
                  <motion.div style={{ background: colors.ig }} initial={{ width: 0 }} whileInView={{ width: `${d.followers}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 }} />
                  <motion.div style={{ background: colors.tt }} initial={{ width: 0 }} whileInView={{ width: `${d.nonFollowers}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 }} />
                </div>
                <div className="mt-1.5 flex justify-between text-[12.5px]">
                  <span style={{ color: colors.ig }}>● Seguidores {d.followers}%</span>
                  <span style={{ color: colors.tt }}>● No seg. {d.nonFollowers}%</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[3fr_2fr]">
        <Reveal className="h-full">
          <ChartCard title="Vistas por publicación, en orden cronológico" subtitle="Barras: vistas (brillante = 96 o más) · línea: % de vistas de seguidores" className="h-full">
            <Lazy className="h-[320px]">
              <div className="h-full w-full" role="img" aria-label={`Gráfico combinado de las ${igPosts.length} publicaciones de Instagram: vistas por pieza entre ${Math.min(...igPosts.map((p) => p.views))} y ${Math.max(...igPosts.map((p) => p.views))}, y porcentaje de seguidores.`}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={igPosts} margin={{ top: 14, right: 4, left: -14, bottom: 0 }}>
                    <CartesianGrid {...grid} vertical={false} />
                    <XAxis dataKey="n" {...ax} tick={{ fontSize: 11.5, fill: '#CDBCC6' }} />
                    <YAxis yAxisId="l" {...ax} />
                    <YAxis yAxisId="r" orientation="right" domain={[0, 100]} {...ax} tickFormatter={(v) => `${v}%`} width={40} />
                    <Tooltip {...tip} labelFormatter={(_, p) => (p?.[0]?.payload ? `#${p[0].payload.n} · ${p[0].payload.d} · ${p[0].payload.t}` : '')} />
                    <Legend {...legend} />
                    <Bar yAxisId="l" name="Vistas" dataKey="views" radius={[5, 5, 0, 0]} animationDuration={1300}>
                      {igPosts.map((p) => <Cell key={p.n} fill={p.views >= 96 ? colors.ig : colors.igSoft} />)}
                    </Bar>
                    <Line yAxisId="r" name="% seguidores" dataKey="fol" stroke={colors.tt} strokeWidth={2.5} dot={{ r: 3.5, fill: colors.tt, strokeWidth: 0 }} animationDuration={1600} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </Lazy>
          </ChartCard>
        </Reveal>
        <Reveal delay={0.1} className="h-full">
          <ChartCard title="Crecimiento por ventana de tiempo" subtitle="Visualizaciones, espectadores y visitas al perfil" className="h-full">
            <Lazy className="h-[320px]">
              <div className="h-full w-full" role="img" aria-label="Barras agrupadas por ventana de 7, 14, 30 y 90 días: visualizaciones 198, 382, 736, 1198; espectadores 49, 143, 202, 308; visitas al perfil 21, 35, 70, 128.">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={igAccount} margin={{ top: 14, right: 4, left: -14, bottom: 0 }}>
                    <CartesianGrid {...grid} vertical={false} />
                    <XAxis dataKey="w" {...ax} />
                    <YAxis {...ax} />
                    <Tooltip {...tip} />
                    <Legend {...legend} iconType="square" />
                    <Bar name="Visualizaciones" dataKey="views" fill={colors.ig} radius={[4, 4, 0, 0]} animationDuration={1300} />
                    <Bar name="Espectadores" dataKey="viewers" fill={colors.tt} radius={[4, 4, 0, 0]} animationDuration={1300} />
                    <Bar name="Visitas al perfil" dataKey="visits" fill={colors.olive} radius={[4, 4, 0, 0]} animationDuration={1300} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Lazy>
          </ChartCard>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Reveal className="h-full">
          <ChartCard title="Top 5 publicaciones por vistas" subtitle="Instagram · vistas acumuladas" right={<PlatformIcon platform="instagram" />} className="h-full">
            <Lazy className="h-[260px]">
              <div className="h-full w-full" role="img" aria-label="Gráfico de barras horizontales: Evolución mandíbula 116 vistas, Ranking 1-7 errores 100, Sonrisa bonita 96, La razón número uno 93, Sin caption 66.">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={igTop} layout="vertical" margin={{ top: 0, right: 36, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide domain={[0, 130]} />
                    <YAxis type="category" dataKey="short" width={narrow ? 104 : 128} {...ax} tick={{ fontSize: 12.5, fill: '#FFFAF5' }} />
                    <Tooltip {...tip} labelFormatter={(_, p) => p?.[0]?.payload?.title ?? ''} formatter={(v) => [v, 'Vistas']} />
                    <Bar dataKey="views" fill={colors.ig} radius={[0, 8, 8, 0]} barSize={24} animationDuration={1300}>
                      <LabelList dataKey="views" position="right" style={{ fontSize: 12.5, fontWeight: 700, fill: '#FFFAF5' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Lazy>
          </ChartCard>
        </Reveal>
        <Reveal delay={0.06} className="h-full">
          <ChartCard title="Vistas por tipo de contenido" subtitle="Ventana de 90 días" className="h-full">
            <Lazy className="relative h-[200px]">
              <div className="h-full w-full" role="img" aria-label={`Dona: Reels ${typeData[0].value}% de las visualizaciones, Historias ${igStoriesPct}%.`}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={typeData} dataKey="value" nameKey="name" innerRadius={56} outerRadius={84} paddingAngle={3} cornerRadius={6} stroke="none" animationDuration={1400}>
                      {typeData.map((t) => <Cell key={t.name} fill={t.fill} />)}
                    </Pie>
                    <Tooltip {...tip} formatter={(v) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-display text-[34px] font-light leading-none">{typeData[0].value}%</p>
                <p className="text-[12px] text-cream/55">Reels</p>
              </div>
            </Lazy>
            <p className="mt-2 text-[13px] text-cream/55">Las Historias aportan {igStoriesPct}% de las visualizaciones, pero no se auditan una a una: el archivo de exportación estaba vacío.</p>
          </ChartCard>
        </Reveal>
        <Reveal delay={0.12} className="h-full">
          <ChartCard title="Interacción acumulada" subtitle={`${igPosts.length} publicaciones de Instagram`} className="h-full">
            <div className="grid grid-cols-2 gap-3">
              <MiniStat label="Me gusta" value={String(igEngagement.likes)} />
              <MiniStat label="Comentarios" value={String(igEngagement.comments)} />
              <MiniStat label="Compartidos" value={String(igEngagement.shares)} />
              <MiniStat label="Seguidores" value={String(igEngagement.followers)} />
            </div>
            <p className="mt-5 border-l-2 border-coral pl-4 font-display text-[22px] italic leading-snug">
              El alcance existe, pero la interacción continúa en una escala reducida.
            </p>
          </ChartCard>
        </Reveal>
      </div>
    </Section>
  )
}
