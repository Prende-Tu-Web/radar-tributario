export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  bio?: string;
  credentials?: string;
  photo?: SanityImage;
  displayOrder?: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  color?: 'rt-tag-red' | 'rt-tag-teal' | 'rt-tag-navy';
  description?: string;
}

export interface Tag {
  _id: string;
  name: string;
  slug: { current: string };
}

export type PostStatus = 'borrador' | 'en_revision' | 'aprobado' | 'publicado' | 'archivado';
export type PostSource = 'humano' | 'ia_generado';
export type PostImportance = 'normal' | 'destacado' | 'urgente';
export type Audiencia = 'contadores' | 'abogados-tributaristas' | 'empresas' | 'independientes';

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  body?: unknown[];
  coverImage?: SanityImage;
  category?: Category;
  tags?: Tag[];
  author?: Author;
  status: PostStatus;
  source: PostSource;
  importance: PostImportance;
  featured?: boolean;
  publishedAt?: string;
  audiencia?: Audiencia[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonical?: string;
    noIndex?: boolean;
  };
}
