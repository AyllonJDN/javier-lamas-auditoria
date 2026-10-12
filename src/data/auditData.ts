export const meta = {
  client: 'Dr. Javier Lamas',
  handle: '@_javierlamas',
  cutoff: '12 de octubre de 2026',
  cutoffShort: '12.10.2026',
  totalPieces: 36,
  piecesPerPlatform: 18,
}

export const totals = {
  viewsIg: 1041,
  viewsTt: 11446,
  viewsAll: 12487,
  ttSharePct: 92,
  maxViews: 4883,
  scripts: 8,
  weeksAnalyzed: 9,
}

export const weekly = [
  { week: 'S36', label: 'Semana 36', instagram: 291, tiktok: 1687 },
  { week: 'S37', label: 'Semana 37', instagram: 186, tiktok: 1230 },
  { week: 'S38', label: 'Semana 38', instagram: 93, tiktok: 1073 },
  { week: 'S39', label: 'Semana 39', instagram: 187, tiktok: 1421 },
  { week: 'S40', label: 'Semana 40', instagram: 161, tiktok: 300 },
  { week: 'S41', label: 'Semana 41', instagram: 123, tiktok: 5735 },
]

export const stats = {
  instagram: { mean: '57.83', median: '49', sd: '25.52', range: '28–116' },
  tiktok: { mean: '635.89', median: '395', sd: '1,041.17', range: '148–4,883' },
}

export const igInsights = [
  { days: 7, views: 198, viewers: 49, followers: 52, nonFollowers: 48 },
  { days: 14, views: 382, viewers: 143, followers: 52.9, nonFollowers: 47.1 },
  { days: 30, views: 736, viewers: 202, followers: 56.9, nonFollowers: 43.1 },
  { days: 90, views: 1198, viewers: 308, followers: 54, nonFollowers: 46 },
]

export const igTop = [
  { title: 'Evolución mandíbula / dientes chuecos', short: 'Evolución mandíbula', views: 116 },
  { title: 'Ranking 1-7 errores de diagnóstico', short: 'Ranking 1-7 errores', views: 100 },
  { title: 'Sonrisa bonita no significa que todo esté bien', short: 'Sonrisa bonita', views: 96 },
  { title: 'La razón número uno / video fundacional', short: 'La razón número uno', views: 93 },
  { title: 'Sin caption', short: 'Sin caption', views: 66 },
]

export const igEngagement = {
  likes: 40,
  comments: 1,
  shares: 4,
  followers: 18,
}

export const ttViral = {
  title: 'La universidad puede enseñarte protocolos',
  date: '7 de octubre',
  views: 4883,
  likes: 121,
  comments: 5,
  shares: 11,
  saves: 19,
  multiple: 12,
}

export const ttTotals = {
  views: 11446,
  likes: 305,
  comments: 13,
  pieces: 18,
}

// null = dato no disponible (se muestra "—")
export const platformCompare = {
  views: { instagram: 1041, tiktok: 11446 },
  likes: { instagram: 40, tiktok: 305 },
  comments: { instagram: 1, tiktok: 13 },
}

export const editorial = {
  scripts: 8,
  published: 36,
  weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({ n, registered: n <= 2 })),
}

export const links = {
  instagram: 'https://www.instagram.com/_javierlamas/',
  tiktok: 'https://www.tiktok.com/@_javierlamas',
}

export const sources = ['Instagram Insights', 'TikTok Studio', 'Portal de guiones']

export const limitations = [
  'El archivo de Historias de Instagram no tiene detalle suficiente para un análisis individual.',
  'Compartidos y guardados de TikTok solo están disponibles para parte de los videos.',
  'Cuando un dato no existe se muestra “—”; nunca se sustituye por cero.',
  'No hubo inversión publicitaria: no se reportan métricas de pauta.',
]


export const colors = {
  ig: '#C4D3F7',
  igSoft: '#6F80B3',
  tt: '#F47358',
  ttSoft: '#9C4A44',
  olive: '#B9AE6F',
  cream: '#FFFAF5',
  grape: '#470B24',
}

// Publicaciones en orden cronológico (Excel: hojas IG_Reels y TikTok_Videos)
export const igPosts = [
  { d: '01 sep', t: 'La razón número uno', views: 93, fol: 16.1 },
  { d: '02 sep', t: 'Ranking 1-7 errores', views: 100, fol: 57.1 },
  { d: '02 sep', t: 'Caso falso dentista', views: 46, fol: 34.1 },
  { d: '05 sep', t: 'Sin caption', views: 52, fol: 60.8 },
  { d: '08 sep', t: 'Sin caption', views: 66, fol: 26.2 },
  { d: '08 sep', t: 'Confianza', views: 53, fol: 39.6 },
  { d: '10 sep', t: 'Alimentación infantil', views: 39, fol: 48.7 },
  { d: '11 sep', t: 'Recomendaciones', views: 28, fol: 60.7 },
  { d: '14 sep', t: 'MARPE, 2da opinión', views: 37, fol: 62.2 },
  { d: '16 sep', t: 'Testimonio paciente', views: 56, fol: 32.1 },
  { d: '21 sep', t: 'Evolución mandíbula (duplicado)', views: 38, fol: 64.9 },
  { d: '24 sep', t: 'Evolución mandíbula', views: 116, fol: 73.5 },
  { d: '26 sep', t: 'Paciente señala el oído', views: 33, fol: 51.5 },
  { d: '28 sep', t: 'No todos son buenos doctores', views: 65, fol: 26.2 },
  { d: '01 oct', t: 'Sonrisa bonita', views: 96, fol: 70.8 },
  { d: '05 oct', t: 'Clic en la mandíbula', views: 39, fol: 48.8 },
  { d: '07 oct', t: 'Molestias ATM', views: 44, fol: 53.5 },
  { d: '08 oct', t: 'La universidad…', views: 40, fol: 43.9 },
].map((p, i) => ({ ...p, n: i + 1, fanViews: Math.round((p.views * p.fol) / 100), nonViews: p.views - Math.round((p.views * p.fol) / 100) }))

