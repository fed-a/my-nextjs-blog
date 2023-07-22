import { Metadata } from 'next';

import { LocaleParams } from '@/types/params';

import { PostsData } from '@/components/app';
import { MainPageAside } from '@/components/app/aside';

import { useAppTranslationSSR } from '@/lib/i18n/use-translation-ssr';
import { getDifficulties, getTimeLocalizations } from '@/lib/i18n/utils';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const { locale } = params;
  const { t } = await useAppTranslationSSR(locale, 'blog');
  return {
    title: t('heading'),
  };
}

export default async function Home({ params }: { params: LocaleParams }) {
  const { locale } = params;
  const [{ t: tBlog }, { t: tPost }, timeUnits, difficulties] = await Promise.all([
    useAppTranslationSSR(locale, 'blog'),
    useAppTranslationSSR(locale, 'post'),
    getTimeLocalizations(locale),
    getDifficulties(locale),
  ]);

  return (
    <div className="container">
      <h1>{tBlog('heading')}</h1>
      <div className="my-16 grid grid-cols-1 gap-4 md:grid-cols-[1fr_18rem] md:gap-12 lg:gap-20 xl:gap-28">
        <main className="order-2 flex flex-col gap-16 md:order-1">
          <PostsData
            locale={locale}
            localization={{
              read: tPost('read'),
              ago: tPost('ago'),
              difficulty: tPost('difficulty'),
              difficulties,
              timeUnits,
            }}
          />
        </main>
        <MainPageAside
          locale={locale}
          localization={{
            sort: tBlog('sort'),
            publishedAtAsc: tBlog('publishedAtAsc'),
            publishedAtDesc: tBlog('publishedAtDesc'),
            popularAsc: tBlog('popularAsc'),
            difficulty: tPost('difficulty'),
            difficulties,
            reset: tBlog('reset'),
          }}
        />
      </div>
    </div>
  );
}
