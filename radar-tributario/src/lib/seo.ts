import type { FaqItem, Post, Service, SiteSettings } from './sanity/types';

function siteUrl(): string {
  return import.meta.env.PUBLIC_SITE_URL || 'https://radartributario.cl';
}

export function organizationJsonLd(siteSettings: SiteSettings | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: siteSettings?.siteName || 'Radar Tributario',
    description: siteSettings?.tagline || 'Asesoría tributaria, contable y de RRHH en Chile.',
    url: siteUrl(),
    areaServed: 'CL',
    ...(siteSettings?.contactEmail ? { email: siteSettings.contactEmail } : {}),
    ...(siteSettings?.whatsappNumber ? { telephone: `+${siteSettings.whatsappNumber}` } : {}),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription || service.heroDescription || service.title,
    url: `${siteUrl()}/servicios/${service.pillar}/${service.slug.current}/`,
    areaServed: 'CL',
    provider: {
      '@type': 'LegalService',
      name: 'Radar Tributario',
    },
  };
}

export function faqJsonLd(faq: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary || post.title,
    url: `${siteUrl()}/noticias/${post.slug.current}/`,
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.author
      ? {
          author: {
            '@type': 'Person',
            name: post.author.name,
          },
        }
      : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Radar Tributario',
    },
  };
}
