import { Logo } from '@/components/logo';
import { contacts, nav, site } from '@/lib/data/site';
import { externalProps } from '@/lib/utils';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 sm:px-6">
      <div className="mx-auto max-w-6xl border-x border-dashed border-border-strong px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted-foreground">
              {site.tagline}. Сайты, CRM и веб-сервисы под ключ — и собственные SaaS в работе.
            </p>
          </div>

          <nav aria-label="Разделы в подвале">
            <p className="font-mono text-[12px] tracking-[0.12em] text-muted-foreground uppercase">Разделы</p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-accent-text">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[12px] tracking-[0.12em] text-muted-foreground uppercase">Связь</p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <a
                    href={contact.href}
                    {...externalProps(contact.href)}
                    className="transition-colors hover:text-accent-text"
                  >
                    {contact.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-dashed border-border-strong py-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} emostrStudio</p>
          <p className="font-mono text-[12px]">Next.js · NGINX · Ubuntu</p>
        </div>
      </div>
    </footer>
  );
}
