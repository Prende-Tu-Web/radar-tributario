import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color de etiqueta',
      type: 'string',
      options: {
        list: [
          { title: 'Rojo (urgente)', value: 'rt-tag-red' },
          { title: 'Teal (info)', value: 'rt-tag-teal' },
          { title: 'Navy (general)', value: 'rt-tag-navy' },
        ],
        layout: 'radio',
      },
      initialValue: 'rt-tag-navy',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'color' },
  },
});
