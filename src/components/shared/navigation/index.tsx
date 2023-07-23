import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

import { LocaleParams } from '@/types';

import { useAppTranslationSSR } from '@/lib/i18n/use-translation-ssr';
import { ROUTES } from '@/lib/routes';
import { getLocaledHref } from '@/lib/utils';

import { NavigationLink, ThemeToggle } from './components';

export async function Navigation({ locale }: LocaleParams) {
  const { t } = await useAppTranslationSSR(locale, 'menu');

  const headersList = headers();
  const fullUrl = headersList.get('referer') || '';
  const [, , , , pathname] = fullUrl.split('/');
  const serverDefaultPathname = `/${locale}${pathname ? `/${pathname}` : ''}`;

  return (
    <header className="container flex items-center justify-between py-16">
      <Link href={getLocaledHref(ROUTES.blog.route, locale)} locale={locale}>
        <div className="inline-block h-10 aspect-[525/400] sm:h-12 md:h-16 bg-[url('/assets/images/logo-light-min.svg')] bg-cover bg-center dark:bg-[url('/assets/images/logo-dark-min.svg')]" />
      </Link>
      <nav className="flex items-center gap-8">
        <ThemeToggle />
        <ul className="flex gap-16">
          <li>
            <NavigationLink
              href={getLocaledHref(ROUTES.about.route, locale)}
              serverDefaultPathname={serverDefaultPathname}
              locale={locale}
            >
              {t('about')}
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href={getLocaledHref(ROUTES.blog.route, locale)}
              serverDefaultPathname={serverDefaultPathname}
              locale={locale}
            >
              {t('blog')}
            </NavigationLink>
          </li>
          {process.env.NODE_ENV === 'development' && (
            <li>
              <NavigationLink
                href={getLocaledHref(ROUTES.uiKit.route, locale)}
                serverDefaultPathname={serverDefaultPathname}
                locale={locale}
              >
                UI Kit
              </NavigationLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
