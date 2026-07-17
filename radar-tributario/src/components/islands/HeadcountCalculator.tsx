import LeadForm from './LeadForm';

/**
 * Wrapper delgado sobre LeadForm para el combo "rrhh-mensual" — agrega el
 * input de N° de trabajadores (showHeadcount) sin duplicar el resto del
 * formulario. Nunca calcula ni muestra un precio, solo precarga el lead.
 */
export default function HeadcountCalculator() {
  return <LeadForm service="rrhh-mensual" pillar="rrhh" combo="rrhh-mensual" showHeadcount />;
}
