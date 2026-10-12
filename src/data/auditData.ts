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

export const sources = ['Instagram Insights', 'TikTok Studio', 'Portal de guiones']

export const limitations = [
  'El archivo de Historias de Instagram no tiene detalle suficiente para un análisis individual.',
  'Compartidos y guardados de TikTok solo están disponibles para parte de los videos.',
  'Cuando un dato no existe se muestra “—”; nunca se sustituye por cero.',
  'No hubo inversión publicitaria: no se reportan métricas de pauta.',
]

export const fmt = (n: number | null | undefined) =>
  n === null || n === undefined ? '—' : n.toLocaleString('en-US')
