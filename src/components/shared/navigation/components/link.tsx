'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface NavigationLinkProps {
  children: React.ReactNode;
  href: string;
  locale: Locale;
}

export function NavigationLink(props: NavigationLinkProps & LinkProps) {
  const { children, href, locale, ...restProps } = props;
  const pathName = usePathname();

  const isActive = pathName === href;

  return (
    <Link
      className={cn('hover:text-primary', {
        'text-primary': isActive,
      })}
      href={href}
      locale={locale}
      {...restProps}
    >
      {children}
    </Link>
  );
}
