import type { Pillar } from './sanity/types';

export const PILLARS: { key: Pillar; label: string; blurb: string }[] = [
  { key: 'tributario', label: 'Tributario', blurb: 'SII, declaraciones y regularización' },
  { key: 'contable', label: 'Contable', blurb: 'Contabilidad, estados financieros y procesos' },
  { key: 'rrhh', label: 'RRHH', blurb: 'Remuneraciones, contratos y finiquitos' },
];

export function getPillarLabel(pillar: Pillar): string {
  return PILLARS.find((p) => p.key === pillar)?.label ?? pillar;
}
