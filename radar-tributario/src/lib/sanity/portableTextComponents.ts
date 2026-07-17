import type { SomePortableTextComponents } from 'astro-portabletext/types';
import LegalSourceCitation from '../../components/blog/LegalSourceCitation.astro';

export const portableTextComponents: SomePortableTextComponents = {
  type: {
    legalSource: LegalSourceCitation,
  },
};
