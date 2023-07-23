import React from 'react';

import { Localed } from '@/types';

import { useAppTranslationSSR } from '@/lib/i18n/use-translation-ssr';

export async function AppHead({ locale }: Localed<{}>) {
  const { t } = await useAppTranslationSSR(locale);
  return (
    <>
      <link
        rel="preload"
        href="/assets/fonts/Unbounded-Bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon-light.png"
        media="(prefers-color-scheme: light)"
      />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-light-32x32.png"
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-light-16x16.png"
        media="(prefers-color-scheme: light)"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <meta name="apple-mobile-web-app-title" content={t('name')} />
      <meta name="application-name" content={t('name')} />
    </>
  );
}
