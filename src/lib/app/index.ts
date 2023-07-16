import { PostsQueryVariables } from '@/gql/graphql';
import { Difficulties } from '@/types';
import { MAIN_PAGE_SORTING, MainPageSortings } from '@/types/app';

import { Locale } from '../i18n';

export function mapPostsParamsToVariables({
  locale,
  tags,
  difficulty,
  sorting,
}: {
  locale: Locale;
  tags: string[];
  difficulty: keyof Difficulties | null;
  sorting: MainPageSortings;
}): PostsQueryVariables {
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
  return { locale, filters: { and }, sort: sortingValue ?? [] };
}
