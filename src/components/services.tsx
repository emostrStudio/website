import { Eyebrow, Frame } from '@/components/frame';
import { ServiceTabs } from '@/components/service-tabs';

export function Services() {
  return (
    <Frame id="services" labelledBy="services-title" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[720px] bg-[radial-gradient(closest-side,var(--glow),transparent)]"
      />
      <div className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="reveal flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Услуги</Eyebrow>
            <h2
              id="services-title"
              className="mt-4 max-w-xl text-[34px] leading-[1.08] font-normal tracking-[-0.04em] sm:text-[44px]"
            >
              Задачи, которые можно возложить на нас
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground lg:text-right">
            От лендинга до внутренней системы компании — берём проект целиком или подключаемся
            к вашей команде.
          </p>
        </div>

        <div className="reveal mt-10">
          <ServiceTabs />
        </div>
      </div>
    </Frame>
  );
}
