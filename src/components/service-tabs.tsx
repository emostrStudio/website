'use client';

import { ArrowRight, Check } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';
import { BrandIcon } from '@/components/brand-icon';
import { CodeWindow } from '@/components/code-window';
import { ButtonLink } from '@/components/ui/button';
import { brandIcons } from '@/lib/data/icons';
import { services } from '@/lib/data/services';
import { cn } from '@/lib/utils';

export function ServiceTabs() {
  const [active, setActive] = useState(services[0]?.id ?? '');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const count = services.length;
    const next = services[(index + count) % count];
    if (!next) return;
    setActive(next.id);
    const tab = tabs.current[(index + count) % count];
    tab?.focus();
    tab?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  };

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: services.length - 1
    };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target);
  };

  return (
    <div>
      <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-label="Услуги студии"
          className="inline-flex gap-1 rounded-full border bg-surface/80 p-1 shadow-(--shadow-soft) backdrop-blur"
        >
          {services.map((service, index) => {
            const selected = service.id === active;
            return (
              <button
                key={service.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={`tab-${service.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${service.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(service.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  'cursor-pointer rounded-full px-4 py-2 text-[13.5px] whitespace-nowrap transition-[color,background-color,box-shadow] duration-200',
                  selected
                    ? 'bg-background text-foreground shadow-[0_1px_3px_rgb(0_0_0/0.1),0_0_0_1px_var(--border)]'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {service.tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border bg-background shadow-(--shadow-soft)">
        {services.map((service) => (
          <div
            key={service.id}
            id={`panel-${service.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${service.id}`}
            hidden={service.id !== active}
            tabIndex={0}
            className="grid grid-cols-[minmax(0,1fr)] outline-none lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
          >
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <h3 className="text-2xl leading-tight font-normal tracking-[-0.03em] sm:text-[28px]">
                {service.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{service.text}</p>

              <ul className="mt-6 space-y-2.5">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px]">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-text">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 pt-2 lg:mt-auto">
                <ButtonLink href="#contacts" size="md">
                  Обсудить задачу
                  <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
                </ButtonLink>
                <ul className="flex items-center gap-3" aria-label="Стек">
                  {service.stack.map((id) => (
                    <li key={id} title={brandIcons[id].title}>
                      <BrandIcon
                        id={id}
                        colored={id !== 'nextjs'}
                        className={cn('size-5', id === 'nextjs' && 'text-foreground')}
                      />
                      <span className="sr-only">{brandIcons[id].title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="hatch relative flex min-w-0 items-center border-t p-5 sm:p-8 lg:border-t-0 lg:border-l lg:p-10">
              <CodeWindow title={service.window.title} lines={service.window.lines} className="w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
