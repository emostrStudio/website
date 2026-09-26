import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { Eyebrow, Frame } from '@/components/frame';
import { ButtonLink } from '@/components/ui/button';
import { projects, projectSlots, type Project } from '@/lib/data/projects';
import { cn, externalProps } from '@/lib/utils';

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      {...externalProps(project.href)}
      className="group flex flex-col rounded-xl border bg-background p-6 shadow-(--shadow-soft) transition-colors hover:border-foreground/25"
    >
      <div className="flex items-center justify-between font-mono text-[12px] text-muted-foreground">
        <span>{project.year}</span>
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <h3 className="mt-10 text-xl tracking-tight">{project.name}</h3>
      <p className="mt-2 text-[15px] text-muted-foreground">{project.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full border px-2.5 py-0.5 text-[12px] text-muted-foreground">
            {tag}
          </li>
        ))}
      </ul>
    </a>
  );
}

function EmptySlot({ index }: { index: number }) {
  const first = index === 0;
  const number = String(index + 1).padStart(2, '0');

  return (
    <li
      className={cn(
        'relative flex min-h-64 flex-col rounded-xl border border-dashed p-6',
        first ? 'border-accent/60 bg-background' : 'hatch border-border-strong',
        !first && index > 1 && 'hidden md:flex'
      )}
    >
      <div className="flex items-center justify-between font-mono text-[12px] text-muted-foreground">
        <span className={cn(first && 'text-accent-text')}>{number}</span>
        <span>{first ? 'ждёт вас' : 'свободно'}</span>
      </div>

      {first ? (
        <>
          <h3 className="mt-auto text-2xl leading-tight tracking-[-0.03em]">
            Ваш проект может стать первым
          </h3>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Расскажите о задаче — и совсем скоро здесь появится ваш кейс.
          </p>
          <ButtonLink href="#contacts" className="mt-6 self-start">
            Стать первым
            <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
          </ButtonLink>
        </>
      ) : (
        <div className="m-auto flex size-12 items-center justify-center rounded-full border border-dashed border-border-strong bg-background text-muted-foreground">
          <Plus className="size-5" />
        </div>
      )}
    </li>
  );
}

export function Projects() {
  const empty = projects.length === 0;

  return (
    <Frame id="projects" labelledBy="projects-title">
      <div className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="reveal flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Проекты</Eyebrow>
            <h2
              id="projects-title"
              className="mt-4 text-[34px] leading-[1.08] font-normal tracking-[-0.04em] sm:text-[44px]"
            >
              Наши проекты
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground lg:text-right">
            {empty
              ? 'Пока здесь пусто — но это может измениться прямо сейчас.'
              : 'Сайты и сервисы, которые мы сделали и запустили.'}
          </p>
        </div>

        <ul className="reveal mt-10 grid gap-4 md:grid-cols-3">
          {empty
            ? Array.from({ length: projectSlots }, (_, index) => <EmptySlot key={index} index={index} />)
            : projects.map((project) => (
                <li key={project.id} className="flex">
                  <ProjectCard project={project} />
                </li>
              ))}
        </ul>

        <div className="reveal mt-4 flex flex-col gap-3 rounded-xl border bg-surface px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <span className="rounded-full bg-foreground px-2.5 py-0.5 font-mono text-[11px] tracking-[0.1em] text-background uppercase">
              Скоро
            </span>
            <span className="text-[15px]">Собственные SaaS-продукты студии</span>
          </p>
          <p className="text-[14px] text-muted-foreground">Строим свои сервисы и покажем их здесь первыми.</p>
        </div>
      </div>
    </Frame>
  );
}
