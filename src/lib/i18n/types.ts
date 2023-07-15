const BLOG_FIELDS = [
  'tags',
  'sort',
  'heading',
  'more',
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

export const TAGS_FIELDS = [
  // 'management',
  // 'marketing',
  // 'tilda',
  'react',
  'angular',
  'nextjs',
  'other',
  'effector',
  'typescript',
  'javascript',
  'css',
  'html',
  'sass',
  'tailwind',
  'design',
  'ux',
  'webDesign',
  'ui',
  // 'algorithms',
  // 'selfImprovement',
  // 'immigration',
] as const;

const LOCALIZATION_FIELDS = {
  blog: BLOG_FIELDS,
  difficulty: DIFFICULTY_FIELDS,
  menu: MENU_FIELDS,
  post: POST_FIELDS,
  tags: TAGS_FIELDS,
};

export type LocalizationModules = keyof typeof LOCALIZATION_FIELDS;
export type LocalizationFields = (typeof LOCALIZATION_FIELDS)[LocalizationModules][number];
