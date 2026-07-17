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

export const posts: PostSeed[] = [
  // ============ NAYADETH MIRANDA (5) — tributario/contable/auditoría ============
  {
    slug: 'reforma-tributaria-2026-que-cambia-para-tu-empresa',
    title: 'Reforma Tributaria 2026: qué cambia realmente para tu empresa',
    summary:
      'El Plan de Reconstrucción Nacional propone bajar el Impuesto de Primera Categoría y volver a un sistema 100% integrado hacia 2031. Esto es lo que ya está definido y lo que todavía es proyecto de ley.',
    categorySlug: 'reforma-tributaria',
    authorSlug: 'nayadeth-miranda',
    audiencia: ['empresas', 'contadores'],
    publishedAt: '2026-05-18T13:00:00.000Z',
    body: [
      p(
        'El 22 de abril de 2026 el Gobierno ingresó al Congreso el proyecto conocido como Plan de Reconstrucción Nacional, que incluye la reforma tributaria más relevante desde la reforma 2020. Como es un proyecto de ley, nada de esto está vigente todavía — pero vale la pena entender hacia dónde va, porque varias empresas ya están ajustando su planificación con esto en mente.'
      ),
      h2('La baja del Impuesto de Primera Categoría'),
      p(
        'La propuesta reduce el IDPC del 27% actual al 23% de forma gradual: 25,5% en 2027, 24% en 2028 y 23% en 2029. Para el régimen Pro Pyme se contempla una tasa transitoria más baja — 12,5% entre 2026 y 2027, y 15% en 2028.'
      ),
      h2('Vuelta a la integración total'),
      p(
        'El cambio de fondo es el regreso a un sistema tributario 100% integrado hacia el año tributario 2031. Hoy operamos con un sistema semi-integrado, donde no todo el impuesto pagado por la empresa se puede usar como crédito contra los impuestos personales del dueño. Si esto avanza tal como está redactado, se elimina esa doble tributación parcial.'
      ),
      h2('Otras medidas del proyecto'),
      ...bullets([
        'Reducción del 50% al impuesto a las donaciones por 12 meses.',
        'Régimen voluntario de repatriación de capitales con impuesto único de 10% (7% si la inversión se mantiene en Chile al menos 8 años).',
        'Crédito de hasta 15% de la remuneración para incentivar contratación, aplicable contra PPM e IVA.',
      ]),
      p(
        'Mi recomendación con clientes: no tomar decisiones estructurales grandes basadas en un proyecto de ley todavía no aprobado, pero sí empezar a modelar escenarios. Si tu empresa tiene utilidades retenidas importantes, el momento en que se apruebe (o no) esta reforma puede cambiar bastante la conveniencia de retirar o no utilidades este año.'
      ),
      legalSource(
        'Otro',
        'Gob.cl — Principales medidas del Plan de Reconstrucción Nacional',
        'https://www.gob.cl/noticias/principales-medidas-plan-reconstruccion-nacional-detalles/'
      ),
      p(
        {
          text: 'Si quieres entender cómo te afecta específicamente a ti, partamos con un ',
        },
        { text: 'diagnóstico tributario', href: '/servicios/tributario/diagnostico-tributario/' },
        { text: ' o revisemos directamente tu ' },
        { text: 'Declaración de Renta empresa', href: '/servicios/tributario/renta-empresa/' },
        { text: ' del próximo año con esto en mente.' }
      ),
    ],
  },
  {
    slug: 'operacion-renta-2026-fechas-y-que-preparar',
    title: 'Operación Renta 2026: fechas, plazos y qué preparar antes de abril',
    summary:
      'El plazo general del F22 vence el 30 de abril, con prórroga hasta el 8 de mayo si declaras por internet. Esto es lo que hay que tener listo antes, no durante.',
    categorySlug: 'impuesto-renta',
    authorSlug: 'nayadeth-miranda',
    audiencia: ['empresas', 'independientes', 'contadores'],
    publishedAt: '2026-06-02T13:00:00.000Z',
    body: [
      p(
        'Cada año veo el mismo patrón: gente que empieza a juntar boletas y certificados la primera semana de abril, cuando el SII ya lleva semanas con el proceso abierto. La Operación Renta no es un trámite de un día — es un proceso que se prepara con meses de anticipación si quieres que te vaya bien.'
      ),
      h2('El plazo real'),
      p(
        'El plazo legal para presentar el Formulario 22 vence el 30 de abril. Si declaras por internet, en la práctica el SII ha dado prórroga hasta el 8 de mayo en años recientes — pero no lo des por hecho de antemano, siempre confirma el plazo del año en curso en el sitio del SII antes de dejarlo para última hora.'
      ),
      h2('Qué preparar antes, no durante'),
      ...bullets([
        'Certificados de honorarios y sueldos del año anterior.',
        'Gastos deducibles con respaldo (dependiendo de tu régimen).',
        'Movimientos de inversión que generen ganancias o pérdidas de capital.',
        'Si tienes empresa: cierre contable del ejercicio ya conciliado, no a medio hacer.',
      ]),
      p(
        'Para empresas, esto se conecta directo con el cierre anual — si tu contabilidad no está cuadrada antes de abril, vas a declarar Renta con ajustes de último minuto, y ahí es donde aparecen los errores que después generan observaciones.'
      ),
      legalSource('SII', 'SII — Guía Práctica de Declaración de Renta 2026', 'https://www.sii.cl/servicios_online/renta/guia_practica_renta_2026.pdf'),
      p(
        { text: 'Si eres persona natural o independiente, revisa nuestro servicio de ' },
        { text: 'Declaración de Renta persona', href: '/servicios/tributario/renta-persona/' },
        { text: '. Si tienes empresa, conviene partir por el ' },
        { text: 'Cierre anual', href: '/servicios/tributario/cierre-anual/' },
        { text: ' antes que la Renta misma.' }
      ),
    ],
  },
  {
    slug: 'regimen-pro-pyme-14d-cuando-conviene-cambiarte',
    title: 'Régimen Pro Pyme 14 D: requisitos reales y cuándo conviene cambiarte',
    summary:
      'El régimen Pro Pyme no es automático solo por ser una empresa chica — tiene topes de capital e ingresos específicos. Esto es lo que realmente exige el SII, no lo que circula de boca en boca.',
    categorySlug: 'pymes',
    authorSlug: 'nayadeth-miranda',
    audiencia: ['empresas', 'independientes'],
    publishedAt: '2026-06-20T13:00:00.000Z',
    body: [
      p(
        'Una de las preguntas que más me hacen dueños de pyme es "¿estoy en el régimen que me corresponde?" — y casi siempre la respuesta requiere revisar números concretos, no solo el tamaño percibido de la empresa.'
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
        'Dentro de Pro Pyme hay dos variantes con implicancias muy distintas para el dueño: el régimen general tributa a nivel de empresa y el propietario tributa después por los retiros, mientras que el régimen transparente traspasa directamente la renta al dueño, sin tributación a nivel de empresa. La decisión correcta depende de tu situación personal de impuestos, no solo de la empresa.'
      ),
      legalSource(
        'SII',
        'SII — Requisitos para optar al Régimen Pro Pyme',
        'https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_7530.htm'
      ),
      p(
        { text: 'Si no estás seguro de tu régimen actual, empecemos con un ' },
        { text: 'Diagnóstico tributario', href: '/servicios/tributario/diagnostico-tributario/' },
        { text: ', y si confirmamos que te conviene el cambio, lo coordinamos junto con tu ' },
        { text: 'Contabilidad mensual', href: '/servicios/contable/contabilidad-mensual/' },
        { text: '.' }
      ),
    ],
  },
  {
    slug: 'crs-que-reporta-el-sii-sobre-tus-cuentas-en-el-extranjero',
    title: 'CRS: qué reporta el SII sobre tus cuentas en el extranjero',
    summary:
      'Desde 2018 Chile intercambia información financiera automáticamente con más de 100 países. Si tienes cuentas fuera de Chile, el SII probablemente ya sabe de ellas.',
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
      h2('Qué significa esto para ti'),
      p(
        'Si tienes cuentas, inversiones o ingresos en el extranjero, la pregunta no es si el SII tiene esa información — en la mayoría de los casos, ya la tiene o la va a tener. La pregunta es si tu Declaración de Renta la refleja correctamente.'
      ),
      legalSource(
        'SII',
        'SII — Estándar de intercambio automático de información',
        'https://www.sii.cl/asuntos_internacionales/estandarintercambio.html'
      ),
      p(
        { text: 'Si tienes ingresos o cuentas en el extranjero, revisemos tu ' },
        { text: 'Declaración de Renta persona', href: '/servicios/tributario/renta-persona/' },
        { text: '. Si ya identificaste algo pendiente de años anteriores, el camino correcto es una ' },
        { text: 'Regularización SII', href: '/servicios/tributario/regularizacion-sii/' },
        { text: ' antes de que llegue una observación.' }
      ),
    ],
  },
  {
    slug: 'niif-pyme-boletin-tecnico-82-que-exige',
    title: 'NIIF para Pymes en Chile: qué exige el Boletín Técnico 82 y qué pasa si no lo aplicas',
    summary:
      'Desde 2013 los antiguos boletines técnicos quedaron derogados — el marco vigente es NIIF para Pymes. Muchas contabilidades chilenas todavía no están alineadas con esto.',
    categorySlug: 'contabilidad',
    authorSlug: 'nayadeth-miranda',
    audiencia: ['empresas', 'contadores'],
    publishedAt: '2026-07-05T13:00:00.000Z',
    body: [
      p(
        'En septiembre de 2010 la Comisión de Principios y Normas de Contabilidad del Colegio de Contadores de Chile aprobó el Boletín Técnico 82, que adopta de forma íntegra y sin reservas la Norma NIIF para Pymes emitida por el IASB. Desde 2013, los antiguos boletines técnicos (PCGA chilenos) quedaron derogados — lo que en la práctica obliga a aplicar NIIF (Full o Pyme) como marco de referencia.'
      ),
      h2('Qué es distinto en la práctica'),
      p(
        'NIIF para Pymes tiene cerca del 10% del tamaño de las NIIF completas, organizadas en 35 secciones. Está pensada específicamente para entidades que no cotizan en bolsa ni tienen obligación pública de rendir cuentas — es decir, la gran mayoría de las empresas chilenas medianas y pequeñas.'
      ),
      h2('El problema que veo seguido'),
      p(
        'Muchas contabilidades pyme en Chile todavía se preparan con criterios antiguos o mezclados, porque el contador nunca hizo la transición formal a NIIF para Pymes. Esto se nota, sobre todo, cuando esos estados financieros se necesitan para un banco o un inversionista: si no están bajo un marco reconocido, generan más preguntas de las que responden.'
      ),
      legalSource(
        'Otro',
        'Colegio de Contadores de Chile — Boletín Técnico 82 (NIIF para Pymes)',
        'https://www.contach.cl/normas-boletines-tecnicos-niif.php'
      ),
      p(
        { text: 'Si necesitas ' },
        { text: 'Estados financieros', href: '/servicios/contable/estados-financieros/' },
        { text: ' bajo un marco reconocido, o simplemente quieres saber si tu contabilidad actual cumple, hablemos de tu ' },
        { text: 'Contabilidad mensual', href: '/servicios/contable/contabilidad-mensual/' },
        { text: '.' }
      ),
    ],
  },

  // ============ ALEXIS CONTRERAS (5) — tecnología, sistemas, ángulo técnico ============
  {
    slug: 'facturacion-electronica-2026-cambios-tecnicos-sii',
    title: 'Facturación electrónica 2026: los cambios técnicos del SII que debes meter en tu sistema',
    summary:
      'El SII postergó la entrada en vigencia de nuevas exigencias en facturas y guías de despacho de mayo a noviembre 2026. Esto es lo que cambia a nivel de sistema, no solo de papeleo.',
    categorySlug: 'tecnologia-y-automatizacion',
    authorSlug: 'alexis-contreras',
    audiencia: ['empresas'],
    publishedAt: '2026-05-25T13:00:00.000Z',
    body: [
      p(
        'Como Technical Lead, esta es la parte que menos se cubre cuando se habla de cambios normativos del SII: qué significa realmente a nivel de integración y sistemas, no solo qué formulario hay que llenar distinto.'
      ),
      h2('El cambio de fondo'),
      p(
        'Una resolución del SII modificó el resolutivo 10° de la Resolución 154/2025, postergando la entrada en vigencia de nuevas exigencias sobre facturas y guías de despacho del 1 de mayo al 1 de noviembre de 2026. Si tu equipo de desarrollo o tu proveedor de ERP ya estaba trabajando contra la fecha original, esto les da margen — pero no significa que se pueda dejar para último minuto otra vez.'
      ),
      h2('Qué cambia técnicamente'),
      ...bullets([
        'Todas las ventas exentas deben emitir DTE electrónico tipo 34 (factura exenta) — si tu sistema todavía genera boletas o comprobantes internos para exentas, hay que migrar el flujo.',
        'Nuevos campos obligatorios en los libros de ventas y compras: código de país del cliente, indicador de prestación de servicios vs. venta de bienes, y clasificación del tipo de cliente.',
        'Esto implica cambios de esquema en cualquier integración que genere o consuma DTE — no es solo un campo nuevo en un formulario web.',
      ]),
      p(
        'Si administras o encargaste un ERP a medida, esto es literalmente el tipo de cambio regulatorio que hay que anticipar con pruebas, no descubrir en producción el día que entra en vigencia.'
      ),
      legalSource('SII', 'SII — Índice de Resoluciones 2026', 'https://www.sii.cl/normativa_legislacion/resoluciones/2026/res_ind2026.htm'),
      p(
        { text: 'Si necesitas ajustar procesos o sistemas para esto, es exactamente el tipo de proyecto que cubre nuestra ' },
        { text: 'Implementación de procesos', href: '/servicios/contable/implementacion-procesos/' },
        { text: ', coordinado con tu ' },
        { text: 'IVA mensual', href: '/servicios/tributario/iva-mensual/' },
        { text: '.' }
      ),
    ],
  },
  {
    slug: 'como-leer-una-resolucion-sii-sin-ser-abogado',
    title: 'SII Resoluciones: cómo leer una resolución sin ser abogado (guía para dueños de pyme)',
    summary:
      'Las resoluciones del SII se publican en un índice público, pero están escritas para especialistas. Esta es la estructura que hay que buscar para entender qué te afecta realmente.',
    categorySlug: 'sii-resoluciones',
    authorSlug: 'alexis-contreras',
    audiencia: ['empresas', 'independientes'],
    publishedAt: '2026-06-10T13:00:00.000Z',
    body: [
      p(
        'No tengo formación de abogado tributario, y precisamente por eso puedo explicar esto desde el lugar de alguien que tuvo que aprender a leer resoluciones del SII sin ese entrenamiento — porque como developer, sí sé leer documentación técnica densa y encontrar lo que importa.'
      ),
      h2('La estructura de una resolución'),
      ...bullets([
        'Los "vistos" y "considerando" explican por qué se dicta — normalmente puedes saltártelos.',
        'Los "resuelvos" (resolutivos numerados) son lo que efectivamente cambia — ahí está la parte operativa.',
        'Las fechas de vigencia suelen estar en uno de los últimos resolutivos, no al principio.',
        'Cuando una resolución "modifica" a otra, tienes que leer ambas — la resolución nueva casi nunca repite el contexto completo.',
      ]),
      h2('Dónde buscarlas'),
      p(
        'El SII publica un índice anual de resoluciones en su sitio oficial. Si tu contador o tu sistema contable te menciona una resolución específica, ese índice es la forma más directa de confirmar que estás viendo la versión vigente y no una versión desactualizada que circula en algún blog.'
      ),
      legalSource('SII', 'SII — Índice de Resoluciones 2026', 'https://www.sii.cl/normativa_legislacion/resoluciones/2026/res_ind2026.htm'),
      p(
        { text: 'Si una resolución específica te generó dudas sobre tu situación, un ' },
        { text: 'Diagnóstico tributario', href: '/servicios/tributario/diagnostico-tributario/' },
        { text: ' es la forma más rápida de saber si te afecta y qué hacer — o si necesitas presentar algo pendiente, revisa ' },
        { text: 'Declaración F29', href: '/servicios/tributario/declaracion-f29/' },
        { text: '.' }
      ),
    ],
  },
  {
    slug: 'como-te-fiscaliza-el-sii-sin-que-te-des-cuenta',
    title: 'Cómo el SII te fiscaliza sin que te des cuenta: cruce de datos y sistemas automatizados',
    summary:
      'La fiscalización moderna no empieza con una carta — empieza con un sistema que cruza información de distintas fuentes. Así es como funciona en la práctica.',
    categorySlug: 'fiscalizacion',
    authorSlug: 'alexis-contreras',
    audiencia: ['empresas', 'independientes'],
    publishedAt: '2026-06-15T13:00:00.000Z',
    body: [
      p(
        'Me interesa esto desde el lado de los sistemas: el SII no fiscaliza revisando contribuyente por contribuyente al azar. Fiscaliza con sistemas que cruzan datos de múltiples fuentes automáticamente, y las alertas salen cuando algo no cuadra entre esas fuentes.'
      ),
      h2('Un ejemplo real y reciente'),
      p(
        'El SII informó públicamente que puso foco en 63 contribuyentes que registraban pagos en sus cuentas financieras en el exterior por más de $1,5 billones, sin incorporarlos en sus declaraciones anuales de Renta. Ese hallazgo no salió de una auditoría manual caso por caso — salió de cruzar la información que Chile recibe vía CRS (intercambio automático internacional) contra lo efectivamente declarado.'
      ),
      h2('Qué significa esto para tus sistemas'),
      ...bullets([
        'Si tu facturación, tu IVA y tu Renta no son consistentes entre sí, un sistema lo detecta más rápido que una persona.',
        'Mientras más fuentes de datos existan sobre tu actividad (DTE, información financiera, declaraciones juradas de terceros), menos margen hay para inconsistencias silenciosas.',
        'La mejor defensa técnica es la misma que la mejor práctica contable: que tus propios números sean consistentes entre sí antes de que un sistema externo note que no lo son.',
      ]),
      legalSource(
        'SII',
        'SII — Foco en contribuyentes con cuentas financieras en el exterior no declaradas',
        'https://www.sii.cl/noticias/2025/091225noti01pcr.htm'
      ),
      p(
        { text: 'Si quieres revisar antes que el sistema lo haga por ti, parte con un ' },
        { text: 'Diagnóstico tributario', href: '/servicios/tributario/diagnostico-tributario/' },
        { text: '. Si ya sabes que algo quedó fuera, la ' },
        { text: 'Regularización SII', href: '/servicios/tributario/regularizacion-sii/' },
        { text: ' es el camino antes de que llegue la observación.' }
      ),
    ],
  },
  {
    slug: 'gratificacion-legal-por-que-tu-sistema-la-calcula-mal',
    title: 'Gratificación legal: por qué tu sistema de remuneraciones probablemente la calcula mal',
    summary:
      'Existen dos métodos legales distintos para calcular la gratificación, con un tope específico. Los errores más comunes no son de la ley — son de cómo está configurado el sistema.',
    categorySlug: 'laboral-tributario',
    authorSlug: 'alexis-contreras',
    audiencia: ['empresas'],
    publishedAt: '2026-06-22T13:00:00.000Z',
    body: [
      p(
        'No soy experto en derecho laboral, pero sí he visto de cerca cómo se implementan mal los cálculos de remuneraciones en sistemas y planillas — y la gratificación legal es uno de los casos donde más frecuentemente el error no está en la ley, sino en la configuración.'
      ),
      h2('Los dos métodos legales'),
      p(
        'El Código del Trabajo contempla dos formas de calcular la gratificación: el Artículo 47 (30% de las utilidades líquidas repartidas entre los trabajadores) y el Artículo 50 (25% del sueldo imponible, con un tope anual de 4,75 Ingresos Mínimos Mensuales). La mayoría de las empresas usa el método del Artículo 50 porque es predecible, pero muchos sistemas no aplican correctamente el tope.'
      ),
      h2('El error típico'),
      p(
        'Con un Ingreso Mínimo Mensual de $529.000, el tope anual de gratificación es $2.512.750, lo que da un tope mensual de $209.396 si se paga fraccionado en 12 cuotas. Un sistema mal configurado sigue calculando el 25% del sueldo imponible sin aplicar ese tope — lo que genera pagos de más, mes tras mes, sin que nadie lo note hasta una auditoría.'
      ),
      legalSource('Otro', 'Dirección del Trabajo — La Gratificación Legal', 'https://www.dt.gob.cl/portal/1626/w3-article-99034.html'),
      p(
        { text: 'Si administras remuneraciones para tu equipo, revisa nuestro ' },
        { text: 'Outsourcing de remuneraciones', href: '/servicios/rrhh/outsourcing-remuneraciones/' },
        { text: ' — o si solo necesitas que alguien revise el cálculo puntual, también está disponible el ' },
        { text: 'Cálculo de vacaciones', href: '/servicios/rrhh/calculo-vacaciones/' },
        { text: ' como servicio suelto.' }
      ),
    ],
  },
  {
    slug: 'nuevos-campos-libro-compras-ventas-2026-que-cambia-en-tu-erp',
    title: 'Nuevos campos en el libro de compras y ventas 2026: qué cambia en tu ERP',
    summary:
      'El SII agregó campos obligatorios al libro de compras y ventas para 2026. Si tu ERP no los genera automáticamente, vas a terminar completándolos a mano.',
    categorySlug: 'iva',
    authorSlug: 'alexis-contreras',
    audiencia: ['empresas'],
    publishedAt: '2026-07-08T13:00:00.000Z',
    body: [
      p(
        'Esto es continuación directa del cambio en facturación electrónica que cubrí hace unas semanas, pero enfocado específicamente en lo que le llega a tu contador cada mes: el libro de compras y ventas.'
      ),
      h2('Los campos nuevos'),
      ...bullets([
        'Código de país del cliente.',
        'Indicador de si la operación es prestación de servicios o venta de bienes.',
        'Clasificación del tipo de cliente.',
      ]),
      h2('Por qué esto no es solo "un campo más"'),
      p(
        'Si tu ERP o sistema de facturación no captura esta información al momento de emitir el documento, alguien tiene que completarla después, a mano, revisando cada documento — y eso es exactamente el tipo de proceso manual que después genera errores en la declaración de IVA mensual. La forma correcta de resolverlo es a nivel de origen: que el campo se complete cuando se emite el DTE, no cuando se prepara el libro.'
      ),
      legalSource('SII', 'SII — Índice de Resoluciones 2026', 'https://www.sii.cl/normativa_legislacion/resoluciones/2026/res_ind2026.htm'),
      p(
        { text: 'Si tu proceso de ' },
        { text: 'IVA mensual', href: '/servicios/tributario/iva-mensual/' },
        { text: ' todavía depende de completar campos a mano, hablemos de una ' },
        { text: 'Implementación de procesos', href: '/servicios/contable/implementacion-procesos/' },
        { text: ' que lo resuelva desde el sistema, no desde la planilla.' }
      ),
    ],
  },
];
