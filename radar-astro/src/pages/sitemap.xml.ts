export const prerender = true;

import type { APIRoute } from 'astro';
import { sanityClient } from '../lib/sanity';

const SITE = 'https://radartributario.cl';

const staticPages = [
  { url: '/',               changefreq: 'daily',   priority: '1.0' },
  { url: '/noticias/',      changefreq: 'daily',   priority: '0.9' },
  { url: '/sobre-nosotros/', changefreq: 'monthly', priority: '0.6' },
  { url: '/contacto/',      changefreq: 'yearly',  priority: '0.5' },
];

export const GET: APIRoute = async () => {
  const [posts, categories, authors] = await Promise.all([
    sanityClient.fetch<{ slug: string; publishedAt?: string }[]>(
      `*[_type == "post" && status == "publicado"] { "slug": slug.current, publishedAt }`
    ),
    sanityClient.fetch<{ slug: string }[]>(
      `*[_type == "category"] { "slug": slug.current }`
    ),
    sanityClient.fetch<{ slug: string }[]>(
      `*[_type == "author"] { "slug": slug.current }`
    ),
  ]);

  const postEntries = posts.map(p => ({
    url: `/noticias/${p.slug}/`,
    lastmod: p.publishedAt ? p.publishedAt.split('T')[0] : undefined,
    changefreq: 'weekly',
    priority: '0.8',
  }));

  const categoryEntries = categories.map(c => ({
    url: `/categoria/${c.slug}/`,
    changefreq: 'weekly',
    priority: '0.7',
  }));

  const authorEntries = authors.map(a => ({
    url: `/autor/${a.slug}/`,
    changefreq: 'monthly',
    priority: '0.6',
  }));

  const allEntries = [...staticPages, ...postEntries, ...categoryEntries, ...authorEntries];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(entry => {
    const lastmod = 'lastmod' in entry && entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : '';
    return `  <url>
    <loc>${SITE}${entry.url}</loc>${lastmod}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
