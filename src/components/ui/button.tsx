import type { ComponentProps } from 'react';
import { cn, externalProps } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg' | 'icon';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(0_0_0/0.12)] hover:bg-primary-hover',
  outline:
    'border border-border-strong bg-background text-foreground shadow-(--shadow-soft) hover:border-foreground/30 hover:bg-surface',
  ghost: 'text-foreground/75 hover:bg-surface hover:text-foreground'
};

const sizes: Record<Size, string> = {
  sm: 'h-8 gap-1.5 px-3 text-[13px]',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-12 gap-2 px-5 text-[15px]',
  icon: 'size-9'
};

export function buttonClass({
  variant = 'primary',
  size = 'md',
  className
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    'group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow] duration-200 select-none [&_svg]:size-4 [&_svg]:shrink-0',
    variants[variant],
    sizes[size],
    className
  );
}

type ButtonLinkProps = ComponentProps<'a'> & {
  href: string;
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({ href, variant, size, className, ...props }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={buttonClass({ variant, size, className })}
      {...externalProps(href)}
      {...props}
    />
  );
}

type ButtonProps = ComponentProps<'button'> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClass({ variant, size, className })} {...props} />;
}
