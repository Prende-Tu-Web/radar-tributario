import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'combo',
  title: 'Combo de entrada',
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
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'relatedServices',
      title: 'Servicios relacionados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'ctaType',
      title: 'Tipo de CTA',
      type: 'string',
      options: {
        list: [
          { title: 'Formulario estándar', value: 'form' },
          { title: 'Calculadora (por N° de trabajadores)', value: 'calculator' },
          { title: 'Reserva estacional', value: 'seasonal-reservation' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'validUntil',
      title: 'Vigente hasta',
      type: 'datetime',
      description: 'Solo para combos estacionales (ej. Renta Anticipada). Si venció, la página muestra "oferta cerrada" en vez de 404.',
      hidden: ({ document }) => document?.ctaType !== 'seasonal-reservation',
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
    select: { title: 'title', subtitle: 'ctaType' },
  },
});
