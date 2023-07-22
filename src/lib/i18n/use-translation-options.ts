import { i18n, Locale } from './i18n';

const DEFAULT_NS = 'common';

export function getOptions(locale: Locale = i18n.defaultLocale, ns = DEFAULT_NS) {
  return {
    supportedLngs: i18n.locales,
    fallbackLng: i18n.defaultLocale,
    lng: locale,
    fallbackNS: DEFAULT_NS,
    defaultNS: DEFAULT_NS,
    ns,
  };
}
