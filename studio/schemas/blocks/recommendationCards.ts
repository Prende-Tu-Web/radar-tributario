import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'recommendationCards',
  title: 'Tarjetas de recomendación',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Tarjetas',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'recommendationCardItem',
          fields: [
            defineField({ name: 'icon', title: 'Ícono (emoji)', type: 'string', initialValue: '✅' }),
            defineField({
              name: 'text',
              title: 'Texto',
              type: 'string',
              validation: (Rule) => Rule.required().max(140),
            }),
          ],
          preview: {
            select: { icon: 'icon', text: 'text' },
            prepare({ icon, text }) {
              return { title: `${icon ?? ''} ${text ?? ''}`.trim() };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: { items: 'items' },
    prepare({ items }) {
      return { title: 'Tarjetas de recomendación', subtitle: `${items?.length ?? 0} tarjeta(s)` };
    },
  },
});
