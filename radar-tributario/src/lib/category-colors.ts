import type { CategoryColor } from './sanity/types';

// Mapea el campo `color` de Sanity (rt-tag-red/teal/navy, definido en el
// schema `category`) a clases Tailwind sobre los design tokens reales del
// sitio. Sin esto, todas las categorías se ven idénticas en el frontend
// aunque el contenido ya trae la distinción cargada.

const BADGE: Record<CategoryColor, string> = {
  'rt-tag-red': 'bg-destructive/10 text-destructive',
  'rt-tag-teal': 'bg-accent/15 text-secondary',
  'rt-tag-navy': 'bg-primary/10 text-primary',
};

const DOT: Record<CategoryColor, string> = {
  'rt-tag-red': 'bg-destructive',
  'rt-tag-teal': 'bg-accent',
  'rt-tag-navy': 'bg-primary',
};

const BORDER_HOVER: Record<CategoryColor, string> = {
  'rt-tag-red': 'hover:border-destructive/50 hover:bg-destructive/[0.04]',
  'rt-tag-teal': 'hover:border-accent/60 hover:bg-accent/[0.06]',
  'rt-tag-navy': 'hover:border-primary/40 hover:bg-primary/[0.04]',
};

const CSS_VAR: Record<CategoryColor, string> = {
  'rt-tag-red': 'var(--rt-destructive)',
  'rt-tag-teal': 'var(--rt-accent)',
  'rt-tag-navy': 'var(--rt-primary)',
};

const DEFAULT: CategoryColor = 'rt-tag-navy';

export function categoryBadgeClass(color?: CategoryColor): string {
  return BADGE[color ?? DEFAULT];
}

export function categoryDotClass(color?: CategoryColor): string {
  return DOT[color ?? DEFAULT];
}

export function categoryBorderHoverClass(color?: CategoryColor): string {
  return BORDER_HOVER[color ?? DEFAULT];
}

// Para CSS generado dinámicamente (selectores por slug que Tailwind no puede
// purgar porque el nombre depende de datos de Sanity, no de texto literal).
export function categoryColorVar(color?: CategoryColor): string {
  return CSS_VAR[color ?? DEFAULT];
}
