import React from 'react';

import { Skeleton } from '@/components/ui';

export function PostCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-12 w-3/4" />
      <div className="flex gap-3 py-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-1/3" />
      <div className="flex flex-col gap-y-2 gap-x-4 flex-wrap md:flex-row">
        <Skeleton className="h-4 w-20 sm:h-6" />
        <Skeleton className="h-4 w-16 sm:h-6" />
        <Skeleton className="h-4 w-20 sm:h-6" />
      </div>
      <Skeleton className="h-4 w-24 sm:h-6" />
    </div>
  );
}
