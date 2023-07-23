'use client';

import React, { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import { getPosts, resetMainPageFilters, resetPosts, SelectMainPageFilter } from '@/store/app';
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
  const { page, tags, difficulty, sorting } = useAppSelector(SelectMainPageFilter);
  const dispatch = useAppDispatch();

  const debouncedDispatchPosts = useMemo(() => {
    return debounce((choosenLocale: Locale) => {
      dispatch(getPosts(choosenLocale));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetMainPageFilters());
    dispatch(resetPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!isFirstRunRef.current) {
      debouncedDispatchPosts(locale);
    }
  }, [page, tags, difficulty, sorting, locale, debouncedDispatchPosts]);

  useEffect(() => {
    isFirstRunRef.current = false;
    dispatch(getPosts(locale));
  }, [dispatch, locale]);

  return (
    <main className="order-2 flex flex-col gap-16 md:order-1">
      <Posts locale={locale} localization={localization} />
    </main>
  );
}
