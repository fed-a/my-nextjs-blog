'use client';

import { useAppSelector } from '@/store';
import { SelectMobileMenu } from '@/store/menu.slice';

export function MobileMenu() {
  const isOpen = useAppSelector(SelectMobileMenu);

  if (!isOpen) {
    return null;
  }

  return <></>;
}
