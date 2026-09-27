import { CopyButton } from '@/components/copy-button';
import { requisites, requisitesText } from '@/lib/data/requisites';

export function Requisites() {
  return (
    <section
      id="requisites"
      aria-labelledby="requisites-title"
      className="border-t border-dashed border-border-strong py-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2
          id="requisites-title"
          className="font-mono text-[12px] tracking-[0.12em] text-muted-foreground uppercase"
        >
          Реквизиты
        </h2>
        <CopyButton text={requisitesText()} label="Скопировать реквизиты" />
      </div>

      <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {requisites.map((item) => (
          <div key={item.label} className="min-w-0">
            <dt className="text-[12px] text-muted-foreground">{item.label}</dt>
            <dd className="mt-1 font-mono text-[13px] break-words select-all">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
