import React from 'react';

import { PostCardSkeleton } from './post-card/skeleton';

export function PostsLoading() {
  return (
    <>
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </>
  );
}
