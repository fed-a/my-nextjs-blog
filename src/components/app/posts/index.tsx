'use client';

import React, { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import {
  getNextPosts,
  getPosts,
  resetMainPageFilters,
  resetPosts,
  SelectMainPageFilter,
} from '@/store/app';
import { Localed } from '@/types/params';

import { Locale } from '@/lib/i18n';
import { debounce } from '@/lib/utils';

import { PostCardLocalization } from './components';
import { Posts } from './components/posts';

interface PostsProps {
  localization: PostCardLocalization;
}

export function PostsData({ locale, localization }: Localed<PostsProps>) {
  const isFirstRunRef = React.useRef(true);
  const { page, tags, difficulty, sorting, dirty } = useAppSelector(SelectMainPageFilter);
  const dispatch = useAppDispatch();

  const debouncedDispatchPosts = useMemo(() => {
    return debounce((choosenLocale: Locale) => {
      dispatch(getPosts(choosenLocale));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetPosts());
    dispatch(resetMainPageFilters());
  }, [dispatch]);

  useEffect(() => {
    if (!isFirstRunRef.current) {
      debouncedDispatchPosts(locale);
    }
  }, [tags, difficulty, sorting, locale, debouncedDispatchPosts]);

  useEffect(() => {
    if (!isFirstRunRef.current && page > 1) {
      dispatch(getNextPosts(locale));
    }
  }, [page, locale, dispatch]);

  useEffect(() => {
    if (isFirstRunRef.current && !dirty) {
      isFirstRunRef.current = false;
      dispatch(getPosts(locale));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, dirty, locale]);

  return (
    <main className="order-2 flex flex-col gap-16 md:order-1">
      <Posts locale={locale} localization={localization} />
    </main>
  );
}
