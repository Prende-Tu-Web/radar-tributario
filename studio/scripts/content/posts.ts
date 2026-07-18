import { p, h2, bullets, legalSource } from './portable-text-helpers';

export interface PostSeed {
  slug: string;
  title: string;
  summary: string;
  categorySlug: string;
  authorSlug: 'nayadeth-miranda' | 'alexis-contreras';
  audiencia: ('contadores' | 'abogados-tributaristas' | 'empresas' | 'independientes')[];
  publishedAt: string;
  body: unknown[];
}

// Nota (2026-07-18): el sitio dejó de vender servicios/combos y quedó
// enfocado 100% en el blog + asesoría por contacto. Los CTA de cierre de
// cada post ya no linkean a /servicios/... (ruta eliminada) — invitan a
// agendar una asesoría en /contacto/. Slugs se mantienen idénticos a los
// que ya están publicados en el dataset "development" para no romper URLs
// indexadas (createOrReplace en seed-posts.ts resuelve por slug → mismo _id).

export const posts: PostSeed[] = [
  // ============ NAYADETH MIRANDA (7) — tributario/contable/auditoría, ángulo gerencial ============
  {
    slug: 'reforma-tributaria-2026',
    title: 'Reforma Tributaria 2026: qué cambia realmente para tu empresa',
    summary:
      'El Plan de Reconstrucción Nacional propone bajar el Impuesto de Primera Categoría y volver a un sistema 100% integrado hacia 2031. Esto es lo que ya está definido y lo que todavía es proyecto de ley — y qué decisiones conviene empezar a modelar desde ya.',
    categorySlug: 'reforma-tributaria',
    authorSlug: 'nayadeth-miranda',
    audiencia: ['empresas', 'contadores'],
    publishedAt: '2026-05-18T13:00:00.000Z',
    body: [
      p(
        'El 22 de abril de 2026 el Gobierno ingresó al Congreso el proyecto conocido como Plan de Reconstrucción Nacional, que incluye la reforma tributaria más relevante desde 2020. Como es un proyecto de ley, nada de esto está vigente todavía — pero si tu empresa tiene utilidades retenidas importantes, es exactamente el tipo de cambio que conviene empezar a modelar antes de que se apruebe, no después.'
      ),
      h2('La baja del Impuesto de Primera Categoría'),
      p(
        'La propuesta reduce el IDPC del 27% actual al 23% de forma gradual: 25,5% en 2027, 24% en 2028 y 23% en 2029. Para el régimen Pro Pyme se contempla una tasa transitoria más baja — 12,5% entre 2026 y 2027, y 15% en 2028.'
      ),
      h2('Vuelta a la integración total'),
      p(
        'El cambio de fondo es el regreso a un sistema tributario 100% integrado hacia el año tributario 2031. Hoy operamos con un sistema semi-integrado, donde no todo el impuesto pagado por la empresa se puede usar como crédito contra los impuestos personales del dueño. Si esto avanza tal como está redactado, se elimina esa doble tributación parcial — y cambia el cálculo de conveniencia entre retirar utilidades ahora o dejarlas retenidas.'
      ),
      h2('Otras medidas del proyecto'),
      ...bullets([
        'Reducción del 50% al impuesto a las donaciones por 12 meses.',
        'Régimen voluntario de repatriación de capitales con impuesto único de 10% (7% si la inversión se mantiene en Chile al menos 8 años).',
        'Crédito de hasta 15% de la remuneración para incentivar contratación, aplicable contra PPM e IVA.',
      ]),
      p(
        'Mi recomendación con clientes: no tomar decisiones estructurales grandes basadas en un proyecto de ley todavía no aprobado, pero sí empezar a modelar escenarios. El momento en que se apruebe (o no) esta reforma puede cambiar bastante la conveniencia de retirar o no utilidades este año.'
      ),
      legalSource(
        'Otro',
        'Gob.cl — Principales medidas del Plan de Reconstrucción Nacional',
        'https://www.gob.cl/noticias/principales-medidas-plan-reconstruccion-nacional-detalles/'
      ),
      p(
        { text: 'Si tu empresa tiene utilidades retenidas relevantes, conviene revisar el impacto de esto en tu caso concreto antes de decidir. ' },
        { text: 'Agenda una asesoría', href: '/contacto/' },
        { text: ' y modelamos los escenarios con tus números reales.' }
      ),
    ],
  },
  {
    slug: 'operacion-renta-2026',
    title: 'Operación Renta 2026: los errores que generan observaciones y cómo evitarlos',
    summary:
      'El plazo general del F22 vence el 30 de abril, con prórroga hasta el 8 de mayo si declaras por internet. Pero el problema casi nunca es el plazo — es llegar a él con el cierre contable a medio hacer.',
    categorySlug: 'impuesto-renta',
    authorSlug: 'nayadeth-miranda',
    audiencia: ['empresas', 'independientes', 'contadores'],
    publishedAt: '2026-06-02T13:00:00.000Z',
    body: [
      p(
        'Cada año veo el mismo patrón en empresas que terminan con observaciones del SII: no es que declararon tarde, es que declararon con el cierre contable del ejercicio sin cuadrar. La Operación Renta no es un trámite de un día — es el resultado de cómo se llevó la contabilidad los doce meses anteriores.'
      ),
      h2('El plazo real'),
      p(
        'El plazo legal para presentar el Formulario 22 vence el 30 de abril. Si declaras por internet, en la práctica el SII ha dado prórroga hasta el 8 de mayo en años recientes — pero no lo des por hecho de antemano, siempre confirma el plazo del año en curso en el sitio del SII antes de dejarlo para última hora.'
      ),
      h2('Qué preparar antes, no durante'),
      ...bullets([
        'Certificados de honorarios y sueldos del año anterior.',
        'Gastos deducibles con respaldo (dependiendo de tu régimen) — con el criterio claro de qué queda como aceptado y qué no.',
        'Movimientos de inversión que generen ganancias o pérdidas de capital.',
        'Cierre contable del ejercicio ya conciliado, no a medio hacer.',
      ]),
      h2('Dónde aparecen las observaciones'),
      p(
        'Las observaciones del SII casi nunca salen de un error de cálculo puntual — salen de inconsistencias entre lo que declaraste en Renta y lo que ya reportaste durante el año en IVA, en las declaraciones juradas de terceros, o en tus propios DTE. Si tu contabilidad no está cuadrada antes de abril, vas a declarar con ajustes de último minuto, y ahí es exactamente donde se generan esas inconsistencias.'
      ),
      legalSource('SII', 'SII — Guía Práctica de Declaración de Renta 2026', 'https://www.sii.cl/servicios_online/renta/guia_practica_renta_2026.pdf'),
      p(
        { text: 'Si quieres llegar a abril con la contabilidad realmente cuadrada, no con ajustes de último minuto, ' },
        { text: 'conversemos de tu caso', href: '/contacto/' },
        { text: ' con tiempo suficiente para corregir antes de declarar, no después.' }
      ),
    ],
  },
  {
    slug: 'regimen-pro-pyme-14d',
    title: 'Régimen Pro Pyme 14 D: requisitos reales y cuándo conviene cambiarte',
    summary:
      'El régimen Pro Pyme no es automático solo por ser una empresa chica — tiene topes de capital e ingresos específicos. Esto es lo que realmente exige el SII, y en qué casos el cambio de régimen le conviene al dueño y en cuáles no.',
    categorySlug: 'pymes',
    authorSlug: 'nayadeth-miranda',
    audiencia: ['empresas', 'independientes'],
    publishedAt: '2026-06-20T13:00:00.000Z',
    body: [
      p(
        'Una de las preguntas que más me hacen dueños de empresa es "¿estoy en el régimen que me corresponde?" — y casi siempre la respuesta requiere revisar números concretos, no solo el tamaño percibido de la empresa. Elegir mal el régimen no es un detalle administrativo: cambia cuánto impuesto paga la empresa y cuánto paga después el dueño por los retiros.'
      ),
      h2('Los requisitos reales'),
      ...bullets([
        'El capital aportado al inicio de actividades no puede superar las 85.000 UF.',
        'El promedio de ingresos del giro de los últimos 3 años no puede superar las 75.000 UF.',
        'Ese límite de 75.000 UF se puede exceder una sola vez, siempre que ningún ejercicio individual supere las 85.000 UF.',
        'Los ingresos por actividades pasivas (arriendos, intereses, etc.) no pueden superar el 35% de los ingresos del giro.',
      ]),
      h2('14 D N°3 (general) vs 14 D N°8 (transparente)'),
      p(
        'Dentro de Pro Pyme hay dos variantes con implicancias muy distintas para el dueño: el régimen general tributa a nivel de empresa y el propietario tributa después por los retiros, mientras que el régimen transparente traspasa directamente la renta al dueño, sin tributación a nivel de empresa. La decisión correcta depende de tu situación personal de impuestos, no solo de la empresa — y es exactamente el tipo de decisión que conviene modelar antes de tomarla, no corregir después.'
      ),
      legalSource(
        'SII',
        'SII — Requisitos para optar al Régimen Pro Pyme',
        'https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_7530.htm'
      ),
      p(
        { text: 'Si no estás seguro de tu régimen actual o de si te conviene cambiarte, ' },
        { text: 'agenda una asesoría', href: '/contacto/' },
        { text: ' y lo revisamos con tus números reales, no con supuestos.' }
      ),
    ],
  },
  {
    slug: 'crs-sii-cuentas-extranjero',
    title: 'CRS: qué reporta el SII sobre tus cuentas en el extranjero',
    summary:
      'Desde 2018 Chile intercambia información financiera automáticamente con más de 100 países. Si tienes cuentas fuera de Chile, la pregunta ya no es si el SII lo sabe — es si tu Declaración de Renta lo refleja correctamente.',
    categorySlug: 'internacional',
    authorSlug: 'nayadeth-miranda',
    audiencia: ['empresas', 'independientes'],
    publishedAt: '2026-06-28T13:00:00.000Z',
    body: [
      p(
        'El Common Reporting Standard (CRS) es el estándar de la OCDE para el intercambio automático de información financiera entre países. Chile se comprometió a implementarlo en 2015 y empezó a intercambiar información en 2018, mediante el Decreto de Hacienda N°418 de julio de 2017.'
      ),
      h2('Cómo funciona en la práctica'),
      p(
        'Las instituciones financieras chilenas y extranjeras reportan cuentas de personas con residencia tributaria fuera de su país de origen. En Chile, las instituciones financieras deben presentar una declaración jurada al SII a más tardar el 30 de junio de cada año, reportando las cuentas relacionadas con personas con residencia tributaria en el extranjero mantenidas durante el año calendario anterior.'
      ),
      p(
        'En septiembre de cada año, el SII recibe a su vez información sobre las cuentas de chilenos en el extranjero. Esto no es un trámite menor: hay casos recientes de fiscalización específicamente enfocados en contribuyentes con cuentas financieras en el exterior no declaradas.'
      ),
      h2('Qué significa esto para el dueño de una empresa con operación internacional'),
      p(
        'Si tienes cuentas, inversiones o ingresos en el extranjero, la pregunta no es si el SII tiene esa información — en la mayoría de los casos, ya la tiene o la va a tener. La pregunta es si tu Declaración de Renta la refleja correctamente, y si no, qué tan expuesto queda tu patrimonio personal frente a una fiscalización.'
      ),
      legalSource(
        'SII',
        'SII — Estándar de intercambio automático de información',
        'https://www.sii.cl/asuntos_internacionales/estandarintercambio.html'
      ),
      p(
        { text: 'Si tienes ingresos o cuentas en el extranjero y quieres confirmar que tu situación está correctamente declarada, ' },
        { text: 'conversemos', href: '/contacto/' },
        { text: ' antes de que llegue una observación, no después.' }
      ),
    ],
  },
  {
    slug: 'niif-pymes-boletin-tecnico-82',
    title: 'Estados financieros bajo NIIF: por qué le importa a tu banco o a tu próximo inversionista',
    summary:
      'Muchas empresas medianas todavía preparan sus estados financieros con criterios antiguos o mezclados. No se nota hasta que esos números se necesitan para algo importante: una línea de crédito, una due diligence o la entrada de un socio.',
    categorySlug: 'contabilidad',
    authorSlug: 'nayadeth-miranda',
    audiencia: ['empresas', 'contadores'],
    publishedAt: '2026-07-05T13:00:00.000Z',
    body: [
      p(
        'Desde 2013, el marco vigente para preparar estados financieros en Chile es NIIF (Full o Pyme) — los antiguos boletines técnicos (PCGA chilenos) quedaron derogados. En septiembre de 2010 la Comisión de Principios y Normas de Contabilidad del Colegio de Contadores de Chile había aprobado el Boletín Técnico 82, que adopta de forma íntegra la Norma NIIF para Pymes emitida por el IASB.'
      ),
      h2('Por qué esto no es solo un tecnicismo contable'),
      p(
        'NIIF para Pymes está pensada específicamente para entidades que no cotizan en bolsa ni tienen obligación pública de rendir cuentas — es decir, la gran mayoría de las empresas medianas chilenas. El problema es que muchas de esas empresas todavía se preparan con criterios antiguos o mezclados, porque nunca hicieron la transición formal. Mientras nadie externo mire esos números, no pasa nada visible.'
      ),
      h2('El momento en que sí importa'),
      p(
        'Se nota, y le cuesta caro al dueño, cuando esos estados financieros se necesitan para un banco, un inversionista o un proceso de venta de la empresa. Si no están bajo un marco reconocido, generan más preguntas de las que responden — y en una negociación de crédito o de capital, cada pregunta sin resolver es tiempo perdido o condiciones peores. No es un problema de cumplimiento normativo abstracto; es un problema de cuánto vale y cuánta confianza genera tu empresa frente a un tercero.'
      ),
      legalSource(
        'Otro',
        'Colegio de Contadores de Chile — Boletín Técnico 82 (NIIF para Pymes)',
        'https://www.contach.cl/normas-boletines-tecnicos-niif.php'
      ),
      p(
        { text: 'Si vas a levantar capital, pedir una línea de crédito o simplemente quieres saber si tus estados financieros resistirían una revisión externa, ' },
        { text: 'agenda una asesoría', href: '/contacto/' },
        { text: ' antes de que sea la contraparte quien te lo señale.' }
      ),
    ],
  },
  {
    slug: 'gratificacion-legal-chile',
    title: 'Gratificación legal: el error de cálculo que más le cuesta a las empresas',
    summary:
      'Existen dos métodos legales distintos para calcular la gratificación, con un tope específico. El error más común no es de mala fe — es no aplicar el tope, y eso significa pagar de más mes tras mes sin que nadie lo note hasta una auditoría.',
    categorySlug: 'laboral-tributario',
    authorSlug: 'nayadeth-miranda',
    audiencia: ['empresas'],
    publishedAt: '2026-06-22T13:00:00.000Z',
    body: [
      p(
        'De los errores que más frecuentemente encuentro al revisar la contabilidad de una empresa que llega nueva a auditoría, el cálculo de la gratificación legal está entre los más comunes — y de los más costosos, porque el error se repite todos los meses hasta que alguien lo detecta.'
      ),
      h2('Los dos métodos legales'),
      p(
        'El Código del Trabajo contempla dos formas de calcular la gratificación: el Artículo 47 (30% de las utilidades líquidas repartidas entre los trabajadores) y el Artículo 50 (25% del sueldo imponible, con un tope anual de 4,75 Ingresos Mínimos Mensuales). La mayoría de las empresas usa el método del Artículo 50 porque es predecible, pero es justo ahí donde aparece el error.'
      ),
      h2('El error típico y lo que cuesta'),
      p(
        'Con un Ingreso Mínimo Mensual de $529.000, el tope anual de gratificación es $2.512.750, lo que da un tope mensual de $209.396 si se paga fraccionado en 12 cuotas. Cuando el tope no se aplica correctamente, la empresa sigue pagando el 25% del sueldo imponible sin límite — lo que en una planilla de varios trabajadores puede significar un sobrepago acumulado relevante en un año, y que nadie detecta hasta que alguien audita la planilla completa.'
      ),
      legalSource('Otro', 'Dirección del Trabajo — La Gratificación Legal', 'https://www.dt.gob.cl/portal/1626/w3-article-99034.html'),
      p(
        { text: 'Si nunca revisaste si tu empresa está aplicando correctamente el tope, vale la pena hacerlo antes de que se acumule en varios años de planilla. ' },
        { text: 'Agenda una asesoría', href: '/contacto/' },
        { text: ' y lo revisamos.' }
      ),
    ],
  },
  {
    slug: 'libro-compras-ventas-2026',
    title: 'Nuevos campos en el libro de compras y ventas 2026: qué debes declarar distinto',
    summary:
      'El SII agregó campos obligatorios al libro de compras y ventas para 2026. No declararlos correctamente no es un detalle menor — es exactamente el tipo de inconsistencia que un cruce de datos automatizado detecta primero.',
    categorySlug: 'iva',
    authorSlug: 'nayadeth-miranda',
    audiencia: ['empresas'],
    publishedAt: '2026-07-08T13:00:00.000Z',
    body: [
      p(
        'Este es un cambio que suele pasar desapercibido hasta que genera una observación: el SII incorporó nuevos campos obligatorios al libro de compras y ventas, y muchas empresas van a completarlos mal o incompletos si nadie revisa el proceso antes de la primera declaración del año con la nueva exigencia.'
      ),
      h2('Los campos nuevos'),
      ...bullets([
        'Código de país del cliente.',
        'Indicador de si la operación es prestación de servicios o venta de bienes.',
        'Clasificación del tipo de cliente.',
      ]),
      h2('Por qué esto no es "un campo más"'),
      p(
        'Si esta información no queda registrada correctamente al momento de emitir el documento, alguien termina completándola después, a mano, revisando documento por documento — y ese proceso manual es exactamente donde se cuelan errores en la declaración de IVA mensual. La consecuencia no es solo administrativa: un libro de compras y ventas con inconsistencias es una de las primeras cosas que un cruce de información del SII detecta frente a lo declarado en Renta.'
      ),
      legalSource('SII', 'SII — Índice de Resoluciones 2026', 'https://www.sii.cl/normativa_legislacion/resoluciones/2026/res_ind2026.htm'),
      p(
        { text: 'Si no tienes claro si tu empresa ya está declarando estos campos correctamente, ' },
        { text: 'conversemos', href: '/contacto/' },
        { text: ' antes de que se acumulen meses de declaraciones con el mismo error.' }
      ),
    ],
  },

  // ============ ALEXIS CONTRERAS (3) — tecnología, automatización, IA aplicada al mundo tributario ============
  {
    slug: 'leer-resolucion-sii',
    title: 'Por qué automatizamos el rastreo de resoluciones del SII (en vez de leerlas a mano)',
    summary:
      'El SII publica decenas de resoluciones al año en un índice público, escritas para especialistas. En vez de revisarlas una por una, construimos un proceso que las monitorea automáticamente. Así funciona, y por qué la mayoría de las empresas se entera tarde de un cambio que las afecta.',
    categorySlug: 'sii-resoluciones',
    authorSlug: 'alexis-contreras',
    audiencia: ['empresas', 'independientes'],
    publishedAt: '2026-06-10T13:00:00.000Z',
    body: [
      p(
        'Como Technical Lead, mi trabajo no es interpretar el derecho tributario — es diseñar sistemas que no dependan de que alguien se acuerde de revisar un índice a tiempo. El SII publica un índice anual de resoluciones en su sitio, y cada una puede cambiar una obligación, un plazo o un requisito técnico. El problema real no es leerlas: es enterarse de que existen antes de que te afecten.'
      ),
      h2('El problema de fondo es de proceso, no de lectura'),
      p(
        'La mayoría de las empresas se entera de una resolución nueva porque su contador la menciona de pasada, o porque ya generó un problema. Eso es un proceso reactivo. La alternativa es tratar el monitoreo normativo como cualquier otro proceso que se puede automatizar: definir la fuente oficial, revisarla en un intervalo fijo, y generar una alerta cuando aparece algo nuevo relevante para el negocio — en vez de depender de que alguien se acuerde de mirar.'
      ),
      h2('Qué automatizamos nosotros'),
      ...bullets([
        'Un proceso que revisa periódicamente el índice de resoluciones del SII, en vez de depender de encontrarlo por casualidad.',
        'Clasificación automática por tema (facturación, IVA, fiscalización, etc.) para separar el ruido de lo que realmente aplica a cada tipo de empresa.',
        'Resúmenes generados para identificar rápido si una resolución modifica algo vigente, antes de decidir si vale la pena leerla completa.',
      ]),
      p(
        'Esto no reemplaza el criterio profesional para interpretar qué significa un cambio normativo — reemplaza el trabajo manual de encontrarlo a tiempo. Ese es el tipo de problema donde la automatización y las herramientas de lenguaje aportan más valor real que promesa de marketing: reducir el tiempo entre que algo se publica y que alguien lo nota.'
      ),
      legalSource('SII', 'SII — Índice de Resoluciones 2026', 'https://www.sii.cl/normativa_legislacion/resoluciones/2026/res_ind2026.htm'),
      p(
        { text: 'Si te interesa cómo estructurar este tipo de monitoreo para tu propia operación, ' },
        { text: 'escríbenos', href: '/contacto/' },
        { text: '.' }
      ),
    ],
  },
  {
    slug: 'fiscalizacion-sii-cruce-datos',
    title: 'Cómo el SII te fiscaliza sin que te des cuenta: cruce de datos y sistemas automatizados',
    summary:
      'La fiscalización moderna no empieza con una carta — empieza con un sistema que cruza información de distintas fuentes y genera una alerta cuando algo no cuadra. Así es como funciona en la práctica, explicado desde el lado de los sistemas.',
    categorySlug: 'fiscalizacion',
    authorSlug: 'alexis-contreras',
    audiencia: ['empresas', 'independientes'],
    publishedAt: '2026-06-15T13:00:00.000Z',
    body: [
      p(
        'Me interesa esto desde el lado de los sistemas: el SII no fiscaliza revisando contribuyente por contribuyente al azar. Fiscaliza con sistemas que cruzan datos de múltiples fuentes automáticamente, y las alertas salen cuando algo no cuadra entre esas fuentes — es el mismo tipo de arquitectura de detección de anomalías que se usa en cualquier sistema financiero a gran escala.'
      ),
      h2('Un ejemplo real y reciente'),
      p(
        'El SII informó públicamente que puso foco en 63 contribuyentes que registraban pagos en sus cuentas financieras en el exterior por más de $1,5 billones, sin incorporarlos en sus declaraciones anuales de Renta. Ese hallazgo no salió de una auditoría manual caso por caso — salió de cruzar la información que Chile recibe vía CRS (intercambio automático internacional) contra lo efectivamente declarado.'
      ),
      h2('Qué significa esto a nivel de sistemas'),
      ...bullets([
        'Si tu facturación, tu IVA y tu Renta no son consistentes entre sí, un sistema automatizado lo detecta más rápido que una persona.',
        'Mientras más fuentes de datos existan sobre tu actividad (DTE, información financiera, declaraciones juradas de terceros), menos margen hay para inconsistencias silenciosas.',
        'Este tipo de cruce de datos es, en esencia, el mismo problema técnico que resuelve cualquier sistema de detección de fraude: encontrar el patrón que no encaja entre múltiples fuentes.',
      ]),
      p(
        'La mejor defensa técnica es la misma que la mejor práctica de sistemas en general: que tus propios datos sean consistentes entre sí antes de que un sistema externo note que no lo son. Eso no es un consejo contable — es cómo se diseña cualquier arquitectura que necesita sobrevivir una auditoría, tributaria o no.'
      ),
      legalSource(
        'SII',
        'SII — Foco en contribuyentes con cuentas financieras en el exterior no declaradas',
        'https://www.sii.cl/noticias/2025/091225noti01pcr.htm'
      ),
      p(
        { text: 'Si quieres entender qué tan expuestos están tus propios sistemas a este tipo de cruce, ' },
        { text: 'conversemos', href: '/contacto/' },
        { text: '.' }
      ),
    ],
  },
  {
    slug: 'facturacion-electronica-2026',
    title: 'Facturación electrónica 2026: por qué es un problema de integración de sistemas, no de papeleo',
    summary:
      'El SII postergó la entrada en vigencia de nuevas exigencias en facturas y guías de despacho de mayo a noviembre 2026. La parte que menos se cubre cuando se habla de esto: lo que cambia a nivel de arquitectura e integración, no solo qué formulario hay que llenar distinto.',
    categorySlug: 'tecnologia-y-automatizacion',
    authorSlug: 'alexis-contreras',
    audiencia: ['empresas'],
    publishedAt: '2026-05-25T13:00:00.000Z',
    body: [
      p(
        'Como Technical Lead, esta es la parte que menos se cubre cuando se habla de cambios normativos del SII: qué significa realmente a nivel de integración y sistemas, no solo qué hay que declarar distinto.'
      ),
      h2('El cambio de fondo'),
      p(
        'Una resolución del SII modificó el resolutivo 10° de la Resolución 154/2025, postergando la entrada en vigencia de nuevas exigencias sobre facturas y guías de despacho del 1 de mayo al 1 de noviembre de 2026. Si tu equipo de desarrollo o tu proveedor de ERP ya estaba trabajando contra la fecha original, esto les da margen — pero no significa que se pueda dejar para último minuto otra vez.'
      ),
      h2('Por qué es un problema de arquitectura'),
      p(
        'Cualquier sistema que genere o consuma Documentos Tributarios Electrónicos queda afectado por este tipo de cambio, no solo el módulo de facturación: el flujo de ventas exentas, la integración con el libro de compras y ventas, y cualquier proceso automatizado que dependa de la estructura del DTE. Tratar esto como "hay que actualizar un formulario" subestima el trabajo real — es un cambio de esquema que hay que probar de punta a punta antes de que entre en vigencia, no descubrir en producción el día que ya es obligatorio.'
      ),
      p(
        'Si administras o encargaste un ERP a medida, este es exactamente el tipo de cambio regulatorio que se anticipa con un plan de pruebas y ambientes de staging — la misma disciplina que aplicarías a cualquier cambio de API de un proveedor externo, porque en la práctica es eso: una integración con un sistema externo que no vas a poder negociar.'
      ),
      legalSource('SII', 'SII — Índice de Resoluciones 2026', 'https://www.sii.cl/normativa_legislacion/resoluciones/2026/res_ind2026.htm'),
      p(
        { text: 'Si necesitas revisar qué tan preparados están tus sistemas para este cambio, ' },
        { text: 'escríbenos', href: '/contacto/' },
        { text: '.' }
      ),
    ],
  },
];
