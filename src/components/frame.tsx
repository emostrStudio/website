import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Edge = 'top' | 'bottom';

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  markers?: Edge[];
  solid?: boolean;
  labelledBy?: string;
};

export function Marker({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('absolute z-10 size-1.5 bg-accent', className)} />
  );
}

export function Frame({
  id,
  children,
  className,
  innerClassName,
  markers = ['bottom'],
  solid = false,
  labelledBy
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative border-b px-4 sm:px-6', className)}
    >
      <div
        className={cn(
          'relative mx-auto max-w-6xl border-x',
          solid ? 'border-solid' : 'border-dashed border-border-strong',
          innerClassName
        )}
      >
        {children}
        {markers.includes('top') && (
          <>
            <Marker className="-top-[3px] -left-[3.5px]" />
            <Marker className="-top-[3px] -right-[3.5px]" />
          </>
        )}
        {markers.includes('bottom') && (
          <>
            <Marker className="-bottom-[3.5px] -left-[3.5px]" />
            <Marker className="-bottom-[3.5px] -right-[3.5px]" />
          </>
        )}
      </div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 font-mono text-[12px] tracking-[0.14em] text-muted-foreground uppercase',
        className
      )}
    >
      <span aria-hidden="true" className="size-1.5 bg-accent" />
      {children}
    </p>
  );
}
