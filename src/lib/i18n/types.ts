const BLOG_FIELDS = [
  'tags',
  'sort',
  'heading',
  'more',
  'reset',
  'publishedAtAsc',
  'publishedAtDesc',
  'popularAsc',
] as const;

const DIFFICULTY_FIELDS = ['apprentice', 'adept', 'expert', 'master'] as const;

const MENU_FIELDS = ['about', 'blog'] as const;

const POST_FIELDS = [
  'minute__zero',
  'minute_one',
  'minute_two',
  'minute_few',
  'minute_many',
  'minute_other',
  'hour__zero',
  'hour_one',
  'hour_two',
  'hour_few',
  'hour_many',
  'hour_other',
  'day__zero',
  'day_one',
  'day_two',
  'day_few',
  'day_many',
  'day_other',
  'month__zero',
  'month_one',
  'month_two',
  'month_few',
  'month_many',
  'month_other',
  'year__zero',
  'year_one',
  'year_two',
  'year_few',
  'year_many',
  'year_other',
  'read',
  'ago',
  'difficulty',
] as const;

const COMMON_FIELDS = ['name'] as const;

const LOCALIZATION_FIELDS = {
  blog: BLOG_FIELDS,
  difficulty: DIFFICULTY_FIELDS,
  menu: MENU_FIELDS,
  post: POST_FIELDS,
  common: COMMON_FIELDS,
};

export type LocalizationModules = keyof typeof LOCALIZATION_FIELDS;
export type LocalizationFields = (typeof LOCALIZATION_FIELDS)[LocalizationModules][number];
