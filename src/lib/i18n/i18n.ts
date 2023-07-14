export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ru', 'de', 'sv'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
