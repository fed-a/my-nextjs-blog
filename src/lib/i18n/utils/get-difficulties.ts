import { Difficulties } from '@/types';

import { Locale } from '..';
import { useAppTranslationSSR } from '../use-translation-ssr';

export async function getDifficulties(locale: Locale): Promise<Difficulties> {
  const { t } = await useAppTranslationSSR(locale, 'difficulty');

  return {
    apprentice: t('apprentice'),
    adept: t('adept'),
    expert: t('expert'),
    master: t('master'),
  };
}
