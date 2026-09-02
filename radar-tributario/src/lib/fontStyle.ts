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

export function fieldStyle(fontFamily?: string, fontSize?: string) {
  return {
    whiteSpace: 'pre-line' as const,
    fontFamily: fontFamily ? FONT_FAMILY_VAR[fontFamily] : undefined,
    fontSize: fontSize ? FONT_SIZE_VALUE[fontSize] : undefined,
  };
}
