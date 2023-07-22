'use client';

import i18next, { KeyPrefix } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect, useState } from 'react';
import {
  initReactI18next,
  UseTranslationOptions,
  useTranslation as useTranslationOrg,
} from 'react-i18next';

import { i18n, Locale } from './i18n';
import { LocalizationModules } from './types';
import { getOptions } from './use-translation-options';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./localizations/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? i18n.locales : [],
  });

export function useAppTranslation<NS extends LocalizationModules, KPrefix extends KeyPrefix<NS>>(
  locale: Locale,
  ns: LocalizationModules,
  options?: UseTranslationOptions<KPrefix>,
) {
  const ret = useTranslationOrg(ns, options);
  const { i18n: i18nInstance } = ret;
  const [activeLng, setActiveLng] = useState(ret.i18n.resolvedLanguage);
  useEffect(() => {
    if (runsOnServerSide) return;
    if (activeLng === i18nInstance.resolvedLanguage) return;
    setActiveLng(i18nInstance.resolvedLanguage);
  }, [activeLng, i18nInstance.resolvedLanguage]);
  useEffect(() => {
    if (runsOnServerSide) return;
    if (!locale || i18nInstance.resolvedLanguage === locale) return;
    i18nInstance.changeLanguage(locale);
  }, [locale, i18nInstance]);
  if (runsOnServerSide && locale && i18nInstance.resolvedLanguage !== locale) {
    i18nInstance.changeLanguage(locale);
  }
  return ret;
}
