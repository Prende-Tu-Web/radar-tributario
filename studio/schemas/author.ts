import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Biografía',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'credentials',
      title: 'Credenciales',
      type: 'string',
      description: 'Ej: Contadora · Magíster en Tributación',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Número menor aparece primero en la página Sobre Nosotros (ej: 1 = primero)',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'name', media: 'photo' },
  },
});
