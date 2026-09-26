import { ArrowRight } from 'lucide-react';
import { HeroScene } from '@/components/hero-scene';
import { ButtonLink } from '@/components/ui/button';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden border-b px-4 sm:px-6">
      <div
        aria-hidden="true"
        className="iso-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_72%_45%,#000_20%,transparent_75%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center lg:min-h-[600px] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="relative z-10 px-5 pt-16 pb-6 sm:px-8 sm:pt-24 lg:px-10 lg:pt-20 lg:pb-28">
          <p className="animate-enter inline-flex items-center gap-2 rounded-full border bg-background/80 py-1 pr-3 pl-2 text-[13px] text-muted-foreground shadow-(--shadow-soft) backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-teal opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-teal" />
            </span>
            Открыты для новых проектов
          </p>

          <h1
            id="hero-title"
            className="animate-enter mt-7 text-[44px] leading-[1] font-normal tracking-[-0.045em] text-balance [animation-delay:80ms] sm:text-6xl lg:text-[68px] xl:text-[74px]"
          >
            Сайты и сервисы под&nbsp;ключ<span className="text-accent">.</span>
          </h1>

          <p className="animate-enter mt-6 max-w-[440px] text-[17px] leading-relaxed text-muted-foreground [animation-delay:160ms]">
            emostrStudio — студия веб-разработки. Проектируем и запускаем сайты, CRM
            и веб-сервисы на современном стеке, а параллельно строим собственные SaaS.
          </p>

          <div className="animate-enter mt-9 flex flex-wrap gap-3 [animation-delay:240ms]">
            <ButtonLink href="#contacts" size="lg">
              Обсудить проект
              <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="#services" variant="outline" size="lg">
              Что мы делаем
            </ButtonLink>
          </div>
        </div>

        <div className="animate-enter relative -mx-4 h-[340px] overflow-hidden [animation-delay:200ms] sm:-mx-6 sm:h-[460px] lg:static lg:mx-0 lg:h-auto lg:overflow-visible">
          <HeroScene className="absolute top-0 left-1/2 h-full w-auto max-w-none -translate-x-[70%] lg:top-1/2 lg:right-[-6%] lg:left-auto lg:h-[640px] lg:translate-x-0 lg:-translate-y-[46%] xl:h-[680px]" />
        </div>
      </div>
    </section>
  );
}
