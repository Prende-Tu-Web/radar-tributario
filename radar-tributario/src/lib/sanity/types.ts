import type { TypedObject } from 'astro-portabletext/types';

export interface Slug {
  current: string;
}

export type PortableTextBody = TypedObject[];

export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

export interface SanityImage {
  _type: 'image';
  asset: SanityImageAsset;
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  noIndex?: boolean;
}

// ---------- service ----------

export type Pillar = 'tributario' | 'contable' | 'rrhh';
export type TargetAudience = 'personas-naturales' | 'independientes' | 'pymes' | 'empresas';

export interface ServiceVariant {
  title: string;
  description?: string;
  idealFor?: string;
}

export interface ServiceBenefit {
  title: string;
  description?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: Slug;
  pillar: Pillar;
  icon?: string;
  shortDescription?: string;
  heroDescription?: string;
  body?: PortableTextBody;
  variants?: ServiceVariant[];
  targetAudience?: TargetAudience[];
  benefits?: ServiceBenefit[];
  faq?: FaqItem[];
  showScheduler?: boolean;
  order: number;
  seo?: SeoFields;
}

// ---------- combo ----------

export type ComboCtaType = 'form' | 'calculator' | 'seasonal-reservation';

export interface Combo {
  _id: string;
  title: string;
  slug: Slug;
  description?: string;
  relatedServices: Service[];
  ctaType: ComboCtaType;
  validUntil?: string;
  seo?: SeoFields;
}

// ---------- category / tag ----------

export type CategoryColor = 'rt-tag-red' | 'rt-tag-teal' | 'rt-tag-navy';

export interface Category {
  _id: string;
  title: string;
  slug: Slug;
  color?: CategoryColor;
  description?: string;
}

export interface Tag {
  _id: string;
  title: string;
  slug: Slug;
}

// ---------- author ----------

export interface Author {
  _id: string;
  name: string;
  slug: Slug;
  photo?: SanityImage;
  bio?: string;
  shortBio?: string;
  credentials?: string;
  displayOrder?: number;
}

// ---------- post ----------

export type PostStatus = 'borrador' | 'en_revision' | 'aprobado' | 'publicado' | 'archivado';
export type PostSource = 'humano' | 'ia_generado';
export type PostImportance = 'normal' | 'destacado' | 'urgente';
export type Audiencia = 'contadores' | 'abogados-tributaristas' | 'empresas' | 'independientes';

export interface PostSeoFields extends SeoFields {
  canonical?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: Slug;
  summary?: string;
  coverImage?: SanityImage & { alt?: string };
  body?: PortableTextBody;
  category?: Category;
  tags?: Tag[];
  author?: Author;
  audiencia?: Audiencia[];
  publishedAt?: string;
  status: PostStatus;
  source: PostSource;
  revisadoPor?: Author;
  importance?: PostImportance;
  featured?: boolean;
  seo?: PostSeoFields;
}

// ---------- siteSettings ----------

export interface SocialLink {
  platform: string;
  url: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteSettings {
  siteName: string;
  tagline?: string;
  logo?: SanityImage;
  defaultOgImage?: SanityImage;
  contactEmail: string;
  whatsappNumber?: string;
  calendlyUrl?: string;
  socialLinks?: SocialLink[];
  legalDisclaimer?: string;
  navigation?: NavItem[];
}
