import { LocaleParams } from '@/types/params';

import { getLocalization } from '@/lib/i18n';
import { getDifficulties, getTags, getTimeLocalizations } from '@/lib/i18n/utils';

import { MainPageFilter, MainPageSorting, Posts } from './components';

export default async function Home({ params }: { params: LocaleParams }) {
  const { locale } = params;
  const [
    [read, ago, difficulty],
    timeUnits,
    [sort, heading, publishedAtAsc, publishedAtDesc, popularAsc],
    difficulties,
    tags,
  ] = await Promise.all([
    getLocalization(locale, ['post.read', 'post.ago', 'post.difficulty']),
    getTimeLocalizations(locale),
    getLocalization(locale, [
      'blog.sort',
      'blog.heading',
      'blog.publishedAt:asc',
      'blog.publishedAt:desc',
      'blog.popular:asc',
    ]),
    getDifficulties(locale),
    getTags(locale),
  ]);

  return (
    <div className="container">
      <h1>{heading}</h1>
      <div className="my-16 grid grid-cols-1 gap-4 md:grid-cols-[1fr_18rem] md:gap-12 lg:gap-20 xl:gap-28">
        <main className="order-2 flex flex-col gap-16 md:order-1">
          <Posts
            locale={locale}
            localization={{ read, ago, timeUnits, difficulty, difficulties, tags }}
          />
        </main>
        <aside className="flex flex-col order-1 gap-12 border-b-[1px] border-black pl-0 dark:border-white md:order-2 md:border-b-0 md:border-l-[1px] md:pl-12 lg:pl-20 xl:pl-28">
          <MainPageFilter tags={tags} difficulty={difficulty} difficulties={difficulties} />
          <MainPageSorting localization={{ sort, publishedAtAsc, publishedAtDesc, popularAsc }} />
        </aside>
      </div>
    </div>
  );
}
