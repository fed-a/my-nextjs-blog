import React from 'react';

import { Button } from '@/components/ui';

interface HeroButtonsLocalizations {
  toContacts: string;
  toWorks: string;
}

interface HeroButtonsProps {
  localization: HeroButtonsLocalizations;
}

export function HeroButtons({ localization }: HeroButtonsProps) {
  const { toContacts, toWorks } = localization;
  return (
    <div className="pt-8 md:pt-12 lg:pt-16 flex flex-wrap gap-x-4 md:gap-x-10 gap-y-2">
      <Button size="lg-adaptive">{toContacts}</Button>
      <Button size="lg-adaptive" variant="secondary">
        {toWorks}
      </Button>
    </div>
  );
}
