import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { InstagramIcon, Monogram } from './ui'
import { Music2 } from 'lucide-react'
import { links as social } from '../data/auditData'

const links = [
  ['Resumen', 'resumen'],
  ['Evolución', 'evolucion'],
  ['Instagram', 'instagram'],
  ['TikTok', 'tiktok'],
  ['Contenido', 'contenido'],
  ['Editorial', 'editorial'],
  ['Conclusiones', 'conclusiones'],
]

export default function Navbar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [active, setActive] = useState('')
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const els = links.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', on) }
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'border-b border-cream/10 bg-grape-deep/80 backdrop-blur-xl' : 'bg-transparent'}`}>
      <motion.div className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-coral" style={{ scaleX }} aria-hidden />
      <div className="mx-auto flex h-14 max-w-[1320px] items-center gap-5 px-4 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5 text-cream" aria-label="Inicio">
          <Monogram size={22} />
          <span className="font-display text-[22px] italic leading-none">Matiz</span>
        </a>
        <nav aria-label="Secciones" className="ml-auto hidden min-w-0 gap-1 font-sans text-[13px] md:flex">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`}
              className={`relative rounded-full px-3 py-1.5 transition-colors ${active === id ? 'text-cream' : 'text-cream/60 hover:text-cream'}`}>
              {active === id && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-cream/12" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="relative">{label}</span>
            </a>
          ))}
        </nav>
        <nav aria-label="Secciones" className="ml-auto flex min-w-0 gap-4 overflow-x-auto whitespace-nowrap font-sans text-[13px] text-cream/70 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          {links.map(([label, id]) => <a key={id} href={`#${id}`} className="py-1">{label}</a>)}
        </nav>
        <div className="hidden items-center gap-2 border-l border-cream/15 pl-4 text-cream/70 lg:flex">
          <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Javier Lamas" className="rounded-full p-1.5 transition-colors hover:bg-cream/10 hover:text-coral"><InstagramIcon size={16} /></a>
          <a href={social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok de Javier Lamas" className="rounded-full p-1.5 transition-colors hover:bg-cream/10 hover:text-coral"><Music2 size={16} /></a>
        </div>
      </div>
    </header>
  )
}
