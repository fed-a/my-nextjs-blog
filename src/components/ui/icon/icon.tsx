import { cn } from '@/lib/utils';

import { ColorName } from './colors';
import { IconName } from './icons';
import { SIZE, Size } from './lib';

interface IconProps {
  name: IconName;
  size?: Size;
  color?: ColorName;
}

export function Icon({ name, size = 'medium', color }: IconProps) {
  return (
    <div
      style={{ backgroundColor: color ? `hsl(var(--${color}))` : 'currentColor' }}
      className={cn('inline-block icon', `i-${name}`, SIZE[size])}
      data-theme
    />
  );
}
