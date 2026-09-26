import { brandIcons, type BrandIconId } from '@/lib/data/icons';
import { cn } from '@/lib/utils';

type Props = {
  id: BrandIconId;
  className?: string;
  colored?: boolean;
};

export function BrandIcon({ id, className, colored = false }: Props) {
  const icon = brandIcons[id];
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn('size-4 shrink-0', className)}
      fill={colored ? icon.hex : 'currentColor'}
    >
      <path d={icon.path} />
    </svg>
  );
}
