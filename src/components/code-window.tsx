import { highlight, type TokenKind } from '@/lib/highlight';
import { cn } from '@/lib/utils';

const tokenClass: Record<TokenKind, string> = {
  prompt: 'text-[#ff5257]',
  property: 'text-[#c68bff]',
  string: 'text-[#2fd8b0]',
  keyword: 'text-[#c68bff]',
  success: 'text-[#2fd8b0]',
  accent: 'text-[#ff5257]',
  number: 'text-[#f0d43a]',
  call: 'text-white',
  punct: 'text-white/45',
  plain: 'text-[#d9d8d3]'
};

type Props = {
  title: string;
  lines: string[];
  className?: string;
};

export function CodeWindow({ title, lines, className }: Props) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg bg-[#0e0e0d] shadow-[0_24px_48px_-20px_rgb(0_0_0/0.45)] ring-1 ring-black/10 dark:ring-white/10',
        className
      )}
    >
      <div className="flex h-10 items-center gap-2 border-b border-white/[0.08] px-4">
        <span className="size-2.5 rounded-full bg-brand-red" />
        <span className="size-2.5 rounded-full bg-brand-yellow" />
        <span className="size-2.5 rounded-full bg-brand-teal" />
        <span className="ml-3 truncate font-mono text-[12px] text-white/45">{title}</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-6">
        <code>
          {lines.map((line, index) => (
            <span key={index} className="flex">
              <span aria-hidden="true" className="mr-5 w-5 shrink-0 text-right text-white/20 select-none">
                {index + 1}
              </span>
              <span className="whitespace-pre">
                {line === ''
                  ? ' '
                  : highlight(line).map((token, i) => (
                      <span key={i} className={tokenClass[token.kind]}>
                        {token.text}
                      </span>
                    ))}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
