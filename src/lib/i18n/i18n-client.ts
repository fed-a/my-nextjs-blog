import { Locale } from './i18n';
import { LocalizationFields, LocalizationModules } from './types';

type LocalizationsStoreType = Partial<
  Record<Locale, Partial<Record<LocalizationModules, Partial<Record<LocalizationFields, string>>>>>
>;

const localizations: LocalizationsStoreType = {};

function moduleExists(locale: Locale, module: LocalizationModules) {
  return Boolean(localizations[locale]?.[module]);
}

function setLocalization(
  locale: Locale,
  module: LocalizationModules,
  localizationsValue: Record<string, string>,
) {
  let resolvedLocale = localizations[locale];
  if (!resolvedLocale) {
    resolvedLocale = {};
    localizations[locale] = resolvedLocale;
  }

  let resolvedModule = resolvedLocale[module];
  if (!resolvedModule) {
    resolvedModule = {};
    resolvedLocale[module] = resolvedModule;
  }

  Object.entries(localizationsValue).forEach(([key, value]) => {
    resolvedModule![key as LocalizationFields] = value;
  });
}

async function getLocalizationModule(locale: Locale, module: LocalizationModules) {
  let value: Record<string, string>;
  try {
    value = (await import(`./localizations/${locale}/${module}.json`)).default ?? {};
  } catch (error) {
    return;
  }
  setLocalization(locale, module, value);
}

function getDividedKey<M extends LocalizationModules>(
  key: `${LocalizationModules}.${LocalizationFields}`,
): [M, LocalizationFields] {
  const divided = key.split('.');
  return [divided[0] as M, divided.slice(1).join('.') as LocalizationFields];
}

export async function getLocalization(
  locale: Locale,
  keys: `${LocalizationModules}.${LocalizationFields}`[],
): Promise<string[]> {
  const dividedKeys = keys.map(getDividedKey);
  const unresolvedModules: LocalizationModules[] = [];
  dividedKeys.forEach(([module]) => {
    if (!moduleExists(locale, module)) {
      unresolvedModules.push(module);
    }
  });

  await Promise.all(unresolvedModules.map((module) => getLocalizationModule(locale, module)));

  return dividedKeys.map(([module, key]) => localizations[locale]?.[module]?.[key] ?? '');
}
