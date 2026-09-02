import type { SomePortableTextComponents } from 'astro-portabletext/types';
import { ListItem } from 'astro-portabletext/components';
import LegalSourceCitation from '../../components/blog/LegalSourceCitation.astro';
import CalloutBox from '../../components/blog/CalloutBox.astro';
import RecommendationCards from '../../components/blog/RecommendationCards.astro';
import ComparisonTable from '../../components/blog/ComparisonTable.astro';
import PostBodyImage from '../../components/blog/PostBodyImage.astro';
import TextStyleMark from '../../components/blog/TextStyleMark.astro';
import PostBodyList from '../../components/blog/PostBodyList.astro';

export const portableTextComponents: SomePortableTextComponents = {
  type: {
    legalSource: LegalSourceCitation,
    calloutBox: CalloutBox,
    recommendationCards: RecommendationCards,
    comparisonTable: ComparisonTable,
    image: PostBodyImage,
  },
  /**
   * `list` reemplaza entero al default (node_modules/astro-portabletext/
   * components/PortableText.astro: `mergeComponents` sustituye el valor
   * completo cuando el override es un componente suelto, no un record —
   * ver lib/internal.ts, `mergeComponents`) — por eso PostBodyList
   * reimplementa el switch completo (menu/number/ul) del List.astro
   * original y no solo el caso nuevo.
   *
   * `mark`, en cambio, va como record ({ textStyle: ... }) a propósito:
   * el default de `mark` YA es un record ({strong:Mark, em:Mark,
   * link:Mark, ...}), así que `mergeComponents` sí lo fusiona en vez de
   * reemplazarlo — de haber pasado un componente suelto acá (como se hizo
   * primero, y quedó mal) se habría roto negrita/cursiva/links en todo el
   * sitio, porque ese default nunca se habría llegado a mezclar.
   *
   * `listItem` (bulletArrow/bulletCheck) reutiliza el `ListItem` real de
   * la librería (misma razón: sin esto cae al fallback `UnknownListItem`,
   * que renderiza bien pero dispara warning de "missing component" en
   * cada build).
   */
  list: PostBodyList,
  listItem: { bulletArrow: ListItem, bulletCheck: ListItem },
  mark: { textStyle: TextStyleMark },
};
