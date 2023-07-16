import React from 'react';

import { PostDocument, PostQueryResult, PostQueryVariables } from '@/gql/graphql';
import { Localed } from '@/types/params';

import { PostContent } from '@/components/app/blog/[slug]';

import { fetchAPI } from '@/lib/api';
import { getLocalization } from '@/lib/i18n';
import { getTimeLocalizations } from '@/lib/i18n/utils';

import './blog.css';

interface ArticlePageProps {
  params: Localed<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = params;
  const [[ago, read], timeUnits] = await Promise.all([
    getLocalization(locale, ['post.ago', 'post.read']),
    getTimeLocalizations(locale),
  ]);
  const post = await fetchAPI<PostQueryResult, PostQueryVariables>(PostDocument, {
    locale,
    filters: {
      slug: {
        eq: slug,
      },
    },
  }).catch(() => null);

  const data = post?.data?.posts?.data?.[0]?.attributes ?? null;

  return (
    <div className="container md:px-12 lg:px-28 xl:px-40 2xl:px-48">
      <PostContent locale={locale} data={data} localizations={{ ago, read, timeUnits }} />
    </div>
  );
}
