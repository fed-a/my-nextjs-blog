'use client';

import React from 'react';

import { useAppSelector } from '@/store';
import { SelectMainPagePosts } from '@/store/app';
import { Localed } from '@/types';

import { PostsLoading } from './loading';
import { PostCard, PostCardLocalization } from './post-card';

interface PostsProps {
  localization: PostCardLocalization;
}

export function Posts({ locale, localization }: Localed<PostsProps>) {
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
            <PostCard key={post.id} locale={locale} cardData={post} localization={localization} />
          ))}
        </>
      );
    default:
      return <PostsLoading />;
  }
}
