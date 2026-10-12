import { Camera, Captions, MapPin } from 'lucide-react'
import { Reveal, SectionTitle } from './ui'

const tiles = Array.from({ length: 9 }, (_, i) => `/img/feed-${String(i + 1).padStart(2, '0')}.jpg`)

const observations = [
  { Icon: Camera, title: 'Formato a cámara', text: 'Casi todo el feed es el doctor hablando a cámara, en plano medio.' },
  { Icon: Captions, title: 'Subtítulos centrados', text: 'Texto en pantalla de una o dos palabras, consistente entre piezas.' },
  { Icon: MapPin, title: 'Tres escenarios', text: 'Consultorio, patio de ladrillo y sala con plantas: identidad visual reconocible.' },
]

export default function Gallery() {
  return (
    <section id="contenido" className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 md:py-[72px]">
      <SectionTitle eyebrow="El contenido" title="Así se ve el feed que se está auditando." />
      <div className="grid gap-4 lg:grid-cols-[2fr_3fr]">
        <Reveal>
          <div className="card flex h-full flex-col !p-0 overflow-hidden">
            <img src="/img/doctor-azul.jpg" alt="Dr. Javier Lamas con los brazos cruzados, en el patio de su clínica" width={412} height={625} loading="lazy" className="min-h-[340px] w-full flex-1 object-cover object-[50%_20%]" />
            <div className="space-y-3 p-5">
              {observations.map(({ Icon, title, text }) => (
                <div key={title} className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand/25 text-[#6b5231]"><Icon size={16} aria-hidden /></span>
                  <div>
                    <p className="font-sans text-[14.5px] font-semibold">{title}</p>
                    <p className="text-[13.5px] leading-snug text-body">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card h-full">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-sans text-[15px] font-semibold">Muestra del feed · @_javierlamas</p>
              <span className="text-[12.5px] text-muted">9 de 18 reels</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {tiles.map((src, i) => (
                <img key={src} src={src} alt={`Fotograma del reel ${i + 1} del feed de Instagram`} width={270} height={361} loading="lazy" className="aspect-[3/4] w-full rounded-lg object-cover" />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
