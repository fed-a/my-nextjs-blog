import { Metadata } from 'next';
import React from 'react';

import { getPostApi } from '@/api/post';
import { getPostsSlugsApi } from '@/api/posts';
import { PostDocument, PostQueryResult, PostQueryVariables } from '@/gql/graphql';
import { Localed } from '@/types/params';

import { PostContent } from '@/components/app/blog/[slug]';

import { fetchAPI } from '@/lib/api';
import { getLocalization, i18n } from '@/lib/i18n';
import { getTimeLocalizations } from '@/lib/i18n/utils';

interface ArticlePageProps {
  params: Localed<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = params;
  // fetch data
  const article = await getPostApi({ locale, slug });

  const ogLink = `/api/og?title=${encodeURIComponent(article?.attributes?.title ?? '')}`;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_HOST ?? 'http://localhost:3000'),
    title: article?.attributes?.title,
    description: article?.attributes?.description,
    openGraph: {
      type: 'article',
      locale,
      title: article?.attributes?.title,
      description: article?.attributes?.description,
      siteName: 'Anton Fedulov Blog',
      url: `${process.env.NEXT_PUBLIC_HOST}/${locale}/blog/${slug}`,
      images: [
        {
          url: ogLink,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const localedSlugs = (await Promise.all(i18n.locales.map(getPostsSlugsApi)))
    .map((slugs, index) =>
      slugs.map((slug) => ({
        locale: i18n.locales[index],
        slug,
      })),
    )
    .flat();

  return [localedSlugs];
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = params;
  const [[ago, read], timeUnits] = await Promise.all([
    getLocalization(locale, ['post.ago', 'post.read']),
    getTimeLocalizations(locale),
  ]);
  const post = await fetchAPI<PostQueryResult, PostQueryVariables>(
    PostDocument,
    {
      locale,
      filters: {
        slug: {
          eq: slug,
        },
      },
    },
    {
      next: {
        revalidate: 5,
      },
    },
  ).catch(() => null);

  const data = post?.data?.posts?.data?.[0]?.attributes ?? null;

  return (
    <div className="container md:px-12 lg:px-28 xl:px-40 2xl:px-48">
      <PostContent locale={locale} data={data} localizations={{ ago, read, timeUnits }} />
    </div>
  );
}
