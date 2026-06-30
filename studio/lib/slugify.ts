const STOP_WORDS = new Set([
  // artículos
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  // preposiciones
  'a', 'al', 'ante', 'bajo', 'con', 'contra', 'de', 'del', 'desde',
  'durante', 'en', 'entre', 'hacia', 'hasta', 'para', 'por', 'sin',
  'sobre', 'tras',
  // conjunciones
  'e', 'ni', 'o', 'pero', 'que', 'si', 'sino', 'y', 'ya',
  // pronombres
  'ella', 'ellas', 'ellos', 'le', 'les', 'lo', 'me', 'mi', 'mis',
  'nos', 'nosotros', 'se', 'su', 'sus', 'te', 'ti', 'tu', 'tus', 'yo',
  // verbos auxiliares comunes
  'dar', 'es', 'eres', 'estar', 'estoy', 'fue', 'han', 'has', 'hay',
  'he', 'ser', 'son', 'soy',
  // adverbios y relativos sin valor SEO
  'aun', 'bien', 'como', 'cuando', 'donde', 'mal', 'mas', 'muy',
  'no', 'nunca', 'quien', 'quienes', 'siempre', 'tambien', 'todavia',
  // demostrativos
  'aquel', 'aquella', 'aquellas', 'aquellos', 'ese', 'esa', 'esas',
  'esos', 'este', 'esta', 'estas', 'estos',
  // cuantificadores genéricos
  'otro', 'otra', 'otros', 'otras', 'todo', 'toda', 'todos', 'todas',
])

// Combining diacritical marks (U+0300–U+036F), visible after NFD normalization
const DIACRITICS_RE = /[̀-ͯ]/g
const NON_ALPHANUM_RE = /[^a-z0-9\s]/g

export function slugifyTitle(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICS_RE, '')
    .replace(NON_ALPHANUM_RE, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
    .join('-')
    .slice(0, 60)
    .replace(/-+$/, '')
}
