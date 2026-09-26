'use client';

import { ArrowRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button, ButtonLink } from '@/components/ui/button';
import { nav } from '@/lib/data/site';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </Button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b bg-background px-4 pb-6 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.25)] sm:px-6"
      >
        <nav aria-label="Разделы" className="mx-auto flex max-w-6xl flex-col px-5 pt-2 sm:px-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-dashed py-3.5 text-[17px] tracking-tight"
            >
              {item.label}
              <ArrowRight className="size-4 text-muted-foreground" />
            </a>
          ))}
          <ButtonLink href="/#contacts" size="lg" className="mt-6" onClick={() => setOpen(false)}>
            Обсудить проект
            <ArrowRight />
          </ButtonLink>
        </nav>
      </div>
    </div>
  );
}
