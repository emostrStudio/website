import Image from 'next/image';
import mark from '@/assets/mark.png';
import { cn } from '@/lib/utils';

export function Logo({ className, href = '/#top' }: { className?: string; href?: string }) {
  return (
    <a
      href={href}
      aria-label="emostrStudio — на главную"
      className={cn('flex shrink-0 items-center gap-2.5', className)}
    >
      <Image src={mark} alt="" width={30} height={29} priority className="size-7.5 select-none" />
      <span className="text-[18px] leading-none font-semibold tracking-[-0.03em]">
        emostr<span className="font-normal text-accent-text">Studio</span>
      </span>
    </a>
  );
}
