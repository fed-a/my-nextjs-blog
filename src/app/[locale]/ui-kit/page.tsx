import { notFound } from 'next/navigation';
import React from 'react';

import {
  UiKitBadge,
  UiKitButton,
  UiKitDialog,
  UiKitPopover,
  UiKitSkeleton,
  UiKitTooltip,
  UiKitTypography,
} from '@/components/app/ui-kit';
import { Typography } from '@/components/ui';

export default async function UiKit() {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <Typography type="h1">Типографика</Typography>
      <div>
        <UiKitTypography />
      </div>
      <Typography type="h1">Кнопки</Typography>
      <div>
        <UiKitButton />
      </div>
      <Typography type="h1">Скелетон</Typography>
      <div>
        <UiKitSkeleton />
      </div>
      <Typography type="h1">Диалог</Typography>
      <div>
        <UiKitDialog />
      </div>
      <Typography type="h1">Тултип</Typography>
      <div>
        <UiKitTooltip />
      </div>
      <Typography type="h1">Ховер</Typography>
      <div>
        <UiKitPopover />
      </div>
      <Typography type="h1">Бадж</Typography>
      <div>
        <UiKitBadge />
      </div>
    </div>
  );
}
