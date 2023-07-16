import React from 'react';

import { Skeleton } from '@/components/ui';

export function SkeletonTags() {
  return (
    <>
      <Skeleton className="h-[1.875rem] w-16" />
      <Skeleton className="h-[1.875rem] w-1/3" />
      <Skeleton className="h-[1.875rem] w-1/3" />
      <Skeleton className="h-[1.875rem] w-1/2" />
      <Skeleton className="h-[1.875rem] w-2/3" />
    </>
  );
}
