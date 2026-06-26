import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado editorial',
      type: 'string',
      options: {
        list: [
          { title: 'Borrador', value: 'borrador' },
          { title: 'En revisión', value: 'en_revision' },
          { title: 'Aprobado', value: 'aprobado' },
          { title: 'Publicado', value: 'publicado' },
          { title: 'Archivado', value: 'archivado' },
        ],
        layout: 'radio',
      },
      initialValue: 'borrador',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Origen del contenido',
      type: 'string',
      options: {
        list: [
          { title: 'Redacción humana', value: 'humano' },
          { title: 'Generado por IA', value: 'ia_generado' },
        ],
        layout: 'radio',
      },
      initialValue: 'humano',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'revisadoPor',
      title: 'Revisado por',
      type: 'reference',
      to: [{ type: 'author' }],
      // Solo visible si el contenido es IA
      hidden: ({ document }) => document?.source !== 'ia_generado',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { source?: string; status?: string };
          if (doc?.source === 'ia_generado' && doc?.status === 'publicado' && !value) {
            return 'Un post generado por IA debe ser revisado por un humano antes de publicarse.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'importance',
      title: 'Importancia',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Destacado', value: 'destacado' },
          { title: 'Urgente', value: 'urgente' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'featured',
      title: 'Destacar en home',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
    }),
    defineField({
      name: 'summary',
      title: 'Bajada / Resumen',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (Rule) => Rule.required().warning('El alt text es importante para SEO y accesibilidad.'),
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de foto',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'audiencia',
      title: 'Audiencia objetivo',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Contadores', value: 'contadores' },
          { title: 'Abogados tributaristas', value: 'abogados-tributaristas' },
          { title: 'Empresas (dueños y gerentes)', value: 'empresas' },
          { title: 'Independientes (boleta)', value: 'independientes' },
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta título',
          type: 'string',
          validation: (Rule) => Rule.max(70),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta descripción',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'canonical',
          title: 'URL canónica',
          type: 'url',
        }),
        defineField({
          name: 'noIndex',
          title: 'No indexar',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      status: 'status',
      source: 'source',
      media: 'coverImage',
    },
    prepare({ title, author, status, source, media }) {
      const statusEmoji: Record<string, string> = {
        borrador: '📝',
        en_revision: '🔍',
        aprobado: '✅',
        publicado: '🟢',
        archivado: '📦',
      };
      return {
        title,
        subtitle: `${statusEmoji[status] ?? ''} ${status} · ${author ?? 'Sin autor'} ${source === 'ia_generado' ? '· 🤖 IA' : ''}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Fecha publicación, desc',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
