import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function externalProps(href: string) {
  return isExternal(href) ? { target: '_blank', rel: 'noreferrer noopener' } : {};
}
