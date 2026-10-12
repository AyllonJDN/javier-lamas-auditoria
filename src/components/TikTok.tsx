import { Bar, BarChart, CartesianGrid, Cell, LabelList, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion } from 'framer-motion'
import { Bookmark, Heart, MessageCircle, Play, Share2 } from 'lucide-react'
import { Badge, ChartCard, InsightCard, Lazy, MiniStat, Num, PlatformIcon, Reveal, Section, SectionTitle, Tilt, ax, grid, tip } from './ui'
import { colors, derived, fmt, platformCompare, sameTopic, ttPosts, ttTotals, ttViral } from '../data/auditData'

const miniCharts = [
  { key: 'views', title: 'Vistas', data: platformCompare.views },
  { key: 'likes', title: 'Me gusta', data: platformCompare.likes },
  { key: 'comments', title: 'Comentarios', data: platformCompare.comments },
] as const

const phoneStats = [
  [Heart, ttViral.likes],
  [MessageCircle, ttViral.comments],
  [Share2, ttViral.shares],
  [Bookmark, ttViral.saves],
] as const

const bars = [
  { l: 'Este video', v: 4883, c: colors.tt },
  { l: 'Mediana de TikTok', v: 395, c: colors.olive },
  { l: 'Mejor pieza de Instagram', v: 116, c: colors.ig },
]

