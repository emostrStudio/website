'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function OnlineHeading() {
  const [online, setOnline] = useState(false);
  const touched = useRef(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || touched.current) return;
        timer = setTimeout(() => !touched.current && setOnline(true), 700);
        observer.disconnect();
      },
      { threshold: 1 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <h2
      id="online-title"
      className="text-[38px] leading-[1.08] font-normal tracking-[-0.045em] text-balance sm:text-5xl lg:text-[64px]"
    >
      Переведите свой бизнес{' '}
      <span className="whitespace-nowrap">
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={online}
          aria-label="Бизнес онлайн"
          onClick={() => {
            touched.current = true;
            setOnline((value) => !value);
          }}
          className={cn(
            'relative mx-[0.12em] inline-flex h-[0.8em] w-[1.5em] translate-y-[0.06em] cursor-pointer items-center rounded-full border align-baseline transition-colors duration-500',
            online
              ? 'border-primary bg-primary'
              : 'border-border-strong bg-surface shadow-[inset_0_1px_3px_rgb(0_0_0/0.1)]'
          )}
        >
          <span
            className={cn(
              'absolute top-1/2 left-[0.08em] size-[0.62em] -translate-y-1/2 rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.25)] transition-transform duration-500 ease-(--ease-out-expo)',
              online && 'translate-x-[0.7em]'
            )}
          />
        </button>{' '}
        в{' '}
        <span className={cn('transition-colors duration-500', online && 'text-accent-text')}>онлайн</span>
      </span>
    </h2>
  );
}
