import { Difficulties } from '@/types';

import { getLocalization, Locale } from '..';

export async function getDifficulties(locale: Locale): Promise<Difficulties> {
  const [apprentice, adept, expert, master] = await getLocalization(locale, [
    'difficulty.apprentice',
    'difficulty.adept',
    'difficulty.expert',
    'difficulty.master',
  ]);

  return {
    apprentice,
    adept,
    expert,
    master,
  };
}
