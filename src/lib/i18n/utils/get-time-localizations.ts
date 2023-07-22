import { Locale } from '../i18n';
import { useAppTranslationSSR } from '../use-translation-ssr';

export async function getTimeLocalizations(locale: Locale) {
  const { t } = await useAppTranslationSSR(locale, 'post');
  return {
    minuteZero: t('minute_zero'),
    minuteOne: t('minute_one'),
    minuteTwo: t('minute_two'),
    minuteFew: t('minute_few'),
    minuteMany: t('minute_many'),
    minuteOther: t('minute_other'),
    hourZero: t('hour_zero'),
    hourOne: t('hour_one'),
    hourTwo: t('hour_two'),
    hourFew: t('hour_few'),
    hourMany: t('hour_many'),
    hourOther: t('hour_other'),
    dayZero: t('day_zero'),
    dayOne: t('day_one'),
    dayTwo: t('day_two'),
    dayFew: t('day_few'),
    dayMany: t('day_many'),
    dayOther: t('day_other'),
    monthZero: t('month_zero'),
    monthOne: t('month_one'),
    monthTwo: t('month_two'),
    monthFew: t('month_few'),
    monthMany: t('month_many'),
    monthOther: t('month_other'),
    yearZero: t('year_zero'),
    yearOne: t('year_one'),
    yearTwo: t('year_two'),
    yearFew: t('year_few'),
    yearMany: t('year_many'),
    yearOther: t('year_other'),
  };
}
