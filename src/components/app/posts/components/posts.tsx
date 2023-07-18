import React from 'react';

import { useAppSelector } from '@/store';
import { SelectMainPagePosts } from '@/store/app';

import { DifficultyLocalization } from '@/components/shared';

import { Locale } from '@/lib/i18n';

import { PostsLoading } from './loading';
import { PostCard, PostCardLocalization } from './post-card';

interface PostsProps {
  locale: Locale;
  localization: PostCardLocalization & DifficultyLocalization;
}

export function Posts({ locale, localization }: PostsProps) {
  const { posts, status, error } = useAppSelector(SelectMainPagePosts);

  switch (status) {
    case 'error': {
      console.error(error);
      return <div>{error}</div>;
    }
    case 'success':
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
    default:
      return <PostsLoading />;
  }
}
