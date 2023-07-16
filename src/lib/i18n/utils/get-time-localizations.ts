import { getLocalization } from '..';
import { Locale } from '../i18n';

export async function getTimeLocalizations(locale: Locale) {
  const timeLocalizations = await getLocalization(locale, [
    'post.minuteZero',
    'post.minuteOne',
    'post.minuteFew',
    'post.minuteMany',
    'post.minuteOther',
    'post.hourZero',
    'post.hourOne',
    'post.hourFew',
    'post.hourMany',
    'post.hourOther',
    'post.dayZero',
    'post.dayOne',
    'post.dayFew',
    'post.dayMany',
    'post.dayOther',
    'post.monthZero',
    'post.monthOne',
    'post.monthFew',
    'post.monthMany',
    'post.monthOther',
    'post.yearZero',
    'post.yearOne',
    'post.yearFew',
    'post.yearMany',
    'post.yearOther',
  ]);
  const [
    minuteZero,
    minuteOne,
    minuteFew,
    minuteMany,
    minuteOther,
    hourZero,
    hourOne,
    hourFew,
    hourMany,
    hourOther,
    dayZero,
    dayOne,
    dayFew,
    dayMany,
    dayOther,
    monthZero,
    monthOne,
    monthFew,
    monthMany,
    monthOther,
    yearZero,
    yearOne,
    yearFew,
    yearMany,
    yearOther,
  ] = timeLocalizations;
  return {
    minuteZero,
    minuteOne,
    minuteFew,
    minuteMany,
    minuteOther,
    hourZero,
    hourOne,
    hourFew,
    hourMany,
    hourOther,
    dayZero,
    dayOne,
    dayFew,
    dayMany,
    dayOther,
    monthZero,
    monthOne,
    monthFew,
    monthMany,
    monthOther,
    yearZero,
    yearOne,
    yearFew,
    yearMany,
    yearOther,
  };
}