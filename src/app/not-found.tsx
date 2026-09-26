import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { Eyebrow, Frame } from '@/components/frame';
import { ButtonLink } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: { index: false }
};

export default function NotFound() {
  return (
    <Frame markers={['bottom']}>
      <div className="iso-grid flex min-h-[70svh] flex-col justify-center px-5 py-24 sm:px-8 lg:px-10">
        <Eyebrow>Ошибка 404</Eyebrow>
        <h1 className="mt-5 text-5xl leading-none font-normal tracking-[-0.045em] sm:text-7xl">
          Такой страницы нет<span className="text-accent">.</span>
        </h1>
        <p className="mt-5 max-w-md text-[17px] text-muted-foreground">
          Возможно, ссылка устарела или в адресе опечатка.
        </p>
        <ButtonLink href="/" size="lg" className="mt-9 self-start">
          <ArrowLeft />
          На главную
        </ButtonLink>
      </div>
    </Frame>
  );
}
