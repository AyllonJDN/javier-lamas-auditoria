# Matiz · Sistema de diseño web

Guía para construir presentaciones, informes y sitios de Matiz con la misma línea gráfica, tipografía, movimiento y componentes de la *Auditoría Digital · Dr. Javier Lamas* (octubre 2026).

> **Uso con Claude Code:** en un proyecto nuevo, copia la carpeta `matiz-kit/` a `src/` y pega este documento en el chat (o guárdalo como `CLAUDE.md`). Con eso se reproduce el estilo sin volver a explicarlo.

---

## 1. Esencia

Matiz es una firma estratégica para creadores y expertos: **sofisticada y profesional, pero cercana y humana**. La paleta evoca un atardecer (uva, coral, celeste, oliva). El tono visual es editorial: titulares serif livianos con una palabra en cursiva de acento, mucho aire, tarjetas de cristal oscuro y movimiento suave.

Principios:
1. **Una palabra en cursiva por titular.** Es la firma de la marca (*"Somos la **estrategia** detrás del talento"*).
2. **Oscuro y claro alternados.** Las secciones se apilan como hojas con esquinas redondeadas.
3. **Los gráficos viven siempre sobre tarjetas uva**, también en secciones claras. Así los colores de datos se usan siempre igual.
4. **El movimiento acompaña, no distrae.** Entra una vez, con curva suave, y respeta `prefers-reduced-motion`.
5. **Ornamento clínico con medida.** Ilustraciones de instrumentos en trazo fino y muy tenues; nunca protagonistas.

---

## 2. Color

| Token | Hex | Uso |
|---|---|---|
| `grape` | `#470B24` | Color principal de marca. Fondos de hero y secciones "uva", texto sobre fondo claro |
| `grape-deep` | `#2A0615` | Fondo oscuro base, pie, texto sobre coral |
| `wine` | `#3D1717` | Acento oscuro cálido (uso puntual) |
| `coral` | `#F47358` | Acento principal: cursivas en fondo claro, botones, datos destacados, TikTok |
| `peri` (celeste) | `#C4D3F7` | Acento secundario: cursivas en fondo oscuro, Instagram, líneas |
| `olive` | `#857B4A` | Acento terciario. En gráficos sobre oscuro se aclara a `#B9AE6F` |
| `cream` | `#FFFAF5` | Texto sobre oscuro y fondo claro |

**Fondos**
- Oscuro: `#2A0615` con dos brillos radiales (celeste arriba-derecha 10%, coral abajo-izquierda 10%).
- Uva: `#470B24` con los mismos brillos.
- Claro: `linear-gradient(180deg, #FFFAF5 0%, #E6ECFC 100%)` (crema a celeste muy suave).
- Hero: `linear-gradient(160deg, #5C1232, #470B24 48%, #2A0615)` + brillo celeste (88% / 18%) + brillo coral (8% / 95%) + grano.

**Colores de datos (siempre iguales)**
- Plataforma A / destacado frío: `#C4D3F7`; versión apagada para barras no destacadas: `#6F80B3`.
- Plataforma B / destacado cálido: `#F47358`; versión apagada: `#9C4A44`.
- Tercera serie: `#B9AE6F`.
- Cuadrícula: `rgba(255,255,255,.09)` punteada `4 4`. Ejes: `#CDBCC6`, 12 px.

**Reglas**
- Texto sobre oscuro: `cream` al 100% (títulos), 65–75% (cuerpo), 50–60% (secundario).
- Evitar degradados entre colores de marca sobre fondo claro (se ven rosados y turbios). Usar tarjetas uva sólidas con un brillo coral difuminado en la esquina.
- Texto sobre coral: siempre `grape-deep`.

---

## 3. Tipografía

| Rol | Fuente de marca | Sustituto web (Google Fonts) |
|---|---|---|
| Titulares | IvyPresto Display Light / Light Italic | **Cormorant Garamond** 300–600 + cursiva |
| Texto funcional | Oakes Grotesk | **Hanken Grotesk** 400–700 |

Si hay licencia de las fuentes de marca, se cargan con `@font-face` y se cambian solo las variables `--font-display` y `--font-sans`.

**Escala usada**
- H1 hero: 48 / 64 / 84 px, peso 300, interlineado 0.98.
- H2 de sección: 38 / 60 px, peso 300, interlineado 1.02.
- Número grande (KPI): 58–112 px, peso 300.
- Título de tarjeta: 16 px Hanken semibold; subtítulo 13 px al 55%.
- Cuerpo: 14–15.5 px. Eyebrow: 12 px mayúsculas, tracking 0.22em.
- Citas: Cormorant cursiva 22–28 px con borde izquierdo coral de 2 px.

**Importante:** Cormorant usa cifras "old-style" (el 1 parece una I). Siempre aplicar:
```css
.font-display { font-variant-numeric: lining-nums; font-feature-settings: "lnum" 1; }
```

