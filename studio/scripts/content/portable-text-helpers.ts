let keyCounter = 0;
function key() {
  keyCounter += 1;
  return `k${keyCounter}`;
}

type Span = { _key: string; _type: 'span'; text: string; marks: string[] };
type MarkDef = { _key: string; _type: 'link'; href: string };

interface TextPart {
  text: string;
  /** href interno o externo — si está presente, la parte queda como link */
  href?: string;
  strong?: boolean;
}

function buildChildrenAndMarkDefs(parts: (string | TextPart)[]) {
  const children: Span[] = [];
  const markDefs: MarkDef[] = [];
  for (const part of parts) {
    if (typeof part === 'string') {
      children.push({ _key: key(), _type: 'span', text: part, marks: [] });
      continue;
    }
    const marks: string[] = [];
    if (part.strong) marks.push('strong');
    if (part.href) {
      const markKey = key();
      markDefs.push({ _key: markKey, _type: 'link', href: part.href });
      marks.push(markKey);
    }
    children.push({ _key: key(), _type: 'span', text: part.text, marks });
  }
  return { children, markDefs };
}

export function p(...parts: (string | TextPart)[]) {
  const { children, markDefs } = buildChildrenAndMarkDefs(parts);
  return { _key: key(), _type: 'block', style: 'normal', markDefs, children };
}

export function h2(text: string) {
  return { _key: key(), _type: 'block', style: 'h2', markDefs: [], children: [{ _key: key(), _type: 'span', text, marks: [] }] };
}

export function h3(text: string) {
  return { _key: key(), _type: 'block', style: 'h3', markDefs: [], children: [{ _key: key(), _type: 'span', text, marks: [] }] };
}

export function bullets(items: string[]) {
  return items.map((text) => ({
    _key: key(),
    _type: 'block',
    style: 'normal',
    listItem: 'bullet' as const,
    level: 1,
    markDefs: [],
    children: [{ _key: key(), _type: 'span', text, marks: [] }],
  }));
}

export function legalSource(entity: 'SII' | 'Banco Central' | 'TGR' | 'Diario Oficial' | 'Otro', label: string, url: string) {
  return { _key: key(), _type: 'legalSource', entity, label, url };
}
