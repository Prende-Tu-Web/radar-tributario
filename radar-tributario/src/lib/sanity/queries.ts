import { sanityClient } from './client';
import type { Author, Category, Post, SiteSettings } from './types';

// ---------- post ----------
// IMPORTANTE: status "publicado" siempre filtrado — el schema real tiene
// borrador/en_revision/aprobado/publicado/archivado, y sin este filtro
// contenido no publicado quedaría visible en el sitio público.

const POST_PROJECTION = `{..., category->, author->, tags[]->}`;

export async function getPosts(): Promise<Post[]> {
  return sanityClient.fetch<Post[]>(
    `*[_type == "post" && status == "publicado"] | order(publishedAt desc) ${POST_PROJECTION}`
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch<Post | null>(
    `*[_type == "post" && slug.current == $slug && status == "publicado"][0] ${POST_PROJECTION}`,
    { slug }
  );
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  return sanityClient.fetch<Post[]>(
    `*[_type == "post" && status == "publicado" && category->slug.current == $categorySlug] | order(publishedAt desc) ${POST_PROJECTION}`,
    { categorySlug }
  );
}

export async function getPostsByAuthor(authorSlug: string): Promise<Post[]> {
  return sanityClient.fetch<Post[]>(
    `*[_type == "post" && status == "publicado" && author->slug.current == $authorSlug] | order(publishedAt desc) ${POST_PROJECTION}`,
    { authorSlug }
  );
}

// ---------- category ----------

export async function getCategories(): Promise<Category[]> {
  return sanityClient.fetch<Category[]>(`*[_type == "category"] | order(title asc)`);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return sanityClient.fetch<Category | null>(
    `*[_type == "category" && slug.current == $slug][0]`,
    { slug }
  );
}

// ---------- author ----------

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return sanityClient.fetch<Author | null>(
    `*[_type == "author" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getAuthors(): Promise<Author[]> {
  return sanityClient.fetch<Author[]>(
    `*[_type == "author"] | order(displayOrder asc)`
  );
}

// ---------- siteSettings ----------

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch<SiteSettings | null>(`*[_type == "siteSettings"][0]`);
}
