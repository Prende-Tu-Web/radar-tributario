// Fotos de perfil (2026-07-17). Viven en el CDN de Sanity pero en el dataset
// "production" (nosotros trabajamos en "development"), así que no son
// resolubles vía sanityClient/urlFor con nuestro cliente actual — se
// referencian directo por URL. Si más adelante se suben al dataset
// "development" como el campo real `author.photo`, ese campo tiene
// prioridad automática (ver uso de esta constante: siempre como fallback).
export const AUTHOR_PHOTO_URL: Record<string, string> = {
  'alexis-contreras': 'https://cdn.sanity.io/images/z8wuevgx/production/7694035361faff5789317407530aa700e423f011-400x400.webp',
  'nayadeth-miranda': 'https://cdn.sanity.io/images/z8wuevgx/production/64a0c758b055e869eb98670ef9c477dabb0bba82-400x400.jpg',
};

export function getAuthorPhotoUrl(slug: string): string | null {
  return AUTHOR_PHOTO_URL[slug] ?? null;
}
