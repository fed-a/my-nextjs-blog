'use client';

import Link from 'next/link';
import React, { useMemo } from 'react';

import { PostsQueryResult } from '@/gql/graphql';
import { TimeUnits } from '@/types';
import { Localed } from '@/types/params';

import { Difficulty, DifficultyLocalization, Reactions } from '@/components/shared';
import { Badge, Icon, Typography } from '@/components/ui';

import { getLocaledHref, getLocaledTimeAgo, getLocaledTimeToRead } from '@/lib/utils';

export interface PostCardLocalization extends DifficultyLocalization {
  read: string;
  ago: string;
  timeUnits: TimeUnits;
}

export interface PostCardProps {
  cardData: NonNullable<
    NonNullable<NonNullable<PostsQueryResult['data']>['posts']>['data'][number]
  >;
  localization: PostCardLocalization;
}

export function PostCard(props: Localed<PostCardProps>) {
  const { locale, cardData, localization } = props;
  const { title, description, slug, tags, difficulty, publishedAt, likes, timeToRead } =
    cardData?.attributes ?? {};
  const {
    likes: reactionLikes,
    fires: reactionFires,
    hearts: reactionHearts,
    tears: reactionTears,
    angries: reactionAngries,
  } = likes ?? {};
  const { read, ago, timeUnits } = localization;

  const localedTimeToRead = useMemo(
    () => getLocaledTimeToRead({ read, timeUnits, timeToRead }),
    [read, timeToRead, timeUnits],
  );

  const localedTimeAgo = useMemo(
    () => getLocaledTimeAgo({ locale, ago, timeUnits, publishedAt }),
    [ago, locale, publishedAt, timeUnits],
  );

  return (
    <article>
      <div className="flex flex-col gap-3">
        <Link href={getLocaledHref(`/blog/${slug}`, locale)} locale={locale}>
          <h2 className="pb-2 hover:underline  text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            {title}
          </h2>
        </Link>
        <div className="flex gap-x-3">
          {tags?.data.map((tag) => (
            <Badge key={tag.attributes?.tagId}>{tag.attributes?.label}</Badge>
          ))}
        </div>
        <p>{description}</p>
        <div className="flex gap-x-3 flex-col flex-wrap md:flex-row ">
          <div className="flex items-center gap-2">
            <Icon name="calendar" size="medium" color="primary" />
            <Typography>{localedTimeToRead}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="clock" size="medium" color="primary" />
            <Typography>{localedTimeAgo}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="puzzle" size="medium" color="primary" />
            <Difficulty localization={localization} difficultyLevel={difficulty ?? 'apprentice'} />
          </div>
        </div>
        <div>
          <Reactions
            likes={reactionLikes ?? 0}
            fires={reactionFires ?? 0}
            hearts={reactionHearts ?? 0}
            tears={reactionTears ?? 0}
            angries={reactionAngries ?? 0}
          />
        </div>
      </div>
    </article>
  );
}
