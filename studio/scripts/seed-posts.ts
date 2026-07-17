/**
 * Siembra los 10 posts de ejemplo (contenido real investigado, con fuentes
 * oficiales citadas vía bloque legalSource y links internos a servicios).
 * Requiere que seed-taxonomy.ts ya haya corrido (referencia los documentos category-x y author-x).
 *
 * Uso: SANITY_API_TOKEN=xxx npx tsx scripts/seed-posts.ts
 */
import { createClient } from '@sanity/client';
import { posts } from './content/posts';

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Falta SANITY_API_TOKEN en el entorno. Abortando (no se escribe nada).');
  process.exit(1);
}

const client = createClient({
  projectId: 'z8wuevgx',
  dataset: 'development', // NUNCA production
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function run() {
  console.log(`Sembrando ${posts.length} posts...`);

  for (const post of posts) {
    const categoryId = `category-${post.categorySlug}`;
    const authorId = `author-${post.authorSlug}`;

    const categoryExists = await client.getDocument(categoryId);
    const authorExists = await client.getDocument(authorId);
    if (!categoryExists || !authorExists) {
      console.error(
        `  ✗ ${post.slug}: falta category-${post.categorySlug} o author-${post.authorSlug} — corre seed-taxonomy.ts primero.`
      );
      continue;
    }

    await client.createOrReplace({
      _id: `post-${post.slug}`,
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      summary: post.summary,
      status: 'publicado',
      source: 'humano',
      importance: 'normal',
      featured: false,
      publishedAt: post.publishedAt,
      category: { _type: 'reference', _ref: categoryId },
      author: { _type: 'reference', _ref: authorId },
      audiencia: post.audiencia,
      body: post.body,
    });
    console.log(`  ✓ post/${post.slug} (${post.authorSlug})`);
  }

  console.log('Listo.');
}

run().catch((err) => {
  console.error('Error sembrando posts:', err);
  process.exit(1);
});
