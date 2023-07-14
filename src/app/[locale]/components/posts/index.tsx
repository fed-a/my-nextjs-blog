'use client';

import React from 'react';

import { usePostsQuery } from '@/gql/graphql';
import { Localed } from '@/types/params';

import { DifficultyLocalization } from '@/components/shared';

import { PostCard, PostCardLocalization } from './components/post-card';
import { PostCardSkeleton } from './components/post-card/skeleton';

interface PostProps {
  localization: PostCardLocalization & DifficultyLocalization;
}

export function Posts({ locale, localization }: Localed<PostProps>) {
  const { data, loading, error } = usePostsQuery({ variables: { locale } });
  if (loading) {
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
  if (error) {
    console.error(error);
    return <div>Error</div>;
  }
  return (
    <>
      {data?.posts?.data.map((post) => (
        <PostCard key={post.id} locale={locale} localization={localization} cardData={post} />
      ))}
    </>
  );
}
