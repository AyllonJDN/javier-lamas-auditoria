import { Reveal, SectionTitle, MethodItem } from './ui'
import { limitations, sources } from '../data/auditData'

const columns = [
  { tag: 'Lo que funciona', text: 'TikTok muestra mayor capacidad de distribución.', color: '#A8D5BA' },
  { tag: 'Lo que aún no es repetible', text: 'La viralidad está concentrada en una pieza.', color: '#F2A7A7' },
  { tag: 'Prioridad operativa', text: 'Recuperar trazabilidad entre guion, publicación y resultado.', color: '#B8C8E8' },
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
      <section id="conclusiones" className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 md:py-[72px]">
        <SectionTitle eyebrow="Conclusiones" title="La distribución existe; falta convertirla en un sistema repetible." />
        <div className="grid gap-4 md:grid-cols-3">
          {columns.map((c, i) => (
            <Reveal key={c.tag} delay={i * 0.06}>
              <div className="card h-full border-t-4" style={{ borderTopColor: c.color }}>
                <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">{c.tag}</p>
                <p className="mt-2 font-display text-[19px] font-semibold leading-snug">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div role="list" className="mt-4 grid gap-3 sm:grid-cols-2">
          {recs.map((r, i) => (
            <Reveal key={r} delay={i * 0.05}>
              <div role="listitem" className="flex items-start gap-4 rounded-xl border border-ink/10 bg-white/60 px-4 py-3.5">
                <span className="font-display text-[22px] font-semibold leading-none text-sand">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[15px] leading-snug">{r}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="bg-ink text-white">
        <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6">
          <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-sand">Metodología</p>
          <div className="mt-4 grid gap-8 md:grid-cols-[1fr_2fr]">
            <MethodItem title="Fuentes" items={sources} />
            <MethodItem title="Limitaciones" items={limitations} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-5 text-[13px] text-white/55">
            <span className="font-sans font-bold tracking-[0.28em] text-white">MATIZ</span>
            <span>Auditoría cuantitativa · Octubre 2026</span>
          </div>
        </div>
      </footer>
    </>
  )
}