**Patrón de titular:** `Frase en peso 300 con *una palabra* en cursiva`. En oscuro la cursiva es `peri`; en claro es `coral`. El componente `WordReveal` interpreta `*palabra*`.

---

## 4. Estructura de página

- Ancho máximo del contenido: **1320 px**, gutter 16 px (móvil) / 24 px (sm+).
- Cada sección: `pt-20 pb-20` (móvil) / `pt-28 pb-28` (md+).
- **Hojas apiladas:** cada sección sube sobre la anterior con `-mt-10 md:-mt-14` y `rounded-t-[36px] md:rounded-t-[72px]`. Alterna `dark → light → grape → light → dark…`.
- Cada sección abre con `SectionTitle`: número en cursiva coral (`01`), línea que se dibuja, eyebrow en mayúsculas y titular con revelado palabra por palabra.
- **Cinta coral** inclinada (−1.2°) entre hero y primera sección, con marquee de palabras de marca separadas por ✦.
- **Navegación:** fija, transparente arriba y vidrio oscuro al hacer scroll; píldora que se desliza hacia la sección activa; barra de progreso coral de 2 px; enlaces a redes.
- **Pie:** monograma, frase de marca, botones a redes, metodología/limitaciones, firma "Matiz" en cursiva.

---

## 5. Componentes (en `matiz-kit/ui.tsx`)

| Componente | Qué hace |
|---|---|
| `Section` | Hoja apilada con tono `dark` / `grape` / `light` y decoración opcional de instrumento |
| `SectionTitle` | Número + línea + eyebrow + titular con `WordReveal` |
| `WordReveal` | Palabras que suben desde una máscara; `*cursiva*` para el acento |
| `Reveal` | Entrada de bloque: opacidad, subida 36 px y desenfoque 6 px → 0 |
| `Tilt` | Inclinación 3D de ±5° con el mouse (resorte) |
| `Lazy` | Monta el gráfico al entrar en pantalla para que su animación se vea |
| `Num` | Contador animado de 0 al valor (1.8 s). Respeta reduced-motion |
| `Marquee` | Cinta infinita; `reverse`, `fast`; se pausa al pasar el mouse |
| `KpiCard` | Tarjeta con número grande, brillo del color de acento y `Tilt` |
| `ChartCard`, `MiniStat`, `InsightCard`, `Badge`, `PlatformIcon`, `TimelineWeek`, `MethodItem` | Piezas de informe |
| `Monogram` | Óvalo doble con "Mz" en cursiva |
| `tip`, `ax`, `grid`, `legend` | Ajustes compartidos de Recharts |

**Tarjeta (`.card`)**: degradado de vidrio `rgba(255,255,255,.075 → .025)`, borde `rgba(196,211,247,.14)`, radio 22 px, sombra profunda, blur 10 px. Dentro de `.on-light` pasa a uva sólido (`#531030 → #3A0A21`).

**Insignias:** `glass` (borde crema 20%), `coral` (texto uva), `peri`.

**Botones/enlaces:** píldora con borde crema 25%; en hover se rellena de coral con texto `grape-deep`; la flecha ↗ se desplaza 2 px.

---

## 6. Movimiento

| Efecto | Especificación |
|---|---|
| Curva estándar | `cubic-bezier(.2, .7, .2, 1)` |
| Entrada de bloques | 0.8 s, una sola vez, `viewport margin -60px`, escalonado 0.06–0.1 s |
| Titular | stagger 0.055 s por palabra, 0.85 s cada una |
| Contadores | 1.8 s |
| Barras de progreso internas | 1.2–1.4 s, con `delay` |
| Gráficos | `animationDuration` 1300–1800 ms; montados con `Lazy` |
| Parallax hero | "M" gigante baja 220 px; foto sube 70 px; foto sigue el mouse ±16 px (resorte) |
| Foco de luz | `radial-gradient` coral 16% de 520 px que sigue al cursor |
| Flotación de instrumentos | `translateY(-14px)` ↔ 0, 7 s |
| Órbita del hero | rotación 90 s lineal |
| Marquee | 48 s (32 s en `fast`) |
| Botón play | anillo que se expande y desaparece, 2.2 s |
| Tarjetas | `Tilt` ±5° |
| Trazado de instrumentos | `pathLength` 0 → 1 en 1.6 s al entrar en pantalla |

**Obligatorio:** `@media (prefers-reduced-motion: reduce)` apaga marquee, flotación y pulso; `Num` salta al valor final.

**Grano:** capa `::after` con ruido SVG (`feTurbulence`) al 18%, `mix-blend-mode: overlay`, clase `.grain`.

---

## 7. Ilustración: instrumentos clínicos

