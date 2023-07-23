import { PostsQueryVariables } from '@/gql/graphql';
import { Localed } from '@/types';
import { MAIN_PAGE_SORTING, MainPageFilters } from '@/types/app';

const DEFAULT_PAGE_SIZE = 10;

export function mapPostsParamsToVariables({
  page,
  locale,
  tags,
  difficulty,
  sorting,
}: Localed<MainPageFilters>): PostsQueryVariables {
  const and: NonNullable<PostsQueryVariables['filters']>['and'] = [];
  if (tags.length) {
    and.push({
      tags: {
        tagId: {
          in: tags,
        },
      },
    });
  }
  if (difficulty) {
    and.push({ difficulty: { eq: difficulty } });
  }
  const sortingValue = sorting && MAIN_PAGE_SORTING.find(({ id }) => id === sorting)?.value;
  return {
    locale,
    pagination: {
      page: page ?? 0,
      pageSize: DEFAULT_PAGE_SIZE,
    },
    filters: { and },
    sort: sortingValue ?? [],
  };
}
