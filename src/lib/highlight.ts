export type TokenKind =
  | 'prompt'
  | 'property'
  | 'string'
  | 'keyword'
  | 'success'
  | 'accent'
  | 'number'
  | 'call'
  | 'punct'
  | 'plain';

export type Token = { kind: TokenKind; text: string };

const rules: [RegExp, TokenKind][] = [
  [/^\$(?= )/, 'prompt'],
  [/^"[^"]*"(?=:)/, 'property'],
  [/^(['"`])(?:\\.|(?!\1).)*\1/, 'string'],
  [/^(?:const|let|async|await|return|import|from|export|new|function)\b/, 'keyword'],
  [/^(?:GET|POST|PUT|PATCH|DELETE)\b/, 'keyword'],
  [/^(?:✓|ok\b|online\b|готово|\d{3} (?:OK|Created)\b)/, 'success'],
  [/^(?:→|←|▸|\+(?= ))/, 'accent'],
  [/^\d[\d.]*/, 'number'],
  [/^[A-Za-z_$][\w$]*(?=\()/, 'call'],
  [/^[{}()[\];,.:=>]+/, 'punct'],
  [/^\s+/, 'plain'],
  [/^[^\s'"`{}()[\];,.:=>]+/, 'plain']
];

export function highlight(line: string): Token[] {
  const tokens: Token[] = [];
  let rest = line;

  while (rest.length > 0) {
    let matched = false;
    for (const [pattern, kind] of rules) {
      const match = pattern.exec(rest);
      if (!match) continue;
      const text = match[0];
      const last = tokens.at(-1);
      if (last && last.kind === kind) last.text += text;
      else tokens.push({ kind, text });
      rest = rest.slice(text.length);
      matched = true;
      break;
    }
    if (!matched) {
      tokens.push({ kind: 'plain', text: rest.charAt(0) });
      rest = rest.slice(1);
    }
  }

  return tokens;
}
