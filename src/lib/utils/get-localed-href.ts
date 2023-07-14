import { Locale } from '../i18n';

export function getLocaledHref(href: string, locale: Locale) {
  return href === '/' ? `/${locale}` : `/${locale}${href}`;
}
