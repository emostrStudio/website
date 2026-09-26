import type { BrandIconId } from './icons';

export const site = {
  name: 'emostrStudio',
  url: 'https://emostr.com',
  title: 'emostrStudio — разработка сайтов, CRM и веб-сервисов под ключ',
  shortTitle: 'emostrStudio',
  description:
    'emostrStudio — студия веб-разработки. Делаем сайты под ключ, CRM, интернет-магазины и веб-сервисы на TypeScript, React, Next.js, Vue, Nuxt и Laravel. Скоро — собственные SaaS.',
  tagline: 'Студия веб-разработки'
} as const;

export const githubUrl = 'https://github.com/emostrStudio';
export const telegramUrl = 'https://t.me/crefixa';
export const email = 'mail@emostr.com';

export type ContactIcon = Extract<BrandIconId, 'github' | 'telegram'> | 'mail';

export type Contact = {
  id: string;
  label: string;
  value: string;
  note: string;
  href: string;
  icon: ContactIcon;
};

export const contacts: Contact[] = [
  {
    id: 'telegram',
    label: 'Telegram',
    value: '@crefixa',
    note: 'Быстрее всего',
    href: telegramUrl,
    icon: 'telegram'
  },
  {
    id: 'email',
    label: 'Почта',
    value: email,
    note: 'Для брифов и документов',
    href: `mailto:${email}`,
    icon: 'mail'
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/emostrStudio',
    note: 'Наш открытый код',
    href: githubUrl,
    icon: 'github'
  }
];

export const nav = [
  { href: '/#services', label: 'Услуги' },
  { href: '/#stack', label: 'Стек' },
  { href: '/#projects', label: 'Проекты' },
  { href: '/#process', label: 'Процесс' },
  { href: '/#contacts', label: 'Контакты' }
] as const;
