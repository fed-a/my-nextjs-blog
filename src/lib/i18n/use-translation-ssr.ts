import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { Locale } from './i18n';
import { LocalizationModules } from './types';
import { getOptions } from './use-translation-options';

const initI18next = async (locale: Locale, ns: LocalizationModules) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./localizations/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(locale, ns));
  return i18nInstance;
};

// can be used in SSR
export async function useAppTranslationSSR(
  locale: Locale,
  ns: LocalizationModules,
  options: any = {},
) {
  const i18nextInstance = await initI18next(locale, ns);
  return {
    t: i18nextInstance.getFixedT<LocalizationModules, 'test', LocalizationModules>(
      locale,
      ns,
      options.keyPrefix,
    ),
    i18n: i18nextInstance,
  };
}
