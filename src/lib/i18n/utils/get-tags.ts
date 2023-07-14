import { getLocalization, Locale } from '..';
import { TAGS_FIELDS } from '../types';

export async function getTags(locale: Locale): Promise<Record<string, string>> {
  const [
    management,
    marketing,
    tilda,
    react,
    angular,
    nextjs,
    other,
    effector,
    typescript,
    javascript,
    css,
    html,
    sass,
    tailwind,
    design,
    ux,
    webDesign,
    ui,
    algorithms,
    selfImprovement,
    immigration,
  ] = await getLocalization(
    locale,
    TAGS_FIELDS.map((field) => `tags.${field}` as const),
  );

  return {
    management,
    marketing,
    tilda,
    react,
    angular,
    nextjs,
    other,
    effector,
    typescript,
    javascript,
    css,
    html,
    sass,
    tailwind,
    design,
    ux,
    webDesign,
    ui,
    algorithms,
    selfImprovement,
    immigration,
  };
}
