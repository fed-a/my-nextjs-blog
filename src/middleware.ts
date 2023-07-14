/* eslint-disable consistent-return */
import { parse } from 'accept-language-parser';
import { NextRequest, NextResponse } from 'next/server';

import { i18n, Locale } from '@/lib/i18n';

const getLangFromPathname = (pathname: string): Locale | null => {
  const locale = pathname.toLowerCase().split('/')[1];
  return i18n.locales.find((localeName) => locale.toLowerCase() === localeName) ?? null;
};

const getLangFromLocaleStandart = (locale: string): Locale => {
  return locale.split('-')[0] as Locale;
};

const findBestMatchingLocale = (acceptLangHeader: string) => {
  const parsedLangs = parse(acceptLangHeader);

  for (let i = 0; i < parsedLangs.length; i += 1) {
    const parsedLang = parsedLangs[i];
    const matchedLocale = i18n.locales.find((localeName) => {
      const locale = getLangFromLocaleStandart(localeName);
      return parsedLang.code === locale;
    });
    if (matchedLocale) {
      return matchedLocale;
    }
  }
  return i18n.defaultLocale;
};

const NON_INTERNATIONALIZED_PATHS = ['/assets', '/favicon', '/api'];

function shouldNotRedirect(pathname: string, localeFromPathname: string | null) {
  return (
    localeFromPathname || NON_INTERNATIONALIZED_PATHS.some((path) => pathname.startsWith(path))
  );
}

function addUnregistredUserIdentification(response: NextResponse, request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/api/auth')) {
    return;
  }
  let ip = request.ip ?? request.headers.get('x-real-ip');
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(',').at(0) ?? 'Unknown';
  }
  if (ip) {
    response.cookies.set('user-ip', ip, {
      httpOnly: false,
    });
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localeFromPathname = getLangFromPathname(pathname);
  if (shouldNotRedirect(pathname, localeFromPathname)) {
    const response = NextResponse.next();
    addUnregistredUserIdentification(response, request);
    return response;
  }

  const userLocale = findBestMatchingLocale(
    request.headers.get('Accept-Language') || i18n.defaultLocale,
  );
  if (!localeFromPathname) {
    return NextResponse.redirect(new URL(`/${userLocale}`, request.nextUrl));
  }
  const pathnameWithoutLocale = pathname.replace(`/${localeFromPathname}`, `/${userLocale}`);
  return NextResponse.redirect(new URL(pathnameWithoutLocale, request.nextUrl));
}

export const config = {
  // do not localize next.js paths
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
