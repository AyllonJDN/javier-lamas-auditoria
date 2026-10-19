// Fuente: Excel Auditoria_Javier_Lamas_Oct2026.xlsx · corte 18/10/2026 (anterior: 12/10/2026).
// Los datos crudos están en igPosts / ttPosts; todo lo demás se deriva de ellos.

/* ---------- Datos crudos (orden cronológico) ---------- */
// wk = semana ISO; fol = % de vistas que vienen de seguidores
const igRaw = [
  { d: '01 sep', wk: 36, t: 'La razón número uno', views: 93, fol: 16.1, likes: 4, comments: 0, shares: 0 },
  { d: '02 sep', wk: 36, t: 'Ranking 1-7 errores', views: 100, fol: 57.1, likes: 3, comments: 1, shares: 2 },
  { d: '02 sep', wk: 36, t: 'Caso falso dentista', views: 46, fol: 34.1, likes: 4, comments: 0, shares: 0 },
  { d: '05 sep', wk: 36, t: 'Sin caption', views: 52, fol: 60.8, likes: 3, comments: 0, shares: 0 },
  { d: '08 sep', wk: 37, t: 'Sin caption', views: 66, fol: 26.2, likes: 4, comments: 0, shares: 0 },
  { d: '08 sep', wk: 37, t: 'Confianza', views: 53, fol: 39.6, likes: 3, comments: 0, shares: 0 },
  { d: '10 sep', wk: 37, t: 'Alimentación infantil', views: 39, fol: 48.7, likes: 1, comments: 0, shares: 0 },
  { d: '11 sep', wk: 37, t: 'Recomendaciones', views: 28, fol: 60.7, likes: 2, comments: 0, shares: 0 },
  { d: '14 sep', wk: 38, t: 'MARPE, 2da opinión', views: 37, fol: 62.2, likes: 1, comments: 0, shares: 0 },
  { d: '16 sep', wk: 38, t: 'Testimonio paciente', views: 56, fol: 32.1, likes: 2, comments: 0, shares: 0 },
  { d: '21 sep', wk: 39, t: 'Evolución mandíbula (duplicado)', views: 38, fol: 64.9, likes: 2, comments: 0, shares: 0 },
  { d: '24 sep', wk: 39, t: 'Evolución mandíbula', views: 116, fol: 73.5, likes: 3, comments: 0, shares: 1 },
  { d: '26 sep', wk: 39, t: 'Paciente señala el oído', views: 33, fol: 51.5, likes: 1, comments: 0, shares: 0 },
  { d: '28 sep', wk: 40, t: 'No todos son buenos doctores', views: 65, fol: 26.2, likes: 3, comments: 0, shares: 0 },
  { d: '01 oct', wk: 40, t: 'Sonrisa bonita', views: 96, fol: 70.8, likes: 1, comments: 0, shares: 1 },
  { d: '05 oct', wk: 41, t: 'Clic en la mandíbula', views: 39, fol: 48.8, likes: 1, comments: 0, shares: 0 },
  { d: '07 oct', wk: 41, t: 'Molestias ATM', views: 44, fol: 53.5, likes: 1, comments: 0, shares: 0 },
  { d: '08 oct', wk: 41, t: 'La universidad…', views: 40, fol: 43.9, likes: 1, comments: 0, shares: 0 },
  { d: '12 oct', wk: 42, t: 'Botox y bruxismo', views: 22, fol: 40.9, likes: 1, comments: 0, shares: 0 },
  { d: '15 oct', wk: 42, t: 'Bullying y autoestima', views: 39, fol: 66.7, likes: 4, comments: 0, shares: 0 },
]

