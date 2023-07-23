import {
  PostsDocument,
  PostsQueryResult,
  PostsQueryVariables,
  PostsSlugsDocument,
  PostsSlugsQueryResult,
  PostsSlugsQueryVariables,
} from '@/gql/graphql';
import { Localed } from '@/types';
import { MainPageFilters } from '@/types/app';

import { fetchAPI } from '@/lib/api';
import { mapPostsParamsToVariables } from '@/lib/app';
import { Locale } from '@/lib/i18n';

export async function getPostsApi(
  params: Localed<Partial<MainPageFilters>>,
): Promise<NonNullable<PostsQueryResult['data']>['posts']> {
  const result = await fetchAPI<PostsQueryResult, PostsQueryVariables>(
    PostsDocument,
    mapPostsParamsToVariables(params),
  );
  return result.data?.posts;
}

export async function getPostsSlugsApi(locale: Locale) {
  const result = await fetchAPI<PostsSlugsQueryResult, PostsSlugsQueryVariables>(
    PostsSlugsDocument,
    {
      locale,
    },
  );

  return result.data?.posts?.data.map((post) => post.attributes?.slug) ?? [];
}
