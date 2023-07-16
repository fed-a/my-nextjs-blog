import { differenceInMinutes } from 'date-fns';

import { TimeUnits } from '@/types';

import { getTimeInNaturalLanguage } from './get-time-in-natural-language';

export const getLocaledTimeToRead = ({
  timeToRead,
  timeUnits,
  read,
}: {
  timeToRead?: number;
  timeUnits: TimeUnits;
  read: string;
}) => {
  return `${getTimeInNaturalLanguage(timeToRead ?? 15, timeUnits)} ${read}`;
};

export const getLocaledTimeAgo = ({
  publishedAt,
  timeUnits,
  ago,
  locale,
}: {
  publishedAt: string;
  timeUnits: TimeUnits;
  ago: string;
  locale: string;
}) => {
  const timeAgo = getTimeInNaturalLanguage(
    Math.abs(differenceInMinutes(new Date(publishedAt), new Date())),
    timeUnits,
  );
  return locale === 'de' ? `${ago} ${timeAgo}` : `${timeAgo} ${ago}`;
};