const ttRaw = [
  { d: '31 ago', wk: 36, t: 'Sin descripción', views: 168, likes: 5 },
  { d: '01 sep', wk: 36, t: 'Sin descripción', views: 165, likes: 2 },
  { d: '02 sep', wk: 36, t: 'Sin descripción', views: 311, likes: 7 },
  { d: '02 sep', wk: 36, t: 'Misma maloclusión', views: 389, likes: 8 },
  { d: '05 sep', wk: 36, t: 'Sin descripción', views: 755, likes: 16 },
  { d: '08 sep', wk: 37, t: 'Sin descripción', views: 242, likes: 6 },
  { d: '08 sep', wk: 37, t: 'Sin descripción', views: 309, likes: 15 },
  { d: '10 sep', wk: 37, t: 'Sin descripción', views: 361, likes: 11 },
  { d: '11 sep', wk: 37, t: 'Sin descripción', views: 432, likes: 16 },
  { d: '14 sep', wk: 38, t: 'Sin descripción', views: 499, likes: 17 },
  { d: '16 sep', wk: 38, t: 'Sin descripción', views: 674, likes: 24 },
  { d: '21 sep', wk: 39, t: 'Evolución dientes (duplicado)', views: 427, likes: 20 },
  { d: '24 sep', wk: 39, t: 'Evolución dientes (duplicado)', views: 440, likes: 14 },
  { d: '26 sep', wk: 39, t: 'Paciente señala el oído', views: 684, likes: 21 },
  { d: '01 oct', wk: 40, t: 'Sonrisa bonita', views: 346, likes: 8 },
  { d: '05 oct', wk: 41, t: 'Clic en la mandíbula', views: 534, likes: 21 },
  { d: '06 oct', wk: 41, t: 'Molestias articulación', views: 485, likes: 13 },
  { d: '07 oct', wk: 41, t: 'La universidad…', views: 7613, likes: 190 },
  { d: '12 oct', wk: 42, t: 'Botox y bruxismo', views: 576, likes: 17 },
  { d: '15 oct', wk: 42, t: 'Bullying y autoestima', views: 360, likes: 11 },
]

export const igPosts = igRaw.map((p, i) => {
  const fanViews = Math.round((p.views * p.fol) / 100)
  return { ...p, n: i + 1, fanViews, nonViews: p.views - fanViews }
})
export const ttPosts = ttRaw.map((p, i) => ({ ...p, n: i + 1 }))

/* ---------- Estadística ---------- */
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0)
const median = (a: number[]) => {
  const s = [...a].sort((x, y) => x - y)
  const m = s.length / 2
  return s.length % 2 ? s[Math.floor(m)] : (s[m - 1] + s[m]) / 2
}
const sd = (a: number[]) => {
  const mu = sum(a) / a.length
  return Math.sqrt(sum(a.map((x) => (x - mu) ** 2)) / a.length)
}
const num = (n: number, d = 2) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
const med = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1))

const igViews = igPosts.map((p) => p.views)
const ttViews = ttPosts.map((p) => p.views)
const igSum = sum(igViews)
const ttSum = sum(ttViews)
const allSum = igSum + ttSum
const igMean = igSum / igViews.length
const ttMean = ttSum / ttViews.length
const igMedian = median(igViews)
const ttMedian = median(ttViews)
const igSd = sd(igViews)
const ttSd = sd(ttViews)
const viral = ttPosts.reduce((m, p) => (p.views > m.views ? p : m))
const ttLikes = sum(ttPosts.map((p) => p.likes))
const igLikes = sum(igPosts.map((p) => p.likes))
const pieces = igPosts.length + ttPosts.length

export const meta = {
  client: 'Dr. Javier Lamas',
  handle: '@_javierlamas',
  cutoff: '18 de octubre de 2026',
  cutoffShort: '18.10.2026',
  previousCutoff: '12/10/2026',
  totalPieces: pieces,
  piecesPerPlatform: igPosts.length,
}

export const totals = {
  viewsIg: igSum,
  viewsTt: ttSum,
  viewsAll: allSum,
  ttSharePct: Math.round((ttSum / allSum) * 100),
  ttShareExact: Math.round((ttSum / allSum) * 10000) / 100,
  maxViews: viral.views,
}

