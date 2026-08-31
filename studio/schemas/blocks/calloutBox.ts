import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'calloutBox',
  title: 'Recuadro de aviso',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Ícono (emoji)',
      type: 'string',
      description: 'Un solo emoji, ej: 💡 ⚠️ 📌',
      initialValue: '💡',
    }),
    defineField({
      name: 'text',
      title: 'Texto',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { text: 'text' },
    prepare({ text }) {
      const firstBlock = Array.isArray(text) ? text[0] : undefined;
      const plain = firstBlock?.children?.map((c: { text: string }) => c.text).join('') ?? '';
      return { title: 'Recuadro de aviso', subtitle: plain.slice(0, 60) };
    },
  },
});
