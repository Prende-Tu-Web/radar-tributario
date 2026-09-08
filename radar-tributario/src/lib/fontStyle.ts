/**
 * Tipografía/tamaño elegidos en el admin para un campo de texto simple
 * (título/epígrafe/bajada) — mismo vocabulario que la annotation
 * `textStyle` del cuerpo (admin-radar-tributario/src/components/BodyEditor/
 * textFormatting.tsx, mantener sincronizados). `white-space: pre-line`
 * respeta los saltos de línea que el usuario escribe (ahora un <textarea>
 * en el admin) sin perder el wrap normal del resto del texto.
 */
const FONT_FAMILY_VAR: Record<string, string> = { serif: 'var(--font-heading)', sans: 'var(--font-body)' };
// clamp(mínimo en ~375px, fluido, máximo en ~1024px+) — el mínimo evita que
// un tamaño elegido para verse bien en desktop reviente el layout en mobile.
// Antes eran valores fijos en rem (bug real: un título en "Muy grande" se
// renderizaba a 3.25rem igual en un iPhone SE que en un monitor, tapando
// media pantalla — ver /noticias/fiestas-patrias-aguinaldos-normativa-tributaria/).
const FONT_SIZE_VALUE: Record<string, string> = {
  sm: 'clamp(0.75rem, 0.71rem + 0.15vw, 0.8125rem)',
  base: 'clamp(0.8125rem, 0.74rem + 0.31vw, 0.9375rem)',
  lg: 'clamp(0.9375rem, 0.83rem + 0.46vw, 1.125rem)',
  xl: 'clamp(1rem, 0.78rem + 0.92vw, 1.375rem)',
};
// Escala del <h1> del post — separada de FONT_SIZE_VALUE (pensada para
// epígrafe/bajada, textos chicos). Reusar esa escala en el título lo hacía
// VERSE MÁS CHICO que el default de 2rem/2.5rem sin importar la opción
// elegida en el admin (bug real: "Muy grande" achicaba el título).
const TITLE_FONT_SIZE_VALUE: Record<string, string> = {
  sm: 'clamp(1.25rem, 0.96rem + 1.23vw, 1.75rem)',
  base: 'clamp(1.5rem, 1.07rem + 1.85vw, 2.25rem)',
  lg: 'clamp(1.75rem, 1.17rem + 2.47vw, 2.75rem)',
  xl: 'clamp(2rem, 1.28rem + 3.08vw, 3.25rem)',
};

export function fieldStyle(fontFamily?: string, fontSize?: string) {
  return {
    whiteSpace: 'pre-line' as const,
    fontFamily: fontFamily ? FONT_FAMILY_VAR[fontFamily] : undefined,
    fontSize: fontSize ? FONT_SIZE_VALUE[fontSize] : undefined,
  };
}

export function titleFieldStyle(fontFamily?: string, fontSize?: string) {
  return {
    whiteSpace: 'pre-line' as const,
    fontFamily: fontFamily ? FONT_FAMILY_VAR[fontFamily] : undefined,
    fontSize: fontSize ? TITLE_FONT_SIZE_VALUE[fontSize] : undefined,
  };
}
