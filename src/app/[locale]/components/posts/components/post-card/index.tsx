import { differenceInMinutes } from 'date-fns';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { PostsQueryResult } from '@/gql/graphql';
import { TimeUnits } from '@/types';
import { Localed } from '@/types/params';

import { Difficulty, DifficultyLocalization, Reactions } from '@/components/shared';
import { Badge, Icon, Typography } from '@/components/ui';

import { getLocaledHref, getTimeInNaturalLanguage } from '@/lib/utils';

export interface PostCardLocalization {
  read: string;
  ago: string;
  tags: Record<string, string>;
  timeUnits: TimeUnits;
}

export interface PostCardProps {
  localization: PostCardLocalization & DifficultyLocalization;
  cardData: NonNullable<
    NonNullable<NonNullable<PostsQueryResult['data']>['posts']>['data'][number]
  >;
}

export function PostCard(props: Localed<PostCardProps>) {
  const { locale, localization, cardData } = props;
  const {
    title,
    description,
    slug,
    tags,
    difficulty,
    publishedAt,
    reactionLikes,
    reactionFires,
    reactionHearts,
    reactionTears,
    reactionAngries,
    timeToRead,
  } = cardData?.attributes ?? {};
  const { read, ago, timeUnits, tags: tagLocalizations } = localization;

  const localedTimeToRead = useMemo(() => {
    return `${getTimeInNaturalLanguage(timeToRead ?? 15, timeUnits)} ${read}`;
  }, [read, timeToRead, timeUnits]);

  const localedTimeAgo = useMemo(() => {
    const timeAgo = getTimeInNaturalLanguage(
      Math.abs(differenceInMinutes(new Date(publishedAt), new Date())),
      timeUnits,
    );
    return locale === 'de' ? `${ago} ${timeAgo}` : `${timeAgo} ${ago}`;
  }, [ago, locale, publishedAt, timeUnits]);

  return (
    <article>
      <div className="flex flex-col gap-3">
        <Link href={getLocaledHref(`/blog/${slug}`, locale)} locale={locale}>
          <h2 className="pb-2 hover:underline text-5xl">{title}</h2>
        </Link>
        <div className="flex gap-x-3">
          {tags.map((tag: string) => (
            <Badge key={tag}>{tagLocalizations[tag] ?? tag}</Badge>
          ))}
        </div>
        <p>{description}</p>
        <div className="flex gap-x-3 flex-col flex-wrap md:flex-row ">
          <div className="flex items-center gap-2">
            <Icon name="calendar" size="medium" color="primary" />
            <Typography>{localedTimeAgo}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="clock" size="medium" color="primary" />
            <Typography>{localedTimeToRead}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="puzzle" size="medium" color="primary" />
            <Difficulty localization={localization} difficultyLevel={difficulty ?? 'apprentice'} />
          </div>
        </div>
        <div>
          <Reactions
            likes={reactionLikes?.data.length ?? 0}
            fires={reactionFires?.data.length ?? 0}
            hearts={reactionHearts?.data.length ?? 0}
            tears={reactionTears?.data.length ?? 0}
            angries={reactionAngries?.data.length ?? 0}
          />
        </div>
      </div>
    </article>
  );
}
