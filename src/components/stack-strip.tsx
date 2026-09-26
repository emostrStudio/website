import type { CSSProperties } from 'react';
import { BrandIcon } from '@/components/brand-icon';
import { Frame } from '@/components/frame';
import { brandIcons } from '@/lib/data/icons';
import { stack } from '@/lib/data/stack';
import { cn } from '@/lib/utils';

export function StackStrip() {
  const loop = [...stack, ...stack];

  return (
    <Frame id="stack" labelledBy="stack-title" markers={['top', 'bottom']} solid>
      <div className="grid md:grid-cols-[250px_minmax(0,1fr)]">
        <div className="flex items-center border-b px-5 py-6 sm:px-8 md:border-r md:border-b-0 md:py-0 lg:px-10">
          <h2
            id="stack-title"
            className="font-mono text-[13px] leading-relaxed tracking-[0.06em] text-muted-foreground uppercase"
          >
            Мы доверяем
            <br className="hidden md:block" /> только <strong className="font-bold text-foreground">лучшим</strong>
          </h2>
        </div>

        <div className="fade-x group overflow-hidden">
          <ul
            className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
            style={{ '--marquee-duration': '45s' } as CSSProperties}
          >
            {loop.map((item, index) => {
              const duplicate = index >= stack.length;
              return (
                <li
                  key={`${item.id}-${index}`}
                  aria-hidden={duplicate || undefined}
                  className="flex h-24 items-center gap-3 border-r px-9 md:h-28"
                >
                  <BrandIcon
                    id={item.id}
                    colored={!item.adaptive}
                    className={cn('size-7', item.adaptive && 'text-foreground')}
                  />
                  <span className="text-[16px] font-medium tracking-tight">{brandIcons[item.id].title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Frame>
  );
}
