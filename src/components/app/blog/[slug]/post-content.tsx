import React, { useMemo } from 'react';

import { Localed, TimeUnits } from '@/types';

import { getLocaledTimeAgo, getLocaledTimeToRead } from '@/lib/utils';

import { PostType } from '../../../../types/app/blog/[slug]';

import { MarkdownBlocks } from './markdown-blocks';

interface PostContentLocalizations {
  read: string;
  timeUnits: TimeUnits;
  ago: string;
}

interface PostContentProps {
  data: PostType | null;
  localizations: PostContentLocalizations;
}
export function PostContent(props: Localed<PostContentProps>) {
  const {
    locale,
    data,
    localizations: { ago, read, timeUnits },
  } = props;
  const { title, description, content, timeToRead } = data ?? {};

  const localedTimeToRead = useMemo(
    () => getLocaledTimeToRead({ read, timeUnits, timeToRead }),
    [read, timeToRead, timeUnits],
  );

  const localedTimeAgo = useMemo(
    () => getLocaledTimeAgo({ locale, ago, timeUnits, publishedAt: data?.publishedAt }),
    [ago, data?.publishedAt, locale, timeUnits],
  );

  if (!data) {
    return null;
  }
  return (
    <article className="af-article">
      <h2>{title}</h2>
      <p>{localedTimeAgo}</p>
      <p>{localedTimeToRead}</p>
      <p>{description}</p>
      <MarkdownBlocks content={content ?? null} />
    </article>
  );
}