function PhoneMock() {
  return (
    <Tilt className="mx-auto w-full max-w-[290px]">
      <div className="relative aspect-[9/17] overflow-hidden rounded-[38px] border-[7px] border-cream/90 bg-black shadow-[0_40px_80px_-20px_rgba(0,0,0,.7)]">
        <img src="/img/doctor-consulta.jpg" alt="Fotograma del video: el Dr. Javier Lamas hablando a cámara en su consultorio" width={457} height={811} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/30" />
        <span className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black/85" aria-hidden />
        <div className="absolute left-4 top-9 flex items-center gap-2 text-cream"><Play size={12} className="fill-current" aria-hidden /><span className="text-[12px] font-semibold">TikTok</span></div>
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
          <span className="pulse-ring absolute inset-0 rounded-full bg-coral/60" aria-hidden />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-coral text-grape-deep"><Play size={22} className="ml-0.5 fill-current" aria-hidden /></span>
        </div>
        <div className="absolute bottom-24 right-3 flex flex-col items-center gap-3.5 text-cream">
          {phoneStats.map(([Icon, v], i) => (
            <div key={i} className="flex flex-col items-center">
              <Icon size={22} aria-hidden /><span className="text-[11px] font-semibold tabular-nums">{v}</span>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 pr-14 text-cream">
          <p className="text-[13px] font-semibold">@_javierlamas</p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-cream/85">{ttViral.title}</p>
        </div>
      </div>
    </Tilt>
  )
}

export default function TikTok() {
  return (
    <Section id="tiktok" tone="light" decor={{ name: 'forceps', className: '-right-8 top-16 rotate-[24deg] text-grape/15' }}>
      <SectionTitle tone="light" n="04" eyebrow="TikTok y comparativa" title="Un solo video concentra *4,883* vistas: 12 veces la mediana de TikTok." />

      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <Reveal className="h-full">
          <div className="card grid h-full items-center gap-8 overflow-hidden !p-6 md:grid-cols-[290px_1fr] md:!p-8">
            <span className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-coral/25 blur-3xl" aria-hidden />
            <PhoneMock />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <PlatformIcon platform="tiktok" />
                <Badge tone="coral">{ttViral.multiple}× la mediana</Badge>
                <span className="text-[13px] text-cream/60">Publicado el {ttViral.date}</span>
              </div>
              <p className="mt-4 font-display text-[88px] font-light leading-none text-coral md:text-[112px]"><Num value={ttViral.views} /></p>
              <p className="-mt-1 text-[14px] text-cream/60">vistas · {derived.viralSharePct}% de todas las vistas combinadas</p>
              <p className="mt-4 font-display text-[28px] italic leading-snug">“{ttViral.title}”</p>
              <div className="mt-6 space-y-3.5">
                {bars.map((b, i) => (
                  <div key={b.l}>
                    <div className="flex justify-between text-[13px]"><span className="text-cream/70">{b.l}</span><strong className="tabular-nums">{b.v.toLocaleString('en-US')}</strong></div>
                    <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-cream/10">
                      <motion.div className="h-full rounded-full" style={{ background: b.c }} initial={{ width: 0 }} whileInView={{ width: `${Math.max((b.v / 4883) * 100, 2.5)}%` }} viewport={{ once: true }} transition={{ duration: 1.3, delay: 0.2 + i * 0.15, ease: [0.2, 0.7, 0.2, 1] }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="h-full">
          <ChartCard title="Total TikTok" subtitle="18 publicaciones" right={<PlatformIcon platform="tiktok" />} className="h-full">
            <p className="font-display text-[68px] font-light leading-none"><Num value={ttTotals.views} /></p>
            <p className="mb-5 text-[13px] text-cream/55">vistas totales</p>
            <div className="grid grid-cols-3 gap-2.5">
              <MiniStat label="Me gusta" value={fmt(ttTotals.likes)} />
              <MiniStat label="Coment." value={fmt(ttTotals.comments)} />
              <MiniStat label="Piezas" value={fmt(ttTotals.pieces)} />
            </div>
            <p className="mt-5 text-[13px] text-cream/50">Compartidos y guardados solo están disponibles para parte de los videos: se muestran “—” cuando no hay dato.</p>
          </ChartCard>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[3fr_2fr]">
        <Reveal className="h-full">
          <ChartCard title="Las 18 publicaciones de TikTok, en orden cronológico" subtitle="Una pieza se aleja del resto; las demás se mueven entre 148 y 728 vistas" className="h-full">
            <Lazy className="h-[320px]">
              <div className="h-full w-full" role="img" aria-label="Barras de vistas de los 18 videos de TikTok. El video 18, del 7 de octubre, alcanza 4,883 vistas; el resto está entre 148 y 728. La mediana es 395.">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ttPosts} margin={{ top: 22, right: 12, left: -8, bottom: 0 }}>
                    <CartesianGrid {...grid} vertical={false} />
                    <XAxis dataKey="n" {...ax} tick={{ fontSize: 11.5, fill: '#CDBCC6' }} />
                    <YAxis {...ax} tickFormatter={(v) => (v as number).toLocaleString('en-US')} />
                    <Tooltip {...tip} labelFormatter={(_, p) => (p?.[0]?.payload ? `#${p[0].payload.n} · ${p[0].payload.d} · ${p[0].payload.t}` : '')} formatter={(v) => [(v as number).toLocaleString('en-US'), 'Vistas']} />
                    <ReferenceLine y={395} stroke="#FFFAF5" strokeDasharray="5 4" strokeOpacity={0.7} label={{ value: 'Mediana 395', position: 'insideTopLeft', dy: -9, fontSize: 12, fill: '#FFFAF5' }} />
                    <Bar dataKey="views" radius={[5, 5, 0, 0]} animationDuration={1500}>
                      {ttPosts.map((p) => <Cell key={p.n} fill={p.views > 4000 ? colors.tt : colors.ttSoft} />)}
                      <LabelList dataKey="views" content={({ x, y, width, value }) => (Number(value) > 4000
                        ? <text x={(x as number) + (width as number) / 2} y={(y as number) - 8} textAnchor="middle" fontSize={13} fontWeight={700} fill="#FFFAF5">4,883</text>
                        : null)} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Lazy>
          </ChartCard>
        </Reveal>
        <Reveal delay={0.1} className="h-full">
          <ChartCard title="Mismo tema, dos plataformas" subtitle="Cuántas veces más vistas tuvo TikTok que Instagram con la misma idea" className="h-full">
            <Lazy className="h-[320px]">
              <div className="h-full w-full" role="img" aria-label="Barras horizontales del múltiplo de vistas TikTok sobre Instagram por tema: universidad 122 veces, oído 19, clic 11.6, evolución 3.5 y 10.3, molestias 9, sonrisa 3.1.">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[...sameTopic].sort((a, b) => b.mult - a.mult)} layout="vertical" margin={{ top: 0, right: 48, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide domain={[0, 140]} />
                    <YAxis type="category" dataKey="tema" width={168} {...ax} tick={{ fontSize: 12, fill: '#FFFAF5' }} interval={0} />
                    <Tooltip {...tip} formatter={(_, __, item) => [`IG ${item.payload.ig} → TikTok ${item.payload.tt.toLocaleString('en-US')}`, 'Vistas']} />
                    <Bar dataKey="mult" fill={colors.tt} radius={[0, 8, 8, 0]} barSize={20} animationDuration={1400}>
                      <LabelList dataKey="mult" position="right" formatter={(v) => `${v}×`} style={{ fontSize: 12.5, fontWeight: 700, fill: '#FFFAF5' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Lazy>
          </ChartCard>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Reveal className="h-full"><InsightCard n="1" tone={colors.tt} title="Mediana de TikTok: 395 vistas" text="Es el rendimiento típico de una pieza; el promedio de 636 está inflado por un solo video." /></Reveal>
        <Reveal delay={0.06} className="h-full"><InsightCard n="2" tone={colors.ig} title={`Sin el viral: ${derived.ttMeanNoViral} vistas de promedio`} text="Aun así, es casi 7 veces el promedio de Instagram (58)." /></Reveal>
        <Reveal delay={0.12} className="h-full"><InsightCard n="3" tone={colors.olive} title="Me gusta por cada 100 vistas" text={`Instagram ${derived.likesPer100.instagram} · TikTok ${derived.likesPer100.tiktok}. El alcance de TikTok no se traduce en mayor interacción relativa.`} /></Reveal>
      </div>

      <Reveal className="mt-4">
        <ChartCard title="Instagram frente a TikTok" subtitle="Cada métrica usa su propia escala para que ninguna quede invisible">
          <div className="grid gap-6 md:grid-cols-3">
            {miniCharts.map((m) => {
              const data = [
                { name: 'Instagram', value: m.data.instagram, fill: colors.ig },
                { name: 'TikTok', value: m.data.tiktok, fill: colors.tt },
              ]
              return (
                <div key={m.key}>
                  <p className="mb-1 font-sans text-[13.5px] font-semibold">{m.title}</p>
                  <Lazy className="h-[170px]">
                    <div className="h-full w-full" role="img" aria-label={`${m.title}: Instagram ${fmt(m.data.instagram)}, TikTok ${fmt(m.data.tiktok)}`}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 22, right: 8, left: 8, bottom: 0 }}>
                          <CartesianGrid {...grid} vertical={false} />
                          <XAxis dataKey="name" {...ax} tick={{ fontSize: 12.5, fill: '#CDBCC6' }} />
                          <YAxis hide domain={[0, 'dataMax']} />
                          <Tooltip {...tip} formatter={(v) => [fmt(v as number), m.title]} />
                          <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={56} animationDuration={1300}>
                            {data.map((d) => <Cell key={d.name} fill={d.fill} />)}
                            <LabelList dataKey="value" position="top" formatter={(v) => fmt(v as number)} style={{ fontSize: 13, fontWeight: 700, fill: '#FFFAF5' }} />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Lazy>
                </div>
              )
            })}
          </div>
        </ChartCard>
      </Reveal>
    </Section>
  )
}
