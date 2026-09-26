import type { BrandIconId } from './icons';

export type StackItem = {
  id: BrandIconId;
  adaptive?: boolean;
};

export const stack: StackItem[] = [
  { id: 'typescript' },
  { id: 'react' },
  { id: 'nextjs', adaptive: true },
  { id: 'vue' },
  { id: 'nuxt' },
  { id: 'php' },
  { id: 'laravel' },
  { id: 'nginx' },
  { id: 'ubuntu' },
  { id: 'docker' }
];
