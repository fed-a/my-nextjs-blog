'use client';

import React, { useCallback, useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import { getTags, SelectMainPageFilter, SelectMainPageTags, toggleTag } from '@/store/app';
import { Localed } from '@/types';

import { Button } from '@/components/ui';

import { useSSR } from '@/lib/hooks';

import { SkeletonTags } from './skeleton-tags';

export function Tags({ locale }: Localed<{}>) {
  const { tags: activeTagsStore } = useAppSelector(SelectMainPageFilter);
  const { tags: tagsStore, status } = useAppSelector(SelectMainPageTags);
  const dispatch = useAppDispatch();

  const { isServer } = useSSR();

  useEffect(() => {
    dispatch(getTags(locale));
  }, [dispatch, locale]);

  const getOnTagClick = useCallback((tag: string) => () => dispatch(toggleTag(tag)), [dispatch]);

  const tags = useMemo(
    () =>
      tagsStore.map((tag) => ({
        ...tag,
        isActive: tag.attributes?.tagId && activeTagsStore.includes(tag.attributes.tagId),
      })),
    [activeTagsStore, tagsStore],
  );
  return (
    <div className="flex flex-wrap gap-2">
      {status === 'success'
        ? tags?.map((tag) => (
            <Button
              disabled={isServer}
              key={tag.attributes?.tagId}
              variant={tag.isActive ? 'tagActive' : 'tag'}
              size="tag"
              onClick={getOnTagClick(tag.attributes?.tagId ?? '')}
            >
              {tag.attributes?.label}
            </Button>
          ))
        : null}
      {status === 'loading' || !status ? <SkeletonTags /> : null}
    </div>
  );
}
