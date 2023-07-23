import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import { nextPage, SelectMainPagePosts } from '@/store/app';
import { Localed } from '@/types';

import { useInfiniteScroll } from '@/lib/hooks';

import { PostsLoading } from './loading';
import { PostCard, PostCardLocalization } from './post-card';

interface PostsProps {
  localization: PostCardLocalization;
}

export function Posts({ locale, localization }: Localed<PostsProps>) {
  const { posts, hasMore, status, error } = useAppSelector(SelectMainPagePosts);
  const dispatch = useAppDispatch();

  const onLoadMore = useCallback(() => {
    dispatch(nextPage());
  }, [dispatch]);
  const { ref } = useInfiniteScroll({
    onLoadMore,
    hasMore,
  });

  if (status === 'loading' && posts.length === 0) {
    return <PostsLoading />;
  }
  if (status === 'success' && posts?.length === 0) {
    return (
      <div className="m-auto flex flex-col items-center">
        <div className="w-40 h-40 md:w-[15rem] md:h-[15rem] lg:w-[20rem] lg:h-[20rem] bg-[url('/assets/images/no-data-min.svg')]  bg-no-repeat bg-center bg-contain"></div>
        <div>{localization.noPosts}</div>
      </div>
    );
  }

  if (status === 'error') {
    console.error(error);
    return <div className="m-auto flex flex-col items-center">{error}</div>;
  }

  return (
    <>
      {posts?.map((post, idx) => {
        if (idx === posts.length - 2) {
          return (
            <PostCard
              ref={ref}
              key={post.id}
              locale={locale}
              localization={localization}
              cardData={post}
            />
          );
        }
        return (
          <PostCard key={post.id} locale={locale} localization={localization} cardData={post} />
        );
      })}
    </>
  );
}
