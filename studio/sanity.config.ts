import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'radar-tributario',
  title: 'Radar Tributario',

  projectId: 'z8wuevgx',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Posts publicados')
              .child(
                S.documentList()
                  .title('Publicados')
                  .filter('_type == "post" && status == "publicado"')
              ),
            S.listItem()
              .title('Borradores / En revisión')
              .child(
                S.documentList()
                  .title('Pendientes')
                  .filter('_type == "post" && status in ["borrador", "en_revision"]')
              ),
            S.listItem()
              .title('Generados por IA (pendientes)')
              .child(
                S.documentList()
                  .title('IA sin revisar')
                  .filter('_type == "post" && source == "ia_generado" && status != "publicado"')
              ),
            S.divider(),
            S.documentTypeListItem('post').title('Todos los posts'),
            S.documentTypeListItem('category').title('Categorías'),
            S.documentTypeListItem('tag').title('Tags'),
            S.documentTypeListItem('author').title('Autores'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
