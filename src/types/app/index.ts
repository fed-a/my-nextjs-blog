import { Difficulties } from '../localizations';

export interface MainPageAsideLocalizations {
  sort: string;
  publishedAtAsc: string;
  publishedAtDesc: string;
  popularAsc: string;
  difficulty: string;
  difficulties: Difficulties;
  reset: string;
}

export const MAIN_PAGE_SORTING: SortingValue[] = [
  {
    id: 'publishedAtAsc',
    value: ['publishedAt:asc'],
  },
  {
    id: 'publishedAtDesc',
    value: ['publishedAt:desc'],
  },
  {
    id: 'pupularAsc',
    value: [
      'reactionLikes:asc',
      'reactionFires:asc',
      'reactionHearts:asc',
      'reactionTears:asc',
      'reactionAngries:asc',
    ],
  },
];

export type MainPageSortings = 'publishedAtAsc' | 'publishedAtDesc' | 'pupularAsc';

export interface MainPageFilters {
  page: number;
  tags: string[];
  difficulty: 'apprentice' | 'adept' | 'expert' | 'master' | null;
  sorting: MainPageSortings;
  dirty: boolean;
}

interface SortingValue {
  id: MainPageSortings;
  value: string[];
}
