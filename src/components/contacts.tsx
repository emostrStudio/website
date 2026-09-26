import { ArrowUpRight, Mail } from 'lucide-react';
import { BrandIcon } from '@/components/brand-icon';
import { Eyebrow, Frame } from '@/components/frame';
import { contacts, type Contact } from '@/lib/data/site';
import { externalProps } from '@/lib/utils';

function ContactIcon({ icon }: { icon: Contact['icon'] }) {
  if (icon === 'mail') return <Mail className="size-5" />;
  return <BrandIcon id={icon} className="size-5" />;
}

export function Contacts() {
  return (
    <Frame id="contacts" labelledBy="contacts-title" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 left-1/2 h-[560px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--glow),transparent)]"
      />
      <div className="relative grid items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-10">
        <div className="reveal">
          <Eyebrow>Контакты</Eyebrow>
          <h2
            id="contacts-title"
            className="mt-4 text-[40px] leading-[1.02] font-normal tracking-[-0.045em] sm:text-[56px]"
          >
            Расскажите о задаче<span className="text-accent">.</span>
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted-foreground">
            Опишите идею в паре предложений — вернёмся с решением, сроками и оценкой стоимости.
          </p>
        </div>

        <ul className="reveal flex flex-col gap-3">
          {contacts.map((contact) => (
            <li key={contact.id}>
              <a
                href={contact.href}
                {...externalProps(contact.href)}
                className="group flex items-center gap-4 rounded-xl border bg-background/80 p-4 shadow-(--shadow-soft) backdrop-blur transition-colors hover:border-foreground/25 sm:p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border bg-surface text-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent-text">
                  <ContactIcon icon={contact.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="font-medium">{contact.label}</span>
                    <span className="truncate text-[13px] text-muted-foreground">{contact.note}</span>
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[13px] text-muted-foreground">
                    {contact.value}
                  </span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}
