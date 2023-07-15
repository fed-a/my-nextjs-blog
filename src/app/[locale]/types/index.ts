export interface MainPageFilters {
  tags: string[];
  difficulty: string | null;
}

export const MAIN_PAGE_SORTING = [
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
] as const;

export type MainPageSortings = (typeof MAIN_PAGE_SORTING)[number]['id'];
