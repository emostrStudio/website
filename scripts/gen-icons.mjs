import { writeFileSync } from 'node:fs';
import * as si from 'simple-icons';

const ICONS = {
  typescript: 'siTypescript',
  react: 'siReact',
  nextjs: 'siNextdotjs',
  vue: 'siVuedotjs',
  nuxt: 'siNuxt',
  php: 'siPhp',
  laravel: 'siLaravel',
  postgresql: 'siPostgresql',
  nginx: 'siNginx',
  ubuntu: 'siUbuntu',
  docker: 'siDocker',
  github: 'siGithub',
  telegram: 'siTelegram'
};

const lines = [
  'export type BrandIconId =',
  ...Object.keys(ICONS).map((id, i, all) => `  | '${id}'${i === all.length - 1 ? ';' : ''}`),
  '',
  'export type BrandIconData = { title: string; hex: string; path: string };',
  '',
  'export const brandIcons: Record<BrandIconId, BrandIconData> = {'
];

for (const [id, key] of Object.entries(ICONS)) {
  const icon = si[key];
  if (!icon) throw new Error(`simple-icons: не найдена иконка «${key}»`);
  lines.push(`  ${id}: {`);
  lines.push(`    title: '${icon.title}',`);
  lines.push(`    hex: '#${icon.hex}',`);
  lines.push(`    path: '${icon.path}'`);
  lines.push('  },');
}

lines[lines.length - 1] = '  }';
lines.push('};');
lines.push('');

writeFileSync(new URL('../src/lib/data/icons.ts', import.meta.url), lines.join('\n'));
console.log(`icons.ts: ${Object.keys(ICONS).length} иконок`);
