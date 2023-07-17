export const MAIN_PAGE_SORTING: SortingValue[] = [
  {
    id: 'publishedAt:asc',
    value: ['publishedAt:asc'],
  },
  {
    id: 'publishedAt:desc',
    value: ['publishedAt:desc'],
  },
  {
    id: 'pupular:asc',
    value: [
      'reactionLikes:asc',
      'reactionFires:asc',
      'reactionHearts:asc',
      'reactionTears:asc',
      'reactionAngries:asc',
    ],
  },
];

export type MainPageSortings = 'publishedAt:asc' | 'publishedAt:desc' | 'pupular:asc';

export interface MainPageFilters {
  tags: string[];
  difficulty: 'apprentice' | 'adept' | 'expert' | 'master' | null;
  sorting: MainPageSortings;
}

interface SortingValue {
  id: MainPageSortings;
  value: string[];
}
