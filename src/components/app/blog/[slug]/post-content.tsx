import React, { useMemo } from 'react';

import { Localed } from '@/types';
import { PostContentLocalizations, PostType } from '@/types/app/blog/[slug]';

import { getLocaledTimeAgo, getLocaledTimeToRead } from '@/lib/utils';

import { MarkdownBlocks } from './markdown-blocks';

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
