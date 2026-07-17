import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Nombre del sitio', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'defaultOgImage', title: 'Imagen OG por defecto', type: 'image' }),
    defineField({ name: 'contactEmail', title: 'Email de contacto', type: 'string', validation: (Rule) => Rule.required().email() }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Formato internacional, ej: 569XXXXXXXX',
    }),
    defineField({ name: 'calendlyUrl', title: 'URL de Calendly', type: 'url' }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({ name: 'platform', title: 'Plataforma', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: 'legalDisclaimer',
      title: 'Disclaimer legal (footer)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'navigation',
      title: 'Navegación',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({ name: 'label', title: 'Etiqueta', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'href', title: 'Enlace', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'siteName' },
  },
});
