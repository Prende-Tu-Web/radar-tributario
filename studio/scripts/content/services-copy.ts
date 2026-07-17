export interface ServiceCopy {
  slug: string;
  shortDescription: string;
  heroDescription: string;
  targetAudience: ('personas-naturales' | 'independientes' | 'pymes' | 'empresas')[];
  benefits: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  showScheduler?: boolean;
}

export const servicesCopy: ServiceCopy[] = [
  // ---------- TRIBUTARIO ----------
  {
    slug: 'declaracion-f29',
    shortDescription: 'Tu F29 presentado a tiempo, todos los meses, sin que tengas que acordarte de la fecha.',
    heroDescription:
      'Revisamos tus movimientos del mes, calculamos IVA y PPM, y presentamos tu F29 antes del plazo. Tú solo confirmas los datos.',
    targetAudience: ['independientes', 'pymes', 'empresas'],
    benefits: [
      { title: 'Cero atrasos', description: 'Calendario propio con margen antes del vencimiento del SII, no el día 12 a las 23:50.' },
      { title: 'Revisión antes de enviar', description: 'Te mostramos el detalle del cálculo, no solo el monto a pagar.' },
      { title: 'Alertas si algo no cuadra', description: 'Si un movimiento se ve raro, te avisamos antes de declarar, no después de una observación.' },
    ],
    faq: [
      { question: '¿Necesito tener la contabilidad al día para esto?', answer: 'No necesariamente. Podemos partir solo con el F29 mensual y sumar contabilidad completa después si lo necesitas.' },
      { question: '¿Qué pasa si ya tengo un F29 atrasado?', answer: 'Lo vemos como parte de una Regularización SII — es un servicio aparte, pero coordinamos ambos juntos.' },
    ],
  },
  {
    slug: 'inicio-actividades',
    shortDescription: 'Inicio de actividades ante el SII, bien hecho desde el primer trámite.',
    heroDescription:
      'Definimos el giro correcto, el régimen tributario que más te conviene y hacemos el trámite completo ante el SII — para persona natural o empresa ya constituida.',
    targetAudience: ['personas-naturales', 'independientes', 'empresas'],
    benefits: [
      { title: 'Régimen tributario bien elegido', description: 'La diferencia entre Pro Pyme y régimen general puede costarte caro si la eliges mal desde el inicio.' },
      { title: 'Giro correcto', description: 'Un giro mal declarado te puede complicar facturación y beneficios tributarios después.' },
      { title: 'Trámite completo', description: 'Tú nos das los datos, nosotros hacemos el resto ante el SII.' },
    ],
    faq: [
      { question: '¿Cuánto se demora el trámite?', answer: 'El inicio de actividades en sí es rápido — normalmente el mismo día si tienes todos los antecedentes listos.' },
      { question: '¿Puedo cambiar de régimen tributario después?', answer: 'Sí, existen ventanas para cambiarse, pero conviene elegir bien desde el principio para evitar trámites extra.' },
    ],
  },
  {
    slug: 'constitucion-empresa',
    shortDescription: 'Tu empresa constituida, con RUT e inicio de actividades — vía digital o notarial, según tu caso.',
    heroDescription:
      'Te armamos la estructura societaria, gestionamos la constitución (digital o notarial), obtenemos el RUT y dejamos la empresa lista para operar con inicio de actividades incluido.',
    targetAudience: ['independientes', 'pymes', 'empresas'],
    benefits: [
      { title: 'Estructura pensada para tu caso', description: 'No es lo mismo un socio único que una sociedad con pactos complejos — te recomendamos la vía correcta.' },
      { title: 'RUT e inicio de actividades incluidos', description: 'No terminas con la empresa constituida pero sin poder facturar.' },
      { title: 'Documentos societarios en orden', description: 'Escritura, RUT y registros quedan archivados y disponibles para ti.' },
    ],
    faq: [
      { question: '¿Cuál es la diferencia entre la vía digital y la notarial?', answer: 'La vía digital ("Empresa en un Día") es más rápida y sirve para estructuras simples. La notarial es necesaria cuando hay varios socios o pactos societarios específicos.' },
      { question: '¿Puedo partir solo y agregar socios después?', answer: 'Sí, aunque modificar la sociedad más adelante implica otro trámite. Si ya sabes que vas a sumar socios, conviene planificarlo desde el inicio.' },
    ],
  },
  {
    slug: 'termino-giro',
    shortDescription: 'Cierre tu empresa o actividad ante el SII sin dejar deudas ni trámites pendientes.',
    heroDescription:
      'Revisamos tu situación tributaria, preparamos la documentación y presentamos el término de giro para que quede formalmente cerrado ante el SII.',
    targetAudience: ['independientes', 'pymes', 'empresas'],
    benefits: [
      { title: 'Revisión previa completa', description: 'Detectamos deudas u observaciones pendientes antes de iniciar el trámite, no durante.' },
      { title: 'Sin sorpresas después', description: 'Un término de giro mal hecho puede reabrirse — nos aseguramos de que quede bien cerrado.' },
      { title: 'Acompañamiento hasta el cierre', description: 'Seguimos el trámite hasta que el SII confirma el término de giro.' },
    ],
    faq: [
      { question: '¿Puedo hacer término de giro si tengo deudas con el SII?', answer: 'Depende del caso — a veces hay que regularizar antes. Lo revisamos en la primera conversación.' },
      { question: '¿Qué pasa con los documentos tributarios después del cierre?', answer: 'Debes guardarlos por el plazo legal de prescripción, aunque la empresa ya no esté operando.' },
    ],
  },
  {
    slug: 'diagnostico-tributario',
    shortDescription: 'Una revisión honesta de tu situación tributaria actual, antes de que se convierta en un problema.',
    heroDescription:
      'Revisamos tus declaraciones, tu régimen tributario y tu cumplimiento con el SII, y te entregamos un diagnóstico claro de qué está bien, qué está en riesgo y qué conviene corregir.',
    targetAudience: ['independientes', 'pymes', 'empresas'],
    benefits: [
      { title: 'Foto real de tu situación', description: 'Sin adornos — te decimos qué está en orden y qué no.' },
      { title: 'Plan de acción concreto', description: 'No es solo un diagnóstico, sino qué hacer con él y en qué orden.' },
      { title: 'Sin compromiso de continuar', description: 'El diagnóstico es un servicio en sí mismo, no un gancho de venta disfrazado.' },
    ],
    faq: [
      { question: '¿Qué necesito entregar para el diagnóstico?', answer: 'Acceso a tu clave SII o tus últimas declaraciones — te decimos exactamente qué en la primera reunión.' },
      { question: '¿Esto reemplaza una auditoría formal?', answer: 'No, es un diagnóstico orientativo. Si detectamos algo que requiere una revisión más profunda, te lo decimos explícitamente.' },
    ],
    showScheduler: true,
  },
  {
    slug: 'regularizacion-sii',
    shortDescription: 'Ponte al día con el SII sin pánico — declaraciones atrasadas, resueltas con un plan claro.',
    heroDescription:
      'Revisamos qué declaraciones están pendientes, calculamos multas e intereses reales (no estimados por miedo) y presentamos todo en orden hasta que quedas al día.',
    targetAudience: ['personas-naturales', 'independientes', 'pymes', 'empresas'],
    benefits: [
      { title: 'Sin juicios, solo soluciones', description: 'Atrasarse le pasa a mucha gente. Partimos de ahí, no de un sermón.' },
      { title: 'Cálculo real de multas', description: 'Te decimos el monto exacto antes de presentar, no un estimado que después cambia.' },
      { title: 'Orden de prioridad', description: 'Si hay varias declaraciones atrasadas, te decimos cuál resolver primero y por qué.' },
    ],
    faq: [
      { question: '¿Cuántos años de atraso pueden regularizar?', answer: 'Depende de tu caso — hay plazos de prescripción que revisamos primero para no trabajar de más.' },
      { question: '¿El SII me puede fiscalizar mientras regularizo?', answer: 'Regularizar de forma proactiva generalmente juega a tu favor frente a una fiscalización posterior.' },
    ],
  },
  {
    slug: 'declaraciones-juradas',
    shortDescription: 'Tus declaraciones juradas presentadas completas y a tiempo, sin errores que generen observaciones.',
    heroDescription:
      'Preparamos y presentamos tus declaraciones juradas ante el SII con la información cruzada correctamente, para que no generen observaciones en tu Renta.',
    targetAudience: ['pymes', 'empresas'],
    benefits: [
      { title: 'Datos cruzados correctamente', description: 'Un error en una declaración jurada se traduce después en una observación del F22 de otra persona.' },
      { title: 'Calendario propio', description: 'Las presentamos antes del plazo, con margen para corregir si algo no cuadra.' },
      { title: 'Trazabilidad', description: 'Guardamos respaldo de lo presentado, por si el SII pide aclaraciones después.' },
    ],
    faq: [
      { question: '¿Qué declaraciones juradas maneja este servicio?', answer: 'Las que correspondan a tu actividad (remuneraciones, honorarios, arriendos, entre otras) — lo definimos según tu caso.' },
      { question: '¿Qué pasa si no presento una declaración jurada?', answer: 'Puede generar multas y, más importante, observaciones en la Renta de terceros que dependen de esa información.' },
    ],
  },
  {
    slug: 'iva-mensual',
    shortDescription: 'Revisión y presentación mensual de tu IVA, con el detalle de crédito y débito fiscal claro.',
    heroDescription:
      'Revisamos tus facturas de compra y venta, calculamos crédito y débito fiscal, y dejamos tu IVA mensual listo y consistente con el resto de tu contabilidad.',
    targetAudience: ['independientes', 'pymes', 'empresas'],
    benefits: [
      { title: 'Crédito fiscal bien aprovechado', description: 'Revisamos que ninguna factura de compra válida quede fuera del cálculo.' },
      { title: 'Consistencia con tu contabilidad', description: 'El IVA que declaras cuadra con tus libros, no son dos números que nunca se hablan.' },
      { title: 'Detalle explicado', description: 'Te mostramos de dónde sale cada cifra, no solo el resultado final.' },
    ],
    faq: [
      { question: '¿Esto es distinto a la Declaración F29?', answer: 'El IVA se declara a través del F29 — este servicio es la revisión y cálculo detallado que hay detrás de esa presentación.' },
      { question: '¿Qué pasa si tengo facturas de compra sin registrar?', answer: 'Las revisamos y te avisamos si falta algo antes de declarar, para no perder crédito fiscal.' },
    ],
  },
  {
    slug: 'renta-persona',
    shortDescription: 'Tu Declaración de Renta (F22) como persona natural o independiente, sin dejar plata sobre la mesa.',
    heroDescription:
      'Revisamos tus ingresos, gastos deducibles y créditos disponibles, y presentamos tu F22 buscando la devolución que te corresponde — o el pago mínimo que realmente debes.',
    targetAudience: ['personas-naturales', 'independientes'],
    benefits: [
      { title: 'Créditos y deducciones revisados', description: 'Muchas personas pagan de más porque nadie les revisó qué podían deducir.' },
      { title: 'Boletas de honorarios ordenadas', description: 'Si emites boletas durante el año, dejamos todo cuadrado antes de declarar.' },
      { title: 'Seguimiento post-declaración', description: 'Si el SII genera una observación, te acompañamos a resolverla.' },
    ],
    faq: [
      { question: '¿Cuándo conviene contratar esto en vez de declarar solo?', answer: 'Si tienes más de una fuente de ingresos, boletas de honorarios, o simplemente no quieres arriesgarte a un error, vale la pena.' },
      { question: '¿Ustedes gestionan la devolución si me corresponde?', answer: 'Sí, hacemos seguimiento de la devolución como parte del servicio (ver también Seguimiento de devolución).' },
    ],
  },
  {
    slug: 'renta-empresa',
    shortDescription: 'Declaración de Renta anual de tu empresa, coordinada con tu contabilidad mensual.',
    heroDescription:
      'Cerramos el año tributario de tu empresa, calculamos la base imponible correctamente y presentamos la Declaración de Renta — como servicio adicional a tu plan mensual.',
    targetAudience: ['pymes', 'empresas'],
    benefits: [
      { title: 'Cierre coordinado con tu contabilidad', description: 'No partimos de cero — usamos lo que ya llevamos durante el año.' },
      { title: 'Régimen tributario revisado', description: 'Confirmamos que sigues en el régimen que más te conviene antes de declarar.' },
      { title: 'Créditos y franquicias aplicados', description: 'Revisamos qué beneficios tributarios le corresponden a tu empresa este año.' },
    ],
    faq: [
      { question: '¿Este servicio reemplaza la contabilidad mensual?', answer: 'No, es adicional. La Renta anual se construye sobre la contabilidad que llevamos mes a mes.' },
      { question: '¿Qué pasa si mi empresa tuvo pérdidas este año?', answer: 'También se declara, y en algunos casos las pérdidas se pueden usar a favor en años futuros — lo evaluamos juntos.' },
    ],
  },
  {
    slug: 'seguimiento-devolucion',
    shortDescription: 'Si el SII generó una observación o tu devolución no llega, hacemos el seguimiento hasta resolverlo.',
    heroDescription:
      'Revisamos por qué el SII observó tu declaración o retuvo tu devolución, preparamos la respuesta o los antecedentes que piden, y hacemos seguimiento hasta que se resuelve.',
    targetAudience: ['personas-naturales', 'independientes', 'pymes', 'empresas'],
    benefits: [
      { title: 'Diagnóstico de la observación', description: 'Te explicamos en lenguaje simple qué observó el SII y por qué.' },
      { title: 'Respuesta con los antecedentes correctos', description: 'Reunimos y presentamos lo que el SII realmente necesita para levantar la observación.' },
      { title: 'Seguimiento activo', description: 'No presentamos y esperamos — hacemos seguimiento del estado hasta que se resuelve.' },
    ],
    faq: [
      { question: '¿Cuánto se demora en resolverse una observación?', answer: 'Varía según el tipo de observación y la carga del SII en ese momento — te damos una estimación realista según tu caso.' },
      { question: '¿Puedo usar este servicio si ya intenté resolverlo solo y no funcionó?', answer: 'Sí, es exactamente el tipo de caso donde más ayuda — revisamos qué faltó y lo corregimos.' },
    ],
  },
  {
    slug: 'cierre-anual',
    shortDescription: 'El cierre contable y tributario de fin de año para tu empresa pequeña, sin sorpresas de último minuto.',
    heroDescription:
      'Revisamos y cerramos tus cuentas del año, dejamos los libros contables al día y tu empresa lista para enfrentar la Operación Renta sin correr contra el tiempo.',
    targetAudience: ['pymes'],
    benefits: [
      { title: 'Cuentas cuadradas antes de fin de año', description: 'Detectamos diferencias a tiempo, no en marzo con la Renta encima.' },
      { title: 'Libros contables al día', description: 'Balance y libros quedan listos para la declaración de Renta.' },
      { title: 'Prioridad para clientes de contabilidad mensual', description: 'Si ya llevamos tu contabilidad durante el año, el cierre es más rápido y ordenado.' },
    ],
    faq: [
      { question: '¿Es lo mismo que la Declaración de Renta empresa?', answer: 'El cierre anual es el paso previo — deja las cuentas listas para que la Renta se declare sin ajustes de última hora.' },
      { question: '¿Cuándo conviene empezar el cierre anual?', answer: 'Idealmente en noviembre o diciembre, no en abril cuando ya está encima el plazo de Renta.' },
    ],
  },

  // ---------- CONTABLE ----------
  {
    slug: 'contabilidad-mensual',
    shortDescription: 'Tu contabilidad mensual al día, con el plan que corresponde al tamaño real de tu operación.',
    heroDescription:
      'Llevamos tu contabilidad mes a mes — desde independientes que recién parten hasta empresas en crecimiento que ya necesitan contable, tributario y remuneraciones coordinados.',
    targetAudience: ['independientes', 'pymes', 'empresas'],
    benefits: [
      { title: 'Plan según tu etapa', description: 'No pagas por procesos que todavía no necesitas ni te quedas corto cuando creces.' },
      { title: 'Libros y reportes al día', description: 'Sabes cómo va tu negocio cada mes, no solo cuando llega la Renta.' },
      { title: 'Escalable sin cambiar de contador', description: 'Si tu operación crece, cambiamos de tier contigo — no tienes que empezar de nuevo con otro proveedor.' },
    ],
    faq: [
      { question: '¿Cómo sé qué tier me corresponde?', answer: 'Lo conversamos en la primera reunión según tu volumen de facturación, número de trabajadores y complejidad de la operación.' },
      { question: '¿Puedo cambiarme de tier durante el año?', answer: 'Sí, es común que una pyme en crecimiento pase de un tier a otro — lo ajustamos cuando corresponda.' },
    ],
  },
  {
    slug: 'conciliacion-bancaria',
    shortDescription: 'Tus movimientos bancarios cuadrados con tu contabilidad, mes a mes.',
    heroDescription:
      'Revisamos tus cartolas bancarias contra tus registros contables y dejamos identificada cualquier diferencia — como servicio independiente de tu plan mensual, si lo necesitas aparte.',
    targetAudience: ['independientes', 'pymes', 'empresas'],
    benefits: [
      { title: 'Diferencias detectadas a tiempo', description: 'Un cargo duplicado o un depósito no registrado se ve rápido cuando se concilia mes a mes.' },
      { title: 'Base confiable para decisiones', description: 'Tus reportes financieros valen lo que valga la conciliación detrás.' },
      { title: 'Compatible con múltiples cuentas', description: 'Si operas con más de una cuenta bancaria, las conciliamos todas.' },
    ],
    faq: [
      { question: '¿Por qué contratar esto aparte si ya tengo contabilidad mensual?', answer: 'Normalmente va incluido. Este servicio es para quienes llevan su contabilidad en otro lado pero quieren la conciliación con nosotros.' },
      { question: '¿Necesito darles acceso a mi banco?', answer: 'Solo acceso de solo lectura a las cartolas, o que nos las envíes tú directamente — como prefieras.' },
    ],
  },
  {
    slug: 'analisis-cuentas',
    shortDescription: 'Revisión detallada de tus cuentas contables para detectar errores, duplicados o clasificaciones incorrectas.',
    heroDescription:
      'Revisamos el detalle de tus cuentas contables, identificamos errores de clasificación o registros duplicados, y te dejamos un informe claro de qué corregir.',
    targetAudience: ['pymes', 'empresas'],
    benefits: [
      { title: 'Errores de clasificación detectados', description: 'Un gasto mal clasificado distorsiona tus resultados sin que te des cuenta.' },
      { title: 'Informe con hallazgos priorizados', description: 'No es una lista larga sin sentido — te decimos qué corregir primero y por qué importa.' },
      { title: 'Base más limpia para tus estados financieros', description: 'Un análisis de cuentas ordenado hace que tus estados financieros reflejen la realidad.' },
    ],
    faq: [
      { question: '¿Cuándo conviene pedir este servicio?', answer: 'Cuando algo en tus números no te cuadra, cuando cambias de contador, o antes de una auditoría o levantamiento de capital.' },
      { question: '¿Qué necesitan de mí para hacer el análisis?', answer: 'Acceso a tu contabilidad del período que quieres revisar — el resto lo hacemos nosotros.' },
    ],
  },
  {
    slug: 'estados-financieros',
    shortDescription: 'Balance y estado de resultados que reflejan tu negocio de verdad, no solo un requisito para el banco.',
    heroDescription:
      'Preparamos tu balance y estado de resultados con base en tu contabilidad, listos para un banco, un inversionista o simplemente para que tú sepas cómo va tu empresa.',
    targetAudience: ['pymes', 'empresas'],
    benefits: [
      { title: 'Listos para terceros', description: 'Formato que un banco o inversionista entiende y acepta sin objeciones.' },
      { title: 'Explicados, no solo entregados', description: 'Te explicamos qué dicen los números, no solo te mandamos el PDF.' },
      { title: 'Periodicidad según tu necesidad', description: 'Mensual, trimestral o anual — según para qué los necesites.' },
    ],
    faq: [
      { question: '¿Necesito tener contabilidad con ustedes para pedir esto?', answer: 'No es obligatorio, pero si ya la llevamos con nosotros, los estados financieros salen más rápido y consistentes.' },
      { question: '¿Sirven para postular a un crédito bancario?', answer: 'Sí, es uno de los usos más comunes — los preparamos en el formato que los bancos suelen pedir.' },
    ],
  },
  {
    slug: 'implementacion-procesos',
    shortDescription: 'Ordenamos cómo fluye la información contable y tributaria dentro de tu empresa, como proyecto único.',
    heroDescription:
      'Revisamos cómo manejas hoy tu información financiera, diseñamos un proceso más ordenado (planillas, aprobaciones, flujo de documentos) y te dejamos implementado el nuevo sistema.',
    targetAudience: ['pymes', 'empresas'],
    benefits: [
      { title: 'Diagnóstico del proceso actual', description: 'Antes de cambiar algo, entendemos cómo trabajas hoy y por qué.' },
      { title: 'Proceso a la medida', description: 'No te vendemos un software genérico — diseñamos el flujo según tu operación real.' },
      { title: 'Proyecto con fecha de término', description: 'Es un proyecto único, no una suscripción — sabes cuándo termina.' },
    ],
    faq: [
      { question: '¿Esto incluye implementar un software contable?', answer: 'Puede incluirlo si es parte de la solución, pero el foco es el proceso — el software es una herramienta, no el objetivo.' },
      { question: '¿Cuánto dura un proyecto de este tipo?', answer: 'Depende de la complejidad de tu operación — lo dimensionamos juntos antes de partir.' },
    ],
  },
  {
    slug: 'correccion-contabilidad-atrasada',
    shortDescription: 'Ponemos al día una contabilidad atrasada, mes por mes, hasta dejarla al corriente.',
    heroDescription:
      'Reconstruimos y corregimos meses de contabilidad atrasada o mal llevada, con la documentación que tengas disponible, hasta dejar tus libros al día.',
    targetAudience: ['independientes', 'pymes', 'empresas'],
    benefits: [
      { title: 'Sin juicios sobre el atraso', description: 'Le pasa a más empresas de las que crees — partimos a resolver, no a cuestionar.' },
      { title: 'Trabajamos con lo que tengas', description: 'Boletas, facturas, cartolas — reconstruimos con la documentación disponible, y te decimos si falta algo.' },
      { title: 'Plan de puesta al día realista', description: 'Te decimos cuánto se puede avanzar por mes, no una promesa de "todo listo en una semana".' },
    ],
    faq: [
      { question: '¿Cuántos meses de atraso pueden corregir?', answer: 'No hay un límite fijo — depende de la documentación disponible y de tus plazos legales pendientes.' },
      { question: '¿Puedo seguir con ustedes después de ponerme al día?', answer: 'Sí, muchos clientes pasan directo a Contabilidad mensual una vez que están al corriente.' },
    ],
  },

  // ---------- RRHH ----------
  {
    slug: 'outsourcing-remuneraciones',
    shortDescription: 'Liquidaciones, libro de remuneraciones y centralización contable — todo tu proceso de remuneraciones, fuera de tu lista de pendientes.',
    heroDescription:
      'Calculamos las liquidaciones de tu equipo, mantenemos el libro de remuneraciones al día y centralizamos todo en tu contabilidad, cobrado por trabajador al mes.',
    targetAudience: ['pymes', 'empresas'],
    benefits: [
      { title: 'Liquidaciones sin errores', description: 'Gratificación, horas extra, licencias, finiquitos parciales — calculado según la ley, no una planilla genérica.' },
      { title: 'Libro de remuneraciones al día', description: 'Listo para fiscalización de la Dirección del Trabajo en cualquier momento.' },
      { title: 'Centralización automática', description: 'La remuneración impacta tu contabilidad sin que tengas que traspasar nada a mano.' },
    ],
    faq: [
      { question: '¿Puedo contratar solo una parte (por ejemplo, solo el libro)?', answer: 'Sí — el Libro de remuneraciones y la Centralización contable también están disponibles como servicios independientes si no necesitas el outsourcing completo.' },
      { question: '¿Cómo se cobra este servicio?', answer: 'Por trabajador al mes — te damos una cotización según el número de personas en tu equipo.' },
    ],
  },
  {
    slug: 'contratos-laborales',
    shortDescription: 'Contratos individuales y anexos, redactados según la ley laboral chilena y tu situación específica.',
    heroDescription:
      'Redactamos tu contrato individual de trabajo o el anexo que necesites, ajustado a la ley laboral vigente y a las condiciones reales del cargo.',
    targetAudience: ['pymes', 'empresas'],
    benefits: [
      { title: 'Cláusulas según tu caso', description: 'No es un formato genérico bajado de internet — se ajusta a jornada, remuneración y funciones reales.' },
      { title: 'Revisión legal incluida', description: 'Antes de que lo firmes, lo revisamos para que no queden vacíos que después generen conflicto.' },
      { title: 'Anexos cuando cambian las condiciones', description: 'Cambio de sueldo, cargo o jornada — el anexo deja el cambio documentado correctamente.' },
    ],
    faq: [
      { question: '¿Cuál es la diferencia entre contrato y anexo?', answer: 'El contrato es el documento inicial de la relación laboral; el anexo modifica una condición específica de un contrato ya vigente.' },
      { question: '¿Necesito esto si ya tengo un contrato tipo que uso siempre?', answer: 'Vale la pena revisarlo — muchos contratos "tipo" tienen cláusulas desactualizadas o que no aplican a tu operación real.' },
    ],
  },
  {
    slug: 'finiquito',
    shortDescription: 'Cálculo, redacción y asesoría para el finiquito — sin errores que después se conviertan en un reclamo.',
    heroDescription:
      'Calculamos indemnizaciones, vacaciones proporcionales y todo lo que corresponde según la causal de término, redactamos el finiquito y te asesoramos en el proceso de firma.',
    targetAudience: ['pymes', 'empresas'],
    benefits: [
      { title: 'Cálculo según la causal correcta', description: 'Una causal mal aplicada puede significar pagar de más o exponerte a un reclamo — la revisamos contigo antes de calcular.' },
      { title: 'Documento listo para ratificar', description: 'Redactado en el formato que corresponde para su ratificación ante notario o Inspección del Trabajo.' },
      { title: 'Asesoría en el proceso', description: 'Te acompañamos en cómo comunicar y ejecutar el término, no solo en el cálculo.' },
    ],
    faq: [
      { question: '¿Cuánto se demora el cálculo de un finiquito?', answer: 'Con la información completa del trabajador (contrato, remuneraciones, causal), normalmente en uno o dos días hábiles.' },
      { question: '¿Qué pasa si el trabajador no está de acuerdo con el monto?', answer: 'Te asesoramos en cómo abordar la conversación y, si corresponde, revisamos el cálculo juntos para confirmar que esté correcto.' },
    ],
  },
  {
    slug: 'calculo-vacaciones',
    shortDescription: 'El cálculo de vacaciones de tu equipo, correcto y a tiempo, como servicio suelto si lo necesitas aparte.',
    heroDescription:
      'Calculamos días disponibles, vacaciones proporcionales y feriado progresivo de tu equipo — como servicio independiente si no necesitas el outsourcing completo de remuneraciones.',
    targetAudience: ['pymes', 'empresas'],
    benefits: [
      { title: 'Feriado progresivo considerado', description: 'Trabajadores con más años en la empresa acumulan días adicionales — lo calculamos correctamente.' },
      { title: 'Saldo siempre actualizado', description: 'Sabes en cualquier momento cuántos días tiene disponibles cada trabajador.' },
      { title: 'Sin errores en la liquidación', description: 'Un mal cálculo de vacaciones se arrastra y complica liquidaciones futuras.' },
    ],
    faq: [
      { question: '¿Esto ya viene incluido si tengo el outsourcing de remuneraciones?', answer: 'Sí. Este servicio es para quienes llevan las remuneraciones por otro lado pero quieren el cálculo de vacaciones con nosotros.' },
      { question: '¿Manejan también las vacaciones colectivas?', answer: 'Sí, las consideramos dentro del cálculo si tu empresa las aplica.' },
    ],
  },
  {
    slug: 'libro-remuneraciones',
    shortDescription: 'Tu libro de remuneraciones al día y listo para fiscalización, contratable por separado.',
    heroDescription:
      'Mantenemos tu libro de remuneraciones actualizado mes a mes con la información de liquidaciones, listo para una fiscalización de la Dirección del Trabajo en cualquier momento.',
    targetAudience: ['pymes', 'empresas'],
    benefits: [
      { title: 'Al día todos los meses', description: 'No se actualiza solo cuando hay una fiscalización encima.' },
      { title: 'Formato correcto', description: 'Cumple con lo que exige la Dirección del Trabajo, sin improvisar el formato.' },
      { title: 'Independiente de quién calcule las liquidaciones', description: 'Puedes llevar las liquidaciones en otro lado y el libro con nosotros.' },
    ],
    faq: [
      { question: '¿Necesito que ustedes hagan las liquidaciones para llevar el libro con ustedes?', answer: 'No, es un servicio independiente — solo necesitamos la información de las liquidaciones ya calculadas.' },
      { question: '¿Qué pasa si nunca he llevado libro de remuneraciones?', answer: 'Lo armamos desde cero con la información histórica disponible.' },
    ],
  },
  {
    slug: 'centralizacion-remuneraciones',
    shortDescription: 'Las remuneraciones de tu equipo, reflejadas correctamente en tu contabilidad — contratable por separado.',
    heroDescription:
      'Tomamos la información de tus liquidaciones ya calculadas y la centralizamos en tu contabilidad, para que sueldos, cotizaciones e impuestos queden registrados correctamente.',
    targetAudience: ['pymes', 'empresas'],
    benefits: [
      { title: 'Contabilidad consistente', description: 'Lo que pagas en remuneraciones cuadra con lo que muestra tu contabilidad.' },
      { title: 'Provisiones bien registradas', description: 'Vacaciones, gratificaciones e indemnizaciones futuras quedan provisionadas, no ocultas.' },
      { title: 'Compatible con cualquier proveedor de liquidaciones', description: 'No necesitas cambiarte de quien te calcula las liquidaciones para contratar esto.' },
    ],
    faq: [
      { question: '¿Puedo contratar esto si mi contabilidad la lleva otra persona?', answer: 'Sí, coordinamos directamente con quien lleve tu contabilidad para que la centralización quede bien integrada.' },
      { question: '¿Con qué frecuencia se hace la centralización?', answer: 'Mensual, en línea con tu ciclo de remuneraciones y tu cierre contable.' },
    ],
  },
];
