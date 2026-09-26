import { BrandIcon } from '@/components/brand-icon';
import { Logo } from '@/components/logo';
import { MobileMenu } from '@/components/mobile-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { ButtonLink } from '@/components/ui/button';
import { githubUrl, nav } from '@/lib/data/site';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 px-4 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-5 sm:px-8 lg:px-10">
        <Logo />

        <nav aria-label="Разделы" className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-[14px] text-foreground/75 transition-colors hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ButtonLink
            href={githubUrl}
            variant="ghost"
            size="icon"
            aria-label="emostr на GitHub"
            title="GitHub"
          >
            <BrandIcon id="github" />
          </ButtonLink>
          <ThemeToggle />
          <ButtonLink href="/#contacts" variant="outline" size="sm" className="ml-1.5 hidden sm:inline-flex">
            Обсудить проект
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