`matiz-kit/Instruments.tsx` exporta `Instrument` (nombres: `mirror`, `probe`, `forceps`, `tooth`, `caliper`, `arch`) e `InstrumentRow`.
- Trazo de 0.6–1.3 px, `currentColor`, sin relleno, extremos redondeados.
- Opacidad 15–25% como decoración de sección; 45–55% solo en el hero.
- Máximo uno por sección, más la hilera de cierre. Se dibujan solos al entrar.
- Para otro rubro, se cambian las formas en el diccionario `defs` (cada una es una lista de `path`/`circle`) y se conserva todo lo demás.

---

## 8. Imágenes

- **Retratos:** marco en arco (`rounded-t-[999px] rounded-b-[28px]`), borde celeste 30–40%, contorno coral desplazado 16 px detrás, parallax suave. Foto con `object-position` alto para no cortar el rostro.
- **Video / reels:** nunca recortados. Se muestran dentro de un **marco de celular** (borde crema de 7 px, radio 38 px, proporción 9:17) con botón play, iconos laterales y caption.
- **Galerías:** tiras de marquee en dos filas con direcciones opuestas, esquinas de 16 px; zoom 1.1 al pasar el mouse.
- Optimizar a JPG ~80 de calidad, con `width`/`height` y `loading="lazy"` (el hero lleva `fetchPriority="high"`).

---

## 9. Gráficos (Recharts)

- Siempre sobre `ChartCard` (uva), con `Lazy` y altura fija.
- Barras con esquinas superiores redondeadas de 4–8 px; el elemento destacado va en color vivo y el resto apagado.
- Líneas de 2.5–3.5 px; la serie secundaria punteada `6 4`.
- Dona con `innerRadius` ~70%, `cornerRadius` 6, `paddingAngle` 3, y el valor principal centrado en serif.
- Tooltip crema con texto `grape-deep` y sombra; etiqueta en coral oscuro.
- Cada gráfico lleva `role="img"` con `aria-label` que narra el hallazgo.
- Nunca sustituir un dato inexistente por cero: mostrar "—".

---

## 10. Tono de redacción

- Titulares que afirman un hallazgo, con cifra: *"Un solo video concentra 4,883 vistas: 12 veces la mediana de TikTok."*
- Frases cortas, en español neutro, sin adjetivos de relleno.
- Citas editoriales en cursiva serif como remate de cada bloque.
- Toda cifra derivada se calcula del dato fuente; las observaciones propias se marcan como tales.

---

## 11. Arrancar un proyecto nuevo

```bash
npm create vite@latest mi-proyecto -- --template react-ts
cd mi-proyecto
npm i framer-motion recharts lucide-react tailwindcss @tailwindcss/vite
```

1. En `vite.config.ts`: plugins `react()` y `tailwindcss()`.
2. Copiar `matiz-kit/index.css` a `src/index.css` y `ui.tsx`, `Instruments.tsx`, `useMedia.ts` a `src/components/`.
3. En `index.html`, cargar las fuentes:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Hanken+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
```
4. Poner `<meta name="theme-color" content="#470b24">` y un favicon con el monograma.
5. Estructura: `Hero` → cinta → secciones con `Section`/`SectionTitle` → conclusiones → pie.
6. Datos en un único archivo `data/*.ts`; los componentes no contienen cifras.

**Despliegue en Vercel:** preset Vite, build `npm run build`, salida `dist`. Cada `git push` redeploya.

---

## 12. Lista de comprobación

- [ ] Cada titular tiene una palabra en cursiva de acento.
- [ ] Secciones alternan oscuro / claro y se apilan con esquinas redondeadas.
- [ ] Cifras en serif con números alineados (`lnum`).
- [ ] Gráficos en tarjetas uva, con `Lazy`, `aria-label` y colores de datos estándar.
- [ ] Ninguna foto de video recortada: marco de celular o arco.
- [ ] Máximo un instrumento por sección.
- [ ] `prefers-reduced-motion` probado.
- [ ] Contraste: texto crema sobre uva; texto uva sobre coral.
- [ ] Probado en móvil (375 px) y escritorio (1440 px).

---

## 13. Errores ya resueltos (no repetir)

| Problema | Causa | Solución |
|---|---|---|
| Página en blanco en Vercel | `react-countup` llega como objeto con Vite 8 → error React #130 | Contador propio (`Num`) con `framer-motion` |
| El "1" parece una "I" | Cifras old-style de Cormorant | `font-variant-numeric: lining-nums` |
| Degradado coral → uva turbio sobre fondo claro | Mezcla translúcida sobre crema | Tarjeta uva sólida + brillo coral difuminado |
| Foto del video viral "no cala" | Recorte de un fotograma vertical | Marco de celular con el fotograma completo |
| Gráficos ya "terminados" al llegar | Animan al cargar la página | Montarlos con `Lazy` al entrar en pantalla |
| Capturas de página completa con hero gigante | `min-height: 100svh` con ventana muy alta | Capturar con viewport normal y scroll |
