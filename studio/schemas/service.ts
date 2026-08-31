import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Pilar',
      type: 'string',
      options: {
        list: [
          { title: 'Tributario', value: 'tributario' },
          { title: 'Contable', value: 'contable' },
          { title: 'RRHH', value: 'rrhh' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Ícono',
      type: 'string',
      description: 'Nombre de ícono Lucide/Heroicons',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción corta',
      type: 'text',
      rows: 2,
      description: 'Usada en cards (Home, listado del pilar)',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Descripción del hero',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'variants',
      title: 'Variantes (tiers o vías)',
      type: 'array',
      description:
        'Solo si el servicio agrupa tiers/vías distintas (ej. Contabilidad Mensual por tamaño de empresa, Constitución de Empresa digital/notarial). Sin precio — solo alcance.',
      of: [
        {
          type: 'object',
          name: 'variant',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 2 }),
            defineField({ name: 'idealFor', title: 'Ideal para', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'targetAudience',
      title: 'Audiencia objetivo',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Personas naturales', value: 'personas-naturales' },
          { title: 'Independientes', value: 'independientes' },
          { title: 'Pymes', value: 'pymes' },
          { title: 'Empresas', value: 'empresas' },
        ],
      },
    }),
    defineField({
      name: 'benefits',
      title: 'Beneficios',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'benefit',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'Preguntas frecuentes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', title: 'Pregunta', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'answer', title: 'Respuesta', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: 'showScheduler',
      title: 'Mostrar Calendly',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden dentro del pilar',
      type: 'number',
      initialValue: 99,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta título', type: 'string', validation: (Rule) => Rule.max(70) }),
        defineField({ name: 'metaDescription', title: 'Meta descripción', type: 'text', rows: 2, validation: (Rule) => Rule.max(160) }),
        defineField({ name: 'noIndex', title: 'No indexar', type: 'boolean', initialValue: false }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'pillar' },
  },
  orderings: [
    {
      title: 'Pilar, luego orden',
      name: 'pillarOrder',
      by: [
        { field: 'pillar', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
});
