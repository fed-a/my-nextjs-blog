import { LocaleParams } from '@/types/params';

import { Button, Typography } from '@/components/ui';

import { getLocalization } from '@/lib/i18n';
import { getDifficulties, getTags, getTimeLocalizations } from '@/lib/i18n/utils';

import { Posts } from './components/posts';

export default async function Home({ params }: { params: LocaleParams }) {
  const { locale } = params;
  const [[read, ago, difficulty], timeUnits, [sort, heading, more], difficulties, tags] =
    await Promise.all([
      getLocalization(locale, ['post.read', 'post.ago', 'post.difficulty']),
      getTimeLocalizations(locale),
      getLocalization(locale, ['blog.sort', 'blog.heading', 'blog.more']),
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
        <aside className="order-1 gap-16 border-b-[1px] border-black pl-0 dark:border-white md:order-2 md:border-b-0 md:border-l-[1px] md:pl-12 lg:pl-20 xl:pl-28">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Button variant="tagActive" size="tag">
                React
              </Button>
              <Button variant="tagActive" size="tag">
                Next.js
              </Button>
              <Button variant="tag" size="tag">
                Angular
              </Button>
              <Button variant="tag" size="tag">
                Other
              </Button>
              <Button variant="tag" size="tag">
                React
              </Button>
            </div>

            <button className="flex">{more}</button>
          </div>
          <Typography type="p3" styleType={['bold']} className="block">
            {sort}
          </Typography>
        </aside>
      </div>
    </div>
  );
}
