import Link from 'next/link';
import React from 'react';

import { Locale } from '@/lib/i18n';

import { Button, ButtonProps } from './button';

type ButtonLinkProps = Omit<ButtonProps, 'onClick'> & {
  href: string;
  locale: Locale;
};

function ButtonLinkComponent(props: ButtonLinkProps) {
  const { href, locale } = props;
  return (
    <Link href={href} locale={locale}>
      <Button {...props} />
    </Link>
  );
}

export const ButtonLink = React.memo(ButtonLinkComponent);
