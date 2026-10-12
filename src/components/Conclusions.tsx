import { ArrowUpRight, Music2 } from 'lucide-react'
import { InstagramIcon, MethodItem, Monogram, Reveal, Section, SectionTitle } from './ui'
import { Instrument, InstrumentRow } from './Instruments'
import { limitations, links, meta, sources } from '../data/auditData'

const columns = [
  { tag: 'Lo que funciona', text: 'TikTok muestra mayor capacidad de distribución.', color: '#B9AE6F' },
  { tag: 'Lo que aún no es repetible', text: 'La viralidad está concentrada en una pieza.', color: '#F47358' },
  { tag: 'Prioridad operativa', text: 'Recuperar trazabilidad entre guion, publicación y resultado.', color: '#C4D3F7' },
]

const recs = [
  'Retomar la guionización formal.',
  'Descomponer el formato del video de 4,883 vistas y probar variaciones.',
  'Evitar duplicaciones sin una hipótesis editorial explícita.',
  'Medir Instagram por señales de audiencia y formato, no solo volumen.',
]

export default function Conclusions() {
  return (
    <>
      <Section id="conclusiones" tone="grape" decor={{ name: 'mirror', className: '-right-8 top-16 -rotate-[20deg] text-peri/25' }}>
        <SectionTitle n="07" eyebrow="Conclusiones" title="La distribución existe; falta convertirla en un *sistema* repetible." />
        <div className="grid gap-4 md:grid-cols-3">
          {columns.map((c, i) => (
            <Reveal key={c.tag} delay={i * 0.08} className="h-full">
              <div className="card h-full overflow-hidden">
                <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: c.color }} aria-hidden />
                <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: c.color }}>{c.tag}</p>
                <p className="mt-3 font-display text-[28px] font-medium leading-[1.1]">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div role="list" className="mt-4 grid gap-3 sm:grid-cols-2">
          {recs.map((r, i) => (
            <Reveal key={r} delay={i * 0.06}>
              <div role="listitem" className="flex items-start gap-5 rounded-2xl border border-cream/10 bg-cream/[0.05] px-5 py-4 transition-colors hover:border-coral/50 hover:bg-cream/[0.09]">
                <span className="font-display text-[34px] italic leading-none text-coral">{String(i + 1).padStart(2, '0')}</span>
                <span className="pt-1 text-[15.5px] leading-snug">{r}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <InstrumentRow className="mt-16 text-peri" />
      </Section>

      <footer className="relative -mt-10 overflow-hidden rounded-t-[36px] bg-grape-deep text-cream md:-mt-14 md:rounded-t-[72px]">
        <Instrument name="caliper" size={260} strokeWidth={0.6} className="pointer-events-none absolute -bottom-10 right-4 -rotate-6 text-peri/15" />
        <div className="relative mx-auto max-w-[1320px] px-4 pb-10 pt-20 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Monogram size={46} className="text-peri" />
              <p className="mt-5 font-display text-[40px] font-light leading-[1.05] md:text-[56px]">Somos la <em className="text-peri">estrategia</em><br />detrás del talento.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-[14px] transition-colors hover:border-coral hover:bg-coral hover:text-grape-deep"><InstagramIcon size={16} /> {meta.handle} <ArrowUpRight size={14} aria-hidden /></a>
              <a href={links.tiktok} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-[14px] transition-colors hover:border-coral hover:bg-coral hover:text-grape-deep"><Music2 size={16} aria-hidden /> {meta.handle} <ArrowUpRight size={14} aria-hidden /></a>
            </div>
          </div>
          <div className="mt-12 border-t border-cream/10 pt-8">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-coral">Metodología</p>
            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_2fr]">
              <MethodItem title="Fuentes" items={sources} />
              <MethodItem title="Limitaciones" items={limitations} />
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-cream/10 pt-5 text-[13px] text-cream/50">
            <span className="font-display text-[20px] italic text-cream">Matiz</span>
            <span>Auditoría cuantitativa · Octubre 2026</span>
          </div>
        </div>
      </footer>
    </>
  )
}
