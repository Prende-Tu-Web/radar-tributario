import type { SomePortableTextComponents } from 'astro-portabletext/types';
import LegalSourceCitation from '../../components/blog/LegalSourceCitation.astro';
import CalloutBox from '../../components/blog/CalloutBox.astro';
import RecommendationCards from '../../components/blog/RecommendationCards.astro';
import ComparisonTable from '../../components/blog/ComparisonTable.astro';
import PostBodyImage from '../../components/blog/PostBodyImage.astro';

export const portableTextComponents: SomePortableTextComponents = {
  type: {
    legalSource: LegalSourceCitation,
    calloutBox: CalloutBox,
    recommendationCards: RecommendationCards,
    comparisonTable: ComparisonTable,
    image: PostBodyImage,
  },
};
