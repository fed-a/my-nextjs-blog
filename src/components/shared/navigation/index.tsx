import Link from 'next/link';
import React from 'react';

import { LocaleParams } from '@/types';

import { getLocalization } from '@/lib/i18n';
import { ROUTES } from '@/lib/routes';

import { NavigationLink, ThemeToggle } from './components';

export async function Navigation({ locale }: LocaleParams) {
  const [about, blog] = await getLocalization(locale, ['menu.about', 'menu.blog']);
  return (
    <header className="container flex items-center justify-between py-16">
      <Link href={ROUTES.blog.route} locale={locale}>
        <div className="inline-block h-16 w-[5.25rem] bg-[url('/assets/images/logo-light-min.svg')] bg-cover bg-center dark:bg-[url('/assets/images/logo-dark-min.svg')]" />
      </Link>
      <nav className="flex items-center gap-8">
        <ThemeToggle />
        <ul className="flex gap-16">
          <li>
            <NavigationLink href={ROUTES.about.route} locale={locale}>
              {about}
            </NavigationLink>
          </li>
          <li>
            <NavigationLink href={ROUTES.blog.route} locale={locale}>
              {blog}
            </NavigationLink>
          </li>
          {process.env.NODE_ENV === 'development' && (
            <li>
              <NavigationLink href={ROUTES.uiKit.route} locale={locale}>
                UI Kit
              </NavigationLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
