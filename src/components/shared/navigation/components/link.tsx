'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface NavigationLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  locale: Locale;
  serverDefaultPathname: string;
}

export function NavigationLink(props: NavigationLinkProps) {
  const { children, href, locale, serverDefaultPathname, ...restProps } = props;

  const [currentPath, setCurrentPath] = useState(serverDefaultPathname);
  const clientPathname = usePathname();

  useEffect(() => {
    setCurrentPath(`${clientPathname.split('/').slice(0, 3).join('/')}`);
  }, [clientPathname]);

  return (
    <Link
      className={cn('hover:text-primary', {
        'text-primary/100': href === currentPath,
        'text-primary/70': href !== currentPath,
      })}
      href={href}
      locale={locale}
      {...restProps}
    >
      {children}
    </Link>
  );
}
