import { motion, useScroll, useSpring } from 'framer-motion'
import { meta } from '../data/auditData'

const links = [
  ['Resumen', 'resumen'],
  ['Evolución', 'evolucion'],
  ['Instagram', 'instagram'],
  ['TikTok', 'tiktok'],
  ['Sistema editorial', 'editorial'],
  ['Conclusiones', 'conclusiones'],
]

export default function Navbar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur">
      <motion.div className="absolute left-0 top-0 h-[2px] w-full origin-left bg-sand" style={{ scaleX }} aria-hidden />
      <div className="mx-auto flex h-12 max-w-[1320px] items-center gap-5 px-4 sm:px-6">
        <a href="#top" className="shrink-0 font-sans text-[14px] font-bold tracking-[0.28em] text-white">MATIZ</a>
        <span className="hidden shrink-0 font-sans text-[12.5px] text-white/50 lg:inline">
          Auditoría Digital · {meta.client} · Corte {meta.cutoffShort}
        </span>
        <nav aria-label="Secciones" className="ml-auto flex min-w-0 gap-4 overflow-x-auto whitespace-nowrap font-sans text-[13px] text-white/70 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="py-1 transition-colors hover:text-sand focus-visible:text-sand">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
