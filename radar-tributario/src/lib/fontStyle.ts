/**
 * Tipografía/tamaño elegidos en el admin para un campo de texto simple
 * (título/epígrafe/bajada) — mismo vocabulario que la annotation
 * `textStyle` del cuerpo (admin-radar-tributario/src/components/BodyEditor/
 * textFormatting.tsx, mantener sincronizados). `white-space: pre-line`
 * respeta los saltos de línea que el usuario escribe (ahora un <textarea>
 * en el admin) sin perder el wrap normal del resto del texto.
 */
const FONT_FAMILY_VAR: Record<string, string> = { serif: 'var(--font-heading)', sans: 'var(--font-body)' };
const FONT_SIZE_VALUE: Record<string, string> = { sm: '0.8125rem', base: '0.9375rem', lg: '1.125rem', xl: '1.375rem' };
// Escala del <h1> del post — separada de FONT_SIZE_VALUE (pensada para
// epígrafe/bajada, textos chicos). Reusar esa escala en el título lo hacía
// VERSE MÁS CHICO que el default de 2rem/2.5rem sin importar la opción
// elegida en el admin (bug real: "Muy grande" achicaba el título).
const TITLE_FONT_SIZE_VALUE: Record<string, string> = { sm: '1.75rem', base: '2.25rem', lg: '2.75rem', xl: '3.25rem' };

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
