import { Eye, Layers } from 'lucide-react'
import { InsightCard, KpiCard, PlatformIcon, Reveal, SectionTitle } from './ui'
import { meta, totals } from '../data/auditData'

export default function Summary() {
  return (
    <section id="resumen" className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 md:py-[72px]">
      <SectionTitle eyebrow="Resumen ejecutivo" title="TikTok concentra el 92% de las vistas de las 36 piezas." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal><KpiCard value={meta.totalPieces} label="Publicaciones" note="18 en Instagram · 18 en TikTok" icon={<Layers size={18} className="text-sand" aria-hidden />} /></Reveal>
        <Reveal delay={0.06}><KpiCard value={totals.viewsIg} label="Vistas Instagram" accent="#B8C8E8" icon={<PlatformIcon platform="instagram" />} /></Reveal>
        <Reveal delay={0.12}><KpiCard value={totals.viewsTt} label="Vistas TikTok" icon={<PlatformIcon platform="tiktok" />} /></Reveal>
        <Reveal delay={0.18}><KpiCard value={totals.ttSharePct} suffix="%" label="de las vistas vienen de TikTok" note="12,487 vistas en total" accent="#A8D5BA" icon={<Eye size={18} className="text-sand" aria-hidden />} /></Reveal>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Reveal><InsightCard n="1" tone="#C4A882" title="TikTok concentra el alcance." /></Reveal>
        <Reveal delay={0.06}><InsightCard n="2" tone="#B8C8E8" title="El pico de rendimiento depende de una sola pieza." /></Reveal>
        <Reveal delay={0.12}><InsightCard n="3" tone="#F2A7A7" title="La publicación continuó aunque la guionización documentada se detuvo." /></Reveal>
      </div>
    </section>
  )
}
