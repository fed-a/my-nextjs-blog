'use client';

import React, { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import {
  getPosts,
  resetMainPageFilters,
  SelectMainPageFilter,
  SelectMainPagePosts,
} from '@/store/app';
import { Localed } from '@/types/params';

import { DifficultyLocalization } from '@/components/shared';

import { Locale } from '@/lib/i18n';
import { debounce } from '@/lib/utils';

import { PostCard, PostCardLocalization, PostsLoading } from './components';

interface PostProps {
  localization: PostCardLocalization & DifficultyLocalization;
}

export function Posts({ locale, localization }: Localed<PostProps>) {
  const isFirstRunRef = React.useRef(true);
  const { tags, difficulty, sorting } = useAppSelector(SelectMainPageFilter);
  const { posts, status, error } = useAppSelector(SelectMainPagePosts);
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

  if (status === 'error') {
    console.error(error);
    return <div>{error}</div>;
  }
  if (status === 'success') {
    if (!posts?.length) {
      return (
        <div className="m-auto flex flex-col items-center">
          <div className="w-40 h-40 md:w-[15rem] md:h-[15rem] lg:w-[20rem] lg:h-[20rem] bg-[url('/assets/images/no-data-min.svg')]  bg-no-repeat bg-center bg-contain"></div>
          <div>No posts</div>
        </div>
      );
    }
    return (
      <>
        {posts?.map((post) => (
          <PostCard key={post.id} locale={locale} localization={localization} cardData={post} />
        ))}
      </>
    );
  }
  return <PostsLoading />;
}
