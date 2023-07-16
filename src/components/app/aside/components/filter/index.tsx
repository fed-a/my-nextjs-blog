'use client';

import React, { useCallback, useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import {
  getTags,
  SelectMainPageFilter,
  SelectMainPageTags,
  setDifficulty,
  toggleTag,
} from '@/store/app';
import { Difficulties } from '@/types';
import { MainPageFilters } from '@/types/app';

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

import { useSSR } from '@/lib/hooks';
import { Locale } from '@/lib/i18n';

import { SkeletonTags } from './skeleton-tags';

interface MainPageFilterProps {
  locale: Locale;
  difficulty: string;
  difficulties: Difficulties;
}

export function MainPageFilter({ locale, difficulties, difficulty }: MainPageFilterProps) {
  const { tags: activeTagsStore, difficulty: difficultyStore } =
    useAppSelector(SelectMainPageFilter);
  const { tags: tagsStore, status } = useAppSelector(SelectMainPageTags);
  const dispatch = useAppDispatch();
  const { isServer } = useSSR();

  useEffect(() => {
    dispatch(getTags(locale));
  }, [dispatch, locale]);

  function getOnTagClick(tag: string) {
    return () => dispatch(toggleTag(tag));
  }

  const tags = useMemo(
    () =>
      tagsStore.map((tag) => ({
        ...tag,
        isActive: tag.attributes?.tagId && activeTagsStore.includes(tag.attributes.tagId),
      })),
    [activeTagsStore, tagsStore],
  );

  const onDifficultyChange = useCallback(
    (newDifficulty: string) => {
      dispatch(setDifficulty(newDifficulty as MainPageFilters['difficulty']));
    },
    [dispatch],
  );

  return (
    <div className="flex flex-col gap-12">
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
      <Select
        disabled={isServer}
        value={isServer || !difficultyStore ? undefined : difficultyStore}
        onValueChange={onDifficultyChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={difficulty} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(difficulties).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
