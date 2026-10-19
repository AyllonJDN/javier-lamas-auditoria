import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion } from 'framer-motion'
import { Copy } from 'lucide-react'
import { Badge, ChartCard, Lazy, Num, PlatformIcon, Reveal, Section, SectionTitle, TimelineWeek, ax, grid, tip } from './ui'
import { colors, derived, editorial, scriptsByWeek, totals } from '../data/auditData'

export default function Editorial() {
  return (
    <Section id="editorial" tone="light" decor={{ name: 'tooth', className: '-right-6 top-20 rotate-12 text-grape/15' }}>
      <SectionTitle tone="light" n="06" eyebrow="Sistema editorial" title={`Los guiones registrados cubren solo las semanas *1 y 2* de ${totals.portalWeek}.`} />
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal className="h-full">
          <div className="card h-full">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-display text-[72px] font-light leading-none"><Num value={editorial.scripts} /></p>
                <p className="mt-1 text-[14px] text-cream/65">Guiones registrados</p>
              </div>
              <div>
                <p className="font-display text-[72px] font-light leading-none text-coral"><Num value={editorial.published} /></p>
                <p className="mt-1 text-[14px] text-cream/65">Piezas publicadas</p>
              </div>
            </div>
            <div className="mt-7 flex gap-1 sm:gap-2" role="list" aria-label="Línea de tiempo de semanas 1 a 10">
              {editorial.weeks.map((w) => (
                <div key={w.n} role="listitem" className="flex flex-1 justify-center">
                  <TimelineWeek n={w.n} registered={w.registered} />
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-cream/50">
              <span>● Relleno: guiones registrados</span>
              <span>○ Contorno: sin registro</span>
            </div>
            <p className="mt-6 border-l-2 border-coral pl-4 font-display text-[24px] italic leading-snug">
              La ejecución continuó; la planificación documentada no.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="h-full">
          <div className="card h-full overflow-hidden !border-coral/40">
            <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral/25 blur-3xl" aria-hidden />
            <div className="relative flex items-center gap-2">
              <Copy size={18} className="text-coral" aria-hidden />
              <Badge tone="coral">Observación editorial</Badge>
            </div>
            <h3 className="relative mt-4 font-display text-[36px] font-light leading-none">Contenido <em className="text-peri">duplicado</em></h3>
            <ul className="relative mt-5 space-y-3">
              <li className="flex gap-3 rounded-xl border border-cream/10 bg-cream/[0.06] p-4">
                <PlatformIcon platform="instagram" />
                <div>
                  <p className="font-sans text-[14px] font-semibold">Instagram · dos piezas</p>
                  <p className="text-[14.5px] text-cream/70">Mismo tema: evolución de mandíbula / dientes chuecos.</p>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl border border-cream/10 bg-cream/[0.06] p-4">
                <PlatformIcon platform="tiktok" />
                <div>
                  <p className="font-sans text-[14px] font-semibold">TikTok · dos publicaciones</p>
                  <p className="text-[14.5px] text-cream/70">Caption idéntico sobre el mismo tema.</p>
                </div>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Reveal className="h-full">
          <ChartCard title="Guiones registrados por semana del plan" subtitle={`Portal de cliente · semanas 1 a ${totals.portalWeek} de ${totals.planWeeks}`} className="h-full">
            <Lazy className="h-[230px]">
              <div className="h-full w-full" role="img" aria-label="Barras de guiones registrados por semana: 4 en la semana 1, 4 en la semana 2 y ninguno de la semana 3 a la 10.">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scriptsByWeek} margin={{ top: 20, right: 8, left: -24, bottom: 0 }}>
                    <CartesianGrid {...grid} vertical={false} />
                    <XAxis dataKey="w" {...ax} />
                    <YAxis {...ax} allowDecimals={false} domain={[0, 5]} />
                    <Tooltip {...tip} formatter={(v) => [v, 'Guiones']} />
                    <Bar dataKey="scripts" radius={[7, 7, 0, 0]} barSize={30} minPointSize={3} animationDuration={1300}>
                      {scriptsByWeek.map((r) => <Cell key={r.w} fill={r.scripts ? colors.tt : 'rgba(255,255,255,.14)'} />)}
                      <LabelList dataKey="scripts" position="top" style={{ fontSize: 13, fontWeight: 700, fill: '#FFFAF5' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Lazy>
          </ChartCard>
        </Reveal>
        <Reveal delay={0.1} className="h-full">
          <ChartCard title="Planificado frente a publicado" subtitle="Brecha entre guiones y piezas reales" className="h-full">
            <div className="space-y-5 pt-1">
              {[['Piezas publicadas', editorial.published, 100, colors.ig], ['Guiones registrados', editorial.scripts, (editorial.scripts / editorial.published) * 100, colors.tt]].map(([l, v, w, c]) => (
                <div key={l as string}>
                  <div className="flex justify-between text-[13.5px]"><span className="text-cream/70">{l}</span><strong>{v}</strong></div>
                  <div className="mt-1.5 h-3.5 overflow-hidden rounded-full bg-cream/10">
                    <motion.div className="h-full rounded-full" style={{ background: c as string }} initial={{ width: 0 }} whileInView={{ width: `${w}%` }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }} />
                  </div>
                </div>
              ))}
              <div className="rounded-2xl border border-coral/30 bg-coral/10 px-5 py-4">
                <p className="font-display text-[56px] font-light leading-none text-coral"><Num value={derived.withoutScript} /></p>
                <p className="mt-1 text-[14px] text-cream/75">piezas publicadas sin guion registrado en el portal ({derived.withoutScriptPct}% del total).</p>
              </div>
            </div>
          </ChartCard>
        </Reveal>
      </div>
    </Section>
  )
}
