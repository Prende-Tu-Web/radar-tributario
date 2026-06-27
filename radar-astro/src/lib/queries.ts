const postFields = `
  _id,
  title,
  slug,
  summary,
  publishedAt,
  importance,
  featured,
  coverImage,
  "category": category->{_id, name, slug, color},
  "author": author->{_id, name, slug, photo},
  "tags": tags[]->{_id, name, slug}
`;

export const homeFeaturedQuery = `*[_type == "post" && status == "publicado" && featured == true] | order(publishedAt desc)[0...3] {
  ${postFields}
}`;

export const homeLatestQuery = `*[_type == "post" && status == "publicado"] | order(publishedAt desc)[0...8] {
  ${postFields}
}`;

export const newsListQuery = `*[_type == "post" && status == "publicado"] | order(publishedAt desc)[$start...$end] {
  ${postFields}
}`;

export const newsCountQuery = `count(*[_type == "post" && status == "publicado"])`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug && status == "publicado"][0] {
  ${postFields},
  body,
  "seo": seo
}`;

export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0] {
  _id, name, slug, description, color
}`;

export const postsByCategoryQuery = `*[_type == "post" && status == "publicado" && category->slug.current == $slug] | order(publishedAt desc) {
  ${postFields}
}`;

export const allCategoriesQuery = `*[_type == "category"] | order(name asc) {
  _id, name, slug, color
}`;

export const allPublishedSlugsQuery = `*[_type == "post" && status == "publicado"] {
  "slug": slug.current
}`;

export const authorBySlugQuery = `*[_type == "author" && slug.current == $slug][0] {
  _id, name, slug, bio, credentials, photo
}`;

export const postsByAuthorQuery = `*[_type == "post" && status == "publicado" && author->slug.current == $slug] | order(publishedAt desc) {
  ${postFields}
}`;

export const allAuthorSlugsQuery = `*[_type == "author"] { "slug": slug.current }`;
