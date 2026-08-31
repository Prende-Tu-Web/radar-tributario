import type { ComboCtaType } from './sanity/types';

export const COMBO_CTA_LABEL: Record<ComboCtaType, string> = {
  form: 'Oferta de entrada',
  calculator: 'Cotización rápida',
  'seasonal-reservation': 'Reserva estacional',
};

export const COMBO_CTA_ICON: Record<ComboCtaType, string> = {
  form: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h4" />',
  calculator: '<rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 10h1M12 10h1M16 10h1M8 14h1M12 14h1M16 14h1M8 18h1M12 18h1M16 18h1" />',
  'seasonal-reservation': '<rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 9h18" />',
};
