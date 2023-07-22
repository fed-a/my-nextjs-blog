'use client';

import React, { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import { getPosts, resetMainPageFilters, SelectMainPageFilter } from '@/store/app';
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
  const { tags, difficulty, sorting } = useAppSelector(SelectMainPageFilter);
  const dispatch = useAppDispatch();

  const debouncedDispatchPosts = useMemo(() => {
    return debounce((choosenLocale: Locale) => {
      dispatch(getPosts(choosenLocale));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetMainPageFilters());
  }, [dispatch]);

  useEffect(() => {
    if (!isFirstRunRef.current) {
      debouncedDispatchPosts(locale);
    }
  }, [tags, difficulty, sorting, locale, debouncedDispatchPosts]);

  useEffect(() => {
    isFirstRunRef.current = false;
    dispatch(getPosts(locale));
  }, [dispatch, locale]);

  return <Posts locale={locale} localization={localization} />;
}
