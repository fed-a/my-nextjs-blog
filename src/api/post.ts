import { PostsDocument, PostsQueryResult, PostsQueryVariables } from '@/gql/graphql';
import { Localed } from '@/types';

import { fetchAPI } from '@/lib/api';

export async function getPostApi(params: Localed<{ slug: string }>) {
  const { locale, slug } = params;
  const result = await fetchAPI<PostsQueryResult, PostsQueryVariables>(PostsDocument, {
    locale,
    filters: {
      slug: {
        eq: slug,
      },
    },
    pagination: {
      start: 0,
      limit: 1,
    },
  });
  return result.data?.posts?.data[0] ?? null;
}
