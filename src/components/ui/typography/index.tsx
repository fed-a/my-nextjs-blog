import React from 'react';

import { cn } from '@/lib/utils';

import { resolveStyles, resolveTag } from './lib';
import { TypographyProps } from './types';

function TypographyComponent({
  children,
  type = 'p4',
  styleType = ['normal'],
  isSpan = true,
  className = '',
}: TypographyProps) {
  const tag = resolveTag(type, isSpan);
  const styles = resolveStyles(type, styleType);

  return React.createElement(
    tag,
    {
      className: cn(styles, className),
    },
    children,
  );
}

export const Typography = React.memo(TypographyComponent);