// Semanas de la cuenta: la actividad empieza el 31 ago (lunes de la semana ISO 36).
const weekNums = [36, 37, 38, 39, 40, 41, 42]
const weekRange = ['31 ago–6 sep', '7–13 sep', '14–20 sep', '21–27 sep', '28 sep–4 oct', '5–11 oct', '12–18 oct (parcial)']
export const weekly = weekNums.map((w, i) => ({
  week: `Sem ${i + 1}`,
  range: weekRange[i],
  label: `Sem ${i + 1} · ${weekRange[i]}`,
  instagram: sum(igPosts.filter((p) => p.wk === w).map((p) => p.views)),
  tiktok: sum(ttPosts.filter((p) => p.wk === w).map((p) => p.views)),
}))
export const publishedByWeek = weekNums.map((w, i) => ({
  w: `Sem ${i + 1}`,
  label: `Sem ${i + 1} · ${weekRange[i]}`,
  ig: igPosts.filter((p) => p.wk === w).length,
  tt: ttPosts.filter((p) => p.wk === w).length,
}))
const peak = weekly.reduce((m, w) => (w.tiktok > m.tiktok ? w : m))
export const weeklyPeak = { week: peak.week, range: peak.range, views: peak.tiktok, domainMax: Math.ceil((peak.tiktok * 1.12) / 1000) * 1000 }

export const stats = {
  instagram: { mean: num(igMean), median: med(igMedian), sd: num(igSd), range: `${Math.min(...igViews)}–${Math.max(...igViews)}` },
  tiktok: { mean: num(ttMean), median: med(ttMedian), sd: num(ttSd), range: `${Math.min(...ttViews)}–${Math.max(...ttViews).toLocaleString('en-US')}` },
  igMean, ttMean, igMedian, ttMedian,
}

/* ---------- Instagram: insights de cuenta (panel profesional, 18/10/2026) ---------- */
export const igInsights = [
  { days: 7, views: 215, viewers: 54, followers: 55.3, nonFollowers: 44.7 },
  { days: 14, views: 398, viewers: 89, followers: 56, nonFollowers: 44 },
  { days: 30, views: 808, viewers: 219, followers: 58.4, nonFollowers: 41.6 },
  { days: 90, views: 1390, viewers: 344, followers: 54.9, nonFollowers: 45.1 },
]

export const igAccount = [
  { w: '7 días', views: 215, viewers: 54, visits: 28, inter: 10, reels: 84.7, stories: 15.3 },
  { w: '14 días', views: 398, viewers: 89, visits: 47, inter: 15, reels: 83.4, stories: 16.6 },
  { w: '30 días', views: 808, viewers: 219, visits: 75, inter: 30, reels: 85.9, stories: 14.1 },
  { w: '90 días', views: 1390, viewers: 344, visits: 152, inter: 64, reels: 86.2, stories: 13.8 },
]
export const igStoriesPct = igAccount[3].stories

export const igTop = [...igPosts]
  .sort((a, b) => b.views - a.views)
  .slice(0, 5)
  .map((p) => ({
    title: { 'Evolución mandíbula': 'Evolución mandíbula / dientes chuecos', 'Ranking 1-7 errores': 'Ranking 1-7 errores de diagnóstico', 'Sonrisa bonita': 'Sonrisa bonita no significa que todo esté bien', 'La razón número uno': 'La razón número uno / video fundacional', 'Sin caption': 'Sin caption' }[p.t] ?? p.t,
    short: p.t,
    views: p.views,
  }))

export const igEngagement = {
  likes: igLikes,
  comments: sum(igPosts.map((p) => p.comments)),
  shares: sum(igPosts.map((p) => p.shares)),
}