export const ttPosts = [
  { d: '31 ago', t: 'Sin descripción', views: 154, likes: 5 },
  { d: '01 sep', t: 'Sin descripción', views: 148, likes: 2 },
  { d: '02 sep', t: 'Sin descripción', views: 293, likes: 7 },
  { d: '02 sep', t: 'Misma maloclusión', views: 364, likes: 7 },
  { d: '05 sep', t: 'Sin descripción', views: 728, likes: 16 },
  { d: '08 sep', t: 'Sin descripción', views: 228, likes: 6 },
  { d: '08 sep', t: 'Sin descripción', views: 246, likes: 10 },
  { d: '10 sep', t: 'Sin descripción', views: 345, likes: 10 },
  { d: '11 sep', t: 'Sin descripción', views: 411, likes: 14 },
  { d: '14 sep', t: 'Sin descripción', views: 452, likes: 14 },
  { d: '16 sep', t: 'Sin descripción', views: 621, likes: 19 },
  { d: '21 sep', t: 'Evolución dientes (duplicado)', views: 392, likes: 15 },
  { d: '24 sep', t: 'Evolución dientes (duplicado)', views: 402, likes: 12 },
  { d: '26 sep', t: 'Paciente señala el oído', views: 627, likes: 17 },
  { d: '01 oct', t: 'Sonrisa bonita', views: 300, likes: 5 },
  { d: '05 oct', t: 'Clic en la mandíbula', views: 454, likes: 17 },
  { d: '06 oct', t: 'Molestias articulación', views: 398, likes: 8 },
  { d: '07 oct', t: 'La universidad…', views: 4883, likes: 121 },
].map((p, i) => ({ ...p, n: i + 1 }))

// Evolución acumulada de vistas, publicación a publicación (por fecha de publicación)
export const cumulative = (() => {
  const igByDay = igPosts.map((p) => ({ d: p.d, ig: p.views, tt: 0 }))
  const ttByDay = ttPosts.map((p) => ({ d: p.d, ig: 0, tt: p.views }))
  const order = ['31 ago','01 sep','02 sep','05 sep','08 sep','10 sep','11 sep','14 sep','16 sep','21 sep','24 sep','26 sep','28 sep','01 oct','05 oct','06 oct','07 oct','08 oct']
  let ig = 0, tt = 0
  return order.map((d) => {
    ;[...igByDay, ...ttByDay].filter((x) => x.d === d).forEach((x) => { ig += x.ig; tt += x.tt })
    return { d, ig, tt }
  })
})()

// Mismo tema publicado en ambas plataformas (cruce por tema y fecha)
export const sameTopic = [
  { tema: 'La universidad puede enseñarte…', ig: 40, tt: 4883 },
  { tema: 'Paciente señala el oído', ig: 33, tt: 627 },
  { tema: 'Clic en la mandíbula', ig: 39, tt: 454 },
  { tema: 'Evolución mandíbula (24 sep)', ig: 116, tt: 402 },
  { tema: 'Evolución mandíbula (21 sep)', ig: 38, tt: 392 },
  { tema: 'Molestias de ATM', ig: 44, tt: 398 },
  { tema: 'Sonrisa bonita', ig: 96, tt: 300 },
].map((r) => ({ ...r, mult: Math.round((r.tt / r.ig) * 10) / 10 }))

export const igAccount = [
  { w: '7 días', views: 198, viewers: 49, visits: 21, inter: 5, reels: 83.4, stories: 16.7 },
  { w: '14 días', views: 382, viewers: 143, visits: 35, inter: 10, reels: 87.2, stories: 12.9 },
  { w: '30 días', views: 736, viewers: 202, visits: 70, inter: 25, reels: 86.8, stories: 13.2 },
  { w: '90 días', views: 1198, viewers: 308, visits: 128, inter: 54, reels: 86.8, stories: 13.2 },
]

export const scriptsByWeek = [4, 4, 0, 0, 0, 0, 0, 0, 0].map((scripts, i) => ({ w: `S${i + 1}`, scripts }))

export const publishedByWeek = [
  { w: 'S36', ig: 4, tt: 5 },
  { w: 'S37', ig: 4, tt: 4 },
  { w: 'S38', ig: 2, tt: 2 },
  { w: 'S39', ig: 3, tt: 3 },
  { w: 'S40', ig: 2, tt: 1 },
  { w: 'S41', ig: 3, tt: 3 },
]

export const derived = {
  ttMeanNoViral: Math.round((11446 - 4883) / 17),
  viralSharePct: 39,
  likesPer100: { instagram: 3.8, tiktok: 2.7 },
  cv: { instagram: 44, tiktok: 164 },
  withoutScript: 28,
}

export const profile = {
  name: 'Javier Lamas',
  bio: 'Ortodoncia Craneomandibular',
  tagline: 'Ayudo a odontólogos a comprender mejor casos complejos · Diagnóstico funcional · ATM · Ortodoncia',
  posts: 18,
  followers: 18,
  following: 11,
}

export const fmt = (n: number | null | undefined) =>
  n === null || n === undefined ? '—' : n.toLocaleString('en-US')
