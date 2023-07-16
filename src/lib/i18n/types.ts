const BLOG_FIELDS = [
  'tags',
  'sort',
  'heading',
  'more',
  'reset',
  'publishedAt:asc',
  'publishedAt:desc',
  'popular:asc',
] as const;

const DIFFICULTY_FIELDS = ['apprentice', 'adept', 'expert', 'master'] as const;

const MENU_FIELDS = ['about', 'blog'] as const;

const POST_FIELDS = [
  'minuteZero',
  'minuteOne',
  'minuteFew',
  'minuteMany',
  'minuteOther',
  'hourZero',
  'hourOne',
  'hourFew',
  'hourMany',
  'hourOther',
  'dayZero',
  'dayOne',
  'dayFew',
  'dayMany',
  'dayOther',
  'monthZero',
  'monthOne',
  'monthFew',
  'monthMany',
  'monthOther',
  'yearZero',
  'yearOne',
  'yearFew',
  'yearMany',
  'yearOther',
  'read',
  'ago',
  'difficulty',
] as const;

const LOCALIZATION_FIELDS = {
  blog: BLOG_FIELDS,
  difficulty: DIFFICULTY_FIELDS,
  menu: MENU_FIELDS,
  post: POST_FIELDS,
};

export type LocalizationModules = keyof typeof LOCALIZATION_FIELDS;
export type LocalizationFields = (typeof LOCALIZATION_FIELDS)[LocalizationModules][number];