/* ---------- TikTok ---------- */
export const ttViral = {
  title: 'La universidad puede enseñarte protocolos',
  date: '7 de octubre',
  views: viral.views,
  likes: viral.likes,
  comments: 8,
  shares: 16,
  saves: 29,
  multiple: Math.round(viral.views / ttMedian),
}

export const ttTotals = {
  views: ttSum,
  likes: ttLikes,
  comments: 16,
  pieces: ttPosts.length,
  followers: 172,
}

// null = dato no disponible (se muestra "—")
export const platformCompare = {
  views: { instagram: igSum, tiktok: ttSum },
  likes: { instagram: igLikes, tiktok: ttLikes },
  comments: { instagram: igEngagement.comments, tiktok: ttTotals.comments },
}

/* ---------- Cruces y derivados ---------- */
// Evolución acumulada de vistas, por fecha de publicación
export const cumulative = (() => {
  const order: string[] = []
  ;[...ttPosts, ...igPosts].forEach((p) => { if (!order.includes(p.d)) order.push(p.d) })
  const months = ['ago', 'sep', 'oct']
  const key = (d: string) => months.indexOf(d.split(' ')[1]) * 100 + Number(d.split(' ')[0])
  order.sort((a, b) => key(a) - key(b))
  let ig = 0, tt = 0
  return order.map((d) => {
    igPosts.filter((p) => p.d === d).forEach((p) => { ig += p.views })
    ttPosts.filter((p) => p.d === d).forEach((p) => { tt += p.views })
    return { d, ig, tt }
  })
})()

// Mismo tema publicado en ambas plataformas (cruce por tema y fecha)
// [tema, índice en ttPosts, índice en igPosts]
export const sameTopic = [
  ['La universidad puede enseñarte…', 17, 17],
  ['Paciente señala el oído', 13, 12],
  ['Clic en la mandíbula', 15, 15],
  ['Evolución mandíbula (24 sep)', 12, 11],
  ['Evolución mandíbula (21 sep)', 11, 10],
  ['Molestias de ATM', 16, 16],
  ['Sonrisa bonita', 14, 14],
  ['Botox y bruxismo', 18, 18],
  ['Bullying y autoestima', 19, 19],
].map(([tema, ti, ii]) => {
  const tt = ttPosts[ti as number].views
  const ig = igPosts[ii as number].views
  return { tema: tema as string, ig, tt, mult: Math.round((tt / ig) * 10) / 10 }
})

export const derived = {
  ttMeanNoViral: Math.round((ttSum - viral.views) / (ttPosts.length - 1)),
  ttNoViralVsIg: Math.round(((ttSum - viral.views) / (ttPosts.length - 1) / igMean) * 10) / 10,
  viralSharePct: Math.round((viral.views / allSum) * 100),
  likesPer100: { instagram: Math.round((igLikes / igSum) * 1000) / 10, tiktok: Math.round((ttLikes / ttSum) * 1000) / 10 },
  cv: { instagram: Math.round((igSd / igMean) * 100), tiktok: Math.round((ttSd / ttMean) * 100) },
}

export const profile = {
  name: 'Javier Lamas',
  bio: 'Ortodoncia Craneomandibular',
  tagline: 'Ayudo a odontólogos a comprender mejor casos complejos · Diagnóstico funcional · ATM · Ortodoncia',
  posts: igPosts.length,
  followers: 22,
}

export const colors = {
  ig: '#C4D3F7',
  igSoft: '#6F80B3',
  tt: '#F47358',
  ttSoft: '#9C4A44',
  olive: '#B9AE6F',
  cream: '#FFFAF5',
  grape: '#470B24',
}

export const links = {
  instagram: 'https://www.instagram.com/_javierlamas/',
  tiktok: 'https://www.tiktok.com/@_javierlamas',
}

export const sources = ['Instagram Insights', 'TikTok Studio']

export const fmt = (n: number | null | undefined) =>
  n === null || n === undefined ? '—' : n.toLocaleString('en-US')
