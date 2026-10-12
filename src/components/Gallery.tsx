import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Camera, Captions, MapPin } from 'lucide-react'
import { Marquee, Reveal, Section, SectionTitle } from './ui'

const tiles = Array.from({ length: 9 }, (_, i) => `/img/feed-${String(i + 1).padStart(2, '0')}.jpg`)

const observations = [
  { Icon: Camera, title: 'Formato a cámara', text: 'Casi todo el feed es el doctor hablando a cámara, en plano medio.' },
  { Icon: Captions, title: 'Subtítulos centrados', text: 'Texto en pantalla de una o dos palabras, consistente entre piezas.' },
  { Icon: MapPin, title: 'Tres escenarios', text: 'Consultorio, patio de ladrillo y sala con plantas: identidad visual reconocible.' },
]

const Tile = ({ src, i }: { src: string; i: number }) => (
  <div className="group relative mr-3 h-[300px] w-[225px] shrink-0 overflow-hidden rounded-2xl border border-cream/10 md:h-[360px] md:w-[270px]">
    <img src={src} alt={`Fotograma del reel ${i + 1} del feed de Instagram`} width={270} height={361} loading="lazy"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-grape-deep/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </div>
)

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  return (
    <Section id="contenido" tone="dark" decor={{ name: 'arch', className: '-left-10 top-24 text-peri/20' }}>
      <SectionTitle n="05" eyebrow="El contenido" title="Así se ve el *feed* que se está auditando." />
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div ref={ref} className="relative mx-auto max-w-[380px]">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[28px] border border-coral/60" aria-hidden />
            <motion.div style={{ y }} className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[28px] border border-peri/30">
              <img src="/img/doctor-azul.jpg" alt="Dr. Javier Lamas con los brazos cruzados, en el patio de su clínica" width={412} height={625} loading="lazy" className="h-full w-full scale-110 object-cover object-[50%_18%]" />
            </motion.div>
          </div>
        </Reveal>
        <div className="space-y-4">
          {observations.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="card flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-coral/50 text-coral"><Icon size={19} aria-hidden /></span>
                <div>
                  <p className="font-display text-[26px] font-medium leading-tight">{title}</p>
                  <p className="mt-1 text-[14.5px] leading-snug text-cream/65">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="-mx-4 mt-16 space-y-3 sm:-mx-6" aria-label="Muestra de 9 fotogramas del feed de Instagram @_javierlamas">
        <Marquee items={tiles.map((s, i) => <Tile key={s} src={s} i={i} />)} />
        <Marquee reverse items={[...tiles].reverse().map((s, i) => <Tile key={s} src={s} i={8 - i} />)} />
      </div>
    </Section>
  )
}
