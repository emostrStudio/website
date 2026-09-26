import { Eyebrow, Frame } from '@/components/frame';
import { steps } from '@/lib/data/process';

export function Process() {
  return (
    <Frame id="process" labelledBy="process-title">
      <div className="reveal px-5 pt-16 sm:px-8 sm:pt-24 lg:px-10">
        <Eyebrow>Процесс</Eyebrow>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="process-title"
            className="text-[34px] leading-[1.08] font-normal tracking-[-0.04em] sm:text-[44px]"
          >
            Как мы работаем
          </h2>
          <p className="max-w-sm text-muted-foreground lg:text-right">
            Прозрачно на каждом этапе: вы всегда знаете, что сделано и что будет дальше.
          </p>
        </div>
      </div>

      <ol className="mt-12 grid gap-px border-t bg-border sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.id} className="group relative bg-background px-5 py-8 sm:px-8 lg:px-8 lg:py-10">
            <span className="font-mono text-[12px] text-accent-text">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-6 text-xl tracking-[-0.02em]">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{step.text}</p>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-x-100"
            />
          </li>
        ))}
      </ol>
    </Frame>
  );
}
