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
    value: ['publishedAtAsc'],
  },
  {
    id: 'publishedAtDesc',
    value: ['publishedAtDesc'],
  },
  {
    id: 'pupularAsc',
    value: [
      'reactionLikesAsc',
      'reactionFiresAsc',
      'reactionHeartsAsc',
      'reactionTearsAsc',
      'reactionAngriesAsc',
    ],
  },
];

export type MainPageSortings = 'publishedAtAsc' | 'publishedAtDesc' | 'pupularAsc';

export interface MainPageFilters {
  tags: string[];
  difficulty: 'apprentice' | 'adept' | 'expert' | 'master' | null;
  sorting: MainPageSortings;
}

interface SortingValue {
  id: MainPageSortings;
  value: string[];
}
