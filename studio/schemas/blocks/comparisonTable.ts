import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'comparisonTable',
  title: 'Tabla comparativa',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Título de la tabla', type: 'string' }),
    defineField({
      name: 'columns',
      title: 'Columnas',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'rows',
      title: 'Filas',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'comparisonTableRow',
          fields: [
            defineField({
              name: 'cells',
              title: 'Celdas',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'comparisonTableCell',
                  fields: [
                    defineField({ name: 'text', title: 'Texto', type: 'string' }),
                    defineField({
                      name: 'indicator',
                      title: 'Indicador',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Ninguno', value: 'none' },
                          { title: 'Check (✓)', value: 'check' },
                          { title: 'Cruz (✕)', value: 'cross' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'none',
                    }),
                  ],
                  preview: {
                    select: { text: 'text', indicator: 'indicator' },
                    prepare({ text, indicator }) {
                      const mark = indicator === 'check' ? '✓' : indicator === 'cross' ? '✕' : '';
                      return { title: `${text ?? ''} ${mark}`.trim() };
                    },
                  },
                }),
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { cells: 'cells' },
            prepare({ cells }) {
              const texts = Array.isArray(cells)
                ? cells.map((c: { text?: string }) => c.text ?? '').join(' · ')
                : '';
              return { title: texts || 'Fila' };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title', rows: 'rows' },
    prepare({ title, rows }) {
      return { title: title || 'Tabla comparativa', subtitle: `${rows?.length ?? 0} fila(s)` };
    },
  },
});
