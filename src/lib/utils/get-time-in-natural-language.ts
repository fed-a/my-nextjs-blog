import { TimeUnits } from '@/types';

import { getNumeric } from '../i18n/utils/get-numeric';

const MIN = 60;
const HOUR = 24;
const DAY = 30;
const MONTH = 12;

export function getTimeInNaturalLanguage(minutes: number, timeUnits: TimeUnits) {
  if (minutes >= MONTH * DAY * HOUR * MIN) {
    return getNumeric({
      zero: timeUnits.yearZero,
      one: timeUnits.yearOne,
      two: timeUnits.yearTwo,
      few: timeUnits.yearFew,
      many: timeUnits.yearMany,
      other: timeUnits.yearOther,
      value: Math.floor(minutes / MIN / HOUR / DAY / MONTH),
    });
  }
  if (minutes >= DAY * HOUR * MIN) {
    return getNumeric({
      zero: timeUnits.monthZero,
      one: timeUnits.monthOne,
      two: timeUnits.monthTwo,
      few: timeUnits.monthFew,
      many: timeUnits.monthMany,
      other: timeUnits.monthOther,
      value: Math.floor(minutes / MIN / HOUR / DAY),
    });
  }
  if (minutes >= HOUR * MIN) {
    return getNumeric({
      zero: timeUnits.dayZero,
      one: timeUnits.dayOne,
      two: timeUnits.dayTwo,
      few: timeUnits.dayFew,
      many: timeUnits.dayMany,
      other: timeUnits.dayOther,
      value: Math.floor(minutes / MIN / HOUR),
    });
  }
  if (minutes >= MIN) {
    return getNumeric({
      zero: timeUnits.hourZero,
      one: timeUnits.hourOne,
      two: timeUnits.hourTwo,
      few: timeUnits.hourFew,
      many: timeUnits.hourMany,
      other: timeUnits.hourOther,
      value: Math.floor(minutes / MIN),
    });
  }
  return getNumeric({
    zero: timeUnits.minuteZero,
    one: timeUnits.minuteOne,
    two: timeUnits.minuteTwo,
    few: timeUnits.minuteFew,
    many: timeUnits.minuteMany,
    other: timeUnits.minuteOther,
    value: minutes,
  });
}
