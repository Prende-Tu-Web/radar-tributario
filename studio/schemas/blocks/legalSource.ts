import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'legalSource',
  title: 'Cita a fuente legal',
  type: 'object',
  fields: [
    defineField({
      name: 'entity',
      title: 'Entidad',
      type: 'string',
      options: {
        list: [
          { title: 'SII', value: 'SII' },
          { title: 'Banco Central', value: 'Banco Central' },
          { title: 'TGR', value: 'TGR' },
          { title: 'Diario Oficial', value: 'Diario Oficial' },
          { title: 'Otro', value: 'Otro' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Texto visible de la cita',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Enlace a la fuente oficial',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'entity' },
  },
});
